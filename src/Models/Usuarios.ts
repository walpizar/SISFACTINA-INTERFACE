import { TbCajaUsuario } from './CajaUsuario';
import { TbRoles } from './Roles';
import { TbPersona } from './Personas';
import { TbEmpresa } from './Empresa';

export class TbUsuarios{

    TipoId : number; 
    Id : string;
    NombreUsuario : string; 
    Contraseña : string; 
    IdRol : number; 
    FotoUrl : string; 
    IdEmpresa : string; 
    IdTipoIdEmpresa : number //? 
    Estado : boolean; 
    FechaCrea : Date; 
    FechaUltMod : Date; 
    UsuarioCrea : String;
    UsuarioUltMod : string; 

    IdNavigation : TbEmpresa; 
    IdRolNavigation : TbRoles; 
    TbPersona : TbPersona 
    TbCajaUsuario :TbCajaUsuario[];


    constructor(){

    }
}