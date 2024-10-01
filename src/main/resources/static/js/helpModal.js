// -------------- DOM Content Loaded and Element Declarations --------------

document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.help-section');
    const mobileNavSelect = document.querySelector('.mobile-nav-select');
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    // -------------- Section Navigation Handling --------------

    function setActiveSection(target) {
        navButtons.forEach(btn => btn.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        document.querySelector(`.nav-btn[data-target="${target}"]`).classList.add('active');
        document.getElementById(target).classList.add('active');
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.dataset.target;
            setActiveSection(target);
        });
    });

    mobileNavSelect.addEventListener('change', function() {
        setActiveSection(this.value);
    });

    // -------------- Accordion Functionality --------------

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.parentElement.classList.toggle('active');
        });
    });

    // -------------- Feather Icons Replacement --------------

    feather.replace();
});
