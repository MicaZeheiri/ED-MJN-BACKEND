# Página Web del Estudio de Danza María José Núñez

## Descripción
Esta es la página web del Estudio de Danza María José Núñez, un espacio dedicado a la promoción de la danza, clases, eventos y más. 
Podés encontrar información de la academia y lo que ofrece en varias secciones. 
- **Inicio:** cuenta un poco como se lleva a cabo la enseñanza en el estudio.
- **Staff:** para que conozcas a los profesores que forman parte del equipo.
- **Clases:** están todos los horarios de clases organizados por estilo de danza.
- **Fotogalería:** podés ver algunos registros de nuestras alumnas en presentaciones y certámenes.
- **Alquiler de salas:** si te interesa alquilar nuestro espacio para algún evento, podés ver lo que ofrecemos aquí.
- **Contacto:** por cualquier consulta que tengas, te dejamos todos los medios para contactarnos.
- **Mis clases y pagos:** siendo alumno registrado del estudio, podés revisar los horarios de las clases a las que te inscribiste, y también información sobre los pagos de tus cuotas.
- **Registrarme:** solo podés crear tu cuenta si estás registrado como alumno en la academia.
- **Inicio de sesión:** permite acceder a la sección de "Mis clases y pagos" si ya se cuenta con un usuario registrado de tipo Alumno, y también al sistema de gestión privado si se ingresó con el usuario tipo Administrador.

El sistema de gestión privado de la academia permite la administración de cada actividad realizada en la misma. Para acceder, se debe iniciar sesión en modo de administrador.
Este sistema cuenta con las secciones de:
- **Inscripción de alumno:** para cargar los datos personales de los alumnos que se incorporan al estudio.
- **Inscripción a clases:** para registrar a los alumnos inscriptos en las clases que deseen tomar. 
- **Clases:** muestra los datos de las clases que se imparten en la academia y permite la edición o eliminación de las mismas. También cuenta con la opción de añadir una nueva clase.
- **Profesores:** presenta los datos de cada profesor de la escuela, también permitiendo la edición o eliminación de los mismos. Si se decide editar alguno de ellos, debajo de los datos del profesor se pueden visualizar las clases que tiene a cargo y el sueldo que le corresponde de acuerdo al precio por alumno acordado.
- **Alumnos:** genera un listado de todos los alumnos que fueron registrados en la academia, junto con sus datos de contacto. Permite la edición de los mismos, mostrando debajo de sus datos personales las clases en las que se encuentra inscripto y el monto de cuota correspondiente. También brinda la posibilidad de dar de baja al alumno en las clases que se requiera.
- **Cuotas:** muestra todas las cuotas que han sido abonadas hasta el día de la fecha, especificando al alumno, mes y año a la que corresponde, su monto y la fecha en la que fue abonada. También cuenta con la opción de registrar un nuevo pago de cuota.

## Tecnologías Utilizadas
Este proyecto utiliza las siguientes tecnologías:

- **HTML5**: Estructura del contenido de la página.
- **CSS3**: Estilos y diseño para una experiencia visual atractiva.
- **JavaScript**: Interactividad y funcionalidades dinámicas.
- **Bootstrap**: Framework CSS para un diseño receptivo y componentes preestablecidos.
- **Handlebars:** Motor de plantillas para generar HTML dinámico en el lado del servidor.
- **Express**: Framework de Node.js para construir aplicaciones web y APIs de manera sencilla y eficiente.
- **Node.js**: Entorno de ejecución para JavaScript en el servidor, permitiendo el desarrollo del backend con JavaScript.
- **MySQL**: Sistema de gestión de bases de datos relacional utilizado para almacenar y gestionar los datos del sistema.
- **Express-Session**: Middleware para gestionar sesiones de usuario en Express.
- **dotenv**: Módulo para cargar variables de entorno desde un archivo `.env` al entorno de Node.js, manteniendo las configuraciones sensibles y credenciales fuera del código fuente.
- **bcrypt**: Biblioteca para cifrar contraseñas, asegurando que las contraseñas de los usuarios se almacenen de forma segura.
- **nodemailer**: Biblioteca para enviar correos electrónicos automáticos desde Node.js, facilitando la comunicación por correo electrónico desde la aplicación.
- **Git**: Sistema de control de versiones utilizado para el seguimiento de cambios en el código fuente.
- **GitHub**: Plataforma de hospedaje de repositorios Git, utilizada para la colaboración y gestión del código fuente del proyecto.

## Inicio de sesión de administrador
Si se quiere iniciar la sesión como administrador en la página use como DNI: **12345678** y como contraseña: **administrador**.


## GUÍA DE INSTALACIÓN Y EJECUCIÓN LOCAL

Para instalar y ejecutar la aplicación de la escuela en tu entorno local, sigue los siguientes pasos:

### Requisitos Previos
Asegúrate de tener instalados los siguientes componentes:
- **Node.js** (versión 14.x o superior)
- **npm** (el gestor de paquetes de Node.js, que generalmente viene con Node.js)
- **MySQL Workbench** (para la base de datos)

### Paso 1: Clonar el Repositorio
Primero, clona el repositorio del proyecto desde GitHub a tu máquina local:
```sh
git clone https://github.com/MicaZeheiri/ED-MJN-BACKEND.git
cd tu_repositorio
```
### Paso 2: Instalar Dependencias
Instala todas las dependencias necesarias ejecutando el siguiente comando en el directorio del proyecto:
```sh 
npm i 
```
### Paso 3: Configurar Variables de Entorno
Crea un archivo .env en el directorio raíz del proyecto y agrega las siguientes variables de entorno. Asegúrate de reemplazar los valores con tus propias configuraciones:
- PORT=número-de-puerto-de-ejecución
- PORTSQL=número-de-puerto-sql
- USERSQL=usuario-de-sql
- PASSWORDSQL=contaseña-de-sql
- HOSTSQL=nombre-host-de-sql
- DATASQL=nombre-base-de-datos
- MAIL_EMPRESA="tu_correo@ejemplo.com"
- PASS_MAIL_EMPRESA="código-del-mail-para-envio-automático"
- SECRET_KEY="clave-secreta-para-sesiones"

### Paso 4: Configurar la Base de Datos
Asegúrate de tener una base de datos MySQL configurada. Luego, crea la base de datos y las tablas necesarias. Usa el archivo de script SQL "Database.sql" que está en la carpeta "models" para crear las tablas y realizar los INSERT de datos necesarios para el funcionamiento correcto de la página.

### Paso 5: Ejecutar la Aplicación
Finalmente, ejecuta la aplicación usando el siguiente comando:
```sh 
npm start
```

### Paso 6: Acceder a la Aplicación
Abre tu navegador y ve a http://localhost:PUERTO-CONFIGURADO para ver la aplicación en funcionamiento.