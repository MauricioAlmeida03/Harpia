let avisoModel = require("../models/avisoModel");
const nodeMailer = require('nodemailer');

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
    let idUsuario = req.params.idUsuario;

    avisoModel.listarPorUsuario(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log(
                "Houve um erro ao buscar os avisos: ", erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
}
function publicar(req, res) {
    let avaliacao = req.body.avaliacao;
    let titulo = req.body.titulo;
    let Feedback = req.body.Feedback;
    let idUsuario = req.params.idUsuario;
    let fkUsuario = req.params.idUsuario;
    let dtFeedbackHarpia = req.params.dtFeedbackHarpia;

    if (avaliacao == undefined) {
        res.status(400).send("A avaliação está indefinida!");
    } else if (titulo == undefined) {
        res.status(400).send("O título está indefinido!");
    } else if (Feedback == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        avisoModel.publicar(avaliacao, titulo, Feedback, idUsuario,fkUsuario,dtFeedbackHarpia)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}
function resgatarAvaliacoes(req, res) {
    let avaliacao = req.params.avaliacao;
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

function mediaAvaliacoes(req, res) {
    avisoModel.mediaAvaliacoes().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json({media: resultado[0].mediaAvaliacao});
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
    const emailUsuario = req.body.emailServer;
    const nomeUsuario = req.body.nomeServer;
    const dtReserva = req.body.dataReservaServer;
    const horaReserva = req.body.horaServer;
    const qtdPessoas = req.body.qtdPessoasServer;
    const idUsuario = req.body.idServer;
    try {
        // função para enviar o Email do usuario
        const emailContent = `Olá ${nomeUsuario} <br>
            Sua reserva foi confirmada para o dia ${dtReserva} às ${horaReserva}:00. <br>
            Nome responsável: ${nomeUsuario}. <br>
            Agradecemos pela reserva e aguardamos ansiosamente pela sua vinda!!
            <br><br>
            Atenciosamente, Equipe HARPIA`;
        const user = 'mauricio.almeida@sptech.school';
        const transporter = nodeMailer.createTransport({
            // protocolo de comunicação SMTP - envia e recebe
            host: 'smtp-mail.outlook.com',
            port: 587,
            secure: false,
            auth: {
                user,
                pass: '#Gf46155896895'
            }
        });
        const mailOptions = {
            from: user,
            to: emailUsuario,
            subject: 'Confirmação de Reserva',
            html: emailContent
        };
        const info = await transporter.sendMail(mailOptions);
        // Após enviar o email, salva a reserva no banco de dados
        const resultado = await avisoModel.enviarEmail(dtReserva, horaReserva, qtdPessoas, idUsuario);
        // Resposta da solicitação e conclusão do Banco de dados

        res.json({ info, resultado });

    }
    catch (error) {
        console.error('Erro ao realizar o post:', error);
        res.status(500).send(error);
    }
}
module.exports = {
    listar,
    listarPorUsuario,
    publicar,
    resgatarAvaliacoes,
    enviarEmail,
    mediaAvaliacoes
}