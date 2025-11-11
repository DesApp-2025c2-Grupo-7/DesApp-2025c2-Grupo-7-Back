import { AppDataSource } from '../../data-source';
import { Especialidad } from '../entities/especialidades.entity';

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
        console.log('✅ Conectado a la base de datos');

        const repo = dataSource.getRepository(Especialidad);

        for (const nombre of especialidades) {
            const existe = await repo.findOneBy({ nombre });
            if (!existe) {
                const nueva = repo.create({ nombre });
                await repo.save(nueva);
                console.log(`🟢 Creada especialidad: ${nombre}`);
            } else {
                console.log(`⚙️ Especialidad ya existe: ${nombre}`);
            }
        }

        await dataSource.destroy();
        console.log('✅ Seed completado y conexión cerrada');
    } catch (error) {
        console.error('❌ Error en seed:', error);
    }
}

seedEspecialidades();
