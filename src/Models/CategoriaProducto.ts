
import { TbProducto } from "./Producto";

export class TbCategoriaProducto {
  Id: number ;
 Nombre: string ;
Descripcion: string ;
Fotocategoria: string;
  Estado: boolean ;
FechaCrea: Date ;
 FechaUltMod: Date  ;
UsuarioCrea: string ;
UsuarioUltMod: string;

TbProducto: TbProducto[];
  constructor() {

  }
}
