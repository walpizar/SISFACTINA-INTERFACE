import { TbDetalleMovimiento } from './DetalleMovimiento';
import { TbDetalleProducto } from './DetalleProducto';
import { TbTipoIngrediente } from './TipoIngrediente';
import { TbIngredienteProveedor } from './IngredienteProveedor';

export class TbIngredientes{

    IdIngrediente : number;
    Nombre : string; 
    IdTipoMedida : number; 
    IdTipoIngrediente : number; 
    PrecioCompra : number; 
    Estado : boolean;
    FechaCrea : Date; 
    FechaUltMod : Date; 
    UsuarioCrea : string; 
    UsuarioUltMod : string; 

    IdTipoIngredienteNavigation : TbTipoIngrediente;
    TbDetalleMovimiento : TbDetalleMovimiento[] 
    TbDetalleProducto  : TbDetalleProducto[];
    TbIngredienteProveedor : TbIngredienteProveedor[];


    constructor(){

    }
}