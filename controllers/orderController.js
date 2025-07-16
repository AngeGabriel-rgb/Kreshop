import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const orderController = {
  // Récupérer les commandes de l'utilisateur
  getUserOrders: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;

      const [orders, total] = await Promise.all([
        prisma.commande.findMany({
          where: { client_id: req.user.id },
          include: {
            articles: {
              include: {
                produit: {
                  include: {
                    images: {
                      where: { est_principale: true },
                      take: 1
                    }
                  }
                },
                variante: true
              }
            }
          },
          skip: parseInt(skip),
          take: parseInt(limit),
          orderBy: { date_creation: 'desc' }
        }),
        prisma.commande.count({ where: { client_id: req.user.id } })
      ]);

      res.json({
        orders,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
    }
  },

  // Récupérer une commande spécifique
  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;

      const order = await prisma.commande.findUnique({
        where: { id },
        include: {
          articles: {
            include: {
              produit: {
                include: {
                  images: {
                    where: { est_principale: true },
                    take: 1
                  }
                }
              },
              variante: true
            }
          },
          client: {
            select: { prenom: true, nom: true, email: true }
          }
        }
      });

      if (!order || (order.client_id !== req.user.id && req.user.role !== 'ADMIN')) {
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

      // Calculer le total
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

      // Créer la commande
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

  // Mettre à jour le statut d'une commande (Admin)
  updateOrderStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { statut, statut_paiement } = req.body;

      const order = await prisma.commande.update({
        where: { id },
        data: {
          ...(statut && { statut }),
          ...(statut_paiement && { statut_paiement })
        }
      });

      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la commande' });
    }
  },

  // Annuler une commande (Utilisateur)
  cancelOrder: async (req, res) => {
    try {
      const { id } = req.params;

      const order = await prisma.commande.findUnique({
        where: { id }
      });

      if (!order || order.client_id !== req.user.id) {
        return res.status(404).json({ error: 'Commande non trouvée' });
      }

      if (order.statut !== 'EN_ATTENTE') {
        return res.status(400).json({ error: 'Seules les commandes en attente peuvent être annulées' });
      }

      const updatedOrder = await prisma.commande.update({
        where: { id },
        data: { statut: 'ANNULEE' }
      });

      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de l\'annulation de la commande' });
    }
  }
};

export default orderController;