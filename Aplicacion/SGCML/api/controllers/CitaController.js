/**
 * CitaController
 *
 * @description :: Server-side logic for managing Citas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  crearCita: function (req, res) {
    var parametros = req.allParams();
    if (req.method == 'POST') {
      if (parametros.sucursal && parametros.servicio && parametros.fecha && parametros.hora && parametros.idCliente) {
        Cita.create({
          sucursal: parametros.sucursal,
          servicio: parametros.servicio,
          fecha: parametros.fecha,
          hora: parametros.hora,
          idCliente: parametros.idCliente
        }).exec(function (error, citaCreada) {
          if (error) return res.view('vistas/error', {
            title: 'Error',
            error: {
              descripcion: 'No se pudo registrar la cita: ' + error,
              url: '/cita'
            }
          });
          Cita.find().populate("idCliente").exec(function (error, citasEncontradas) {
            if (error) return res.serverError();
            sails.log.info(citasEncontradas);
            return res.view('vistas/citaRegistrada', {
              title: 'Cita Registrada',
              citas: citasEncontradas
            })
          });
        });
      } else {
        // bad Request
        return res.view('vistas/error', {
          title: 'Error',
          error: {
            descripcion: 'No envió todos los parametros',
            url: '/cita'
          }
        });
      }
    } else {
      return res.view('vistas/error', {
        title: 'Error',
        error: {
          descripcion: 'Falla en el metodo HTTP',
          url: '/cita'
        }
      });
    }
  },

  borrarCita: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Cita.destroy({
        id: parametros.id
      }).exec(function (errorInesperado, citaEliminada) {
        if (errorInesperado) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/listarCitas"
            }
          });
        }
        Cita.find().populate("idCliente")
          .exec(function (errorIndefinido, citasEncontradas) {
            if (errorIndefinido) {
              res.view('vistas/error', {
                error: {
                  descripcion: "No se pudo cargar las citas",
                  rawError: errorIndefinido,
                  url: "/listarCitas"
                }
              });
            }
            res.view('vistas/listarCitas', {
              citas: citasEncontradas
            });
          })
      })
    } else {
      return res.view('vistas/error', {
        error: {
          descripcion: "Necesitamos el ID para borrar la cita",
          rawError: "No envía ID",
          url: "/listarCitas"
        }
      });
    }
  }
};
