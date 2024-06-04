const password = document.getElementById('password');
const ojo = document.getElementById('btnVerPsw');

ojo.addEventListener('click', (e) => {
    if (password.type === 'password') {
        password.type = 'text';
        ojo.classList.remove('bi-eye');
        ojo.classList.add('bi-eye-slash');
    } else {
        password.type = 'password';
        ojo.classList.remove('bi-eye-slash');
        ojo.classList.add('bi-eye');
    }
});