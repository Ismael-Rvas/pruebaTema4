DROP DATABASE IF EXISTS hospital;

CREATE DATABASE hospital;
USE hospital;

CREATE TABLE medicos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    especialidad VARCHAR(200) NOT NULL,
    perfil VARCHAR(200) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO medicos (nombre, especialidad, estadoCivil) 
VALUES 
  ('Miguel', 'Traumatólogo', 'ESPECIALISTA'),
  ('Lucas', 'Dermatólogo', 'ESPECIALISTA'),
  ('Susana', 'Traumatólogo', 'RESIDENTE');

CREATE TABLE pacientes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    localidad VARCHAR(200) NOT NULL,
    fechaNacimiento DATE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO pacientes (nombre, localidad, fechaNacimiento) 
VALUES 
  ('Julio', 'Cordoba', '1990-05-24'),
  ('Ismael', 'Montilla', '1992-03-15'),
  ('Juan', 'Puente Genil', '1995-01-18');
