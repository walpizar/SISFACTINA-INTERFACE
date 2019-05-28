import { TbProducto } from "./Producto";

export class TbImpuestos{

  Id: number;
  Valor: string;
  Descripcion: string;
  Estado: boolean;
  FechaCrea: Date;
  UsuarioCrea: string;
  FechaUltMod: Date;
  UsuarioUltMod: string;
  TbProducto: TbProducto[];

  constructor() {

  }
}
