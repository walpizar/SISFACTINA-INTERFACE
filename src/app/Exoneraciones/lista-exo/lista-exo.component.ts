import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ExoneracionesService } from 'src/Services/Exoneraciones/exoneraciones.service';
import { TbExoneraciones } from 'src/Models/Exoneraciones';

@Component({
  selector: 'app-lista-exo',
  templateUrl: './lista-exo.component.html',
  styleUrls: ['./lista-exo.component.css']
})
export class ListaExoComponent implements OnInit {

  listaExo=new Array();
  Exonera = new TbExoneraciones();
  exoSelect:TbExoneraciones;
  buscador:string;

  constructor(private alerta:ToastrService,private service:ExoneracionesService) { }

  ngOnInit() {
    this.getListaExo();
  }

  getListaExo() {
    this.service.ConsultarTodos().subscribe(data=>{
      this.listaExo=data;
    });
    this.buscador='';
  }

  ExoActual(exo){
    this.service.detalleExoneracion=exo;
    this.exoSelect=exo;
  }

  reFresh() {
    location.reload()
  }

  eliminarExo(){
    this.service.Eliminar(this.exoSelect.Id).subscribe(
      resp=>{this.alerta.success('Registro Eliminado', 'Exoneración')},
      err=>{this.alerta.error('Registro No Eliminado', 'Exoneración')}
    );
    setTimeout(this.reFresh,2400,'refresh');
  }

  //metodo para buscar con string
  searchExo(){

    if(this.buscador==null){
      this.getListaExo();
    }

    if(this.buscador!=null){
      let exo=new TbExoneraciones();

      for(let i = 0; i<this.listaExo.length;i++){
        exo=this.listaExo[i];

        if(exo.Nombre.trim().toUpperCase().includes(this.buscador.trim().toUpperCase().toString())){
          this.listaExo=new Array();
          this.listaExo.push(exo);
        }
      }
    }

  }
}
