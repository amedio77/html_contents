(async function(){
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const app = $('#app');

  const cfg = await fetch('quiz.config.json').then(r=>r.json());
  const SFX = {
    select: $('#sfx-select'),
    next: $('#sfx-next'),
    intro: $('#sfx-intro'),
    result: $('#sfx-result')
  };
  const play = key => cfg.meta?.sounds?.enabled && SFX[key]?.currentTime !== undefined && (SFX[key].currentTime=0, SFX[key].play().catch(()=>{}));

  let state = {
    track: 'adult', // 'youth' | 'adult'
    i: 0,
    answers: {},
    score: 0,
  };

  const shuffle = (arr) => arr.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(v=>v[1]);

  function renderIntro(){
    app.innerHTML = '';
    const t = document.importNode($('#tpl-intro').content, true);
    t.querySelector('.title').textContent = cfg.meta.title;
    t.querySelector('.desc').textContent = cfg.meta.intro?.description || '투자성향 진단 테스트를 시작합니다.';
    t.querySelectorAll('[data-role="start"]').forEach(btn=>{
      btn.addEventListener('click', e=>{
        state.track = btn.dataset.target;
        play('intro');
        startQuiz();
      });
    });
    app.appendChild(t);
  }

  function visibleQuestions(){
    let qs = cfg.questions.filter(q=>!q.tracks || q.tracks.includes(state.track));
    if(cfg.meta.shuffleQuestions) qs = shuffle(qs);
    return qs;
  }

  function startQuiz(){
    state.i = 0; state.answers = {}; state.score = 0;
    renderQuestion();
  }

  function renderQuestion(){
    const qs = visibleQuestions();
    const total = qs.length;
    const q = qs[state.i];
    if(!q){ return renderResult(); }

    app.innerHTML = '';
    const t = document.importNode($('#tpl-question').content, true);
    t.querySelector('#q-title').textContent = `Q${state.i+1}. ${q.text}`;
    const bar = t.querySelector('.progress .bar');
    bar.style.width = `${((state.i)/total)*100}%`;

    const group = t.querySelector('.choices');
    const nextBtn = t.querySelector('[data-role="next"]');

    let choices = [...q.choices];
    if(cfg.meta.shuffleChoices) choices = shuffle(choices);

    choices.forEach((c, idx)=>{
      const item = document.createElement('button');
      item.className = 'choice';
      item.setAttribute('role','radio');
      item.setAttribute('aria-checked','false');
      item.setAttribute('data-id', c.id);
      item.innerHTML = `<span class="choice-key">${idx+1}</span><span class="choice-text">${c.text}</span>`;

      item.addEventListener('click', ()=> select(c, item, q, nextBtn));
      item.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); select(c, item, q, nextBtn);} });

      group.appendChild(item);
    });

    nextBtn.textContent = state.i === total-1 ? '결과 보기' : '다음';
    nextBtn.addEventListener('click', ()=>{ play(state.i === total-1 ? 'result' : 'next'); state.i++; renderQuestion(); });

    app.appendChild(t);
  }

  function select(choice, el, q, nextBtn){
    $$('.choice').forEach(b=>b.setAttribute('aria-checked','false'));
    el.setAttribute('aria-checked','true');
    nextBtn.disabled = false;
    play('select');

    state.answers[q.id] = choice.id;
    state.score = computeScore();

    const fb = $('.feedback');
    if(cfg.meta.showPerQuestionFeedback){
      fb.textContent = choice.isCorrect ? '정답입니다.' : '다음 문제로 넘어가세요.';
    } else { fb.textContent = ''; }

    if(cfg.meta.showCorrectAnswerAfterSelect && q.choices.some(c=>c.isCorrect)){
      $$('.choice').forEach(b=>{
        const id = b.getAttribute('data-id');
        if(q.choices.find(c=>c.id===id)?.isCorrect) b.style.borderColor = 'var(--primary)';
      });
    }
  }

  function computeScore(){
    const qs = visibleQuestions();
    let sum = 0;
    for(const q of qs){
      const cid = state.answers[q.id];
      if(!cid) continue;
      const ch = q.choices.find(c=>c.id===cid);
      sum += (ch?.score || 0);
    }
    return sum;
  }

  function renderResult(){
    app.innerHTML = '';
    const t = document.importNode($('#tpl-result').content, true);
    const {min, max, label, description} = (cfg.scoring.resultBands.find(b=> state.score>=b.min && state.score<=b.max) || {label:'결과 없음', description:'점수 구간 외입니다.'});
    t.querySelector('.result-band').textContent = label;
    t.querySelector('.result-desc').textContent = description;

    const parts = [];
    if(cfg.scoring.showRawScore) parts.push(`점수: ${state.score}`);
    if(cfg.scoring.showPercentage){
      const qs = visibleQuestions();
      const maxScore = qs.reduce((a,q)=>a+Math.max(...q.choices.map(c=>c.score||0)),0);
      const pct = maxScore? Math.round((state.score/maxScore)*100):0;
      parts.push(`퍼센트: ${pct}%`);
    }
    t.querySelector('.score').textContent = parts.join(' · ');

    const cta = t.querySelector('.cta');
    (cfg.resultPage?.cta || []).forEach(btn=>{
      const b = document.createElement('button');
      b.className = 'btn'; b.textContent = btn.label;
      b.addEventListener('click', ()=>{
        if(btn.action==='restart'){ renderIntro(); }
        else if(btn.action==='home'){ location.href = btn.url || './index.html'; }
      });
      cta.appendChild(b);
    });

    app.appendChild(t);
  }

  // boot
  renderIntro();
})();