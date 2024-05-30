-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE harpia;
USE harpia;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);
select * from usuario;
-- /* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */
-- -- CREATE TABLE aviso (
-- -- 	idAviso INT PRIMARY KEY AUTO_INCREMENT,
-- -- 	titulo VARCHAR(100),
-- -- 	descricao VARCHAR(350),
-- -- 	fk_usuario INT,
-- -- 	FOREIGN KEY (fk_usuario) REFERENCES usuario(idUsuario)
-- -- );

CREATE  TABLE feedbackHarpia (
	idFeedback INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    feedback VARCHAR(200),
    avaliacao INT,
	fk_Usuario INT,
    FOREIGN KEY(fk_Usuario) REFERENCES usuario(idUsuario)
);

select*from feedbackHarpia;
delete from feedbackHarpia where idFeedback in(1,2);

CREATE TABLE reserva(
	idReserva INT AUTO_INCREMENT,
	dtReserva DATE,
	horaReserva TIME,
	fkUsuario INT, CONSTRAINT pkUsuarioReserva PRIMARY KEY (idReserva,fkUsuario),
	qtdPessoas INT, 
	CONSTRAINT fkUsuarioReserva FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

