/**
 * Cliente.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    cedula: {
      type: 'string',
      required: true
    },

    nombre: {
      type: 'string',
      required: true
    },

    telefono: {
      type: 'string',
      required: true
    },

    empresa: {
      type: 'string',
      required: true
    },

    citas:{
      collection:"Cita",
      via:"idCliente"
    }

  }
};

