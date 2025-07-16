import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const orderController = {
  // Récupérer toutes les commandes
  getAllOrders: async (req, res) => {
    try {
      const orders = await prisma.commande.findMany({
        include: {
          articles: true,
          client: true
        },
        orderBy: { date_creation: 'desc' }
      });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
    }
  },

  // Récupérer une commande par ID
  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await prisma.commande.findUnique({
        where: { id: parseInt(id) },
        include: {
          articles: true,
          client: true
        }
      });
      if (!order) {
        return res.status(404).json({ error: 'Commande non trouvée' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération de la commande' });
    }
  },

  // Créer une nouvelle commande
  createOrder: async (req, res) => {
    try {
      const data = req.body;
      const order = await prisma.commande.create({
        data,
        include: {
          articles: true,
          client: true
        }
      });
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de la commande' });
    }
  },

  // Mettre à jour une commande
  updateOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const order = await prisma.commande.update({
        where: { id: parseInt(id) },
        data: updateData,
        include: {
          articles: true,
          client: true
        }
      });
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la commande' });
    }
  },

  // Supprimer une commande
  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.commande.delete({ where: { id: parseInt(id) } });
      res.json({ message: 'Commande supprimée' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression de la commande' });
    }
  }
};

export default orderController; 