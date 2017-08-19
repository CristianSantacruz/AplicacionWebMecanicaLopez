import { Component, OnInit } from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterURlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {


  nuevoCliente = {};
  clientes = [];
  disabledButtons = {
    NuevoClienteFormSubmitButton: false
  };

  constructor(private _http: Http,
              private _masterURL: MasterURlService) {
  }

  ngOnInit() {
    this._http.get(this._masterURL.url + "Cliente")
      .subscribe(
        (res: Response) => {
          this.clientes = res.json()
            .map((value) => {
              value.formularioCerrado = true;
              return value;
            });
        },
        (err) => {
          console.log(err);
        }
      )
  }

  crearCliente(formulario: NgForm) {
    console.log(formulario);
    this.disabledButtons.NuevoClienteFormSubmitButton = true;
    this._http.post(this._masterURL.url + "Cliente", {
      nombre: formulario.value.nombre
    }).subscribe(
      (res) => {
        console.log("No hubo Errores");
        console.log(res);
        this.tiendas.push(res.json());
        this.nuevaTienda = {};
        this.disabledButtons.NuevaTiendaFormSubmitButton = false;
      },
      (err) => {
        this.disabledButtons.NuevaTiendaFormSubmitButton = false;
        console.log("Ocurrio un err or", err);
      },
      () => {
        console.log("Termino la función vamos a las casas")
      }
    );
  }

  borrarTienda(id: number) {
    this._http.delete(this._masterURL.url + "Tienda/" + id)
      .subscribe(
        (res) => {
          let tiendaBorrada = res.json();
          this.tiendas = this.tiendas.filter(value => tiendaBorrada.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  actualizarTienda(tienda: any) {
    let parametos = {
      nombre: tienda.nombre
    };
    this._http.put(this._masterURL.url + "Tienda/" + tienda.id, parametos)
      .subscribe(
        (res: Response) => {
          tienda.formularioCerrado = !tienda.formularioCerrado;
          console.log("Respuesta:", res.json());
        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }


}
