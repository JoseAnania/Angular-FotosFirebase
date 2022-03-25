/* Modelo de Datos */

// creamos la clase permitiendo la exportación
export class FileItem {

    // definimos las propiedades
    public archivo: File;
    public nombreArchivo: string;
    public url: string | undefined;
    public estaSubiendo: boolean;
    public progreso: number;

    // creamos el constructor que reciba un Archivo (obligatorio)
    constructor( archivo: File ) {
    
        // seteamos las propiedades
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;
        this.estaSubiendo = false;
        this.progreso = 0;
    }

}