import { TbSucursales } from './Sucursales';



export class TbCajas{

    Id:number; 
    Nombre : string; 
    Descripcion : string; 
    Estado: boolean; 
    FechaCrea : Date; 
    FechaUltMod : Date; 
    UsuarioCrea : string; 
    UsuarioUltMod : string; 
    IdEmpresa: string;
    IdTipoEmpresa: number;
    IdSucursal: number;


    IdNavigation: TbSucursales;

    constructor(){

    }
}