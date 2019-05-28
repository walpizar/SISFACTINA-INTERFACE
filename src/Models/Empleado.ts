import { TbPersona } from "./Personas";
import { TbPagos } from "./Pagos";
import { TbTipoPuesto } from "./TipoPuesto";

export class TbEmpleado{
  Id: string;  
  TipoId: number;
  IdPuesto: number;
  FechaIngreso: Date ;
  FechaSalida: Date ;
  Estado: boolean ;
  FechaCrea: Date;
  FechaUltMod: Date;
  UsuarioCrea: string ;
  UsuarioUltCrea: string;
  EsContraDefinido: boolean;
  Direccion: string;

  IdPuestoNavigation: TbTipoPuesto;
  TbPersona: TbPersona;
  TbPagos: TbPagos[];
constructor(){

}
}
