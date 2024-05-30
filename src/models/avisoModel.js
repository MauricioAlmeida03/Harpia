var database = require("../database/config");

function listar() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
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
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarFeedback()");
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
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
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
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", titulo, Feedback, idUsuario);
    var instrucaoSql = `
        INSERT INTO feedbackHarpia (avaliacao, titulo, feedback, fk_usuario) VALUES ('${avaliacao}', '${titulo}', '${Feedback}', ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function resgatarAvaliacoes(avaliacao) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
            SELECT avaliacao from feedbackHarpia
                WHERE avaliacao = ${avaliacao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    listarPorUsuario,
    pesquisarFeedback,
    publicar,
    resgatarAvaliacoes
}
