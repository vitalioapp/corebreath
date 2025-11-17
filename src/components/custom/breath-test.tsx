'use client';

import { useState, useEffect, useRef } from 'react';
import { Wind, Flame, Timer, TrendingUp, RotateCcw, CheckCircle, Mic, MicOff, AlertCircle } from 'lucide-react';
import { addTestResult } from '@/lib/auth';

interface BreathTestProps {
  onClose: () => void;
}

export function BreathTest({ onClose }: BreathTestProps) {
  const [testType, setTestType] = useState<'blow' | 'inspiration' | 'expiration' | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [result, setResult] = useState<number | null>(null);
  const [candleFlame, setCandleFlame] = useState(100);
  const [balloonSize, setBalloonSize] = useState(0);
  const [micPermissionDenied, setMicPermissionDenied] = useState(false);
  const [showPermissionHelp, setShowPermissionHelp] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      stopTest();
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      
      setMicPermissionDenied(false);
      return true;
    } catch (error: any) {
      // Tratamento silencioso - não loga erro no console
      setMicPermissionDenied(true);
      setShowPermissionHelp(true);
      return false;
    }
  };

  const getAudioLevel = (): number => {
    if (!analyserRef.current) return 0;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    return Math.min(100, (average / 128) * 100);
  };

  const startTest = async (type: 'blow' | 'inspiration' | 'expiration') => {
    const micReady = await startMicrophone();
    if (!micReady) {
      return; // Não inicia o teste, apenas mostra a mensagem de ajuda
    }

    setTestType(type);
    setIsActive(true);
    setProgress(0);
    setDuration(0);
    setResult(null);
    setCandleFlame(100);
    setBalloonSize(0);

    let startTime = Date.now();
    let maxLevel = 0;

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setDuration(elapsed);

      const level = getAudioLevel();
      maxLevel = Math.max(maxLevel, level);

      if (type === 'blow') {
        setCandleFlame(Math.max(0, 100 - level * 2));
        setProgress(Math.min(100, level * 1.5));
      } else if (type === 'inspiration') {
        setBalloonSize(Math.min(100, level * 1.2));
        setProgress(Math.min(100, level * 1.2));
      } else if (type === 'expiration') {
        setProgress(Math.min(100, (elapsed / 10) * 100));
      }

      if (elapsed >= 10) {
        stopTest();
        const score = type === 'expiration' ? elapsed : maxLevel;
        setResult(score);
        
        addTestResult({
          id: Date.now().toString(),
          testType: type,
          score: Math.round(score),
          maxScore: type === 'expiration' ? 10 : 100,
          date: new Date().toISOString(),
          duration: Math.round(elapsed)
        });
      }
    }, 100);
  };

  const stopTest = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsActive(false);
    
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
  };

  const resetTest = () => {
    stopTest();
    setTestType(null);
    setProgress(0);
    setDuration(0);
    setResult(null);
    setCandleFlame(100);
    setBalloonSize(0);
    setMicPermissionDenied(false);
    setShowPermissionHelp(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1DBAEE] to-[#94C3EA] p-6 sm:p-8 rounded-t-3xl">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Testes Respiratórios</h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-3xl font-bold"
            >
              ×
            </button>
          </div>
          <p className="text-white/90">Avalie seu desempenho respiratório</p>
        </div>

        <div className="p-6 sm:p-8">
          {/* Mensagem de Permissão do Microfone */}
          {showPermissionHelp && (
            <div className="mb-6 bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-orange-800 mb-2">
                    Permissão do Microfone Necessária
                  </h3>
                  <p className="text-orange-700 mb-3">
                    Para realizar os testes respiratórios, precisamos acessar seu microfone para capturar sua respiração.
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Como permitir:</p>
                    <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                      <li>Clique no ícone de cadeado ou informações ao lado da URL</li>
                      <li>Procure por "Microfone" nas permissões</li>
                      <li>Altere para "Permitir"</li>
                      <li>Recarregue a página e tente novamente</li>
                    </ol>
                  </div>
                  <button
                    onClick={() => setShowPermissionHelp(false)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Entendi
                  </button>
                </div>
              </div>
            </div>
          )}

          {!testType ? (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#18375D] mb-4">Escolha um teste:</h3>
              
              {/* Teste de Sopro */}
              <button
                onClick={() => startTest('blow')}
                className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white p-6 rounded-2xl hover:shadow-xl transition-all duration-200 hover:scale-105 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <Flame className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Teste de Sopro</h4>
                    <p className="text-white/90 text-sm">Sopre para apagar a vela virtual</p>
                  </div>
                </div>
              </button>

              {/* Teste de Inspiração */}
              <button
                onClick={() => startTest('inspiration')}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white p-6 rounded-2xl hover:shadow-xl transition-all duration-200 hover:scale-105 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <Wind className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Teste de Inspiração</h4>
                    <p className="text-white/90 text-sm">Inspire profundamente e encha o balão</p>
                  </div>
                </div>
              </button>

              {/* Teste de Expiração */}
              <button
                onClick={() => startTest('expiration')}
                className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white p-6 rounded-2xl hover:shadow-xl transition-all duration-200 hover:scale-105 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <Timer className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Teste de Expiração Controlada</h4>
                    <p className="text-white/90 text-sm">Expire lentamente pelo máximo de tempo</p>
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Visual do Teste */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 min-h-[300px] flex items-center justify-center">
                {testType === 'blow' && (
                  <div className="text-center">
                    <div className="relative inline-block">
                      <Flame
                        className="w-32 h-32 text-orange-500 transition-all duration-300"
                        style={{
                          opacity: candleFlame / 100,
                          transform: `scale(${candleFlame / 100}) translateY(${(100 - candleFlame) / 10}px)`
                        }}
                      />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-16 bg-gradient-to-t from-amber-800 to-amber-600 rounded-full" />
                    </div>
                    <p className="text-2xl font-bold text-gray-700 mt-4">
                      {candleFlame < 20 ? '🎉 Apagou!' : 'Sopre para apagar!'}
                    </p>
                  </div>
                )}

                {testType === 'inspiration' && (
                  <div className="text-center">
                    <div
                      className="w-32 h-32 rounded-full bg-gradient-to-br from-red-400 to-pink-500 transition-all duration-300 mx-auto"
                      style={{
                        transform: `scale(${0.5 + (balloonSize / 100) * 0.5})`
                      }}
                    />
                    <p className="text-2xl font-bold text-gray-700 mt-4">
                      {balloonSize > 80 ? '🎈 Balão cheio!' : 'Inspire profundamente!'}
                    </p>
                  </div>
                )}

                {testType === 'expiration' && (
                  <div className="text-center">
                    <Wind className="w-32 h-32 text-[#1DBAEE] mx-auto animate-pulse" />
                    <p className="text-2xl font-bold text-gray-700 mt-4">
                      Expire lentamente...
                    </p>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600">Progresso</span>
                  <span className="text-sm font-bold text-[#1DBAEE]">{Math.round(progress)}%</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#1DBAEE] to-[#94C3EA] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Timer */}
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-[#18375D]">
                <Timer className="w-6 h-6" />
                {duration.toFixed(1)}s
              </div>

              {/* Result */}
              {result !== null && (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-700 mb-2">Teste Concluído!</h3>
                  <p className="text-lg text-green-600">
                    Pontuação: {Math.round(result)}/{testType === 'expiration' ? '10' : '100'}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {result > 70 ? 'Excelente desempenho!' : result > 40 ? 'Bom trabalho!' : 'Continue praticando!'}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={resetTest}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Novo Teste
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-[#1DBAEE] to-[#94C3EA] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Concluir
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
