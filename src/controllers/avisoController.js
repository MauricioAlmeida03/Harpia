var avisoModel = require("../models/avisoModel");
var nodeMailer = require('nodemailer');

function listar(req, res) {
    avisoModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    avisoModel.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function pesquisarFeedback(req, res) {
    var Feedback = req.params.Feedback;

    avisoModel.pesquisarFeedback(Feedback)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function publicar(req, res) {
    var avaliacao = req.body.avaliacao;
    var titulo = req.body.titulo;
    var Feedback = req.body.Feedback;
    var idUsuario = req.params.idUsuario;
    
    if (avaliacao == undefined) {
        res.status(400).send("A avaliação está indefinida!");
    } else if (titulo == undefined) {
        res.status(400).send("O título está indefinido!");
    } else if (Feedback == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        avisoModel.publicar(avaliacao, titulo, Feedback,idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function resgatarAvaliacoes(req, res) {
    var avaliacao = req.params.avaliacao;
    avisoModel.resgatarAvaliacoes(avaliacao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as avaliacoes: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

async function enviarEmail(req, res) {
    const email= req.body.email;
    const nome = req.body.nome;
    const { hora,data } = req.body;

    try {
        const emailContent = `Olá ${nome}!! <br>
            Sua reserva foi confirmada para o dia ${data} às ${hora}.
            Nome responsável: ${nome}. <br>
            Agradecemos pela reserva e aguardamos ansiosamente pela sua vinda!!
            <br><br>
            Atenciosamente, Equipe HARPIA`;

        const transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            port: 587,
            secure: false,
            auth: {
                user, pass
            }
        });

        const mailOptions = {
            from: user,
            to: email, 
            subject: 'Confirmação de Reserva',
            text: emailContent
        };

        // Enviar e-mail
        const info = await transporter.sendMail(mailOptions);
        res.send(info);
    } catch (error) {
        res.status(500).send(error);
    }
}



module.exports = {
    listar,
    listarPorUsuario,
    pesquisarFeedback,
    publicar,
    resgatarAvaliacoes,
    enviarEmail
}