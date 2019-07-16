import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ExoneracionesService } from 'src/Services/Exoneraciones/exoneraciones.service';

@Component({
  selector: 'app-lista-exo',
  templateUrl: './lista-exo.component.html',
  styleUrls: ['./lista-exo.component.css']
})
export class ListaExoComponent implements OnInit {

  listaExo=new Array();
  

  constructor(private alerta:ToastrService,private service:ExoneracionesService) { }

  ngOnInit() {
    this.getListaExo();
  }

  getListaExo() {
    this.service.ConsultarTodos().subscribe(data=>{
      this.listaExo=data;
    });
  }

}
