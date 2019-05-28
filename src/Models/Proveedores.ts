import { TbProducto } from './Producto';
import { TbPersona } from './Personas';
import { TbHorarioProveedor } from './HorarioProveedor';

 
export class TbProveedores{

Id : string;
TipoId : number;
Descripcion :string ;
ContactoProveedor :string ;
Fax : string;
NombreTributario : string;
EncargadoConta : string;
CorreoElectConta : string;
  CuentaBancaria: string;
  Estado: boolean;
FechaCrea : Date;
FechaUltMod : Date;
UsuarioCrea :string ;
UsuarioUltMod :string ;
TbPersona : TbPersona;
TbHorarioProveedor : TbHorarioProveedor;
TbProducto : TbProducto;

constructor(){

}
}
