import { Component, OnInit } from '@angular/core';
import { TbInventario } from '../Models/Inventario';
import { InventarioService } from '../inventario.service';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  constructor(private inventarioService:InventarioService) { }

  ngOnInit() {
    this.obtenerTodoInventario();
  }
  proInventario: TbInventario;
  listaInventario: Array<TbInventario>; 
  show:boolean=false;

  activarModificacion(invent:TbInventario){
    this.show=true;
    this.proInventario=invent;
  }
  obtenerTodoInventario(){

    this.inventarioService.get().subscribe(data=>{

      
      this.listaInventario=data
    })
  }
  eliminar(id:string){
    this.inventarioService.delete(id).subscribe(data=>{
      if(data){
        alert("Se elimino correctamente.");
        this.obtenerTodoInventario();
      }
      else{
        alert("No se pudo eliminar.");
      }
      
    })
  }
  validarDatos(inventario:TbInventario){
    if(inventario.Estado==false || inventario.Estado==true){
      
        if(inventario.Estado==false){

          inventario.Estado=false;
          alert()
      }
      alert("Hola")
    }else{
      alert("ERROR... Verifique el campo del estado.");
      return false;
    }
    if(inventario.Cantidad>=0){
      
      if(inventario.Cantidad==0){
        
        inventario.Cantidad==0;
      }
    }else{
      alert("ERROR... Verifique el campo cantidad.");
      return false;
    }
    if(inventario.CantMin>=0){
      
      if(inventario.CantMin==0){
        
        inventario.CantMin==0;
      }
    }else{
      alert("ERROR... Verifique el campo cantidad minima.");
      return false;
    }
    if(inventario.CantMax>=0){
      
      if(inventario.CantMax==0){
        
        inventario.CantMax==0;
      }
    }else{
      alert("ERROR... Verifique el campo cantidad maxima.");
      return false;
    }
    console.log(inventario)
    return true;
  }

  cancelarModificacion(){
    this.show=false;
  }

  modificar(inventario:TbInventario){
    if(this.validarDatos(inventario)){
      this.inventarioService.put(inventario).subscribe(data=>{
        if(data){
          alert("Se facturó correctamente, recargue la pagina");
          this.show=false;
          this.obtenerTodoInventario();
        }
        else{
          alert("No se pudo facturar, verifique los datos");
        }
        
      })
    }  
    
  }
}
