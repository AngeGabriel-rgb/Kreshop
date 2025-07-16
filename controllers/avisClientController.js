// controllers/avisClientController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Créer un avis client
export async function createAvisClient(req, res) {
  try {
    const avis = await prisma.avisClient.create({
      data: req.body,
    });
    res.status(201).json(avis);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Obtenir tous les avis clients
export async function getAllAvisClients(req, res) {
  try {
    const avis = await prisma.avisClient.findMany();
    res.json(avis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtenir un avis client par ID
export async function getAvisClientById(req, res) {
  try {
    const avis = await prisma.avisClient.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!avis) return res.status(404).json({ error: 'Avis non trouvé' });
    res.json(avis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Mettre à jour un avis client
export async function updateAvisClient(req, res) {
  try {
    const avis = await prisma.avisClient.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(avis);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Supprimer un avis client
export async function deleteAvisClient(req, res) {
  try {
    await prisma.avisClient.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Avis supprimé' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
} 