import { Component, OnInit } from '@angular/core';
import {EmpresasService} from '../../Services/Empresas/empresas.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  texto:string;
  constructor(private empresasService: EmpresasService ) {





   }

  ngOnInit() {

    this.texto=this.empresasService.get();
    
  }

}
