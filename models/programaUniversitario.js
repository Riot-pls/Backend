

var mongoose = require('mongoose');

var Schema= mongoose.Schema;

var programaSchema = new Schema({  //Esquema con validaciones.

    SNIES:{ type:String,unique:true, required:[true, 'El SNIES del programa academico es necesario']},
    nombre:{ type:String, required:[true, 'El nombre del programa academico es necesario']},
    numCreditos:{ type:String, required:[true, 'El numero de creditos es necesario']},
    nivelAcademico:{ type:String, required:[true, 'El nivel academico es necesario']},
    tituloOtogado:{ type:String, required:[true, 'El titulo academico es necesario']},
    modalidadFormacion:{ type:String, required:[true, 'La modalidad Formacion es necesaria']}
});


// SNIES nombre numCreditos nivelAcademico tituloOtogado modalidadFormacion
module.exports = mongoose.model('programa',programaSchema);