// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var usuarioNome = document.getElementById("usuarioNome");

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
    var aguardarValidacao = document.getElementById("div_aguardar");
    aguardarValidacao.style.display = "flex";
}

function finalizarAguardar(texto) {
    var aguardarValidacao = document.getElementById("div_aguardar");
    aguardarValidacao.style.display = "none";

    var erroValidacaoLogin = document.getElementById("div_erros_login");
    if (texto) {
        erroValidacaoLogin.style.display = "flex";
        erroValidacaoLogin.innerHTML = texto;
    }
}

