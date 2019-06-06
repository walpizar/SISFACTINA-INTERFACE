import { Component, OnInit } from '@angular/core';
import { TbTipoMedidas } from 'src/Models/TipoMedidas';
import { TipoMedidaService } from 'src/Services/TipoMedida/tipo-medida.service';

@Component({
  selector: 'app-detalle-tipo-medida',
  templateUrl: './detalle-tipo-medida.component.html',
  styleUrls: ['./detalle-tipo-medida.component.css']
})
export class DetalleTipoMedidaComponent implements OnInit {

  constructor(private tipomedidaservice:TipoMedidaService) { }

  TipoMedida:TbTipoMedidas;
  ngOnInit() {
    this.TipoMedida=this.tipomedidaservice.TipoMedida;
  }

}
