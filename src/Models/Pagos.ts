import { TbEmpleado } from "./Empleado";
import { TbMovimientos } from './Movimiento';

export class TbPagos{
  Id: number;
  IdEmpleado: string;
 TipoId: number;
 CantidadHoras: number ;
  CantidadHoraExtra: number  ;
Total: number ;
  FechaPago: Date;
 Descripcion: string ;
 FechaCrea: Date;
FechaUltMod: Date;
 UsuarioCrea: string;
UsuarioUltMod: string;
 IdMovimiento: number ;

IdMovimientoNavigation: TbMovimientos;
TbEmpleado: TbEmpleado;

constructor(){

}
}
