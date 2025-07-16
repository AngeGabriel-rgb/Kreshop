// controllers/adresseController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Créer une adresse
export async function createAdresse(req, res) {
  try {
    const adresse = await prisma.adresse.create({
      data: req.body,
    });
    res.status(201).json(adresse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Obtenir toutes les adresses
export async function getAllAdresses(req, res) {
  try {
    const adresses = await prisma.adresse.findMany();
    res.json(adresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtenir une adresse par ID
export async function getAdresseById(req, res) {
  try {
    const adresse = await prisma.adresse.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!adresse) return res.status(404).json({ error: 'Adresse non trouvée' });
    res.json(adresse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Mettre à jour une adresse
export async function updateAdresse(req, res) {
  try {
    const adresse = await prisma.adresse.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(adresse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Supprimer une adresse
export async function deleteAdresse(req, res) {
  try {
    await prisma.adresse.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Adresse supprimée' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
} 