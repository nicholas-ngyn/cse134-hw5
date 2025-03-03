document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;

    document.getElementById('theme-toggle').classList.remove('hidden');

    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "dark");
    } else if (localStorage.getItem("theme") === "light") {
        body.classList.add("light-mode");
        themeToggleBtn.textContent = "🌞";
    }

    themeToggleBtn.addEventListener("click", () => {
        body.classList.toggle("light-mode");

        if (body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            themeToggleBtn.textContent = "🌞";
        } else {
            localStorage.setItem("theme", "dark");
            themeToggleBtn.textContent = "🌙";
        }
    });
});
