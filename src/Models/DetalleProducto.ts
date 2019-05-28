import { TbIngredientes } from './Ingredientes';

export class TbDetalleProducto{


    Id : number; 
    IdProducto : string; 
    IdIngrediente : number; 
    Cantidad : number;

    IdIngredienteNavigation : TbIngredientes; 

    constructor(){

    }
}