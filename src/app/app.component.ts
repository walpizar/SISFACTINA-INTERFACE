import { Component } from '@angular/core';
import { EmpresasService } from 'src/Services/Empresas/empresas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FactInaApp';


  texto:string;


  constructor(private empresaService: EmpresasService){


    this.texto= this.empresaService.get();
    
  }





}
