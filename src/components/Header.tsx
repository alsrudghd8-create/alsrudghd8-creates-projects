import React from 'react';
import { BookOpen, GraduationCap, MapPin, Printer, RotateCcw, Download } from 'lucide-react';
import { AppMode } from '../types';

interface HeaderProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
  onPrint: (withAnswers: boolean) => void;
  onExport: () => void;
  onResetAll: () => void;
  answeredCount: number;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onModeChange,
  onPrint,
  onExport,
  onResetAll,
  answeredCount,
  totalCount,
}) => {
  const percent = Math.round((answeredCount / totalCount) * 100);

  return (
    <header className="bg-[#18233C] text-stone-100 shadow-xl sticky top-0 z-50 border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between sm:h-20 py-3 sm:py-0 gap-3 items-center">
          
          {/* Logo & Main Title */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group select-none"
            onClick={() => onModeChange('workbook')}
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#18233C] text-2xl font-bold font-batang border-2 border-amber-200 shadow-md group-hover:scale-105 transition-transform shrink-0">
              百
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-batang tracking-wide text-amber-100 group-hover:text-amber-200 transition-colors">
                  백제 역사 탐구 워크북
                </h1>
                <span className="hidden md:inline-block px-2 py-0.5 text-[11px] font-semibold bg-amber-500/20 text-amber-300 rounded border border-amber-400/30">
                  삼국사기·삼국유사 기반
                </span>
              </div>
              <p className="text-xs text-amber-300/80 hidden sm:block">
                의자왕·대야성·나당동맹·백제 멸망을 직접 쓰고 탐구하는 자기주도 학습관
              </p>
            </div>
          </div>

          {/* Navigation Mode Switcher & Tools */}
          <div className="flex items-center flex-wrap justify-center gap-1.5 sm:gap-2">
            
            {/* Mode Switcher Buttons */}
            <div className="flex bg-[#0f172a] p-1 rounded-xl border border-stone-700/60 shadow-inner">
              <button
                type="button"
                onClick={() => onModeChange('workbook')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
                  currentMode === 'workbook'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-[#18233C] font-bold shadow-md'
                    : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>서술형 워크북</span>
              </button>

              <button
                type="button"
                onClick={() => onModeChange('quiz')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
                  currentMode === 'quiz'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-[#18233C] font-bold shadow-md'
                    : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>객관식 테스트</span>
              </button>

              <button
                type="button"
                onClick={() => onModeChange('timeline')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
                  currentMode === 'timeline'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-[#18233C] font-bold shadow-md'
                    : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">연표·지도</span>
                <span className="sm:hidden">연표</span>
              </button>
            </div>

            {/* Utility Actions */}
            <div className="flex items-center gap-1.5 no-print">
              <button
                type="button"
                onClick={onExport}
                title="작성한 답안 텍스트 파일로 내보내기"
                className="p-2 sm:px-3 sm:py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-200 border border-stone-700 text-xs sm:text-sm transition-colors flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                <span className="hidden lg:inline">내보내기</span>
              </button>

              <div className="relative group">
                <button
                  type="button"
                  onClick={() => onPrint(false)}
                  title="학습지 인쇄 (클릭: 학생용 빈칸, 우측 화살표: 옵션)"
                  className="p-2 sm:px-3 sm:py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-200 border border-stone-700 text-xs sm:text-sm transition-colors flex items-center gap-1"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span className="hidden md:inline">인쇄/PDF</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
