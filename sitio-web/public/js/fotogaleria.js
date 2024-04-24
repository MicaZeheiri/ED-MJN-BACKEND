const galeriaContainer = document.getElementById('galeria');

fetch('../imagenes.json')
  .then(response => response.json())
  .then(data => {

    const imagenes = data;
    imagenes.forEach(imagen => {

      const divElement = document.createElement('div');
      divElement.classList = 'box'


      const imgElement = document.createElement('img');
      imgElement.src = imagen.ruta;
      imgElement.classList = '';


      divElement.appendChild(imgElement);
      galeriaContainer.appendChild(divElement);
    });
  })

  .catch(error => {
    console.error('Error al cargar el archivo JSON', error)
  });