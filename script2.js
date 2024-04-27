document.addEventListener('DOMContentLoaded', function () {
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navbar-links');
    var links = navLinks.querySelectorAll('.nav-link');

    // Toggle hamburger menu
    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    // Close hamburger menu when a link is clicked
    links.forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });


});
