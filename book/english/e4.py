# English Class 1 — chapter 18: more reader stories & poems (original retellings/passages written for this book)
from lib import *
from e3 import passage

# (title, emoji, passage_html, words[(emoji, word, meaning)], comprehension[(q, a)], drill_title, drill_instr, drill[(q, a)])
U = []
def unit(*a): U.append(a)

unit('Twelve Months, Seven Days', '📅',
     'January starts the year, then February comes,<br>March and April bring the rain, May is full of hums.<br>'
     'June and July, hot and bright, August fills the sky,<br>September, October, November, then December says goodbye.<br><br>'
     'Monday, Tuesday, Wednesday, Thursday, Friday too,<br>Saturday and Sunday — a week is done for you!<br>'
     '<i>Did you know? Every fourth year February gets one extra day. That year is called a <b>leap year</b>.</i>',
     [('📅','month','a part of a year; there are 12'),('🗓️','week','7 days'),('☀️','day','24 hours'),
      ('🐸','leap','to jump'),('🎂','birthday','the day you were born'),('🔁','year','12 months')],
     [('How many months are in a year?','12'),('Which month starts the year?','January'),('Which month comes before March?','February'),
      ('How many days are in a week?','7'),('Which two days are the weekend (in this poem)?','Saturday and Sunday')],
     'Months and days', 'Fill in.',
     [('The last month is {_}.','December'),('The day after Friday is {_}.','Saturday'),('Name one more month with 31 days: {_}','May / July / August / October / December'),
      ('Magic e: pin → {_}','pine'),('Magic e: bon + e → {_}','bone')])

unit('The Brown Caterpillar', '🐛',
     'Brown and furry, soft and slow,<br>Caterpillar, where do you go?<br>'
     'Up a leaf and down a stalk,<br>Munch, munch, munch — it is time to eat and walk.<br>'
     'Birds may peck and frogs may peep,<br>But in a leaf you hide and sleep.<br>'
     'One bright day you will open wide<br>With painted wings — a butterfly!',
     [('🐛','caterpillar','a furry crawling insect'),('🍃','leaf','part of a plant'),('🦋','butterfly','an insect with colourful wings'),
      ('🐦','bird','it has feathers and wings'),('😴','sleep','to rest'),('🌿','stalk','the stem of a plant')],
     [('This poem is about a {_}.','caterpillar'),('What colour is the caterpillar?','Brown'),
      ('What does it eat?','Leaves'),('What does the caterpillar grow into?','A butterfly'),('Who may peck the caterpillar?','Birds')],
     'Rhyming words', 'Write the word that rhymes.',
     [('slow – g{_}','go'),('stalk – w{_}','walk'),('peep – s{_}','sleep'),('wide – h{_}','hide'),('eat – m{_}','meat / heat / seat')])

unit('Hey Diddle Diddle', '🐄',
     'Hey, diddle, diddle,<br>The cat and the fiddle,<br>The cow jumped over the moon;<br>'
     'The little dog laughed to see such sport,<br>And the dish ran away with the spoon.<br>'
     '<i>(A well-loved old rhyme. Say it with actions!)</i>',
     [('🐱','cat','a pet that purrs'),('🎻','fiddle','a small violin'),('🐄','cow','gives milk'),
      ('🌙','moon','shines at night'),('🍽️','dish','a plate or bowl'),('🥄','spoon','used to eat soup')],
     [('Who played the fiddle?','The cat'),('What did the cow jump over?','The moon'),
      ('Who laughed?','The little dog'),('What ran away with the spoon?','The dish')],
     'Naming words and -oon words', 'Answer.',
     [('Underline one animal in the rhyme: cat, cow or {_}','dog'),('A thing in the rhyme: {_}','fiddle / moon / dish / spoon'),
      ('-oon words: m{_}n, sp{_}n, n{_}n','oo'),('Put in order: moon the cow over jumped the','The cow jumped over the moon.')])

unit('Mr Phil Feels Ill', '🤒',
     'Mr Phil felt ill. His head was hot and his body was full of chills. Dr Small came with a bag. '
     '"Did you eat at the stall by the mall?" asked Dr Small. "Yes, a pie," said Mr Phil. '
     '"Take this pill, drink a full jug of water and rest in bed," said the doctor. '
     'In two days Mr Phil was well. He did not eat street food again!',
     [('🤒','ill','not well'),('💊','pill','a small medicine tablet'),('👨‍⚕️','doctor','helps sick people'),
      ('🛏️','bed','where we sleep'),('💧','water','we drink it'),('🏬','mall','a big shopping place')],
     [('Who felt ill?','Mr Phil'),('Who came to see him?','Dr Small'),('What did he eat?','A pie at a stall'),
      ('What did the doctor tell him to take?','A pill and plenty of water'),('Was he well in two days?','Yes')],
     'The -ill, -all and -ull words', 'Fill with ill / all / ull.',
     [('p{_} (medicine)','ill'),('m{_} (shopping place)','all'),('f{_} (not empty)','ull'),('t{_} (not short)','all'),('h{_} (a small mountain)','ill')])

