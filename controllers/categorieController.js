import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categorieController = {
  // Créer une catégorie
  createCategorie: async (req, res) => {
    try {
      const { nom, slug, description, parent_id, url_image, est_active, ordre_tri } = req.body;
      const categorie = await prisma.categorie.create({
        data: {
          nom,
          slug,
          description,
          parent_id,
          url_image,
          est_active,
          ordre_tri
        }
      });
      res.status(201).json(categorie);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la création de la catégorie", details: error.message });
    }
  },

  // Récupérer toutes les catégories
  getCategories: async (req, res) => {
    try {
      const categories = await prisma.categorie.findMany({
        include: {
          parent: true,
          sous_categories: true,
          produits: true
        },
        orderBy: { ordre_tri: 'asc' }
      });
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des catégories", details: error.message });
    }
  },

  // Récupérer une catégorie par ID
  getCategorieById: async (req, res) => {
    try {
      const { id } = req.params;
      const categorie = await prisma.categorie.findUnique({
        where: { id: parseInt(id) },
        include: {
          parent: true,
          sous_categories: true,
          produits: true
        }
      });
      if (!categorie) {
        return res.status(404).json({ error: "Catégorie non trouvée" });
      }
      res.json(categorie);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération de la catégorie", details: error.message });
    }
  },

  // Mettre à jour une catégorie
  updateCategorie: async (req, res) => {
    try {
      const { id } = req.params;
      const { nom, slug, description, parent_id, url_image, est_active, ordre_tri } = req.body;
      const categorie = await prisma.categorie.update({
        where: { id: parseInt(id) },
        data: {
          nom,
          slug,
          description,
          parent_id,
          url_image,
          est_active,
          ordre_tri
        }
      });
      res.json(categorie);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la mise à jour de la catégorie", details: error.message });
    }
  },

  // Supprimer une catégorie
  deleteCategorie: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.categorie.delete({ where: { id: parseInt(id) } });
      res.json({ message: "Catégorie supprimée avec succès" });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression de la catégorie", details: error.message });
    }
  }
};

export default categorieController; 