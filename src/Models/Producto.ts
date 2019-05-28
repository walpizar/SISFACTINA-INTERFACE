import { TbProveedores } from './Proveedores';
import { TbInventario } from './Inventario';
import { TbCategoriaProducto } from './CategoriaProducto';
import { TbImpuestos } from './Impuesto';
import { TbTipoMedidas } from './TipoMedidas';
import { TbDetalleDocumento } from './DetalleDocumento';

export class TbProducto{
IdProducto:number;
Nombre:string;
IdCategoria:number;
IdProveedor:number;
IdMedida:number;
IdTipoIdProveedor:null;
PrecioVariable:true;
PrecioUtilidad1:number;
PrecioUtilidad2:number;
PrecioUtilidad3:number;
PrecioVenta1:number;
PrecioVenta2:number;
PrecioVenta3:number;
Utilidad1Porc:number;
Utilidad3Porc:number;
Utilidad2Porc:number;
PrecioReal:number;
EsExento:boolean;
IdTipoImpuesto:number;
AplicaDescuento: boolean;
Foto:string;
DescuentoMax:number;
Estado: boolean;
FechaCrea:Date;
FechaUltMod:Date;
UsuarioCrea:string;
UsuarioUltMod:string;
Id:TbProveedores;
IdCategoriaNavigation:TbCategoriaProducto;
IdMedidaNavigation:TbTipoMedidas;
IdProductoNavigation:TbInventario;
IdTipoImpuestoNavigation:TbImpuestos;
TbDetalleDocumento:TbDetalleDocumento[];


    constructor(){
    }
}

