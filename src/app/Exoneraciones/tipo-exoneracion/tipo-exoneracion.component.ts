import { Component, OnInit } from '@angular/core';
import { TbExoneraciones } from 'src/Models/Exoneraciones';
import { ToastrService } from 'ngx-toastr';
import { ExoneracionesService } from 'src/Services/Exoneraciones/exoneraciones.service';

@Component({
  selector: 'app-tipo-exoneracion',
  templateUrl: './tipo-exoneracion.component.html',
  styleUrls: ['./tipo-exoneracion.component.css']
})
export class TipoExoneracionComponent implements OnInit {

  constructor(private alerta:ToastrService,private service:ExoneracionesService) { }

  ngOnInit() {
  }

  modificarExo(exonera:TbExoneraciones){ 
    this.service.Modificar(exonera).subscribe(
      res => { this.alerta.success('Modificación Realizada', 'Exoneración') },
      err => { this.alerta.error('Error de modificación', 'Exoneración') }
    )
  }
}
