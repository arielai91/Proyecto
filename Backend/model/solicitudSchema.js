const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['Casillero', 'Plan'],
        required: true,
    },
    objeto: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    detalle: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    perfil: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Perfil',
        required: true,
    },
    imagen: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'Aprobado', 'Rechazado'],
        default: 'Pendiente',
        required: true,
    },
}, { timestamps: true });

solicitudSchema.pre('save', async function (next) {
    if (this.tipo === 'Casillero') {
        const casillero = await mongoose.model('Casillero').findById(this.objeto);
        if (casillero) {
            this.precio = casillero.precio;
            this.detalle = `Casillero #${casillero.numero}`;
        }
    } else if (this.tipo === 'Plan') {
        const plan = await mongoose.model('Plan').findById(this.objeto);
        if (plan) {
        this.precio = plan.precio;
        this.detalle = `Plan ${plan.nombre}`;
        }
    }
    next();
});

solicitudSchema.index({ perfil: 1 });
solicitudSchema.index({ estado: 1 });
solicitudSchema.index({ tipo: 1, detalle: 1 });

const Solicitud = mongoose.model("Solicitud", solicitudSchema);
module.exports = Solicitud;