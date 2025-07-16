// controllers/articleCommandeController.js
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Créer un article de commande
export async function createArticleCommande(req, res) {
  try {
    const article = await prisma.articleCommande.create({
      data: req.body,
    });
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Obtenir tous les articles de commande
export async function getAllArticlesCommande(req, res) {
  try {
    const articles = await prisma.articleCommande.findMany();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtenir un article de commande par ID
export async function getArticleCommandeById(req, res) {
  try {
    const article = await prisma.articleCommande.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!article) return res.status(404).json({ error: 'Article non trouvé' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Mettre à jour un article de commande
export async function updateArticleCommande(req, res) {
  try {
    const article = await prisma.articleCommande.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Supprimer un article de commande
export async function deleteArticleCommande(req, res) {
  try {
    await prisma.articleCommande.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Article supprimé' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
} 