// controllers/varianteProduitController.js
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Créer une variante de produit
export async function createVarianteProduit(req, res) {
  try {
    const variante = await prisma.varianteProduit.create({
      data: req.body,
    });
    res.status(201).json(variante);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Obtenir toutes les variantes de produit
export async function getAllVariantesProduit(req, res) {
  try {
    const variantes = await prisma.varianteProduit.findMany();
    res.json(variantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtenir une variante de produit par ID
export async function getVarianteProduitById(req, res) {
  try {
    const variante = await prisma.varianteProduit.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!variante) return res.status(404).json({ error: 'Variante non trouvée' });
    res.json(variante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Mettre à jour une variante de produit
export async function updateVarianteProduit(req, res) {
  try {
    const variante = await prisma.varianteProduit.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(variante);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Supprimer une variante de produit
export async function deleteVarianteProduit(req, res) {
  try {
    await prisma.varianteProduit.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Variante supprimée' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
} 