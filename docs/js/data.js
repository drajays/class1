const HEROES = [
  { id: 'aarav', name: 'Aarav', avatar: '🦁', color: '#ff6b6b' },
  { id: 'mia', name: 'Mia', avatar: '🦄', color: '#a29bfe' },
  { id: 'rohan', name: 'Rohan', avatar: '🐯', color: '#fdcb6e' },
  { id: 'zara', name: 'Zara', avatar: '🦋', color: '#55efc4' },
];

const BADGES = [
  { id: 'first_star', name: 'First Star', emoji: '⭐', need: 1 },
  { id: 'coin_collector', name: 'Coin Collector', emoji: '🪙', need: 50 },
  { id: 'math_hero', name: 'Math Hero', emoji: '🔢', need: 5, type: 'math_levels' },
  { id: 'reader', name: 'Super Reader', emoji: '📖', need: 5, type: 'english_levels' },
  { id: 'explorer', name: 'Book Explorer', emoji: '📚', need: 10, type: 'chapter_levels' },
  { id: 'streak_5', name: 'On Fire!', emoji: '🔥', need: 5, type: 'streak' },
  { id: 'perfect', name: 'Perfect Level', emoji: '💎', need: 1, type: 'perfect' },
];

const MATH_LEVELS = [
  {
    id: 'counting',
    title: 'Count the Stars',
    emoji: '⭐',
    desc: 'How many do you see?',
    questions: [
      {
        q: 'How many apples are on the tree?',
        visual: { type: 'emoji', items: '🍎🍎🍎' },
        options: [2, 3, 4, 5],
        answer: 3,
        explain: {
          title: 'Let us count together!',
          steps: [
            { text: 'Point to each apple: one… two… three!', visual: '🍎 🍎 🍎' },
            { text: 'We counted 3 apples. The answer is 3.' },
          ],
        },
      },
      {
        q: 'Count the balloons!',
        visual: { type: 'emoji', items: '🎈🎈🎈🎈🎈' },
        options: [4, 5, 6, 3],
        answer: 5,
        explain: {
          title: 'Count one by one',
          steps: [
            { text: 'Touch each balloon as you say: 1, 2, 3, 4, 5', visual: '🎈×5' },
            { text: 'There are 5 balloons!' },
          ],
        },
      },
      {
        q: 'How many ducks?',
        visual: { type: 'emoji', items: '🦆🦆🦆🦆' },
        options: [3, 4, 5, 2],
        answer: 4,
        explain: {
          title: 'Count the ducks',
          steps: [
            { text: 'Say the number for each duck: 1, 2, 3, 4', visual: '🦆🦆🦆🦆' },
            { text: '4 ducks! Great counting!' },
          ],
        },
      },
    ],
  },
  {
    id: 'addition',
    title: 'Happy Addition',
    emoji: '➕',
    desc: 'Put groups together!',
    questions: [
      {
        q: '2 red balls + 1 blue ball = ?',
        visual: { type: 'emoji', items: '🔴🔴 + 🔵' },
        equation: '2 + 1 = ?',
        options: [2, 3, 4, 1],
        answer: 3,
        explain: {
          title: 'Addition means putting together',
          steps: [
            { text: 'First group has 2 red balls: 🔴🔴', visual: '🔴🔴' },
            { text: 'Second group has 1 blue ball: 🔵', visual: '🔵' },
            { text: 'Put them in one line and count ALL: 1, 2, 3', visual: '🔴🔴🔵' },
            { text: '2 + 1 = 3. We call 3 the SUM.' },
          ],
        },
      },
      {
        q: '3 stars + 2 stars = ?',
        visual: { type: 'emoji', items: '⭐⭐⭐ + ⭐⭐' },
        equation: '3 + 2 = ?',
        options: [4, 5, 6, 3],
        answer: 5,
        explain: {
          title: 'Add the two groups',
          steps: [
            { text: 'Group 1: ⭐⭐⭐ (that is 3)', visual: '⭐⭐⭐' },
            { text: 'Group 2: ⭐⭐ (that is 2)', visual: '⭐⭐' },
            { text: 'Count all stars: 1,2,3,4,5 → 5 stars!', visual: '⭐⭐⭐⭐⭐' },
            { text: '3 + 2 = 5' },
          ],
        },
      },
      {
        q: '1 butterfly + 4 butterflies = ?',
        visual: { type: 'emoji', items: '🦋 + 🦋🦋🦋🦋' },
        equation: '1 + 4 = ?',
        options: [4, 5, 6, 3],
        answer: 5,
        explain: {
          title: 'Small + big group',
          steps: [
            { text: '1 butterfly plus 4 more butterflies', visual: '🦋🦋🦋🦋🦋' },
            { text: 'Count: 1, 2, 3, 4, 5', visual: '🦋×5' },
            { text: '1 + 4 = 5' },
          ],
        },
      },
      {
        q: 'Look at the picture. How many in total?',
        visual: { type: 'image', src: 'assets/images/math/add_1.jpg', alt: 'Addition picture' },
        equation: '4 + 2 = ?',
        options: [5, 6, 7, 4],
        answer: 6,
        explain: {
          title: 'Use the picture!',
          steps: [
            { text: 'Look at the picture. Count the first group.' },
            { text: 'Count the second group.' },
            { text: 'Add both groups: 4 + 2 = 6' },
          ],
        },
      },
    ],
  },
  {
    id: 'subtraction',
    title: 'Take Away Fun',
    emoji: '➖',
    desc: 'Cross out and count left!',
    questions: [
      {
        q: '5 cookies. You eat 2. How many left?',
        visual: { type: 'emoji', items: '🍪🍪🍪🍪🍪', cross: 2 },
        equation: '5 − 2 = ?',
        options: [2, 3, 4, 1],
        answer: 3,
        explain: {
          title: 'Subtraction = take away',
          steps: [
            { text: 'Start with 5 cookies: 🍪🍪🍪🍪🍪', visual: '🍪🍪🍪🍪🍪' },
            { text: 'Cross out 2 that you ate: ✗✗', visual: '🍪🍪🍪̶🍪̶' },
            { text: 'Count what is LEFT: 1, 2, 3 cookies', visual: '🍪🍪🍪' },
            { text: '5 − 2 = 3. We call 3 the DIFFERENCE.' },
          ],
        },
      },
      {
        q: '7 birds on a tree. 3 fly away. How many stay?',
        visual: { type: 'emoji', items: '🐦🐦🐦🐦🐦🐦🐦', cross: 3 },
        equation: '7 − 3 = ?',
        options: [3, 4, 5, 6],
        answer: 4,
        explain: {
          title: 'Take away the birds that flew',
          steps: [
            { text: '7 birds: count them 1 to 7', visual: '🐦×7' },
            { text: '3 flew away — imagine them gone!', visual: '🐦🐦🐦🐦' },
            { text: '4 birds still on the tree. 7 − 3 = 4' },
          ],
        },
      },
      {
        q: 'Use the picture. What is 6 − 1?',
        visual: { type: 'image', src: 'assets/images/math/subtract_1.jpg', alt: 'Subtraction' },
        equation: '6 − 1 = ?',
        options: [4, 5, 6, 7],
        answer: 5,
        explain: {
          title: 'One less',
          steps: [
            { text: 'Start at 6 objects in the picture.' },
            { text: 'Take away 1 (cross one out in your mind).' },
            { text: 'Count what remains: 5! So 6 − 1 = 5' },
          ],
        },
      },
    ],
  },
  {
    id: 'ordinal',
    title: 'Who Came First?',
    emoji: '🏁',
    desc: '1st, 2nd, 3rd place!',
    questions: [
      {
        q: 'In a race, who came 1st (first)?',
        visual: { type: 'image', src: 'assets/images/math/ordinal_animals.jpg', alt: 'Animal race' },
        options: ['Ben Bear', 'Ernie Elephant', 'Charlie Chick', 'Abe Ape'],
        answer: 'Ben Bear',
        explain: {
          title: 'First means position 1',
          steps: [
            { text: '1st = the winner at the front of the race!' },
            { text: 'Read: "Ben Bear came first."' },
            { text: 'So Ben Bear is 1st place! 🥇' },
          ],
        },
      },
      {
        q: 'Which place is 3rd (third)?',
        visual: { type: 'emoji', items: '🥇🥈🥉' },
        options: ['1st', '2nd', '3rd', '4th'],
        answer: '3rd',
        explain: {
          title: 'Ordinal numbers show position',
          steps: [
            { text: '1st 🥇 = first (winner)', visual: '🥇' },
            { text: '2nd 🥈 = second', visual: '🥈' },
            { text: '3rd 🥉 = third — that is the bronze medal!', visual: '🥉' },
          ],
        },
      },
      {
        q: 'Monday is the ___ day of the week.',
        visual: { type: 'emoji', items: '📅' },
        options: ['1st', '2nd', '7th', '3rd'],
        answer: '1st',
        explain: {
          title: 'Days have order too!',
          steps: [
            { text: 'Monday starts the week.' },
            { text: 'Monday = 1st day, Tuesday = 2nd, and so on.' },
          ],
        },
      },
      {
        q: 'Colour the 2nd circle RED. Which one is 2nd?',
        visual: { type: 'image', src: 'assets/images/math/ordinal_race.jpg', alt: 'Circles' },
        options: ['First circle', 'Second circle', 'Third circle', 'Fifth circle'],
        answer: 'Second circle',
        explain: {
          title: 'Find the 2nd one',
          steps: [
            { text: 'Point to circles and say: 1st, 2nd, 3rd…' },
            { text: 'The 2nd circle is the second one you point to!' },
          ],
        },
      },
    ],
  },
  {
    id: 'number_bonds',
    title: 'Number Friends',
    emoji: '🤝',
    desc: 'Numbers that make 10!',
    questions: [
      {
        q: 'Which two numbers make 5?',
        visual: { type: 'emoji', items: '✋' },
        options: ['2 + 2', '2 + 3', '4 + 4', '1 + 1'],
        answer: '2 + 3',
        explain: {
          title: 'Number bonds are number friends',
          steps: [
            { text: 'Hold up 2 fingers on one hand ✌️' },
            { text: 'Hold up 3 on the other ✋ (3 fingers)' },
            { text: '2 + 3 = 5. They are friends that make 5!' },
          ],
        },
      },
      {
        q: '4 + ? = 10',
        visual: { type: 'emoji', items: '🔴🔴🔴🔴 + ?' },
        equation: '4 + ? = 10',
        options: [5, 6, 7, 4],
        answer: 6,
        explain: {
          title: 'How many more to reach 10?',
          steps: [
            { text: 'You have 4: 🔴🔴🔴🔴', visual: '🔴🔴🔴🔴' },
            { text: 'Count up to 10: 5,6,7,8,9,10 — you need 6 more!', visual: '🔴🔴🔴🔴🟡🟡🟡🟡🟡🟡' },
            { text: '4 + 6 = 10' },
          ],
        },
      },
    ],
  },
];

