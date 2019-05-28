import { TbMovimientos } from './Movimiento';
import { TbIngredientes } from './Ingredientes';

export class TbDetalleMovimiento{


    IdDetalleMov : number; 
    IdMov : number; 
    IdIngrediente : number; 
    Cantidad : number;
    Monto : number; //? 

    IdIngredienteNavigation : TbIngredientes;
    IdMovNavigation : TbMovimientos;



    constructor(){

    }
}