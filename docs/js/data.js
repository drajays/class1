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

const PET_TYPES = [
  { id: 'dragon', emoji: '🐉', name: 'Sparky', say: 'Roar! I love learning!' },
  { id: 'robot', emoji: '🤖', name: 'Beep', say: 'Beep boop! Let us play!' },
  { id: 'puppy', emoji: '🐶', name: 'Buddy', say: 'Woof! You are awesome!' },
];

const PET_ITEMS = {
  food: [
    { id: 'apple', emoji: '🍎', cost: 5, hunger: 20 },
    { id: 'cookie', emoji: '🍪', cost: 8, hunger: 30 },
    { id: 'pizza', emoji: '🍕', cost: 12, hunger: 45 },
  ],
  toys: [
    { id: 'ball', emoji: '⚽', cost: 10, happy: 25 },
    { id: 'star', emoji: '⭐', cost: 15, happy: 35 },
    { id: 'rocket', emoji: '🚀', cost: 20, happy: 50 },
  ],
  outfits: [
    { id: 'crown', emoji: '👑', cost: 25 },
    { id: 'cape', emoji: '🦸', cost: 30 },
    { id: 'party', emoji: '🎉', cost: 20 },
  ],
};

const MINI_GAMES = [
  { id: 'apple-basket', emoji: '🍎', title: 'Apple Basket', sub: 'Drag apples to add!', subject: 'math' },
  { id: 'math-race', emoji: '🏎️', title: 'Math Race', sub: 'Beat the rival car!', subject: 'math' },
  { id: 'count-basket', emoji: '🔢', title: 'Counting Basket', sub: 'Count apples exactly', subject: 'math' },
  { id: 'speak-word', emoji: '🎤', title: 'Speak & Win', sub: 'English, Hindi, Sanskrit', subject: 'language' },
  { id: 'trace-letter', emoji: '✨', title: 'Magic Tracing', sub: 'Sparkler letter tracing', subject: 'language' },
  { id: 'word-builder', emoji: '🔤', title: 'Word Builder', sub: 'Spell the word!', subject: 'language' },
  { id: 'story-quest', emoji: '📖', title: 'Story Quest', sub: 'Tap words in tales', subject: 'language' },
  { id: 'fable-choice', emoji: '🦁', title: 'Fable Choice', sub: 'Pick the smart answer', subject: 'values' },
  { id: 'evs-sort', emoji: '♻️', title: 'Eco Sorter', sub: '30-second challenge!', subject: 'evs' },
  { id: 'habitat', emoji: '🌍', title: 'Build Habitat', sub: 'Forest, desert, ocean', subject: 'evs' },
  { id: 'plant-magic', emoji: '🌱', title: 'Plant Magic', sub: 'AR life cycle', subject: 'evs' },
  { id: 'memory-match', emoji: '🧠', title: 'Memory Match', sub: 'Find the pairs', subject: 'gk' },
  { id: 'creative-draw', emoji: '🎨', title: 'Draw Board', sub: 'Paint your art!', subject: 'art' },
  { id: 'spin-wheel', emoji: '🎡', title: 'Prize Wheel', sub: 'Spin for coins!', subject: 'fun' },
];

const JOURNEY_NODES = [
  { id: 'start', emoji: '🏠', name: 'Home Island' },
  { id: 'maths', emoji: '🔢', name: 'Number Planet' },
  { id: 'english_grammar', emoji: '📖', name: 'Word Galaxy' },
  { id: 'evs', emoji: '🌿', name: 'Nature World' },
  { id: 'hindi', emoji: '🇮🇳', name: 'Hindi Hills' },
  { id: 'sanskrit', emoji: '🕉️', name: 'Sanskrit Sky' },
  { id: 'computer', emoji: '💻', name: 'Tech Town' },
  { id: 'treasure', emoji: '💎', name: 'Treasure Crown' },
];

