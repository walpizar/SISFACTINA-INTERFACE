import { TbProducto } from "./Producto";

export class TbInventario{
IdProducto: string;
Cantidad: number;
CantMin : number;
CantMax: number;
Estado: boolean;
FechaCrea: Date;
FechaUltMod: Date;
UsuarioCrea: string;
UsuarioUltMod: string;

TbProducto: TbProducto;

constructor(){

}

}
