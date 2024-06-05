(() => {
    'use strict'

    const validarHoras = () => {
        const horasInicio = document.querySelectorAll('input[name="horaInicio"]');
        const horasFin = document.querySelectorAll('input[name="horaFin"]');
        let horasValidas = true; // Variable para controlar si todas las horas son válidas

        for (let i = 0; i < horasInicio.length; i++) {
            const horaInicio = horasInicio[i].value;
            const horaFin = horasFin[i].value;

            if (!(horaInicio < horaFin)) {
                horasValidas = false;

                horasInicio[i].classList.add('is-invalid');
                horasFin[i].classList.add('is-invalid');
            } else {

                horasInicio[i].classList.remove('is-invalid');
                horasFin[i].classList.remove('is-invalid');
            }
        }

        return horasValidas; 
    };

    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {

            if (!form.checkValidity() || !validarHoras()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated');

            if (!validarHoras()) {
                form.classList.remove('was-validated');
            }
        }, false)
    })
})();