const ENGLISH_LEVELS = [
  {
    id: 'sight_words',
    title: 'Magic Words',
    emoji: '✨',
    desc: 'Read common words',
    mode: 'read_match',
    questions: [
      { word: 'cat', emoji: '🐱', sentence: 'The cat is soft.' },
      { word: 'dog', emoji: '🐶', sentence: 'I see a dog.' },
      { word: 'sun', emoji: '☀️', sentence: 'The sun is bright.' },
      { word: 'ball', emoji: '⚽', sentence: 'Kick the ball!' },
      { word: 'book', emoji: '📚', sentence: 'Read the book.' },
    ],
  },
  {
    id: 'articles',
    title: 'A and An',
    emoji: '📝',
    desc: 'Which article fits?',
    mode: 'article_pick',
    questions: [
      {
        q: '___ apple',
        options: ['a', 'an'],
        answer: 'an',
        hint: 'Apple starts with a vowel sound (a). Use AN before vowel sounds!',
        visual: '🍎',
      },
      {
        q: '___ egg',
        options: ['a', 'an'],
        answer: 'an',
        hint: 'Egg starts with E — a vowel sound. Say: an egg.',
        visual: '🥚',
      },
      {
        q: '___ ball',
        options: ['a', 'an'],
        answer: 'a',
        hint: 'Ball starts with B — not a vowel sound. Say: a ball.',
        visual: '⚽',
      },
      {
        q: '___ umbrella',
        options: ['a', 'an'],
        answer: 'an',
        hint: 'Umbrella starts with U — vowel sound! an umbrella.',
        visual: '☂️',
      },
    ],
  },
  {
    id: 'picture_words',
    title: 'Picture Match',
    emoji: '🖼️',
    desc: 'Match word to picture',
    mode: 'picture_match',
    questions: [
      { word: 'tree', emoji: '🌳', wrong: ['🌸', '🏠', '🚗'] },
      { word: 'fish', emoji: '🐟', wrong: ['🐦', '🐘', '🦋'] },
      { word: 'cake', emoji: '🎂', wrong: ['🍎', '🥕', '🍞'] },
      { word: 'star', emoji: '⭐', wrong: ['🌙', '☁️', '🌈'] },
    ],
  },
  {
    id: 'spell_it',
    title: 'Build the Word',
    emoji: '🔤',
    desc: 'Tap letters in order',
    mode: 'spell',
    questions: [
      { word: 'cat', emoji: '🐱' },
      { word: 'dog', emoji: '🐶' },
      { word: 'sun', emoji: '☀️' },
      { word: 'hat', emoji: '🎩' },
    ],
  },
  {
    id: 'read_sentence',
    title: 'Read With Me',
    emoji: '📖',
    desc: 'Tap 🔊 then fill the blank',
    mode: 'sentence_blank',
    questions: [
      {
        sentence: 'The ___ is red.',
        blank: 'apple',
        options: ['apple', 'ball', 'book'],
        emoji: '🍎',
        full: 'The apple is red.',
      },
      {
        sentence: 'I have a pet ___.',
        blank: 'dog',
        options: ['dog', 'sun', 'hat'],
        emoji: '🐶',
        full: 'I have a pet dog.',
      },
      {
        sentence: 'We read a ___.',
        blank: 'book',
        options: ['book', 'cat', 'egg'],
        emoji: '📚',
        full: 'We read a book.',
      },
    ],
  },
];

const CHEERS = [
  'You are a superstar! 🌟',
  'Wow! Amazing job! 🎉',
  'You did it! High five! ✋',
  'So clever! Keep going! 🚀',
  'Fantastic! I am proud of you! 💪',
];

const ENCOURAGE = [
  'Good try! Let us learn together.',
  'Almost! Look at the picture help.',
  'No worries — every hero learns!',
];
