function attachEvents() {
    const buttons = document.querySelectorAll("nav button");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const target = document.getElementById(button.dataset.target);
            target.scrollIntoView({ behavior: "smooth"});
        })
    });
    document.getElementById("getStarted").addEventListener("click", () => window.location.href = "./html/menu.html");
}

attachEvents();