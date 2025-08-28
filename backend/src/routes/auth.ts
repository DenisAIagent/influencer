import express, { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import User, { IUser } from '../models/User';
import { authMiddleware } from '../middleware/auth';
import { sendVerificationEmail, sendPasswordResetEmail } from '../services/emailService';

const router = express.Router();

// POST /auth/register - create a new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, company, role } = req.body;

    // Basic validation
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'Email, password, firstName et lastName sont obligatoires' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'Un compte existe déjà avec cet email' });
    }

    // Create verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    // Create user
    const user = new User({
      email: email.toLowerCase(),
      password,
      firstName,
      lastName,
      company,
      role: role || 'freelancer',
      emailVerificationToken
    } as Partial<IUser>);
    await user.save();

    // Send verification email (non-blocking)
    await sendVerificationEmail(user.email, user.firstName, emailVerificationToken);

    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      jwtSecret, 
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      message: 'Compte créé avec succès. Vérifiez votre email pour activer votre compte.',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        company: user.company,
        role: user.role,
        subscription: user.subscription,
        usage: user.usage,
        emailVerified: user.emailVerified
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: 'Erreur lors de la création du compte' });
  }
});

// POST /auth/login - authenticate a user and return JWT
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe obligatoires' });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    user.lastLoginAt = new Date();
    await user.save();
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      jwtSecret, 
      { expiresIn: '7d' }
    );
    return res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        company: user.company,
        role: user.role,
        subscription: user.subscription,
        usage: user.usage,
        emailVerified: user.emailVerified
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
});

// GET /auth/me - get current user info
router.get('/me', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user.id).select('-password -emailVerificationToken -passwordResetToken');
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    return res.json({ user });
  } catch (err) {
    console.error('Get user error:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /auth/verify-email
router.post('/verify-email', async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Token de vérification requis' });
    }
    const user = await User.findOne({ emailVerificationToken: token });
    if (!user) {
      return res.status(400).json({ error: 'Token de vérification invalide ou expiré' });
    }
    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();
    return res.json({ message: 'Email vérifié avec succès' });
  } catch (err) {
    console.error('Email verification error:', err);
    return res.status(500).json({ error: 'Erreur lors de la vérification' });
  }
});

// POST /auth/forgot-password
router.post('/forgot-password', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email requis' });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Do not reveal whether user exists
      return res.json({ message: 'Si un compte existe avec cet email, vous recevrez un lien de réinitialisation' });
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = resetToken;
    user.passwordResetExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();
    await sendPasswordResetEmail(user.email, user.firstName, resetToken);
    return res.json({ message: 'Si un compte existe avec cet email, vous recevrez un lien de réinitialisation' });
  } catch (err) {
    console.error('Forgot password error:', err);
    return res.status(500).json({ error: 'Erreur lors de l\'envoi du lien' });
  }
});

// POST /auth/reset-password
router.post('/reset-password', async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token et nouveau mot de passe requis' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères' });
    }
    const user = await User.findOne({ passwordResetToken: token, passwordResetExpiry: { $gt: new Date() } });
    if (!user) {
      return res.status(400).json({ error: 'Token invalide ou expiré' });
    }
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpiry = undefined;
    await user.save();
    return res.json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (err) {
    console.error('Reset password error:', err);
    return res.status(500).json({ error: 'Erreur lors de la réinitialisation' });
  }
});

// PUT /auth/profile
router.put('/profile', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, company, preferences } = req.body;
    const userId = (req as any).user.id;
    const updateData: Partial<IUser> = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (company !== undefined) updateData.company = company;
    if (preferences) updateData.preferences = preferences;
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true })
      .select('-password -emailVerificationToken -passwordResetToken');
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    return res.json({ message: 'Profil mis à jour avec succès', user });
  } catch (err) {
    console.error('Update profile error:', err);
    return res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
});

export default router;
