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
            <input name="horaFin" class="form-control" type="time" required>
        </div>
    `;
    contenedorDiasExtra.appendChild(nuevaFila);
});

