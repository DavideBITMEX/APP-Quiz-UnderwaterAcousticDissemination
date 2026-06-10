/* ============================================================
   OceanQuiz — Question Database
   ============================================================
   HOW TO ADD QUESTIONS
   ─────────────────────────────────────────────────────────────
   Each question object:
   {
     id:       'unique-string',
     category: 'acoustics' | 'visual' | 'wave',
     type:     'audio' | 'image' | 'diagram',

     // Media (optional — omit or set null for text-only):
     media: {
       en: 'path/or/url.ogg',   // can differ per language, or same
       fr: 'path/or/url.ogg',   // use null if no file yet
     },

     // Question text (bilingual):
     question: { en: '...', fr: '...' },

     // Answer options A-D:
     options: {
       en: ['A. ...', 'B. ...', 'C. ...', 'D. ...'],
       fr: ['A. ...', 'B. ...', 'C. ...', 'D. ...'],
     },

     correct: 0,   // 0-based index of the correct option

     // Explanation shown after answering:
     explanation: { en: '...', fr: '...' },
   }

   Put your local media files under:
     assets/sounds/   (audio)
     assets/images/   (spectrograms / diagrams)
     assets/videos/   (videos)
   ============================================================ */

const Questions = (() => {

  const all = [

    /* ══════════════════════════════════════════════════════
       ACOUSTICS — identify sounds by ear
       ══════════════════════════════════════════════════════ */
    {
      id: 'aq1',
      category: 'acoustics',
      type: 'audio',
      media: {
        en: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Blue_Whale_-_NOAA.ogg',
        fr: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Blue_Whale_-_NOAA.ogg',
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
        fr: 'Les baleines bleues produisent les sons les plus graves de tout le règne animal — entre ~10 et 40 Hz. Ce "D-call" caractéristique a été enregistré par la NOAA.',
      },
    },

    {
      id: 'aq2',
      category: 'acoustics',
      type: 'audio',
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
        fr: ['A. Baleine bleue', 'B. Orque', 'C. Baleine à bosse', 'D. Baleine de Sei'],
      },
      correct: 2,
      explanation: {
        en: 'Humpback whale males produce elaborate songs lasting up to 20 minutes, which evolve culturally across populations each breeding season.',
        fr: 'Les mâles de baleines à bosse produisent des chants élaborés pouvant durer jusqu\'à 20 minutes, qui évoluent culturellement au sein des populations à chaque saison de reproduction.',
      },
    },

    {
      id: 'aq3',
      category: 'acoustics',
      type: 'audio',
      media: { en: null, fr: null },
      question: {
        en: 'Seismic airgun arrays are used in ocean floor surveys. What is their primary acoustic characteristic?',
        fr: 'Les canons à air sismiques sont utilisés dans les relevés du fond océanique. Quelle est leur principale caractéristique acoustique ?',
      },
      options: {
        en: [
          'A. Narrow-band signal centred at 1 kHz',
          'B. Broadband impulsive pulses (5–300 Hz)',
          'C. Pure tone at 50 Hz',
          'D. High-frequency clicks above 20 kHz',
        ],
        fr: [
          'A. Signal à bande étroite centré à 1 kHz',
          'B. Impulsions large bande (5–300 Hz)',
          'C. Tonalité pure à 50 Hz',
          'D. Clics haute fréquence au-dessus de 20 kHz',
        ],
      },
      correct: 1,
      explanation: {
        en: 'Seismic air-gun arrays release compressed air to produce broadband impulsive signals primarily between 5 and 300 Hz, penetrating the seafloor to map geological structures.',
        fr: 'Les canons à air sismiques libèrent de l\'air comprimé pour produire des signaux impulsionnels large bande principalement entre 5 et 300 Hz, pénétrant le fond marin pour cartographier les structures géologiques.',
      },
    },

    {
      id: 'aq4',
      category: 'acoustics',
      type: 'audio',
      media: { en: null, fr: null },
      question: {
        en: 'Sperm whales use bio-sonar clicks for echolocation. In which frequency range do these clicks primarily fall?',
        fr: 'Les cachalots utilisent des clics de bio-sonar pour l\'écholocation. Dans quelle plage de fréquences ces clics se situent-ils principalement ?',
      },
      options: {
        en: [
          'A. 10–100 Hz (infrasound range)',
          'B. 100 Hz–1 kHz (low audio)',
          'C. 1–30 kHz (mid–high audio)',
          'D. 100 kHz–1 MHz (ultrasound)',
        ],
        fr: [
          'A. 10–100 Hz (infrason)',
          'B. 100 Hz–1 kHz (audio basse fréquence)',
          'C. 1–30 kHz (audio moyen–haute fréquence)',
          'D. 100 kHz–1 MHz (ultrason)',
        ],
      },
      correct: 2,
      explanation: {
        en: 'Sperm whale echolocation clicks are broadband, with most energy between 2 and 30 kHz. Their "regular clicks" (codas) are used for communication, while rapid "creaks" are used for prey targeting.',
        fr: 'Les clics d\'écholocation des cachalots sont large bande, avec l\'essentiel de l\'énergie entre 2 et 30 kHz. Leurs "clics réguliers" (codas) servent à la communication, tandis que les "couinements" rapides ciblent les proies.',
      },
    },

    /* ══════════════════════════════════════════════════════
       VISUAL — spectrograms & diagrams
       ══════════════════════════════════════════════════════ */
    {
      id: 'vq1',
      category: 'visual',
      type: 'image',
      media: {
        en: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Call_spectrogram.png',
        fr: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Call_spectrogram.png',
      },
      question: {
        en: 'Examine this spectrogram. The narrow frequency band below 100 Hz with a long duration is characteristic of which source?',
        fr: 'Examinez ce spectrogramme. La bande de fréquence étroite en dessous de 100 Hz avec une longue durée est caractéristique de quelle source ?',
      },
      options: {
        en: [
          'A. Ship propeller cavitation',
          'B. Blue whale D-call',
          'C. Dolphin whistle',
          'D. Earthquake T-phase',
        ],
        fr: [
          'A. Cavitation d\'hélice de navire',
          'B. D-call de baleine bleue',
          'C. Sifflement de dauphin',
          'D. Phase T sismique',
        ],
      },
      correct: 1,
      explanation: {
        en: 'Blue whale D-calls appear as narrow-band tonal signals below 100 Hz lasting several seconds on spectrograms. This distinguishes them from broadband noise sources.',
        fr: 'Les D-calls de baleine bleue apparaissent comme des signaux tonals à bande étroite en dessous de 100 Hz, d\'une durée de plusieurs secondes sur les spectrogrammes. Cela les distingue des sources de bruit large bande.',
      },
    },

    {
      id: 'vq2',
      category: 'visual',
      type: 'image',
      media: { en: null, fr: null },
      question: {
        en: 'On a dolphin echolocation spectrogram, the clicks appear as vertical broadband striations. What does the spacing between striations indicate?',
        fr: 'Sur un spectrogramme d\'écholocation de dauphin, les clics apparaissent comme des stries verticales large bande. Qu\'indique l\'espacement entre les stries ?',
      },
      options: {
        en: [
          'A. The frequency of the signal',
          'B. The water temperature',
          'C. The inter-click interval, related to target distance',
          'D. The depth of the animal',
        ],
        fr: [
          'A. La fréquence du signal',
          'B. La température de l\'eau',
          'C. L\'intervalle inter-clics, lié à la distance de la cible',
          'D. La profondeur de l\'animal',
        ],
      },
      correct: 2,
      explanation: {
        en: 'Dolphins adjust the inter-click interval (ICI) so the next click is sent only after the previous echo returns. This means the ICI ≈ 2 × (target distance) / (sound speed in water ≈ 1500 m/s).',
        fr: 'Les dauphins ajustent l\'intervalle inter-clics (ICI) de sorte que le prochain clic n\'est émis qu\'après le retour de l\'écho précédent. Ainsi, ICI ≈ 2 × (distance cible) / (vitesse du son dans l\'eau ≈ 1500 m/s).',
      },
    },

    {
      id: 'vq3',
      category: 'visual',
      type: 'image',
      media: { en: null, fr: null },
      question: {
        en: 'Ship propeller cavitation appears on a spectrogram as a broadband tonal hum with harmonics. Roughly at what fundamental frequency does this typically appear for large cargo vessels?',
        fr: 'La cavitation d\'hélice de navire apparaît sur un spectrogramme comme un bourdonnement tonal large bande avec des harmoniques. À quelle fréquence fondamentale cela apparaît-il typiquement pour les grands navires cargo ?',
      },
      options: {
        en: [
          'A. 0.01–0.1 Hz',
          'B. 1–30 Hz',
          'C. 1–10 kHz',
          'D. 20–100 kHz',
        ],
        fr: [
          'A. 0,01–0,1 Hz',
          'B. 1–30 Hz',
          'C. 1–10 kHz',
          'D. 20–100 kHz',
        ],
      },
      correct: 1,
      explanation: {
        en: 'The blade-rate fundamental of large ship propellers typically falls in the 1–30 Hz range (blade count × rotational speed). Higher harmonics extend into hundreds of Hz, collectively comprising the characteristic low-frequency shipping noise.',
        fr: 'La fréquence fondamentale de pale des grands propulseurs de navires se situe typiquement dans la plage 1–30 Hz (nombre de pales × vitesse de rotation). Les harmoniques supérieures s\'étendent jusqu\'à plusieurs centaines de Hz, constituant le bruit de trafic maritime basse fréquence caractéristique.',
      },
    },

    {
      id: 'vq4',
      category: 'visual',
      type: 'image',
      media: { en: null, fr: null },
      question: {
        en: 'A T-phase (tertiary phase) on a hydrophone spectrogram appears as a sustained signal arriving after the P and S waves. Through which medium does it propagate?',
        fr: 'Une phase T (phase tertiaire) sur un spectrogramme d\'hydrophone apparaît comme un signal soutenu arrivant après les ondes P et S. Par quel milieu se propage-t-elle ?',
      },
      options: {
        en: [
          'A. Through the solid upper crust',
          'B. Through the oceanic SOFAR channel as an acoustic wave',
          'C. Along the seafloor as a Stoneley wave',
          'D. Through the atmosphere as an infrasound wave',
        ],
        fr: [
          'A. À travers la croûte supérieure solide',
          'B. Via le canal SOFAR océanique comme onde acoustique',
          'C. Le long du fond marin comme onde de Stoneley',
          'D. À travers l\'atmosphère comme onde infrasonore',
        ],
      },
      correct: 1,
      explanation: {
        en: 'The T-phase converts from a seismic wave at a continent or seamount, then travels highly efficiently through the SOFAR channel (Sound Fixing And Ranging) as an acoustic wave, losing very little energy over thousands of kilometres.',
        fr: 'La phase T se convertit d\'une onde sismique au niveau d\'un continent ou d\'un mont sous-marin, puis se propage très efficacement via le canal SOFAR (Sound Fixing And Ranging) comme onde acoustique, perdant très peu d\'énergie sur des milliers de kilomètres.',
      },
    },

    /* ══════════════════════════════════════════════════════
       WAVE PROPAGATION — physics of sound in the ocean
       ══════════════════════════════════════════════════════ */
    {
      id: 'wq1',
      category: 'wave',
      type: 'diagram',
      media: {
        en: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/SOFAR_channel.svg/800px-SOFAR_channel.svg.png',
        fr: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/SOFAR_channel.svg/800px-SOFAR_channel.svg.png',
      },
      question: {
        en: 'The diagram shows a sound-speed profile with a distinct minimum at depth. What phenomenon does this minimum create?',
        fr: 'Le diagramme montre un profil de vitesse du son avec un minimum distinct en profondeur. Quel phénomène ce minimum crée-t-il ?',
      },
      options: {
        en: [
          'A. A thermocline barrier that blocks all sound',
          'B. The SOFAR channel — a natural waveguide for long-range propagation',
          'C. A pressure node that amplifies surface waves',
          'D. An acoustic shadow zone near the surface',
        ],
        fr: [
          'A. Une barrière thermocline bloquant tous les sons',
          'B. Le canal SOFAR — un guide d\'ondes naturel pour la propagation longue portée',
          'C. Un nœud de pression amplifiant les ondes de surface',
          'D. Une zone d\'ombre acoustique près de la surface',
        ],
      },
      correct: 1,
      explanation: {
        en: 'Sound rays bend toward regions of lower speed (Snell\'s law). The speed minimum at ~800–1000 m depth in mid-latitudes acts as an axis around which rays oscillate, trapping energy in the SOFAR channel and enabling propagation over thousands of kilometres.',
        fr: 'Les rayons sonores se courbent vers les régions de vitesse inférieure (loi de Snell). Le minimum de vitesse à ~800–1000 m de profondeur aux latitudes moyennes sert d\'axe autour duquel les rayons oscillent, piégeant l\'énergie dans le canal SOFAR et permettant une propagation sur des milliers de kilomètres.',
      },
    },

    {
      id: 'wq2',
      category: 'wave',
      type: 'diagram',
      media: {
        en: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Seismic_waves.svg/800px-Seismic_waves.svg.png',
        fr: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Seismic_waves.svg/800px-Seismic_waves.svg.png',
      },
      question: {
        en: 'Looking at the seismic wave diagram, which wave type travels only along the Earth\'s surface and cannot propagate through the deep ocean interior?',
        fr: 'En regardant le diagramme des ondes sismiques, quel type d\'onde se propage uniquement à la surface de la Terre et ne peut pas se propager dans les profondeurs de l\'océan ?',
      },
      options: {
        en: [
          'A. P-waves (compressional)',
          'B. S-waves (shear)',
          'C. Surface waves (Rayleigh / Love)',
          'D. T-waves (acoustic)',
        ],
        fr: [
          'A. Ondes P (compression)',
          'B. Ondes S (cisaillement)',
          'C. Ondes de surface (Rayleigh / Love)',
          'D. Ondes T (acoustiques)',
        ],
      },
      correct: 2,
      explanation: {
        en: 'Surface waves (Rayleigh and Love) travel along the Earth\'s surface and decay exponentially with depth. P-waves travel through any medium; S-waves travel through solids only; T-waves travel through the ocean as acoustic waves.',
        fr: 'Les ondes de surface (Rayleigh et Love) se propagent à la surface de la Terre et décroissent exponentiellement en profondeur. Les ondes P traversent tout milieu ; les ondes S traversent uniquement les solides ; les ondes T traversent l\'océan comme ondes acoustiques.',
      },
    },

    {
      id: 'wq3',
      category: 'wave',
      type: 'diagram',
      media: { en: null, fr: null },
      question: {
        en: 'In the open ocean, sound speed increases with depth below the SOFAR axis primarily because of which factor?',
        fr: 'Dans l\'océan ouvert, la vitesse du son augmente avec la profondeur sous l\'axe SOFAR principalement en raison de quel facteur ?',
      },
      options: {
        en: [
          'A. Increasing temperature',
          'B. Decreasing salinity',
          'C. Increasing hydrostatic pressure',
          'D. Presence of dissolved CO₂',
        ],
        fr: [
          'A. Augmentation de la température',
          'B. Diminution de la salinité',
          'C. Augmentation de la pression hydrostatique',
          'D. Présence de CO₂ dissous',
        ],
      },
      correct: 2,
      explanation: {
        en: 'Below the SOFAR axis, temperature is nearly constant (deep water is cold and uniform). Sound speed then increases at roughly +0.017 m/s per metre depth due to rising hydrostatic pressure compressing the water.',
        fr: 'Sous l\'axe SOFAR, la température est quasi constante (l\'eau profonde est froide et homogène). La vitesse du son augmente alors d\'environ +0,017 m/s par mètre de profondeur en raison de la pression hydrostatique croissante qui comprime l\'eau.',
      },
    },

    {
      id: 'wq4',
      category: 'wave',
      type: 'diagram',
      media: { en: null, fr: null },
      question: {
        en: 'A convergence zone (CZ) is a region of elevated sound intensity at the ocean surface. Approximately how far is the first CZ from a source in typical North Atlantic conditions?',
        fr: 'Une zone de convergence (ZC) est une région d\'intensité sonore élevée en surface océanique. À quelle distance se situe approximativement la première ZC dans des conditions typiques de l\'Atlantique Nord ?',
      },
      options: {
        en: [
          'A. ~1–5 km',
          'B. ~30–60 km',
          'C. ~60–100 km',
          'D. ~500–1000 km',
        ],
        fr: [
          'A. ~1–5 km',
          'B. ~30–60 km',
          'C. ~60–100 km',
          'D. ~500–1000 km',
        ],
      },
      correct: 2,
      explanation: {
        en: 'In the North Atlantic, the first convergence zone typically occurs at 60–100 km (35–60 nautical miles) from the source. Sound rays that dive deep and refract back upward focus at the surface in an annular ring, creating a zone of anomalously high sound intensity.',
        fr: 'Dans l\'Atlantique Nord, la première zone de convergence se situe typiquement à 60–100 km (35–60 milles nautiques) de la source. Les rayons sonores qui plongent profondément et remontent par réfraction se focalisent en surface en un anneau, créant une zone d\'intensité sonore anormalement élevée.',
      },
    },

  ]; // end all[]

  /* ── Public API ──────────────────────────────────────── */

  function getByCategory(cat) {
    return all.filter(q => q.category === cat);
  }

  function getMixed(n) {
    // n questions per category, shuffled
    const cats = ['acoustics', 'visual', 'wave'];
    const picked = cats.flatMap(c => shuffle(getByCategory(c)).slice(0, n));
    return shuffle(picked);
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function getQuestions(category) {
    if (category === 'mixed') return getMixed(2);
    return shuffle(getByCategory(category));
  }

  return { getQuestions, getByCategory, getMixed };

})();
