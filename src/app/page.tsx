'use client';

import { useState, useEffect } from 'react';
import { Wind, BookOpen, Download, Gift, Menu, X, User as UserIcon, TestTube, Heart, Flame, Timer, TrendingUp, Zap, Target, Activity, Sparkles, Brain } from 'lucide-react';
import { modules, bonuses } from '@/lib/data';
import { ModuleCard } from '@/components/custom/module-card';
import { VideoPlayer } from '@/components/custom/video-player';
import { ProgressTracker } from '@/components/custom/progress-tracker';
import { LoginForm } from '@/components/custom/login-form';
import { UserProfile } from '@/components/custom/user-profile';
import { BreathTest } from '@/components/custom/breath-test';
import { BreathingExercise } from '@/components/custom/breathing-exercise';
import { getCurrentUser } from '@/lib/auth';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'training' | 'bonuses' | 'tests' | 'exercises'>('training');
  const [selectedLesson, setSelectedLesson] = useState<{ moduleId: string; lessonId: string } | null>(null);
  const [moduleData, setModuleData] = useState(modules);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showBreathTest, setShowBreathTest] = useState(false);
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setIsAuthenticated(!!user);
  }, []);

  // Calcular progresso total
  const totalLessons = moduleData.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = moduleData.reduce(
    (acc, module) => acc + module.lessons.filter(l => l.completed).length,
    0
  );

  const handleSelectLesson = (moduleId: string, lessonId: string) => {
    setSelectedLesson({ moduleId, lessonId });
  };

  const handleCompleteLesson = () => {
    if (!selectedLesson) return;

    setModuleData(prevModules =>
      prevModules.map(module => {
        if (module.id === selectedLesson.moduleId) {
          return {
            ...module,
            lessons: module.lessons.map(lesson =>
              lesson.id === selectedLesson.lessonId
                ? { ...lesson, completed: true }
                : lesson
            )
          };
        }
        return module;
      })
    );
  };

  const currentLesson = selectedLesson
    ? moduleData
        .find(m => m.id === selectedLesson.moduleId)
        ?.lessons.find(l => l.id === selectedLesson.lessonId)
    : null;

  if (!isAuthenticated) {
    return <LoginForm onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                <Wind className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">VITALIO</h1>
                <p className="text-xs text-slate-400 hidden sm:block font-semibold">Treinamento Respiratório</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => setActiveTab('training')}
                className={`px-4 py-2 rounded-xl font-bold transition-all duration-200 text-sm ${
                  activeTab === 'training'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                Treinamento
              </button>
              <button
                onClick={() => setActiveTab('bonuses')}
                className={`px-4 py-2 rounded-xl font-bold transition-all duration-200 text-sm ${
                  activeTab === 'bonuses'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                Bônus
              </button>
              <button
                onClick={() => setShowProfile(true)}
                className="ml-2 p-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200"
              >
                <UserIcon className="w-6 h-6" />
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-slate-800 animate-in slide-in-from-top duration-200">
              <button
                onClick={() => {
                  setActiveTab('training');
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-xl font-bold mb-2 transition-all duration-200 ${
                  activeTab === 'training'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Treinamento
              </button>
              <button
                onClick={() => {
                  setActiveTab('bonuses');
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-xl font-bold mb-2 transition-all duration-200 ${
                  activeTab === 'bonuses'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Bônus
              </button>
              <button
                onClick={() => {
                  setShowProfile(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-3 rounded-xl font-bold text-slate-300 hover:bg-slate-800 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <UserIcon className="w-5 h-5" />
                Meu Perfil
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {activeTab === 'training' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Progress Tracker */}
            <ProgressTracker totalLessons={totalLessons} completedLessons={completedLessons} />

            {/* Hero Section - Testes e Exercícios em Destaque */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card de Testes Dinâmicos */}
              <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 p-8 shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32 group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform duration-300">
                      <div className="relative">
                        <Flame className="w-11 h-11 text-white animate-pulse" />
                        <div className="absolute inset-0 blur-xl bg-orange-300 opacity-50" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white mb-1 tracking-tight">Testes Dinâmicos</h3>
                      <p className="text-white/90 text-base font-bold">Avalie seu desempenho</p>
                    </div>
                  </div>
                  
                  <p className="text-white/95 mb-6 leading-relaxed text-lg font-medium">
                    Teste sua capacidade de inspiração e expiração controlada com feedback em tempo real.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-sm font-black text-white shadow-lg">
                      🔥 Teste de Sopro
                    </span>
                    <span className="px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-sm font-black text-white shadow-lg">
                      💨 Inspiração
                    </span>
                    <span className="px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-sm font-black text-white shadow-lg">
                      ⏱️ Expiração
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setShowBreathTest(true)}
                    className="w-full bg-white text-orange-600 py-5 rounded-2xl font-black text-xl hover:bg-orange-50 transition-all duration-300 shadow-2xl hover:shadow-white/50 flex items-center justify-center gap-3 group/btn hover:scale-105"
                  >
                    <TestTube className="w-7 h-7 group-hover/btn:rotate-12 transition-transform" />
                    Iniciar Testes Agora
                    <Zap className="w-6 h-6 group-hover/btn:scale-125 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Card de Exercícios Guiados */}
              <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-8 shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-32 -translate-x-32 group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:-rotate-6 transition-transform duration-300">
                      <div className="relative">
                        <Heart className="w-11 h-11 text-white animate-pulse" />
                        <div className="absolute inset-0 blur-xl bg-purple-300 opacity-50" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white mb-1 tracking-tight">Exercícios Guiados</h3>
                      <p className="text-white/90 text-base font-bold">Pratique respiração consciente</p>
                    </div>
                  </div>
                  
                  <p className="text-white/95 mb-6 leading-relaxed text-lg font-medium">
                    Exercícios passo a passo para relaxamento, foco, energia e sono com instruções visuais e sonoras.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-sm font-black text-white shadow-lg">
                      😌 Relaxamento
                    </span>
                    <span className="px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-sm font-black text-white shadow-lg">
                      🎯 Foco
                    </span>
                    <span className="px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-sm font-black text-white shadow-lg">
                      ⚡ Energia
                    </span>
                    <span className="px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-sm font-black text-white shadow-lg">
                      😴 Sono
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setShowBreathingExercise(true)}
                    className="w-full bg-white text-purple-600 py-5 rounded-2xl font-black text-xl hover:bg-purple-50 transition-all duration-300 shadow-2xl hover:shadow-white/50 flex items-center justify-center gap-3 group/btn hover:scale-105"
                  >
                    <Activity className="w-7 h-7 group-hover/btn:scale-110 transition-transform" />
                    Começar Exercícios
                    <Target className="w-6 h-6 group-hover/btn:rotate-90 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Access Cards - Mais Opções */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => setShowBreathTest(true)}
                className="relative group overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-orange-500/30 hover:border-orange-500 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-orange-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-xl shadow-orange-500/50">
                    <Flame className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-white font-black text-sm mb-1">Teste de Sopro</h4>
                  <p className="text-slate-400 text-xs">Apague a vela</p>
                </div>
              </button>

              <button
                onClick={() => setShowBreathingExercise(true)}
                className="relative group overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-purple-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-500/50">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-white font-black text-sm mb-1">Relaxamento</h4>
                  <p className="text-slate-400 text-xs">Reduza o estresse</p>
                </div>
              </button>

              <button
                onClick={() => setShowBreathingExercise(true)}
                className="relative group overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-cyan-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/50">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-white font-black text-sm mb-1">Energia</h4>
                  <p className="text-slate-400 text-xs">Aumente disposição</p>
                </div>
              </button>

              <button
                onClick={() => setShowBreathingExercise(true)}
                className="relative group overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-indigo-500/30 hover:border-indigo-500 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-indigo-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/50">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-white font-black text-sm mb-1">Sono Profundo</h4>
                  <p className="text-slate-400 text-xs">Durma melhor</p>
                </div>
              </button>
            </div>

            {/* Welcome Message */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800">
              <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-3">
                Bem-vindo ao Seu Treinamento Respiratório
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Este é um programa completo e estruturado que vai do básico ao avançado, 
                ensinando você a respirar da forma correta, recuperando a mecânica ventilatória 
                ideal e reequilibrando todo o sistema respiratório. Cada módulo foi cuidadosamente 
                desenvolvido para garantir resultados reais e perceptíveis.
              </p>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {moduleData.map(module => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  onSelectLesson={handleSelectLesson}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bonuses' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Bonuses Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-48 -translate-x-48" />
              
              <div className="relative z-10 flex items-center gap-4 mb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                  <Gift className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-1">Bônus Exclusivos</h2>
                  <p className="text-white/90 text-sm sm:text-base font-semibold">
                    Materiais complementares para ampliar sua transformação
                  </p>
                </div>
              </div>
            </div>

            {/* Bonuses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {bonuses.map(bonus => (
                <div
                  key={bonus.id}
                  className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-slate-800 hover:border-cyan-500 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-xl shadow-cyan-500/50">
                      {bonus.type === 'ebook' && <BookOpen className="w-6 h-6 text-white" />}
                      {bonus.type === 'audio' && <Wind className="w-6 h-6 text-white" />}
                      {bonus.type === 'checklist' && <Download className="w-6 h-6 text-white" />}
                    </div>
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-full mb-2">
                        {bonus.type === 'ebook' && 'E-book'}
                        {bonus.type === 'audio' && 'Áudio'}
                        {bonus.type === 'checklist' && 'Checklist'}
                      </span>
                      <h3 className="font-black text-white text-sm sm:text-base mb-2 leading-tight">
                        {bonus.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed">
                    {bonus.description}
                  </p>
                  <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Baixar Agora
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Video Player Modal */}
      {currentLesson && (
        <VideoPlayer
          lesson={currentLesson}
          onClose={() => setSelectedLesson(null)}
          onComplete={handleCompleteLesson}
        />
      )}

      {/* User Profile Modal */}
      {showProfile && (
        <UserProfile
          onLogout={() => {
            setIsAuthenticated(false);
            setShowProfile(false);
          }}
          onClose={() => setShowProfile(false)}
        />
      )}

      {/* Breath Test Modal */}
      {showBreathTest && (
        <BreathTest onClose={() => setShowBreathTest(false)} />
      )}

      {/* Breathing Exercise Modal */}
      {showBreathingExercise && (
        <BreathingExercise onClose={() => setShowBreathingExercise(false)} />
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-white mt-12 sm:mt-20 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-xl shadow-cyan-500/50">
              <Wind className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">VITALIO</h3>
          </div>
          <p className="text-slate-400 text-sm sm:text-base mb-2 font-semibold">
            Transformando vidas através da respiração correta
          </p>
          <p className="text-slate-600 text-xs sm:text-sm">
            © 2024 Vitalio. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
