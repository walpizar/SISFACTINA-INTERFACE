import { TbProducto } from "./Producto";

export class TbTipoMedidas {

  IdTipoMedida: number;
  Nombre: string;
  Nomenclatura: string;
  Descripcion: string;
  Estado: boolean;
  FechaCrea: Date;
  FechaUltMod: Date;
  UsuarioCrea: string;
  UsuarioUltMod: string;

  TbProducto: TbProducto[];
  constructor() {

  }
}
