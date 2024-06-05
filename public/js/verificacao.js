function registrar() {
    const nome = input_nome.value
    const email = input_email.value
    const senha = input_senha.value
    const senhaConfirmada = input_senhaConfirmada.value
    let verificarLetraMaiuscula = false
    let verificarCaracterEspecial = false
    let caracteresEspeciais = "!@#$%^&*(),.?/:{}|<>"
    let letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let senhaValidada = false



    // verificação de campos
    if (nome == "" ||
        email == "" ||
        senha == "" ||
        telefone == "" ||
        senhaConfirmada == "") {

        alertaValidacaoErro.style.display = 'block';
        div_alertasValidacao.innerHTML = `PREENCHA TODOS OS CAMPOS!`
    } else if (senha != senhaConfirmada) {
        alertaValidacaoErro.style.display = 'block';
        mensagem_erro.innerHTML = "AS SENHAS PRECISAM SER IGUAIS!"

    } else if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        alertaValidacaoErro.style.display = 'block';
        mensagem_erro.innerHTML = "DIGITE UM <br> E-MAIL VÁLIDO, CONTENDO '@' e '.' !"

    } else if (senha.length < 8) {
        alertaValidacaoErro.style.display = 'block';
        mensagem_erro.innerHTML = "SUA SENHA TEM QUE TER NO MINIMO 8 CARACTERES"

    } else {
        for (let senhaVerificar = 0; senhaVerificar < senha.length; senhaVerificar++) {
            let char = senha[senhaVerificar]
            if (caracteresEspeciais.indexOf(char) != -1) {
                verificarCaracterEspecial = true;

            } if (letrasMaiusculas.indexOf(char) != -1) {
                verificarLetraMaiuscula = true;
            }
        } if (verificarCaracterEspecial && verificarLetraMaiuscula) {
            senhaValidada = true
        } if (senhaValidada == false) {
            alertaValidacaoErro.style.display = 'block';
            div_alertasValidacao.innerHTML = "DIGITE UMA SENHA COM CARACTER ESPECIAL E LETRA MAISCULA"
        } else {
            window.location.href = "login.html";
        }
    }
}

function login() {

}

