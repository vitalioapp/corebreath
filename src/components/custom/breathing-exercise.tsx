'use client';

import { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw, Heart, Brain, Sparkles } from 'lucide-react';

interface BreathingExerciseProps {
  onClose: () => void;
}

type ExerciseType = 'box' | 'calm' | 'energy' | 'sleep';

interface Exercise {
  id: ExerciseType;
  name: string;
  description: string;
  icon: typeof Wind;
  color: string;
  pattern: { phase: string; duration: number; instruction: string }[];
}

const exercises: Exercise[] = [
  {
    id: 'box',
    name: 'Respiração Quadrada',
    description: 'Técnica para equilíbrio e foco mental',
    icon: Wind,
    color: 'from-blue-400 to-cyan-500',
    pattern: [
      { phase: 'Inspire', duration: 4, instruction: 'Inspire profundamente pelo nariz' },
      { phase: 'Segure', duration: 4, instruction: 'Segure o ar nos pulmões' },
      { phase: 'Expire', duration: 4, instruction: 'Expire lentamente pela boca' },
      { phase: 'Segure', duration: 4, instruction: 'Mantenha os pulmões vazios' }
    ]
  },
  {
    id: 'calm',
    name: 'Respiração Calmante',
    description: 'Reduza ansiedade e estresse rapidamente',
    icon: Heart,
    color: 'from-purple-400 to-pink-500',
    pattern: [
      { phase: 'Inspire', duration: 4, instruction: 'Inspire suavemente pelo nariz' },
      { phase: 'Segure', duration: 7, instruction: 'Segure confortavelmente' },
      { phase: 'Expire', duration: 8, instruction: 'Expire lentamente, relaxando' }
    ]
  },
  {
    id: 'energy',
    name: 'Respiração Energizante',
    description: 'Aumente energia e disposição',
    icon: Sparkles,
    color: 'from-orange-400 to-red-500',
    pattern: [
      { phase: 'Inspire', duration: 2, instruction: 'Inspire rápido e profundo' },
      { phase: 'Expire', duration: 2, instruction: 'Expire com força' },
      { phase: 'Inspire', duration: 2, instruction: 'Inspire novamente' },
      { phase: 'Expire', duration: 2, instruction: 'Expire completamente' }
    ]
  },
  {
    id: 'sleep',
    name: 'Respiração para Dormir',
    description: 'Prepare-se para um sono profundo',
    icon: Brain,
    color: 'from-indigo-400 to-purple-500',
    pattern: [
      { phase: 'Inspire', duration: 4, instruction: 'Inspire calmamente' },
      { phase: 'Segure', duration: 4, instruction: 'Segure suavemente' },
      { phase: 'Expire', duration: 6, instruction: 'Expire devagar, relaxando' },
      { phase: 'Pausa', duration: 2, instruction: 'Pausa natural' }
    ]
  }
];

export function BreathingExercise({ onClose }: BreathingExerciseProps) {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (!isActive || !selectedExercise) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Próxima fase
      const nextIndex = (currentPhaseIndex + 1) % selectedExercise.pattern.length;
      setCurrentPhaseIndex(nextIndex);
      setTimeLeft(selectedExercise.pattern[nextIndex].duration);
      
      if (nextIndex === 0) {
        setCycleCount(cycleCount + 1);
      }
    }
  }, [isActive, timeLeft, currentPhaseIndex, selectedExercise, cycleCount]);

  const startExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setCurrentPhaseIndex(0);
    setTimeLeft(exercise.pattern[0].duration);
    setCycleCount(0);
    setIsActive(true);
  };

  const togglePause = () => {
    setIsActive(!isActive);
  };

  const resetExercise = () => {
    if (selectedExercise) {
      setCurrentPhaseIndex(0);
      setTimeLeft(selectedExercise.pattern[0].duration);
      setCycleCount(0);
      setIsActive(false);
    }
  };

  const backToMenu = () => {
    setSelectedExercise(null);
    setIsActive(false);
    setCycleCount(0);
  };

  const currentPhase = selectedExercise?.pattern[currentPhaseIndex];
  const progress = currentPhase ? ((currentPhase.duration - timeLeft) / currentPhase.duration) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1DBAEE] to-[#94C3EA] p-6 sm:p-8 rounded-t-3xl">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Respiração Consciente</h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-3xl font-bold"
            >
              ×
            </button>
          </div>
          <p className="text-white/90">Exercícios guiados para bem-estar</p>
        </div>

        <div className="p-6 sm:p-8">
          {!selectedExercise ? (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#18375D] mb-4">Escolha um exercício:</h3>
              
              {exercises.map((exercise) => {
                const Icon = exercise.icon;
                return (
                  <button
                    key={exercise.id}
                    onClick={() => startExercise(exercise)}
                    className={`w-full bg-gradient-to-r ${exercise.color} text-white p-6 rounded-2xl hover:shadow-xl transition-all duration-200 hover:scale-105 text-left`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-1">{exercise.name}</h4>
                        <p className="text-white/90 text-sm">{exercise.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Visual Circle */}
              <div className="relative flex items-center justify-center h-80">
                <div
                  className={`absolute w-64 h-64 rounded-full bg-gradient-to-br ${selectedExercise.color} transition-all duration-1000 ease-in-out`}
                  style={{
                    transform: `scale(${currentPhase?.phase === 'Inspire' ? 1.2 : currentPhase?.phase === 'Expire' ? 0.8 : 1})`,
                    opacity: 0.3
                  }}
                />
                <div
                  className={`absolute w-48 h-48 rounded-full bg-gradient-to-br ${selectedExercise.color} transition-all duration-1000 ease-in-out`}
                  style={{
                    transform: `scale(${currentPhase?.phase === 'Inspire' ? 1.2 : currentPhase?.phase === 'Expire' ? 0.8 : 1})`,
                    opacity: 0.5
                  }}
                />
                <div
                  className={`absolute w-32 h-32 rounded-full bg-gradient-to-br ${selectedExercise.color} transition-all duration-1000 ease-in-out flex items-center justify-center`}
                  style={{
                    transform: `scale(${currentPhase?.phase === 'Inspire' ? 1.2 : currentPhase?.phase === 'Expire' ? 0.8 : 1})`
                  }}
                >
                  <div className="text-center text-white">
                    <p className="text-4xl font-bold">{timeLeft}</p>
                    <p className="text-sm font-semibold mt-1">{currentPhase?.phase}</p>
                  </div>
                </div>
              </div>

              {/* Instruction */}
              <div className="text-center">
                <p className="text-2xl font-bold text-[#18375D] mb-2">
                  {currentPhase?.instruction}
                </p>
                <p className="text-gray-600">
                  Ciclo {cycleCount + 1} • Fase {currentPhaseIndex + 1} de {selectedExercise.pattern.length}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${selectedExercise.color} transition-all duration-300`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex gap-3">
                <button
                  onClick={backToMenu}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Voltar
                </button>
                <button
                  onClick={resetExercise}
                  className="px-6 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button
                  onClick={togglePause}
                  className={`flex-1 bg-gradient-to-r ${selectedExercise.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2`}
                >
                  {isActive ? (
                    <>
                      <Pause className="w-5 h-5" />
                      Pausar
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Iniciar
                    </>
                  )}
                </button>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <strong>Dica:</strong> Encontre uma posição confortável, relaxe os ombros e concentre-se apenas na sua respiração.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