const STORY_TALES = [
  {
    id: 'lion-mouse',
    title: 'The Lion and the Mouse',
    emoji: '🦁',
    scenes: [
      { text: 'A big ___ slept under a tree.', word: 'lion', options: ['lion', 'fish', 'ball'], emoji: '🦁' },
      { text: 'A tiny ___ ran across his nose.', word: 'mouse', options: ['mouse', 'car', 'sun'], emoji: '🐭' },
      { text: 'The lion woke up and ___ loudly.', word: 'roared', options: ['roared', 'slept', 'flew'], emoji: '😤' },
      { text: 'Later the mouse helped the ___ .', word: 'lion', options: ['lion', 'tree', 'moon'], emoji: '🤝' },
    ],
  },
  {
    id: 'thirsty-crow',
    title: 'The Thirsty Crow',
    emoji: '🐦',
    scenes: [
      { text: 'A thirsty ___ looked for water.', word: 'crow', options: ['crow', 'dog', 'book'], emoji: '🐦' },
      { text: 'The pot had very ___ water.', word: 'little', options: ['little', 'big', 'red'], emoji: '🏺' },
      { text: 'The crow dropped ___ into the pot.', word: 'stones', options: ['stones', 'flowers', 'fish'], emoji: '🪨' },
      { text: 'At last the crow could ___ !', word: 'drink', options: ['drink', 'fly', 'sleep'], emoji: '💧' },
    ],
  },
];

const TRACE_LETTERS = [
  { id: 'A', script: 'latin', path: 'M 30 90 L 50 20 L 70 90 M 38 65 L 62 65' },
  { id: 'B', script: 'latin', path: 'M 30 20 L 30 90 M 30 20 Q 65 20 65 45 Q 65 70 30 70 M 30 70 Q 65 70 65 90 Q 65 90 30 90' },
  { id: 'अ', script: 'devanagari', path: 'M 20 50 Q 50 20 80 50 Q 50 80 20 50 M 50 50 L 50 90' },
  { id: 'क', script: 'devanagari', path: 'M 25 30 L 75 30 M 50 30 L 50 90 M 30 60 Q 50 75 70 60' },
];

const SPEAK_WORDS = [
  { word: 'apple', emoji: '🍎', lang: 'en-IN' },
  { word: 'cat', emoji: '🐱', lang: 'en-IN' },
  { word: 'सेब', emoji: '🍎', lang: 'hi-IN', hint: 'Say: sayb (apple in Hindi)' },
  { word: 'फलम्', emoji: '🍎', lang: 'sa-IN', hint: 'Say: phalam (fruit in Sanskrit)' },
];

const EVS_SORT_ITEMS = [
  { item: '🌳', name: 'Tree', living: true },
  { item: '🪨', name: 'Rock', living: false },
  { item: '🐕', name: 'Dog', living: true },
  { item: '🚗', name: 'Car', living: false },
  { item: '🦋', name: 'Butterfly', living: true },
  { item: '📱', name: 'Phone', living: false },
  { item: '🌸', name: 'Flower', living: true },
  { item: '🪑', name: 'Chair', living: false },
];

const HABITAT_ANIMALS = [
  { emoji: '🐪', name: 'Camel', biome: 'desert' },
  { emoji: '🐠', name: 'Fish', biome: 'ocean' },
  { emoji: '🐻', name: 'Bear', biome: 'forest' },
  { emoji: '🦂', name: 'Scorpion', biome: 'desert' },
  { emoji: '🐙', name: 'Octopus', biome: 'ocean' },
  { emoji: '🦌', name: 'Deer', biome: 'forest' },
];

const NAV_PROMPTS = {
  home: 'Welcome home! Tap a big colorful subject to start learning!',
  minigames: 'Pick a fun mini game! Tap any big picture button!',
  pet: 'Take care of your pet friend! Feed and play!',
  math: 'Math time! Choose a level to play!',
  english: 'Reading time! Tap a level to begin!',
  parent: 'Parent dashboard. Here you can see how your child is learning.',
  shop: 'Use your coins to buy stickers for your collection!',
  features: 'Here are all the amazing learning features in this app!',
};

const EXTRA_SUBJECTS = [
  { id: 'gk', name: 'GK', emoji: '🌍', color: '#0891b2', desc: 'India, rainbow, traffic rules', modes: ['Quests', 'Memory Match'] },
  { id: 'art', name: 'Art & Craft', emoji: '🎨', color: '#f43f5e', desc: 'Colors, shapes, drawing', modes: ['Quests', 'Creative Drawing'] },
  { id: 'values', name: 'Good Values', emoji: '🤝', color: '#7c3aed', desc: 'Please, thank you, sharing', modes: ['Quests', 'Fables'] },
];

