import { Component, OnInit } from '@angular/core';
import { ExoneracionesService } from 'src/Services/Exoneraciones/exoneraciones.service';
import { TbExoneraciones } from 'src/Models/Exoneraciones';

@Component({
  selector: 'app-detalle-exo',
  templateUrl: './detalle-exo.component.html',
  styleUrls: ['./detalle-exo.component.css']
})
export class DetalleExoComponent implements OnInit {

  Exone=new TbExoneraciones();

  constructor(private service:ExoneracionesService) { }

  ngOnInit() {
    this.getExoSelect();
  }

  getExoSelect() {
    this.Exone=this.service.detalleExoneracion;
  }
}
