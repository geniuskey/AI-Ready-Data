document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("table").forEach((table) => {
    if (!table.hasAttribute("role")) table.setAttribute("role", "table");
  });
});
