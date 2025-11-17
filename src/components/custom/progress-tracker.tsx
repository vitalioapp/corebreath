'use client';

import { Award, TrendingUp } from 'lucide-react';

interface ProgressTrackerProps {
  totalLessons: number;
  completedLessons: number;
}

export function ProgressTracker({ totalLessons, completedLessons }: ProgressTrackerProps) {
  const progressPercentage = (completedLessons / totalLessons) * 100;
  const remainingLessons = totalLessons - completedLessons;

  return (
    <div className="bg-gradient-to-br from-[#1DBAEE] to-[#94C3EA] rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-1">Seu Progresso</h3>
          <p className="text-white/90 text-sm">Continue sua jornada de transformação respiratória</p>
        </div>
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
          <Award className="w-8 h-8" />
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="text-3xl font-bold mb-1">{completedLessons}</div>
          <div className="text-xs text-white/80">Aulas Concluídas</div>
        </div>
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="text-3xl font-bold mb-1">{remainingLessons}</div>
          <div className="text-xs text-white/80">Aulas Restantes</div>
        </div>
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="text-3xl font-bold mb-1">{Math.round(progressPercentage)}%</div>
          <div className="text-xs text-white/80">Completo</div>
        </div>
      </div>

      {/* Barra de Progresso */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Progresso Total</span>
          <span className="font-bold">{completedLessons}/{totalLessons}</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-white rounded-full h-3 transition-all duration-500 flex items-center justify-end pr-2"
            style={{ width: `${progressPercentage}%` }}
          >
            {progressPercentage > 10 && (
              <TrendingUp className="w-3 h-3" />
            )}
          </div>
        </div>
      </div>

      {/* Mensagem Motivacional */}
      {progressPercentage > 0 && (
        <div className="mt-6 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-sm font-medium">
            {progressPercentage < 25 && "🌱 Ótimo começo! Continue respirando melhor a cada dia."}
            {progressPercentage >= 25 && progressPercentage < 50 && "💪 Você está evoluindo! Seus pulmões agradecem."}
            {progressPercentage >= 50 && progressPercentage < 75 && "🔥 Incrível! Você já está na metade da jornada."}
            {progressPercentage >= 75 && progressPercentage < 100 && "⭐ Quase lá! A transformação está completa."}
            {progressPercentage === 100 && "🏆 Parabéns! Você dominou o treinamento respiratório!"}
          </p>
        </div>
      )}
    </div>
  );
}
