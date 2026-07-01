/* ============================================================
   OceanQuiz — Question Database
   ============================================================
   ★★★ CONFIGURATION — change these two numbers as needed ★★★
   ============================================================ */

const QUESTIONS_PER_CATEGORY  = 10;   // max shown per category (Acoustics / Visual / Wave)
                                       // if fewer questions exist, all are used
const QUESTIONS_MIXED_PER_CAT =  5;   // per category in Mixed mode → 3 × 5 = 15 total
                                       // if fewer exist in a category, all of them are used

/* ============================================================
   HOW TO ADD A QUESTION
   ─────────────────────────────────────────────────────────────
   Copy this template into the `all` array below and fill it in.
   Only `media` is optional — set to null if no file yet.

   {
     id:       'unique-id',
     category: 'acoustics' | 'visual' | 'wave',
     type:     'audio' | 'image' | 'diagram',
     media: { en: 'assets/sounds/file.ogg', fr: 'assets/sounds/file.ogg' },
     // ↑ use null for missing files; set a URL or relative path

     question: { en: 'Question in English?', fr: 'Question en français ?' },
     options: {
       en: ['A. Option1', 'B. Option2', 'C. Option3', 'D. Option4'],
       fr: ['A. Option1', 'B. Option2', 'C. Option3', 'D. Option4'],
     },
     correct: 0,   // 0 = A, 1 = B, 2 = C, 3 = D

     explanation: { en: 'Why this is correct...', fr: 'Pourquoi c\'est correct...' },
   },

   Put media files in:
     assets/sounds/   → .mp3 or .ogg
     assets/images/   → spectrograms, diagrams
     assets/videos/   → videos
   ============================================================ */

