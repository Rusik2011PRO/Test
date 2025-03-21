document.addEventListener('DOMContentLoaded', function() {
    const registrationLink = document.getElementById('registration-link');
    const loginLink = document.getElementById('login-link');
    const registrationOverlay = document.getElementById('registration-overlay');
    const loginOverlay = document.getElementById('login-overlay');
    const registrationForm = document.getElementById('registration-form');
    const loginForm = document.getElementById('login-form');
    const welcomeMessage = document.getElementById('welcome-message');

    function showOverlay(overlay) {
        overlay.style.display = 'flex';
    }

    function hideOverlay(overlay) {
        overlay.style.display = 'none';
    }

    registrationLink.addEventListener('click', function(event) {
        event.preventDefault();
        showOverlay(registrationOverlay);
    });

    loginLink.addEventListener('click', function(event) {
        event.preventDefault();
        showOverlay(loginOverlay);
    });

    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', function() {
            hideOverlay(this.closest('.overlay'));
        });
    });

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (password.length < 6) {
            alert('Пароль должен содержать не менее 6 символов.');
            return;
        }

        localStorage.setItem('username', username);

        updateWelcomeMessage(username);

        hideOverlay(registrationOverlay);

        registrationForm.reset();
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const storedUsername = localStorage.getItem('username');

        if (storedUsername === username) {
            updateWelcomeMessage(username);

            hideOverlay(loginOverlay);

            loginForm.reset();
        } else {
            alert('Неверное имя пользователя или пароль.');
        }
    });

    function updateWelcomeMessage(username) {
        welcomeMessage.innerHTML = `Привет, ${username}! <a href="#" id="logout-link">Выйти</a>`;

        const logoutLink = document.getElementById('logout-link');
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('username');
            welcomeMessage.innerHTML = `<a href="#" id="registration-link">Регистрация</a> | <a href="#" id="login-link">Войти</a>`;
            setupEventListeners();
        });
    }

    function setupEventListeners() {
        const registrationLink = document.getElementById('registration-link');
        const loginLink = document.getElementById('login-link');

        registrationLink.addEventListener('click', function(event) {
            event.preventDefault();
            showOverlay(registrationOverlay);
        });

        loginLink.addEventListener('click', function(event) {
            event.preventDefault();
            showOverlay(loginOverlay);
        });
    }

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        updateWelcomeMessage(storedUsername);
    }

    setupEventListeners();

    const burgerMenu = document.getElementById('burger-menu');
    const mainNavigation = document.getElementById('main-navigation');
    const swipeContainer = document.getElementById('swipe-container'); 

    burgerMenu.addEventListener('click', () => {
        mainNavigation.classList.toggle('active');
    });

    
    let touchstartX = 0;
    let touchendX = 0;

    function checkSwipe() {
        //
        if (window.innerWidth <= 768 && !mainNavigation.classList.contains('active') && (touchendX - touchstartX) > 50) {
            mainNavigation.classList.add('active');
        }
    }

    swipeContainer.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    });

    swipeContainer.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        checkSwipe();
    });
});