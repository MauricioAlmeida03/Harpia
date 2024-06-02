CREATE DATABASE harpia;
USE harpia;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);
select * from usuario;

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
