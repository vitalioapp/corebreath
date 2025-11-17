'use client';

import { useState, useEffect } from 'react';
import { Wind, BookOpen, Download, Gift, Menu, X, User as UserIcon, TestTube, Heart } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-white to-[#94C3EA]/10">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#1DBAEE] to-[#94C3EA] flex items-center justify-center shadow-lg">
                <Wind className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#18375D]">VITALIO</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Treinamento Respiratório</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => setActiveTab('training')}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 text-sm ${
                  activeTab === 'training'
                    ? 'bg-gradient-to-r from-[#1DBAEE] to-[#94C3EA] text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Treinamento
              </button>
              <button
                onClick={() => setActiveTab('tests')}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 text-sm ${
                  activeTab === 'tests'
                    ? 'bg-gradient-to-r from-[#1DBAEE] to-[#94C3EA] text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Testes
              </button>
              <button
                onClick={() => setActiveTab('exercises')}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 text-sm ${
                  activeTab === 'exercises'
                    ? 'bg-gradient-to-r from-[#1DBAEE] to-[#94C3EA] text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Exercícios
              </button>
              <button
                onClick={() => setActiveTab('bonuses')}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 text-sm ${
                  activeTab === 'bonuses'
                    ? 'bg-gradient-to-r from-[#1DBAEE] to-[#94C3EA] text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Bônus
              </button>
              <button
                onClick={() => setShowProfile(true)}
                className="ml-2 p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all duration-200"
              >
                <UserIcon className="w-6 h-6" />
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top duration-200">
              <button
                onClick={() => {
                  setActiveTab('training');
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-xl font-semibold mb-2 transition-all duration-200 ${
                  activeTab === 'training'
                    ? 'bg-gradient-to-r from-[#1DBAEE] to-[#94C3EA] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Treinamento
              </button>
              <button
                onClick={() => {
                  setActiveTab('tests');
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-xl font-semibold mb-2 transition-all duration-200 ${
                  activeTab === 'tests'
                    ? 'bg-gradient-to-r from-[#1DBAEE] to-[#94C3EA] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Testes Respiratórios
              </button>
              <button
                onClick={() => {
                  setActiveTab('exercises');
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-xl font-semibold mb-2 transition-all duration-200 ${
                  activeTab === 'exercises'
                    ? 'bg-gradient-to-r from-[#1DBAEE] to-[#94C3EA] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Exercícios Guiados
              </button>
              <button
                onClick={() => {
                  setActiveTab('bonuses');
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-xl font-semibold mb-2 transition-all duration-200 ${
                  activeTab === 'bonuses'
                    ? 'bg-gradient-to-r from-[#1DBAEE] to-[#94C3EA] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Bônus
              </button>
              <button
                onClick={() => {
                  setShowProfile(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2"
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

            {/* Welcome Message */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#18375D] mb-3">
                Bem-vindo ao Seu Treinamento Respiratório
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
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

        {activeTab === 'tests' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Tests Header */}
            <div className="bg-gradient-to-r from-[#1DBAEE] to-[#94C3EA] rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <TestTube className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-1">Testes Respiratórios</h2>
                  <p className="text-white/90 text-sm sm:text-base">
                    Avalie seu desempenho e acompanhe sua evolução
                  </p>
                </div>
              </div>
            </div>

            {/* Test Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button
                onClick={() => setShowBreathTest(true)}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 text-left"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1DBAEE] to-[#94C3EA] flex items-center justify-center mb-4">
                  <TestTube className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#18375D] mb-2">Testes Dinâmicos</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sopre objetos virtuais, teste sua capacidade de inspiração e expiração controlada
                </p>
              </button>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-dashed border-gray-300">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <Wind className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-400 mb-2">Mais testes em breve</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Novos testes serão adicionados regularmente
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exercises' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Exercises Header */}
            <div className="bg-gradient-to-r from-[#7E92CA] to-[#94C3EA] rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Heart className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-1">Exercícios Guiados</h2>
                  <p className="text-white/90 text-sm sm:text-base">
                    Pratique respiração consciente com instruções passo a passo
                  </p>
                </div>
              </div>
            </div>

            {/* Exercise Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button
                onClick={() => setShowBreathingExercise(true)}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 text-left"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7E92CA] to-[#94C3EA] flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#18375D] mb-2">Respiração Consciente</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Exercícios guiados para relaxamento, foco, energia e sono
                </p>
              </button>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-dashed border-gray-300">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <Wind className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-400 mb-2">Mais exercícios em breve</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Novos exercícios serão adicionados regularmente
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bonuses' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Bonuses Header */}
            <div className="bg-gradient-to-r from-[#7E92CA] to-[#94C3EA] rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Gift className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-1">Bônus Exclusivos</h2>
                  <p className="text-white/90 text-sm sm:text-base">
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
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1DBAEE] to-[#94C3EA] flex items-center justify-center flex-shrink-0">
                      {bonus.type === 'ebook' && <BookOpen className="w-6 h-6 text-white" />}
                      {bonus.type === 'audio' && <Wind className="w-6 h-6 text-white" />}
                      {bonus.type === 'checklist' && <Download className="w-6 h-6 text-white" />}
                    </div>
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-[#1DBAEE]/10 text-[#1DBAEE] text-xs font-semibold rounded-full mb-2">
                        {bonus.type === 'ebook' && 'E-book'}
                        {bonus.type === 'audio' && 'Áudio'}
                        {bonus.type === 'checklist' && 'Checklist'}
                      </span>
                      <h3 className="font-bold text-[#18375D] text-sm sm:text-base mb-2 leading-tight">
                        {bonus.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed">
                    {bonus.description}
                  </p>
                  <button className="w-full bg-gradient-to-r from-[#1DBAEE] to-[#94C3EA] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2">
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
      <footer className="bg-[#18375D] text-white mt-12 sm:mt-20 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1DBAEE] to-[#94C3EA] flex items-center justify-center">
              <Wind className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">VITALIO</h3>
          </div>
          <p className="text-white/80 text-sm sm:text-base mb-2">
            Transformando vidas através da respiração correta
          </p>
          <p className="text-white/60 text-xs sm:text-sm">
            © 2024 Vitalio. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
