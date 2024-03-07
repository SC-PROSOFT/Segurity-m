type Estado = 1 | 0;

export interface IAsesor {
  id: number;
  nombre: string;
  contrasena: string;
  estado: Estado;
}
