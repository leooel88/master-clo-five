import { sequelize } from './config/database.config';
import { seedUser } from './seeds/users.seed';
import './models/user';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès.');

    // Synchronisation des modèles avec la base de données
    await sequelize.sync({ force: true });
    console.log('Synchronisation des modèles avec la base de données effectuée.');

    // Code pour insérer des données initiales si nécessaire
    await seedUser();
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
  }
})();
