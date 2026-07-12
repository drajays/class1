const HEROES = [
  { id: 'advaita', name: 'Advaita', avatar: '🌸', color: '#ff6fa5' },
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

const PRAISE_EFFORT = [
  'You worked so hard on this! 💪',
  'I love how you didn’t give up! ⭐',
  'Your brain is growing! 🧠✨',
  'You figured it out! 🌟',
  'I can tell how much you’ve practiced! 📚',
];

const PRAISE_FOCUS = [
  'You spelled that perfectly! 🔤',
  'Great job counting those out! 🔢',
  'You remembered the new words! 💡',
  'I love your curiosity! 🌟',
  'That is some super thinking! 🎯',
];

const PRAISE_CHARACTER = [
  'That was a very kind choice! 💖',
  'You are such a great helper! 🐶',
  'I love your creativity! 🎨',
  'You took great responsibility there! ⭐',
  'You make learning fun! 🎉',
];

const PRAISE_QUICK = [
  'Spot on! 🎯',
  'Fantastic effort! 🚀',
  'Way to go! ⭐',
  'You nailed it! 🎉',
  'Right on target! 🎯',
];

const CHEERS = [
  ...PRAISE_EFFORT,
  ...PRAISE_FOCUS,
  ...PRAISE_CHARACTER,
  ...PRAISE_QUICK,
  'You are a superstar! 🌟',
  'Wow! Amazing job! 🎉',
  'You did it! High five! ✋',
];

const ENCOURAGE = [
  'I love how you didn’t give up! Let us try together. ⭐',
  'Your brain is growing every time you practice! 🌱',
  'Good try! Look at the picture help. 💡',
  'No worries — every hero learns step by step! 💪',
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
  { id: 'noun-sort', emoji: '🐾', title: 'Puppy Noun Sort', sub: 'Sort words into puppy buckets', subject: 'language' },
  { id: 'memory-match', emoji: '🧠', title: 'Memory Match', sub: 'Find matching word pairs', subject: 'language' },
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

