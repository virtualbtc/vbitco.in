const nav = document.querySelector("nav")!;
document.querySelector(".menu-button")!.addEventListener("click", () => {
    if (nav.style.display === "block") {
        nav.style.display = "none";
    } else {
        nav.style.display = "block";
    }
});