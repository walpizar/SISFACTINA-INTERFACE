import { Component, OnInit } from '@angular/core';
import {EmpresaService} from '../../Services/Empresas/empresa.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  
  constructor(private empresasService: EmpresaService ) {





   }

  ngOnInit() {


    
  }

}