unit("Uncle Munu's Odd Pets", '🐊',
     'Most people keep a dog or a cat. Uncle Munu keeps odd pets! In his big pond lives a green crocodile who eats fish. '
     'Four slow tortoises munch lettuce and leaves in his garden. In a glass room he has a tank of harmless snakes. '
     'The biggest pet is an elephant who loves bananas. Uncle Munu says one day he will keep a dinosaur. '
     'Everyone laughs because they know he is joking.',
     [('🐊','crocodile','a big green reptile'),('🐢','tortoise','a slow animal with a shell'),('🐍','snake','a long animal with no legs'),
      ('🐘','elephant','biggest land animal'),('🐠','fish','lives in water'),('🦕','dinosaur','an animal that lived long ago')],
     [('Where does the crocodile live?','In the pond'),('What do the tortoises eat?','Lettuce and leaves'),
      ('Which pet loves bananas?','The elephant'),('Why do people laugh?','Because Uncle Munu is joking.'),
      ('Which pets are vegetarian?','The tortoises and the elephant')],
     'Describing words', 'Pick an adjective: big, green, slow, glass.',
     [('a {_} crocodile','green'),('{_} tortoises','slow'),('a {_} tank','glass'),('a {_} elephant','big'),
      ('Land, water or both? tortoise {_}','land')])

unit("Rani's Messy Room", '🧸',
     'Rani\'s room was in a mess. Clothes were on the bed. Toys were on the floor. A plate lay on the table. '
     'Her books were open on the carpet. "Rani, please clean your room," said Mother. '
     'Rani put the books on the shelf and the toys in the toy box. She took the plate to the kitchen and folded her clothes. '
     'The room looked bright and neat. "Well done!" said Mother with a big smile.',
     [('👗','clothes','things we wear'),('🧸','toys','things we play with'),('📚','shelf','a place for books'),
      ('🧺','fold','to bend cloth neatly'),('🧹','clean','not dirty'),('😊','neat','tidy')],
     [('Where were the clothes?','On the bed'),('Where did Rani put the toys?','In the toy box'),
      ('What did she do with the plate?','Took it to the kitchen'),('Why was Mother happy?','Because the room was clean and neat.'),
      ('Is it good to keep your room tidy?','Yes')],
     'Use because', 'Complete the sentence with a reason.',
     [('Rani cleaned her room {_} Mother asked her to.','because'),('I wear a raincoat {_} it is raining.','because'),
      ('Things on the floor can make us {_} (fall / sit)','fall'),('Toys go in the toy {_}.','box'),
      ('Why do we brush our teeth? To keep them {_}.','clean')])

unit('My New Shiny Shoes', '👟',
     'My new shoes are bright and red,<br>They go clip-clop when I tread.<br>'
     'My old shoes were soft and worn,<br>They felt like home from dusk to morn.<br>'
     'New shoes squeak and old ones slide,<br>Which will I wear for my school ride?',
     [('👟','shoes','we wear them on our feet'),('🩴','slippers','light footwear for home'),('👡','sandals','open shoes for summer'),
      ('🧢','cap','worn on the head'),('👕','shirt','worn on the body'),('💍','ring','worn on a finger')],
     [('What colour are the new shoes?','Red'),('What sound do they make?','Clip-clop'),
      ('How were the old shoes?','Soft and worn'),('Which shoes do you like? Why?','answers vary')],
     'Group names', 'Write the group name: footwear / clothes / jewellery.',
     [('shoes, sandals, slippers → {_}','footwear'),('shirt, frock, trousers → {_}','clothes'),
      ('ring, chain, earrings → {_}','jewellery'),('Add -ple: ap + {_}','ple (apple)'),('Add -ble: ta + {_}','ble (table)')])

