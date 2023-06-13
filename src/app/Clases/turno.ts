import { HistoriaClinica } from "./historia-clinica";

export class Turno {
    id!: string;
    idEspecialista!: string;
    idPaciente!: string;
    estado!: string;
    paciente!: string;
    especialista!: string;
    especialidad!: string;
    fecha!: string;
    hora!: string;
    comentariosPaciente!: string;
    comentariosEspecialista!: string;
    comentariosAdmin!: string;
    historiaClinica!: HistoriaClinica;
}
