const { authJwt } = require("../middlewares");
const controller = require("../controllers/reservation.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/reservation/all", [authJwt.verifyToken, authJwt.isAdmin], controller.getAll);

    app.post("/api/reservation/add", [authJwt.verifyToken], controller.addReservation);

    app.delete("/api/reservation/delete/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteReservation);
};