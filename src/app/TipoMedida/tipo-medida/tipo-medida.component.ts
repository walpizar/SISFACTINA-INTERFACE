import { Component, OnInit } from '@angular/core';
import { TbTipoMedidas } from 'src/Models/TipoMedidas';
import { TipoMedidaService } from 'src/Services/TipoMedida/tipo-medida.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tipo-medida',
  templateUrl: './tipo-medida.component.html',
  styleUrls: ['./tipo-medida.component.css']
})
export class TipoMedidaComponent implements OnInit {

  constructor(private tipoMedidaService:TipoMedidaService,private msj:ToastrService) { }

  TipoMedida= new TbTipoMedidas();
  botonCrear:boolean=true;
  botonModificar:boolean=false;
  modify:boolean=false;
  ngOnInit() {
    this.modify=this.tipoMedidaService.Modificar;
    if (this.modify!=false) {
      this.TipoMedida=this.tipoMedidaService.TipoMedida;
      this.botonCrear=false;
      this.botonModificar=true;
    }
  }
  agregar(tipomedida:TbTipoMedidas){
    try {
      if (tipomedida.Nombre==null) {
        this.msj.error("Debe ingresar un nombre")
      }else if(tipomedida.Nomenclatura==null){
        this.msj.error("Debe ingresar una nomenclatura")
      } else {
        this.msj.warning("Agregando el Tipo Medida,espera un instante")
        this.tipoMedidaService.Post(tipomedida).subscribe(data=>{
          this.msj.success("Se agrego correctamente");
          this.TipoMedida= new TbTipoMedidas();
        },error=>{
          this.msj.error("Error: No se logro agregar el tipo medida");
          this.msj.warning("Posible error del servidor");
        })
      }
    } catch (error) {
      
    }
  }

  Modificar(tipomedidamodify:TbTipoMedidas){
    try {
      if (tipomedidamodify.Nombre==null) {
        this.msj.error("Debe ingresar un nombre")
      }else if(tipomedidamodify.Nomenclatura==null){
        this.msj.error("Debe ingresar una nomenclatura")
      } else {
        this.msj.warning("Modificando el Tipo Medida,espera un instante")
        this.tipoMedidaService.Put(tipomedidamodify).subscribe(data=>{
          this.msj.success("Se modifico correctamente");
          this.TipoMedida= new TbTipoMedidas();
          this.botonCrear=true;
          this.botonModificar=false;
          this.modify=false;
        },error=>{
          this.msj.error("Error: No se logro modificar el tipo medida");
          this.msj.warning("Posible error del servidor");
        })
      }
    } catch (error) {
      
    }
  }
  Cancelar(){
    this.TipoMedida= new TbTipoMedidas();
      this.botonCrear=true;
      this.botonModificar=false;
      this.tipoMedidaService.Modificar=false;
  }


}
