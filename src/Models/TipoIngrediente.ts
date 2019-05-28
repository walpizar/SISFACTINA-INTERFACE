import { TbIngredientes } from './Ingredientes';

export class TbTipoIngrediente{

    Id : number 
    Nombre : string; 
    Descripcion : string;
    Estado : boolean; 
    FechaCrea : Date; 
    FechaUltMod : Date; 
    UsuarioCrea : string; 
    UsuarioUltMod : string; 

    TbIngredientes : TbIngredientes[]; 

    constructor(){

    }
}