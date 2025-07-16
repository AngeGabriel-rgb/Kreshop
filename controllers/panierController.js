// controllers/panierController.js
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Créer une entrée dans le panier
export async function createPanier(req, res) {
  try {
    const panier = await prisma.panier.create({
      data: req.body,
    });
    res.status(201).json(panier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Obtenir toutes les entrées du panier
export async function getAllPaniers(req, res) {
  try {
    const paniers = await prisma.panier.findMany();
    res.json(paniers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtenir une entrée du panier par ID
export async function getPanierById(req, res) {
  try {
    const panier = await prisma.panier.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!panier) return res.status(404).json({ error: 'Entrée du panier non trouvée' });
    res.json(panier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Mettre à jour une entrée du panier
export async function updatePanier(req, res) {
  try {
    const panier = await prisma.panier.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(panier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Supprimer une entrée du panier
export async function deletePanier(req, res) {
  try {
    await prisma.panier.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Entrée du panier supprimée' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
} 