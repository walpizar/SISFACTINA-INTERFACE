import { TbUsuarios } from './Usuarios';
import { TbPermisos } from './Permisos';

export class TbRoles{


    IdRol : number; 
    Nombre : string; 
    Descripcion : string;
    Estado : boolean; 
    FechaCrea : Date; 
    FechaUltMod : Date; 
    UsuarioCrea : string; 
    UsuarioUltMod : string; 

    TbPermisos : TbPermisos[];
    TbUsuarios : TbUsuarios[] ; 


    constructor(){

    }
}