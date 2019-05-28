import { TbEmpleado } from "./Empleado";
import { TbEmpresa } from "./Empresa";
import { TbProveedores } from "./Proveedores";
import { TbClientes } from "./Cliente";
import { TbTipoId } from "./TipoId";
import { TbUsuarios } from './Usuarios';
import { TbBarrios } from './Barrios';

export class TbPersona{
  TipoId: number;
  Identificacion: string ;
 Nombre: string ;
 Apellido1: string ;
 Apellido2: string ;
 CorreoElectronico: string ;
  FechaNac: Date;
  Sexo: number;
 CodigoPaisTel: string ;
 Telefono: number;
 CodigoPaisFax: string ;
  Fax: number;
 Provincia: string ;
 Canton: string ;
 Distrito: string ;
 Barrio: string ;
OtrasSenas: string ;

TbBarrios: TbBarrios ;
Tipo: TbTipoId;
TbUsuarios: TbUsuarios ;
  TbClientes:TbClientes []  ;
  TbEmpleado:TbEmpleado[];
  TbEmpresa:TbEmpresa[];
  TbProveedores:TbProveedores[];
constructor(){

}
}
