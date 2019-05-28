import { TbCajaUsuario } from './CajaUsuario';
import { TbMonedas } from './Monedas';

export class TbCajaUsuMonedas{

    IdMoneda: string; 
    IdCajaUsuario : number; 
    Cantidad : number; 
    Subtotal : number; 

    IdCajaUsuarioNavigation : TbCajaUsuario; 
    IdMonedaNavigation : TbMonedas; 

    constructor(){

    }
}