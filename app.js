let ambiente_processo = 'desenvolvimento';

let caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });
let express = require("express");
let cors = require("cors");
let path = require("path");
let PORTA_APP = process.env.APP_PORT;
let HOST_APP = process.env.APP_HOST;

let app = express();

let indexRouter = require("./src/routes/index");
let usuarioRouter = require("./src/routes/usuarios");
let avisosRouter = require("./src/routes/avisos");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);

app.listen(PORTA_APP, function () {
    console.log(`
    \n\n                                                                                              
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:.`);
});
