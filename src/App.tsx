import { useMemo, useState, useEffect } from 'react'
import { QUIZ, type Person } from './data';
import confetti from  'canvas-confetti';
import './App.css'

type AnswerMap = Record<string, string>;
type ResultMap = Record<string, { correct: boolean; accepted: string[] }>;

const TXT = {
  kr: {
    title: '신입생 환영회 퀴즈!',
    subtitle: '설명을 보고 누구인지 맞춰보세요.',
    language: 'Language',
    inputLabel: '이름 입력',
    inputPlaceholder: '이름을 적어주세요',
    submit: '제출하기',
    congratsTitle: '🎉 축하합니다!',
    congratsBody: '모든 항목을 정확히 맞췄어요.\n얼른 진행자에게 알리세요!',
    correctCount: (x: number, y: number) => `맞춘 개수: ${x} / ${y}`,
  },
  en: {
    title: 'Welcome Quiz!',
    subtitle: 'Read the hint and guess who it is.',
    language: 'Language',
    inputLabel: 'Who am I?',
    inputPlaceholder: 'Select a name',
    submit: 'Submit',
    congratsTitle: '🎉 Congratulations!',
    congratsBody: 'You got them all right.\nTell the host!',
    correctCount: (x: number, y: number) => `Correct: ${x} / ${y}`,
  },
} as const;


function shuffleOnce<T>(arr: T[]) {
  const a = arr.slice();
  for(let i = a.length-1; i>0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, '');
}

function isCorrect(input: string, answer: string | string[]) {
  const inorm = normalize(input);
  const normals = (Array.isArray(answer) ? answer : [answer]).map(normalize);
  return normals.includes(inorm);
}

