import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const orderController = {
  // Récupérer toutes les commandes (Admin)
  getAllOrders: async (req, res) => {
    try {
      const orders = await prisma.commande.findMany({
        include: {
          articles: {
            include: {
              produit: true,
              variante: true
            }
          },
          client: {
            select: { prenom: true, nom: true, email: true }
          }
        },
        orderBy: { date_creation: 'desc' }
      });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
    }
  },

  // Récupérer une commande spécifique
  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await prisma.commande.findUnique({
        where: { id: parseInt(id) },
        include: {
          articles: {
            include: {
              produit: true,
              variante: true
            }
          },
          client: {
            select: { prenom: true, nom: true, email: true }
          }
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
      const { articles, adresse_livraison, adresse_facturation, methode_paiement } = req.body;
      let sous_total = 0;
      const orderItems = [];
      for (const item of articles) {
        const produit = await prisma.produit.findUnique({
          where: { id: item.produit_id },
          include: { variantes: true }
        });
        if (!produit) {
          return res.status(400).json({ error: `Produit ${item.produit_id} non trouvé` });
        }
        let prix = produit.prix_fcfa;
        if (item.variante_id) {
          const variante = produit.variantes.find(v => v.id === item.variante_id);
          if (variante && variante.prix_fcfa) {
            prix = variante.prix_fcfa;
          }
        }
        const total_item = prix * item.quantite;
        sous_total += total_item;
        orderItems.push({
          produit_id: item.produit_id,
          variante_id: item.variante_id,
          quantite: item.quantite,
          prix_fcfa: prix,
          total_fcfa: total_item
        });
      }
      const order = await prisma.commande.create({
        data: {
          numero_commande: `CMD-${Date.now()}`,
          client_id: req.user.id,
          sous_total_fcfa: sous_total,
          total_fcfa: sous_total,
          methode_paiement,
          adresse_livraison,
          adresse_facturation,
          articles: {
            create: orderItems
          }
        },
        include: {
          articles: {
            include: {
              produit: true,
              variante: true
            }
          }
        }
      });
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de la commande' });
    }
  },

  // Mettre à jour une commande (Admin)
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

  // Supprimer une commande (Admin)
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