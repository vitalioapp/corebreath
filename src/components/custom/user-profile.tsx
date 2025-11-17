'use client';

import { useState, useEffect } from 'react';
import { User as UserIcon, LogOut, Calendar, TrendingUp, Award, Settings } from 'lucide-react';
import { getCurrentUser, logout, type User } from '@/lib/auth';

interface UserProfileProps {
  onLogout: () => void;
  onClose: () => void;
}

export function UserProfile({ onLogout, onClose }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  if (!user) return null;

  const totalTests = user.testHistory.length;
  const avgScore = totalTests > 0
    ? Math.round(
        user.testHistory.reduce((acc, test) => acc + (test.score / test.maxScore) * 100, 0) / totalTests
      )
    : 0;

  const recentTests = user.testHistory.slice(0, 5);

  const getTestTypeName = (type: string) => {
    const names: Record<string, string> = {
      blow: 'Sopro',
      inspiration: 'Inspiração',
      expiration: 'Expiração',
      capacity: 'Capacidade'
    };
    return names[type] || type;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1DBAEE] to-[#94C3EA] p-6 sm:p-8 rounded-t-3xl">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <UserIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">{user.name}</h2>
                <p className="text-white/90 text-sm sm:text-base">{user.email}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl font-bold"
            >
              ×
            </button>
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Membro desde {new Date(user.createdAt).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 p-6">
          <div className="bg-gradient-to-br from-[#1DBAEE]/10 to-[#94C3EA]/10 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#1DBAEE]/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#1DBAEE]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#18375D]">{totalTests}</p>
                <p className="text-xs text-gray-600">Testes realizados</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#7E92CA]/10 to-[#94C3EA]/10 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#7E92CA]/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-[#7E92CA]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#18375D]">{avgScore}%</p>
                <p className="text-xs text-gray-600">Média de desempenho</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tests */}
        <div className="px-6 pb-6">
          <h3 className="text-lg font-bold text-[#18375D] mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Testes Recentes
          </h3>
          
          {recentTests.length > 0 ? (
            <div className="space-y-3">
              {recentTests.map((test) => (
                <div
                  key={test.id}
                  className="bg-gray-50 rounded-xl p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-[#18375D]">
                      {getTestTypeName(test.testType)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(test.date).toLocaleDateString('pt-BR')} às{' '}
                      {new Date(test.date).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#1DBAEE]">
                      {Math.round((test.score / test.maxScore) * 100)}%
                    </p>
                    <p className="text-xs text-gray-500">{test.duration}s</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhum teste realizado ainda</p>
              <p className="text-sm mt-2">Comece fazendo um teste respiratório!</p>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={() => {
              logout();
              onLogout();
            }}
            className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
}
