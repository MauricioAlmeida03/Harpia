var database = require("../database/config");

function listar() {
    console.log("Acessando o AVISO MODEL function listar()");
    var instrucaoSql = `
            SELECT 
            f.idFeedback AS idFeedback,
            f.titulo,
            f.feedback,
            f.avaliacao,
            f.fk_usuario,
            u.idUsuario AS idUsuario,
            u.nome,
            u.email,
            u.senha
            FROM feedbackHarpia as f
            INNER JOIN usuario as u
                ON f.fk_usuario = u.idUsuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function pesquisarFeedback(texto) {
    console.log("Acessando o AVISO MODEL function pesquisarFeedback()");
    var instrucaoSql = `
    SELECT 
    f.idFeedback AS idFeedback,
    f.titulo,
    f.feedback,
    f.avaliacao,
    f.fk_usuario,
    u.idUsuario AS idUsuario,
    u.nome,
    u.email,
    u.senha
FROM feedbackHarpia as f
    INNER JOIN usuario as u
                ON f.fk_usuario = u.idUsuario
        WHERE f.feedback LIKE '${texto}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function listarPorUsuario(idUsuario) {
    console.log("Acessando o AVISO MODEL function listarPorUsuario()");
    var instrucaoSql = `
    SELECT 
    f.idFeedback AS idFeedback,
    f.titulo,
    f.feedback,
    f.avaliacao,
    f.fk_usuario,
    u.idUsuario AS idUsuario,
    u.nome,
    u.email,
    u.senha
    FROM feedbackHarpia as f
    INNER JOIN usuario as u
                ON f.fk_usuario = u.idUsuario
        WHERE u.idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function publicar( avaliacao, titulo, Feedback, idUsuario) {
    console.log("Acessando o AVISO MODEL function publicar(): ", titulo, Feedback, idUsuario);
    var instrucaoSql = `
        INSERT INTO feedbackHarpia (avaliacao, titulo, feedback, fk_usuario) VALUES ('${avaliacao}', '${titulo}', '${Feedback}',${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function resgatarAvaliacoes(avaliacao) {
    console.log("Acessando o AVISO MODEL function resgatarAvaliacoes()");
    var instrucaoSql = `
            SELECT avaliacao from feedbackHarpia
                WHERE avaliacao = ${avaliacao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function enviarEmail() {
    console.log("Acessando o AVISO MODEL function enviarEmail()");
    var instrucaoSql = `
            SELECT 
            r.idReserva
            r.dtReserva,
            r.horaReserva,
            u.email,
            u.nome
            FROM reserva as r
            INNER JOIN usuario as u
                ON r.fkUsuario = u.idUsuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    listar,
    listarPorUsuario,
    pesquisarFeedback,
    publicar,
    resgatarAvaliacoes,
    enviarEmail
}
