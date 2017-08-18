/**
 * Reserva.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    sucursal:{
      type:'string',
      required:true
    },
    servicio:{
      type:'string',
      required:true
    },
    fecha:{
      type:'date',

    },

    hora:{
      type:'string',
      required:true
    },

    idCliente:{
      model:"Cliente",
      required:true
    }

  }
};

