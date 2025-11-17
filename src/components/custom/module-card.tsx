'use client';

import { Play, CheckCircle2, Lock } from 'lucide-react';
import { Module } from '@/lib/data';

interface ModuleCardProps {
  module: Module;
  onSelectLesson: (moduleId: string, lessonId: string) => void;
}

export function ModuleCard({ module, onSelectLesson }: ModuleCardProps) {
  const completedLessons = module.lessons.filter(l => l.completed).length;
  const totalLessons = module.lessons.length;
  const progressPercentage = (completedLessons / totalLessons) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
      {/* Header do Módulo */}
      <div className="bg-gradient-to-r from-[#1DBAEE] to-[#94C3EA] p-6">
        <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
        <p className="text-white/90 text-sm">{module.description}</p>
        
        {/* Barra de Progresso */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-white/90 mb-2">
            <span>{completedLessons} de {totalLessons} aulas concluídas</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lista de Aulas */}
      <div className="p-4">
        {module.lessons.map((lesson, index) => {
          const isLocked = index > 0 && !module.lessons[index - 1].completed;
          
          return (
            <button
              key={lesson.id}
              onClick={() => !isLocked && onSelectLesson(module.id, lesson.id)}
              disabled={isLocked}
              className={`w-full flex items-center gap-4 p-4 rounded-xl mb-2 transition-all duration-200 ${
                isLocked 
                  ? 'bg-gray-50 cursor-not-allowed opacity-60' 
                  : lesson.completed
                  ? 'bg-green-50 hover:bg-green-100'
                  : 'bg-gray-50 hover:bg-[#1DBAEE]/10 hover:shadow-md'
              }`}
            >
              {/* Ícone de Status */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                isLocked 
                  ? 'bg-gray-200' 
                  : lesson.completed
                  ? 'bg-green-500'
                  : 'bg-[#1DBAEE]'
              }`}>
                {isLocked ? (
                  <Lock className="w-5 h-5 text-gray-500" />
                ) : lesson.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Informações da Aula */}
              <div className="flex-1 text-left">
                <h4 className={`font-semibold text-sm mb-1 ${
                  isLocked ? 'text-gray-400' : 'text-gray-800'
                }`}>
                  {lesson.title}
                </h4>
                <p className={`text-xs ${
                  isLocked ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {lesson.description}
                </p>
              </div>

              {/* Duração */}
              <div className={`flex-shrink-0 text-xs font-medium ${
                isLocked ? 'text-gray-400' : 'text-[#18375D]'
              }`}>
                {lesson.duration}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
