import { AppDataSource } from '../../data-source';
import { Especialidad } from '../entities/especialidades.entity'

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
        const dataSource = await AppDataSource.initialize();
        console.log('Conectado a la base de datos');

        for (const nombre of especialidades) {
            const existe = await dataSource.getRepository(Especialidad).findOneBy({ nombre });
            if (!existe) {
                const nueva = dataSource.getRepository(Especialidad).create({ nombre });
                await dataSource.getRepository(Especialidad).save(nueva);
                console.log(`Creada especialidad: ${nombre}`);
            } else {
                console.log(`Especialidad ya existe: ${nombre}`);
            }
        }

        await dataSource.destroy();
        console.log('Seed completado y conexión cerrada');
    } catch (error) {
        console.error('Error en seed:', error);
    }
}

seedEspecialidades();