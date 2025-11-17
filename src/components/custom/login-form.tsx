'use client';

import { useState } from 'react';
import { Wind, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { login, register } from '@/lib/auth';

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const user = login(email, password);
      if (user) {
        onSuccess();
      } else {
        setError('Email ou senha incorretos');
      }
    } else {
      if (!name || !email || !password) {
        setError('Preencha todos os campos');
        return;
      }
      register(name, email, password);
      onSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1DBAEE] via-[#94C3EA] to-[#7E92CA] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-2xl mb-4">
            <Wind className="w-10 h-10 text-[#1DBAEE]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">VITALIO</h1>
          <p className="text-white/90 text-lg">Treinamento Respiratório</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#18375D] mb-2">
              {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
            </h2>
            <p className="text-gray-600">
              {isLogin
                ? 'Entre para continuar seu treinamento'
                : 'Comece sua jornada respiratória'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome completo
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1DBAEE] focus:outline-none transition-colors"
                    placeholder="Seu nome"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1DBAEE] focus:outline-none transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1DBAEE] focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1DBAEE] to-[#94C3EA] text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
            >
              {isLogin ? 'Entrar' : 'Criar conta'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-[#1DBAEE] font-semibold hover:underline"
            >
              {isLogin
                ? 'Não tem conta? Cadastre-se'
                : 'Já tem conta? Faça login'}
            </button>
          </div>
        </div>

        <p className="text-center text-white/80 text-sm mt-6">
          Transforme sua respiração, transforme sua vida
        </p>
      </div>
    </div>
  );
}
