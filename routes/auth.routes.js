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
};