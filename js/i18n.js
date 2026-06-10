/* ============================================================
   OceanQuiz — Internationalisation (EN / FR)
   Add translations here; access via I18n.t('key')
   ============================================================ */

const I18n = (() => {
  const translations = {
    en: {
      /* ── App name & welcome ─────────────────────────────── */
      app_title:        'OceanQuiz',
      app_subtitle:     'Underwater Acoustics & Bioacoustics',
      welcome_tagline:  'Test your knowledge of ocean sounds,\nwave propagation & acoustic signatures.',
      name_label:       'Your name (optional)',
      name_placeholder: 'e.g. Marie',
      btn_play:         'Start quiz',
      btn_leaderboard:  '🏆 Leaderboard',

      /* ── Category selection ─────────────────────────────── */
      choose_category:  'Choose a category',
      cat_acoustics:    'Acoustics',
      cat_visual:       'Visual',
      cat_wave:         'Wave Propagation',
      cat_mixed:        'Mixed',
      cat_acoustics_sub:'Identify sounds by ear',
      cat_visual_sub:   'Read spectrograms & diagrams',
      cat_wave_sub:     'Understand propagation physics',
      cat_mixed_sub:    '2 questions from each category',

      /* ── Quiz screen ────────────────────────────────────── */
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

      /* ── Result screen ──────────────────────────────────── */
      result_title:     'Quiz complete!',
      result_perfect:   '🎉 Perfect score — outstanding!',
      result_great:     '🌊 Excellent knowledge of underwater acoustics!',
      result_good:      '🐬 Good work — keep exploring the deep!',
      result_ok:        '🦈 Not bad, but the ocean still has secrets for you.',
      result_low:       '🔬 Time to dive deeper into the literature!',
      review_title:     'Answer review',
      btn_play_again:   'Play again',
      btn_categories:   'Categories',
      btn_leaderboard2: '🏆 Leaderboard',

      /* ── Leaderboard ────────────────────────────────────── */
      lb_title:         'Leaderboard',
      lb_empty:         'No scores yet — be the first to play!',
      th_rank:          '#',
      th_name:          'Player',
      th_score:         'Score',
      th_category:      'Category',
      btn_back:         '← Back',
      btn_clear:        '🗑 Clear all scores',
      clear_confirm:    'Delete ALL scores? This cannot be undone.',

      /* ── Categories (short tags) ────────────────────────── */
      tag_acoustics:    'Acoustics',
      tag_visual:       'Visual',
      tag_wave:         'Wave Prop.',
      tag_mixed:        'Mixed',

      /* ── Misc ───────────────────────────────────────────── */
      pts:              'pts',
      anonymous:        'Anonymous',
    },

    fr: {
      /* ── Titre & accueil ────────────────────────────────── */
      app_title:        'OceanQuiz',
      app_subtitle:     'Acoustique sous-marine & Bioacoustique',
      welcome_tagline:  'Testez vos connaissances sur les sons océaniques,\nla propagation des ondes et les signatures acoustiques.',
      name_label:       'Votre prénom (facultatif)',
      name_placeholder: 'ex. Marie',
      btn_play:         'Commencer le quiz',
      btn_leaderboard:  '🏆 Classement',

      /* ── Sélection de catégorie ─────────────────────────── */
      choose_category:  'Choisissez une catégorie',
      cat_acoustics:    'Acoustique',
      cat_visual:       'Visuel',
      cat_wave:         'Propagation d\'ondes',
      cat_mixed:        'Mixte',
      cat_acoustics_sub:'Identifier les sons à l\'oreille',
      cat_visual_sub:   'Lire des spectrogrammes et diagrammes',
      cat_wave_sub:     'Comprendre la physique de propagation',
      cat_mixed_sub:    '2 questions par catégorie',

      /* ── Quiz ───────────────────────────────────────────── */
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

      /* ── Résultats ──────────────────────────────────────── */
      result_title:     'Quiz terminé !',
      result_perfect:   '🎉 Score parfait — remarquable !',
      result_great:     '🌊 Excellente maîtrise de l\'acoustique sous-marine !',
      result_good:      '🐬 Bon travail — continuez à explorer les abysses !',
      result_ok:        '🦈 Pas mal, mais l\'océan garde encore des secrets.',
      result_low:       '🔬 Il est temps de plonger plus profond dans la littérature !',
      review_title:     'Révision des réponses',
      btn_play_again:   'Rejouer',
      btn_categories:   'Catégories',
      btn_leaderboard2: '🏆 Classement',

      /* ── Classement ─────────────────────────────────────── */
      lb_title:         'Classement',
      lb_empty:         'Aucun score pour l\'instant — soyez le premier !',
      th_rank:          '#',
      th_name:          'Joueur',
      th_score:         'Score',
      th_category:      'Catégorie',
      btn_back:         '← Retour',
      btn_clear:        '🗑 Effacer tous les scores',
      clear_confirm:    'Supprimer TOUS les scores ? Cette action est irréversible.',

      /* ── Tags catégories ────────────────────────────────── */
      tag_acoustics:    'Acoustique',
      tag_visual:       'Visuel',
      tag_wave:         'Propagation',
      tag_mixed:        'Mixte',

      /* ── Divers ─────────────────────────────────────────── */
      pts:              'pts',
      anonymous:        'Anonyme',
    }
  };

  let currentLang = 'en';

  function setLang(lang) {
    if (translations[lang]) currentLang = lang;
  }

  function getLang() {
    return currentLang;
  }

  function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) ||
           (translations['en'] && translations['en'][key]) ||
           key;
  }

  return { setLang, getLang, t };
})();
