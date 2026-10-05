/* ============================================================
   OceanQuiz — Levels & Question Database
   ============================================================

   ★★★ 1. LEVELS — change difficulty settings here ★★★
   ------------------------------------------------------------
   questions         → how many questions are asked at this level
                       (if your pool is smaller, all questions are used)
   pointsPerQuestion → points won for each correct answer
   minutes           → rough duration, only DISPLAYED on the level card
   icon              → emoji shown on the level card

   Max score of a level = questions × pointsPerQuestion
   (e.g. Easy 5 × 10 = 50  ·  Medium 10 × 15 = 150  ·  Pro 15 × 20 = 300)
   Harder levels give more questions AND more points per answer,
   so a good Pro run always ranks above a good Easy run on the leaderboard.
   ============================================================ */

const LEVELS = {
  easy:   { questions:  5, pointsPerQuestion: 10, minutes: 2, icon: '🐟' },
  medium: { questions: 10, pointsPerQuestion: 15, minutes: 5, icon: '🐬' },
  pro:    { questions: 15, pointsPerQuestion: 20, minutes: 8, icon: '🐋' },
};
const LEVEL_ORDER = ['easy', 'medium', 'pro'];   // order of the cards on screen

/* ============================================================
   ★★★ 1b. INFORMATION SOURCES — shown in small print on screen ★★★
   (edit the text freely; set to '' to hide it)
   ============================================================ */
const INFO_SOURCES = '© DOSITS.org, DORIS.ffessm.fr, ocr.org, weedersdigest.com, American Cetacean Society, Wikipedia';

/* ============================================================
   ★★★ 1c. SOUND FILES — mix mp3 / wav / mp4 freely ★★★
   snd('croaker') → looks for assets/sounds/croaker + one of the
   extensions below, tried in this order, until one plays.
   So you do NOT need to say which format each file has.
   You can also give the extension yourself if you prefer:
   snd('croaker.wav')  (then only that exact file is used).
   ============================================================ */
const SOUND_EXTENSIONS = ['.mp3', '.wav', '.mp4', '.m4a', '.ogg'];
function snd(name) { return 'assets/sounds/' + name; }

/* ============================================================
   ★★★ 2. HOW TO ADD A QUESTION ★★★
   ------------------------------------------------------------
   Copy one of the templates below into the `all` list further
   down (before the line "add new questions above this line"),
   then fill it in. Every question needs a comma after its
   closing brace.

   type can be:  'text'  (no media, just a question)
                 'audio' (a sound the player can listen to)
                 'image' (spectrogram, diagram, photo…)
                 'video' (short clip)

   ── Text question ──
   {
     id: 'q14', type: 'text',
     question:    { en: 'English question?', fr: 'Question en français ?' },
     options: {
       en: ['A. First', 'B. Second', 'C. Third', 'D. Fourth'],
       fr: ['A. Premier', 'B. Deuxième', 'C. Troisième', 'D. Quatrième'],
     },
     correct: 2,                      // 0 = A, 1 = B, 2 = C, 3 = D
     explanation: { en: 'Why it is correct…', fr: 'Pourquoi c\'est correct…' },
   },

   ── Audio question ── (file goes in assets/sounds/)
   {
     id: 'q15', type: 'audio',
     media: 'assets/sounds/my-sound.mp3',
     question: …, options: …, correct: …, explanation: …,
   },

   ── Image question ── (file goes in assets/images/)
   {
     id: 'q16', type: 'image',
     media: 'assets/images/my-spectrogram.png',
     question: …, options: …, correct: …, explanation: …,
   },

   ── Video question ── (file goes in assets/videos/)
   {
     id: 'q17', type: 'video',
     media: 'assets/videos/my-clip.mp4',
     question: …, options: …, correct: …, explanation: …,
   },

   ── Optional extras on ANY question ──
     explanationImage: 'assets/images/my-picture.jpg',  // picture shown WITH the explanation
     explanationImageCredit: '© Photo: NOAA',           // small credit under it (optional)
     shuffle: true,   // answers appear in a random order every game
                      // (then write the CORRECT answer first and use correct: 0)
   If the explanation image file is missing, nothing is shown (no broken icon).

   Notes
   • `media` can be one path used for both languages, or two paths:
       media: { en: 'assets/images/fig-en.png', fr: 'assets/images/fig-fr.png' }
   • The "A." "B." prefixes in the options are optional — the app adds
     the letters itself.
   • `id` is just a label for you (keep it unique).
   • File names are case-sensitive on GitHub Pages:
     'Whale.PNG' and 'whale.png' are NOT the same file.
   • After editing, open the site, press F12 → Console: the app lists
     any mistake it finds in your questions (missing translation,
     wrong `correct` index, …). A broken question is skipped instead
     of crashing the quiz.
   ============================================================ */

