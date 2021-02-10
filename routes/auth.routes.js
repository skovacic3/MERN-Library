const { authJwt } = require("../middlewares");

const { verifySignUp } = require('../middlewares');
const controller = require('../controllers/auth');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp
        ],
        controller.signup
    );

    app.post("/api/auth/signin", controller.signin);

    app.get("/api/auth/me", controller.me);

    app.get("/api/auth/verify", [authJwt.verifyToken], (req, res) => { res.status(200).send({ valid: true }) });

    app.get("/api/auth/isAdmin", [authJwt.verifyToken, authJwt.isAdmin], (req, res) => { res.status(200).send({ valid: true }) });
};