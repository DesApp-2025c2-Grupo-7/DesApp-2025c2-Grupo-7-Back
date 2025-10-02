"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrestadoresService = void 0;
const common_1 = require("@nestjs/common");
const prestadores_json_1 = __importDefault(require("../data/prestadores.json"));
let PrestadoresService = class PrestadoresService {
    prestadores = prestadores_json_1.default;
    calcularHorarioHasta(desde, duracionTurno, cantidadEspecialidades) {
        const [horas, minutos] = desde.split(':').map(Number);
        const duracionEnMinutos = parseInt(duracionTurno.replace(/\D/g, ''));
        const turnosPorEspecialidad = 10;
        const totalTurnos = turnosPorEspecialidad * cantidadEspecialidades;
        const tiempoTotalMinutos = totalTurnos * duracionEnMinutos;
        const fechaInicio = new Date();
        fechaInicio.setHours(horas, minutos, 0, 0);
        const fechaFin = new Date(fechaInicio.getTime() + tiempoTotalMinutos * 60000);
        const horasFin = fechaFin.getHours().toString().padStart(2, '0');
        const minutosFin = fechaFin.getMinutes().toString().padStart(2, '0');
        return `${horasFin}:${minutosFin}`;
    }
    procesarPrestadorConHorarios(prestador) {
        const prestadorProcesado = { ...prestador };
        prestadorProcesado.direccion = prestador.direccion.map(dir => ({
            ...dir,
            horariosAtencion: dir.horariosAtencion.map(horario => ({
                ...horario,
                hasta: this.calcularHorarioHasta(horario.desde, horario.duracionTurno, prestador.especialidades.length)
            }))
        }));
        return prestadorProcesado;
    }
    findAll(q) {
        let prestadores = this.prestadores;
        if (q) {
            prestadores = prestadores.filter(p => p.nombreCompleto.toLowerCase().includes(q.toLowerCase()) ||
                p.numeroCUIL.includes(q));
        }
        return prestadores.map(p => this.procesarPrestadorConHorarios(p));
    }
    findOne(id) {
        const prestador = this.prestadores.find(p => p.id === id);
        if (!prestador)
            throw new common_1.NotFoundException('Prestador no encontrado');
        return this.procesarPrestadorConHorarios(prestador);
    }
};
exports.PrestadoresService = PrestadoresService;
exports.PrestadoresService = PrestadoresService = __decorate([
    (0, common_1.Injectable)()
], PrestadoresService);
//# sourceMappingURL=prestadores.service.js.map