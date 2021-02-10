const { authJwt } = require("../middlewares");
const controller = require("../controllers/book.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/book/all", [authJwt.verifyToken], controller.getAll);

    app.post("/api/book/add", [authJwt.verifyToken, authJwt.isAdmin], controller.addBook);

    app.post("/api/book/edit/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.editBook);

    app.get("/api/book/:id", [authJwt.verifyToken], controller.getBook);

    app.delete("/api/book/delete/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteBook);
};