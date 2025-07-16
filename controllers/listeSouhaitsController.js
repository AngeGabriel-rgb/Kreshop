// controllers/listeSouhaitsController.js
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Créer une entrée dans la liste de souhaits
export async function createListeSouhaits(req, res) {
  try {
    const souhait = await prisma.listeSouhaits.create({
      data: req.body,
    });
    res.status(201).json(souhait);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Obtenir toutes les entrées de la liste de souhaits
export async function getAllListesSouhaits(req, res) {
  try {
    const souhaits = await prisma.listeSouhaits.findMany();
    res.json(souhaits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtenir une entrée de la liste de souhaits par ID
export async function getListeSouhaitsById(req, res) {
  try {
    const souhait = await prisma.listeSouhaits.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!souhait) return res.status(404).json({ error: 'Souhait non trouvé' });
    res.json(souhait);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Mettre à jour une entrée de la liste de souhaits
export async function updateListeSouhaits(req, res) {
  try {
    const souhait = await prisma.listeSouhaits.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(souhait);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Supprimer une entrée de la liste de souhaits
export async function deleteListeSouhaits(req, res) {
  try {
    await prisma.listeSouhaits.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Souhait supprimé' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
} 