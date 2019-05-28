import { TbEmpleado } from "./Empleado";

export class TbTipoPuesto{
  IdTipoPuesto: number ;
  Nombre: string ;
 Descripcion: string ;
  PrecioHora: number;
  PrecioExt: number ;
Estado: boolean ;
FechaCrea: Date ;
 FechaUltMod: Date ;
 UsuarioCrea: string ;
UsuarioUltMod: string ;

  TbEmpleado: TbEmpleado[];
constructor(){

}
}
