import { TbPersona } from './Personas';
import { TbDistrito } from './Distrito';

export class TbBarrios{

  Provincia : string;
  Canton : string; 
  Distrito : string; 
  Barrio : String; 
  Nombre : string; 

  TbDistrito : TbDistrito; 
  TbPersona : TbPersona[]; 




  constructor(){


  }
}
