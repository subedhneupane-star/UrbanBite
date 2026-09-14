// ------------------------------
// Menu Filtering
// ------------------------------

const filterButtons = document.querySelectorAll(".menu-filters button");
const menuItems = document.querySelectorAll(".menu-item");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedCategory = button.textContent.toLowerCase();

        filterButtons.forEach(function (filterButton) {
            filterButton.setAttribute("aria-pressed", "false");
        });

        button.setAttribute("aria-pressed", "true");
        menuItems.forEach(function (item) {

            const itemCategory = item.dataset.category;

            if (
                selectedCategory === "all" ||
                itemCategory === selectedCategory.slice(0, -1)
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});
// ------------------------------
// Reservation Form Validation
// ------------------------------

const reservationForm = document.getElementById("reservationForm");
const formMessage = document.getElementById("formMessage");
const reservationDate = document.getElementById("date");

if (reservationDate) {

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    reservationDate.min = `${year}-${month}-${day}`;

}
if (reservationForm) {

    reservationForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const guests = document.getElementById("guests").value;

        if (!name || !email || !date || !time || !guests) {

            formMessage.textContent =
                "Please complete all required fields.";

            return;
        }
        if (date < reservationDate.min) {

    formMessage.textContent =
        "Please select a future date for your reservation.";

    return;
}

        formMessage.textContent =
            "Thank you, " + name +
            "! Your reservation request has been received.";

        reservationForm.reset();
    });

}
// ------------------------------
// Mobile Navigation
// ------------------------------

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        if (isOpen) {
            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );
        } else {
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }

    });

}
// ------------------------------
// Back to Top
// ------------------------------

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}
// ------------------------------
// Active Navigation Link
// ------------------------------

const currentPage = window.location.pathname.split("/").pop();

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function (link) {

    const linkPage = link.getAttribute("href");

    if (
        linkPage === currentPage ||
        (currentPage === "" && linkPage === "index.html")
    ) {
        link.setAttribute("aria-current", "page");
    }

});
// ------------------------------
// Close Mobile Navigation with Escape
// ------------------------------

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape" && navLinks && navLinks.classList.contains("active")) {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuToggle.focus();
    }

});