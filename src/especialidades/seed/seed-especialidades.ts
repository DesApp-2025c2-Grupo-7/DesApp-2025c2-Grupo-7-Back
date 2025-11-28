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
    'Clínica Médica',
    'Pediatría',
    'Dermatología',
    'Ginecología',
    'Urología',
    'Neurología',
    'Endocrinología',
    'Gastroenterología',
    'Otorrinolaringología',
    'Oftalmología',
    'Reumatología',
    'Psiquiatría',
    'Psicología',
    'Alergia e Inmunología',
    'Neumonología',
    'Oncología',
    'Hematología',
    'Nefrología',
    'Infectología',
    'Fonoaudiología',
    'Medicina General',
    'Medicina del Deporte',
    'Neurocirugía',
    'Cirugía General',
    'Cirugía Plástica',
    'Anestesiología'
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