const Questions = (() => {

  /* ── Question database ─────────────────────────────────── */
  const all = [

    /* ══════════════════════════════════════════════════════════
       SOUND QUESTIONS (from the spreadsheet)
       Written with the correct answer FIRST (correct: 0);
       `shuffle: true` mixes the answer positions at every game.
       ══════════════════════════════════════════════════════════ */

    {
      id: 's01', type: 'audio', shuffle: true,
      media: snd('Humpback_whale-1'),   // or the web version: 'https://dosits.org/wp-content/uploads/2016/11/Hump1.mp3'
      // ▼ EXAMPLE of an image shown together with the explanation (file goes in assets/images/):
      explanationImage: 'assets/images/humpback-whale.jpg',
      // explanationImageCredit: '© Photo: …',    // optional small credit under the picture
      question: {
        en: 'What produces this sound?',
        fr: 'Qu\'est-ce qui produit ce son ?',
      },
      options: {
        en: ['Humpback whale', 'Blue whale', 'Sperm whale', 'Dolphin'],
        fr: ['Baleine à bosse', 'Baleine bleue', 'Cachalot', 'Dauphin'],
      },
      correct: 0,
      explanation: {
        en: 'Humpback whale males produce long, complex songs lasting up to 20 minutes, composed of repeated sequences of moans, cries and chirps. These songs evolve culturally across populations each breeding season and are thought to play a role in mate attraction.',
        fr: 'Les mâles de baleines à bosse produisent de longs chants complexes pouvant durer jusqu\'à 20 minutes, composés de séquences répétées de gémissements, de cris et de gazouillis. Ces chants évoluent culturellement au sein des populations à chaque saison de reproduction et joueraient un rôle dans l\'attraction des partenaires.',
      },
    },

    {
      id: 's02', type: 'audio', shuffle: true,
      media: snd('croaker'),
      question: { en: 'What produces this sound?', fr: 'Qu\'est-ce qui produit ce son ?' },
      options: {
        en: ['Atlantic croaker', 'Shrimp', 'Drum (instrument)', 'Toadfish'],
        fr: ['Atlantic croaker', 'Crevette', 'Tambour (instrument)', 'Poisson-crapaud'],
      },
      correct: 0,
      explanation: {
        en: 'Both male and female croakers produce sounds: adult males to court females for mating, whilst females and juveniles do so in response to fear.',
        fr: 'Les mâles comme les femelles croakers émettent des sons : les mâles adultes pour séduire les femelles lors de la reproduction, tandis que les femelles et les juvéniles en émettent en réaction à la peur.',
      },
    },

    {
      id: 's03', type: 'audio', shuffle: true,
      media: snd('Iceberg_Collisions'),
      question: { en: 'What produces this sound?', fr: 'Qu\'est-ce qui produit ce son ?' },
      options: {
        en: ['Iceberg collision', 'Container ship', 'Earthquake', 'Motorcycle'],
        fr: ['Collision d\'icebergs', 'Porte-conteneurs', 'Tremblement de terre', 'Moto'],
      },
      correct: 0,
      explanation: {
        en: 'Icebergs drift. They slide against one another and collide. These impacts produce loud noises and vibrations.',
        fr: 'Les icebergs dérivent. Ils glissent les uns contre les autres et entrent en collision. Ces chocs produisent des bruits forts et des vibrations.',
      },
    },

    {
      id: 's04', type: 'audio', shuffle: true,
      media: snd('Spiny_Lobster'),
      question: { en: 'What produces this sound?', fr: 'Qu\'est-ce qui produit ce son ?' },
      options: {
        en: ['Spiny lobster', 'Frog', 'Holocentrus rufus', 'Walrus'],
        fr: ['Langouste', 'Grenouille', 'Holocentrus rufus', 'Morse'],
      },
      correct: 0,
      explanation: {
        en: 'Spiny lobsters produce sounds by vibrating their muscles against their carapace to interact with potential predators or react to aggression. Research suggests that these sounds may also extend to social interactions between members of the same species.',
        fr: 'Les langoustes produisent des sons en faisant vibrer leurs muscles contre leur carapace, pour interagir avec des prédateurs potentiels ou réagir à une agression. Des recherches suggèrent que ces sons pourraient aussi servir aux interactions sociales entre individus de la même espèce.',
      },
    },

    {
      id: 's05', type: 'audio', shuffle: true,
      media: snd('blue-whale'),
      question: { en: 'What produces this sound?', fr: 'Qu\'est-ce qui produit ce son ?' },
      options: {
        en: ['Blue whale', 'Fishing boat', 'Container ship', 'Dolphin'],
        fr: ['Baleine bleue', 'Bateau de pêche', 'Porte-conteneurs', 'Dauphin'],
      },
      correct: 0,
      explanation: {
        en: 'In the past, blue whales used to communicate with one another across entire oceans. Today, the distance over which these whales can hear one another has fallen by 90 per cent due to rising levels of man-made noise.',
        fr: 'Autrefois, les baleines bleues pouvaient communiquer entre elles à travers des océans entiers. Aujourd\'hui, la distance sur laquelle elles peuvent s\'entendre a chuté de 90 % en raison de l\'augmentation du bruit d\'origine humaine.',
      },
    },

    {
      id: 's06', type: 'audio', shuffle: true,
      media: snd('Barred_grunt'),
      question: { en: 'What produces this sound?', fr: 'Qu\'est-ce qui produit ce son ?' },
      options: {
        en: ['Barred grunt', 'Woodpecker', 'Walrus', 'Hammer'],
        fr: ['Barred grunt', 'Pic', 'Morse', 'Marteau'],
      },
      correct: 0,
      explanation: {
        en: 'The barred grunt has teeth in the throat and gill regions; the rubbing of these teeth produces a sound that is amplified by its swim bladder.',
        fr: 'Le barred grunt possède des dents dans la gorge et la région des branchies ; le frottement de ces dents produit un son amplifié par sa vessie natatoire.',
      },
    },

    {
      id: 's07', type: 'audio', shuffle: true,
      media: snd('lights'),
      question: { en: 'What produces this sound?', fr: 'Qu\'est-ce qui produit ce son ?' },
      options: {
        en: ['Lightning', 'Jet ski', 'Sonar', 'Blue whale'],
        fr: ['La foudre', 'Jet-ski', 'Sonar', 'Baleine bleue'],
      },
      correct: 0,
      explanation: {
        en: 'Lightning strikes land much more frequently than the ocean; it strikes coastal waters at a rate of around two strikes per square kilometre per year and is quasi non-existent in the Arctic and Antarctic.',
        fr: 'La foudre frappe les terres bien plus souvent que l\'océan ; elle touche les eaux côtières à raison d\'environ deux impacts par kilomètre carré et par an, et elle est quasi inexistante en Arctique et en Antarctique.',
      },
    },

    {
      id: 's08', type: 'audio', shuffle: true,
      media: snd('ship1s'),
      question: { en: 'What produces this sound?', fr: 'Qu\'est-ce qui produit ce son ?' },
      options: {
        en: ['Container ship', 'Fishing boat', 'Sperm whale', 'Blue whale'],
        fr: ['Porte-conteneurs', 'Bateau de pêche', 'Cachalot', 'Baleine bleue'],
      },
      correct: 0,
      explanation: {
        en: 'Low-frequency noise generated by ships has a significant impact on the increase in ambient noise in the ocean. As a result, low-frequency ambient noise has risen by 10 to 15 decibels over the last 50 years.',
        fr: 'Le bruit basse fréquence généré par les navires contribue fortement à l\'augmentation du bruit ambiant dans l\'océan. Ainsi, le bruit ambiant basse fréquence a augmenté de 10 à 15 décibels au cours des 50 dernières années.',
      },
    },

    {
      id: 's09', type: 'audio', shuffle: true,
      media: snd('toadfishs'),
      question: { en: 'What produces this sound?', fr: 'Qu\'est-ce qui produit ce son ?' },
      options: {
        en: ['Toadfish', 'Goby', 'Pinhead pearlfish', 'Barred grunt'],
        fr: ['Poisson-crapaud', 'Gobie', 'Poisson-perle', 'Barred grunt'],
      },
      correct: 0,
      explanation: {
        en: 'Toadfish can contract their swim bladders up to 300 times per second to produce certain sounds that are essential for them to find one another during the breeding season.',
        fr: 'Les poissons-crapauds peuvent contracter leur vessie natatoire jusqu\'à 300 fois par seconde pour produire certains sons, essentiels pour se retrouver pendant la saison de reproduction.',
      },
    },

    {
      id: 's10', type: 'audio', shuffle: true,
      media: snd('walruss'),
      question: { en: 'What produces this sound?', fr: 'Qu\'est-ce qui produit ce son ?' },
      options: {
        en: ['Walrus', 'Hammer', 'Dolphin', 'Toadfish'],
        fr: ['Morse', 'Marteau', 'Dauphin', 'Poisson-crapaud'],
      },
      correct: 0,
      explanation: {
        en: 'Walruses are the noisiest pinnipeds and make sounds both above and below the water to communicate with their fellow walruses.',
        fr: 'Les morses sont les pinnipèdes les plus bruyants : ils émettent des sons à la fois hors de l\'eau et sous l\'eau pour communiquer avec leurs congénères.',
      },
    },

    {
      id: 's11', type: 'audio', shuffle: true,
      media: snd('Sound 1 - Fish (trumpeter perch)'),
      question: { en: 'What produces this sound?', fr: 'Qu\'est-ce qui produit ce son ?' },
      options: {
        en: ['Trumpeter perch', 'Trumpet', 'Holocentrus rufus', 'Sonar'],
        fr: ['Trumpeter perch', 'Trompette', 'Holocentrus rufus', 'Sonar'],
      },
      correct: 0,
      explanation: {
        en: 'Choruses of trumpeter perch, lasting several hours, can be heard at dusk during the spawning season.',
        fr: 'Des chœurs de trumpeter perch, pouvant durer plusieurs heures, s\'entendent au crépuscule pendant la saison de reproduction.',
      },
    },

    {
      id: 's12', type: 'audio', shuffle: true,
      media: snd('Sound 2 - Sea lion (calls from a female sea lion for her pup)'),
      question: { en: 'What produces this sound?', fr: 'Qu\'est-ce qui produit ce son ?' },
      options: {
        en: ['Sea lion', 'Whale', 'Dolphin', 'Pinhead pearlfish'],
        fr: ['Otarie', 'Baleine', 'Dauphin', 'Poisson-perle'],
      },
      correct: 0,
      explanation: {
        en: 'The underwater calls of sea lions enable them to establish, defend their territory and assert their dominance during the breeding season. They can also serve as a means of social interaction, such as when a female calls to her pups.',
        fr: 'Les cris sous-marins des otaries leur permettent d\'établir et de défendre leur territoire et d\'affirmer leur dominance pendant la saison de reproduction. Ils servent aussi à l\'interaction sociale, par exemple lorsqu\'une femelle appelle son petit.',
      },
    },

    {
      id: 's13', type: 'audio', shuffle: true,
      media: snd('Earthquake'),
      question: { en: 'What produces this sound?', fr: 'Qu\'est-ce qui produit ce son ?' },
      options: {
        en: ['Earthquake', 'Container ship', 'Blue whale', 'Lightning'],
        fr: ['Tremblement de terre', 'Porte-conteneurs', 'Baleine bleue', 'La foudre'],
      },
      correct: 0,
      explanation: {
        en: 'When the ocean floor shifts and causes undersea earthquakes, the low-frequency sounds produced can be heard over very long distances, sometimes thousands of kilometres away. The duration and amplitude of the sound depend on the magnitude of the earthquake.',
        fr: 'Lorsque le plancher océanique se déplace et provoque des séismes sous-marins, les sons basse fréquence produits peuvent s\'entendre sur de très longues distances, parfois à des milliers de kilomètres. La durée et l\'amplitude du son dépendent de la magnitude du séisme.',
      },
    },

    {
      id: 's14', type: 'audio', shuffle: true,
      media: snd('Sound 6 - Goby grunts'),
      question: { en: 'What produces this sound?', fr: 'Qu\'est-ce qui produit ce son ?' },
      options: {
        en: ['Goby', 'Barred grunt', 'Walrus', 'Pinhead pearlfish'],
        fr: ['Gobie', 'Barred grunt', 'Morse', 'Poisson-perle'],
      },
      correct: 0,
      explanation: {
        en: 'Gobies produce various characteristic sounds: some to attract females during the breeding season (with the male either inside or outside the nest), and others to defend their territory.',
        fr: 'Les gobies produisent différents sons caractéristiques : certains pour attirer les femelles pendant la saison de reproduction (le mâle étant dans ou hors du nid), d\'autres pour défendre leur territoire.',
      },
    },

    {
      id: 's15', type: 'audio', shuffle: true,
      media: snd('Sound 1 - Pinhead pearlfish'),
      question: { en: 'What produces this sound?', fr: 'Qu\'est-ce qui produit ce son ?' },
      options: {
        en: ['Pinhead pearlfish', 'Toadfish', 'Fishing boat', 'Goby'],
        fr: ['Poisson-perle', 'Poisson-crapaud', 'Bateau de pêche', 'Gobie'],
      },
      correct: 0,
      explanation: {
        en: 'Pearlfish live inside sea cucumbers (or other hosts such as starfish and oysters) and leave them at night to feed. Their sounds are short, repeated knocks, made by a swim-bladder mechanism in which a muscle slowly pulls on a thin membrane that then snaps back — a trick that researchers describe as unique in the animal world. They are mostly heard when several fish share the same host, and the host\'s body barely muffles the sound.',
        fr: 'Les poissons-perles vivent à l\'intérieur de concombres de mer (ou d\'autres hôtes comme les étoiles de mer et les huîtres) et en sortent la nuit pour se nourrir. Leurs sons sont de courts coups répétés, produits par un mécanisme de la vessie natatoire : un muscle tire lentement sur une fine membrane qui se détend ensuite d\'un coup — un procédé que les chercheurs décrivent comme unique dans le monde animal. On les entend surtout lorsque plusieurs poissons partagent le même hôte, dont le corps étouffe à peine le son.',
      },
    },

    {
      id: 's16', type: 'audio', shuffle: true,
      media: snd('4_Holocentrus rufus'),
      question: { en: 'What produces this sound?', fr: 'Qu\'est-ce qui produit ce son ?' },
      options: {
        en: ['Holocentrus rufus', 'Goby', 'Toadfish', 'Trumpet'],
        fr: ['Holocentrus rufus', 'Gobie', 'Poisson-crapaud', 'Trompette'],
      },
      correct: 0,
      explanation: {
        en: 'Holocentrus rufus are capable of producing sounds by causing their ribs to vibrate against their swim bladder (a gas-filled sac), which is in contact with the inner ear: this adaptation may enhance their hearing abilities.',
        fr: 'Holocentrus rufus est capable de produire des sons en faisant vibrer ses côtes contre sa vessie natatoire (une poche remplie de gaz), en contact avec l\'oreille interne : cette adaptation pourrait améliorer son audition.',
      },
    },

    {
      id: 's17', type: 'audio', shuffle: true,
      media: snd('Explosion'),
      question: { en: 'What produces this sound?', fr: 'Qu\'est-ce qui produit ce son ?' },
      options: {
        en: ['Explosion', 'Lightning', 'Sonar', 'Container ship'],
        fr: ['Une explosion', 'La foudre', 'Sonar', 'Porte-conteneurs'],
      },
      correct: 0,
      explanation: {
        en: 'The signals generated by underwater explosions can travel hundreds of kilometres; they have a varying degree of impact on the biodiversity surrounding the epicentre of the explosion.',
        fr: 'Les signaux générés par les explosions sous-marines peuvent parcourir des centaines de kilomètres ; ils ont un impact plus ou moins important sur la biodiversité autour de l\'épicentre de l\'explosion.',
      },
    },

    {
      id: 's18', type: 'audio', shuffle: true,
      media: snd('Sonar'),
      question: { en: 'What produces this sound?', fr: 'Qu\'est-ce qui produit ce son ?' },
      options: {
        en: ['Sonar', 'Fishing boat', 'Dolphin', 'Walrus'],
        fr: ['Sonar', 'Bateau de pêche', 'Dauphin', 'Morse'],
      },
      correct: 0,
      explanation: {
        en: 'The sound travels from the source, and reverberations and echoes are heard in return; they bounce off objects and marine life in the ocean. This also makes it possible to tell whether an object is moving towards or away from the transmitter.',
        fr: 'Le son part de la source, et des réverbérations et des échos reviennent : ils rebondissent sur les objets et sur la vie marine. Cela permet aussi de savoir si un objet se rapproche ou s\'éloigne de l\'émetteur.',
      },
    },

    {
      id: 's19', type: 'audio', shuffle: true,
      media: snd('FishingBoat'),
      question: { en: 'What produces this sound?', fr: 'Qu\'est-ce qui produit ce son ?' },
      options: {
        en: ['Fishing boat', 'Jet ski', 'Earthquake', 'Humpback whale'],
        fr: ['Bateau de pêche', 'Jet-ski', 'Tremblement de terre', 'Baleine à bosse'],
      },
      correct: 0,
      explanation: {
        en: 'Studies show that noise from boats affects fish in their search for food and their ability to detect approaching predators, leading to increased mortality.',
        fr: 'Des études montrent que le bruit des bateaux perturbe la recherche de nourriture des poissons et leur capacité à détecter les prédateurs qui approchent, ce qui entraîne une hausse de la mortalité.',
      },
    },

    /* ══════════════════════════════════════════════════════════
       OTHER QUESTIONS (spectrograms, diagrams, text)
       ══════════════════════════════════════════════════════════ */

    {
      id: 'q02', type: 'audio',
      media: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Humpback_Whale_song.ogg',
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
      id: 'q03', type: 'text',
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
      id: 'q04', type: 'text',
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

    {
      id: 'q05', type: 'image',
      media: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Call_spectrogram.png',
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
      id: 'q06', type: 'text',
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
      id: 'q07', type: 'text',
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
      id: 'q08', type: 'text',
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

    {
      id: 'q09', type: 'image',
      media: 'assets/images/bottlenosedolphin_1.png',
      question: {
        en: 'Look at the spectrogram. Which animal produces this sound?',
        fr: 'Regardez le spectrogramme. Quel animal émet ce son ?',
      },
      options: {
        en: ['A. Humpback whale', 'B. Tiger shark', 'C. Bottlenose dolphin', 'D. Albatross'],
        fr: ['A. Baleine à bosse', 'B. Requin tigre', 'C. Grand dauphin', 'D. Albatros'],
      },
      correct: 2,
      explanation: {
        en: 'Bottlenose dolphins produce so-called "signature whistles" — individual-specific calls they use to identify themselves to other members of their group.',
        fr: 'Les grands dauphins produisent ce qu\'on appelle des "sifflements signature" — des vocalisations propres à chaque individu, utilisées pour se faire reconnaître au sein de leur groupe.',
      },
    },

    {
      id: 'q10', type: 'image',
      media: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/SOFAR_channel.svg/800px-SOFAR_channel.svg.png',
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
      id: 'q11', type: 'image',
      media: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Seismic_waves.svg/800px-Seismic_waves.svg.png',
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
      id: 'q12', type: 'text',
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
      id: 'q13', type: 'text',
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

    /* ▼▼▼  PASTE YOUR NEW QUESTIONS HERE (above this line)  ▼▼▼ */

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

  /* Media path for a language. `media` may be a single string
     (used for both languages) or { en: '…', fr: '…' }.           */
  function getMedia(q, lang) {
    if (!q.media) return null;
    if (typeof q.media === 'string') return q.media;
    return q.media[lang] || q.media.en || q.media.fr || null;
  }

  /* Explanation picture (optional): returns { src, credit } or null.
     Both fields may be a string or { en: '…', fr: '…' }.           */
  function pick(v, lang) {
    if (!v) return null;
    return typeof v === 'string' ? v : (v[lang] || v.en || v.fr || null);
  }
  function getExplanationImage(q, lang) {
    const src = pick(q.explanationImage, lang);
    return src ? { src, credit: pick(q.explanationImageCredit, lang) } : null;
  }

  /* With `shuffle: true` the answers are mixed (same order in EN and FR,
     `correct` follows the right answer).                                */
  function withShuffledOptions(q) {
    if (!q.shuffle) return q;
    const order = shuffle(q.options.en.map((_, i) => i));
    return {
      ...q,
      options: { en: order.map(i => q.options.en[i]), fr: order.map(i => q.options.fr[i]) },
      correct: order.indexOf(q.correct),
    };
  }

  /* A question is playable only if the essentials are present. */
  function isPlayable(q) {
    return ['en', 'fr'].every(l =>
      q && q.question && q.question[l] &&
      q.options && Array.isArray(q.options[l]) && q.options[l].length >= 2
    ) && Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.options.en.length;
  }

  /* Console warnings (F12) to help you spot mistakes when editing. */
  function validate() {
    const seen = new Set();
    all.forEach((q, i) => {
      const tag = `[OceanQuiz] Question #${i + 1} (${(q && q.id) || 'no id'})`;
      if (q && q.id) {
        if (seen.has(q.id)) console.warn(`${tag}: duplicate id`);
        seen.add(q.id);
      }
      if (!isPlayable(q)) {
        console.warn(`${tag}: SKIPPED — check question/options in both languages and that "correct" is a valid 0-based index.`);
        return;
      }
      if (q.options.en.length !== q.options.fr.length)
        console.warn(`${tag}: EN and FR have a different number of options.`);
      if (!q.explanation || !q.explanation.en || !q.explanation.fr)
        console.warn(`${tag}: explanation missing in EN or FR.`);
      if (q.type && q.type !== 'text' && !getMedia(q, 'en'))
        console.warn(`${tag}: type is "${q.type}" but no "media" path is given.`);
    });
    const n = all.filter(isPlayable).length;
    LEVEL_ORDER.forEach(l => {
      if (LEVELS[l] && n < LEVELS[l].questions)
        console.info(`[OceanQuiz] Level "${l}" asks for ${LEVELS[l].questions} questions but only ${n} are available — all ${n} will be used.`);
    });
  }
  validate();

  /* ── Public API ────────────────────────────────────────── */
  function poolSize() { return all.filter(isPlayable).length; }

  /* Random selection for a level (different every game). */
  function getQuestions(level) {
    const cfg = LEVELS[level];
    const n = cfg ? cfg.questions : poolSize();
    return shuffle(all.filter(isPlayable)).slice(0, n).map(withShuffledOptions);
  }

  return { getQuestions, getMedia, getExplanationImage, poolSize };

})();
