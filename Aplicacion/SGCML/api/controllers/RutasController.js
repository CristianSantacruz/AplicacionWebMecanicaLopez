/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  home: function (req, res) {
    return res.view('vistas/home');
  },
  login: function (req, res) {
    return res.view('vistas/login');
  },
  administracion: function (req, res) {
    return res.view('vistas/administracion');
  },
  crearCliente: function (req, res) {
    return res.view('vistas/crearCliente', {
      title: 'Ingresar Cliente'
    });
  },
  cita: function (req, res) {
    Cliente.find().exec(function (error, clientesEncontrados) {
      if (error) return res.serverError();
      return res.view('vistas/cita', {
        title: 'Registrar Cita',
        clientes: clientesEncontrados
      });
    });
  },
  listarCitas: function (req, res) {
    Cita.find().populate("idCliente").exec(function (error, citasEncontradas) {
      if (error) return res.serverError();
      return res.view('vistas/listarCitas', {
        citas: citasEncontradas
      })
    });
  },
  listarCliente: function (req, res) {
    Cliente.find().exec(function (error, clientesEncontrados) {
      if (error) return res.serverError();
      sails.log.info(clientesEncontrados);
      return res.view('vistas/listarCliente', {
        title: 'Lista de Clientes',
        clientes: clientesEncontrados
      })
    });
  },
  error: function (req, res) {
    return res.view('vistas/error', {
      error: {
        desripcion: "Usted esta por error en esta Ruta dirijase a Inicio",
        rawError: "Ruta equivocada",
        url: "/Inicio"
      }
    });
  }

};
