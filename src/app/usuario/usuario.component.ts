import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/Services/Usuario/usuario.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  constructor(public service: UsuarioService) { }

  ngOnInit() {
  }


}
