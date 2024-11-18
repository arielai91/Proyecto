const express = require("express");
const {body, param, validationResult} = require("express-validator");
const SolicitudController = require("../controllers/solicitudController");

class SolicitudRoutes{
    constructor() {
        this.router = express.Router();
        this.controller = new SolicitudController();
        this.initializeRoutes();
    }
    logRequest(req, res, next) {
        console.log(`Petición: ${req.method}, Ruta: ${req.originalUrl}`);
        next();
    }

    validateRequest(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
    
    initializeRoutes(){
        // Middleware para imprimir el tipo de petición y la ruta
        this.router.use(this.logRequest);

        // Ruta para registrar una nuevo solicitud
        this.router.post(
            "/register",
            [
                // TODO: ingresar los campos requeridos
            ],
            this.validateRequest,
            (req, res) => this.controller.create(req, res)
        );
    }

}

const solicitudRoutes = new SolicitudRoutes();
module.exports = solicitudRoutes.router;