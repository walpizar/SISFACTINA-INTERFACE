import { Component, OnInit } from '@angular/core';
import { TbEmpresa } from 'src/Models/Empresa';
import { TbSucursales } from 'src/Models/Sucursales';
import { TbCajas } from 'src/Models/Cajas';
import { EmpresaService } from 'src/Services/Empresas/empresa.service';

@Component({
  selector: 'app-cajas',
  templateUrl: './cajas.component.html',
  styleUrls: ['./cajas.component.css']
})
export class CajasComponent implements OnInit {

  constructor(private EmpresaService:EmpresaService) { }

  ngOnInit() {
  }
  Empresa: TbEmpresa;
  Sucursal: TbSucursales;
  Caja: TbCajas = new TbCajas;



  

  confirmar(){
    alert("Hola");
  }
  eliminar(){

  }
  modificar(){

  }
  detalles(){

  }

}
