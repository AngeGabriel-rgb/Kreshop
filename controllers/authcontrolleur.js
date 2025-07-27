import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Inscription Client
export const registerClient = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    // Vérifier si l'email existe déjà
    const existingClient = await prisma.client.findUnique({ where: { email } });
    if (existingClient) {
      return res.status(400).json({ message: 'Un client avec cet email existe déjà' });
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
      },
    });

    // Générer le token JWT
    const token = jwt.sign(
      { id: client.id, email: client.email, role: 'client' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ client, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Inscription Admin
export const registerAdmin = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, adminKey } = req.body // Ajout de adminKey

    // 1. Validation des données d'entrée
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        message: "Tous les champs obligatoires doivent être remplis",
        requiredFields: ["email", "password", "firstName", "lastName"],
        code: "MISSING_REQUIRED_FIELDS",
      })
    }

    // Déterminer si l'inscription est autorisée sans authentification admin existante
    // Ceci est pour la création du premier admin ou via une clé secrète
    const isInitialAdminRegistration = adminKey && adminKey === process.env.ADMIN_REGISTRATION_KEY

    // 2. Vérification de l'autorisation
    // Si ce n'est pas une inscription admin initiale (avec clé), alors exiger une authentification admin existante
    if (!isInitialAdminRegistration && (!req.user || req.user.role !== "admin")) {
      return res.status(403).json({
        message: "Action réservée aux administrateurs ou nécessite une clé d'enregistrement admin valide.",
        code: "ADMIN_ACCESS_REQUIRED",
      })
    }

    // 3. Vérification de l'email existant
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
      select: { id: true },
    })
    if (existingAdmin) {
      return res.status(409).json({
        message: "Un administrateur avec cet email existe déjà",
        code: "EMAIL_ALREADY_EXISTS",
      })
    }

    // 4. Hachage du mot de passe
    const hashedPassword = await bcryptjs.hash(password, 12)

    // 5. Création de l'admin
    const admin = await prisma.admin.create({
      data: {
        email,
        mot_de_passe_hash: hashedPassword,
        prenom: firstName,
        nom: lastName,
        telephone: phone,
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
    })

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
    )

    // 7. Réponse réussie
    res.status(201).json({
      success: true,
      message: "Administrateur créé avec succès",
      admin,
      token,
      expiresIn: "12h",
    })
  } catch (error) {
    console.error("Erreur lors de la création admin:", error)

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(400).json({
          message: "Violation de contrainte unique",
          target: error.meta?.target,
          code: "UNIQUE_CONSTRAINT_VIOLATION",
        })
      }
    }
    res.status(500).json({
      message: "Une erreur est survenue lors de la création de l'administrateur",
      code: "INTERNAL_SERVER_ERROR",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    })
  }
}

// Connexion
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user;
    let role; // Déclarez la variable role ici

    // Vérifier d'abord dans la table client
    const clientUser = await prisma.client.findUnique({ where: { email } });
    if (clientUser) {
      user = clientUser;
      role = 'client';
    } else {
      // Si pas trouvé, vérifier dans la table admin
      const adminUser = await prisma.admin.findUnique({ where: { email } });
      if (adminUser) {
        user = adminUser;
        role = 'admin';
      }
    }

    // Si aucun utilisateur trouvé
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Vérifier le mot de passe
    const passwordMatch = await bcryptjs.compare(password, user.mot_de_passe_hash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: '72h' }
    );

    // Retourner l'utilisateur, le token ET le rôle explicitement
    res.json({ user, token, role }); // <-- C'EST LE CHANGEMENT CLÉ
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};