document.addEventListener('DOMContentLoaded', function() {
    const settingsNavButtons = document.querySelectorAll('.settings-nav-btn');
    const settingsSections = document.querySelectorAll('.settings-section');
    const themeOptions = document.querySelectorAll('.theme-option');
    const saveChangesButton = document.querySelector('#theme .primary-btn'); // Save Changes button for theme
    const changeEmailForm = document.getElementById('changeEmailForm');
    const changePasswordForm = document.getElementById('changePasswordForm');

    let currentTheme = localStorage.getItem('theme') || 'system'; // Store the current theme
    let tempTheme = currentTheme; // Temporary theme to track user changes

    // Apply the saved theme on load
    applyTheme(currentTheme);
    setActiveTheme(currentTheme);

    // Function to apply the selected theme
    function applyTheme(theme) {
        const root = document.documentElement;
        if (theme === 'light') {
            root.setAttribute('data-theme', 'light');
        } else if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                root.setAttribute('data-theme', 'dark');
            } else {
                root.setAttribute('data-theme', 'light');
            }
        }
        setActiveTheme(theme); // Highlight the active theme
    }

    // Set the active theme option in the UI
    function setActiveTheme(theme) {
        themeOptions.forEach(option => {
            option.classList.remove('active');
            if (option.textContent.toLowerCase().includes(theme)) {
                option.classList.add('active');
            }
        });
    }

    // Theme selection: Temporarily change the theme
    window.setTheme = function(mode) {
        tempTheme = mode; // Store the temporary theme
        applyTheme(mode);
    };

    // Save the theme changes permanently
    function saveThemeChanges() {
        currentTheme = tempTheme; // Make the temporary theme permanent
        localStorage.setItem('theme', currentTheme);
        alert('Theme changes saved successfully!');
    }

    // Revert to the original theme if changes are not saved
    function revertTheme() {
        applyTheme(currentTheme); // Revert to the saved theme
    }

    // Event listener for Save Changes button
    saveChangesButton.addEventListener('click', saveThemeChanges);

    // When the settings modal is closed, revert unsaved theme changes
    window.closeSettingsModal = function() {
        revertTheme(); // Revert to the previous theme if changes were not saved
        document.getElementById('settingsModal').style.display = 'none';
    };

    // Settings navigation
    function setActiveSettingsSection(target) {
        settingsNavButtons.forEach(btn => btn.classList.remove('active'));
        settingsSections.forEach(section => section.classList.remove('active'));
        document.querySelector(`.settings-nav-btn[data-target="${target}"]`).classList.add('active');
        document.getElementById(target).classList.add('active');
    }

    settingsNavButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.dataset.target;
            setActiveSettingsSection(target);
        });
    });

    // Change Email Form Submission
    changeEmailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const currentEmail = document.getElementById('currentEmail').value;
        const newEmail = document.getElementById('newEmail').value;
        const confirmNewEmail = document.getElementById('confirmNewEmail').value;
        const password = document.getElementById('passwordForEmail').value;

        if (newEmail !== confirmNewEmail) {
            alert('New email and confirmation do not match.');
            return;
        }

        ///placeholder server request to change email.
        console.log('Changing email:', { currentEmail, newEmail, password });
        alert('Email change request submitted. Please check your new email for confirmation.');
    });

    // Change Password Form Submission
    changePasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;

        if (newPassword !== confirmNewPassword) {
            alert('New password and confirmation do not match.');
            return;
        }

        // palceholder for server request.
        console.log('Changing password:', { currentPassword, newPassword });
        alert('Password changed successfully.');
    });
});



