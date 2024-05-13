import { config } from '../src/config/config';

const databaseClient = config.database;

const roleSeed = [
  { name: 'Admin', description: 'Administrator role' },
  { name: 'Participant', description: 'Participant role' },
  { name: 'Registrant', description: 'Registrant role' },
  { name: 'Standard Client', description: 'Standard Client role' },
];

async function initialSeed() {
  try {
    const existsRoles = await databaseClient.role.findMany();

    if (existsRoles.length === 0) {
      await databaseClient.role.createMany({
        data: roleSeed,
      });
      console.log('Roles seeded successfully.');
    } else {
      console.log('Roles already exist, skipping seeding.');
    }
  } catch (error) {
    console.error('Error seeding:', error);
  } finally {
    await databaseClient.$disconnect();
  }
}

initialSeed();
