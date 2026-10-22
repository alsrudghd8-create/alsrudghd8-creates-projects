import React from 'react';
import { Printer, Download, X, FileText, CheckCircle2 } from 'lucide-react';
import { QuestionItem } from '../types';

interface PrintExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: QuestionItem[];
  userAnswers: Record<string, string>;
  onTriggerPrint: (withAnswers: boolean) => void;
}

export const PrintExportModal: React.FC<PrintExportModalProps> = ({
  isOpen,
  onClose,
  questions,
  userAnswers,
  onTriggerPrint,
}) => {
  if (!isOpen) return null;

  const handleDownloadTxt = () => {
    let content = `[백제 역사 탐구 워크북 - 나의 학습 기록]\n`;
    content += `작성 일시: ${new Date().toLocaleString('ko-KR')}\n`;
    content += `=====================================================\n\n`;

    questions.forEach((q, idx) => {
      content += `[질문 ${q.qNum}] (${q.secTitle}) ${q.qText}\n`;
      content += `-----------------------------------------------------\n`;
      const ans = userAnswers[q.id] || '(작성하지 않음)';
      content += `▶ 내가 작성한 답안:\n${ans}\n\n`;
      content += `★ 모범 답안 및 핵심 해설:\n${q.answer}\n\n`;
      content += `=====================================================\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `백제_역사_탐구_학습노트_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs no-print">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              百
            </div>
            <h3 className="font-bold text-stone-900 text-lg font-batang">
              인쇄 및 학습 기록 내보내기
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          
          {/* Option 1: Student Print */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onTriggerPrint(false);
            }}
            className="w-full p-4 rounded-2xl border border-stone-200 hover:border-amber-500 hover:bg-amber-50/40 text-left transition-all flex items-start gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-amber-100 text-stone-700 group-hover:text-amber-800 flex items-center justify-center shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm font-batang group-hover:text-amber-900">
                학생용 빈칸 학습지 인쇄 (PDF)
              </h4>
              <p className="text-xs text-stone-500 pt-0.5 leading-relaxed">
                질문과 직접 손글씨로 작성할 수 있는 여백만 깔끔하게 출력합니다.
              </p>
            </div>
          </button>

          {/* Option 2: Teacher / Master Print */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onTriggerPrint(true);
            }}
            className="w-full p-4 rounded-2xl border border-stone-200 hover:border-amber-500 hover:bg-amber-50/40 text-left transition-all flex items-start gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm font-batang group-hover:text-amber-900">
                모범 답안 및 해설 포함본 인쇄 (PDF)
              </h4>
              <p className="text-xs text-stone-500 pt-0.5 leading-relaxed">
                모든 질문과 모범 답안, 내가 입력한 내용까지 함께 포함하여 출력합니다.
              </p>
            </div>
          </button>

          {/* Option 3: Text file Download */}
          <button
            type="button"
            onClick={handleDownloadTxt}
            className="w-full p-4 rounded-2xl border border-stone-200 hover:border-amber-500 hover:bg-amber-50/40 text-left transition-all flex items-start gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-blue-100 text-stone-700 group-hover:text-blue-800 flex items-center justify-center shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm font-batang group-hover:text-blue-900">
                작성 답안 텍스트 파일(.txt) 다운로드
              </h4>
              <p className="text-xs text-stone-500 pt-0.5 leading-relaxed">
                작성한 생각과 모범 해설을 텍스트 파일로 저장하여 과제 제출용으로 활용하세요.
              </p>
            </div>
          </button>

        </div>

        <div className="pt-2 text-center">
          <p className="text-[11px] text-stone-400">
            * 인쇄 시 인쇄 대상 선택 창에서 [PDF로 저장]을 선택하면 PDF로 다운로드됩니다.
          </p>
        </div>

      </div>
    </div>
  );
};
