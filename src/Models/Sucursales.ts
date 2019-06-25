import { TbEmpresa } from './Empresa';
import { TbDistrito } from './Distrito';
import { TbCajas } from './Cajas';

export class TbSucursales{


    Id:number; 
    IdEmpresa : string; 
    IdTipoEmpresa : number; 
    Provincia : string;
    Canton : string; 
    Distrito : string; 
    Direccion : string; 
    Telefono : number; 
    FechaCrea : Date; 
    FechaUltMod : Date;
    UsuarioCrea : string; 
    UsuarioUltMod : string; 
    Nombre : string; 

    IdNavigation : TbEmpresa; 
    TbDistrito : TbDistrito; 
    TbCajas : TbCajas[];

    constructor(){

    }
}
