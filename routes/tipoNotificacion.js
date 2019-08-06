// var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');
// var mdAutenticacion = require('../middlewares/autenticacion');
// var SEED = require('../config/config').SEED;

var express = require('express');
var app = express();
var TipoNotificacion = require('../models/tipoNotificacion');

//===============================================
//  Obteber todos los tipo notificaciones
//===============================================

app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    TipoNotificacion.find({}, 'nombre mensaje').skip(desde).limit(5).exec(
        (err, tipoNotificaciones) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando tipo notificaciones!',
                    errors: err
                });
            }
            TipoNotificacion.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    tipoNotificacion: tipoNotificaciones,
                    total: conteo
                });
            })
        }); //Metodo de mongoose.
});


//===============================================
//  Actualizar tipoNotificaciones
//===============================================
// Se puede utilizar put or path

// CAMBIO!!! -*-*-*-*-*-*-*
//app.put('/:id',[mdAutenticacion.verificarToken,mdAutenticacion.verificaraADMIN_ROLE_o_MismoUsuario],(req,res)=>{
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    TipoNotificacion.findById(id, (err, tipoNotificacion) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar tipo notificaciones!',
                errors: err
            });
        }

        if (!tipoNotificacion) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El tipo notificacion con el ' + id + ' no existe.',
                errors: { message: 'No existe un tipo notificacione con ese ID' }
            });
        }

        // emisor receptor tipoNotificacion
        tipoNotificacion.nombre = body.nombre;
        tipoNotificacion.mensaje = body.mensaje;

        tipoNotificacion.save((err, tipoNotificacionGuardada) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar tipo notificacion!',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                tipoNotificacion: tipoNotificacionGuardada
            });
        });
    });
});

//===============================================
//  Crear un nuevo tipo Notificacion
//===============================================

app.post('/', (req, res) => {
    var body = req.body;

    var tipoNotificacion = new TipoNotificacion({ //referencia a una variable de tipo tipoNotificacion
        nombre: body.nombre,
        mensaje: body.mensaje,
    });

    tipoNotificacion.save((err, tipoNotificacionGuardada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear tipo Notificaciones!',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            tipoNotificacion: tipoNotificacionGuardada,
            usuariotoken: req.usuario
        });
    });
});

//===============================================
//  Eliminar tipo Notificaciones por el id.
//===============================================
// CAMBIO!!! -*-*-*-*-*-*-*
//app.delete('/:id',[mdAutenticacion.verificarToken, mdAutenticacion.verificaraADMIN_ROLE],(req,res)=>{
app.delete('/:id', (req, res) => {
    var id = req.params.id; // id por el /:id.

    TipoNotificacion.findByIdAndRemove(id, (err, tipoNotificacionBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar tipo notificacion!',
                errors: err
            });
        }
        if (!tipoNotificacionBorrada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un tipo notificacion con este id: ' + id + '.',
                errors: { message: 'No existe un tipo notificacion con ese ID' }
            });
        }
        res.status(200).json({
            ok: true,
            tipoNotificacion: tipoNotificacionBorrada
        });
    });
});

module.exports = app;