const SUBJECT_HUB_META = {
  maths: { desc: 'Tactile addition, shapes, turbo racing', games: ['apple-basket', 'math-race', 'count-basket'] },
  english_grammar: { desc: 'Rhymes, spelling, voice practice', games: ['speak-word', 'word-builder', 'story-quest'] },
  evs: { desc: 'Sorting, biomes, plant life cycle', games: ['evs-sort', 'habitat', 'plant-magic'] },
  hindi: { desc: 'Swar, vyanjan, stories', games: ['trace-letter', 'speak-word', 'story-quest'] },
  sanskrit: { desc: 'Vowels, shlokas, phonics', games: ['trace-letter', 'speak-word'] },
  computer: { desc: 'Mouse, keyboard, safety', games: ['memory-match', 'spin-wheel'] },
  gk: { desc: 'Our India, rainbows, festivals', games: ['memory-match'] },
  art: { desc: 'Color mixing, creative drawing', games: ['creative-draw'] },
  values: { desc: 'Magic words, kindness, fables', games: ['story-quest', 'fable-choice'] },
};

function qb(qs) {
  return qs.map((x) => ({
    q: x.q,
    options: x.o,
    answer: x.o[x.a],
    hint: x.ex,
    emoji: x.e,
  }));
}

const QUEST_BANK = {
  english_grammar: qb([
    { e: '🐱', q: 'Which word starts with the phonic sound C?', o: ['Cat', 'Sun', 'Ball', 'Dog'], a: 0, ex: 'Cat begins with C.' },
    { e: '🍎', q: 'Choose the vowel in the word APPLE.', o: ['P', 'L', 'A', 'B'], a: 2, ex: 'A is a vowel.' },
    { e: '📚', q: 'What is the opposite of BIG?', o: ['Huge', 'Small', 'Tall', 'Long'], a: 1, ex: 'Small is the opposite of big.' },
    { e: '✏️', q: 'Which sentence is polite?', o: ['Give me!', 'Please give me a pencil.', 'Go away!', 'No!'], a: 1, ex: 'Please is polite.' },
    { e: '🦊', q: 'Fill in: The ___ is walking.', o: ['fox', 'run', 'up', 'and'], a: 0, ex: 'Fox fits the sentence.' },
  ]),
  maths: qb([
    { e: '🍌', q: '2 bananas + 1 banana = ?', o: ['2', '3', '4', '5'], a: 1, ex: '2 + 1 = 3.' },
    { e: '🔺', q: 'Which shape has 3 sides?', o: ['Circle', 'Square', 'Triangle', 'Rectangle'], a: 2, ex: 'A triangle has 3 sides.' },
    { e: '7️⃣', q: 'What number comes after 7?', o: ['6', '8', '9', '10'], a: 1, ex: 'After 7 comes 8.' },
    { e: '🧸', q: 'Which number is smallest?', o: ['5', '2', '9', '7'], a: 1, ex: '2 is smallest.' },
    { e: '🪙', q: 'Count by tens: 10, 20, __', o: ['21', '25', '30', '40'], a: 2, ex: '10, 20, 30.' },
  ]),
  evs: qb([
    { e: '🌱', q: 'What do plants need to grow?', o: ['Water & Sunlight', 'Shoes', 'TV', 'Pencils'], a: 0, ex: 'Plants need water and sunlight.' },
    { e: '🐄', q: 'Which farm animal gives milk?', o: ['Lion', 'Cow', 'Tiger', 'Crow'], a: 1, ex: 'A cow gives milk.' },
    { e: '🦷', q: 'We brush teeth to keep them ___.', o: ['dirty', 'clean', 'sleepy', 'yellow'], a: 1, ex: 'Brushing keeps teeth clean.' },
    { e: '🏠', q: 'A house protects us from ___.', o: ['rain & cold', 'homework', 'songs', 'toys'], a: 0, ex: 'Houses protect from weather.' },
    { e: '🌞', q: 'The Sun gives us light and ___.', o: ['ice cream', 'warm heat', 'books', 'chairs'], a: 1, ex: 'The Sun gives heat.' },
  ]),
  hindi: qb([
    { e: 'अ', q: 'कौन सा अक्षर स्वर है?', o: ['क', 'म', 'अ', 'र'], a: 2, ex: 'अ एक स्वर है।' },
    { e: '🍋', q: 'नींबू का रंग कैसा होता है?', o: ['पीला', 'काला', 'नीला', 'सफेद'], a: 0, ex: 'नींबू पीला होता है।' },
    { e: '🐘', q: 'हाथी किस अक्षर से शुरू होता है?', o: ['म', 'ह', 'स', 'ट'], a: 1, ex: 'हाथी ह से शुरू।' },
    { e: '🙏', q: 'धन्यवाद का क्या अर्थ है?', o: ['Thank you', 'Sorry', 'Angry', 'Bye'], a: 0, ex: 'धन्यवाद means thank you.' },
    { e: 'आ', q: 'आम में पहला अक्षर कौन सा?', o: ['इ', 'उ', 'आ', 'ए'], a: 2, ex: 'आम आ से शुरू।' },
  ]),
  sanskrit: qb([
    { e: 'ॐ', q: '"फलम्" का अर्थ है?', o: ['Fruit', 'Car', 'Sun', 'Book'], a: 0, ex: 'फलम् means fruit.' },
    { e: '🐘', q: 'हाथी को संस्कृत में?', o: ['गजः', 'अश्वः', 'कुकुरः', 'मार्जारः'], a: 0, ex: 'गजः means elephant.' },
    { e: '🌞', q: 'सूर्य को संस्कृत में?', o: ['चन्द्रः', 'सूर्यः', 'मेघः', 'तारकः'], a: 1, ex: 'सूर्यः means Sun.' },
    { e: '🙏', q: '"सुप्रभातम्" कब कहते हैं?', o: ['Good Morning', 'Good Night', 'Afternoon', 'Never'], a: 0, ex: 'Good morning greeting.' },
    { e: '📚', q: 'पुस्तक को संस्कृत में?', o: ['जलम्', 'वृक्षः', 'पुस्तकम्', 'गृहम्'], a: 2, ex: 'पुस्तकम् means book.' },
  ]),
  gk: qb([
    { e: '🇮🇳', q: 'National Animal of India?', o: ['Tiger', 'Dog', 'Horse', 'Goat'], a: 0, ex: 'Tiger is national animal.' },
    { e: '🌈', q: 'How many colors in a rainbow?', o: ['5', '6', '7', '8'], a: 2, ex: 'Rainbow has 7 colors.' },
    { e: '🚦', q: 'RED traffic light means?', o: ['Go', 'Stop', 'Dance', 'Run'], a: 1, ex: 'Red means stop.' },
    { e: '🦚', q: 'National Bird of India?', o: ['Peacock', 'Crow', 'Hen', 'Duck'], a: 0, ex: 'Peacock is national bird.' },
    { e: '🗓️', q: 'Days in one week?', o: ['5', '6', '7', '10'], a: 2, ex: '7 days in a week.' },
  ]),
  computer: qb([
    { e: '🖱️', q: 'Which part helps us click?', o: ['Mouse', 'Monitor', 'Speaker', 'Book'], a: 0, ex: 'Mouse helps click.' },
    { e: '⌨️', q: 'Which part has keys for typing?', o: ['Keyboard', 'Table', 'Bottle', 'Window'], a: 0, ex: 'Keyboard has keys.' },
    { e: '🖥️', q: 'The screen is called a ___.', o: ['mouse', 'Monitor', 'bag', 'plate'], a: 1, ex: 'Display is monitor.' },
    { e: '🔌', q: 'Touch wires with wet hands?', o: ['Yes', 'No, never', 'Maybe', 'Always'], a: 1, ex: 'Never touch with wet hands.' },
    { e: '💾', q: 'Computers can help us ___.', o: ['Draw', 'Play games', 'Type stories', 'All of these'], a: 3, ex: 'Computers do many things!' },
  ]),
  art: qb([
    { e: '🎨', q: 'RED + YELLOW makes?', o: ['Green', 'Orange', 'Purple', 'Black'], a: 1, ex: 'Red and yellow make orange.' },
    { e: '🌿', q: 'Color for grass and leaves?', o: ['Green', 'Pink', 'White', 'Grey'], a: 0, ex: 'Plants are green.' },
    { e: '☀️', q: 'Shape for the Sun?', o: ['Circle', 'Triangle', 'Square', 'Rectangle'], a: 0, ex: 'Sun is a circle.' },
    { e: '🖍️', q: 'Tool for coloring?', o: ['Crayons', 'Spoon', 'Comb', 'Plate'], a: 0, ex: 'We use crayons.' },
    { e: '⭐', q: 'A star often has ___ points.', o: ['1', '2', '5', '100'], a: 2, ex: 'Classic star has 5 points.' },
  ]),
  values: qb([
    { e: '🤝', q: 'Polite word when asking for help?', o: ['Please', 'Never', 'Give me', 'Bad'], a: 0, ex: 'Please is magic.' },
    { e: '🙏', q: 'When someone helps, we say ___.', o: ['Thank you', 'Stop', 'No', 'Run'], a: 0, ex: 'Thank you shows gratitude.' },
    { e: '🧸', q: 'A kind hero ___ toys with friends.', o: ['breaks', 'shares', 'hides', 'throws'], a: 1, ex: 'Sharing is caring!' },
    { e: '🗑️', q: 'Where to throw wrappers?', o: ['Floor', 'Dustbin', 'Under bed', 'Window'], a: 1, ex: 'Use the dustbin.' },
    { e: '👂', q: 'When teacher explains, we should ___.', o: ['listen', 'shout', 'sleep', 'push'], a: 0, ex: 'Listening helps us learn.' },
  ]),
};

