import { sequelize } from './config/database.config';
import './models/category';
import './models/pricePolicy';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès.');

    // Synchronisation des modèles avec la base de données
    await sequelize.sync({ force: true });
    console.log('Synchronisation des modèles avec la base de données effectuée.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
  }
})();
