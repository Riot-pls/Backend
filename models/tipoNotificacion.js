var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tipoNotificacionChema = new Schema({ //Esquema con validaciones.
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    mensaje: { type: String, required: [true, 'El mensaje es necesario'] },
});

// nombre mensaje
module.exports = mongoose.model('tipoNotificacion', tipoNotificacionChema);