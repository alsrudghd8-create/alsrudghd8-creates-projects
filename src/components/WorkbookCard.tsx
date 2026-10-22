import React, { useState } from 'react';
import { 
  Lightbulb, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  BookOpen, 
  Sparkles, 
  RotateCcw,
  Tag,
  Check
} from 'lucide-react';
import { QuestionItem } from '../types';

interface WorkbookCardProps {
  question: QuestionItem;
  userAnswer: string;
  onAnswerChange: (id: string, text: string) => void;
  isOpenSolution: boolean;
  onToggleSolution: (id: string) => void;
  printModeAnswers: boolean;
}

export const WorkbookCard: React.FC<WorkbookCardProps> = ({
  question,
  userAnswer,
  onAnswerChange,
  isOpenSolution,
  onToggleSolution,
  printModeAnswers,
}) => {
  const [showContext, setShowContext] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('');

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    onAnswerChange(question.id, val);
    setSaveStatus('저장됨');
    setTimeout(() => {
      setSaveStatus('');
    }, 1500);
  };

  const handleClear = () => {
    if (userAnswer && window.confirm('이 문제의 작성 답안을 지우시겠습니까?')) {
      onAnswerChange(question.id, '');
    }
  };

  // Keyword check in user's written response
  const matchedKeywords = question.keywords.filter(kw => 
    userAnswer.trim().length > 0 && userAnswer.toLowerCase().includes(kw.toLowerCase())
  );

  return (
    <article className="card-box bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
      
      {/* Question Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-stone-100">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="bg-[#18233C] text-amber-300 text-xs px-2.5 py-1 rounded-md font-bold font-batang shrink-0 shadow-xs">
            질문 {question.qNum}
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/60">
            {question.secSubtitle}
          </span>
        </div>

        {/* Historical Context Toggle */}
        {question.historicalContext && (
          <button
            type="button"
            onClick={() => setShowContext(!showContext)}
            className="no-print inline-flex items-center gap-1 text-xs text-stone-500 hover:text-amber-800 transition-colors self-start sm:self-auto py-0.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>{showContext ? '사료 닫기' : '사료 돋보기'}</span>
            {showContext ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Historical Context Box */}
      {showContext && question.historicalContext && (
        <div className="no-print p-3.5 bg-amber-50/70 border-l-4 border-amber-600 rounded-r-xl text-xs sm:text-sm text-stone-800 leading-relaxed space-y-1">
          <div className="flex items-center gap-1 font-bold text-amber-900 font-batang">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>[역사 사료 및 배경 해설]</span>
          </div>
          <p className="italic text-stone-700">{question.historicalContext}</p>
        </div>
      )}

      {/* Main Question Text */}
      <h3 className="font-bold text-stone-900 text-base sm:text-lg font-batang leading-snug">
        {question.qText}
      </h3>

      {/* User Input Area */}
      <div className="space-y-2 no-print">
        <div className="flex justify-between items-center text-xs">
          <label htmlFor={`input-${question.id}`} className="font-semibold text-stone-700 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
            나의 생각 및 답안 서술:
          </label>
          <div className="flex items-center gap-2">
            {saveStatus && (
              <span className="text-emerald-700 font-medium flex items-center gap-0.5 animate-pulse">
                <Check className="w-3 h-3" /> {saveStatus}
              </span>
            )}
            <span className="text-stone-400">
              {userAnswer.length}자
            </span>
          </div>
        </div>

        <textarea
          id={`input-${question.id}`}
          value={userAnswer}
          onChange={handleInput}
          rows={3}
          placeholder="질문에 대한 생각이나 근거, 배운 내용을 직접 작성해보세요..."
          className="w-full p-3.5 text-sm sm:text-base text-stone-900 bg-amber-50/20 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all placeholder:text-stone-400 leading-relaxed resize-y"
        />

        {/* Real-time Keyword Feedback */}
        {question.keywords.length > 0 && (
          <div className="flex items-center flex-wrap gap-1.5 pt-1">
            <span className="text-[11px] font-semibold text-stone-500 flex items-center gap-1 mr-1">
              <Tag className="w-3 h-3 text-stone-400" />
              핵심 키워드 감지:
            </span>
            {question.keywords.map((kw, i) => {
              const isMatched = matchedKeywords.includes(kw);
              return (
                <span
                  key={i}
                  className={`text-[11px] px-2 py-0.5 rounded-full border transition-all ${
                    isMatched
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-medium shadow-2xs'
                      : 'bg-stone-100 text-stone-400 border-stone-200'
                  }`}
                >
                  {isMatched && <CheckCircle2 className="w-2.5 h-2.5 inline mr-0.5 text-emerald-600" />}
                  {kw}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Print View for Student Response */}
      <div className="hidden print:block text-sm text-stone-900 border border-stone-300 p-4 rounded-lg bg-stone-50 space-y-1">
        <div className="font-semibold text-stone-700 text-xs">[학생 작성 답안]</div>
        <p className="min-h-[4rem] text-stone-900 whitespace-pre-wrap">
          {userAnswer.trim() ? userAnswer : '(답안 미작성)'}
        </p>
      </div>

      {/* Action Footer (Toggle Answer & Reset) */}
      <div className="no-print flex items-center justify-between pt-1">
        {userAnswer.trim().length > 0 ? (
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-stone-400 hover:text-red-600 transition-colors flex items-center gap-1"
            title="답안 내용 비우기"
          >
            <RotateCcw className="w-3 h-3" />
            <span>작성 지우기</span>
          </button>
        ) : (
          <span className="text-xs text-stone-400 italic">직접 쓴 후 정답과 비교해보세요</span>
        )}

        <button
          type="button"
          onClick={() => onToggleSolution(question.id)}
          className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 shadow-2xs ${
            isOpenSolution
              ? 'bg-stone-200 hover:bg-stone-300 text-stone-700'
              : 'bg-gradient-to-r from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 text-amber-900 border border-amber-300/80'
          }`}
        >
          <Lightbulb className={`w-3.5 h-3.5 ${isOpenSolution ? 'text-stone-500' : 'text-amber-700'}`} />
          <span>{isOpenSolution ? '해설 닫기' : '정답 / 해설 확인'}</span>
        </button>
      </div>

      {/* Model Answer & Key Points Box */}
      {(isOpenSolution || printModeAnswers) && (
        <div className="answer-text pt-3 border-t border-stone-200 space-y-3">
          <div className="p-4 sm:p-5 bg-gradient-to-br from-amber-50/60 to-orange-50/30 border-l-4 border-amber-500 rounded-r-xl text-stone-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-red-900 font-bold text-xs sm:text-sm font-batang flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-700"></span>
                [모범 답안 및 핵심 해설]
              </span>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-stone-800 font-medium">
              {question.answer}
            </p>

            {/* Self-check criteria */}
            <div className="pt-2 border-t border-amber-200/60 text-xs text-stone-600 space-y-1">
              <div className="font-semibold text-stone-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                자기주도 점검 기준:
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-stone-600 pl-1">
                <li>질문이 묻고 있는 핵심 사건·인물의 배경과 원인을 밝혔는가?</li>
                <li>관련 역사 키워드({question.keywords.slice(0, 3).join(', ')})가 올바르게 사용되었는가?</li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </article>
  );
};
