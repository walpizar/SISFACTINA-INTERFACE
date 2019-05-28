import { TbClientes } from './Cliente';

export class TbTipoClientes
    {

        Id :number;
        Nombre :string;
        Descripcion :string;
        Estado :boolean;
        FechaCrea :Date;
        FechaUltMod :Date;
        UsuarioCrea :string;
        UsuarioUltMod :string;

        TbClientes : TbClientes[];

        constructor(){

        }
    }