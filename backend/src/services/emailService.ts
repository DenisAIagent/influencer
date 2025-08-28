import nodemailer from 'nodemailer';
import logger from '../utils/logger';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendVerificationEmail = async (email: string, firstName: string, token: string) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const message = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Vérifiez votre adresse email',
    html: `<p>Bonjour ${firstName},</p><p>Merci de créer un compte. Cliquez sur le lien ci-dessous pour vérifier votre adresse email :</p><p><a href="${verificationUrl}">Vérifier mon email</a></p>`
  };
  try {
    await transporter.sendMail(message);
    logger.info('Verification email sent to %s', email);
  } catch (err) {
    logger.error('Error sending verification email', err);
  }
};

export const sendPasswordResetEmail = async (email: string, firstName: string, token: string) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  const message = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Réinitialisation du mot de passe',
    html: `<p>Bonjour ${firstName},</p><p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous pour choisir un nouveau mot de passe :</p><p><a href="${resetUrl}">Réinitialiser mon mot de passe</a></p>`
  };
  try {
    await transporter.sendMail(message);
    logger.info('Password reset email sent to %s', email);
  } catch (err) {
    logger.error('Error sending password reset email', err);
  }
};
