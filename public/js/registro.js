const pwd = document.getElementById('password');
const mensaje = document.getElementById('mensaje');



const mensajeError = `<p id="mensaje" style="font-size: small; color: red">La contraseña debe tener al menos 6 caracteres</p>`;
const mensajeAceptado = `<p style="font-size: small; color: green">La contraseña es aceptada</p>`;


pwd.addEventListener('input', () => {
        const pwdLength = pwd.value.length;

        if (pwdLength < 6) {
            mensaje.textContent = 'La contraseña debe tener al menos 6 caracteres';
        } else {
            mensaje.textContent = '';
        }
        
    })
