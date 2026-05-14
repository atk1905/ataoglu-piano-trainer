const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const LESSON_STEPS = [
  {
    "title": "Başlangıç",
    "note": 60,
    "hint": "Orta Do C4 ile başla."
  },
  {
    "title": "İki nota",
    "note": 62,
    "hint": "D4 ve C4 arasında geçiş yap."
  },
  {
    "title": "Üçlü hareket",
    "note": 64,
    "hint": "E4'e geç."
  },
  {
    "title": "Dörtlü",
    "note": 65,
    "hint": "F4 ekle."
  },
  {
    "title": "Beşli",
    "note": 67,
    "hint": "G4 hedefi."
  },
  {
    "title": "İniş",
    "note": 65,
    "hint": "Geri dön."
  },
  {
    "title": "Küçük cümle",
    "note": 64,
    "hint": "Akışı koru."
  },
  {
    "title": "Dizi",
    "note": 62,
    "hint": "Aşağı in."
  },
  {
    "title": "Tam cümle",
    "note": 60,
    "hint": "C majör çevresi."
  },
  {
    "title": "Aralık genişletme",
    "note": 69,
    "hint": "A4'e uzan."
  },
  {
    "title": "Sol el çalışması",
    "note": 48,
    "hint": "C3 bölgesine in."
  },
  {
    "title": "Çapraz geçiş",
    "note": 72,
    "hint": "C5 ile bitir."
  }
];
const SONGS = [
  {
    "title": "Ode to Joy",
    "difficulty": 1,
    "tempo": 96,
    "notes": [
      60,
      62,
      64,
      65,
      65,
      64,
      62,
      60
    ],
    "description": "Seviye 1 için kısa öğretici motif."
  },
  {
    "title": "Twinkle Twinkle Little Star",
    "difficulty": 1,
    "tempo": 90,
    "notes": [
      60,
      60,
      64,
      64,
      65,
      65,
      64
    ],
    "description": "Seviye 1 için kısa öğretici motif."
  },
  {
    "title": "Mary Had a Little Lamb",
    "difficulty": 1,
    "tempo": 96,
    "notes": [
      62,
      60,
      62,
      64,
      62,
      62,
      62
    ],
    "description": "Seviye 1 için kısa öğretici motif."
  },
  {
    "title": "Jingle Bells",
    "difficulty": 1,
    "tempo": 104,
    "notes": [
      64,
      64,
      64,
      64,
      64,
      64,
      64,
      67,
      60,
      62,
      64
    ],
    "description": "Seviye 1 için kısa öğretici motif."
  },
  {
    "title": "Happy Birthday",
    "difficulty": 1,
    "tempo": 88,
    "notes": [
      60,
      60,
      62,
      60,
      65,
      64
    ],
    "description": "Seviye 1 için kısa öğretici motif."
  },
  {
    "title": "Frère Jacques",
    "difficulty": 1,
    "tempo": 80,
    "notes": [
      60,
      62,
      64,
      60,
      60,
      62,
      64,
      60
    ],
    "description": "Seviye 1 için kısa öğretici motif."
  },
  {
    "title": "Hot Cross Buns",
    "difficulty": 1,
    "tempo": 84,
    "notes": [
      60,
      62,
      64,
      60,
      62,
      64,
      64,
      64
    ],
    "description": "Seviye 1 için kısa öğretici motif."
  },
  {
    "title": "Brahms Lullaby",
    "difficulty": 1,
    "tempo": 72,
    "notes": [
      67,
      67,
      64,
      64,
      62,
      62,
      60
    ],
    "description": "Seviye 1 için kısa öğretici motif."
  },
  {
    "title": "When the Saints",
    "difficulty": 1,
    "tempo": 92,
    "notes": [
      60,
      62,
      64,
      65,
      64,
      62,
      60,
      62
    ],
    "description": "Seviye 1 için kısa öğretici motif."
  },
  {
    "title": "Chopsticks",
    "difficulty": 1,
    "tempo": 112,
    "notes": [
      60,
      62,
      60,
      62,
      60,
      64,
      62,
      64
    ],
    "description": "Seviye 1 için kısa öğretici motif."
  },
  {
    "title": "Beethoven 5 Motif",
    "difficulty": 2,
    "tempo": 108,
    "notes": [
      69,
      69,
      69,
      65,
      62
    ],
    "description": "Seviye 2 için kısa öğretici motif."
  },
  {
    "title": "Minuet in G",
    "difficulty": 2,
    "tempo": 92,
    "notes": [
      62,
      64,
      66,
      67,
      69,
      67,
      66,
      64
    ],
    "description": "Seviye 2 için kısa öğretici motif."
  },
  {
    "title": "Für Elise Intro",
    "difficulty": 2,
    "tempo": 84,
    "notes": [
      66,
      65,
      66,
      65,
      66,
      62,
      65,
      64
    ],
    "description": "Seviye 2 için kısa öğretici motif."
  },
  {
    "title": "Pachelbel Canon Motif",
    "difficulty": 2,
    "tempo": 74,
    "notes": [
      62,
      66,
      64,
      68,
      66,
      64,
      67,
      62
    ],
    "description": "Seviye 2 için kısa öğretici motif."
  },
  {
    "title": "Turkish March Motif",
    "difficulty": 3,
    "tempo": 126,
    "notes": [
      64,
      68,
      71,
      68,
      64,
      68,
      71,
      68
    ],
    "description": "Seviye 3 için kısa öğretici motif."
  },
  {
    "title": "Swan Lake Theme",
    "difficulty": 3,
    "tempo": 84,
    "notes": [
      64,
      66,
      68,
      66,
      64,
      69,
      68,
      66
    ],
    "description": "Seviye 3 için kısa öğretici motif."
  },
  {
    "title": "Mozart K.545 Motif",
    "difficulty": 3,
    "tempo": 104,
    "notes": [
      64,
      68,
      71,
      68,
      64,
      68,
      71,
      68,
      66,
      69
    ],
    "description": "Seviye 3 için kısa öğretici motif."
  },
  {
    "title": "The Entertainer Motif",
    "difficulty": 3,
    "tempo": 116,
    "notes": [
      64,
      67,
      69,
      70,
      69,
      67,
      64,
      66
    ],
    "description": "Seviye 3 için kısa öğretici motif."
  },
  {
    "title": "Greensleeves",
    "difficulty": 3,
    "tempo": 78,
    "notes": [
      64,
      66,
      67,
      69,
      71,
      69,
      67,
      66
    ],
    "description": "Seviye 3 için kısa öğretici motif."
  },
  {
    "title": "Scarborough Fair",
    "difficulty": 3,
    "tempo": 74,
    "notes": [
      64,
      66,
      68,
      69,
      71,
      69,
      68,
      66
    ],
    "description": "Seviye 3 için kısa öğretici motif."
  },
  {
    "title": "Clair de Lune Intro",
    "difficulty": 4,
    "tempo": 66,
    "notes": [
      66,
      70,
      73,
      75,
      73,
      70,
      68,
      66
    ],
    "description": "Seviye 4 için kısa öğretici motif."
  },
  {
    "title": "Gymnopédie No.1",
    "difficulty": 4,
    "tempo": 62,
    "notes": [
      66,
      69,
      73,
      76,
      73,
      69,
      66,
      69
    ],
    "description": "Seviye 4 için kısa öğretici motif."
  },
  {
    "title": "Let It Be Motif",
    "difficulty": 3,
    "tempo": 72,
    "notes": [
      64,
      66,
      68,
      69,
      68,
      66,
      64,
      66
    ],
    "description": "Seviye 3 için kısa öğretici motif."
  },
  {
    "title": "Imagine Motif",
    "difficulty": 3,
    "tempo": 72,
    "notes": [
      64,
      68,
      71,
      69,
      68,
      66,
      64,
      66
    ],
    "description": "Seviye 3 için kısa öğretici motif."
  },
  {
    "title": "Can't Help Falling in Love",
    "difficulty": 3,
    "tempo": 76,
    "notes": [
      64,
      66,
      68,
      69,
      71,
      69,
      68,
      66
    ],
    "description": "Seviye 3 için kısa öğretici motif."
  },
  {
    "title": "River Flows in You",
    "difficulty": 4,
    "tempo": 92,
    "notes": [
      66,
      70,
      73,
      70,
      66,
      70,
      73,
      75
    ],
    "description": "Seviye 4 için kısa öğretici motif."
  },
  {
    "title": "Comptine d'un autre été",
    "difficulty": 4,
    "tempo": 84,
    "notes": [
      66,
      73,
      76,
      73,
      66,
      73,
      76,
      78
    ],
    "description": "Seviye 4 için kısa öğretici motif."
  },
  {
    "title": "Hedwig's Theme",
    "difficulty": 4,
    "tempo": 98,
    "notes": [
      66,
      71,
      73,
      72,
      71,
      76,
      75,
      73
    ],
    "description": "Seviye 4 için kısa öğretici motif."
  },
  {
    "title": "Game of Thrones Theme",
    "difficulty": 4,
    "tempo": 86,
    "notes": [
      66,
      71,
      73,
      75,
      76,
      73,
      71,
      70
    ],
    "description": "Seviye 4 için kısa öğretici motif."
  },
  {
    "title": "Star Wars Main Theme",
    "difficulty": 4,
    "tempo": 120,
    "notes": [
      66,
      73,
      73,
      70,
      75,
      73,
      70,
      66
    ],
    "description": "Seviye 4 için kısa öğretici motif."
  },
  {
    "title": "Jurassic Park Theme",
    "difficulty": 4,
    "tempo": 84,
    "notes": [
      66,
      70,
      73,
      75,
      73,
      70,
      68,
      66
    ],
    "description": "Seviye 4 için kısa öğretici motif."
  },
  {
    "title": "Pirates of the Caribbean",
    "difficulty": 4,
    "tempo": 128,
    "notes": [
      66,
      69,
      71,
      73,
      71,
      69,
      66,
      68
    ],
    "description": "Seviye 4 için kısa öğretici motif."
  },
  {
    "title": "Bach Prelude in C",
    "difficulty": 4,
    "tempo": 70,
    "notes": [
      66,
      70,
      73,
      78,
      73,
      70,
      66,
      70
    ],
    "description": "Seviye 4 için kısa öğretici motif."
  },
  {
    "title": "Moonlight Sonata",
    "difficulty": 5,
    "tempo": 60,
    "notes": [
      68,
      71,
      76,
      71,
      68,
      71,
      76,
      71
    ],
    "description": "Seviye 5 için kısa öğretici motif."
  },
  {
    "title": "Waltz in A minor",
    "difficulty": 5,
    "tempo": 78,
    "notes": [
      68,
      72,
      75,
      72,
      68,
      72,
      75,
      79
    ],
    "description": "Seviye 5 için kısa öğretici motif."
  },
  {
    "title": "Hungarian Dance No. 5",
    "difficulty": 5,
    "tempo": 132,
    "notes": [
      68,
      70,
      72,
      73,
      75,
      73,
      72,
      70
    ],
    "description": "Seviye 5 için kısa öğretici motif."
  },
  {
    "title": "Vocalise",
    "difficulty": 5,
    "tempo": 66,
    "notes": [
      68,
      70,
      72,
      75,
      77,
      75,
      72,
      70
    ],
    "description": "Seviye 5 için kısa öğretici motif."
  },
  {
    "title": "Prelude in E minor",
    "difficulty": 5,
    "tempo": 74,
    "notes": [
      68,
      75,
      78,
      75,
      68,
      75,
      78,
      75
    ],
    "description": "Seviye 5 için kısa öğretici motif."
  },
  {
    "title": "Fur Elise Advanced",
    "difficulty": 5,
    "tempo": 96,
    "notes": [
      72,
      71,
      72,
      71,
      72,
      68,
      71,
      70,
      69,
      68
    ],
    "description": "Seviye 5 için kısa öğretici motif."
  },
  {
    "title": "Clair de Lune Advanced",
    "difficulty": 5,
    "tempo": 64,
    "notes": [
      68,
      72,
      75,
      79,
      77,
      75,
      72,
      68
    ],
    "description": "Seviye 5 için kısa öğretici motif."
  },
  {
    "title": "Gymnopédie Variation",
    "difficulty": 5,
    "tempo": 58,
    "notes": [
      68,
      71,
      75,
      78,
      75,
      71,
      68,
      71
    ],
    "description": "Seviye 5 için kısa öğretici motif."
  },
  {
    "title": "Rondo Alla Turca",
    "difficulty": 5,
    "tempo": 124,
    "notes": [
      68,
      72,
      75,
      77,
      75,
      72,
      68,
      72
    ],
    "description": "Seviye 5 için kısa öğretici motif."
  },
  {
    "title": "Jesu, Joy of Man's Desiring",
    "difficulty": 4,
    "tempo": 74,
    "notes": [
      66,
      70,
      71,
      73,
      75,
      73,
      71,
      70
    ],
    "description": "Seviye 4 için kısa öğretici motif."
  },
  {
    "title": "Alouette",
    "difficulty": 2,
    "tempo": 100,
    "notes": [
      62,
      64,
      66,
      67,
      66,
      64,
      62,
      64
    ],
    "description": "Seviye 2 için kısa öğretici motif."
  },
  {
    "title": "La Cucaracha",
    "difficulty": 2,
    "tempo": 104,
    "notes": [
      62,
      62,
      66,
      66,
      67,
      67,
      66
    ],
    "description": "Seviye 2 için kısa öğretici motif."
  },
  {
    "title": "Ode to Joy Variation",
    "difficulty": 2,
    "tempo": 90,
    "notes": [
      62,
      66,
      67,
      69,
      67,
      66,
      64,
      62
    ],
    "description": "Seviye 2 için kısa öğretici motif."
  },
  {
    "title": "Simple Blues",
    "difficulty": 3,
    "tempo": 96,
    "notes": [
      64,
      67,
      69,
      70,
      71,
      70,
      69,
      67
    ],
    "description": "Seviye 3 için kısa öğretici motif."
  },
  {
    "title": "Pop Ballad Motif",
    "difficulty": 3,
    "tempo": 84,
    "notes": [
      64,
      66,
      68,
      71,
      68,
      66,
      64,
      66
    ],
    "description": "Seviye 3 için kısa öğretici motif."
  },
  {
    "title": "Holiday Waltz",
    "difficulty": 4,
    "tempo": 80,
    "notes": [
      66,
      70,
      73,
      77,
      73,
      70,
      66,
      70
    ],
    "description": "Seviye 4 için kısa öğretici motif."
  },
  {
    "title": "Study Etude",
    "difficulty": 4,
    "tempo": 108,
    "notes": [
      66,
      68,
      70,
      72,
      73,
      72,
      70,
      68
    ],
    "description": "Seviye 4 için kısa öğretici motif."
  }
];

export { NOTE_NAMES, LESSON_STEPS, SONGS };
