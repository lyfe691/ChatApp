document.addEventListener('DOMContentLoaded', function() {

    // -------------- Element and Variable Declarations --------------

    const settingsNavButtons = document.querySelectorAll('.settings-nav-btn');
    const settingsSections = document.querySelectorAll('.settings-section');
    const themeOptions = document.querySelectorAll('.theme-option');
    const saveThemeChangesButton = document.querySelector('#theme .primary-btn');
    const changeEmailForm = document.getElementById('changeEmailForm');
    const changePasswordForm = document.getElementById('changePasswordForm');
    const errorPopup = document.getElementById('errorPopup');
    const successPopup = document.getElementById('successPopup');
    const errorMessage = errorPopup.querySelector('.popup-message');
    const successMessage = successPopup.querySelector('.popup-message');

    let currentTheme = localStorage.getItem('theme') || 'system';
    let tempTheme = currentTheme;

    // -------------- Theme Handling --------------

    applyTheme(currentTheme);
    setActiveTheme(currentTheme);

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
        setActiveTheme(theme);
    }

    function setActiveTheme(theme) {
        themeOptions.forEach(option => {
            option.classList.remove('active');
            if (option.textContent.toLowerCase().includes(theme)) {
                option.classList.add('active');
            }
        });
    }

    window.setTheme = function(mode) {
        tempTheme = mode;
        applyTheme(mode);
    };

    async function saveThemeChanges() {
        currentTheme = tempTheme;
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

    function revertTheme() {
        applyTheme(currentTheme);
    }

    saveThemeChangesButton.addEventListener('click', saveThemeChanges);

    window.closeSettingsModal = function() {
        revertTheme();
        document.getElementById('settingsModal').style.display = 'none';
    };

    // -------------- Settings Navigation --------------

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

    // -------------- Change Email Form Handling --------------

    changeEmailForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const currentEmail = document.getElementById('currentEmail').value;
        const newEmail = document.getElementById('newEmail').value;
        const confirmNewEmail = document.getElementById('confirmNewEmail').value;
        const password = document.getElementById('passwordForEmail').value;

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
                changeEmailForm.reset();
            } else {
                showErrorPopup(resultText);
            }
        } catch (error) {
            console.error('Error changing email:', error);
            showErrorPopup('Error changing email. Please try again.');
        }
    });

    // -------------- Change Password Form Handling --------------

    changePasswordForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;

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
                changePasswordForm.reset();
            } else {
                showErrorPopup(resultText);
            }
        } catch (error) {
            console.error('Error changing password:', error);
            showErrorPopup('Error changing password. Please try again.');
        }
    });

    // -------------- Popup Notifications --------------

    function showErrorPopup(message) {
        errorMessage.textContent = message;
        errorPopup.style.display = 'block';
        errorPopup.style.opacity = '1';
        setTimeout(() => {
            errorPopup.style.opacity = '0';
            setTimeout(() => errorPopup.style.display = 'none', 400);
        }, 3000);
    }

    function showSuccessPopup(message) {
        successMessage.textContent = message;
        successPopup.style.display = 'block';
        successPopup.style.opacity = '1';
        setTimeout(() => {
            successPopup.style.opacity = '0';
            setTimeout(() => successPopup.style.display = 'none', 400);
        }, 3000);
    }
});
