/**
 * ClienteController
 *
 * @description :: Server-side logic for managing Clientes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // REVISA LISTAR CLIENTES --> CITAS
  crearCliente: function (req, res) {
    var parametros = req.allParams();
    if (req.method == 'POST') {
      if (parametros.cedula && parametros.nombre && parametros.telefono && parametros.empresa) {
        Cliente.create({
          cedula: parametros.cedula,
          nombre: parametros.nombre,
          telefono: parametros.telefono,
          empresa: parametros.empresa
        }).exec(function (error, clienteCreado) {
          if (error) return res.view('vistas/error', {
            title: 'Error',
            error: {
              descripcion: 'No se pudo ingresar el cliente: ' + error,
              url: '/cita'
            }
          });
          Cliente.find().exec(function (error, clientesEncontrados) {
            if (error) return res.serverError();
            sails.log.info(clientesEncontrados);
            return res.view('vistas/usuarioRegistrado', {
              title: 'CitasAsignadas',
              clientes: clientesEncontrados
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

  borrarCliente: function (req, res) {
    var parametros = req.allParams();

    if (parametros.id) {

      Cliente.destroy({
        id: parametros.id
      }).exec(function (errorInesperado, clienteEliminado) {
        if (errorInesperado) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/listarCliente"
            }
          });
        }
        Cliente.find()
          .exec(function (errorIndefinido, clientesEncontrados) {

            if (errorIndefinido) {
              res.view('vistas/error', {
                error: {
                  descripcion: "No se pudo cargar los clientes",
                  rawError: errorIndefinido,
                  url: "/listarCliente"
                }
              });
            }
            res.view('vistas/listarCliente', {
              clientes: clientesEncontrados
            });
          })
      })

    } else {
      return res.view('vistas/error', {
        error: {
          descripcion: "Ingrese el ID para borrar el cliente",
          rawError: "No envía ID",
          url: "/listarCliente"
        }
      });
    }
  }
};
