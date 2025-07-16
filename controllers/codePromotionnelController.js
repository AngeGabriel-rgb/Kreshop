// controllers/codePromotionnelController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Créer un code promotionnel
export async function createCodePromotionnel(req, res) {
  try {
    const code = await prisma.codePromotionnel.create({
      data: req.body,
    });
    res.status(201).json(code);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Obtenir tous les codes promotionnels
export async function getAllCodesPromotionnels(req, res) {
  try {
    const codes = await prisma.codePromotionnel.findMany();
    res.json(codes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtenir un code promotionnel par ID
export async function getCodePromotionnelById(req, res) {
  try {
    const code = await prisma.codePromotionnel.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!code) return res.status(404).json({ error: 'Code promotionnel non trouvé' });
    res.json(code);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Mettre à jour un code promotionnel
export async function updateCodePromotionnel(req, res) {
  try {
    const code = await prisma.codePromotionnel.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(code);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Supprimer un code promotionnel
export async function deleteCodePromotionnel(req, res) {
  try {
    await prisma.codePromotionnel.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Code promotionnel supprimé' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
} 