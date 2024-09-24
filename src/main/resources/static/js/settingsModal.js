document.addEventListener('DOMContentLoaded', function() {
    const settingsNavButtons = document.querySelectorAll('.settings-nav-btn');
    const settingsSections = document.querySelectorAll('.settings-section');
    const themeOptions = document.querySelectorAll('.theme-option');
    const saveChangesButton = document.querySelector('#theme .primary-btn'); // Save Changes button for theme
    const changeEmailForm = document.getElementById('changeEmailForm');
    const changePasswordForm = document.getElementById('changePasswordForm');
    const errorPopup = document.getElementById('errorPopup');
    const successPopup = document.getElementById('successPopup');
    const errorMessage = errorPopup.querySelector('.popup-message');
    const successMessage = successPopup.querySelector('.popup-message');

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

    // Save the theme changes permanently (send to server)
    async function saveThemeChanges() {
        currentTheme = tempTheme; // Make the temporary theme permanent
        localStorage.setItem('theme', currentTheme);

        try {
            const response = await fetch('/theme', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ theme: currentTheme }),
            });

            if (response.ok) {
                showSuccessPopup('Theme changes saved successfully!');
            } else {
                showErrorPopup('Failed to save theme changes.');
            }
        } catch (error) {
            console.error('Error saving theme:', error);
            showErrorPopup('Error saving theme. Please try again.');
        }
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
    changeEmailForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const currentEmail = document.getElementById('currentEmail').value;
        const newEmail = document.getElementById('newEmail').value;
        const confirmNewEmail = document.getElementById('confirmNewEmail').value;
        const password = document.getElementById('passwordForEmail').value;

        // Check if new email and confirmation match
        if (newEmail !== confirmNewEmail) {
            showErrorPopup('New email and confirmation do not match.');
            return;
        }

        try {
            const response = await fetch('/change-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    currentEmail: currentEmail,
                    newEmail: newEmail,
                    confirmNewEmail: confirmNewEmail,
                    password: password,
                }),
            });

            const resultText = await response.text();

            if (response.ok) {
                showSuccessPopup(resultText);
                changeEmailForm.reset(); // Reset the form on success
            } else {
                showErrorPopup(resultText);
            }
        } catch (error) {
            console.error('Error changing email:', error);
            showErrorPopup('Error changing email. Please try again.');
        }
    });


// Change Password Form Submission
    changePasswordForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;

        // Check if new password and confirmation match
        if (newPassword !== confirmNewPassword) {
            showErrorPopup('New password and confirmation do not match.');
            return;
        }

        try {
            const response = await fetch('/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    confirmNewPassword: confirmNewPassword,
                }),
            });

            const resultText = await response.text();

            if (response.ok) {
                showSuccessPopup(resultText);
                changePasswordForm.reset(); // Reset the form on success
            } else {
                showErrorPopup(resultText);
            }
        } catch (error) {
            console.error('Error changing password:', error);
            showErrorPopup('Error changing password. Please try again.');
        }
    });


    // Function to show error popup
    function showErrorPopup(message) {
        errorMessage.textContent = message;
        errorPopup.style.display = 'block';
        errorPopup.style.opacity = '1';
        setTimeout(() => {
            errorPopup.style.opacity = '0';
            setTimeout(() => errorPopup.style.display = 'none', 400); // Wait for hide animation to finish
        }, 3000); // Show for 3 seconds
    }

    // Function to show success popup
    function showSuccessPopup(message) {
        successMessage.textContent = message;
        successPopup.style.display = 'block';
        successPopup.style.opacity = '1';
        setTimeout(() => {
            successPopup.style.opacity = '0';
            setTimeout(() => successPopup.style.display = 'none', 400); // Wait for hide animation to finish
        }, 3000); // Show for 3 seconds
    }
});