const SHOP_ITEMS = [
  { id: 'crown', emoji: '👑', name: 'Royal Crown', cost: 20 },
  { id: 'rocket', emoji: '🚀', name: 'Cosmic Rocket', cost: 25 },
  { id: 'unicorn', emoji: '🦄', name: 'Unicorn', cost: 30 },
  { id: 'medal', emoji: '🏅', name: 'Gold Medal', cost: 15 },
  { id: 'rainbow', emoji: '🌈', name: 'Rainbow', cost: 18 },
  { id: 'dino', emoji: '🦖', name: 'Dino', cost: 22 },
  { id: 'tophat', emoji: '🎩', name: 'Top Hat', cost: 20 },
  { id: 'shades', emoji: '🕶️', name: 'Cool Shades', cost: 20 },
];

const FEATURES_LIST = [
  { title: 'Virtual Pet', text: 'Adopt a dragon, robot, or puppy. Feed, play, and dress them with lesson coins!' },
  { title: 'Space Journey Map', text: 'Rocket travels across subject planets as chapters are completed.' },
  { title: '3-Day Streak Chest', text: 'Login 3 days in a row for bonus coins, stars, and XP.' },
  { title: 'Sounds & Haptics', text: 'Cheerful chimes, gentle wrong sounds, and phone vibration.' },
  { title: 'Apple Basket Math', text: 'Drag virtual apples to learn addition hands-on.' },
  { title: 'Math Turbo Race', text: 'Answer fast to beat the rival car to the finish!' },
  { title: 'Voice AI Studio', text: 'Speak words in English, Hindi, and Sanskrit.' },
  { title: 'Magic Tracing', text: 'Rainbow sparkler trails while tracing letters.' },
  { title: 'Story & Fable Quests', text: 'Panchatantra tales with tap-to-continue vocabulary.' },
  { title: 'EVS Eco Sorter', text: 'Timed living vs non-living sorting game.' },
  { title: 'Biome Builder', text: 'Place animals in forest, desert, or ocean.' },
  { title: 'AR Plant Magic', text: 'Grow a seed through water and sunlight steps.' },
  { title: '120 Chapter Notes', text: 'Real Class 1 notes with pictures from your books.' },
  { title: 'Voice Navigation', text: 'Speaker buttons read instructions aloud.' },
  { title: 'Big Touch Buttons', text: 'Chunky buttons for small fingers.' },
  { title: 'Offline Mode', text: 'Works without internet after first load.' },
  { title: 'Parent Dashboard', text: 'Hold parent button — math gate keeps kids out.' },
  { title: 'Home Nudges', text: 'Tips to practice at dinner and bedtime.' },
  { title: 'Sticker Shop', text: 'Spend coins on classroom stickers.' },
  { title: 'Certificate', text: 'Printable diploma in parent dashboard.' },
];

