import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authApi } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const schema = z
  .object({
    firstName: z.string().min(1, { message: 'Prénom requis' }),
    lastName: z.string().min(1, { message: 'Nom requis' }),
    email: z.string().email({ message: 'Email invalide' }),
    password: z.string().min(6, { message: 'Mot de passe trop court' }),
    confirmPassword: z.string().min(6)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe doivent correspondre',
    path: ['confirmPassword']
  });

type FormData = z.infer<typeof schema>;

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const setUser = useAuthStore((s) => s.setUser);
  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();
  const onSubmit = async (data: FormData) => {
    try {
      const { firstName, lastName, email, password } = data;
      const res = await authApi.register({ firstName, lastName, email, password });
      setToken(res.token);
      setUser(res.user);
      navigate('/dashboard');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erreur de création de compte');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
          <input type="text" {...register('firstName')} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input type="text" {...register('lastName')} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" {...register('email')} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
        <input type="password" {...register('password')} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmez le mot de passe</label>
        <input type="password" {...register('confirmPassword')} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
        {isSubmitting ? 'Création...' : 'Créer un compte'}
      </Button>
    </form>
  );
};

export default RegisterForm;
