import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pkg from '@prisma/client';
const { PrismaClient, Prisma } = pkg; // Importez Prisma pour la gestion des erreurs
const prisma = new PrismaClient();

// Inscription Client
export const registerClient = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    // Vérifier si l'email existe déjà
    const existingClient = await prisma.client.findUnique({ where: { email } });
    if (existingClient) {
      return res.status(409).json({ // Utilisez 409 Conflict pour une ressource existante
        message: 'Un client avec cet email existe déjà',
        code: 'EMAIL_ALREADY_EXISTS'
      });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Créer le client
    const client = await prisma.client.create({
      data: {
        email,
        mot_de_passe_hash: hashedPassword,
        prenom: firstName,
        nom: lastName,
        telephone: phone,
        est_actif: true, // Assurez-vous que le client est actif par défaut
      },
      select: { // Sélectionnez les champs spécifiques à retourner
        id: true,
        email: true,
        prenom: true,
        nom: true,
        telephone: true,
        est_actif: true,
        date_creation: true,
      }
    });

    // Générer le token JWT
    const token = jwt.sign(
      { id: client.id, email: client.email, role: 'client' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Retourner la réponse au format attendu par le frontend
    res.status(201).json({
      user: { ...client, role: 'client' }, // Mappez client vers user et ajoutez le rôle
      token,
      role: 'client', // Ajoutez le rôle au niveau supérieur
      message: 'Inscription client réussie',
      success: true,
      expiresIn: '24h'
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription client:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(409).json({
          message: "Violation de contrainte unique (email déjà utilisé)",
          target: error.meta?.target,
          code: "UNIQUE_CONSTRAINT_VIOLATION",
        });
      }
    }
    res.status(500).json({
      message: "Une erreur est survenue lors de l'inscription du client",
      code: "INTERNAL_SERVER_ERROR",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Inscription Admin
export const registerAdmin = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, adminKey } = req.body;

    // 1. Validation des données d'entrée
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        message: "Tous les champs obligatoires doivent être remplis",
        requiredFields: ["email", "password", "firstName", "lastName"],
        code: "MISSING_REQUIRED_FIELDS",
      });
    }
    const isInitialAdminRegistration = adminKey && adminKey === process.env.ADMIN_REGISTRATION_KEY;

    if (!isInitialAdminRegistration && (!req.user || req.user.role !== "admin")) {
      return res.status(403).json({
        message: "Action réservée aux administrateurs ou nécessite une clé d'enregistrement admin valide.",
        code: "ADMIN_ACCESS_REQUIRED",
      });
    }

    // 3. Vérification de l'email existant
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
      select: { id: true },
    });
    if (existingAdmin) {
      return res.status(409).json({
        message: "Un administrateur avec cet email existe déjà",
        code: "EMAIL_ALREADY_EXISTS",
      });
    }

    // 4. Hachage du mot de passe
    const hashedPassword = await bcryptjs.hash(password, 12);

    // 5. Création de l'admin
    const admin = await prisma.admin.create({
      data: {
        email,
        mot_de_passe_hash: hashedPassword,
        prenom: firstName,
        nom: lastName,
        telephone: phone,
        est_actif: true, 
      },
      select: {
        id: true,
        email: true,
        prenom: true,
        nom: true,
        telephone: true,
        est_actif: true,
        date_creation: true,
      },
    });

    // 6. Génération du token JWT
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: "admin",
        iss: "your-app-name",
        aud: "your-app-client",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      },
    );

  
    res.status(201).json({
      success: true,
      message: "Administrateur créé avec succès",
      user: { ...admin, role: 'admin' }, 
      token,
      role: 'admin', 
      expiresIn: "12h",
    });
  } catch (error) {
    console.error("Erreur lors de la création admin:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(409).json({
          message: "Violation de contrainte unique (email déjà utilisé)",
          target: error.meta?.target,
          code: "UNIQUE_CONSTRAINT_VIOLATION",
        });
      }
    }
    res.status(500).json({
      message: "Une erreur est survenue lors de la création de l'administrateur",
      code: "INTERNAL_SERVER_ERROR",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Connexion Client 
export const loginClient = async (req, res) => {
  try {
    const { email, password } = req.body;
    const client = await prisma.client.findUnique({ where: { email } });
    if (!client) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }
    const passwordMatch = await bcryptjs.compare(password, client.mot_de_passe_hash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }
    if (!client.est_actif) {
      return res.status(403).json({ message: 'Compte désactivé' });
    }
    const token = jwt.sign(
      { id: client.id, email: client.email, role: 'client' },
      process.env.JWT_SECRET,
      { expiresIn: '72h' }
    );
    res.json({
      user: { ...client, role: 'client' }, 
      token,
      role: 'client',
      message: 'Connexion client réussie',
      success: true, 
      expiresIn: '72h' 
    });
  } catch (error) {
    console.error("Erreur lors de la connexion client:", error);
    res.status(500).json({ message: error.message });
  }
};

// Connexion Admin 
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }
    const passwordMatch = await bcryptjs.compare(password, admin.mot_de_passe_hash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }
    if (!admin.est_actif) {
      return res.status(403).json({ message: 'Compte administrateur désactivé' });
    }
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: 'admin',
        iss: "your-app-name",
        aud: "your-app-client"
      },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );
    res.json({
      user: { ...admin, role: 'admin' }, // Assurez-vous que le rôle fait partie de l'objet utilisateur
      token,
      role: 'admin',
      message: 'Connexion administrateur réussie',
      success: true, // Ajoutez le champ success pour la cohérence
      expiresIn: '12h' // Ajoutez expiresIn pour la cohérence
    });
  } catch (error) {
    console.error("Erreur lors de la connexion admin:", error);
    res.status(500).json({ message: error.message });
  }
};