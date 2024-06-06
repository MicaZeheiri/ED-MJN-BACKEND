const pwd = document.getElementById('password');
const mensaje = document.getElementById('mensaje');

pwd.addEventListener('input', () => {
    const pwdLength = pwd.value.length;

    if (pwdLength < 6) {
        mensaje.textContent = 'La contraseña debe tener al menos 6 caracteres';
    } else {
        mensaje.textContent = '';
    }

});
