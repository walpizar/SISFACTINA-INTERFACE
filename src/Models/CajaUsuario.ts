import { TbCajas } from './Cajas';
import { TbUsuarios } from './Usuarios';
import { TbMovimientoCajaUsuario } from './MovimientoCajaUsuario';
import { TbCajaUsuMonedas } from './CajaUsuMonedas';

export class TbCajaUsuario{

    Id : number; 
    IdCaja : number; 
    IdUser : string;
    TipoId:number; 
    TipoMovCaja : number; 
    Fecha : Date; 
    Total : number //? ;
    FechaCrea : Date; 
    FechaUltMod : Date; 
    UsuarioCrea : String; 
    UsuarioUltMod : string; 
    Estado : boolean; 

    IdCajaNavigation : TbCajas; 
    TbUsuarios : TbUsuarios; 
    TbCajaUsuMonedas : TbCajaUsuMonedas;
    TbMovimientoCajaUsuario : TbMovimientoCajaUsuario;

    constructor(){

    }
}