import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Middleware d'authentification amélioré :
// - Vérifie le token JWT
// - Décode le rôle (admin ou client)
// - Cherche l'utilisateur dans la bonne table
// - Ajoute req.user avec un champ role cohérent ("ADMIN" ou "CLIENT")
export const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;
    if (decoded.role === 'admin') {
      // Cherche dans la table admin
      user = await prisma.admin.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, est_actif: true }
      });
      if (user) user.role = 'ADMIN';
      if (user && user.est_actif === false) user = null;
    } else if (decoded.role === 'client') {
      // Cherche dans la table client
      user = await prisma.client.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, est_actif: true }
      });
      if (user) user.role = 'CLIENT';
      if (user && user.est_actif === false) user = null;
    }

    if (!user) {
      return res.status(401).json({ message: 'Compte désactivé ou inexistant' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

// Middleware de validation des données de commande
export const validateOrderData = async (req, res, next) => {
  const { articles, adresse_livraison, methode_paiement } = req.body;

  if (!articles || !Array.isArray(articles) || articles.length === 0) {
    return res.status(400).json({ message: 'Le panier ne peut pas être vide' });
  }

  if (!adresse_livraison || !methode_paiement) {
    return res.status(400).json({ 
      message: 'Adresse de livraison et méthode de paiement requises' 
    });
  }

  // Vérification de la disponibilité des produits
  try {
    for (const item of articles) {
      const product = await prisma.product.findUnique({
        where: { id: item.produit_id },
        select: { stock: true, isActive: true }
      });

      if (!product || !product.isActive) {
        return res.status(400).json({ 
          message: `Produit ${item.produit_id} indisponible` 
        });
      }

      if (product.stock < item.quantite) {
        return res.status(400).json({ 
          message: `Stock insuffisant pour le produit ${item.produit_id}` 
        });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Erreur de validation du panier' });
  }
};

// Middleware pour vérifier l'appartenance de la commande
export const checkOrderOwnership = async (req, res, next) => {
  try {
    const orderId = parseInt(req.params.id);
    const userId = req.user.id;

    const order = await prisma.commande.findUnique({
      where: { id: orderId },
      select: { client_id: true }
    });

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    // Autorise l'accès si l'utilisateur est le propriétaire ou un admin
    if (order.client_id !== userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ 
        message: 'Vous ne pouvez pas accéder à cette commande' 
      });
    }

    req.order = order;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Erreur de vérification de la commande' });
  }
};

// Middleware pour vérifier si l'annulation est possible
export const checkCancelPossibility = async (req, res, next) => {
  try {
    const orderId = parseInt(req.params.id);
    
    const order = await prisma.commande.findUnique({
      where: { id: orderId },
      select: { statut: true }
    });

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    const nonCancellableStatuses = ['EXPEDIEE', 'LIVREE', 'ANNULEE'];
    if (nonCancellableStatuses.includes(order.statut)) {
      return res.status(400).json({ 
        message: `Impossible d'annuler une commande ${order.statut.toLowerCase()}` 
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Erreur de vérification du statut' });
  }
};

// Middleware pour valider la mise à jour du statut (admin)
export const validateStatusUpdate = async (req, res, next) => {
  const { statut, statut_paiement } = req.body;
  const validOrderStatuses = ['EN_ATTENTE', 'TRAITEMENT', 'EXPEDIEE', 'LIVREE', 'ANNULEE'];
  const validPaymentStatuses = ['EN_ATTENTE', 'PAYE', 'ERREUR', 'REMBOURSE'];

  if (statut && !validOrderStatuses.includes(statut)) {
    return res.status(400).json({ 
      message: `Statut de commande invalide. Valeurs acceptées: ${validOrderStatuses.join(', ')}` 
    });
  }

  if (statut_paiement && !validPaymentStatuses.includes(statut_paiement)) {
    return res.status(400).json({ 
      message: `Statut de paiement invalide. Valeurs acceptées: ${validPaymentStatuses.join(', ')}` 
    });
  }

  next();
};

// Middleware d'autorisation basé sur le rôle
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès refusé : droits insuffisants" });
    }
    next();
  };
};

// Middleware spécifique admin
export const adminMiddleware = authorize('ADMIN');
// Middleware spécifique client
export const clientMiddleware = authorize('CLIENT');

export default {
  authenticate,
  adminMiddleware,
  clientMiddleware,
  validateOrderData,
  checkOrderOwnership,
  checkCancelPossibility,
  validateStatusUpdate,
  authorize
};