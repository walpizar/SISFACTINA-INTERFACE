import { Component, OnInit } from '@angular/core';
import { ExoneracionesService } from 'src/Services/Exoneraciones/exoneraciones.service';
import { ToastrService } from 'ngx-toastr';
import { TbExoneraciones } from 'src/Models/Exoneraciones';

@Component({
  selector: 'app-agregar-exo',
  templateUrl: './agregar-exo.component.html',
  styleUrls: ['./agregar-exo.component.css']
})
export class AgregarExoComponent implements OnInit {

  Exonera = new TbExoneraciones();

  constructor(private service:ExoneracionesService,private alerta:ToastrService) { }

  ngOnInit() {
  }

  Registrar(Exonera:TbExoneraciones){
    this.service.Agregar(Exonera).subscribe(
      res=>{
        this.alerta.success('Registro Realizado', 'Exoneración');
      },
      err=>{this.alerta.error('Error de Registro', 'Exoneración');}
    );  
  }
}
