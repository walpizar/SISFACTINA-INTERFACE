import { TbEmpresa } from './Empresa';
import { TbDistrito } from './Distrito';


export class TbSucursales {

    Id: number;
    IdEmpresa: string;
    IdTipoEmpresa: number;
    Provincia: string;
    Canton: string;
    Distrito: string;
    Direccion: string;
    Telefono: number;
    FechaUltMod: Date;
    FechaCrea: Date;
    UsuarioCrea: string;
    UsuarioUltMod: string;
    Nombre: string;

    TbDistrito: TbDistrito;
    IdNavigation: TbEmpresa;
    TbCajas: Array<object>
    constructor() {

    }
}
