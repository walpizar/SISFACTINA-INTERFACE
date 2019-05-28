import { TbRoles } from './Roles';
import { TbRequerimientos } from './Requerimientos';

export class TbPermisos{

    TbRequerimientosIdReq : number;
    TbRolesIdRol : number; 

    TbRequerimientosIdReqNavigation : TbRequerimientos; 
    TbRolesIdRolNavigation : TbRoles; 


    constructor(){

    }
}