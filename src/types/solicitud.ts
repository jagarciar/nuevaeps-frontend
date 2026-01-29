export interface SolicitudMedicamento {
  id?: number
  medicamentoId: number
  usuarioId: number
  numeroOrden: string
  direccion: string
  telefono: string
  correoElectronico: string
}

export interface Medicamento {
  id?: number
  nombre: string}