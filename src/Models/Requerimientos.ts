import { TbPermisos } from './Permisos';

export class TbRequerimientos{

    IdReq : number; 
    Nombre : string; 
    Descripcion : string; 
    Estado : boolean; 
    FechaCrea : Date; 
    FechaUltMod : Date; 
    UsuarioCrea : string; 
    UsuarioUltMod : string; 

    TbPermisos : TbPermisos[]

    constructor(){

    }
}