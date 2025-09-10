import { useMemo, useState, useEffect } from 'react'
import { QUIZ, type Person } from './data';
import confetti from  'canvas-confetti';
import './App.css'

type AnswerMap = Record<string, string>;
type ResultMap = Record<string, { correct: boolean; accepted: string[] }>;

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

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(answers));
  }, [answers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r: ResultMap = {};
    let okCount = 0;

    for (const p of quiz) {
      const val = answers[p.id];
      const correct = isCorrect(val, p.answer);
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
    <div className="min-h-dvh flex items-center justify-center">
      <main>
        <header className='w-full max-w-md p-4'>
          <p className="text-xl mb-2 font-bold">신입생 환영회 퀴즈!</p>
          <p>설명을 보고 누구인지 맞춰보세요</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          {quiz.map((p, idx) => {
            const r = results[p.id];
            const isOk = submitted && !!r?.correct;
            return (
              submitted ? (
              <div 
                key={p.id} 
                className={`rounded-sm bg-white p-4 border border-2 ${isOk ? 'border-green-500' : 'border-red-500'}`}
              >
                <div>
                  <div className="text-xs text-gray-500 mb-1">사람 {idx + 1}</div>
                  <div className="font-medium text-black mb-3">{p.hint}</div>
                </div>
                <label className="text-xs text-gray-500">이름 입력</label>
                <input
                  id={`inp=${p.id}`}
                  value={answers[p.id] ?? ''}
                  onChange={(e) => handleChange(p.id, e.target.value)}
                  list={'names'}
                  placeholder='이름을 적어주세요'
                  className={'w-full rounded border border-black px-3 h-10 text-black'}
                  autoComplete='off'
                  inputMode='text'
                />
              </div>
              ) : (
              <div 
                key={p.id} 
                className="rounded-sm bg-white p-4"
              >
                <div>
                  <div className="text-xs text-gray-500 mb-1">사람 {idx + 1}</div>
                  <div className="font-medium text-black mb-3">{p.hint}</div>
                </div>
                <label className="text-xs text-gray-500">이름 입력</label>
                <input
                  id={`inp=${p.id}`}
                  value={answers[p.id] ?? ''}
                  onChange={(e) => handleChange(p.id, e.target.value)}
                  list={'names'}
                  placeholder='이름을 적어주세요'
                  className={'w-full rounded border border-black px-3 h-10 text-black'}
                  autoComplete='off'
                  inputMode='text'
                />
              </div>
              )
            )
          })}
          <button
            type="submit"
            className="flex-1 rounded bg-white text-black px-4 py-3"
            >
            제출하기
          </button>
        </form>
        {submitted && (
          <section className="mt-5 text-center">
            {allCorrect ? (
              <div className="rounded text-black bg-white border p-5 shadow-sm">
                <div className="text-2xl font-bold mb-1">🎉 축하합니다!</div>
                <p className="text-gray-600">모든 항목을 정확히 맞췄어요. <br/>얼른 진행자에게 알리세요!</p>
              </div>
            ) : (
              <div className="rounded text-black bg-white border p-5 shadow-sm">
                <div className="text-lg font-semibold">
                  맞춘 개수: {correctCount} / {quiz.length}
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
