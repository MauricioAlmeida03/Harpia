var database = require("../database/config");

function listar() {
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
function publicar(avaliacao, titulo, Feedback, idUsuario, fkUsuario) {
    var instrucaoSql = `
        INSERT INTO feedbackHarpia (avaliacao, titulo, feedback, fk_usuario) VALUES ('${avaliacao}', '${titulo}', '${Feedback}',${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    database.executar(instrucaoSql);

    var insercaoTabelaAssociativa = `
    INSERT INTO feedbackUsuario (fkUsuario,dtFeedbackHarpia) VALUES (${fkUsuario}, NOW());
`;
    console.log("Executando a instrução SQL para inserir o relacionamento N:M: \n" + insercaoTabelaAssociativa);

    // Executa a instrução SQL para inserir o relacionamento N:M
    return database.executar(insercaoTabelaAssociativa);
}
function resgatarAvaliacoes(avaliacao) {
    var instrucaoSql = `
            SELECT avaliacao from feedbackHarpia
                WHERE avaliacao = ${avaliacao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function enviarEmail(dtReserva, horaReserva, qtdPessoas, idUsuario) {
    var instrucaoSql = `
        INSERT INTO reserva (dtReserva,horaReserva,qtdPessoas,fkUsuario) values ('${dtReserva}','${horaReserva}:00','${qtdPessoas}','${idUsuario}')
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    database.executar(instrucaoSql);
    var insercaoTabelaAssociativa = `
    INSERT INTO reservaUsuario (fkUsuario,dtReserva) VALUES (${idUsuario}, NOW());
`;
    console.log("Executando a instrução SQL para inserir o relacionamento N:M: \n" + insercaoTabelaAssociativa);

    // Executa a instrução SQL para inserir o relacionamento N:M
    return database.executar(insercaoTabelaAssociativa);
}

function mediaAvaliacoes() {
    var instrucaoSql = `
    select round(avg(avaliacao),2) as mediaAvaliacao from feedbackHarpia;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    listar,
    listarPorUsuario,
    pesquisarFeedback,
    publicar,
    resgatarAvaliacoes,
    enviarEmail,
    mediaAvaliacoes
}
