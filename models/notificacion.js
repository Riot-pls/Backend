var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificacionChema = new Schema({ //Esquema con validaciones.

    emisor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'El id emisor es un campo obligatorio'] },
    receptor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'El id receptor es un campo obligatorio'] },
    tipoNotificacion: { type: Schema.Types.ObjectId, ref: 'tipoNotificacion', required: [true, 'El id tipo de notificación es un campo obligatorio'] },
});

// emisor receptor tipoNotificacion
module.exports = mongoose.model('notificacion', notificacionChema);