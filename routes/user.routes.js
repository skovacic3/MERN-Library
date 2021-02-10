const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.get("/api/verify", [authJwt.verifyToken], (req, res) => { res.status(200).send({ valid: true }) });

    app.get("/api/isAdmin", [authJwt.verifyToken, authJwt.isAdmin], (req, res) => { res.status(200).send({ valid: true }) });
};