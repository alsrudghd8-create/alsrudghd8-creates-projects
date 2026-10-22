import React, { useState } from 'react';
import { 
  Calendar, 
  Map, 
  ShieldAlert, 
  Compass, 
  Swords, 
  Ship, 
  Flag,
  ArrowRight,
  Info
} from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  chapter: string;
  desc: string;
  impact: string;
  type: 'alliance' | 'battle' | 'diplomacy' | 'fall';
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '433년',
    title: '나제 동맹(羅濟同盟) 체결',
    chapter: '1장 배경',
    desc: '고구려 장수왕의 강력한 남진 정책에 대항하여 백제(비유왕)와 신라(눌지왕)가 군사 동맹을 맺음.',
    impact: '약 120년간 고구려를 견제하는 굳건한 한반도 남부 연합 전선 형성',
    type: 'alliance',
  },
  {
    year: '551년',
    title: '한강 유역 공동 탈환 작전',
    chapter: '1장 배경',
    desc: '백제 성왕과 신라 진흥왕이 연합하여 고구려를 공격, 백제는 한강 하류를, 신라는 한강 상류를 분할 점령함.',
    impact: '백제는 온조왕 이래 잃어버렸던 76년 만의 고토(한성)를 일시적으로 회복',
    type: 'battle',
  },
  {
    year: '553년',
    title: '진흥왕의 배신과 한강 독점',
    chapter: '1장',
    desc: '신라 진흥왕이 동맹 약속을 파기하고 백제의 한강 하류를 기습 강탈하여 신주(新州)를 설치함.',
    impact: '신라는 당항성을 통해 중국 직통 해로를 확보, 백제는 철천지원수로 돌아서며 120년 동맹 완전 결렬',
    type: 'battle',
  },
  {
    year: '554년',
    title: '관산성 전투 & 성왕의 전사',
    chapter: '1장',
    desc: '분노한 백제 성왕이 신라를 공격했으나 관산성(옥천)에서 복병에 기습당해 참수됨. 신라는 성왕의 머리를 궁궐 계단 밑에 묻음.',
    impact: '백제인들의 가슴속에 대대로 지울 수 없는 신라에 대한 증오와 복수심이 뿌리내림',
    type: 'battle',
  },
  {
    year: '641년',
    title: '의자왕 즉위 (해동공자)',
    chapter: '1장',
    desc: '무왕의 뒤를 이어 의자왕 즉위. 부모에 효도하고 형제간 우애가 깊어 해동공자로 칭송받음.',
    impact: '즉위 초 강력한 왕권 강화와 신라 정벌을 위한 군사력 재정비 추진',
    type: 'diplomacy',
  },
  {
    year: '642년',
    title: '신라 40여 성 함락 & 대야성 비극',
    chapter: '1·2장',
    desc: '의자왕이 친히 출정하여 신라 40여 성을 빼앗고, 윤충과 검일의 내응으로 서라벌 관문인 대야성을 함락함. 김춘추의 딸 고타소 참살.',
    impact: '신라 수도 서라벌이 직접적 풍전등화 위기에 처하고, 김춘추는 백제 멸망의 복수를 결의',
    type: 'battle',
  },
  {
    year: '642년 겨울',
    title: '김춘추의 고구려 방문 담판',
    chapter: '3장',
    desc: '김춘추가 연개소문을 찾아가 백제 공격을 위한 구원병을 요청했으나, 죽령 이북 반환 요구를 거절하고 감옥에 갇혔다가 탈출.',
    impact: '고구려와의 연합이 무산되자 신라는 당나라로 외교 방향을 전면 선회',
    type: 'diplomacy',
  },
  {
    year: '648년',
    title: '나당 동맹(羅唐同盟) 체결',
    chapter: '3장',
    desc: '김춘추가 당나라 장안에서 당태종 이세민과 회담하여 군사 동맹을 성사시킴. 대동강 이남을 신라가 영유하기로 밀약.',
    impact: '동아시아 정세가 [남북 축] 대 [동서 축]의 십자 외교 구도로 재편됨',
    type: 'alliance',
  },
  {
    year: '655~659년',
    title: '의자왕의 실정과 성충의 옥사',
    chapter: '4장',
    desc: '승리에 도취한 의자왕이 사치와 향락에 빠지고 왕비 은고의 전횡이 심화됨. 좌평 성충이 탄현과 기벌포를 지키라는 상소를 남기고 옥사.',
    impact: '백제 지배층이 분열되고 국가 방어 태세의 핵심 요충지를 무방비로 방치함',
    type: 'fall',
  },
  {
    year: '660년 7월',
    title: '황산벌 전투 & 백제 멸망',
    chapter: '4장',
    desc: '나당 연합군 18만 명 침공. 계백 장군 5천 결사대의 황산벌 패배 후 사비성 함락. 의자왕 항복으로 백제 멸망.',
    impact: '678년의 백제 사직 종말. 웅진도독부 설치 및 이후 3년간의 치열한 백제 부흥운동 발발',
    type: 'fall',
  },
];

