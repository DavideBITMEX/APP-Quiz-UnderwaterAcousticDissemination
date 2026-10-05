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
const SOUND_EXTENSIONS = ['.mp3', '.wav', '.mp4', '.m4a', '.ogg', '.MP3', '.WAV', '.MP4', '.M4A', '.OGG'];
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
       GENERAL-PUBLIC QUESTIONS (no sound to play)
       Underwater acoustics · bioacoustics · seismology
       Written with the correct answer FIRST; `shuffle: true` mixes the answers each game.

       IMAGES — two kinds, both optional:
        • explanationImage → shown WITH the explanation. Lines below are already active:
          drop a file with that exact name in assets/images/ and it appears
          (if the file is missing, nothing is shown).
        • question image  → shown ABOVE the question. Lines marked "IMAGE IDEA" are
          commented out: to use one, change type to 'image' and uncomment `media`.
       ══════════════════════════════════════════════════════════ */

    {
      id: 'g01', type: 'text', shuffle: true,
      explanationImage: 'assets/images/speed-of-sound.png',     // IDEA: infographic — speed of sound in air / water / steel
      question: {
        en: 'Sound travels much faster in water than in air. About how many times faster?',
        fr: 'Le son se propage beaucoup plus vite dans l\'eau que dans l\'air. Environ combien de fois plus vite ?',
      },
      options: {
        en: ['About 4 times faster', 'About the same speed', 'About 2 times slower', 'About 100 times faster'],
        fr: ['Environ 4 fois plus vite', 'À peu près à la même vitesse', 'Environ 2 fois plus lentement', 'Environ 100 fois plus vite'],
      },
      correct: 0,
      explanation: {
        en: 'In air, sound travels at about 340 metres per second. In seawater it reaches about 1,500 metres per second — roughly 4 times faster. This is one reason why sound is such an efficient way for marine animals, and for scientists, to send information over long distances.',
        fr: 'Dans l\'air, le son se propage à environ 340 mètres par seconde. Dans l\'eau de mer, il atteint environ 1 500 mètres par seconde, soit environ 4 fois plus vite. C\'est l\'une des raisons pour lesquelles le son est un moyen si efficace, pour les animaux marins comme pour les scientifiques, de transmettre des informations sur de longues distances.',
      },
    },

    {
      id: 'g02', type: 'text', shuffle: true,
      explanationImage: 'assets/images/sonar-echo.png',         // IDEA: diagram of a ship sending a sonar ping and receiving the echo
      question: {
        en: 'How does a ship\'s sonar measure how deep the sea is?',
        fr: 'Comment le sonar d\'un navire mesure-t-il la profondeur de la mer ?',
      },
      options: {
        en: ['It sends a sound pulse down and times how long the echo takes to return', 'It lowers a very long rope with a weight at the end', 'It shines a laser beam down to the seabed', 'It measures how warm the water is at the bottom'],
        fr: ['Il envoie une impulsion sonore vers le fond et mesure le temps que l\'écho met à revenir', 'Il descend une très longue corde avec un poids au bout', 'Il envoie un rayon laser jusqu\'au fond', 'Il mesure la chaleur de l\'eau au fond'],
      },
      correct: 0,
      explanation: {
        en: 'A sonar (SOund Navigation And Ranging) sends a short sound pulse towards the seabed and listens for its echo. Since sound travels at about 1,500 metres per second in water, the depth is half of the travel time multiplied by that speed: an echo returning after 2 seconds means the seabed is about 1,500 metres below the ship.',
        fr: 'Un sonar (SOund Navigation And Ranging, « navigation et télémétrie par le son ») envoie une courte impulsion sonore vers le fond et écoute son écho. Comme le son parcourt environ 1 500 mètres par seconde dans l\'eau, la profondeur est la moitié du temps de trajet multipliée par cette vitesse : un écho qui revient après 2 secondes signifie que le fond se trouve à environ 1 500 mètres sous le navire.',
      },
    },

    {
      id: 'g03', type: 'text', shuffle: true,
      explanationImage: 'assets/images/sound-surface-reflection.png',   // IDEA: diagram — sound from the air bouncing off the water surface
      question: {
        en: 'When you are underwater, why can you hardly hear people talking above the surface?',
        fr: 'Quand on est sous l\'eau, pourquoi entend-on à peine les personnes qui parlent à l\'air libre ?',
      },
      options: {
        en: ['Almost all the sound bounces off the water surface', 'Sound cannot travel through water', 'The water is too cold for sound to pass', 'The people are always speaking too quietly'],
        fr: ['Presque tout le son rebondit sur la surface de l\'eau', 'Le son ne peut pas se propager dans l\'eau', 'L\'eau est trop froide pour laisser passer le son', 'Les gens parlent toujours trop doucement'],
      },
      correct: 0,
      explanation: {
        en: 'Air and water are so different (water is about 800 times denser than air) that more than 99.9% of the sound energy coming from the air is reflected by the surface, a bit like light on a mirror. Only a tiny part gets through. The same happens the other way round: sounds made underwater mostly stay underwater.',
        fr: 'L\'air et l\'eau sont si différents (l\'eau est environ 800 fois plus dense que l\'air) que plus de 99,9 % de l\'énergie sonore venant de l\'air est réfléchie par la surface, un peu comme la lumière sur un miroir. Seule une toute petite partie passe. C\'est pareil dans l\'autre sens : les sons produits sous l\'eau restent en grande partie sous l\'eau.',
      },
    },

    {
      id: 'g04', type: 'text', shuffle: true,
      explanationImage: 'assets/images/ocean-light-zones.png',  // IDEA: diagram of the ocean's light zones (sunlit / twilight / dark)
      question: {
        en: 'Why do so many sea animals use sound, rather than sight, to communicate and find food?',
        fr: 'Pourquoi tant d\'animaux marins utilisent-ils le son plutôt que la vue pour communiquer et trouver de la nourriture ?',
      },
      options: {
        en: ['Light fades quickly in water, while sound travels very far', 'Most sea animals have no eyes', 'Light cannot enter the water at all', 'Their eyes only work at night'],
        fr: ['La lumière s\'atténue vite dans l\'eau, alors que le son porte très loin', 'La plupart des animaux marins n\'ont pas d\'yeux', 'La lumière ne peut pas pénétrer dans l\'eau', 'Leurs yeux ne fonctionnent que la nuit'],
      },
      correct: 0,
      explanation: {
        en: 'Water absorbs sunlight quickly: below about 200 metres there is very little light left, and below 1,000 metres it is completely dark. Even in clear surface water, you can rarely see more than a few tens of metres. Sound, on the other hand, travels fast and far — the lowest sounds can cross entire oceans — so listening and calling is far more useful than looking.',
        fr: 'L\'eau absorbe rapidement la lumière du soleil : en dessous d\'environ 200 mètres il reste très peu de lumière, et en dessous de 1 000 mètres c\'est l\'obscurité totale. Même dans une eau claire, on voit rarement à plus de quelques dizaines de mètres. Le son, lui, se propage vite et loin — les sons les plus graves peuvent traverser des océans entiers — si bien qu\'écouter et émettre des sons est bien plus utile que regarder.',
      },
    },

    {
      id: 'g05', type: 'text', shuffle: true,
      // no image needed for this one
      question: {
        en: 'Which unit is used to measure how LOUD a sound is?',
        fr: 'Quelle unité sert à mesurer l\'intensité (le « volume ») d\'un son ?',
      },
      options: {
        en: ['Decibel (dB)', 'Hertz (Hz)', 'Kelvin (K)', 'Kilogram (kg)'],
        fr: ['Décibel (dB)', 'Hertz (Hz)', 'Kelvin (K)', 'Kilogramme (kg)'],
      },
      correct: 0,
      explanation: {
        en: 'Loudness is measured in decibels (dB). The scale is not linear: every +10 dB means a sound that is 10 times more intense. Hertz (Hz), the other famous unit of sound, measures the pitch — how low or high a sound is. Careful: decibels underwater and in air use different reference values, so their numbers cannot be compared directly.',
        fr: 'L\'intensité sonore se mesure en décibels (dB). L\'échelle n\'est pas linéaire : chaque tranche de +10 dB correspond à un son 10 fois plus intense. Le hertz (Hz), l\'autre unité célèbre du son, mesure la hauteur du son : s\'il est grave ou aigu. Attention : les décibels sous l\'eau et dans l\'air n\'ont pas la même référence, leurs valeurs ne peuvent donc pas être comparées directement.',
      },
    },

    {
      id: 'g06', type: 'text', shuffle: true,
      explanationImage: 'assets/images/dolphin-echolocation.png',   // IDEA: diagram of a dolphin sending clicks and receiving echoes
      question: {
        en: 'How do dolphins "see" their prey in dark or murky water?',
        fr: 'Comment les dauphins « voient »-ils leurs proies dans une eau sombre ou trouble ?',
      },
      options: {
        en: ['They send out clicks and listen to the echoes coming back', 'They smell their prey from far away', 'They feel the water with their whiskers', 'They light up the water with their own lamp'],
        fr: ['Ils émettent des clics et écoutent les échos qui reviennent', 'Ils sentent leurs proies de très loin', 'Ils sentent l\'eau avec leurs moustaches', 'Ils éclairent l\'eau avec leur propre lampe'],
      },
      correct: 0,
      explanation: {
        en: 'Dolphins use echolocation: they produce very fast series of clicks, many of them too high-pitched for human ears, and listen to the echoes bouncing back from fish, rocks or boats. The delay of an echo tells them how far away something is, and its shape gives clues about its size and nature. Bats do the same in the air, and sonars copy this principle.',
        fr: 'Les dauphins pratiquent l\'écholocalisation : ils émettent des séries de clics très rapides, souvent trop aigus pour l\'oreille humaine, et écoutent les échos renvoyés par les poissons, les rochers ou les bateaux. Le délai d\'un écho leur indique la distance, et sa forme donne des indices sur la taille et la nature de l\'objet. Les chauves-souris font la même chose dans l\'air, et les sonars copient ce principe.',
      },
    },

    {
      id: 'g07', type: 'text', shuffle: true,
      explanationImage: 'assets/images/pistol-shrimp.jpg',       // IDEA: photo of a pistol (snapping) shrimp
      question: {
        en: 'Which tiny animal snaps its claw so fast that it creates a bubble whose loud "pop" stuns its prey?',
        fr: 'Quel petit animal claque sa pince si vite qu\'il crée une bulle dont l\'explosion sonore étourdit ses proies ?',
      },
      options: {
        en: ['Pistol shrimp', 'Seahorse', 'Clownfish', 'Starfish'],
        fr: ['Crevette pistolet', 'Hippocampe', 'Poisson-clown', 'Étoile de mer'],
      },
      correct: 0,
      explanation: {
        en: 'The pistol shrimp (or snapping shrimp) closes its big claw so fast that it shoots out a jet of water and creates a bubble that collapses with a loud bang — one of the loudest sounds made by any marine animal — which can stun small prey. Thousands of snapping shrimp together produce a constant crackling, like bacon frying, typical of warm shallow reefs.',
        fr: 'La crevette pistolet (ou crevette claqueuse) referme sa grosse pince si vite qu\'elle projette un jet d\'eau et crée une bulle qui implose dans un grand bruit sec — l\'un des sons les plus forts produits par un animal marin — capable d\'étourdir de petites proies. Des milliers de crevettes ensemble produisent un crépitement continu, comme du bacon qui grille, typique des récifs chauds et peu profonds.',
      },
    },

    {
      id: 'g08', type: 'text', shuffle: true,
      // IMAGE IDEA (question): photo of a hydrophone →  type: 'image',  media: 'assets/images/hydrophone.jpg',
      question: {
        en: 'What is the name of the microphone that scientists use to listen under water?',
        fr: 'Comment s\'appelle le microphone que les scientifiques utilisent pour écouter sous l\'eau ?',
      },
      options: {
        en: ['Hydrophone', 'Aquaphone', 'Stethoscope', 'Periscope'],
        fr: ['Hydrophone', 'Aquaphone', 'Stéthoscope', 'Périscope'],
      },
      correct: 0,
      explanation: {
        en: 'A hydrophone (from the Greek for "water" and "sound") is a waterproof microphone. It turns the tiny pressure changes of a sound wave into an electrical signal. Scientists leave hydrophones on the seabed or under buoys for months to listen to whales, fish, ships and earthquakes.',
        fr: 'Un hydrophone (du grec pour « eau » et « son ») est un microphone étanche. Il transforme les minuscules variations de pression d\'une onde sonore en signal électrique. Les scientifiques laissent des hydrophones sur le fond ou sous des bouées pendant des mois pour écouter les baleines, les poissons, les bateaux et les séismes.',
      },
    },

    {
      id: 'g09', type: 'text', shuffle: true,
      explanationImage: 'assets/images/ship-noise.jpg',          // IDEA: photo of a cargo ship, or a map of world shipping routes
      question: {
        en: 'Why is the noise of ships a problem for whales?',
        fr: 'Pourquoi le bruit des bateaux pose-t-il problème aux baleines ?',
      },
      options: {
        en: ['It covers up the calls they use to communicate and find food', 'It heats up the water around the ship', 'It makes the whales fall asleep', 'It makes the sea level rise near ports'],
        fr: ['Il couvre les appels qu\'elles utilisent pour communiquer et se nourrir', 'Il réchauffe l\'eau autour du navire', 'Il endort les baleines', 'Il fait monter le niveau de la mer près des ports'],
      },
      correct: 0,
      explanation: {
        en: 'Whales depend on sound to talk to each other, find mates and feed. The low rumble of ship engines travels over huge distances and "masks" their calls, a bit like trying to have a conversation next to a motorway. Slower ships and quieter propellers help reduce the problem.',
        fr: 'Les baleines dépendent du son pour communiquer entre elles, trouver des partenaires et se nourrir. Le grondement grave des moteurs de navires voyage sur de très grandes distances et « masque » leurs appels, un peu comme si l\'on essayait de discuter au bord d\'une autoroute. Des navires plus lents et des hélices plus silencieuses aident à réduire le problème.',
      },
    },

    {
      id: 'g10', type: 'text', shuffle: true,
      explanationImage: 'assets/images/ocean-soundscape.png',    // IDEA: spectrogram of an ocean soundscape (fish, whales, ships…) with labels
      question: {
        en: 'The famous explorer Jacques Cousteau called his book and film "The Silent World". Is the ocean really silent?',
        fr: 'Le célèbre explorateur Jacques Cousteau a intitulé son livre et son film « Le Monde du silence ». L\'océan est-il vraiment silencieux ?',
      },
      options: {
        en: ['No — animals, waves, rain, ships and earthquakes fill it with sound', 'Yes — sound cannot travel through water', 'Yes — fish and whales never make any sound', 'Only the deep sea is noisy'],
        fr: ['Non — animaux, vagues, pluie, bateaux et séismes le remplissent de sons', 'Oui — le son ne peut pas se propager dans l\'eau', 'Oui — les poissons et les baleines ne font jamais de bruit', 'Seules les grandes profondeurs sont bruyantes'],
      },
      correct: 0,
      explanation: {
        en: 'The sea is anything but silent! Fish grunt and croak, whales sing, shrimp crackle, and waves, rain, ice and underwater earthquakes add their own noises. Human activities such as shipping, construction and sonars add even more. Listening to this "soundscape" with hydrophones is one of the ways scientists study life in the ocean.',
        fr: 'La mer est tout sauf silencieuse ! Les poissons grognent et coassent, les baleines chantent, les crevettes crépitent, et les vagues, la pluie, la glace et les séismes sous-marins ajoutent leurs bruits. Les activités humaines (trafic maritime, travaux, sonars) en ajoutent encore. Écouter ce « paysage sonore » avec des hydrophones est l\'une des façons d\'étudier la vie dans l\'océan.',
      },
    },

    {
      id: 'g11', type: 'text', shuffle: true,
      explanationImage: 'assets/images/hearing-ranges.png',     // IDEA: chart of hearing ranges (human, blue whale, dolphin…)
      question: {
        en: 'Blue whales call at pitches so low that we can hardly hear them. What are sounds too low for human ears called?',
        fr: 'Les baleines bleues émettent des sons si graves que nous les entendons à peine. Comment appelle-t-on les sons trop graves pour l\'oreille humaine ?',
      },
      options: {
        en: ['Infrasound', 'Ultrasound', 'Microsound', 'Megasound'],
        fr: ['Infrasons', 'Ultrasons', 'Microsons', 'Mégasons'],
      },
      correct: 0,
      explanation: {
        en: 'Humans hear sounds from about 20 Hz to 20,000 Hz. Blue whales produce calls at around 10–40 Hz, partly below what we can hear: this is infrasound, which travels very far in the ocean. The opposite — sounds too high for us, above 20,000 Hz, like many dolphin clicks — is called ultrasound.',
        fr: 'L\'être humain entend des sons d\'environ 20 Hz à 20 000 Hz. Les baleines bleues émettent des appels vers 10–40 Hz, en partie sous ce que nous entendons : ce sont des infrasons, qui voyagent très loin dans l\'océan. À l\'inverse, les sons trop aigus pour nous, au-dessus de 20 000 Hz, comme beaucoup de clics de dauphins, sont des ultrasons.',
      },
    },

    {
      id: 'g12', type: 'text', shuffle: true,
      explanationImage: 'assets/images/tsunami-formation.png',  // IDEA: diagram showing how a seafloor earthquake creates a tsunami
      question: {
        en: 'What most often causes a tsunami?',
        fr: 'Quelle est la cause la plus fréquente d\'un tsunami ?',
      },
      options: {
        en: ['An earthquake under the sea', 'Strong winds at the surface', 'The pull of the Moon', 'A very large ship'],
        fr: ['Un séisme sous la mer', 'De forts vents à la surface', 'L\'attraction de la Lune', 'Un très gros navire'],
      },
      correct: 0,
      explanation: {
        en: 'Most tsunamis are caused by undersea earthquakes: when the seafloor suddenly rises or drops, it pushes a huge volume of water. The waves can then cross a whole ocean at the speed of a jet plane (up to about 800 km/h) and grow tall near the coast. Underwater landslides and volcanic eruptions can also trigger tsunamis.',
        fr: 'La plupart des tsunamis sont causés par des séismes sous-marins : quand le fond de la mer se soulève ou s\'affaisse brusquement, il déplace un énorme volume d\'eau. Les vagues peuvent alors traverser un océan entier à la vitesse d\'un avion de ligne (jusqu\'à environ 800 km/h) et grandir près des côtes. Des glissements de terrain sous-marins et des éruptions volcaniques peuvent aussi déclencher des tsunamis.',
      },
    },

    {
      id: 'g13', type: 'text', shuffle: true,
      // IMAGE IDEA (question): world map with the Ring of Fire highlighted →  type: 'image',  media: 'assets/images/ring-of-fire.png',
      question: {
        en: 'Most of the world\'s earthquakes and volcanoes occur along a huge horseshoe-shaped zone around the Pacific Ocean. What is it called?',
        fr: 'La plupart des séismes et des volcans du monde se trouvent le long d\'une immense zone en fer à cheval autour de l\'océan Pacifique. Comment s\'appelle-t-elle ?',
      },
      options: {
        en: ['The Ring of Fire', 'The Ring of Ice', 'The Blue Belt', 'The Magma Circle'],
        fr: ['La ceinture de feu', 'L\'anneau de glace', 'La ceinture bleue', 'Le cercle de magma'],
      },
      correct: 0,
      explanation: {
        en: 'The Pacific "Ring of Fire" is about 40,000 km long. It follows the edges of tectonic plates, where one plate slides beneath another. Around 90% of the world\'s earthquakes and about three quarters of its active volcanoes are found there.',
        fr: 'La « ceinture de feu » du Pacifique mesure environ 40 000 km. Elle suit les bords des plaques tectoniques, là où une plaque glisse sous une autre. Environ 90 % des séismes du monde et près des trois quarts de ses volcans actifs s\'y trouvent.',
      },
    },

    {
      id: 'g14', type: 'text', shuffle: true,
      // IMAGE IDEA (question): a seismogram showing P, S and surface waves →  type: 'image',  media: 'assets/images/seismogram.png',
      question: {
        en: 'When an earthquake happens, which waves reach a seismometer first?',
        fr: 'Lorsqu\'un séisme se produit, quelles ondes atteignent un sismomètre en premier ?',
      },
      options: {
        en: ['P waves (primary waves)', 'S waves (secondary waves)', 'Surface waves', 'Tsunami waves'],
        fr: ['Les ondes P (primaires)', 'Les ondes S (secondaires)', 'Les ondes de surface', 'Les vagues de tsunami'],
      },
      correct: 0,
      explanation: {
        en: 'P waves ("primary") are the fastest seismic waves, about 6 km per second in the crust, and they compress and stretch the rock like a spring. S waves ("secondary") are slower and cannot cross liquids. Surface waves arrive last but often shake the most. The delay between the P and S waves tells scientists how far away the earthquake was.',
        fr: 'Les ondes P (« primaires ») sont les ondes sismiques les plus rapides, environ 6 km par seconde dans la croûte, et elles compriment et étirent la roche comme un ressort. Les ondes S (« secondaires ») sont plus lentes et ne traversent pas les liquides. Les ondes de surface arrivent en dernier mais secouent souvent le plus. Le décalage entre les ondes P et S permet aux scientifiques de calculer la distance du séisme.',
      },
    },

    {
      id: 'g15', type: 'text', shuffle: true,
      explanationImage: 'assets/images/sofar-channel.png',      // IDEA: diagram of the SOFAR sound channel
      question: {
        en: 'Can an earthquake under the seabed be "heard" by underwater microphones thousands of kilometres away?',
        fr: 'Un séisme sous le fond marin peut-il être « entendu » par des microphones sous-marins situés à des milliers de kilomètres ?',
      },
      options: {
        en: ['Yes — sound travels very far in the ocean, especially in a natural "sound channel"', 'No — sound fades away after only a few kilometres', 'Yes — but only microphones on ships can hear it', 'No — earthquakes are completely silent'],
        fr: ['Oui — le son voyage très loin dans l\'océan, surtout dans un « canal sonore » naturel', 'Non — le son s\'éteint après seulement quelques kilomètres', 'Oui — mais seuls des microphones sur des navires peuvent l\'entendre', 'Non — les séismes sont totalement silencieux'],
      },
      correct: 0,
      explanation: {
        en: 'Undersea earthquakes release low-pitched sounds called T waves. They travel through the SOFAR channel, a natural layer about 1 km deep where sound is trapped and can cross thousands of kilometres with very little loss. Networks of hydrophones can therefore detect earthquakes — even small ones — that land stations miss.',
        fr: 'Les séismes sous-marins libèrent des sons graves appelés ondes T. Elles se propagent dans le canal SOFAR, une couche naturelle située vers 1 km de profondeur où le son reste piégé et peut parcourir des milliers de kilomètres avec très peu de pertes. Des réseaux d\'hydrophones peuvent ainsi détecter des séismes — même petits — que les stations terrestres ne perçoivent pas.',
      },
    },

    /* ══════════════════════════════════════════════════════════
       SPECTROGRAM QUESTION
       ══════════════════════════════════════════════════════════ */
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
