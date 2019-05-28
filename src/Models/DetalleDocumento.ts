import { TbDocumento } from './Documento';
import { TbProducto } from './Producto';

export class TbDetalleDocumento{

    IdTipoDoc : number;
    IdDoc : number 
    IdProducto : string; 
    NumLinea : number; 
    Cantidad : number; 
    Precio : number; 
    MontoTotal : number; 
    Descuento: number; 
    MontoTotalDesc : number; 
    MontoTotalImp : number; 
    MontoTotalExo : number; 
    TotalLinea : number; 

    Id : TbDocumento ;
    IdProductoNavigation : TbProducto; 

    constructor(){

    }
}