const FABLE_CHOICE = [
  {
    id: 'crow',
    title: 'The Thirsty Crow',
    art: '🐦🍶',
    text: 'A thirsty crow found water at the bottom of a pitcher. What should he drop inside to raise the water?',
    correct: '🪨 Pebbles',
    wrong: '🍃 Leaves',
    success: 'The pebbles pushed the water up! Moral: Where there is a will, there is a way!',
  },
  {
    id: 'lion',
    title: 'The Lion & The Mouse',
    art: '🦁🐭',
    text: 'A tiny mouse promised to help a lion. Later the lion was trapped in a net! How can the mouse save him?',
    correct: '🦷 Nibble the ropes',
    wrong: '😴 Go to sleep',
    success: 'The mouse freed the lion! Moral: Even small friends can help big ones!',
  },
];

const WORD_BUILD_LIST = ['CAT', 'SUN', 'BUS', 'HEN', 'DOG', 'MAP', 'CUP', 'STAR', 'BOOK', 'BALL'];

const TRACE_TABS = [
  { id: 'A', prompt: 'English: A for Apple 🍎' },
  { id: 'B', prompt: 'English: B for Ball ⚽' },
  { id: 'अ', prompt: 'Hindi: अ से अनार 🔴' },
  { id: 'क', prompt: 'Hindi: क से कबूतर 🕊️' },
  { id: 'ॐ', prompt: 'Sanskrit: Om 🕉️' },
];

