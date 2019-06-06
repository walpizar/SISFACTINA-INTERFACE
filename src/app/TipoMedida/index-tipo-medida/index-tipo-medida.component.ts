import { Component, OnInit } from '@angular/core';
import { TbTipoMedidas } from 'src/Models/TipoMedidas';
import { TipoMedidaService } from 'src/Services/TipoMedida/tipo-medida.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-index-tipo-medida',
  templateUrl: './index-tipo-medida.component.html',
  styleUrls: ['./index-tipo-medida.component.css']
})
export class IndexTipoMedidaComponent implements OnInit {

  constructor(private tipoMedidaService:TipoMedidaService,private msj:ToastrService) { }
  texto:string="?";
  entidadEliminar:TbTipoMedidas;
  listaTipoMedida= new Array();

  ngOnInit() {
    this.ConsultarTiposMedidas()
  }
  ConsultarTiposMedidas() {
    this.tipoMedidaService.Get().subscribe(data=>{
      this.listaTipoMedida=data
    },error=>{
      this.msj.error("No hay registros");
    })
  }

  consultarDetalles(tipoM:TbTipoMedidas){
    this.tipoMedidaService.GetDatosforDetalles(tipoM);
  }

  Modificar(tipoMmodify:TbTipoMedidas){
    this.tipoMedidaService.GetDatosforModify(tipoMmodify);
  }

  EnviaDatoEliminar(tipoMeliminar:TbTipoMedidas){
    this.entidadEliminar=tipoMeliminar;
    this.texto=tipoMeliminar.Nombre;
  }

  EliminarCategoria(){
    this.msj.warning("Realizando la eliminacion,aguarda unos instantes");
    this.tipoMedidaService.Delete(this.entidadEliminar).subscribe(data=>{     
      this.msj.success("Tipo de Medida eliminada correctamente");
    },error=>{
      this.msj.error("Error: No se logro eliminar el Tipo de medida");
    })
  }

}