unit('Meena and the Fireflies', '✨',
     'One summer night Meena visited her grandma. It was warm and a gentle breeze was blowing. '
     'Outside the window tiny lights danced in the dark. "What are they?" asked Meena. '
     '"Fireflies," said Grandma. "They glow so that friends can find each other." '
     'Meena caught a few in a jar and watched them shine. Then she opened the lid. One by one the fireflies flew away. '
     '"Nature is happiest when she is free," said Grandma.',
     [('✨','firefly','an insect that glows at night'),('🫙','jar','a glass container'),('🌙','night','when it is dark'),
      ('🌬️','breeze','a gentle wind'),('👵','grandma','your father\'s or mother\'s mother'),('🕊️','free','able to go where you like')],
     [('Whom did Meena visit?','Her grandma'),('What did she see outside?','Tiny dancing lights (fireflies)'),
      ('Where did she keep the fireflies for a while?','In a jar'),('Why did she let them go?','Because they should be free.'),
      ('When do fireflies glow?','At night')],
     'Verbs: fly / flying / flew', 'Choose the right word.',
     [('The bird is {_} to its nest. (fly / flying / flew)','flying'),('Birds {_} in the sky. (fly / flying / flew)','fly'),
      ('Yesterday the fireflies {_} away. (fly / flying / flew)','flew'),('They have {_} to see Grandma. (go / going / gone)','gone'),
      ('She is {_} to school. (go / going / gone)','going')])

unit('A Trip to the Food Court', '🍕',
     'Aunt Bina took the children to the food court. Each child had some money. Hamida bought a bar of chocolate. '
     'Feroz bought a packet of chips. Maria bought a jar of jam. Hari bought a slice of pizza and Charles bought a fresh strawberry tart. '
     'At home they put everything on the table and shared. Everyone got to taste a little of each. Sharing is clever and kind!',
     [('🍫','chocolate','a sweet treat'),('🍟','chips','salty fried potato'),('🍕','pizza','a round baked food with cheese'),
      ('🍓','strawberry','a small red fruit'),('🍯','jam','sweet spread made from fruit'),('🤝','share','to give a part to others')],
     [('Who took the children to the food court?','Aunt Bina'),('What did Hari buy?','A slice of pizza'),
      ('Who bought something salty?','Feroz (chips)'),('Which food is made from fruit?','Jam / strawberry tart'),
      ('Why is sharing clever?','Because everyone gets to taste many things.')],
     'Healthy or treat?', 'Write H for healthy, T for treat.',
     [('apple {_}','H'),('chocolate {_}','T'),('milk {_}','H'),('chips {_}','T'),('carrot {_}','H')])

unit('The Vegetable Basket', '🥕',
     'Bindu Didi brings a big basket of vegetables. There are tomatoes, onions and potatoes. There are green beans and peas, '
     'orange carrots and purple brinjals. Broccoli looks like tiny trees. Pumpkins are round and yellow. '
     'Bitter gourd is bumpy like a crocodile. Some vegetables can be eaten raw, others must be cooked. '
     'Vegetables help us grow big and strong!',
     [('🍅','tomato','a red round vegetable'),('🥕','carrot','long and orange'),('🥦','broccoli','looks like a tiny tree'),
      ('🧅','onion','makes eyes water'),('🥔','potato','grows under the ground'),('🍆','brinjal','purple vegetable')],
     [('Who brings the vegetables?','Bindu Didi'),('Which vegetable looks like tiny trees?','Broccoli'),
      ('What colour are carrots?','Orange'),('Which vegetables can be eaten raw?','Carrot, tomato, cucumber (any sensible answer)'),
      ('Why should we eat vegetables?','To grow big and strong.')],
     'Naming words, colours', 'Match the colour.',
     [('carrot is {_}','orange'),('tomato is {_}','red'),('peas are {_}','green'),('brinjal is {_}','purple'),
      ('Two vegetables starting with c: {_}','carrot, cabbage / cucumber / capsicum')])

unit('Please and Thank You', '🙏',
     'Eve has a friend named Steve.<br>She says "please" and "thank you" when she can.<br>'
     'She does not burp, she does not shout,<br>She says "excuse me" and waits her turn out.<br>'
     'Good manners cost us nothing at all,<br>But make us dear to one and all.',
     [('🙏','please','a polite word for asking'),('😊','thank you','we say it when we get something'),
      ('🤭','excuse me','said before you interrupt'),('⏳','wait','to stay until it is your turn'),
      ('🤝','friend','someone you like'),('📢','shout','to speak very loudly')],
     [('What are the two friends\' names?','Eve and Steve'),('What polite words does Eve say?','Please and thank you'),
      ('What does she say before speaking?','Excuse me'),('Name one good manner.','answers vary (waiting for your turn, saying please...)')],
     'Make new words with -ing', 'Add -ing.',
     [('say → {_}','saying'),('help → {_}','helping'),('wait → {_}','waiting'),('put → {_}','putting'),('get → {_}','getting')])

