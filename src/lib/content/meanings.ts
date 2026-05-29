import type { NumberMeaning } from '@/types/numerology'

export const MEANINGS: Record<number, NumberMeaning> = {
  1: {
    number: 1,
    title: 'The Leader',
    keywords: ['independence', 'ambition', 'drive', 'originality', 'courage'],
    summary:
      'Number 1 is the pioneer. It carries strong will, fresh ideas and the push to start things and lead from the front.',
    detail:
      'Ruled by the Sun, 1 stands for the self, new beginnings and bold action. You like to be first and to do things your own way. Watch out for stubbornness and the urge to go it completely alone.',
    lucky: {
      colors: ['Gold', 'Orange', 'Yellow'],
      days: ['Sunday'],
      numbers: [1, 10, 19],
    },
  },
  2: {
    number: 2,
    title: 'The Peacemaker',
    keywords: ['harmony', 'sensitivity', 'cooperation', 'diplomacy', 'patience'],
    summary:
      'Number 2 is gentle and caring. It works best in partnership, reading feelings and bringing calm to people around it.',
    detail:
      'Ruled by the Moon, 2 stands for balance, emotion and quiet support. You are a natural mediator who values peace over conflict. Guard against over-sensitivity and giving so much that you forget your own needs.',
    lucky: {
      colors: ['White', 'Cream', 'Silver'],
      days: ['Monday'],
      numbers: [2, 11, 20],
    },
  },
  3: {
    number: 3,
    title: 'The Creative',
    keywords: ['expression', 'joy', 'imagination', 'optimism', 'communication'],
    summary:
      'Number 3 is bright and expressive. It loves words, art and laughter, and lifts the mood wherever it goes.',
    detail:
      'Ruled by Jupiter, 3 stands for creativity, growth and social charm. You shine when you can speak, write, sing or create. Scattering your energy across too many things is the main risk, so stay focused to finish what you start.',
    lucky: {
      colors: ['Yellow', 'Purple', 'Pink'],
      days: ['Thursday'],
      numbers: [3, 12, 21],
    },
  },
  4: {
    number: 4,
    title: 'The Builder',
    keywords: ['stability', 'discipline', 'order', 'loyalty', 'hard work'],
    summary:
      'Number 4 is steady and practical. It builds strong foundations through patience, planning and honest effort.',
    detail:
      'Linked with Uranus and Rahu, 4 stands for structure, routine and reliability. People trust you to get the job done right. Try not to become too rigid; leave a little room for change and rest.',
    lucky: {
      colors: ['Blue', 'Grey', 'Green'],
      days: ['Sunday', 'Saturday'],
      numbers: [4, 13, 22],
    },
  },
  5: {
    number: 5,
    title: 'The Explorer',
    keywords: ['freedom', 'change', 'adventure', 'curiosity', 'versatility'],
    summary:
      'Number 5 loves freedom and movement. It thrives on variety, travel and new experiences of every kind.',
    detail:
      'Ruled by Mercury, 5 stands for change, the senses and quick thinking. You adapt fast and get bored with routine. Be careful with restlessness and excess; a bit of self-control turns your energy into real progress.',
    lucky: {
      colors: ['Green', 'Light Blue', 'Turquoise'],
      days: ['Wednesday'],
      numbers: [5, 14, 23],
    },
  },
  6: {
    number: 6,
    title: 'The Nurturer',
    keywords: ['love', 'responsibility', 'care', 'beauty', 'service'],
    summary:
      'Number 6 is warm and responsible. It cares deeply for home, family and the comfort of the people it loves.',
    detail:
      'Ruled by Venus, 6 stands for love, harmony and beauty. You are dependable and happiest when looking after others. Take care not to carry every burden yourself or slip into worry and control.',
    lucky: {
      colors: ['Pink', 'Blue', 'White'],
      days: ['Friday'],
      numbers: [6, 15, 24],
    },
  },
  7: {
    number: 7,
    title: 'The Seeker',
    keywords: ['wisdom', 'intuition', 'analysis', 'spirituality', 'solitude'],
    summary:
      'Number 7 is the thinker and seeker. It looks beneath the surface for truth, meaning and deeper understanding.',
    detail:
      'Linked with Neptune and Ketu, 7 stands for inner search, study and spiritual insight. You need quiet time alone to recharge and reflect. Avoid drifting into isolation or overthinking; share your insights with the world.',
    lucky: {
      colors: ['Violet', 'Sea Green', 'White'],
      days: ['Monday'],
      numbers: [7, 16, 25],
    },
  },
  8: {
    number: 8,
    title: 'The Powerhouse',
    keywords: ['power', 'ambition', 'wealth', 'authority', 'discipline'],
    summary:
      'Number 8 is strong and driven. It aims for success, money and influence through focus and steady effort.',
    detail:
      'Ruled by Saturn, 8 stands for power, karma and material mastery. You have great organising skill and the patience to build lasting results. Keep balance between work and life, and use your power fairly.',
    lucky: {
      colors: ['Black', 'Dark Blue', 'Grey'],
      days: ['Saturday'],
      numbers: [8, 17, 26],
    },
  },
  9: {
    number: 9,
    title: 'The Humanitarian',
    keywords: ['compassion', 'generosity', 'idealism', 'courage', 'wisdom'],
    summary:
      'Number 9 is giving and big-hearted. It feels for the whole world and wants to make life better for everyone.',
    detail:
      'Ruled by Mars, 9 stands for completion, service and selfless love. You are brave, generous and led by strong ideals. Learn to let go of the past and to balance giving with caring for yourself.',
    lucky: {
      colors: ['Red', 'Crimson', 'Pink'],
      days: ['Tuesday'],
      numbers: [9, 18, 27],
    },
  },
  11: {
    number: 11,
    title: 'The Intuitive',
    keywords: ['intuition', 'inspiration', 'vision', 'idealism', 'sensitivity'],
    summary:
      'Number 11 is a Master Number of vision and insight. It senses more than most and can inspire people deeply.',
    detail:
      'As a Master Number, 11 carries the gifts of 2 raised to a higher level. It is the master of vision and intuition, with a strong link to inspiration and spiritual awareness. The challenge is to stay grounded and turn high ideals into real, steady action.',
    lucky: {
      colors: ['White', 'Silver', 'Pale Yellow'],
      days: ['Monday'],
      numbers: [11, 2, 29],
    },
  },
  22: {
    number: 22,
    title: 'The Master Builder',
    keywords: ['vision', 'mastery', 'ambition', 'practicality', 'leadership'],
    summary:
      'Number 22 is the Master Builder. It can turn big dreams into solid, lasting things in the real world.',
    detail:
      'As a Master Number, 22 blends the vision of 11 with the discipline of 4. It is the most powerful for building large projects that help many people. The challenge is to handle the pressure of its huge potential without burning out.',
    lucky: {
      colors: ['Blue', 'Gold', 'Green'],
      days: ['Sunday', 'Saturday'],
      numbers: [22, 4, 13],
    },
  },
  33: {
    number: 33,
    title: 'The Master Teacher',
    keywords: ['compassion', 'guidance', 'healing', 'devotion', 'wisdom'],
    summary:
      'Number 33 is the Master Teacher. It lifts others through pure love, care and selfless service.',
    detail:
      'As the highest Master Number, 33 combines the nurturing of 6 with the higher energy of 11 and 22. It is the master of healing and teaching, giving without thought of reward. The challenge is to serve from strength, not sacrifice, and to keep your own balance.',
    lucky: {
      colors: ['Pink', 'Blue', 'Gold'],
      days: ['Friday'],
      numbers: [33, 6, 24],
    },
  },
  13: {
    number: 13,
    title: 'Karmic Debt 13',
    keywords: ['work', 'discipline', 'focus', 'transformation'],
    summary:
      'Karmic Debt 13 asks for honest, steady work. Shortcuts and laziness in the past must now be balanced by real effort.',
    detail:
      'The lesson of 13 is discipline and focus. Success comes only through hard, patient work, so avoid quick fixes and stay organised. When you commit fully and finish what you start, 13 turns into the powerful, creative energy of 4.',
  },
  14: {
    number: 14,
    title: 'Karmic Debt 14',
    keywords: ['freedom', 'moderation', 'balance', 'self-control'],
    summary:
      'Karmic Debt 14 asks for freedom with moderation. Past misuse of freedom must be balanced by self-control today.',
    detail:
      'The lesson of 14 is balance amid constant change. Watch for excess in food, drink, money or pleasure, and keep your commitments steady instead of chasing every impulse. With moderation and focus, 14 unlocks the bright, adaptable energy of 5.',
  },
  16: {
    number: 16,
    title: 'Karmic Debt 16',
    keywords: ['ego', 'humility', 'rebuilding', 'awakening'],
    summary:
      'Karmic Debt 16 asks you to drop the ego and rebuild. Old pride and illusions are broken down so something truer can grow.',
    detail:
      'The lesson of 16 is humility and spiritual awakening. Sudden setbacks may clear away ego and false security, which can feel hard but is meant to free you. By letting go of pride and trusting a deeper purpose, 16 rises into the wisdom of 7.',
  },
  19: {
    number: 19,
    title: 'Karmic Debt 19',
    keywords: ['independence', 'self-reliance', 'balance', 'humility'],
    summary:
      'Karmic Debt 19 asks for healthy independence. Past selfishness or misuse of power must be balanced by standing on your own without shutting others out.',
    detail:
      'The lesson of 19 is self-reliance with humility. You must learn to handle things yourself, yet still accept help and think of others. When you balance strength with care, 19 matures into the generous, complete energy of 9.',
  },
}

export function getMeaning(n: number): NumberMeaning {
  const found = MEANINGS[n]
  if (found) {
    return found
  }
  return {
    number: n,
    title: `Number ${n}`,
    keywords: [],
    summary: `Number ${n} carries its own steady energy and lessons. Each number adds a unique strength to your numerology profile.`,
  }
}
