
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


var mdAutenticacion = require('../middlewares/autenticacion');
//var SEED = require('../config/config').SEED;

var app= express();

var Usuario= require('../models/usuario');


//===============================================
//  Obteber todos los usuarios
//===============================================




app.get('/',(req,res,next)=>{

    var desde=req.query.desde ||0;
    desde=Number(desde);

// CAMBIO!!! -*-*-*-*-*-*-*
    Usuario.find({},'nombres apellidos email telefono tipoUsuario tipoID numDocumento codigoUniversitario sedeUniversitaria facultad programaUniversitario role').skip(desde).limit(5).exec( 
        (err,usuarios)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                mensaje: 'Error cargando usuarios!',
                errors:err
            });
        }


        Usuario.count({},(err,conteo)=>{
            res.status(200).json({
                ok:true,
                usuarios: usuarios,
                total:conteo
            });
        })
      
       


    });  //Metodo de mongoose.


  
    
    
    });




//===============================================
//  Verificar token
//===============================================

/*
app.use('/',(req,res,next)=>{

    var token= req.query.token;

    jwt.verify(token,SEED,(err,decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                mensaje: 'Token no valido',
                errors:err
            });
        }

        next();

    });
}); // No es muy flexible este tipo de validaciones.*/



//===============================================
//  Actualizar usuarios
//===============================================
// Se puede utilizar put or path

// CAMBIO!!! -*-*-*-*-*-*-*
//app.put('/:id',[mdAutenticacion.verificarToken,mdAutenticacion.verificaraADMIN_ROLE_o_MismoUsuario],(req,res)=>{
app.put('/:id',(req,res)=>{

var id = req.params.id;
var body = req.body;

Usuario.findById(id,(err,usuario)=>{
    
    if(err){
        return res.status(500).json({
            ok:false,
            mensaje: 'Error al buscar usuarios!',
            errors:err
        });
    }

    if(!usuario){
        return res.status(400).json({
            ok:false,
            mensaje: 'El usuario con el '+id+' no existe.',
            errors:{message: 'No existe un usuario con ese ID'}
        });
    }


    usuario.nombres = body.nombres;
    usuario.apellidos= body.apellidos;
    usuario.email = body.email;
    usuario.telefono= body.telefono;
    usuario.tipoUsuario= body.tipoUsuario;
    usuario.tipoID=body.tipoID;
    usuario.numDocumento=body.numDocumento;
    usuario.codigoUniversitario= body.codigoUniversitario;
    usuario.sedeUniversitaria=body.sedeUniversitaria;
    usuario.facultad= body.facultad;
    usuario.programaUniversitario= body.programaUniversitario;
    usuario.estado=body.estado;
    usuario.role = body.role;

    usuario.save((err,usuarioGuardado)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al actualizar usuarios!',
                errors:err
            });
        }

        usuarioGuardado.password=':)';
        res.status(200).json({
            ok:true,
            usuario: usuarioGuardado
        });


    });





});
  

});






//===============================================
//  Crear un nuevo usuario
//===============================================

app.post('/',(req,res)=>{


    var body = req.body;

    var usuario= new Usuario({ //referencia a una variable de tipo usuario

        nombres: body.nombres,
        apellidos: body.apellidos,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        telefono:body.telefono,
        tipoUsuario:body.tipoUsuario,
        tipoID:body.tipoID,
        numDocumento:body.numDocumento,
        codigoUniversitario: body.codigoUniversitario,
        sedeUniversitaria:body.sedeUniversitaria,
        facultad: body.facultad,
        programaUniversitario: body.programaUniversitario,
        estado:body.estado,
        role: body.role
    }); 

    usuario.save((err,usuarioGuardado)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al crear usuarios!',
                errors:err
            });
          
        }
        res.status(201).json({
            ok:true,
            usuario: usuarioGuardado,
            usuariotoken: req.usuario
        });


    });
    
});




//===============================================
//  Eliminar usuarios por el id.
//===============================================
// CAMBIO!!! -*-*-*-*-*-*-*
//app.delete('/:id',[mdAutenticacion.verificarToken, mdAutenticacion.verificaraADMIN_ROLE],(req,res)=>{
app.delete('/:id',(req,res)=>{

    var id = req.params.id; // id por el /:id.


    Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{


        if(err){
            return res.status(500).json({
                ok:false,
                mensaje: 'Error al borrar usuarios!',
                errors:err
            });
        }

        if(!usuarioBorrado){
            return res.status(400).json({
                ok:false,
                mensaje: 'No existe un usuario con este id: '+id+'.',
                errors:{message: 'No existe un usuario con ese ID'}
            });
        }
        res.status(200).json({
            ok:true,
            usuario: usuarioBorrado
        });




    });


});



    module.exports= app;