CREATE DATABASE harpia;
USE harpia;
CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);
CREATE  TABLE feedbackHarpia (
	idFeedback INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    feedback VARCHAR(200),
    avaliacao INT,
	fk_Usuario INT,
    FOREIGN KEY(fk_Usuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE reserva(
	idReserva INT AUTO_INCREMENT,
	dtReserva DATE,
	horaReserva TIME,
	fkUsuario INT, CONSTRAINT pkUsuarioReserva PRIMARY KEY (idReserva,fkUsuario),
	qtdPessoas INT, 
	CONSTRAINT fkUsuarioReserva FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE reservaUsuario(
	fkUsuario INT,
    fkReserva INT auto_increment,
    primary key(fkUsuario,fkReserva),
    dtReserva DATETIME,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (fkReserva) REFERENCES reserva (idReserva)
);
CREATE TABLE feedbackUsuario(
	fkUsuario INT,
    fkFeedback INT AUTO_INCREMENT,
     PRIMARY KEY(fkUsuario,fkFeedback),
    dtFeedbackHarpia DATE,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (fkFeedback) REFERENCES feedbackHarpia (idFeedback)
);

select * from usuario;
select * from feedbackHarpia;
select * from reserva;
select * from feedbackUsuario;