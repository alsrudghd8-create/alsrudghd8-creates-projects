import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Search, 
  RotateCcw, 
  Sparkles, 
  Filter, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  Bookmark
} from 'lucide-react';
import { QuestionItem, SectionId, FilterMode } from '../types';
import { SECTION_METADATA } from '../data/historicalData';
import { WorkbookCard } from './WorkbookCard';

interface WorkbookViewProps {
  questions: QuestionItem[];
  userAnswers: Record<string, string>;
  onAnswerChange: (id: string, text: string) => void;
  onClearAllAnswers: () => void;
  printModeAnswers: boolean;
}

export const WorkbookView: React.FC<WorkbookViewProps> = ({
  questions,
  userAnswers,
  onAnswerChange,
  onClearAllAnswers,
  printModeAnswers,
}) => {
  const [activeSection, setActiveSection] = useState<SectionId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [openSolutions, setOpenSolutions] = useState<Record<string, boolean>>({});

  const handleToggleSolution = (id: string) => {
    setOpenSolutions(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggleAllSolutions = (open: boolean) => {
    const nextState: Record<string, boolean> = {};
    questions.forEach(q => {
      nextState[q.id] = open;
    });
    setOpenSolutions(nextState);
  };

  // Filter questions based on section, status filter, and search
  const filteredQuestions = questions.filter(q => {
    // Section check
    if (activeSection !== 'all' && q.section !== activeSection) return false;

    // Filter mode check
    const ans = userAnswers[q.id] || '';
    const hasAnswer = ans.trim().length > 0;
    if (filterMode === 'answered' && !hasAnswer) return false;
    if (filterMode === 'unanswered' && hasAnswer) return false;

    // Search query check
    if (searchQuery.trim().length > 0) {
      const qTextMatch = q.qText.toLowerCase().includes(searchQuery.toLowerCase());
      const ansMatch = q.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const kwMatch = q.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      if (!qTextMatch && !ansMatch && !kwMatch) return false;
    }

    return true;
  });

  const totalAnswered = questions.filter(q => (userAnswers[q.id] || '').trim().length > 0).length;
  const progressPercent = Math.round((totalAnswered / questions.length) * 100);

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Auto-save & Progress */}
      <div className="no-print bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Progress Tracker */}
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="font-bold text-stone-800 flex items-center gap-1.5 font-batang">
              <Bookmark className="w-4 h-4 text-amber-600" />
              학습 서술 진행도
            </span>
            <span className="font-semibold text-stone-700">
              <strong className="text-amber-700 font-bold text-base">{totalAnswered}</strong> / {questions.length} 문항 ({progressPercent}%)
            </span>
          </div>

          <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden border border-stone-200">
            <div 
              className="bg-gradient-to-r from-amber-500 to-amber-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          
          <p className="text-[11px] text-stone-500">
            입력한 답안은 브라우저에 실시간 자동 보관됩니다. 생각이 나지 않는 문항은 사료 돋보기를 먼저 읽어보세요!
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          <button
            type="button"
            onClick={onClearAllAnswers}
            className="px-3 py-2 text-xs text-stone-600 hover:text-red-700 bg-stone-50 hover:bg-red-50 rounded-xl border border-stone-200 transition-colors flex items-center gap-1.5 font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-400 group-hover:text-red-600" />
            <span>답안 전체 초기화</span>
          </button>
        </div>

      </div>

      {/* Chapter Section Tabs */}
      <div className="no-print flex overflow-x-auto gap-2 pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveSection('all')}
          className={`flex-shrink-0 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
            activeSection === 'all'
              ? 'bg-[#18233C] text-amber-200 shadow-md ring-2 ring-amber-500/30'
              : 'bg-white text-stone-600 hover:bg-amber-50/50 border border-stone-200'
          }`}
        >
          <span>전체 4개 장 ({questions.length})</span>
        </button>

        {SECTION_METADATA.map(sec => {
          const secQuestions = questions.filter(q => q.section === sec.id);
          const secAnswered = secQuestions.filter(q => (userAnswers[q.id] || '').trim().length > 0).length;
          const isSelected = activeSection === sec.id;

          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all font-medium flex items-center gap-2 ${
                isSelected
                  ? 'bg-[#18233C] text-amber-200 shadow-md ring-2 ring-amber-500/30 font-bold'
                  : 'bg-white text-stone-700 hover:bg-amber-50/50 border border-stone-200'
              }`}
            >
              <span>{sec.title}</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                secAnswered === secQuestions.length
                  ? 'bg-emerald-100 text-emerald-800 font-bold'
                  : 'bg-stone-100 text-stone-600'
              }`}>
                {secAnswered}/{secQuestions.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Control Filter & Search Bar */}
      <div className="no-print bg-stone-100/80 p-3 sm:p-4 rounded-2xl border border-stone-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs sm:text-sm">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="질문, 인물, 사건 검색 (예: 나제동맹, 대야성, 연개소문, 성충, 탄현)..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none placeholder:text-stone-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
            >
              지우기
            </button>
          )}
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex bg-white rounded-xl p-0.5 border border-stone-300">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'all'
                  ? 'bg-amber-500 text-[#18233C]'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              전체
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('unanswered')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'unanswered'
                  ? 'bg-amber-500 text-[#18233C]'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              미작성 ({questions.length - totalAnswered})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('answered')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'answered'
                  ? 'bg-amber-500 text-[#18233C]'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              작성완료 ({totalAnswered})
            </button>
          </div>

          {/* Master Solution Toggle */}
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => handleToggleAllSolutions(true)}
              className="px-2.5 py-1.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 rounded-xl text-xs font-medium transition-colors flex items-center gap-1"
              title="화면에 표시된 모든 해설 열기"
            >
              <Eye className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">전체 해설 열기</span>
            </button>
            <button
              type="button"
              onClick={() => handleToggleAllSolutions(false)}
              className="px-2.5 py-1.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 rounded-xl text-xs font-medium transition-colors flex items-center gap-1"
              title="화면에 표시된 모든 해설 닫기"
            >
              <EyeOff className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">전체 해설 닫기</span>
            </button>
          </div>
        </div>

      </div>

      {/* Question Cards Section */}
      {filteredQuestions.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-stone-800 text-base font-batang">조건에 맞는 질문이 없습니다</h4>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            검색어를 변경하거나 필터를 '전체'로 바꾸어 다시 시도해보세요.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setFilterMode('all');
              setActiveSection('all');
            }}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold"
          >
            검색 및 필터 초기화
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Group by section if in 'all' view */}
          {activeSection === 'all' && !searchQuery ? (
            SECTION_METADATA.map(secMeta => {
              const secQuestions = filteredQuestions.filter(q => q.section === secMeta.id);
              if (secQuestions.length === 0) return null;

              return (
                <section key={secMeta.id} className="space-y-4 pt-2">
                  <div className="flex items-center gap-3 border-b-2 border-amber-600/60 pb-2.5">
                    <span className="w-8 h-8 rounded-xl bg-[#18233C] text-amber-300 font-bold flex items-center justify-center font-batang shadow-xs">
                      {secMeta.id}
                    </span>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold font-batang text-[#18233C]">
                        {secMeta.title}
                      </h2>
                      <p className="text-xs text-stone-600">
                        {secMeta.subtitle} ({secQuestions.length}문항)
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5">
                    {secQuestions.map(q => (
                      <WorkbookCard
                        key={q.id}
                        question={q}
                        userAnswer={userAnswers[q.id] || ''}
                        onAnswerChange={onAnswerChange}
                        isOpenSolution={Boolean(openSolutions[q.id])}
                        onToggleSolution={handleToggleSolution}
                        printModeAnswers={printModeAnswers}
                      />
                    ))}
                  </div>
                </section>
              );
            })
          ) : (
            <div className="grid gap-5">
              {filteredQuestions.map(q => (
                <WorkbookCard
                  key={q.id}
                  question={q}
                  userAnswer={userAnswers[q.id] || ''}
                  onAnswerChange={onAnswerChange}
                  isOpenSolution={Boolean(openSolutions[q.id])}
                  onToggleSolution={handleToggleSolution}
                  printModeAnswers={printModeAnswers}
                />
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
