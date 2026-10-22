import React, { useState } from 'react';
import { 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  HelpCircle,
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';
import { QuestionItem } from '../types';

interface QuizViewProps {
  questions: QuestionItem[];
  onSwitchToWorkbook: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questions,
  onSwitchToWorkbook,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isGraded, setIsGraded] = useState(false);
  const [instantMode, setInstantMode] = useState(false);
  const [filterWrongOnly, setFilterWrongOnly] = useState(false);

  const handleSelect = (qId: string, optionIdx: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIdx,
    }));
  };

  const handleReset = () => {
    if (Object.keys(selectedAnswers).length > 0 && window.confirm('모든 답안 선택을 초기화하시겠습니까?')) {
      setSelectedAnswers({});
      setIsGraded(false);
      setFilterWrongOnly(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGrade = () => {
    setIsGraded(true);
    // Smooth scroll to results
    setTimeout(() => {
      const el = document.getElementById('quiz-result-summary');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  };

  // Calculate scores
  let correctCount = 0;
  questions.forEach(q => {
    if (selectedAnswers[q.id] === q.correctIdx) {
      correctCount++;
    }
  });

  const totalQuestions = questions.length;
  const score = Math.round((correctCount / totalQuestions) * 100);
  const answeredCount = Object.keys(selectedAnswers).length;

  const displayQuestions = filterWrongOnly
    ? questions.filter(q => selectedAnswers[q.id] !== q.correctIdx)
    : questions;

  return (
    <div className="space-y-6">
      
      {/* Quiz Banner Header */}
      <div className="bg-gradient-to-r from-[#18233C] via-[#1f315a] to-[#253966] p-6 sm:p-8 rounded-3xl text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold border border-amber-300/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>객관식 실력 점검</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-batang tracking-wide text-amber-100">
            백제사 종합 평가 테스트
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            의자왕의 집권과 나제동맹의 결렬, 대야성 전투의 비극, 김춘추의 십자 외교, 그리고 나당 연합군과의 최후 항전까지 총 {totalQuestions}개의 핵심 문제를 풀고 실력을 점검해보세요.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-amber-200/90 select-none bg-black/20 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-black/30 transition-colors">
              <input
                type="checkbox"
                checked={instantMode}
                onChange={e => setInstantMode(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-0"
              />
              <span>선택 즉시 해설 보기 (학습 모드)</span>
            </label>
          </div>
        </div>

        {/* Decorative Background Stamp */}
        <div className="absolute right-6 -bottom-8 opacity-10 select-none pointer-events-none text-9xl font-batang font-black">
          百
        </div>
      </div>

      {/* Result Card when graded */}
      {isGraded && (
        <div 
          id="quiz-result-summary"
          className="bg-white border-2 border-amber-500 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-4 animate-in fade-in duration-300"
        >
          <div className="w-16 h-16 bg-gradient-to-tr from-amber-100 to-amber-200 text-amber-700 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold font-batang text-stone-900">
              테스트 평가 결과
            </h3>
            <div className="text-4xl sm:text-5xl font-black text-amber-700 font-batang my-2">
              {score} <span className="text-lg text-stone-400 font-normal">/ 100점</span>
            </div>
            <p className="text-sm font-semibold text-stone-600">
              총 {totalQuestions}문항 중 <strong className="text-emerald-700">{correctCount}문항 정답</strong>, <strong className="text-red-700">{totalQuestions - correctCount}문항 오답</strong>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 max-w-lg mx-auto leading-relaxed bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80">
            {score === 100 && "완벽합니다! 7세기 동아시아 정세와 백제의 흥망성쇠 과정을 완벽하게 꿰뚫고 계시네요."}
            {score >= 80 && score < 100 && "매우 훌륭합니다! 백제사의 주요 핵심 사건을 정확하게 파악하고 있습니다. 틀린 문항의 해설을 다시 읽어보세요."}
            {score >= 60 && score < 80 && "수고하셨습니다! 기본 흐름은 잘 파악하셨으며, 연대기 순서와 인물별 세부 사건을 한 번 더 복습해보세요."}
            {score < 60 && "서술형 워크북의 사료 돋보기와 모범 해설을 참고하여 기본 개념을 차근차근 다시 정리해보세요!"}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {totalQuestions - correctCount > 0 && (
              <button
                type="button"
                onClick={() => setFilterWrongOnly(!filterWrongOnly)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  filterWrongOnly 
                    ? 'bg-stone-800 text-white' 
                    : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>{filterWrongOnly ? '전체 문항 보기' : `틀린 문제만 모아보기 (${totalQuestions - correctCount}개)`}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onSwitchToWorkbook}
              className="px-4 py-2 rounded-xl bg-[#18233C] hover:bg-slate-800 text-amber-200 text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>서술형 워크북으로 복습</span>
            </button>
          </div>
        </div>
      )}

      {/* Question List */}
      <div className="space-y-5">
        {displayQuestions.map((q, qIndex) => {
          const selectedIdx = selectedAnswers[q.id];
          const hasSelected = selectedIdx !== undefined;
          const isCorrect = selectedIdx === q.correctIdx;
          const showAnswerFeedback = isGraded || (instantMode && hasSelected);

          return (
            <div
              key={q.id}
              className={`bg-white border rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 transition-all ${
                showAnswerFeedback
                  ? isCorrect
                    ? 'border-emerald-300 ring-1 ring-emerald-200'
                    : 'border-red-300 ring-1 ring-red-200'
                  : 'border-stone-200'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md font-bold font-batang shrink-0">
                    문제 {q.qNum}
                  </span>
                  <span className="text-xs text-stone-500">
                    {q.secTitle}
                  </span>
                </div>

                {showAnswerFeedback && (
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    isCorrect
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>{isCorrect ? '정답' : '오답'}</span>
                  </span>
                )}
              </div>

              {/* Question Text */}
              <p className="font-bold text-stone-900 text-base sm:text-lg font-batang leading-snug">
                {q.qText}
              </p>

              {/* 4 Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selectedIdx === optIdx;
                  const isThisCorrectOption = optIdx === q.correctIdx;

                  let optionStyle = "border-stone-200 hover:bg-amber-50/40 text-stone-800";
                  if (showAnswerFeedback) {
                    if (isThisCorrectOption) {
                      optionStyle = "bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold";
                    } else if (isThisSelected && !isThisCorrectOption) {
                      optionStyle = "bg-red-50 border-red-400 text-red-900 line-through opacity-80";
                    } else {
                      optionStyle = "border-stone-200 text-stone-400 opacity-60";
                    }
                  } else if (isThisSelected) {
                    optionStyle = "bg-amber-100/70 border-amber-500 text-amber-950 font-semibold ring-1 ring-amber-400";
                  }

                  return (
                    <label
                      key={optIdx}
                      className={`flex items-center p-3 sm:p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all select-none ${optionStyle}`}
                    >
                      <input
                        type="radio"
                        name={`quiz-option-${q.id}`}
                        value={optIdx}
                        checked={isThisSelected}
                        onChange={() => handleSelect(q.id, optIdx)}
                        className="w-4 h-4 text-amber-600 focus:ring-0 mr-3 shrink-0"
                      />
                      <span className="leading-snug">{opt}</span>
                    </label>
                  );
                })}
              </div>

              {/* Explanation Box when feedback shown */}
              {showAnswerFeedback && (
                <div className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed space-y-1.5 ${
                  isCorrect
                    ? 'bg-emerald-50/80 border border-emerald-200 text-emerald-950'
                    : 'bg-red-50/80 border border-red-200 text-red-950'
                }`}>
                  <div className="font-bold flex items-center gap-1.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span>
                      {isCorrect ? '정답입니다!' : `오답입니다. (정답: ${q.options[q.correctIdx]})`}
                    </span>
                  </div>
                  <p className="text-stone-800 font-medium pt-0.5">
                    {q.answer}
                  </p>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Floating Bottom Action Bar */}
      <div className="sticky bottom-4 z-40 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-stone-300/80 shadow-2xl flex items-center justify-between gap-3 max-w-4xl mx-auto">
        <div className="text-xs sm:text-sm text-stone-700">
          총 <strong className="text-stone-900 font-bold">{totalQuestions}</strong>문제 중{' '}
          <strong className="text-amber-700 font-bold text-base">{answeredCount}</strong>개 선택 완료
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100 text-xs sm:text-sm font-medium transition-colors"
          >
            선택 초기화
          </button>

          <button
            type="button"
            onClick={handleGrade}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#18233C] text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
          >
            채점하기
          </button>
        </div>
      </div>

    </div>
  );
};
