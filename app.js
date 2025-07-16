import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authroutes.js';
import productRoutes from './routes/productRoutes.js';
import categorieRoutes from './routes/categorieRoutes.js';
import varianteProduitRoutes from './routes/varianteProduitRoutes.js';
import imageProduitRoutes from './routes/imageProduitRoutes.js';
import articleCommandeRoutes from './routes/articleCommandeRoutes.js';
import adresseRoutes from './routes/adresseRoutes.js';
import codePromotionnelRoutes from './routes/codePromotionnelRoutes.js';
import avisClientRoutes from './routes/avisClientRoutes.js';
import listeSouhaitsRoutes from './routes/listeSouhaitsRoutes.js';
import panierRoutes from './routes/panierRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/categories', categorieRoutes);
app.use('/variantes', varianteProduitRoutes);
app.use('/images', imageProduitRoutes);
app.use('/articles', articleCommandeRoutes);
app.use('/adresses', adresseRoutes);
app.use('/codes', codePromotionnelRoutes);
app.use('/avis', avisClientRoutes);
app.use('/souhaits', listeSouhaitsRoutes);
app.use('/paniers', panierRoutes);
app.use('/orders', orderRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Quelque chose a mal tourné!' });
});

// Démarrer le serveur
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});