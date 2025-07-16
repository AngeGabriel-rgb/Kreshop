// controllers/imageProduitController.js
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Créer une image de produit
export async function createImageProduit(req, res) {
  try {
    const image = await prisma.imageProduit.create({
      data: req.body,
    });
    res.status(201).json(image);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Obtenir toutes les images de produit
export async function getAllImagesProduit(req, res) {
  try {
    const images = await prisma.imageProduit.findMany();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtenir une image de produit par ID
export async function getImageProduitById(req, res) {
  try {
    const image = await prisma.imageProduit.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!image) return res.status(404).json({ error: 'Image non trouvée' });
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Mettre à jour une image de produit
export async function updateImageProduit(req, res) {
  try {
    const image = await prisma.imageProduit.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(image);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Supprimer une image de produit
export async function deleteImageProduit(req, res) {
  try {
    await prisma.imageProduit.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Image supprimée' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
} 