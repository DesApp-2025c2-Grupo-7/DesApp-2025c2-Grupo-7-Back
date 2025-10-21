"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const especialidades_entity_1 = require("../entities/especialidades.entity");
const especialidades = [
    'Cardiología',
    'Nutrición',
    'Odontología',
    'Kinesiología',
    'Fisiatría',
    'Terapia Ocupacional',
    'Traumatología',
];
async function seedEspecialidades() {
    try {
        const dataSource = await data_source_1.AppDataSource.initialize();
        console.log('Conectado a la base de datos');
        for (const nombre of especialidades) {
            const existe = await dataSource.getRepository(especialidades_entity_1.Especialidad).findOneBy({ nombre });
            if (!existe) {
                const nueva = dataSource.getRepository(especialidades_entity_1.Especialidad).create({ nombre });
                await dataSource.getRepository(especialidades_entity_1.Especialidad).save(nueva);
                console.log(`Creada especialidad: ${nombre}`);
            }
            else {
                console.log(`Especialidad ya existe: ${nombre}`);
            }
        }
        await dataSource.destroy();
        console.log('Seed completado y conexión cerrada');
    }
    catch (error) {
        console.error('Error en seed:', error);
    }
}
seedEspecialidades();
//# sourceMappingURL=seed-especialidades.js.map