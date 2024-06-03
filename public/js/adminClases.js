const btnAgregarDia = document.getElementById('btn-agregar-dia');
const contenedorDiasExtra = document.getElementById('dias-extra');

btnAgregarDia.addEventListener('click', () => {

    const nuevaFila = document.createElement('div');
    nuevaFila.classList.add('row', 'horarios');

    nuevaFila.innerHTML = `
    <div class="col">
        <label for="dia" class="form-label mt-3">Día: </label>
        <select name="dia" class="form-select" required>
            <option selected value="">-- Seleccione un día --</option>
            {{#each dia}}
            <option value="{{codDia}}">{{nombreDia}}</option>
            {{/each}}
        </select>
    </div>
    <div class="col">
        <label class="form-label mt-3" for="horaInicio">Desde: </label>
        <input name="horaInicio" class="form-control" type="time" required>
    </div>
    <div class="col">
        <label class="form-label mt-3" for="horaFin">Hasta: </label>
        <input name="horaFin" class="form-control" type="time"required>
        <div class="invalid-feedback">
            La hora desde debe ser menor a la hora hasta.
        </div>
    </div>
`;
    contenedorDiasExtra.appendChild(nuevaFila);
});


(() => {
    'use strict'

    // Función para validar las horas
    const validarHoras = () => {
        const horasInicio = document.querySelectorAll('input[name="horaInicio"]');
        const horasFin = document.querySelectorAll('input[name="horaFin"]');
        let horasValidas = true; // Variable para controlar si todas las horas son válidas

        for (let i = 0; i < horasInicio.length; i++) {
            const horaInicio = horasInicio[i].value;
            const horaFin = horasFin[i].value;

            if (!(horaInicio < horaFin)) {
                horasValidas = false;
                // Marcar los campos de horaInicio y horaFin en rojo si las horas no son válidas
                horasInicio[i].classList.add('is-invalid');
                horasFin[i].classList.add('is-invalid');
            } else {
                // Remover la clase de inválido si las horas son válidas
                horasInicio[i].classList.remove('is-invalid');
                horasFin[i].classList.remove('is-invalid');
            }
        }

        return horasValidas; // Retornar true si todas las horas son válidas, false de lo contrario
    };

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            // Validar el formulario con Bootstrap y las horas
            if (!form.checkValidity() || !validarHoras()) {
                event.preventDefault()
                event.stopPropagation()
            }

            // Marcar el formulario como validado
            form.classList.add('was-validated');

            // Si las horas no son válidas, quitar la clase was-validated para restablecer los estilos
            if (!validarHoras()) {
                form.classList.remove('was-validated');
            }
        }, false)
    })
})();