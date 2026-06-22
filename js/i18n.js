/* ============================================================
   OceanQuiz — Internationalisation (EN / FR)
   ============================================================ */

const I18n = (() => {
  const translations = {
    en: {
      /* ── App ─────────────────────────────────────────────── */
      app_title:   'OceanQuiz',
      app_subtitle:'Underwater Acoustics & Bioacoustics',

      /* ── Home screen (activity hub) ─────────────────────── */
      home_choose:    'Choose your activity',
      btn_quiz_label: '🎓 Quiz',
      quiz_act_name:  'Quiz',
      quiz_act_desc:  'Test your knowledge of ocean sounds, wave propagation & acoustic signatures',
      quiz_act_cta:   'Play →',
      game2_name:     'Game 2',
      game2_desc:     'A new activity — details coming soon',
      game3_name:     'Game 3',
      game3_desc:     'A new activity — details coming soon',
      coming_soon:    'Coming soon',
      btn_leaderboard:'🏆 Leaderboard',

      /* ── Welcome / name entry ────────────────────────────── */
      welcome_for_quiz: 'Enter your name (optional) to track your score on the leaderboard.',
      name_label:       'Your name',
      name_placeholder: 'e.g. Marie',
      btn_play:         'Start quiz →',
      btn_back:         'Back',

      /* ── Category selection ──────────────────────────────── */
      choose_category:  'Choose a category',
      cat_acoustics:    'Acoustics',
      cat_visual:       'Visual',
      cat_wave:         'Wave Propagation',
      cat_mixed:        'Mixed',
      cat_acoustics_sub:'Identify sounds by ear',
      cat_visual_sub:   'Read spectrograms & diagrams',
      cat_wave_sub:     'Understand propagation physics',
      cat_mixed_sub:    '5 questions from each category',

      /* ── Quiz ────────────────────────────────────────────── */
      question_label:   'Question',
      of_label:         'of',
      score_label:      'Score',
      btn_play_audio:   '▶ Play',
      btn_stop_audio:   '■ Stop',
      media_unavailable:'Media file not yet available',
      media_hint:       'Place the file in the assets/ folder to enable this question.',
      feedback_correct: '✓ Correct!',
      feedback_wrong:   '✗ Not quite.',
      answer_label:     'Answer:',
      btn_next:         'Next →',
      btn_finish:       'See results →',

      /* ── Result ──────────────────────────────────────────── */
      result_title:    'Quiz complete!',
      result_invite:   '🏆 Your score is on the board — tap the leaderboard to see your position on the podium.',
      review_title:    'Answer review',
      btn_play_again:  'Play again',
      btn_categories:  'Categories',
      btn_leaderboard2:'🏆 Leaderboard',

      /* ── Abandon quiz ────────────────────────────────────── */
      abandon_btn:     '✕ Quit',
      abandon_confirm: 'Quit this quiz? Your current score will not be saved.',

      /* ── Leaderboard ─────────────────────────────────────── */
      lb_title:      'Leaderboard',
      lb_empty:      'No scores yet — be the first to play!',
      th_rank:       '#',
      th_name:       'Player',
      th_score:      'Score',
      btn_clear:     '🗑 Clear all scores',
      clear_confirm: 'Delete ALL scores? This cannot be undone.',
      tag_acoustics: 'Acoustics',
      tag_visual:    'Visual',
      tag_wave:      'Wave Prop.',
      tag_mixed:     'Mixed',

      /* ── Misc ────────────────────────────────────────────── */
      pts:       'pts',
      anonymous: 'Anonymous',
    },

    fr: {
      /* ── App ─────────────────────────────────────────────── */
      app_title:   'OceanQuiz',
      app_subtitle:'Acoustique sous-marine & Bioacoustique',

      /* ── Écran d'accueil ─────────────────────────────────── */
      home_choose:    'Choisissez votre activité',
      btn_quiz_label: '🎓 Quiz',
      quiz_act_name:  'Quiz',
      quiz_act_desc:  'Testez vos connaissances sur les sons océaniques, la propagation des ondes et les signatures acoustiques',
      quiz_act_cta:   'Jouer →',
      game2_name:     'Jeu 2',
      game2_desc:     'Une nouvelle activité — détails à venir',
      game3_name:     'Jeu 3',
      game3_desc:     'Une nouvelle activité — détails à venir',
      coming_soon:    'Bientôt disponible',
      btn_leaderboard:'🏆 Classement',

      /* ── Saisie du prénom ────────────────────────────────── */
      welcome_for_quiz: 'Entrez votre prénom (facultatif) pour apparaître dans le classement.',
      name_label:       'Votre prénom',
      name_placeholder: 'ex. Marie',
      btn_play:         'Commencer →',
      btn_back:         'Retour',

      /* ── Sélection de catégorie ──────────────────────────── */
      choose_category:  'Choisissez une catégorie',
      cat_acoustics:    'Acoustique',
      cat_visual:       'Visuel',
      cat_wave:         'Propagation d\'ondes',
      cat_mixed:        'Mixte',
      cat_acoustics_sub:'Identifier les sons à l\'oreille',
      cat_visual_sub:   'Lire des spectrogrammes et diagrammes',
      cat_wave_sub:     'Comprendre la physique de propagation',
      cat_mixed_sub:    '5 questions par catégorie',

      /* ── Quiz ────────────────────────────────────────────── */
      question_label:   'Question',
      of_label:         'sur',
      score_label:      'Score',
      btn_play_audio:   '▶ Écouter',
      btn_stop_audio:   '■ Arrêter',
      media_unavailable:'Fichier média non disponible',
      media_hint:       'Placez le fichier dans le dossier assets/ pour activer cette question.',
      feedback_correct: '✓ Correct !',
      feedback_wrong:   '✗ Pas tout à fait.',
      answer_label:     'Réponse :',
      btn_next:         'Suivant →',
      btn_finish:       'Voir les résultats →',

      /* ── Résultats ───────────────────────────────────────── */
      result_title:    'Quiz terminé !',
      result_invite:   '🏆 Votre score est enregistré — consultez le classement pour voir votre place sur le podium.',
      review_title:    'Révision des réponses',
      btn_play_again:  'Rejouer',
      btn_categories:  'Catégories',
      btn_leaderboard2:'🏆 Classement',

      /* ── Abandonner le quiz ──────────────────────────────── */
      abandon_btn:     '✕ Quitter',
      abandon_confirm: 'Quitter ce quiz ? Votre score actuel ne sera pas enregistré.',

      /* ── Classement ──────────────────────────────────────── */
      lb_title:      'Classement',
      lb_empty:      'Aucun score pour l\'instant — soyez le premier !',
      th_rank:       '#',
      th_name:       'Joueur',
      th_score:      'Score',
      btn_clear:     '🗑 Effacer tous les scores',
      clear_confirm: 'Supprimer TOUS les scores ? Action irréversible.',
      tag_acoustics: 'Acoustique',
      tag_visual:    'Visuel',
      tag_wave:      'Propagation',
      tag_mixed:     'Mixte',

      /* ── Divers ──────────────────────────────────────────── */
      pts:       'pts',
      anonymous: 'Anonyme',
    },
  };

  let currentLang = 'en';
  function setLang(lang) { if (translations[lang]) currentLang = lang; }
  function getLang() { return currentLang; }
  function t(key) {
    return (translations[currentLang]?.[key]) ?? (translations.en?.[key]) ?? key;
  }
  return { setLang, getLang, t };
})();
