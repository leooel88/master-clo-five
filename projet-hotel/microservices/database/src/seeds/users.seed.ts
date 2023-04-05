// microservices/database/src/seed.ts
import { sequelize } from '../config/database.config';
import { User } from '../models/user'

export const seedUser = async () => {
  try {
    // Créer l'utilisateur ADMIN initial
    const users = [
      {
        first_name: "ADMIN",
        last_name: "ADMIN",
        username: "ADMIN",
        password: "@ADMINpwd2023",
        role: "ADMIN"
      }
    ];
    await User.bulkCreate(users);

    console.log('Base de données initialisée avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données : ', error);
  }
};
