-- CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE estudioDanzaMJN;

-- SELECCIÓN DE LA BASE DE DATOS
USE estudioDanzaMJN;

-- CREACIÓN DE LAS TABLAS
CREATE TABLE alumnos(
dniAlumno bigint not null,
nombreAlumno varchar(120),
apellidoAlumno varchar(100),
telefonoAlumno bigint,
fechaNacimiento date,
emailAlumno varchar(80),
password varchar(300),
PRIMARY KEY(dniAlumno)
);

CREATE TABLE profesores(
dniProfesor bigint not null,
nombreProfesor varchar(120),
apellidoProfesor varchar(100),
telefonoProfesor bigint,
emailProfesor varchar(80),
precioXalumno smallint,
PRIMARY KEY(dniProfesor)
);

CREATE TABLE ritmos(
codRitmo tinyint auto_increment not null,
nombreRitmo varchar(30),
PRIMARY KEY(codRitmo)
);

CREATE TABLE niveles(
codNivel tinyint auto_increment not null,
nombreNivel varchar(30),
PRIMARY KEY(codNivel)
);

CREATE TABLE meses(
numero tinyint auto_increment not null,
nombreMes varchar(10),
PRIMARY KEY(numero)
);

CREATE TABLE dias(
codDia tinyint auto_increment not null,
nombreDia varchar(10),
PRIMARY KEY(codDia)
);

CREATE TABLE administradores(
dniAdmin bigint not null,
password varchar(300),
PRIMARY KEY(dniAdmin)
);

CREATE TABLE clases(
ritmo tinyint not null,
nivel tinyint not null,
profesor bigint,
PRIMARY KEY(ritmo, nivel),
FOREIGN KEY(ritmo) REFERENCES ritmos(codRitmo),
FOREIGN KEY(nivel) REFERENCES niveles(codNivel),
FOREIGN KEY(profesor) REFERENCES profesores(dniProfesor) ON UPDATE CASCADE
);

CREATE TABLE horarios(
idHorario int auto_increment not null,
ritmo tinyint not null,
nivel tinyint not null,
dia tinyint not null,
horaInicio time,
horaFin time,
PRIMARY KEY(idHorario),
FOREIGN KEY(ritmo, nivel) REFERENCES clases(ritmo, nivel),
FOREIGN KEY(dia) REFERENCES dias(codDia)
);

CREATE TABLE clasePorAlumno(
dniAlumno bigint not null,
ritmo tinyint not null,
nivel tinyint not null,
PRIMARY KEY(dniAlumno, ritmo, nivel),
FOREIGN KEY(ritmo, nivel) REFERENCES clases(ritmo, nivel),
FOREIGN KEY(dniAlumno) REFERENCES alumnos(dniAlumno)
);

CREATE TABLE cuotas(
mes tinyint not null,
anio year not null,
dniAlumno bigint not null,
montoPagado int,
fechaDePago date,
PRIMARY KEY(dniAlumno, mes, anio),
FOREIGN KEY(mes) REFERENCES meses(numero),
FOREIGN KEY(dniAlumno) REFERENCES alumnos(dniAlumno) ON UPDATE CASCADE
);

-- INSERCIÓN DE DATOS NECESARIOS
INSERT INTO ritmos VALUES(null, "Introducción a la Danza");
INSERT INTO ritmos VALUES(null, "Preparatorio");
INSERT INTO ritmos VALUES(null, "Danza Clásica");
INSERT INTO ritmos VALUES(null, "Danza Contemporánea");
INSERT INTO ritmos VALUES(null, "Danza Jazz");
INSERT INTO ritmos VALUES(null, "Tap");
INSERT INTO ritmos VALUES(null, "Street Dance");
INSERT INTO ritmos VALUES(null, "Acrotela");
INSERT INTO ritmos VALUES(null, "Yoga Integral");
INSERT INTO ritmos VALUES(null, "Comedia Musical");

INSERT INTO niveles VALUES(null, "Introducción a la Danza");
INSERT INTO niveles VALUES(null, "Preparatorio");
INSERT INTO niveles VALUES(null, "Jazz Contemporáneo");
INSERT INTO niveles VALUES(null, "Pre Inicial");
INSERT INTO niveles VALUES(null, "Inicial Niños");
INSERT INTO niveles VALUES(null, "Inicial Juvenil");
INSERT INTO niveles VALUES(null, "Inicial Adultos");
INSERT INTO niveles VALUES(null, "Intermedio");
INSERT INTO niveles VALUES(null, "Intermedio / Avanzado");
INSERT INTO niveles VALUES(null, "Avanzado");
INSERT INTO niveles VALUES(null, "Niños");
INSERT INTO niveles VALUES(null, "Principiantes");
INSERT INTO niveles VALUES(null, "Infantil");
INSERT INTO niveles VALUES(null, "Inicial");
INSERT INTO niveles VALUES(null, "Juvenil");
INSERT INTO niveles VALUES(null, "Minis");
INSERT INTO niveles VALUES(null, "Kids");
INSERT INTO niveles VALUES(null, "Jóvenes y Adultos");
INSERT INTO niveles VALUES(null, "Todos");

INSERT INTO dias VALUES(null, "Lunes");
INSERT INTO dias VALUES(null, "Martes");
INSERT INTO dias VALUES(null, "Miércoles");
INSERT INTO dias VALUES(null, "Jueves");
INSERT INTO dias VALUES(null, "Viernes");
INSERT INTO dias VALUES(null, "Sábado");

INSERT INTO meses VALUES(null, "Enero");
INSERT INTO meses VALUES(null, "Febrero");
INSERT INTO meses VALUES(null, "Marzo");
INSERT INTO meses VALUES(null, "Abril");
INSERT INTO meses VALUES(null, "Mayo");
INSERT INTO meses VALUES(null, "Junio");
INSERT INTO meses VALUES(null, "Julio");
INSERT INTO meses VALUES(null, "Agosto");
INSERT INTO meses VALUES(null, "Septiembre");
INSERT INTO meses VALUES(null, "Octubre");
INSERT INTO meses VALUES(null, "Noviembre");
INSERT INTO meses VALUES(null, "Diciembre");

INSERT INTO administradores VALUES(12345678, '$2b$10$y0t1mciWQpCrw5X6/mw0s.OGRyg7EHljAqDHa3Nd9D3LDz.i5Mpb.');