function App() {
  const quiz = useMemo<Person[]>(()=> shuffleOnce(QUIZ), []);
  const [answers, setAnswers] = useState<AnswerMap>(() => {
    const saved = localStorage.getItem('answers');
    if (saved) return JSON.parse(saved);
    return quiz.reduce((acc, p) => { acc[p.id] = ''; return acc;}, {} as AnswerMap);
  });
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<ResultMap>({});
  const [allCorrect, setAllCorrect] = useState(false);
  const [lang, setLang] = useState<'kr'|'en'>('kr');

  const allNamesEN = useMemo(() => {
    const set = new Set<string>();
    for (const p of QUIZ) {
      const a = (p as Person).answer_en as string | string[] | undefined;
      if (!a) continue;
      if (Array.isArray(a)) a.forEach(v => v && set.add(v));
      else set.add(a);
    }
    return Array.from(set);
  }, []);

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(answers));
  }, [answers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r: ResultMap = {};
    let okCount = 0;

    for (const p of quiz) {
      const val = answers[p.id];
      const correct = isCorrect(val, (lang === 'en' && p.answer_en ? p.answer_en : p.answer));
      if (correct) okCount++;
      r[p.id] = {
        correct,
        accepted: Array.isArray(p.answer) ? p.answer : [p.answer],
      };
    }
    setResults(r);
    setSubmitted(true);
    const allOk = okCount === quiz.length;
    setAllCorrect(allOk);
    if (allOk) {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    }
  }

  function handleChange(id: number, value: string) {
    setAnswers(a => ({...a, [id]: value}))
  }

  const correctCount = useMemo(
    () => Object.values(results).filter(r => r.correct).length,
    [results]
  )

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-100 px-4 pb-4">
      <main>
        <header className='w-full max-w-md p-4 text-center'>
          <p className="text-xl mb-2 font-bold">{TXT[lang].title}</p>
          <p>{TXT[lang].subtitle}</p>
          {lang==='kr'&&
          (<p className='text-xs text-gray-800'>정답란에 성과이름(예: 홍길동)을 모두 입력해야 해요! <br/>영어 이름은 다음 중 하나: Eric, Tom, Emi</p>)
          }
          
        </header>

        <div className='flex justify-end items-center space-x-2 mb-2'>
          <p>Langauge</p>
          <div className='rounded bg-blue-500 p-1'>
            <button 
              onClick={() => {setLang('kr'); setSubmitted(false)}}
              className={`${lang==='kr' ? 'rounded bg-white' : ''} px-3 py-1`}
            >
              한국어
            </button>
            <button 
              onClick={() => {setLang('en'); setSubmitted(false)}}
              className={`${lang==='en' ? 'rounded bg-white' : ''} px-3 py-1`}
            >
              ENGLISH
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {quiz.map((p, idx) => {
            const r = results[p.id];
            const isOk = submitted && !!r?.correct;
            const hint = lang === 'en' ? p.hint_en : p.hint;
            return (
              submitted ? (
              <div 
                key={p.id} 
                className={`rounded-sm bg-white p-4 border border-2 ${isOk ? 'border-green-500' : 'border-red-500'}`}
              >
                <div>
                  <div className="text-xs text-gray-500 mb-1">{idx + 1}</div>
                  <div className="font-medium text-black mb-2">{hint}</div>
                </div>
                <label className="text-xs text-gray-500" htmlFor={`inp-${p.id}`}>{TXT[lang].inputLabel}</label>
                {lang === 'en' ? (
                  <select
                    id={`inp-${p.id}`}
                    value={answers[p.id]}
                    onChange={(e) => handleChange(p.id, e.target.value)}
                    className={'w-full rounded border border-black px-3 h-10 text-black bg-white'}
                  >
                    <option value="">{TXT[lang].inputPlaceholder}</option>
                    {allNamesEN.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={`inp-${p.id}`}
                    value={answers[p.id]}
                    onChange={(e) => handleChange(p.id, e.target.value)}
                    placeholder={TXT[lang].inputPlaceholder}
                    className={'w-full rounded border border-black px-3 h-10 text-black'}
                    autoComplete='off'
                    inputMode='text'
                  />
                )}
              </div>
              ) : (
              <div 
                key={p.id} 
                className="rounded-sm bg-white p-4"
              >
                <div>
                  <div className="text-xs text-gray-500 mb-1">{idx + 1}</div>
                  <div className="font-medium text-black mb-2">{hint}</div>
                </div>
                <label className="text-xs text-gray-500" htmlFor={`inp-${p.id}`}>{TXT[lang].inputLabel}</label>
                {lang === 'en' ? (
                  <select
                    id={`inp-${p.id}`}
                    value={answers[p.id]}
                    onChange={(e) => handleChange(p.id, e.target.value)}
                    className={'w-full rounded border border-black px-3 h-10 text-black bg-white'}
                  >
                    <option value="">{TXT[lang].inputPlaceholder}</option>
                    {allNamesEN.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={`inp-${p.id}`}
                    value={answers[p.id]}
                    onChange={(e) => handleChange(p.id, e.target.value)}
                    placeholder={TXT[lang].inputPlaceholder}
                    className={'w-full rounded border border-black px-3 h-10 text-black'}
                    autoComplete='off'
                    inputMode='text'
                  />
                )}
              </div>
              )
            )
          })}
          <button
            type="submit"
            className="flex-1 rounded bg-white text-black px-4 py-3 block mx-auto active:bg-blue-300"
            >
            {TXT[lang].submit}
          </button>
        </form>
        {submitted && (
          <section className="mt-5 text-center">
            {allCorrect ? (
              <div className="rounded text-black bg-white border p-5 shadow-sm">
                <div className="text-2xl font-bold mb-1">{TXT[lang].congratsTitle}</div>
                <p className="text-gray-600">{TXT[lang].congratsBody}</p>
              </div>
            ) : (
              <div className="rounded text-black bg-white border p-5 shadow-sm">
                <div className="text-lg font-semibold">
                  {TXT[lang].correctCount(correctCount, quiz.length)}
                </div>
              </div>
            )}
          </section>
        )}
      </main>

    </div>
  )
}

export default App
