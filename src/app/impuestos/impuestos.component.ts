import { Component, OnInit } from '@angular/core';
import { ImpuestosService } from '../../Services/Impuestos/impuestos.service';
import { TbImpuestos } from 'src/Models/Impuesto';

@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrls: ['./impuestos.component.css']
})
export class ImpuestosComponent implements OnInit {

  constructor(private ImpuestoService:ImpuestosService) { 
    this.cargarLista();
  }

  ngOnInit() {
  }

  ListImpuestos:Array<TbImpuestos> = new Array();
  impuestos:TbImpuestos = new TbImpuestos();
  bandera: boolean = false;
  modifica: boolean = false;
  detalles: boolean = false;

  formulario(){
    this.bandera = true;
  }
  Cancelar(){
    if(this.modifica){
      this.ListImpuestos.push(this.impuestos);
    }
    this.detalles = false;
    this.bandera = false;
    this.modifica = false;
    this.impuestos = new TbImpuestos();
  }

  Confirmar(impuestos){

    if (this.modifica) {
      this.ImpuestoService.put(impuestos).subscribe(data =>{
        if (data) {
          alert("Se modificó con exito");
          this.ListImpuestos.push(impuestos);
        }
        else{
          alert("No se pudo modificar");
        }
      });
      this.modifica = false;
    }
    else{
      this.ImpuestoService.post(impuestos).subscribe(data =>{
        if (data) {
          alert("Se agregó correctamente");
          this.ListImpuestos.push(impuestos);
        }
        else{
          alert("No se pudo agregar");
        }
      });
    }
    this.bandera = false;
    this.impuestos = new TbImpuestos();
  }

  eliminar(id){
    for (let i = 0; i < this.ListImpuestos.length; i++) {
      if (this.ListImpuestos[i].Id == id) {
        this.ImpuestoService.delete(this.ListImpuestos[i]).subscribe(data=>{
          if(data){
            alert("Se eliminó con exito");
            this.ListImpuestos.splice(i,1);
          }
          else{
            alert("No se pudo eliminar");
          } 
        });  
      }
    }
  }
  modificar(id){
    for (let i = 0; i < this.ListImpuestos.length; i++) {
      if (this.ListImpuestos[i].Id == id) {
        this.impuestos = this.ListImpuestos[i];   
        this.bandera = true;
        this.modifica = true;
        this.ListImpuestos.splice(i,1);
      }
    }
  }

  cargarLista(){
    this.ImpuestoService.get().subscribe(data =>{
      this.ListImpuestos = data;
    });
  }

  Detalles(id){
    for (let i = 0; i < this.ListImpuestos.length; i++) {
      if (this.ListImpuestos[i].Id == id) {
        this.impuestos = this.ListImpuestos[i];   
        this.detalles = true;
      }
    }
  }


}
