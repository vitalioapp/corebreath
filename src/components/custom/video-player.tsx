'use client';

import { X, CheckCircle2 } from 'lucide-react';
import { Lesson } from '@/lib/data';

interface VideoPlayerProps {
  lesson: Lesson;
  onClose: () => void;
  onComplete: () => void;
}

export function VideoPlayer({ lesson, onClose, onComplete }: VideoPlayerProps) {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1DBAEE] to-[#94C3EA] p-6 flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">{lesson.title}</h2>
            <p className="text-white/90 text-sm">{lesson.description}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative bg-black aspect-video">
          {/* Placeholder para o vídeo - substitua com seu player real */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#1DBAEE] flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-white text-lg">Vídeo: {lesson.title}</p>
              <p className="text-white/70 text-sm mt-2">Duração: {lesson.duration}</p>
              <p className="text-white/50 text-xs mt-4">
                Integre aqui seu player de vídeo (Vimeo, YouTube, etc)
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {lesson.completed && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Aula concluída</span>
                </div>
              )}
            </div>
            
            <button
              onClick={onComplete}
              disabled={lesson.completed}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                lesson.completed
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#1DBAEE] to-[#94C3EA] text-white hover:shadow-lg hover:scale-105'
              }`}
            >
              {lesson.completed ? 'Aula Concluída' : 'Marcar como Concluída'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
