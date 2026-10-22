import React, { useState, useEffect } from 'react';
import { HISTORICAL_DATA } from './data/historicalData';
import { AppMode } from './types';
import { Header } from './components/Header';
import { WorkbookView } from './components/WorkbookView';
import { QuizView } from './components/QuizView';
import { TimelineMapView } from './components/TimelineMapView';
import { PrintExportModal } from './components/PrintExportModal';

export default function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('workbook');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [printModeAnswers, setPrintModeAnswers] = useState<boolean>(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  // Load answers from localStorage on mount
  useEffect(() => {
    const loaded: Record<string, string> = {};
    HISTORICAL_DATA.forEach(q => {
      const saved = localStorage.getItem(`baekje_ans_${q.id}`);
      if (saved !== null) {
        loaded[q.id] = saved;
      }
    });
    setUserAnswers(loaded);
  }, []);

  const handleAnswerChange = (id: string, text: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [id]: text,
    }));
    try {
      localStorage.setItem(`baekje_ans_${id}`, text);
    } catch {
      // localStorage error fallback
    }
  };

  const handleClearAllAnswers = () => {
    if (window.confirm('작성하신 모든 서술형 답안을 삭제하고 초기화하시겠습니까? (복구할 수 없습니다)')) {
      HISTORICAL_DATA.forEach(q => {
        try {
          localStorage.removeItem(`baekje_ans_${q.id}`);
        } catch {
          // ignore
        }
      });
      setUserAnswers({});
    }
  };

  const handleTriggerPrint = (withAnswers: boolean) => {
    setPrintModeAnswers(withAnswers);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  const answeredCount = HISTORICAL_DATA.filter(q => (userAnswers[q.id] || '').trim().length > 0).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F3EC] text-stone-900 selection:bg-amber-200">
      
      {/* Printable Title Header */}
      <div className="hidden print:block text-center py-6 border-b-2 border-stone-800 mb-6">
        <h1 className="text-2xl font-bold font-batang">
          백제 역사 탐구 워크북 {printModeAnswers ? '(교사용 정답 및 해설)' : '(학생용 서술형 학습지)'}
        </h1>
        <p className="text-xs text-stone-600 mt-1">
          의자왕과 삼국의 긴장 · 대야성 전투와 김춘추 · 십자 외교와 나당 동맹 · 백제 멸망
        </p>
        <div className="flex justify-between text-xs text-stone-600 mt-4 px-2">
          <span>학년 / 반: ______________</span>
          <span>이름: ______________</span>
          <span>출력 일시: {new Date().toLocaleDateString('ko-KR')}</span>
        </div>
      </div>

      {/* Main App Header */}
      <Header
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        onPrint={() => setIsPrintModalOpen(true)}
        onExport={() => setIsPrintModalOpen(true)}
        onResetAll={handleClearAllAnswers}
        answeredCount={answeredCount}
        totalCount={HISTORICAL_DATA.length}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentMode === 'workbook' && (
          <WorkbookView
            questions={HISTORICAL_DATA}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            onClearAllAnswers={handleClearAllAnswers}
            printModeAnswers={printModeAnswers}
          />
        )}

        {currentMode === 'quiz' && (
          <QuizView
            questions={HISTORICAL_DATA}
            onSwitchToWorkbook={() => setCurrentMode('workbook')}
          />
        )}

        {currentMode === 'timeline' && (
          <TimelineMapView />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#18233C] text-stone-300 text-xs py-8 sm:py-10 border-t border-amber-900/40 no-print mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-batang font-bold text-xs border border-amber-400/30">
              百
            </div>
            <p className="font-batang text-sm text-amber-100 font-bold">
              백제 역사 탐구 및 자기주도 학습관
            </p>
          </div>
          <p className="text-stone-400 max-w-2xl mx-auto leading-relaxed text-[11px] sm:text-xs">
            《삼국사기(三國史記)》 백제본기·신라본기 및 《삼국유사(三國遺事)》 기이편의 정사(正史) 사료를 바탕으로 구성되었습니다.
            직접 서술형 답안을 작성하고 모범 답안과 비교함으로써 고대 동아시아 국제 정세와 백제의 흥망을 깊이 있게 이해할 수 있습니다.
          </p>
          <div className="pt-2 text-stone-500 text-[10px]">
            브라우저 로컬 저장소(localStorage) 자동 저장 지원 · A4 학습지 인쇄 및 PDF 저장 지원
          </div>
        </div>
      </footer>

      {/* Print and Export Modal */}
      <PrintExportModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        questions={HISTORICAL_DATA}
        userAnswers={userAnswers}
        onTriggerPrint={handleTriggerPrint}
      />

    </div>
  );
}
