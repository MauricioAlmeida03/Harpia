// sessão
function validarSessao() {
    let email = sessionStorage.EMAIL_USUARIO;
    let nome = sessionStorage.NOME_USUARIO;

    let usuarioNome = document.getElementById("usuarioNome");

    if (email != null && nome != null) {
        usuarioNome.innerHTML = nome;
    } else {
        window.location = "../index.html";
    }
}
function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}
// carregamento (loading)
function aguardar() {
    let aguardarValidacao = document.getElementById("div_aguardar");
    aguardarValidacao.style.display = "flex";
}

function finalizarAguardar(texto) {
    let aguardarValidacao = document.getElementById("div_aguardar");
    aguardarValidacao.style.display = "none";

    let erroValidacaoLogin = document.getElementById("div_erros_login");
    if (texto) {
        erroValidacaoLogin.style.display = "flex";
        erroValidacaoLogin.innerHTML = texto;
    }
}

