/* ============================================================
   OceanQuiz — Internationalisation (EN / FR)
   Usage in code:  I18n.t('key')   or   I18n.t('key', { n: 5 })
   Placeholders like {n} are replaced by the values you pass.
   ============================================================ */

const I18n = (() => {
  const translations = {

    /* ════════════════════════ ENGLISH ════════════════════════ */
    en: {
      /* ── App ── */
      app_title:    'OceanQuiz',
      app_subtitle: 'Underwater Acoustics & Bioacoustics',

      /* ── Home (activity hub) ── */
      home_choose:   'Choose your activity',
      quiz_act_name: 'Quiz',
      quiz_act_desc: 'Test your knowledge of ocean sounds, wave propagation & acoustic signatures',
      quiz_act_cta:  'Play →',
      btn_leaderboard: '🏆 Leaderboard',

      /* ── Name entry ── */
      welcome_for_quiz: 'Enter your name (optional) to appear on the leaderboard.',
      name_label:       'Your name',
      name_placeholder: 'e.g. Marie',
      btn_continue:     'Continue →',
      btn_back:         'Back',
      btn_home:         '🏠 Home',

      /* ── Level selection ── */
      choose_level:      'Choose your level',
      level_easy:        'Easy',
      level_medium:      'Medium',
      level_pro:         'Pro',
      level_easy_desc:   'A quick dive to warm up',
      level_medium_desc: 'Go a little deeper',
      level_pro_desc:    'For true ocean acousticians',
      level_questions:   '{n} questions',
      level_points:      '{n} pts per correct answer',
      level_max:         'Up to {n} pts',
      level_time:        '≈ {n} min',

      /* ── Quiz ── */
      question_label:    'Question',
      of_label:          'of',
      score_label:       'Score',
      btn_play_audio:    '▶ Play',
      btn_stop_audio:    '■ Stop',
      media_error:       'This media file could not be loaded.',
      feedback_correct:  '✓ Correct!',
      feedback_wrong:    '✗ Not quite.',
      answer_label:      'Answer:',
      btn_next:          'Next →',
      btn_finish:        'See results →',
      abandon_btn:       '✕ Quit',
      abandon_confirm:   'Quit this quiz? Your current score will not be saved.',

      /* ── Result ── */
      result_title:    'Quiz complete!',
      result_score:    'Your score',
      result_correct:  '{c} / {t} correct answers',
      result_invite:   '🏆 Your score is on the board — open the leaderboard to see your place on the podium.',
      review_title:    'Answer review',
      btn_play_again:  'Play again',
      btn_change_level:'Change level',
      btn_leaderboard2:'🏆 Leaderboard',

      /* ── Leaderboard ── */
      lb_title:      'Leaderboard',
      lb_empty:      'No scores yet — be the first to play!',
      th_rank:       '#',
      th_name:       'Player',
      th_level:      'Level',
      th_correct:    'Correct',
      th_score:      'Score',
      btn_clear:     '🗑 Clear all scores',
      clear_confirm: 'Delete ALL scores? This cannot be undone.',

      /* ── Misc ── */
      pts:       'pts',
      anonymous: 'Anonymous',
    },

    /* ════════════════════════ FRANÇAIS ════════════════════════ */
    fr: {
      /* ── App ── */
      app_title:    'OceanQuiz',
      app_subtitle: 'Acoustique sous-marine & Bioacoustique',

      /* ── Accueil ── */
      home_choose:   'Choisissez votre activité',
      quiz_act_name: 'Quiz',
      quiz_act_desc: 'Testez vos connaissances sur les sons océaniques, la propagation des ondes et les signatures acoustiques',
      quiz_act_cta:  'Jouer →',
      btn_leaderboard: '🏆 Classement',

      /* ── Saisie du prénom ── */
      welcome_for_quiz: 'Entrez votre prénom (facultatif) pour apparaître dans le classement.',
      name_label:       'Votre prénom',
      name_placeholder: 'ex. Marie',
      btn_continue:     'Continuer →',
      btn_back:         'Retour',
      btn_home:         '🏠 Accueil',

      /* ── Choix du niveau ── */
      choose_level:      'Choisissez votre niveau',
      level_easy:        'Facile',
      level_medium:      'Moyen',
      level_pro:         'Pro',
      level_easy_desc:   'Une petite plongée pour s\'échauffer',
      level_medium_desc: 'Descendez un peu plus profond',
      level_pro_desc:    'Pour les vrais spécialistes de l\'acoustique océanique',
      level_questions:   '{n} questions',
      level_points:      '{n} pts par bonne réponse',
      level_max:         'Jusqu\'à {n} pts',
      level_time:        '≈ {n} min',

      /* ── Quiz ── */
      question_label:    'Question',
      of_label:          'sur',
      score_label:       'Score',
      btn_play_audio:    '▶ Écouter',
      btn_stop_audio:    '■ Arrêter',
      media_error:       'Ce fichier média n\'a pas pu être chargé.',
      feedback_correct:  '✓ Correct !',
      feedback_wrong:    '✗ Pas tout à fait.',
      answer_label:      'Réponse :',
      btn_next:          'Suivant →',
      btn_finish:        'Voir les résultats →',
      abandon_btn:       '✕ Quitter',
      abandon_confirm:   'Quitter ce quiz ? Votre score actuel ne sera pas enregistré.',

      /* ── Résultats ── */
      result_title:    'Quiz terminé !',
      result_score:    'Votre score',
      result_correct:  '{c} / {t} bonnes réponses',
      result_invite:   '🏆 Votre score est enregistré — ouvrez le classement pour découvrir votre place sur le podium.',
      review_title:    'Révision des réponses',
      btn_play_again:  'Rejouer',
      btn_change_level:'Changer de niveau',
      btn_leaderboard2:'🏆 Classement',

      /* ── Classement ── */
      lb_title:      'Classement',
      lb_empty:      'Aucun score pour l\'instant — soyez le premier !',
      th_rank:       '#',
      th_name:       'Joueur',
      th_level:      'Niveau',
      th_correct:    'Bonnes rép.',
      th_score:      'Score',
      btn_clear:     '🗑 Effacer tous les scores',
      clear_confirm: 'Supprimer TOUS les scores ? Action irréversible.',

      /* ── Divers ── */
      pts:       'pts',
      anonymous: 'Anonyme',
    },
  };

  let currentLang = 'en';

  function setLang(lang) { if (translations[lang]) currentLang = lang; }
  function getLang()     { return currentLang; }

  function t(key, vars) {
    let s = translations[currentLang]?.[key] ?? translations.en?.[key] ?? key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
    return s;
  }

  return { setLang, getLang, t };
})();
