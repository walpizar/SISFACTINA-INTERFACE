import { TbCajaUsuario } from './CajaUsuario';

export class TbCajas{

    Id:number; 
    Nombre : string; 
    Descripcion : string; 
    Estado: boolean; 
    FechaCrea : Date; 
    FechaUltMod : Date; 
    UsuarioCrea : string; 
    UsuarioUltMod : string; 

    TbCajaUsuario : TbCajaUsuario[]

    constructor(){

    }
}