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

    app.get("/api/user/all", [authJwt.verifyToken, authJwt.isAdmin], controller.getAll);

    /*app.post("/api/user/add", [authJwt.verifyToken, authJwt.isAdmin], controller.addUser);

    app.post("/api/user/edit/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.editUser);

    app.get("/api/user/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.getUser);

    app.delete("/api/user/delete/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);*/
};