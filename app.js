import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour analyser le corps des requêtes
app.use(express.json());

// Route de base
app.get('/', (req, res) => {
    res.send('Bonjour, monde !');
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});