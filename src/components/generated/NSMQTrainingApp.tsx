import React, { useEffect, useMemo, useState } from "react";
type Subject = "Biology" | "Chemistry" | "Physics" | "Mathematics";
type Round = "Fundamentals" | "Speed Race" | "Problem of the Day" | "True / False" | "Riddles";
type Q = {
  id: string;
  subject: Subject;
  topic: string;
  round: Round;
  level: string;
  prompt: string;
  answer: string;
  explanation: string;
  options?: string[];
  clues?: string[];
  hint?: string;
  source: string;
};
const subjects: Subject[] = ["Biology", "Chemistry", "Physics", "Mathematics"];
const rounds: Round[] = ["Fundamentals", "Speed Race", "Problem of the Day", "True / False", "Riddles"];
const seed: Q[] = [{
  id: "b1",
  subject: "Biology",
  topic: "Cell biology",
  round: "Fundamentals",
  level: "Foundation",
  prompt: "Which organelle is the principal site of aerobic respiration in a typical eukaryotic cell?",
  options: ["Ribosome", "Mitochondrion", "Golgi apparatus", "Lysosome"],
  answer: "Mitochondrion",
  explanation: "Mitochondria contain the enzymes and electron-transport machinery used in aerobic respiration and ATP production.",
  source: "Original demo question; verify with an SHS Biology text."
}, {
  id: "b2",
  subject: "Biology",
  topic: "Genetics",
  round: "Speed Race",
  level: "Intermediate",
  prompt: "In a monohybrid cross Aa × Aa, what fraction of offspring is expected to be homozygous recessive?",
  answer: "1/4",
  explanation: "The possible genotypes are AA, Aa, Aa and aa. One out of four is homozygous recessive.",
  source: "Original demo question; standard Mendelian genetics."
}, {
  id: "b3",
  subject: "Biology",
  topic: "Ecology",
  round: "True / False",
  level: "Intermediate",
  prompt: "Energy is recycled continuously between trophic levels in an ecosystem.",
  answer: "False",
  explanation: "Energy flows through ecosystems and is dissipated as heat; matter and nutrients are recycled.",
  source: "Original demo question; standard ecology."
}, {
  id: "b4",
  subject: "Biology",
  topic: "Human physiology",
  round: "Riddles",
  level: "Advanced",
  prompt: "Identify the structure.",
  clues: ["I am a muscular organ in the thoracic cavity.", "I contain four chambers and valves.", "I maintain double circulation in humans."],
  answer: "The heart",
  explanation: "The heart is a four-chambered muscular organ that pumps blood through pulmonary and systemic circuits.",
  source: "Original demo riddle; standard physiology."
}, {
  id: "c1",
  subject: "Chemistry",
  topic: "Acids and bases",
  round: "Fundamentals",
  level: "Foundation",
  prompt: "What is the pH of a neutral aqueous solution at 25 °C?",
  options: ["0", "5", "7", "14"],
  answer: "7",
  explanation: "At 25 °C, a neutral solution has equal hydrogen and hydroxide ion concentrations, giving pH 7.",
  source: "Original demo question; standard acid-base chemistry."
}, {
  id: "c2",
  subject: "Chemistry",
  topic: "Mole concept",
  round: "Speed Race",
  level: "Intermediate",
  prompt: "How many moles are present in 9.0 g of water? (H=1, O=16)",
  answer: "0.50 mol",
  explanation: "Molar mass of H₂O = 18 g mol⁻¹. Amount = 9.0 ÷ 18 = 0.50 mol.",
  source: "Original demo question; standard stoichiometry."
}, {
  id: "c3",
  subject: "Chemistry",
  topic: "Electrolysis",
  round: "True / False",
  level: "Intermediate",
  prompt: "During electrolysis, oxidation occurs at the anode.",
  answer: "True",
  explanation: "Oxidation is loss of electrons and occurs at the anode.",
  source: "Original demo question; standard electrochemistry."
}, {
  id: "c4",
  subject: "Chemistry",
  topic: "Periodic table",
  round: "Riddles",
  level: "Advanced",
  prompt: "Identify the element.",
  clues: ["I am a halogen in Period 3.", "My molecules are diatomic.", "I form a bleaching gas when dissolved in water."],
  answer: "Chlorine",
  explanation: "Chlorine (Cl₂) is a Period 3 halogen and dissolves in water to form chlorine water.",
  source: "Original demo riddle; standard inorganic chemistry."
}, {
  id: "p1",
  subject: "Physics",
  topic: "Electricity",
  round: "Fundamentals",
  level: "Foundation",
  prompt: "A 12 V potential difference is applied across a 4 Ω resistor. What current flows?",
  options: ["0.3 A", "3 A", "8 A", "48 A"],
  answer: "3 A",
  explanation: "By Ohm’s law, I = V/R = 12/4 = 3 A.",
  source: "Original demo question; standard electricity."
}, {
  id: "p2",
  subject: "Physics",
  topic: "Motion",
  round: "Speed Race",
  level: "Intermediate",
  prompt: "A body starts from rest and accelerates uniformly at 2 m s⁻² for 5 s. Find its final velocity.",
  answer: "10 m/s",
  explanation: "Using v = u + at: v = 0 + (2 × 5) = 10 m s⁻¹.",
  source: "Original demo question; standard kinematics."
}, {
  id: "p3",
  subject: "Physics",
  topic: "Waves",
  round: "True / False",
  level: "Intermediate",
  prompt: "The frequency of a wave changes when it enters a different medium, even if the source remains unchanged.",
  answer: "False",
  explanation: "The source fixes frequency. Speed and wavelength may change between media, but frequency remains constant.",
  source: "Original demo question; standard wave physics."
}, {
  id: "p4",
  subject: "Physics",
  topic: "Electromagnetism",
  round: "Riddles",
  level: "Advanced",
  prompt: "Identify the law.",
  clues: ["I relate induced e.m.f. to the rate of change of magnetic flux linkage.", "The induced current opposes the change producing it.", "My sign convention includes a negative sign."],
  answer: "Faraday’s law with Lenz’s law",
  explanation: "Faraday’s law gives induced e.m.f.; Lenz’s law gives its opposing direction, represented by the negative sign.",
  source: "Original demo riddle; standard electromagnetism."
}, {
  id: "m1",
  subject: "Mathematics",
  topic: "Algebra",
  round: "Fundamentals",
  level: "Foundation",
  prompt: "Solve: 3x − 7 = 11.",
  options: ["4", "6", "8", "18"],
  answer: "6",
  explanation: "3x = 18, therefore x = 6.",
  source: "Original demo question; standard algebra."
}, {
  id: "m2",
  subject: "Mathematics",
  topic: "Trigonometry",
  round: "Speed Race",
  level: "Intermediate",
  prompt: "Evaluate sin 30° + cos 60°.",
  answer: "1",
  explanation: "sin 30° = 1/2 and cos 60° = 1/2. Their sum is 1.",
  source: "Original demo question; standard trigonometry."
}, {
  id: "m3",
  subject: "Mathematics",
  topic: "Statistics",
  round: "True / False",
  level: "Intermediate",
  prompt: "The mean of a data set must always be one of the values in that data set.",
  answer: "False",
  explanation: "The mean can be a value absent from the data; for example, the mean of 1 and 2 is 1.5.",
  source: "Original demo question; standard statistics."
}, {
  id: "m4",
  subject: "Mathematics",
  topic: "Number theory",
  round: "Riddles",
  level: "Advanced",
  prompt: "Does a positive integer less than 30 exist that is divisible by both 3 and 5 and is a perfect square?",
  answer: "No",
  explanation: "A number divisible by 3 and 5 is divisible by 15. The smallest positive perfect square divisible by 15 is 225, which is not less than 30.",
  source: "Original demo reasoning riddle; designed to test consistency."
}, {
  id: "m5",
  subject: "Mathematics",
  topic: "Geometry",
  round: "Problem of the Day",
  level: "Advanced",
  prompt: "A rectangle has perimeter 34 cm. Its length is 3 cm more than its width. Find its area.",
  answer: "70 cm²",
  explanation: "Let width = w and length = w + 3. Then 2(2w + 3) = 34, so w = 7 cm and length = 10 cm. Area = 70 cm².",
  source: "Original demo problem; standard mensuration."
}];
const uid = () => Math.random().toString(36).slice(2, 9);
const load = <T,>(k: string, d: T): T => {
  try {
    const x = localStorage.getItem(k);
    return x ? JSON.parse(x) : d;
  } catch {
    return d;
  }
};
const norm = (s: string) => s.toLowerCase().trim().replace(/[.,!?]/g, "").replace(/\s+/g, " ");
const same = (a: string, b: string) => norm(a) === norm(b);
export const NSMQTrainingApp = () => {
  const [bank, setBank] = useState<Q[]>(() => load("qf_bank", seed));
  const [team, setTeam] = useState(() => load("qf_team", "THE SCHOLARS"));
  const [members, setMembers] = useState(() => load("qf_members", [{
    id: "1",
    name: "Team Captain",
    role: "Captain"
  }, {
    id: "2",
    name: "Contestant 2",
    role: "Contestant"
  }, {
    id: "3",
    name: "Reserve",
    role: "Reserve"
  }]));
  const [history, setHistory] = useState<any[]>(() => load("qf_history", []));
  const [page, setPage] = useState("Overview"),
    [round, setRound] = useState<Round>("Fundamentals"),
    [subject, setSubject] = useState("All subjects"),
    [level, setLevel] = useState("All levels"),
    [qty, setQty] = useState(8),
    [limit, setLimit] = useState(20),
    [style, setStyle] = useState("Team rotation");
  const [session, setSession] = useState<Q[]>([]),
    [pos, setPos] = useState(0),
    [answer, setAnswer] = useState(""),
    [done, setDone] = useState(false),
    [revealed, setRevealed] = useState(false),
    [hint, setHint] = useState(false),
    [score, setScore] = useState(0),
    [left, setLeft] = useState(20),
    [started, setStarted] = useState(0),
    [turn, setTurn] = useState(0),
    [clueCount, setClueCount] = useState(1);
  const [mentalMode, setMentalMode] = useState("Quick Fire"), [mentalIndex, setMentalIndex] = useState(0), [mentalAnswer, setMentalAnswer] = useState(""), [mentalScore, setMentalScore] = useState(0), [mentalActive, setMentalActive] = useState(false), [mentalLeft, setMentalLeft] = useState(15), [mentalFeedback, setMentalFeedback] = useState(""), [mentalTurn, setMentalTurn] = useState(0);
  const mentalQuestions = [{topic:"Arithmetic",prompt:"48 ÷ 6 × 3",answer:"24",explanation:"Work left to right: 48 ÷ 6 = 8, then 8 × 3 = 24."},{topic:"Fractions",prompt:"Find 3/4 of 64.",answer:"48",explanation:"64 ÷ 4 = 16; 16 × 3 = 48."},{topic:"Percentages",prompt:"Find 15% of 200.",answer:"30",explanation:"10% is 20 and 5% is 10; total = 30."},{topic:"Ratio",prompt:"Share 72 in the ratio 5:3. What is the larger share?",answer:"45",explanation:"Total parts = 8; one part = 9; larger share = 5 × 9 = 45."},{topic:"Algebra",prompt:"If 3x + 5 = 26, find x.",answer:"7",explanation:"3x = 21, so x = 7."},{topic:"Indices",prompt:"Evaluate 2⁵ × 2².",answer:"128",explanation:"Add powers with the same base: 2⁷ = 128."},{topic:"Physics",prompt:"A car travels 150 m in 10 s. Find its average speed in m/s.",answer:"15",explanation:"Speed = distance ÷ time = 150 ÷ 10 = 15 m/s."},{topic:"Arithmetic",prompt:"Evaluate 17² − 16².",answer:"33",explanation:"Difference of squares: (17−16)(17+16) = 33."},{topic:"Fractions",prompt:"Express 0.375 as a fraction in simplest form.",answer:"3/8",explanation:"0.375 = 375/1000 = 3/8."},{topic:"Chemistry",prompt:"How many moles are in 36 g of water? (Mᵣ = 18)",answer:"2",explanation:"Amount = mass ÷ molar mass = 36 ÷ 18 = 2 mol."},{topic:"Percentages",prompt:"A value rises from 80 to 100. Find the percentage increase.",answer:"25",explanation:"Increase = 20; (20/80) × 100 = 25%."},{topic:"Algebra",prompt:"Solve 2(x − 3) = 18.",answer:"12",explanation:"x − 3 = 9, therefore x = 12."}];
  const [newMember, setNewMember] = useState(""),
    [toast, setToast] = useState(""),
    [draft, setDraft] = useState({
      subject: "Biology" as Subject,
      topic: "",
      round: "Fundamentals" as Round,
      level: "Intermediate",
      prompt: "",
      answer: "",
      explanation: ""
    });
  useEffect(() => {
    localStorage.setItem("qf_bank", JSON.stringify(bank));
  }, [bank]);
  useEffect(() => {
    localStorage.setItem("qf_team", JSON.stringify(team));
  }, [team]);
  useEffect(() => {
    localStorage.setItem("qf_members", JSON.stringify(members));
  }, [members]);
  useEffect(() => {
    localStorage.setItem("qf_history", JSON.stringify(history));
  }, [history]);
  const q = session[pos],
    attempts = history.length,
    correct = history.filter(x => x.ok).length,
    accuracy = attempts ? Math.round(correct / attempts * 100) : 0;
  const stats = subjects.map(s => {
    const a = history.filter(x => x.subject === s);
    return {
      s,
      n: a.length,
      p: a.length ? Math.round(a.filter(x => x.ok).length / a.length * 100) : 0
    };
  });
  useEffect(() => {
    if (!q || revealed || done) return;
    if (left <= 0) {
      setRevealed(true);
      return;
    }
    const t = window.setTimeout(() => setLeft(v => v - 1), 1000);
    return () => window.clearTimeout(t);
  }, [left, q, revealed, done]);
  const start = () => {
    let pool = bank.filter(x => x.round === round && (subject === "All subjects" || x.subject === subject) && (level === "All levels" || x.level === level));
    if (!pool.length) pool = bank.filter(x => subject === "All subjects" || x.subject === subject);
    if (!pool.length) {
      setToast("No questions match these filters.");
      return;
    }
    setSession([...pool].sort(() => Math.random() - .5).slice(0, Math.min(qty, pool.length)));
    setPos(0);
    setAnswer("");
    setRevealed(false);
    setHint(false);
    setClueCount(1);
    setDone(false);
    setScore(0);
    setLeft(round === "Problem of the Day" ? 240 : limit);
    setStarted(Date.now());
    setTurn(0);
    setPage("Train");
  };
  const submit = () => {
    if (!q || revealed || !answer.trim()) return;
    const ok = same(answer, q.answer) || q.answer === "False" && norm(answer) === "false" || q.answer === "True" && norm(answer) === "true";
    const elapsed = Math.round((Date.now() - started) / 1000);
    const points = ok ? round === "Problem of the Day" ? 10 : round === "Speed Race" ? 3 : round === "True / False" ? 2 : round === "Riddles" ? Math.max(3, 6 - clueCount) : 1 : 0;
    setScore(v => v + points);
    setHistory(v => [...v, {
      id: uid(),
      subject: q.subject,
      topic: q.topic,
      ok,
      seconds: elapsed,
      date: new Date().toISOString()
    }]);
    setRevealed(true);
  };
  const next = () => {
    if (pos + 1 >= session.length) {
      setDone(true);
      return;
    }
    setPos(v => v + 1);
    setAnswer("");
    setRevealed(false);
    setHint(false);
    setClueCount(1);
    setLeft(round === "Problem of the Day" ? 240 : limit);
    setStarted(Date.now());
    if (style === "Team rotation") setTurn(v => (v + 1) % Math.max(1, members.length));
  };
  const exportBank = () => {
    const blob = new Blob([JSON.stringify(bank, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quizforge-question-bank.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  const importBank = (f?: File) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const data = JSON.parse(String(r.result));
        if (!Array.isArray(data)) throw Error();
        setBank(v => [...v, ...data]);
        setToast("Question bank imported.");
      } catch {
        setToast("Import failed: invalid JSON question bank.");
      }
    };
    r.readAsText(f);
  };
  const addQuestion = () => {
    if (!draft.topic.trim() || !draft.prompt.trim() || !draft.answer.trim()) {
      setToast("Enter a topic, question and answer.");
      return;
    }
    setBank(v => [{
      ...draft,
      id: uid(),
      source: "Team-authored; coach verification pending."
    } as Q, ...v]);
    setDraft(v => ({
      ...v,
      topic: "",
      prompt: "",
      answer: "",
      explanation: ""
    }));
    setToast("Question added.");
  };
  const nav = ["Overview", "Train", "Mental Math", "Team room", "Performance", "Question bank"];
  const card = "rounded-2xl border border-white/10 bg-white/[.04] p-5";
  const btn = "rounded-xl bg-cyan-300 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-200";
  return <div className="min-h-screen bg-[#080d18] text-slate-100"><div className="mx-auto flex min-h-screen max-w-[1440px]">
 <aside className="hidden w-60 shrink-0 border-r border-white/10 bg-slate-950/70 p-5 lg:flex lg:flex-col"><div className="mb-9 flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-300 text-xl font-black text-slate-950">Q</div><div><b>QUIZFORGE</b><div className="text-[10px] uppercase tracking-widest text-cyan-300">JUABEN SHS · NSMQ LAB</div></div></div><div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Workspace</div>{nav.map((n, i) => <button key={n} onClick={() => setPage(n)} className={"mb-1 rounded-xl px-3 py-3 text-left text-sm " + (page === n ? "bg-cyan-300/10 text-cyan-200" : "text-slate-400 hover:bg-white/5")}>{["◈", "ϟ", "♟", "▥", "▤"][i]}　{n}</button>)}<div className="mt-auto rounded-xl bg-cyan-300/5 p-4 text-xs leading-5 text-slate-400"><b className="text-cyan-200">TRAIN WITH PURPOSE</b><p className="mt-2">Short drills. Honest feedback. Better team decisions.</p></div></aside>
 <main className="min-w-0 flex-1 px-4 pb-24 pt-5 sm:px-7 lg:px-9 lg:pb-10"><header className="mb-7 flex flex-wrap items-center justify-between gap-3"><div><div className="text-xs font-bold uppercase tracking-widest text-cyan-300">Juaben Senior High School / Ghana</div><h1 className="mt-1 text-2xl font-black sm:text-3xl">{page === "Overview" ? "Ready for the next round?" : page}</h1><p className="mt-1 text-sm text-slate-400">{team} · Independent team practice</p></div><span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs text-emerald-200">● Saved on this device</span></header>
 {toast && <div className="mb-4 flex justify-between rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-sm text-cyan-100">{toast}<button onClick={() => setToast("")}>×</button></div>}
 {page === "Overview" && <div className="space-y-5"><section className="rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-[#10283b] to-[#21183e] p-6 sm:p-9"><div className="text-xs font-bold uppercase tracking-widest text-cyan-200">Today's team challenge</div><h2 className="mt-3 text-3xl font-black sm:text-4xl">Think faster.<br /><span className="text-cyan-300">Reason deeper.</span></h2><p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">Practise all five NSMQ round styles, rotate team turns and learn from every answer.</p><button onClick={() => setPage("Train")} className={"mt-6 " + btn}>Set up a drill →</button></section>
 <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">{[{
              l: "Team accuracy",
              v: accuracy + "%",
              s: correct + " correct answers"
            }, {
              l: "Attempts",
              v: attempts,
              s: "Saved practice history"
            }, {
              l: "Question bank",
              v: bank.length,
              s: "Original + team-added"
            }, {
              l: "Team members",
              v: members.length,
              s: "Roster"
            }].map(x => <div key={x.l} className={card}><div className="text-xs text-slate-400">{x.l}</div><div className="mt-2 text-3xl font-black">{x.v}</div><div className="mt-1 text-xs text-slate-500">{x.s}</div></div>)}</section>
 <section className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]"><div className={card}><h3 className="font-bold">Choose a training format</h3><p className="mb-4 mt-1 text-xs text-slate-500">Train the skill each round demands</p><div className="grid gap-3 sm:grid-cols-2">{rounds.map((r, i) => <button key={r} onClick={() => {
                  setRound(r);
                  setPage("Train");
                }} className="rounded-xl border border-white/10 bg-slate-900/70 p-4 text-left hover:border-cyan-300/40"><div className="text-xs text-cyan-300">ROUND 0{i + 1}</div><b className="mt-2 block">{r}</b><p className="mt-1 text-xs leading-5 text-slate-500">{["Balanced subject foundations", "Fast recall and response", "Multi-step problem solving", "Precision and judgement", "Progressive scientific clues"][i]}</p></button>)}</div></div><div className={card}><h3 className="font-bold">Subject balance</h3><p className="mt-1 text-xs text-slate-500">Based on recorded attempts</p><div className="mt-5 space-y-4">{stats.map(s => <div key={s.s}><div className="mb-1 flex justify-between text-xs"><span>{s.s}</span><span className="text-cyan-200">{s.n ? s.p + "%" : "Not tested"}</span></div><div className="h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-cyan-300" style={{
                      width: s.p + "%"
                    }} /></div></div>)}</div><button onClick={() => setPage("Performance")} className="mt-5 text-xs font-bold text-cyan-300">View report →</button></div></section>
 <section className={card}><div className="flex justify-between"><div><b>Team room</b><p className="mt-1 text-xs text-slate-500">Roster and rotating turns</p></div><button onClick={() => setPage("Team room")} className="text-xs text-cyan-300">Manage →</button></div><div className="mt-4 flex flex-wrap gap-2">{members.map(m => <span key={m.id} className="rounded-xl bg-slate-900 px-3 py-2 text-sm">{m.name} <span className="text-xs text-slate-500">· {m.role}</span></span>)}</div></section></div>}
 {page === "Train" && (!session.length || done) && <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[.04] p-5 sm:p-8"><div className="text-xs font-bold uppercase tracking-widest text-cyan-300">Drill configuration</div><h2 className="mt-2 text-2xl font-black">Build your session</h2><p className="mt-1 text-sm text-slate-400">Choose round, subject mix and challenge level.</p>{done && <div className="my-4 rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm"><b className="text-emerald-200">Session complete</b><p className="mt-1">You scored {score} points across {session.length} questions.</p><button onClick={() => {
              setSession([]);
              setDone(false);
            }} className="mt-2 text-xs text-emerald-200">New session →</button></div>}<div className="mt-5 grid gap-4 sm:grid-cols-2">{[{
              l: "Training format",
              v: round,
              change: (v: string) => setRound(v as Round),
              opts: rounds
            }, {
              l: "Subject",
              v: subject,
              change: setSubject,
              opts: ["All subjects", ...subjects]
            }, {
              l: "Difficulty",
              v: level,
              change: setLevel,
              opts: ["All levels", "Foundation", "Intermediate", "Advanced"]
            }, {
              l: "Questions",
              v: String(qty),
              change: (v: string) => setQty(Number(v)),
              opts: ["4", "6", "8", "10", "12", "16"]
            }, {
              l: "Seconds per question",
              v: String(limit),
              change: (v: string) => setLimit(Number(v)),
              opts: ["10", "15", "20", "30", "45", "60"]
            }, {
              l: "Session style",
              v: style,
              change: setStyle,
              opts: ["Team rotation", "Individual practice"]
            }].map(x => <label key={x.l} className="text-xs text-slate-300">{x.l}<select value={x.v} onChange={e => x.change(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-sm text-white">{x.opts.map(o => <option key={o}>{o}</option>)}</select></label>)}</div><div className="mt-5 rounded-xl bg-cyan-300/5 p-4 text-xs leading-5 text-slate-400">{round === "Problem of the Day" ? "A four-minute timer and 10-point problem." : round === "Riddles" ? "Reveal clues progressively; earlier answers earn more points." : round === "True / False" ? "Practice scoring: +2 for a correct response." : round === "Speed Race" ? "Practice scoring: up to 3 points for a correct response." : "Fundamentals rotates across science and mathematics."}</div><button onClick={start} className={"mt-5 w-full " + btn}>Start session →</button></div>}
 {page === "Mental Math" && <div className="mx-auto max-w-3xl space-y-5"><section className="rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-[#10283b] to-[#21183e] p-6"><div className="text-xs font-bold uppercase tracking-widest text-cyan-200">Juaben SHS · Mental Math Arena</div><h2 className="mt-2 text-3xl font-black">Calculate under pressure.</h2><p className="mt-2 text-sm text-slate-300">Build speed and accuracy across mathematics and science calculations.</p></section><section className={card}><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{["Quick Fire","Accuracy Mode","Mixed Challenge","Team Relay"].map(m => <button key={m} onClick={() => {setMentalMode(m);setMentalActive(false);setMentalFeedback("");setMentalIndex(0);setMentalScore(0);setMentalLeft(15);setMentalAnswer("");}} className={"rounded-xl border p-3 text-xs font-bold " + (mentalMode===m ? "border-cyan-300 bg-cyan-300/10 text-cyan-200" : "border-white/10 text-slate-400")}>{m}</button>)}</div><div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400"><span>{mentalMode} · {mentalQuestions[mentalIndex % mentalQuestions.length].topic}</span><span>Score: {mentalScore} · Question {(mentalIndex % mentalQuestions.length)+1}/{mentalQuestions.length}</span></div><div className="mt-4 rounded-2xl bg-slate-900 p-5 sm:p-7"><div className="text-xs uppercase tracking-widest text-cyan-300">Solve</div><h3 className="mt-3 text-2xl font-black leading-relaxed">{mentalQuestions[mentalIndex % mentalQuestions.length].prompt}</h3>{mentalMode === "Quick Fire" && <div className="mt-3 text-sm font-bold text-amber-200">Time remaining: {mentalLeft}s</div>}{mentalMode === "Team Relay" && <div className="mt-2 text-xs text-cyan-200">Answering: {members[mentalTurn % Math.max(1,members.length)]?.name || "Team member"}</div>}<input value={mentalAnswer} onChange={e=>setMentalAnswer(e.target.value)} disabled={!!mentalFeedback} placeholder="Enter your answer…" className="mt-5 w-full rounded-xl border border-white/10 bg-[#080d18] p-4 text-base text-white outline-none focus:border-cyan-300"/>{mentalFeedback && <div className="mt-4 rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-6 text-slate-200">{mentalFeedback}</div>}<div className="mt-4 flex flex-wrap gap-2">{!mentalActive && !mentalFeedback && <button onClick={()=>{setMentalActive(true);setMentalLeft(mentalMode==="Quick Fire"?15:9999);}} className={btn}>Start question</button>}{!mentalFeedback && <button onClick={()=>{const qx=mentalQuestions[mentalIndex % mentalQuestions.length];if(!mentalAnswer.trim())return;const ok=norm(mentalAnswer)===norm(qx.answer);setMentalFeedback(ok ? "Correct. " + qx.explanation : "Not quite. Answer: " + qx.answer + ". " + qx.explanation);if(ok)setMentalScore(s=>s+1);setMentalActive(false);}} className="rounded-xl border border-white/10 px-4 py-3 text-sm font-bold">Check answer</button>}{mentalFeedback && <button onClick={()=>{setMentalIndex(i=>i+1);setMentalAnswer("");setMentalFeedback("");setMentalLeft(15);setMentalActive(false);if(mentalMode==="Team Relay")setMentalTurn(t=>(t+1)%Math.max(1,members.length));}} className={btn}>Next question →</button>}</div></div><p className="mt-4 text-xs leading-5 text-slate-500">Accuracy Mode is untimed. Quick Fire uses a 15-second response window. Mixed Challenge combines topics. Team Relay rotates the answering contestant. Original practice examples; teacher review recommended.</p></section></div>}
 {page === "Train" && session.length > 0 && !done && q && <div className="mx-auto max-w-3xl"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><div className="text-xs font-bold uppercase tracking-widest text-cyan-300">{round} · {style}</div><div className="mt-1 text-sm text-slate-400">Question {pos + 1} of {session.length} · {q.subject} / {q.topic}</div></div><div className={"rounded-xl border px-4 py-2 text-lg font-black " + (left <= 5 ? "border-rose-300/30 text-rose-200" : "border-cyan-300/20 text-cyan-200")}>00:{String(left).padStart(2, "0")}</div></div><div className="mb-3 h-1.5 rounded-full bg-white/10"><div className="h-1.5 rounded-full bg-cyan-300" style={{
              width: (pos + 1) / session.length * 100 + "%"
            }} /></div><section className="rounded-3xl border border-white/10 bg-white/[.04] p-5 sm:p-8"><div className="mb-4 flex flex-wrap gap-2"><span className="rounded-full bg-violet-300/10 px-3 py-1 text-xs text-violet-200">{q.subject}</span><span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">{q.level}</span>{style === "Team rotation" && <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">Answering: {members[turn]?.name || "Team"}</span>}</div><h2 className="text-xl font-bold leading-relaxed sm:text-2xl">{q.prompt}</h2>{q.clues && <div className="mt-5 space-y-2">{q.clues.slice(0, clueCount).map((c, i) => <div key={i} className="rounded-xl bg-slate-900 p-3 text-sm"><span className="mr-2 text-cyan-300">CLUE {i + 1}</span>{c}</div>)}<button onClick={() => {
                setHint(true);
                setClueCount(v => Math.min(3, v + 1));
              }} className="text-xs font-bold text-cyan-300">Reveal next clue ↓</button></div>}{q.options ? <div className="mt-6 grid gap-2 sm:grid-cols-2">{q.options.map((o, i) => <button key={o} disabled={revealed} onClick={() => setAnswer(o)} className={"rounded-xl border p-4 text-left text-sm " + (answer === o ? "border-cyan-300 bg-cyan-300/10" : "border-white/10 bg-slate-900")}>{String.fromCharCode(65 + i)}.　{o}</button>)}</div> : <input value={answer} disabled={revealed} onChange={e => setAnswer(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} placeholder="Type your answer…" className="mt-6 w-full rounded-xl border border-white/10 bg-slate-900 p-4 text-sm text-white outline-none focus:border-cyan-300" />}{!revealed ? <div className="mt-5 flex gap-3"><button onClick={submit} disabled={!answer.trim()} className={"flex-1 " + btn}>Submit answer</button>{q.hint && <button onClick={() => setHint(true)} className="rounded-xl border border-white/10 px-4 text-sm">Hint</button>}</div> : <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4"><b className="text-emerald-200">{same(answer, q.answer) ? "Correct answer" : "Review this one"}</b><p className="mt-2 text-sm">Correct answer: <b>{q.answer}</b></p><p className="mt-2 text-sm leading-6 text-slate-300">{q.explanation}</p><button onClick={next} className="mt-4 w-full rounded-xl bg-emerald-300 py-3 font-bold text-slate-950">{pos + 1 === session.length ? "Finish session" : "Next question →"}</button></div>}</section><div className="mt-3 flex justify-between text-xs text-slate-500"><span>Session points: {score}</span><button onClick={() => setDone(true)} className="text-rose-300">End session</button></div></div>}
 {page === "Team room" && <div className="grid gap-5 xl:grid-cols-2"><section className={card}><h2 className="font-bold">Team identity</h2><label className="mt-4 block text-xs text-slate-400">Team name<input value={team} onChange={e => setTeam(e.target.value.toUpperCase())} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-sm text-white" /></label><h3 className="mt-6 font-bold">Roster & roles</h3><div className="mt-3 space-y-2">{members.map(m => <div key={m.id} className="flex items-center justify-between rounded-xl bg-slate-900 p-3"><div><b className="text-sm">{m.name}</b><div className="text-xs text-slate-500">{m.role}</div></div><button onClick={() => setMembers(v => v.filter(x => x.id !== m.id))} className="text-xs text-rose-300">Remove</button></div>)}</div><div className="mt-4 flex gap-2"><input value={newMember} onChange={e => setNewMember(e.target.value)} placeholder="Add member" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-900 p-3 text-sm" /><button onClick={() => {
                if (newMember.trim()) {
                  setMembers(v => [...v, {
                    id: uid(),
                    name: newMember.trim(),
                    role: v.length ? "Contestant" : "Captain"
                  }]);
                  setNewMember("");
                }
              }} className={btn}>Add</button></div></section><section className={card}><h2 className="font-bold">Team session protocol</h2><div className="mt-4 space-y-4 text-sm text-slate-300">{["Set the round and timer before starting.", "Rotate the answering turn fairly across members.", "Discuss the reasoning after each answer.", "Use the performance report to select the next weak topic."].map((x, i) => <div key={x} className="flex gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-cyan-300/10 text-cyan-200">{i + 1}</span><p className="pt-1">{x}</p></div>)}</div></section></div>}
 {page === "Performance" && <div className="space-y-5"><section className="grid grid-cols-2 gap-3 xl:grid-cols-4">{[{
              l: "Accuracy",
              v: accuracy + "%"
            }, {
              l: "Attempts",
              v: attempts
            }, {
              l: "Correct",
              v: correct
            }, {
              l: "Avg. response",
              v: (attempts ? Math.round(history.reduce((a, x) => a + x.seconds, 0) / attempts) : 0) + "s"
            }].map(x => <div key={x.l} className={card}><div className="text-xs text-slate-400">{x.l}</div><div className="mt-2 text-3xl font-black">{x.v}</div></div>)}</section><section className={card}><h2 className="font-bold">Subject performance</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{stats.map(s => <div key={s.s} className="rounded-xl bg-slate-900 p-4"><div className="flex justify-between"><b>{s.s}</b><span className="text-cyan-200">{s.p}%</span></div><div className="mt-3 h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-cyan-300" style={{
                    width: s.p + "%"
                  }} /></div><div className="mt-2 text-xs text-slate-500">{s.n} attempts</div></div>)}</div></section><section className={card}><div className="flex justify-between"><h2 className="font-bold">Recent attempts</h2><button onClick={() => setHistory([])} className="text-xs text-rose-300">Clear history</button></div>{history.length === 0 ? <p className="mt-4 text-sm text-slate-500">Complete a drill to create your first report.</p> : <div className="mt-4 space-y-2">{[...history].reverse().slice(0, 25).map(x => <div key={x.id} className="flex justify-between rounded-xl bg-slate-900 p-3"><div><b className="text-sm">{x.topic}</b><div className="text-xs text-slate-500">{x.subject} · {new Date(x.date).toLocaleDateString()}</div></div><span className={x.ok ? "text-emerald-200" : "text-rose-200"}>{x.ok ? "Correct" : "Review"}</span></div>)}</div>}</section></div>}
 {page === "Question bank" && <div className="grid gap-5 xl:grid-cols-[.9fr_1.1fr]"><section className={card}><h2 className="font-bold">Add a team question</h2><p className="mt-1 text-xs text-slate-500">Add teacher-approved questions for future drills.</p><div className="mt-4 space-y-3">{[{
                l: "Subject",
                k: "subject",
                opts: subjects
              }, {
                l: "Round",
                k: "round",
                opts: rounds
              }, {
                l: "Difficulty",
                k: "level",
                opts: ["Foundation", "Intermediate", "Advanced"]
              }].map(x => <label key={x.k} className="block text-xs text-slate-400">{x.l}<select value={(draft as any)[x.k]} onChange={e => setDraft(v => ({
                  ...v,
                  [x.k]: e.target.value
                }))} className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-sm text-white">{x.opts.map(o => <option key={o}>{o}</option>)}</select></label>)}{[{
                l: "Topic",
                k: "topic"
              }, {
                l: "Question",
                k: "prompt"
              }, {
                l: "Correct answer",
                k: "answer"
              }, {
                l: "Explanation",
                k: "explanation"
              }].map(x => <label key={x.k} className="block text-xs text-slate-400">{x.l}{x.k === "prompt" || x.k === "explanation" ? <textarea value={(draft as any)[x.k]} onChange={e => setDraft(v => ({
                  ...v,
                  [x.k]: e.target.value
                }))} rows={3} className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-sm text-white" /> : <input value={(draft as any)[x.k]} onChange={e => setDraft(v => ({
                  ...v,
                  [x.k]: e.target.value
                }))} className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-sm text-white" />}</label>)}<button onClick={addQuestion} className={"w-full " + btn}>Add to question bank</button></div></section><section className={card}><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-bold">Question bank</h2><p className="mt-1 text-xs text-slate-500">{bank.length} questions · locally saved</p></div><div className="flex gap-2"><button onClick={exportBank} className="rounded-lg border border-white/10 px-3 py-2 text-xs">Export JSON</button><label className="cursor-pointer rounded-lg border border-white/10 px-3 py-2 text-xs">Import JSON<input type="file" accept="application/json" className="hidden" onChange={e => importBank(e.target.files?.[0])} /></label></div></div><div className="mt-4 space-y-2">{bank.map(x => <details key={x.id} className="rounded-xl bg-slate-900 p-3"><summary className="cursor-pointer"><div className="text-xs font-bold text-cyan-200">{x.subject} · {x.topic} · {x.round}</div><div className="mt-1 text-sm font-semibold">{x.prompt}</div></summary><div className="mt-3 border-t border-white/10 pt-3 text-xs leading-5 text-slate-400"><b className="text-slate-200">Answer: {x.answer}</b><p className="mt-1">{x.explanation}</p><p className="mt-2 text-[10px] text-slate-600">{x.source}</p><button onClick={() => setBank(v => v.filter(q => q.id !== x.id))} className="mt-2 text-rose-300">Remove</button></div></details>)}</div></section></div>}
 <footer className="mt-10 border-t border-white/10 pt-5 text-[10px] leading-5 text-slate-600">Independent practice prototype; not affiliated with Primetime or the official NSMQ. Seed questions are original demonstration items, not official past questions. Have a teacher verify academic content before competition use. Data is stored in this browser on this device.</footer></main>
 <nav className="fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t border-white/10 bg-[#080d18]/95 px-1 py-2 backdrop-blur lg:hidden">{nav.map((n, i) => <button key={n} onClick={() => setPage(n)} className={"flex flex-col items-center gap-1 px-2 py-1 text-[10px] " + (page === n ? "text-cyan-200" : "text-slate-500")}><span className="text-lg">{["◈", "ϟ", "♟", "▥", "▤"][i]}</span><span>{["Home", "Train", "Team", "Stats", "Bank"][i]}</span></button>)}</nav></div></div>;
};