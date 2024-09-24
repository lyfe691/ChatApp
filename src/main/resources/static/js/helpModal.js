// Help Modal JS
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.help-section');
    const mobileNavSelect = document.querySelector('.mobile-nav-select');

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

    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.parentElement.classList.toggle('active');
        });
    });

    feather.replace();
});