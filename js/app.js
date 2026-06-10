/* ============================================================
   OceanQuiz — Application Logic
   State machine:  welcome → category → quiz → result → leaderboard
   ============================================================ */

const App = (() => {

  /* ── Constants ─────────────────────────────────────────── */
  const LS_SCORES = 'oq_scores';
  const LS_LANG   = 'oq_lang';
  const PTS_PER_Q = 10;
  const LETTERS   = ['A', 'B', 'C', 'D'];

  /* ── State ─────────────────────────────────────────────── */
  let state = {
    screen:    'welcome',
    playerName: '',
    category:  null,
    questions: [],
    qIndex:    0,
    score:     0,
    answers:   [],   // [{correct: bool, qIndex}]
    audio:     null, // HTMLAudioElement
  };

  /* ── Boot ──────────────────────────────────────────────── */
  function init() {
    const savedLang = localStorage.getItem(LS_LANG) || 'en';
    I18n.setLang(savedLang);
    updateLangBtn();
    render();
  }

  /* ── Language ───────────────────────────────────────────── */
  function toggleLang() {
    const next = I18n.getLang() === 'en' ? 'fr' : 'en';
    I18n.setLang(next);
    localStorage.setItem(LS_LANG, next);
    updateLangBtn();
    render();
  }

  function updateLangBtn() {
    const btn = document.getElementById('lang-btn');
    if (!btn) return;
    btn.textContent = I18n.getLang() === 'en' ? '🇫🇷 FR' : '🇬🇧 EN';
  }

  /* ── Scores (localStorage) ──────────────────────────────── */
  function loadScores() {
    try { return JSON.parse(localStorage.getItem(LS_SCORES)) || []; }
    catch { return []; }
  }

  function saveScore(entry) {
    const scores = loadScores();
    scores.push(entry);
    localStorage.setItem(LS_SCORES, JSON.stringify(scores));
  }

  function clearScores() {
    if (confirm(I18n.t('clear_confirm'))) {
      localStorage.removeItem(LS_SCORES);
      render();
    }
  }

  /* ── Audio helpers ──────────────────────────────────────── */
  function stopAudio() {
    if (state.audio) {
      state.audio.pause();
      state.audio.currentTime = 0;
      state.audio = null;
    }
  }

  function toggleAudio(url) {
    const btn = document.getElementById('audio-play-btn');
    const waveform = document.querySelector('.waveform');

    if (state.audio && !state.audio.paused) {
      stopAudio();
      if (btn) btn.textContent = I18n.t('btn_play_audio');
      if (waveform) waveform.classList.remove('playing');
      return;
    }

    state.audio = new Audio(url);
    state.audio.play().catch(() => {});

    if (btn) btn.textContent = I18n.t('btn_stop_audio');
    if (waveform) waveform.classList.add('playing');

    state.audio.addEventListener('ended', () => {
      stopAudio();
      if (btn) btn.textContent = I18n.t('btn_play_audio');
      if (waveform) waveform.classList.remove('playing');
    });
  }

  /* ── Navigation helpers ─────────────────────────────────── */
  function goWelcome() {
    stopAudio();
    state = { ...state, screen: 'welcome', category: null, questions: [], qIndex: 0, score: 0, answers: [] };
    render();
  }

  function goCategory() {
    stopAudio();
    state = { ...state, screen: 'category' };
    render();
  }

  function startQuiz(category) {
    stopAudio();
    const questions = Questions.getQuestions(category);
    state = { ...state, screen: 'quiz', category, questions, qIndex: 0, score: 0, answers: [] };
    render();
  }

  function goLeaderboard() {
    stopAudio();
    state = { ...state, screen: 'leaderboard' };
    render();
  }

  /* ── Quiz interaction ──────────────────────────────────── */
  function selectOption(idx) {
    // Ignore if already answered
    if (document.querySelector('.opt.correct, .opt.wrong')) return;

    stopAudio();
    const q = state.questions[state.qIndex];
    const correct = idx === q.correct;
    if (correct) state.score += PTS_PER_Q;
    state.answers.push({ correct, chosen: idx, question: q });

    // Style options
    document.querySelectorAll('.opt').forEach((el, i) => {
      el.style.pointerEvents = 'none';
      if (i === q.correct) el.classList.add('correct');
      else if (i === idx && !correct) el.classList.add('wrong');
    });

    // Show feedback
    const fb = document.getElementById('feedback');
    if (fb) {
      const lang = I18n.getLang();
      fb.innerHTML = `
        <div class="feedback ${correct ? 'correct' : 'wrong'}">
          <div class="fb-label">${correct ? I18n.t('feedback_correct') : I18n.t('feedback_wrong')}</div>
          <div class="fb-answer">${I18n.t('answer_label')} <strong>${q.options[lang][q.correct]}</strong></div>
          <div class="fb-exp">${q.explanation[lang]}</div>
        </div>
      `;
      fb.style.display = 'block';
    }

    // Show next button
    const nw = document.getElementById('next-wrap');
    if (nw) {
      const isLast = state.qIndex === state.questions.length - 1;
      nw.innerHTML = `<button class="btn btn-primary" onclick="App.nextQuestion()">
        ${isLast ? I18n.t('btn_finish') : I18n.t('btn_next')}
      </button>`;
    }

    // Update score pill
    const sp = document.getElementById('score-pill');
    if (sp) sp.textContent = `${I18n.t('score_label')}: ${state.score}`;
  }

  function nextQuestion() {
    stopAudio();
    if (state.qIndex < state.questions.length - 1) {
      state.qIndex++;
      render();
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    const total = state.questions.length * PTS_PER_Q;
    const pct   = Math.round((state.score / total) * 100);
    const name  = state.playerName.trim() || I18n.t('anonymous');
    saveScore({
      name, score: state.score, total, pct,
      category: state.category,
      ts: Date.now(),
    });
    state.screen = 'result';
    render();
  }

  /* ── Render dispatcher ──────────────────────────────────── */
  function render() {
    const app = document.getElementById('app');
    if (!app) return;
    switch (state.screen) {
      case 'welcome':     app.innerHTML = renderWelcome();     break;
      case 'category':    app.innerHTML = renderCategory();    break;
      case 'quiz':        app.innerHTML = renderQuiz();        break;
      case 'result':      app.innerHTML = renderResult();      break;
      case 'leaderboard': app.innerHTML = renderLeaderboard(); break;
    }
  }

  /* ── Screen: Welcome ────────────────────────────────────── */
  function renderWelcome() {
    return `
      <div class="screen welcome-screen">
        <div class="sonar-wrap">
          <div class="sonar-ring r1"></div>
          <div class="sonar-ring r2"></div>
          <div class="sonar-ring r3"></div>
          <div class="sonar-logo">🌊</div>
        </div>

        <h1 class="app-title">${I18n.t('app_title')}</h1>
        <p class="app-subtitle">${I18n.t('app_subtitle')}</p>
        <p class="welcome-tagline">${I18n.t('welcome_tagline').replace(/\n/g, '<br>')}</p>

        <div class="name-wrap">
          <label class="name-label" for="player-name">${I18n.t('name_label')}</label>
          <input
            id="player-name"
            class="name-input"
            type="text"
            placeholder="${I18n.t('name_placeholder')}"
            value="${escHtml(state.playerName)}"
            oninput="App.updateName(this.value)"
            maxlength="30"
          >
        </div>

        <div class="btn-group">
          <button class="btn btn-primary" onclick="App.goCategory()">
            ${I18n.t('btn_play')}
          </button>
          <button class="btn btn-outline" onclick="App.goLeaderboard()">
            ${I18n.t('btn_leaderboard')}
          </button>
        </div>
      </div>
    `;
  }

  function updateName(val) {
    state.playerName = val;
  }

  /* ── Screen: Category ───────────────────────────────────── */
  function renderCategory() {
    const cats = [
      { id: 'acoustics', icon: '🎵', keyName: 'cat_acoustics', keySub: 'cat_acoustics_sub' },
      { id: 'visual',    icon: '📊', keyName: 'cat_visual',    keySub: 'cat_visual_sub'    },
      { id: 'wave',      icon: '〰️', keyName: 'cat_wave',      keySub: 'cat_wave_sub'      },
      { id: 'mixed',     icon: '🔀', keyName: 'cat_mixed',     keySub: 'cat_mixed_sub'     },
    ];

    const cards = cats.map(c => `
      <button class="cat-card card" onclick="App.startQuiz('${c.id}')">
        <div class="cat-icon">${c.icon}</div>
        <div class="cat-name">${I18n.t(c.keyName)}</div>
        <div class="cat-sub">${I18n.t(c.keySub)}</div>
      </button>
    `).join('');

    return `
      <div class="screen category-screen">
        <button class="btn btn-outline btn-sm back-btn" onclick="App.goWelcome()">← ${I18n.t('btn_back')}</button>
        <h2 class="screen-title">${I18n.t('choose_category')}</h2>
        <div class="cat-grid">${cards}</div>
      </div>
    `;
  }

  /* ── Screen: Quiz ───────────────────────────────────────── */
  function renderQuiz() {
    const lang = I18n.getLang();
    const q    = state.questions[state.qIndex];
    const num  = state.qIndex + 1;
    const tot  = state.questions.length;
    const pct  = Math.round((num - 1) / tot * 100);
    const mediaHtml = renderMedia(q, lang);

    const opts = q.options[lang].map((opt, i) => `
      <button class="opt" onclick="App.selectOption(${i})">
        <span class="opt-letter">${LETTERS[i]}</span>
        <span>${escHtml(opt.slice(3))}</span>
      </button>
    `).join('');

    return `
      <div class="screen quiz-screen">
        <div class="quiz-card card">
          <div class="quiz-top">
            <span class="qnum">${I18n.t('question_label')} ${num} ${I18n.t('of_label')} ${tot}</span>
            <span id="score-pill" class="score-pill">${I18n.t('score_label')}: ${state.score}</span>
          </div>

          <div class="progress-bar">
            <div class="progress-fill" style="width: ${pct}%"></div>
          </div>

          ${mediaHtml}

          <p class="q-text">${escHtml(q.question[lang])}</p>

          <div class="options">${opts}</div>

          <div id="feedback" style="display:none"></div>
          <div id="next-wrap" class="next-wrap"></div>
        </div>
      </div>
    `;
  }

  function renderMedia(q, lang) {
    if (!q.media || !q.media[lang]) {
      return `
        <div class="media-box">
          <div class="placeholder">
            <div class="ph-icon">${q.type === 'audio' ? '🔊' : q.type === 'image' ? '🖼️' : '📐'}</div>
            <div class="ph-hint">${I18n.t('media_unavailable')}<br><small>${I18n.t('media_hint')}</small></div>
          </div>
        </div>
      `;
    }

    const url = q.media[lang];

    if (q.type === 'audio') {
      return `
        <div class="media-box">
          <div class="audio-wrap">
            <div class="waveform">
              ${Array.from({length: 20}, (_, i) => `<div class="b" style="--i:${i}"></div>`).join('')}
            </div>
            <button id="audio-play-btn" class="play-btn btn btn-outline" onclick="App.toggleAudio('${escAttr(url)}')">
              ${I18n.t('btn_play_audio')}
            </button>
          </div>
        </div>
      `;
    }

    if (q.type === 'image' || q.type === 'diagram') {
      return `
        <div class="media-box">
          <img
            src="${escAttr(url)}"
            alt="Question visual"
            class="q-image"
            onerror="this.closest('.media-box').innerHTML='<div class=\\'placeholder\\'><div class=\\'ph-icon\\'>⚠️</div><div class=\\'ph-hint\\'>${I18n.t('media_unavailable')}</div></div>'"
          >
        </div>
      `;
    }

    return '';
  }

  /* ── Screen: Result ─────────────────────────────────────── */
  function renderResult() {
    const lang  = I18n.getLang();
    const total = state.questions.length * PTS_PER_Q;
    const pct   = Math.round((state.score / total) * 100);

    const msg = pct === 100 ? I18n.t('result_perfect')
              : pct >= 80   ? I18n.t('result_great')
              : pct >= 60   ? I18n.t('result_good')
              : pct >= 40   ? I18n.t('result_ok')
              :                I18n.t('result_low');

    // SVG ring (circumference of r=52 → ~326.7)
    const C      = 326.73;
    const dashOk = (pct / 100) * C;
    const ringColor = pct === 100 ? '#a3e635' : pct >= 60 ? '#38bdf8' : '#f472b6';

    const reviewItems = state.answers.map((a, i) => {
      const q   = a.question;
      const ok  = a.correct;
      return `
        <div class="rv-item">
          <div class="rv-icon">${ok ? '✓' : '✗'}</div>
          <div>
            <div class="rv-q">${escHtml(q.question[lang])}</div>
            <div class="rv-a ${ok ? 'ok' : 'bad'}">${escHtml(q.options[lang][q.correct])}</div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="screen result-screen">
        <div class="result-card card">
          <h2 class="screen-title">${I18n.t('result_title')}</h2>

          <div class="score-ring-wrap">
            <svg viewBox="0 0 120 120" class="score-ring">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="10"/>
              <circle cx="60" cy="60" r="52" fill="none"
                stroke="${ringColor}" stroke-width="10"
                stroke-dasharray="${dashOk.toFixed(1)} ${C.toFixed(1)}"
                stroke-dashoffset="${(C * 0.25).toFixed(1)}"
                stroke-linecap="round"
                style="transition: stroke-dasharray 1s ease"
              />
              <text x="60" y="56" text-anchor="middle" class="ring-pct">${pct}%</text>
              <text x="60" y="72" text-anchor="middle" class="ring-sub">${state.score}/${total} ${I18n.t('pts')}</text>
            </svg>
          </div>

          <p class="result-msg">${msg}</p>

          <div class="btn-group">
            <button class="btn btn-primary" onclick="App.startQuiz('${state.category}')">
              ${I18n.t('btn_play_again')}
            </button>
            <button class="btn btn-outline" onclick="App.goCategory()">
              ${I18n.t('btn_categories')}
            </button>
            <button class="btn btn-outline" onclick="App.goLeaderboard()">
              ${I18n.t('btn_leaderboard2')}
            </button>
          </div>

          <details class="review">
            <summary>${I18n.t('review_title')}</summary>
            <div class="review-list">${reviewItems}</div>
          </details>
        </div>
      </div>
    `;
  }

  /* ── Screen: Leaderboard ────────────────────────────────── */
  function renderLeaderboard() {
    const scores  = loadScores()
      .sort((a, b) => b.pct - a.pct || b.score - a.score);
    const top3    = scores.slice(0, 3);
    const rest    = scores.slice(3);

    const podiumOrder = [top3[1], top3[0], top3[2]]; // 2nd | 1st | 3rd
    const podiumSlots = [2, 1, 3];
    const podiumEmoji = ['🥈', '🥇', '🥉'];
    const heights     = [70, 100, 50];

    const podiumHtml = top3.length === 0 ? '' : `
      <div class="podium">
        ${podiumOrder.map((entry, i) => {
          if (!entry) return `<div class="podium-slot slot-${podiumSlots[i]}"></div>`;
          const tagKey = 'tag_' + entry.category;
          return `
            <div class="podium-slot slot-${podiumSlots[i]}">
              <div class="pod-avatar">${podiumEmoji[i]}</div>
              <div class="pod-name">${escHtml(entry.name)}</div>
              <div class="pod-pts">${entry.score} ${I18n.t('pts')}</div>
              <div class="pod-block" style="height: ${heights[i]}px"></div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    const tagColors = {
      acoustics: '#38bdf8',
      visual:    '#a78bfa',
      wave:      '#34d399',
      mixed:     '#f472b6',
    };

    const tableRows = scores.length === 0
      ? `<tr><td colspan="4" class="no-scores">${I18n.t('lb_empty')}</td></tr>`
      : scores.map((entry, i) => {
          const tagKey   = 'tag_' + entry.category;
          const tagColor = tagColors[entry.category] || '#94a3b8';
          return `
            <tr>
              <td class="td-rank">${i + 1}</td>
              <td class="td-name">${escHtml(entry.name)}</td>
              <td class="td-pts">${entry.score} <span class="pts-denom">/ ${entry.total}</span></td>
              <td><span class="cat-tag" style="color:${tagColor}">${I18n.t(tagKey)}</span></td>
            </tr>
          `;
        }).join('');

    return `
      <div class="screen leaderboard-screen">
        <div class="lb-card card">
          <div class="lb-head">
            <button class="btn btn-outline btn-sm" onclick="App.goWelcome()">← ${I18n.t('btn_back')}</button>
            <h2 class="screen-title">${I18n.t('lb_title')}</h2>
          </div>

          ${podiumHtml}

          <table class="lb-table">
            <thead>
              <tr>
                <th>${I18n.t('th_rank')}</th>
                <th>${I18n.t('th_name')}</th>
                <th>${I18n.t('th_score')}</th>
                <th>${I18n.t('th_category')}</th>
              </tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>

          <div class="danger-zone">
            <button class="btn btn-danger btn-sm" onclick="App.clearScores()">
              ${I18n.t('btn_clear')}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /* ── Utilities ──────────────────────────────────────────── */
  function escHtml(s) {
    if (!s) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escAttr(s) {
    if (!s) return '';
    return String(s).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ── Public API (called from HTML onclick) ──────────────── */
  return {
    init,
    toggleLang,
    updateName,
    goWelcome,
    goCategory,
    startQuiz,
    goLeaderboard,
    selectOption,
    nextQuestion,
    clearScores,
    toggleAudio,
  };

})();

/* ── Bootstrap ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', App.init);