const Questions = (() => {

  /* ── Question database ─────────────────────────────────── */
  const all = [

    /* ══════════════════════════════════════════════════════
       ACOUSTICS
       ══════════════════════════════════════════════════════ */
    {
      id: 'aq1', category: 'acoustics', type: 'audio',
      media: {
        en: 'https://dosits.org/wp-content/uploads/2016/11/Hump1.mp3',
        fr: 'https://dosits.org/wp-content/uploads/2016/11/Hump1.mp3',
      },
      question: {
        en: 'Listen to this recording. Which animal produced this low-frequency sound?',
        fr: 'Écoutez cet enregistrement. Quel animal a produit ce son basse fréquence ?',
      },
      options: {
        en: ['A. Humpback whale', 'B. Blue whale', 'C. Sperm whale', 'D. Dolphin'],
        fr: ['A. Baleine à bosse', 'B. Baleine bleue', 'C. Cachalot', 'D. Dauphin'],
      },
      correct: 1,
      explanation: {
        en: 'Blue whales produce the lowest-frequency sounds of any animal — down to ~10–40 Hz. This characteristic "D-call" was recorded by NOAA.',
        fr: 'Les baleines bleues produisent les sons les plus graves de tout le règne animal — entre ~10 et 40 Hz. Ce "D-call" a été enregistré par la NOAA.',
      },
    },

    {
      id: 'aq2', category: 'acoustics', type: 'audio',
      media: {
        en: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Humpback_Whale_song.ogg',
        fr: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Humpback_Whale_song.ogg',
      },
      question: {
        en: 'This recording features a long, complex vocal sequence. Which species is known for this behaviour?',
        fr: 'Cet enregistrement présente une longue séquence vocale complexe. Quelle espèce est connue pour ce comportement ?',
      },
      options: {
        en: ['A. Blue whale', 'B. Orca', 'C. Humpback whale', 'D. Fin whale'],
        fr: ['A. Baleine bleue', 'B. Orque', 'C. Baleine à bosse', 'D. Rorqual commun'],
      },
      correct: 2,
      explanation: {
        en: 'Humpback whale males produce elaborate songs lasting up to 20 minutes, which evolve culturally across populations each breeding season.',
        fr: 'Les mâles de baleines à bosse produisent des chants élaborés pouvant durer jusqu\'à 20 minutes, qui évoluent culturellement à chaque saison de reproduction.',
      },
    },

    {
      id: 'aq3', category: 'acoustics', type: 'audio',
      media: { en: null, fr: null },
      question: {
        en: 'Seismic airgun arrays are used in ocean floor surveys. What is their primary acoustic characteristic?',
        fr: 'Les canons à air sismiques sont utilisés dans les relevés du fond océanique. Quelle est leur principale caractéristique acoustique ?',
      },
      options: {
        en: ['A. Narrow-band at 1 kHz', 'B. Broadband impulses 5–300 Hz', 'C. Pure tone at 50 Hz', 'D. Clicks above 20 kHz'],
        fr: ['A. Bande étroite à 1 kHz', 'B. Impulsions large bande 5–300 Hz', 'C. Tonalité pure à 50 Hz', 'D. Clics au-dessus de 20 kHz'],
      },
      correct: 1,
      explanation: {
        en: 'Seismic air-gun arrays release compressed air to produce broadband impulsive signals primarily between 5 and 300 Hz, penetrating the seafloor to map geological structures.',
        fr: 'Les canons à air libèrent de l\'air comprimé pour produire des signaux impulsionnels large bande (5–300 Hz), pénétrant le fond marin pour cartographier les structures géologiques.',
      },
    },

    {
      id: 'aq4', category: 'acoustics', type: 'audio',
      media: { en: null, fr: null },
      question: {
        en: 'Sperm whales use bio-sonar clicks for echolocation. In which frequency range do these clicks primarily fall?',
        fr: 'Les cachalots utilisent des clics de bio-sonar pour l\'écholocation. Dans quelle plage de fréquences se situent-ils ?',
      },
      options: {
        en: ['A. 10–100 Hz (infrasound)', 'B. 100 Hz–1 kHz (low audio)', 'C. 1–30 kHz (mid–high audio)', 'D. 100 kHz–1 MHz (ultrasound)'],
        fr: ['A. 10–100 Hz (infrason)', 'B. 100 Hz–1 kHz (basse fréquence)', 'C. 1–30 kHz (moyen–haute fréquence)', 'D. 100 kHz–1 MHz (ultrason)'],
      },
      correct: 2,
      explanation: {
        en: 'Sperm whale echolocation clicks are broadband, with most energy between 2 and 30 kHz. Their "regular clicks" (codas) serve communication; rapid "creaks" target prey.',
        fr: 'Les clics de cachalot sont large bande, avec l\'essentiel de l\'énergie entre 2 et 30 kHz. Les "clics réguliers" (codas) servent à la communication ; les "couinements" rapides ciblent les proies.',
      },
    },

    /* ══════════════════════════════════════════════════════
       VISUAL
       ══════════════════════════════════════════════════════ */
    {
      id: 'vq1', category: 'visual', type: 'image',
      media: {
        en: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Call_spectrogram.png',
        fr: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Call_spectrogram.png',
      },
      question: {
        en: 'Examine this spectrogram. The narrow band below 100 Hz with long duration is characteristic of which source?',
        fr: 'Examinez ce spectrogramme. La bande étroite en dessous de 100 Hz avec une longue durée est caractéristique de quelle source ?',
      },
      options: {
        en: ['A. Ship propeller cavitation', 'B. Blue whale D-call', 'C. Dolphin whistle', 'D. Earthquake T-phase'],
        fr: ['A. Cavitation d\'hélice', 'B. D-call de baleine bleue', 'C. Sifflement de dauphin', 'D. Phase T sismique'],
      },
      correct: 1,
      explanation: {
        en: 'Blue whale D-calls appear as narrow-band tonal signals below 100 Hz lasting several seconds. This distinguishes them from broadband noise sources.',
        fr: 'Les D-calls de baleine bleue apparaissent comme des signaux tonals en dessous de 100 Hz, d\'une durée de plusieurs secondes — les distinguant des bruits large bande.',
      },
    },

    {
      id: 'vq2', category: 'visual', type: 'image',
      media: { en: null, fr: null },
      question: {
        en: 'On a dolphin echolocation spectrogram, the clicks appear as vertical broadband striations. What does the spacing between them indicate?',
        fr: 'Sur un spectrogramme d\'écholocation de dauphin, les clics forment des stries verticales. Qu\'indique l\'espacement entre elles ?',
      },
      options: {
        en: ['A. The signal frequency', 'B. The water temperature', 'C. The inter-click interval — related to target distance', 'D. The depth of the animal'],
        fr: ['A. La fréquence du signal', 'B. La température de l\'eau', 'C. L\'intervalle inter-clics — lié à la distance de la cible', 'D. La profondeur de l\'animal'],
      },
      correct: 2,
      explanation: {
        en: 'Dolphins adjust the inter-click interval (ICI) so the next click is sent after the previous echo returns. ICI ≈ 2 × (target distance) / 1500 m/s.',
        fr: 'Les dauphins ajustent l\'ICI de sorte que le prochain clic n\'est émis qu\'après le retour de l\'écho. ICI ≈ 2 × (distance cible) / 1500 m/s.',
      },
    },

    {
      id: 'vq3', category: 'visual', type: 'image',
      media: { en: null, fr: null },
      question: {
        en: 'Ship propeller cavitation appears on a spectrogram as a broadband hum with harmonics. At roughly what fundamental frequency for large cargo vessels?',
        fr: 'La cavitation d\'hélice apparaît sur un spectrogramme comme un bourdonnement avec des harmoniques. À quelle fréquence fondamentale pour les grands navires cargo ?',
      },
      options: {
        en: ['A. 0.01–0.1 Hz', 'B. 1–30 Hz', 'C. 1–10 kHz', 'D. 20–100 kHz'],
        fr: ['A. 0,01–0,1 Hz', 'B. 1–30 Hz', 'C. 1–10 kHz', 'D. 20–100 kHz'],
      },
      correct: 1,
      explanation: {
        en: 'The blade-rate fundamental of large ship propellers typically falls in the 1–30 Hz range (blade count × rotational speed). Higher harmonics extend into hundreds of Hz.',
        fr: 'La fréquence de pale des grands navires est typiquement dans la plage 1–30 Hz (nombre de pales × vitesse de rotation). Les harmoniques supérieures s\'étendent jusqu\'à plusieurs centaines de Hz.',
      },
    },

    {
      id: 'vq4', category: 'visual', type: 'image',
      media: { en: null, fr: null },
      question: {
        en: 'A T-phase (tertiary phase) on a hydrophone spectrogram arrives after P and S waves. Through which medium does it propagate?',
        fr: 'Une phase T sur un spectrogramme d\'hydrophone arrive après les ondes P et S. Par quel milieu se propage-t-elle ?',
      },
      options: {
        en: ['A. Through solid upper crust', 'B. Through the SOFAR channel as an acoustic wave', 'C. Along the seafloor as a Stoneley wave', 'D. Through atmosphere as infrasound'],
        fr: ['A. La croûte supérieure solide', 'B. Via le canal SOFAR comme onde acoustique', 'C. Le long du fond marin (onde de Stoneley)', 'D. L\'atmosphère comme onde infrasonore'],
      },
      correct: 1,
      explanation: {
        en: 'The T-phase converts from a seismic wave at a continent or seamount, then travels through the SOFAR channel as an acoustic wave, losing very little energy over thousands of kilometres.',
        fr: 'La phase T se convertit en onde acoustique au niveau d\'un continent ou d\'un mont sous-marin, puis se propage via le canal SOFAR en perdant très peu d\'énergie sur des milliers de kilomètres.',
      },
    },

    /* ══════════════════════════════════════════════════════
       WAVE PROPAGATION
       ══════════════════════════════════════════════════════ */
    {
      id: 'wq1', category: 'wave', type: 'diagram',
      media: {
        en: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/SOFAR_channel.svg/800px-SOFAR_channel.svg.png',
        fr: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/SOFAR_channel.svg/800px-SOFAR_channel.svg.png',
      },
      question: {
        en: 'The diagram shows a sound-speed profile with a distinct minimum at depth. What phenomenon does this minimum create?',
        fr: 'Le diagramme montre un profil de vitesse du son avec un minimum à une certaine profondeur. Quel phénomène ce minimum crée-t-il ?',
      },
      options: {
        en: ['A. A thermocline blocking all sound', 'B. The SOFAR channel — a natural waveguide', 'C. A pressure node amplifying surface waves', 'D. An acoustic shadow zone near the surface'],
        fr: ['A. Une thermocline bloquant tous les sons', 'B. Le canal SOFAR — un guide d\'ondes naturel', 'C. Un nœud de pression amplifiant les ondes de surface', 'D. Une zone d\'ombre acoustique en surface'],
      },
      correct: 1,
      explanation: {
        en: 'Sound rays bend toward lower-speed regions (Snell\'s law). The speed minimum at ~800–1000 m depth acts as an axis around which rays oscillate, trapping energy for propagation over thousands of km.',
        fr: 'Les rayons sonores se courbent vers les régions de vitesse inférieure (loi de Snell). Le minimum de vitesse à ~800–1000 m sert d\'axe autour duquel les rayons oscillent, piégeant l\'énergie sur des milliers de km.',
      },
    },

    {
      id: 'wq2', category: 'wave', type: 'diagram',
      media: {
        en: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Seismic_waves.svg/800px-Seismic_waves.svg.png',
        fr: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Seismic_waves.svg/800px-Seismic_waves.svg.png',
      },
      question: {
        en: 'Looking at the seismic wave diagram, which wave type travels only along the Earth\'s surface and cannot propagate through the deep ocean interior?',
        fr: 'Dans ce diagramme des ondes sismiques, quel type d\'onde se propage uniquement en surface et ne peut pas traverser les profondeurs de l\'océan ?',
      },
      options: {
        en: ['A. P-waves (compressional)', 'B. S-waves (shear)', 'C. Surface waves (Rayleigh / Love)', 'D. T-waves (acoustic)'],
        fr: ['A. Ondes P (compression)', 'B. Ondes S (cisaillement)', 'C. Ondes de surface (Rayleigh / Love)', 'D. Ondes T (acoustiques)'],
      },
      correct: 2,
      explanation: {
        en: 'Surface waves (Rayleigh and Love) travel along the Earth\'s surface and decay with depth. P-waves traverse any medium; S-waves through solids only; T-waves travel acoustically through the ocean.',
        fr: 'Les ondes de surface (Rayleigh et Love) se propagent en surface et décroissent avec la profondeur. Les P traversent tout milieu ; les S uniquement les solides ; les T se propagent acoustiquement dans l\'eau.',
      },
    },

    {
      id: 'wq3', category: 'wave', type: 'diagram',
      media: { en: null, fr: null },
      question: {
        en: 'In the open ocean, sound speed increases with depth below the SOFAR axis primarily because of which factor?',
        fr: 'Dans l\'océan ouvert, la vitesse du son augmente avec la profondeur sous l\'axe SOFAR principalement en raison de quel facteur ?',
      },
      options: {
        en: ['A. Increasing temperature', 'B. Decreasing salinity', 'C. Increasing hydrostatic pressure', 'D. Dissolved CO₂'],
        fr: ['A. Augmentation de la température', 'B. Diminution de la salinité', 'C. Augmentation de la pression hydrostatique', 'D. CO₂ dissous'],
      },
      correct: 2,
      explanation: {
        en: 'Below the SOFAR axis, temperature is nearly constant. Sound speed then increases at ~+0.017 m/s per metre depth due to rising hydrostatic pressure compressing the water.',
        fr: 'Sous l\'axe SOFAR, la température est quasi constante. La vitesse du son augmente alors de ~+0,017 m/s par mètre de profondeur en raison de la pression hydrostatique croissante.',
      },
    },

    {
      id: 'wq4', category: 'wave', type: 'diagram',
      media: { en: null, fr: null },
      question: {
        en: 'A convergence zone (CZ) is a region of elevated sound intensity at the ocean surface. Approximately how far is the first CZ in typical North Atlantic conditions?',
        fr: 'Une zone de convergence (ZC) est une région d\'intensité sonore élevée en surface. À quelle distance se situe la première ZC en Atlantique Nord ?',
      },
      options: {
        en: ['A. ~1–5 km', 'B. ~30–60 km', 'C. ~60–100 km', 'D. ~500–1000 km'],
        fr: ['A. ~1–5 km', 'B. ~30–60 km', 'C. ~60–100 km', 'D. ~500–1000 km'],
      },
      correct: 2,
      explanation: {
        en: 'In the North Atlantic, the first convergence zone typically occurs at 60–100 km. Sound rays that dive deep and refract back upward focus at the surface, creating anomalously high intensity.',
        fr: 'En Atlantique Nord, la première zone de convergence se situe typiquement à 60–100 km. Les rayons qui plongent et remontent par réfraction se focalisent en surface, créant une intensité anormalement élevée.',
      },
    },

  ]; // ← end of question list — add new questions above this line

  /* ── Helpers ───────────────────────────────────────────── */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function getByCategory(cat) {
    return all.filter(q => q.category === cat);
  }

  /* ── Public API ────────────────────────────────────────── */
  function getQuestions(category) {
    if (category === 'mixed') {
      // Take up to QUESTIONS_MIXED_PER_CAT from each category, then shuffle all
      const cats = ['acoustics', 'visual', 'wave'];
      const picked = cats.flatMap(c =>
        shuffle(getByCategory(c)).slice(0, QUESTIONS_MIXED_PER_CAT)
      );
      return shuffle(picked);
    }
    // Take up to QUESTIONS_PER_CATEGORY randomly; if pool is smaller, use all
    return shuffle(getByCategory(category)).slice(0, QUESTIONS_PER_CATEGORY);
  }

  return { getQuestions, getByCategory };

})();
