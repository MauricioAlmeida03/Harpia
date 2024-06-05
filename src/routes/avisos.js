var express = require("express");
var router = express.Router();
var avisoController = require("../controllers/avisoController");

router.get("/listar", function (req, res) {
    avisoController.listar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    avisoController.listarPorUsuario(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    avisoController.publicar(req, res);
});

router.get("/resgatarAvaliacoes/:avaliacao", function (req, res) {
    avisoController.resgatarAvaliacoes(req, res);
});

router.post("/enviarEmail", function (req, res) {
    avisoController.enviarEmail(req, res);
});
module.exports = router;