unit('Silky the Spider and Friends', '🕷️',
     'Silky the spider had no friends. The other bugs were afraid of his long thin legs. '
     'He lived on a web between two trees. One day Silky had an idea. He made a soft web like a hammock. '
     'Then he made a web like a trampoline and one like a swing. The ladybirds, ants and butterflies came to play. '
     '"Silky is clever!" they said. They forgot to be afraid. After that Silky always had friends.',
     [('🕷️','spider','has eight legs'),('🐞','ladybird','a small red insect with dots'),('🐜','ant','a very small insect'),
      ('🦋','butterfly','an insect with colourful wings'),('🕸️','web','a spider\'s home'),('🛝','swing','you sit and move to and fro')],
     [('Why did the bugs run from Silky?','His legs were long and thin and they were afraid.'),
      ('What did Silky make with his web?','A hammock, a trampoline and a swing'),
      ('Who came to play?','Ladybirds, ants and butterflies'),('What did Silky have in the end?','Friends')],
     'Insects and legs', 'Answer.',
     [('A spider has {_} legs.','8'),('An insect has {_} legs.','6'),('Which is not an insect: ant, spider, bee? {_}','spider'),
      ('Spider + web → {_}','spider web'),('Say a describing word for Silky: {_}','clever / kind / thin')])

unit('Tinu the Forgetful Elephant', '🐘',
     'Tinu was a young elephant who forgot everything. He forgot names. He forgot where he was going. '
     'Once he went to fetch bananas and came back with nothing in his trunk! His friend Kiki the crocodile said, '
     '"Tie a knot in your tail. When you see it you will remember there is something to do." '
     'Tinu tried. He tied a knot, saw it and remembered to bring bananas. His mother was happy. '
     'Tinu still forgets names but now he has a trick to remember his work.',
     [('🐘','elephant','a big animal with a trunk'),('🐊','crocodile','a big reptile'),('🪢','knot','a tied string'),
      ('🍌','banana','a long yellow fruit'),('🧠','remember','to keep in your mind'),('😶','forget','not to remember')],
     [('What was Tinu\'s problem?','He forgot things.'),('Who helped him?','Kiki the crocodile'),
      ('What was the trick?','Tie a knot in his tail.'),('Pick the word for Tinu: forgetful, angry or lazy?','forgetful'),
      ('How can you remember things?','answers vary (write them down, tie a knot...)')],
     'He / she / it / they', 'Choose the right pronoun.',
     [('Tinu is an elephant. {_} is big. (He / She)','He'),('Meera and Rita are friends. {_} play. (We / They)','They'),
      ('The knot is on the tail. {_} is red. (It / He)','It'),('Add -ed: help → {_}','helped'),('Add -ing: jump → {_}','jumping')])

unit('I Talk, I Walk', '🗣️',
     'Kittens mew, doves coo, ducks quack, hens cluck,<br>Lions roar, dogs bark, cows moo, monkeys chatter.<br><br>'
     'Frogs hop, snakes slither, horses trot, kangaroos jump,<br>Snails crawl, birds fly, fish swim, but I talk and I walk!',
     [('🐱','mew','sound of a kitten'),('🦆','quack','sound of a duck'),('🐸','hop','a frog\'s movement'),
      ('🐍','slither','move like a snake'),('🐴','trot','how a horse walks'),('🐌','crawl','move slowly on the ground')],
     [('What sound does a duck make?','Quack'),('What does a kitten say?','Mew'),('How does a frog move?','It hops.'),
      ('Which animal slithers?','A snake'),('What can people do that animals in the poem cannot?','Talk and walk')],
     'Doing words (verbs)', 'Write the sound or action.',
     [('A cow says {_}.','moo'),('A lion {_}.','roars'),('A bird {_}.','flies'),('A fish {_}.','swims'),('A snail {_}.','crawls')])


def ch18():
    c = Chapter(17, 'More Story Time and Poems', '🌟', COLORS[3],
                ['read more short stories and poems', 'answer who, what, where and why questions',
                 'learn new words with pictures', 'practise phonics and grammar from each story'])
    c.p('<i>All stories and poems here are written for this book, using the themes of the Grade 1 reader units.</i>')
    for t, e, text, words, qs, dt, di, dr in U:
        c.h(f'{e} {t}')
        c.raw(passage(t, text))
        c.raw(table(['', 'Word', 'Meaning'], [[a, f'<b>{b}</b>', m] for a, b, m in words]))
        c.ex(f'{t}: questions', 'Say and write.', qs, cols=1)
        c.ex(f'{t}: {dt}', di, dr, cols=1)
    return c
