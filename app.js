import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import categorieRoutes from './routes/categorieRoutes.js';
import varianteProduitRoutes from './routes/varianteProduitRoutes.js';
import imageProduitRoutes from './routes/imageProduitRoutes.js';
import articleCommandeRoutes from './routes/articleCommandeRoutes.js';
import adresseRoutes from './routes/adresseRoutes.js';
import codePromotionnelRoutes from './routes/codePromotionnelRoutes.js';
import avisClientRoutes from './routes/avisClientRoutes.js';
import listeSouhaitsRoutes from './routes/listeSouhaitsRoutes.js';
import panierRoutes from './routes/panierRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/categories', categorieRoutes);
app.use('/variantes', varianteProduitRoutes);
app.use('/images', imageProduitRoutes);
app.use('/articles', articleCommandeRoutes);
app.use('/adresses', adresseRoutes);
app.use('/codes', codePromotionnelRoutes);
app.use('/avis', avisClientRoutes);
app.use('/souhaits', listeSouhaitsRoutes);
app.use('/paniers', panierRoutes);

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Kreshop API',
    version: '1.0.0',
    description: 'Documentation de l’API Kreshop',
  },
  servers: [
    {
      url: 'http://localhost:' + (process.env.PORT || 8000),
      description: 'Serveur local',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Les commentaires Swagger seront lus dans tous les fichiers de routes
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Quelque chose a mal tourné!' });
});

// Démarrer le serveur
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
