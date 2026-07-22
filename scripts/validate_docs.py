"""Validate the public documentation contract with no project-specific service."""

from __future__ import annotations

import re
import sys
from datetime import date
from pathlib import Path
from urllib.parse import unquote

import yaml


ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
CONFIG = ROOT / "mkdocs.yml"
REQUIRED = {
    "title",
    "description",
    "status",
    "page_type",
    "audience",
    "maturity_level",
    "topics",
    "last_updated",
    "review_due",
}
ENUMS = {
    "status": {"draft", "reviewed"},
    "page_type": {"guide", "playbook", "template", "case", "reference"},
}
CASE_TYPES = {"verified-case", "composite-case"}
CORE_DOCS = {
    "index.md",
    "01-assess/readiness.md",
    "01-assess/90-day-roadmap.md",
    "02-govern/governance.md",
    "02-govern/security.md",
    "03-capture/better-records.md",
    "04-sources/office-spreadsheets.md",
    "04-sources/email.md",
    "04-sources/edm-ssot.md",
    "05-pipeline/ingestion.md",
    "05-pipeline/rag-operations.md",
    "06-cases/index.md",
}
LINK_RE = re.compile(r"(?<!!)\[[^]]+\]\(([^)]+)\)")
URL_RE = re.compile(r"https?://", re.IGNORECASE)
SECRET_PATTERNS = {
    "AWS access key": re.compile(r"\bAKIA[0-9A-Z]{16}\b"),
    "private key": re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
    "GitHub token": re.compile(r"\bgh[pousr]_[A-Za-z0-9]{30,}\b"),
}


class MkDocsLoader(yaml.SafeLoader):
    """Read MkDocs config without importing Python objects from YAML tags."""


def _python_name(loader: yaml.Loader, suffix: str, node: yaml.Node) -> str:
    del loader, node
    return suffix


MkDocsLoader.add_multi_constructor(
    "tag:yaml.org,2002:python/name:", _python_name
)


def split_front_matter(path: Path) -> tuple[dict, str]:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        raise ValueError("YAML front matter가 없습니다")
    try:
        _, raw, body = text.split("---\n", 2)
    except ValueError as exc:
        raise ValueError("YAML front matter 닫힘 구분자가 없습니다") from exc
    metadata = yaml.safe_load(raw)
    if not isinstance(metadata, dict):
        raise ValueError("front matter가 객체가 아닙니다")
    return metadata, body


def flatten_nav(node: object) -> list[str]:
    found: list[str] = []
    if isinstance(node, str) and node.endswith(".md"):
        found.append(node)
    elif isinstance(node, list):
        for item in node:
            found.extend(flatten_nav(item))
    elif isinstance(node, dict):
        for item in node.values():
            found.extend(flatten_nav(item))
    return found


def validate_link(source: Path, target: str) -> str | None:
    target = unquote(target.strip())
    if not target or target.startswith(("http://", "https://", "mailto:", "#")):
        return None
    path_part = target.split("#", 1)[0].split("?", 1)[0]
    if not path_part:
        return None
    if path_part.startswith("/"):
        candidate = DOCS / path_part.lstrip("/")
    else:
        candidate = source.parent / path_part
    if candidate.exists():
        return None
    return f"깨진 내부 링크: {target}"


def main() -> int:
    errors: list[str] = []
    config = yaml.load(CONFIG.read_text(encoding="utf-8"), Loader=MkDocsLoader)
    nav_paths = set(flatten_nav(config.get("nav", [])))
    markdown_paths = sorted(DOCS.rglob("*.md"))

    for path in markdown_paths:
        rel = path.relative_to(DOCS).as_posix()
        try:
            meta, body = split_front_matter(path)
        except (ValueError, yaml.YAMLError) as exc:
            errors.append(f"{rel}: {exc}")
            continue

        missing = REQUIRED - set(meta)
        if missing:
            errors.append(f"{rel}: 필수 front matter 누락: {', '.join(sorted(missing))}")
        for key, allowed in ENUMS.items():
            if key in meta and meta[key] not in allowed:
                errors.append(f"{rel}: {key} 값은 {sorted(allowed)} 중 하나여야 합니다")
        for key in ("audience", "topics"):
            if key in meta and (not isinstance(meta[key], list) or not meta[key]):
                errors.append(f"{rel}: {key}는 비어 있지 않은 목록이어야 합니다")
        for key in ("last_updated", "review_due"):
            value = meta.get(key)
            if value is not None and not isinstance(value, date):
                errors.append(f"{rel}: {key}는 YYYY-MM-DD 날짜여야 합니다")

        if meta.get("page_type") == "case":
            case_type = meta.get("case_type")
            if case_type not in CASE_TYPES:
                errors.append(f"{rel}: 사례에는 case_type 배지가 필요합니다")
            expected_badge = f"{case_type}" if case_type in CASE_TYPES else ""
            if expected_badge and expected_badge not in body:
                errors.append(f"{rel}: 본문에 {expected_badge} 표시가 없습니다")

        needs_source = meta.get("page_type") in {"guide", "playbook", "reference"}
        if needs_source and rel not in {"templates/index.md", "reference/contributing.md"}:
            if not URL_RE.search(body):
                errors.append(f"{rel}: 근거가 필요한 문서에 외부 출처 링크가 없습니다")

        for label, pattern in SECRET_PATTERNS.items():
            if pattern.search(body):
                errors.append(f"{rel}: 잠재적 비밀정보 발견({label})")

        for target in LINK_RE.findall(body):
            link_error = validate_link(path, target)
            if link_error:
                errors.append(f"{rel}: {link_error}")

        if rel not in nav_paths:
            errors.append(f"{rel}: mkdocs.yml nav에 없는 고아 문서입니다")

    missing_nav = sorted(nav_paths - {p.relative_to(DOCS).as_posix() for p in markdown_paths})
    errors.extend(f"mkdocs.yml: 존재하지 않는 문서: {item}" for item in missing_nav)

    actual_paths = {p.relative_to(DOCS).as_posix() for p in markdown_paths}
    for missing_core in sorted(CORE_DOCS - actual_paths):
        errors.append(f"MVP: 핵심 문서 누락: {missing_core}")
    template_pages = {
        path for path in actual_paths if path.startswith("templates/") and path != "templates/index.md"
    }
    case_pages = {
        path for path in actual_paths if path.startswith("06-cases/") and path != "06-cases/index.md"
    }
    if len(template_pages) != 12:
        errors.append(f"MVP: 실전 템플릿은 12개여야 합니다(현재 {len(template_pages)}개)")
    if len(case_pages) != 4:
        errors.append(f"MVP: 상세 사례는 4개여야 합니다(현재 {len(case_pages)}개)")

    if errors:
        print("Documentation validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1
    print(
        "Documentation validation passed: "
        f"{len(markdown_paths)} Markdown files, {len(CORE_DOCS)} core guides, "
        f"{len(template_pages)} templates, {len(case_pages)} cases"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