export const TimelineMapView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'cross' | 'strategy'>('timeline');

  return (
    <div className="space-y-6">
      
      {/* Sub-navigation tabs */}
      <div className="flex bg-white rounded-2xl p-1.5 border border-stone-200 shadow-xs max-w-xl mx-auto">
        <button
          type="button"
          onClick={() => setActiveTab('timeline')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'timeline'
              ? 'bg-[#18233C] text-amber-200 shadow-md'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>역사 연표 (433~660)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cross')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'cross'
              ? 'bg-[#18233C] text-amber-200 shadow-md'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>십자 외교 구도도</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('strategy')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'strategy'
              ? 'bg-[#18233C] text-amber-200 shadow-md'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Map className="w-4 h-4" />
          <span>나당 침공 전략 지도</span>
        </button>
      </div>

      {/* ================= TAB 1: CHRONOLOGICAL TIMELINE ================= */}
      {activeTab === 'timeline' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <h3 className="text-xl sm:text-2xl font-bold font-batang text-stone-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-amber-600" />
              백제와 신라의 230년 흥망성쇠 연표
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 pt-1">
              고구려에 맞선 나제동맹의 결성부터 진흥왕의 배신, 관산성 성왕의 참수, 대야성 전투와 나당동맹을 거쳐 660년 멸망까지의 결정적 사건들
            </p>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-300 space-y-8 my-4">
            {TIMELINE_EVENTS.map((event, idx) => {
              let dotBg = 'bg-amber-500';
              if (event.type === 'battle') dotBg = 'bg-red-600';
              if (event.type === 'diplomacy') dotBg = 'bg-blue-600';
              if (event.type === 'fall') dotBg = 'bg-stone-800';

              return (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full ${dotBg} border-4 border-white shadow-sm`} />

                  <div className="bg-stone-50 hover:bg-amber-50/40 p-4 sm:p-5 rounded-2xl border border-stone-200/80 transition-colors space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-amber-800 text-sm sm:text-base font-batang">
                          {event.year}
                        </span>
                        <h4 className="font-bold text-stone-900 text-base sm:text-lg font-batang">
                          {event.title}
                        </h4>
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-stone-200/70 text-stone-700">
                        {event.chapter}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {event.desc}
                    </p>

                    <div className="pt-2 border-t border-stone-200/60 text-xs text-amber-900 font-medium flex items-start gap-1">
                      <span className="font-bold shrink-0">[역사적 파장]:</span>
                      <span>{event.impact}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 2: CROSS DIPLOMACY DIAGRAM ================= */}
      {activeTab === 'cross' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <h3 className="text-xl sm:text-2xl font-bold font-batang text-stone-900 flex items-center gap-2">
              <Compass className="w-6 h-6 text-blue-700" />
              7세기 동아시아 십자(十字) 외교 구도
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 pt-1">
              신라의 고립을 타개한 김춘추의 외교가 완성시킨 [남북 연합] 대 [동서 연합]의 거대한 세력 균형도
            </p>
          </div>

          {/* Visual Schematic Diagram */}
          <div className="bg-[#0f172a] text-white p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-inner">
            <div className="max-w-xl mx-auto space-y-8 relative z-10">
              
              {/* North: Goguryeo & Turk */}
              <div className="text-center">
                <span className="text-xs text-blue-300 font-bold tracking-widest uppercase block mb-1">
                  북방 세력
                </span>
                <div className="inline-block bg-blue-900/80 border-2 border-blue-400 px-6 py-3 rounded-2xl shadow-lg">
                  <div className="font-bold text-lg font-batang text-blue-100">
                    고구려 (연개소문) & 돌궐
                  </div>
                  <div className="text-xs text-blue-300">
                    당나라의 팽창을 저지하는 북방 군사 강국
                  </div>
                </div>
              </div>

              {/* Middle East-West Axis vs Center */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* West: Tang China */}
                <div className="text-center w-full sm:w-48">
                  <span className="text-xs text-red-300 font-bold tracking-widest uppercase block mb-1">
                    서쪽 세력
                  </span>
                  <div className="bg-red-900/80 border-2 border-red-400 p-3.5 rounded-2xl shadow-lg">
                    <div className="font-bold text-base font-batang text-red-100">
                      당나라 (당태종)
                    </div>
                    <div className="text-[11px] text-red-300">
                      고구려 협공을 위해 신라와 군사 동맹
                    </div>
                  </div>
                </div>

                {/* Center Cross Intersection */}
                <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-stone-800/90 border border-amber-400/50 shadow-md">
                  <Swords className="w-7 h-7 text-amber-400 animate-pulse" />
                  <span className="text-xs font-bold text-amber-300 mt-1 font-batang">
                    한반도 대격돌
                  </span>
                  <span className="text-[10px] text-stone-300">
                    남북 축 vs 동서 축
                  </span>
                </div>

                {/* East: Silla */}
                <div className="text-center w-full sm:w-48">
                  <span className="text-xs text-amber-300 font-bold tracking-widest uppercase block mb-1">
                    동쪽 세력
                  </span>
                  <div className="bg-amber-900/80 border-2 border-amber-400 p-3.5 rounded-2xl shadow-lg">
                    <div className="font-bold text-base font-batang text-amber-100">
                      신라 (김춘추·김유신)
                    </div>
                    <div className="text-[11px] text-amber-300">
                      백제 멸망을 위해 당과 연합군 결성
                    </div>
                  </div>
                </div>

              </div>

              {/* South: Baekje & Wa */}
              <div className="text-center">
                <div className="inline-block bg-emerald-900/80 border-2 border-emerald-400 px-6 py-3 rounded-2xl shadow-lg">
                  <div className="font-bold text-lg font-batang text-emerald-100">
                    백제 (의자왕) & 왜국(일본)
                  </div>
                  <div className="text-xs text-emerald-300">
                    수호 동맹 및 해상 지원군 파견 관계
                  </div>
                </div>
                <span className="text-xs text-emerald-300 font-bold tracking-widest uppercase block mt-1">
                  남방 세력
                </span>
              </div>

            </div>
          </div>

          {/* Explanation Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1.5">
              <h5 className="font-bold text-blue-900 font-batang flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                남북(南北) 연합: [돌궐 - 고구려 - 백제 - 왜]
              </h5>
              <p className="text-stone-700 leading-relaxed">
                당나라의 팽창주의에 위기를 느낀 고구려와, 신라에 대한 복수를 노리는 백제가 손을 잡고, 바다 건너 백제와 전통적 우호국이던 왜(일본)가 가세한 연합 구도입니다.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5">
              <h5 className="font-bold text-amber-900 font-batang flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                동서(東西) 연합: [당나라 - 신라]
              </h5>
              <p className="text-stone-700 leading-relaxed">
                단독으로 고구려 정벌에 실패(안시성 전투)한 당나라와, 백제의 맹공으로 생존의 벼랑 끝에 몰린 신라가 대동강 이남을 신라가 영유한다는 조건으로 맺은 나당 동맹입니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: STRATEGIC INVASION MAP ================= */}
      {activeTab === 'strategy' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <h3 className="text-xl sm:text-2xl font-bold font-batang text-stone-900 flex items-center gap-2">
              <Map className="w-6 h-6 text-red-700" />
              660년 나당 연합군 침공 전략 및 핵심 요충지
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 pt-1">
              충신 성충의 유언: "육로는 탄현을 막고, 수로는 기벌포를 선점하라!" 묵살된 방어책과 백제의 최후
            </p>
          </div>

          {/* Strategic Battlefield Layout Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Silla Route: Tanhyeon & Hwangsanbeol */}
            <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-amber-700 text-white font-bold text-xs font-batang">
                  육로 침공로
                </span>
                <span className="text-xs text-stone-500 font-medium">김유신 지휘 5만 명</span>
              </div>

              <h4 className="font-bold text-base sm:text-lg text-stone-900 font-batang">
                경주(서라벌) → 탄현(炭峴) → 황산벌 → 사비성
              </h4>

              <div className="space-y-2 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <p>
                  <strong>탄현(숯고개):</strong> 대전과 충남 금산 경계의 험준한 산악 관문. 성충이 적군이 넘지 못하도록 반드시 선점하라고 간언했으나 백제군이 방치하여 신라군이 무혈 통과함.
                </p>
                <p>
                  <strong>황산벌 전투:</strong> 계백 장군이 처자식을 베고 5천 결사대로 신라 5만 대군을 4번이나 격퇴했으나, 화랑 관창·반굴의 희생으로 사기가 오른 신라군에 결국 중과부적으로 전멸.
                </p>
              </div>
            </div>

            {/* Tang Route: Gibeolpo */}
            <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-blue-700 text-white font-bold text-xs font-batang">
                  수로 침공로
                </span>
                <span className="text-xs text-stone-500 font-medium">소정방 지휘 13만 명</span>
              </div>

              <h4 className="font-bold text-base sm:text-lg text-stone-900 font-batang">
                산둥반도 → 황해 도하 → 기벌포(伎伐浦) → 사비성
              </h4>

              <div className="space-y-2 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <p>
                  <strong>기벌포(금강 하구, 장항·군산):</strong> 바다에서 백제 수도 사비(부여)로 진입하는 해상 관문. 성충이 적선이 진입하지 못하도록 입구를 막으라고 경고했으나 선점을 놓침.
                </p>
                <p>
                  <strong>동시 협공:</strong> 신라 육군과 당나라 수군이 660년 7월 10일 사비성 남쪽에서 합류하여 도성을 포위, 의자왕은 웅진성으로 탈출했으나 결국 항복하며 백제 멸망.
                </p>
              </div>
            </div>

          </div>

          {/* Historical Quote Box */}
          <div className="p-4 sm:p-5 bg-stone-900 text-stone-200 rounded-2xl space-y-2 border border-stone-800">
            <div className="font-bold text-amber-400 text-sm font-batang flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>《삼국사기》 백제본기 - 성충의 마지막 상소문</span>
            </div>
            <blockquote className="text-xs sm:text-sm text-stone-300 italic leading-relaxed pl-2 border-l-2 border-amber-500">
              "충신은 죽어도 임금을 잊지 않는 것이니, 원컨대 한 말씀만 드리고 죽겠습니다. ... 만약 다른 나라 군사가 오거든 육로로는 탄현을 넘지 못하게 하고, 수로는 기벌포의 어귀에 들어오지 못하게 하여 험준한 곳에 의지하여 적을 막으십시오. 그런 뒤에야 나라를 보존할 수 있습니다."
            </blockquote>
          </div>
        </div>
      )}

    </div>
  );
};
