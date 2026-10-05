/* ============================================================
   OceanQuiz — Application Logic
   Flow:  home → welcome (name) → level → quiz → result
          leaderboard reachable from home and result
   Levels & questions live in js/questions.js
   ============================================================ */

const App = (() => {

  /* ── Constants ─────────────────────────────────────────── */
  const LS_SCORES = 'oq_scores_v2';   // v2 = level-based scores
  const LS_LANG   = 'oq_lang';
  const LS_THEME  = 'oq_theme_v2';    // v2 → light is the default
  const LETTERS   = ['A', 'B', 'C', 'D', 'E', 'F'];
  const BARS      = [10,24,16,32,20,28,14,24,18,30,12,24,32,18,26,10,20,16,28,12];

  /* ── Zoom ──────────────────────────────────────────────── */
  let zoomLevel = 1.0;
  function zoomIn()  { zoomLevel = Math.min(1.4, +(zoomLevel + 0.1).toFixed(1)); document.documentElement.style.zoom = zoomLevel; }
  function zoomOut() { zoomLevel = Math.max(0.7, +(zoomLevel - 0.1).toFixed(1)); document.documentElement.style.zoom = zoomLevel; }

  /* ── Theme (light is the default) ──────────────────────── */
  let theme = 'light';
  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem(LS_THEME, theme);
    applyTheme();
  }
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = theme === 'light' ? '🌙' : '☀️';
  }

  /* ── State ─────────────────────────────────────────────── */
  let state = {
    screen:       'home',
    playerName:   '',
    level:        null,
    questions:    [],
    qIndex:       0,
    score:        0,
    correctCount: 0,
    answers:      [],
    audio:        null,
    lastTs:       null,   // timestamp of the latest saved score (highlighted in leaderboard)
  };

  /* ── Boot ──────────────────────────────────────────────── */
  function init() {
    I18n.setLang(localStorage.getItem(LS_LANG) || 'en');
    theme = localStorage.getItem(LS_THEME) || 'light';
    applyTheme();
    updateLangBtn();
    render();
  }

  /* ── Language ──────────────────────────────────────────── */
  function toggleLang() {
    const next = I18n.getLang() === 'en' ? 'fr' : 'en';
    I18n.setLang(next);
    localStorage.setItem(LS_LANG, next);
    updateLangBtn();
    stopAudio();
    render(true);                       // true = keep the scroll position
  }
  function updateLangBtn() {
    const btn = document.getElementById('lang-btn');
    if (btn) btn.textContent = I18n.getLang() === 'en' ? '🇫🇷 FR' : '🇬🇧 EN';
  }

  /* ── Scores (localStorage) ─────────────────────────────── */
  function loadScores() {
    try { return JSON.parse(localStorage.getItem(LS_SCORES)) || []; }
    catch { return []; }
  }
  function saveScore(entry) {
    const s = loadScores(); s.push(entry);
    localStorage.setItem(LS_SCORES, JSON.stringify(s));
  }
  function clearScores() {
    if (confirm(I18n.t('clear_confirm'))) { localStorage.removeItem(LS_SCORES); render(); }
  }

  /* ── Audio ─────────────────────────────────────────────── */
  function stopAudio() {
    if (state.audio) { state.audio.pause(); state.audio.currentTime = 0; state.audio = null; }
    const btn = document.getElementById('audio-play-btn');
    const wf  = document.querySelector('.waveform');
    if (btn) { btn.textContent = I18n.t('btn_play_audio'); btn.classList.remove('playing'); }
    if (wf)  { wf.classList.add('idle'); }
  }
  /* A sound path without extension (e.g. 'assets/sounds/croaker') is tried with each
     extension of SOUND_EXTENSIONS (see questions.js); the one that works is remembered. */
  const soundFound = {};
  function soundCandidates(url) {
    if (soundFound[url]) return [soundFound[url]];
    if (/\.\w{2,4}$/.test(url)) return [url];                 // extension already given
    return SOUND_EXTENSIONS.map(ext => url + ext);
  }
  function toggleAudio(url) {
    if (state.audio && !state.audio.paused) { stopAudio(); return; }
    tryPlay(url, soundCandidates(url), 0);
  }
  function tryPlay(url, list, i) {
    const audio = new Audio(list[i]);
    state.audio = audio;
    audio.addEventListener('ended', stopAudio);
    audio.addEventListener('playing', () => { soundFound[url] = list[i]; }, { once: true });
    audio.addEventListener('error', () => {
      if (state.audio !== audio) return;                          // stopped in the meantime
      if (i + 1 < list.length) tryPlay(url, list, i + 1);        // try the next extension
      else {
        state.audio = null;
        console.warn('[OceanQuiz] No playable sound found. Files tried:', list);
        mediaFailed(document.querySelector('.media-box'), url);
      }
    });
    audio.play().catch(() => {});
    const btn = document.getElementById('audio-play-btn');
    const wf  = document.querySelector('.waveform');
    if (btn) { btn.textContent = I18n.t('btn_stop_audio'); btn.classList.add('playing'); }
    if (wf)  { wf.classList.remove('idle'); }
  }

  /* Shown when an image / audio / video file cannot be loaded */
  function mediaFailed(el, detail) {
    const box = el && (el.closest ? el.closest('.media-box') : el);
    if (!detail && el && el.getAttribute) detail = el.getAttribute('src');
    if (box) box.innerHTML = `<div class="placeholder"><div class="ph-icon">⚠️</div><div class="ph-hint">${I18n.t('media_error')}</div>${detail ? `<div class="ph-detail">${escHtml(detail)}</div>` : ''}</div>`;
  }

  /* ── Navigation ────────────────────────────────────────── */
  function resetRun() {
    state.level = null; state.questions = []; state.qIndex = 0;
    state.score = 0; state.correctCount = 0; state.answers = [];
  }
  function goHome()        { stopAudio(); resetRun(); state.screen = 'home';        render(); }
  function goWelcome()     { stopAudio(); resetRun(); state.screen = 'welcome';     render(); }
  function goLevel()       { stopAudio(); resetRun(); state.screen = 'level';       render(); }
  function goLeaderboard() { stopAudio();             state.screen = 'leaderboard'; render(); }

  function startQuiz(level) {
    stopAudio();
    if (!LEVELS[level]) return;
    state.level        = level;
    state.questions    = Questions.getQuestions(level);
    state.qIndex       = 0;
    state.score        = 0;
    state.correctCount = 0;
    state.answers      = [];
    state.screen       = 'quiz';
    render();
  }

  /* ── Quiz interaction ──────────────────────────────────── */
  /* HTML of the feedback box and of the Next button — used right after answering
     AND when the screen is redrawn (e.g. language switched after answering). */
  function feedbackHtml(q, correct, lang) {
    const exp = q.explanation && q.explanation[lang];
    return `
      <div class="feedback ${correct ? 'correct' : 'wrong'}">
        <div class="fb-label">${correct ? I18n.t('feedback_correct') : I18n.t('feedback_wrong')}</div>
        <div class="fb-answer">${I18n.t('answer_label')} <strong>${escHtml(stripLetter(q.options[lang][q.correct]))}</strong></div>
        ${exp ? `<div class="fb-exp">${escHtml(exp)}</div>` : ''}
        ${explanationFigure(q, lang)}
      </div>`;
  }
  function nextButtonHtml() {
    const last = state.qIndex === state.questions.length - 1;
    return `<button class="btn btn-primary" onclick="App.nextQuestion()">${last ? I18n.t('btn_finish') : I18n.t('btn_next')}</button>`;
  }

  function selectOption(idx) {
    if (state.answers.length > state.qIndex) return;      // this question is already answered
    stopAudio();

    const q       = state.questions[state.qIndex];
    const correct = idx === q.correct;
    if (correct) {
      state.correctCount++;
      state.score += LEVELS[state.level].pointsPerQuestion;
    }
    state.answers.push({ correct, chosen: idx, question: q });

    document.querySelectorAll('.opt').forEach((el, i) => {
      el.style.pointerEvents = 'none';
      if (i === q.correct)            el.classList.add('correct');
      else if (i === idx && !correct) el.classList.add('wrong');
    });

    const fb = document.getElementById('feedback');
    if (fb) { fb.innerHTML = feedbackHtml(q, correct, I18n.getLang()); fb.style.display = 'block'; }

    const nw = document.getElementById('next-wrap');
    if (nw) nw.innerHTML = nextButtonHtml();

    const sp = document.getElementById('score-pill');
    if (sp) sp.textContent = `${I18n.t('score_label')}: ${state.score}`;

    if (nw) setTimeout(() => nw.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);   // scroll only as much as needed
  }

  function nextQuestion() {
    stopAudio();
    if (state.qIndex < state.questions.length - 1) { state.qIndex++; render(); }
    else finishQuiz();
  }

  function finishQuiz() {
    const total = state.questions.length;
    const lvl   = LEVELS[state.level];
    const entry = {
      name:    state.playerName.trim(),          // empty = shown as "Anonymous" in the current language
      level:   state.level,
      score:   state.score,
      correct: state.correctCount,
      total,
      max:     total * lvl.pointsPerQuestion,
      ts:      Date.now(),
    };
    saveScore(entry);
    state.lastTs = entry.ts;
    state.screen = 'result';
    render();
  }

  /* Quit: the score is NOT saved */
  function abandonQuiz() {
    if (confirm(I18n.t('abandon_confirm'))) goLevel();
  }

  /* ── Render dispatcher ─────────────────────────────────── */
  function render(keepScroll) {
    const app = document.getElementById('app');
    if (!app) return;
    switch (state.screen) {
      case 'home':        app.innerHTML = renderHome();        break;
      case 'welcome':     app.innerHTML = renderWelcome();     break;
      case 'level':       app.innerHTML = renderLevel();       break;
      case 'quiz':        app.innerHTML = renderQuiz();        break;
      case 'result':      app.innerHTML = renderResult();      break;
      case 'leaderboard': app.innerHTML = renderLeaderboard(); break;
    }
    if (!keepScroll) window.scrollTo(0, 0);
  }

  /* ─────────────────────────────────────────────────────────
     SCREEN: HOME  (activity hub — add future games here)
  ───────────────────────────────────────────────────────── */
  function renderHome() {
    return `
      <div class="home-screen">
        <div class="sonar-wrap">
          <div class="sonar-ring"></div><div class="sonar-ring"></div><div class="sonar-ring"></div>
          <div class="sonar-logo">🌊</div>
        </div>
        <h1>${I18n.t('app_title')}</h1>
        <p class="home-tagline">${I18n.t('app_subtitle')}</p>
        <p class="home-choose">${I18n.t('home_choose')}</p>

        <div class="activity-grid">
          <!-- QUIZ -->
          <button class="activity-card" onclick="App.goWelcome()">
            <div class="act-icon">🎓</div>
            <div class="act-name">${I18n.t('quiz_act_name')}</div>
            <div class="act-desc">${I18n.t('quiz_act_desc')}</div>
            <div class="act-cta">${I18n.t('quiz_act_cta')}</div>
          </button>
          <!-- To add another game later: copy the <button> above,
               change the icon / texts and the onclick -->
        </div>

        <button class="btn btn-outline home-lb-btn" onclick="App.goLeaderboard()">${I18n.t('btn_leaderboard')}</button>
      </div>`;
  }

  /* ─────────────────────────────────────────────────────────
     SCREEN: WELCOME  (name entry)
  ───────────────────────────────────────────────────────── */
  function renderWelcome() {
    return `
      <div class="welcome-screen card">
        <h2>🎓 ${I18n.t('quiz_act_name')}</h2>
        <p class="welcome-for-quiz">${I18n.t('welcome_for_quiz')}</p>
        <div class="name-wrap">
          <label class="name-label" for="player-name">${I18n.t('name_label')}</label>
          <input id="player-name" class="name-input" type="text"
            placeholder="${escAttr(I18n.t('name_placeholder'))}"
            value="${escAttr(state.playerName)}"
            oninput="App.updateName(this.value)" maxlength="30"
            onkeydown="if(event.key==='Enter') App.goLevel()">
        </div>
        <div class="btn-group">
          <button class="btn btn-outline btn-sm" onclick="App.goHome()">← ${I18n.t('btn_back')}</button>
          <button class="btn btn-primary" onclick="App.goLevel()">${I18n.t('btn_continue')}</button>
        </div>
      </div>`;
  }
  function updateName(val) { state.playerName = val; }

  /* ─────────────────────────────────────────────────────────
     SCREEN: LEVEL  (Easy / Medium / Pro)
  ───────────────────────────────────────────────────────── */
  function renderLevel() {
    const pool = Questions.poolSize();
    const cards = LEVEL_ORDER.filter(id => LEVELS[id]).map(id => {
      const lvl = LEVELS[id];
      const n   = Math.min(lvl.questions, pool);      // what will really be asked
      const max = n * lvl.pointsPerQuestion;
      return `
        <button class="level-card lvl-${id}" onclick="App.startQuiz('${id}')">
          <div class="lvl-icon">${lvl.icon}</div>
          <div class="lvl-name">${I18n.t('level_' + id)}</div>
          <div class="lvl-desc">${I18n.t('level_' + id + '_desc')}</div>
          <ul class="lvl-meta">
            <li>❓ ${I18n.t('level_questions', { n })}</li>
            <li>⭐ ${I18n.t('level_points', { n: lvl.pointsPerQuestion })}</li>
            <li>🏁 ${I18n.t('level_max', { n: max })}</li>
            <li>⏱ ${I18n.t('level_time', { n: lvl.minutes })}</li>
          </ul>
        </button>`;
    }).join('');

    return `
      <div class="level-screen">
        <button class="btn btn-outline btn-sm back-btn" onclick="App.goWelcome()">← ${I18n.t('btn_back')}</button>
        <h2 class="screen-title">${I18n.t('choose_level')}</h2>
        <div class="level-grid">${cards}</div>
      </div>`;
  }

  /* ─────────────────────────────────────────────────────────
     SCREEN: QUIZ
  ───────────────────────────────────────────────────────── */
  function renderQuiz() {
    const lang = I18n.getLang();
    const q    = state.questions[state.qIndex];
    const num  = state.qIndex + 1;
    const tot  = state.questions.length;
    const pct  = Math.round((num - 1) / tot * 100);
    const lvl  = LEVELS[state.level];

    const done = state.answers[state.qIndex];      // already answered? (e.g. language switched afterwards)

    const opts = q.options[lang].map((opt, i) => {
      let cls = '', lock = '';
      if (done) {
        lock = ' style="pointer-events:none"';
        if (i === q.correct)                     cls = ' correct';
        else if (i === done.chosen && !done.correct) cls = ' wrong';
      }
      return `
      <button class="opt${cls}"${lock} onclick="App.selectOption(${i})">
        <span class="opt-letter">${LETTERS[i]}</span>
        <span>${escHtml(stripLetter(opt))}</span>
      </button>`;
    }).join('');

    return `
      <div class="quiz-screen">
        <div class="quiz-card card">
          <div class="quiz-top">
            <div class="quiz-top-left">
              <span class="qnum">${I18n.t('question_label')} ${num} ${I18n.t('of_label')} ${tot}</span>
              <span class="lvl-badge lvl-${state.level}">${lvl.icon} ${I18n.t('level_' + state.level)}</span>
            </div>
            <div class="quiz-top-right">
              <span id="score-pill" class="score-pill">${I18n.t('score_label')}: ${state.score}</span>
              <button class="abandon-btn" onclick="App.abandonQuiz()">${I18n.t('abandon_btn')}</button>
            </div>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
          ${renderMedia(q, lang)}
          <p class="q-text">${escHtml(q.question[lang])}</p>
          <div class="options">${opts}</div>
          <div id="feedback" style="display:${done ? 'block' : 'none'}">${done ? feedbackHtml(q, done.correct, lang) : ''}</div>
          <div id="next-wrap" class="next-wrap">${done ? nextButtonHtml() : ''}</div>
          ${sourcesNote()}
        </div>
      </div>`;
  }

  /* Optional picture shown with the explanation (hidden if the file is missing) */
  function explanationFigure(q, lang) {
    const img = Questions.getExplanationImage(q, lang);
    if (!img) return '';
    return `<figure class="fb-figure">
      <img src="${escAttr(img.src)}" alt="" class="fb-img" onerror="this.closest('.fb-figure').remove()">
      ${img.credit ? `<figcaption class="fb-credit">${escHtml(img.credit)}</figcaption>` : ''}
    </figure>`;
  }

  /* Small-print line with the information sources (text set in questions.js) */
  function sourcesNote() {
    if (typeof INFO_SOURCES === 'undefined' || !INFO_SOURCES) return '';
    return `<p class="sources-note"><strong>ℹ️ ${I18n.t('sources_label')}</strong> ${escHtml(INFO_SOURCES)}</p>`;
  }

  function renderMedia(q, lang) {
    const url  = Questions.getMedia(q, lang);
    const type = q.type === 'diagram' ? 'image' : q.type;     // 'diagram' = old name for 'image'
    if (!url || !type || type === 'text') return '';          // text-only question: no media box

    if (type === 'audio') {
      const bars = BARS.map((h, i) => `<div class="b" style="--h:${h}px;--d:${((i * 0.11) % 0.9).toFixed(2)}s"></div>`).join('');
      return `<div class="media-box"><div class="audio-wrap">
        <div class="waveform idle">${bars}</div>
        <button id="audio-play-btn" class="play-btn" onclick="App.toggleAudio('${escAttr(url)}')">${I18n.t('btn_play_audio')}</button>
      </div></div>`;
    }
    if (type === 'video') {
      return `<div class="media-box"><video class="q-video" controls playsinline preload="metadata"
        src="${escAttr(url)}" onerror="App.mediaFailed(this)"></video></div>`;
    }
    return `<div class="media-box"><img src="${escAttr(url)}" alt="" class="q-image" onerror="App.mediaFailed(this)"></div>`;
  }

  /* ─────────────────────────────────────────────────────────
     SCREEN: RESULT
  ───────────────────────────────────────────────────────── */
  function renderResult() {
    const lang  = I18n.getLang();
    const total = state.questions.length;
    const pct   = total ? Math.round((state.correctCount / total) * 100) : 0;
    const lvl   = LEVELS[state.level];
    const C     = 326.73;                                    // circumference of r = 52
    const color = pct === 100 ? 'var(--ok)' : pct >= 60 ? 'var(--primary)' : 'var(--lvl-pro)';

    const review = state.answers.map(a => `
      <div class="rv-item">
        <div class="rv-icon ${a.correct ? 'ok' : 'bad'}">${a.correct ? '✓' : '✗'}</div>
        <div>
          <div class="rv-q">${escHtml(a.question.question[lang])}</div>
          <div class="rv-a ${a.correct ? 'ok' : 'bad'}">${escHtml(stripLetter(a.question.options[lang][a.question.correct]))}</div>
        </div>
      </div>`).join('');

    return `
      <div class="result-screen">
        <div class="result-card card">
          <h2 class="screen-title">${I18n.t('result_title')}</h2>
          <span class="lvl-badge lvl-${state.level}">${lvl.icon} ${I18n.t('level_' + state.level)}</span>

          <div class="score-ring-wrap">
            <svg viewBox="0 0 120 120" class="score-ring">
              <circle cx="60" cy="60" r="52" fill="none" class="ring-bg" stroke-width="10"/>
              <circle cx="60" cy="60" r="52" fill="none" stroke="${color}" stroke-width="10"
                stroke-dasharray="${((pct / 100) * C).toFixed(1)} ${C.toFixed(1)}"
                stroke-dashoffset="${(C * 0.25).toFixed(1)}" stroke-linecap="round"/>
              <text x="60" y="64" text-anchor="middle" class="ring-pct">${pct}%</text>
            </svg>
          </div>

          <div class="result-score-label">${I18n.t('result_score')}</div>
          <div class="result-score">${state.score} <span>${I18n.t('pts')}</span></div>
          <div class="result-correct">${I18n.t('result_correct', { c: state.correctCount, t: total })}</div>

          <p class="result-invite">${I18n.t('result_invite')}</p>

          <div class="btn-group">
            <button class="btn btn-primary" onclick="App.goLeaderboard()">${I18n.t('btn_leaderboard2')}</button>
            <button class="btn btn-outline" onclick="App.startQuiz('${state.level}')">${I18n.t('btn_play_again')}</button>
            <button class="btn btn-outline" onclick="App.goLevel()">${I18n.t('btn_change_level')}</button>
            <button class="btn btn-outline" onclick="App.goHome()">${I18n.t('btn_home')}</button>
          </div>

          <details class="review">
            <summary>${I18n.t('review_title')}</summary>
            <div class="review-list">${review}</div>
          </details>
          ${sourcesNote()}
        </div>
      </div>`;
  }

  /* ─────────────────────────────────────────────────────────
     SCREEN: LEADERBOARD  (one list for everybody; level shown per score)
  ───────────────────────────────────────────────────────── */
  function levelBadge(id) {
    const lvl = LEVELS[id];
    if (!lvl) return '';
    return `<span class="lvl-badge lvl-${id}">${lvl.icon} ${I18n.t('level_' + id)}</span>`;
  }
  function displayName(e) { return e.name ? escHtml(e.name) : I18n.t('anonymous'); }

  function renderLeaderboard() {
    // Ranking: score ↓, then % of correct answers ↓, then earliest first
    const scores = loadScores().sort((a, b) =>
      b.score - a.score ||
      (b.correct / b.total) - (a.correct / a.total) ||
      a.ts - b.ts);

    const top3   = scores.slice(0, 3);
    const order  = [top3[1], top3[0], top3[2]];     // 2nd | 1st | 3rd
    const slots  = [2, 1, 3];
    const emoji  = ['🥈', '🥇', '🥉'];
    const height = [68, 100, 48];

    const podium = top3.length === 0 ? '' : `<div class="podium">${
      order.map((e, i) => !e ? `<div class="podium-slot slot-${slots[i]}"></div>` : `
        <div class="podium-slot slot-${slots[i]}">
          <div class="pod-avatar">${emoji[i]}</div>
          <div class="pod-name">${displayName(e)}</div>
          <div class="pod-pts">${e.score} ${I18n.t('pts')}</div>
          <div class="pod-level">${levelBadge(e.level)}</div>
          <div class="pod-block" style="height:${height[i]}px"></div>
        </div>`).join('')
    }</div>`;

    const rows = scores.length === 0
      ? `<tr><td colspan="5" class="no-scores">${I18n.t('lb_empty')}</td></tr>`
      : scores.map((e, i) => `
          <tr class="${e.ts === state.lastTs ? 'me' : ''}">
            <td class="td-rank">${i + 1}</td>
            <td class="td-name">${displayName(e)}</td>
            <td>${levelBadge(e.level)}</td>
            <td class="td-correct">${e.correct} / ${e.total}</td>
            <td class="td-pts">${e.score}</td>
          </tr>`).join('');

    return `
      <div class="leaderboard-screen">
        <div class="lb-card card">
          <div class="lb-head">
            <button class="btn btn-outline btn-sm" onclick="App.goHome()">← ${I18n.t('btn_back')}</button>
            <h2 class="screen-title">🏆 ${I18n.t('lb_title')}</h2>
          </div>
          ${podium}
          <table class="lb-table">
            <thead><tr>
              <th>${I18n.t('th_rank')}</th><th>${I18n.t('th_name')}</th><th>${I18n.t('th_level')}</th>
              <th>${I18n.t('th_correct')}</th><th>${I18n.t('th_score')}</th>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table>
          <div class="danger-zone">
            <button class="btn btn-danger btn-sm" onclick="App.clearScores()">${I18n.t('btn_clear')}</button>
          </div>
        </div>
      </div>`;
  }

  /* ── Utilities ─────────────────────────────────────────── */
  function escHtml(s) {
    if (s === null || s === undefined) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function escAttr(s) {
    if (s === null || s === undefined) return '';
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  /* "A. Blue whale" → "Blue whale"  (letters in options are optional) */
  function stripLetter(s) { return String(s).replace(/^\s*[A-Fa-f][.)]\s*/, ''); }

  /* ── Public API (used by onclick="…" in the HTML above) ── */
  return {
    init, toggleLang, toggleTheme, updateName,
    goHome, goWelcome, goLevel, goLeaderboard, startQuiz,
    selectOption, nextQuestion, abandonQuiz, clearScores,
    toggleAudio, mediaFailed,
    zoomIn, zoomOut,
  };

})();

document.addEventListener('DOMContentLoaded', App.init);
