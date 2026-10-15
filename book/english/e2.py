# English Class 1 — chapters 7-12: pronouns, verbs, adjectives, prepositions, conjunctions, opposites
from lib import *


def ch7():
    c = Chapter(7, 'Pronouns', '🙋', COLORS[6],
                ['use he, she, it, they in place of nouns', 'use his and her for belonging',
                 'use this, that, these and those correctly'])
    c.h('A word that takes the place of a noun')
    c.p('Instead of saying the name again and again, we use a <b>pronoun</b>.')
    c.raw('<div class="row">Grandpa looked for his glasses. <b>He</b> could not find them. → <b>He</b> stands for Grandpa; <b>them</b> stands for glasses.</div>')
    c.raw(table(['For','Pronoun','Example'],
                [['boy / man','he, his','Ram is my friend. <b>He</b> loves cricket. <b>His</b> bat is new.'],
                 ['girl / woman','she, her','Rani is my friend. <b>She</b> dances well. <b>Her</b> dress is red.'],
                 ['thing / animal','it','This is my ball. <b>It</b> is red.'],
                 ['more than one','they, them','The kids are happy. <b>They</b> are playing.']]))
    c.h('this, that, these, those')
    c.raw(table(['','Near me 👇','Far from me 👉'],
                [['One','<b>this</b> is a book','<b>that</b> is a book'],['Many','<b>these</b> are books','<b>those</b> are books']]))
    c.remember('<b>This / These</b> = near. <b>That / Those</b> = far.  Use <b>this/that</b> for one, <b>these/those</b> for many.')
    c.ex('he or she?', 'Fill in he or she.', [
        ('{_} is a cunning king.','He'),('{_} is a hardworking milkmaid.','She'),('{_} is Ram, my best friend.','He'),
        ('{_} is Radha, the sweetest girl in class.','She'),('{_} is a postman who always smiles.','He'),
        ('{_} is a caring nurse.','She')], cols=1)
    c.ex('he, she, his, her, it', 'Fill in the blanks.', [
        ('I have a friend. {_} name is Raj. {_} has a toy car. {_} is a super car.','His, He, It'),
        ('Rani is my friend. {_} dances well.','She'),('Rahul has a bat. {_} is his favourite.','It'),
        ('Ravi is my best friend. Sapna is {_} sister.','his'),('Reema is a chef. {_} cooks well.','She')], cols=1)
    c.ex('this, that, these, those', 'Choose the right word.', [
        ('{_} is an apple. (near, one)','This'),('{_} is a star in the sky. (far, one)','That'),
        ('{_} are my shoes. (near, many)','These'),('{_} are birds on the tree. (far, many)','Those'),
        ('Take {_} blanket. (this / these)','this'),('See {_} boys there. (these / those)','those')], cols=2)
    c.ex('Correct the mistake', 'Rewrite the sentence.', [
        ('She is my son.','He is my son.'),('Virat Kohli is a cricketer. She plays for India.','Virat Kohli is a cricketer. He plays for India.'),
        ('My mother gave his clothes.','My mother gave her clothes.')], cols=1)
    return c


def ch8():
    c = Chapter(8, 'Verbs: Action Words', '🏃', COLORS[7],
                ['find the action word in a sentence', 'use is, am, are and has, have', 'use today and yesterday forms (tense)'])
    c.h('Doing words')
    c.p('A <b>verb</b> tells what someone or something <b>does</b>. run, jump, sleep, eat, climb, draw, swim.')
    c.raw('<div class="row">Rahul <b>is playing</b>. Satish <b>is sleeping</b>. Tom <b>is standing</b>.</div>')
    c.h('is, am, are')
    c.raw(table(['I → <b>am</b>','he, she, it, one thing → <b>is</b>','you, we, they, many things → <b>are</b>'],
                [['I am happy.','She is happy.','They are happy.']]))
    c.h('has and have')
    c.raw(table(['I, you, we, they → <b>have</b>','he, she, it, one person → <b>has</b>'],
                [['They have a garden.','The camel has a hump.']]))
    c.h('Today and yesterday (tense)')
    c.raw(table(['Present (today)','play, cook, ask, climb','run, sleep, see, buy, bring','cut, put, read, hit'],
                [['Past (yesterday)','played, cooked, asked, climbed','ran, slept, saw, bought, brought','cut, put, read, hit']]))
    c.remember('Add <b>-ed</b> for most past verbs. Some change completely (run → ran). Some stay the same (cut → cut).')
    c.ex('is, am or are', 'Fill in the blanks.', [
        ('I {_} playing football.','am'),('Geeta {_} writing a letter.','is'),('The bags {_} in the cupboard.','are'),
        ('The glass {_} full.','is'),('They {_} my friends.','are'),('It {_} eight o\'clock now.','is'),
        ('My brother and I {_} in the same class.','are'),('He {_} playing.','is')], cols=2)
    c.ex('has or have', 'Fill in the blanks.', [
        ('He {_} a blue hat.','has'),('We {_} five apples.','have'),('Meena {_} many dolls.','has'),
        ('The camel {_} a big hump.','has'),('They {_} a big garden.','have'),('You {_} long hair.','have')], cols=2)
    c.ex('Yesterday', 'Write the past form.', [
        (f'{a} → {{_}}', b) for a, b in [('play','played'),('dance','danced'),('run','ran'),('sleep','slept'),('see','saw'),
        ('buy','bought'),('catch','caught'),('cut','cut')]], cols=4)
    c.ex('Correct the verb', 'Rewrite the sentence correctly.', [
        ('My mother are baking a cake.','My mother is baking a cake.'),('Water are colourless.','Water is colourless.'),
        ('The Sun rise in the west.','The Sun rises in the east.'),('Our parents is very fond of us.','Our parents are very fond of us.'),
        ('He cutted the paper.','He cut the paper.'),('Yesterday I see a rainbow.','Yesterday I saw a rainbow.')], cols=1)
    c.ex('Find the verb', 'Write the action word.', [
        ('The dog wags its tail.','wags'),('Nix runs after the ball.','runs'),('Birds fly in the sky.','fly'),
        ('Mother cooks food.','cooks')], cols=2)
    return c


def ch9():
    c = Chapter(9, 'Adjectives: Describing Words', '🎨', COLORS[8],
                ['say what an adjective is', 'describe how things look, feel, taste and sound', 'pick the best describing word'])
    c.h('Words that describe')
    c.p('An <b>adjective</b> tells more about a noun. A <b>big</b> elephant, a <b>soft</b> pillow, a <b>sweet</b> mango.')
    c.raw(table(['Looks','Feels','Tastes','Sounds','Person'],
                [['tall, short, curvy, fluffy','soft, smooth, slimy, bumpy','sweet, sour, bitter, juicy, salty',
                  'loud, noisy, calm, shrill','kind, brave, cheerful, clever']]))
    c.remember('Ask: <b>What kind?</b> <b>Which one?</b> <b>How many?</b> — the answer is an adjective. Rolo is a <b>funny</b> clown.')
    c.ex('Choose the best word', 'Pick the right describing word.', [
        ('The giraffe is ___ . (tall / small)','tall'),('A circle is always ___ . (square / round)','round'),
        ('December is a ___ month. (cold / hot)','cold'),('The feathers of a dove are white and ___ . (hard / soft)','soft'),
        ('A watermelon is ___ from inside. (blue / red)','red'),('The pastries are very ___ . (sweet / spicy)','sweet'),
        ('The ___ knight fought the dragon. (brave / coward)','brave'),('The forest is very ___ at night. (yellow / dark)','dark')], cols=1)
    c.ex('Underline the adjectives', 'Write the describing words.', [
        ('Two red birds sat on the blue flower.','red, blue'),('I got a purple toy car.','purple'),
        ('The black dog jumped over the bar.','black'),('She wore a beautiful dress.','beautiful')], cols=1)
    c.ex('Fix the adjective', 'Pick the suitable adjective and rewrite.', [
        ('The balloon is circle in shape. (long, fat, round)','The balloon is round in shape.'),
        ('I saw a long building. (tall, thick, little)','I saw a tall building.'),
        ('Tiger is a domestic animal. (wild, tall, sharp)','Tiger is a wild animal.')], cols=1)
    c.ex('Describe it', 'Write one adjective for each.', [
        ('Ice cream is {_}.','cold / sweet'),('A lemon is {_}.','sour'),('A rock is {_}.','hard'),('A kitten is {_}.','soft / small'),
        ('A drum is {_}.','loud'),('A rose smells {_}.','nice / sweet')], cols=3)
    c.ex('Mystery box', 'Read the clues and guess what it is.', [
        ('It is soft. It is brown. It is a toy. You hug it. → {_}','teddy bear'),
        ('It is round. You kick it. You bounce it. → {_}','ball'),
        ('It is sweet and crunchy. You eat it with tea. → {_}','biscuit')], cols=1)
    return c


def ch10():
    c = Chapter(10, 'Prepositions: Position Words', '📍', COLORS[9],
                ['say where something is', 'use in, on, under, behind, in front of, between, near, above'])
    c.h('Where is it?')
    c.p('A <b>preposition</b> shows the <b>position</b> of a thing or person.')
    c.raw(table(['in 📦','on 📚','under 🪑','behind 🌳','in front of 🚪','between 🐶🐶'],
                [['The dog is in the box.','The apple is on the box.','The girl is under the table.',
                  'The cat is behind the box.','The ball is in front of the box.','The boy is between the dogs.']]))
    c.p('More position words: <b>above, below, beside, near, over, against, up, down, around</b>.')
    c.ex('Choose the position word', 'Circle (write) the right word.', [
        ('The cat is ___ the table. (under / on)','under'),('The boy is sitting ___ the chair. (on / under)','on'),
        ('The burger is ___ the plate. (on / in)','on'),('The eggs are ___ the nest. (in / on)','in'),
        ('The Sun is ___ the clouds. (behind / between)','behind'),('The car is parked ___ the tree. (under / over)','under')], cols=1)
    c.ex('Look at the picture words', 'Fill in the blank.', [
        ('The bow is {_} the hat. (on)','on'),('The candles are {_} the cake. (on)','on'),('The fish is {_} the bowl. (in)','in'),
        ('The bear is {_} the cave. (in)','in'),('The cat is {_} the box. (in)','in'),('The raindrops fall {_} the roof. (on)','on')], cols=2)
    c.ex('Where do they live?', 'Match the animal to its home.', [
        ('bird → {_}','nest'),('rat → {_}','hole'),('dog → {_}','kennel'),('lion → {_}','den'),('duck → {_}','pond')], cols=3)
    c.ex('Draw and say', 'Draw it, then complete the sentence.', [
        ('The ball is {_} the box. (draw it)','answers vary'),('The cat is {_} the chair. (draw it)','answers vary')], cols=1)
    c.fun('<b>🎮 Simon says:</b> Put your pencil <b>on</b> the book, <b>under</b> the book, <b>beside</b> the book, <b>in front of</b> the book!')
    return c


def ch11():
    c = Chapter(11, 'Joining Words: and, but, because', '🔗', COLORS[10],
                ['join words and sentences with and', 'give a reason with because', 'show a difference with but'])
    c.h('Conjunctions')
    c.p('A <b>conjunction</b> is a joining word.')
    c.raw(table(['Word','Use','Example'],
                [['<b>and</b>','joins two things','I have a pear <b>and</b> an orange.'],
                 ['<b>because</b>','gives a reason','I carry an umbrella <b>because</b> it is raining.'],
                 ['<b>but</b>','shows a difference','I like tea <b>but</b> I do not like coffee.']]))
    c.remember('For a list use commas and put <b>and</b> before the last item: apples, mangoes <b>and</b> bananas.')
    c.ex('Join with and', 'Join the sentences with and.', [
        ('Rohan bought a book. Rohan bought crayons.','Rohan bought a book and crayons.'),
        ('My brother plays badminton. I play badminton.','My brother and I play badminton.'),
        ('John fell down. John cut his knee.','John fell down and cut his knee.')], cols=1)
    c.ex('Because', 'Fill in because.', [
        ('Kriti did not go to the party {_} she was sick.','because'),('Raj was late {_} he missed the bus.','because'),
        ('I am taking an umbrella {_} it may rain.','because'),('I could not finish homework {_} the power went out.','because')], cols=1)
    c.ex('Choose: and / but / because', 'Pick the right joining word.', [
        ('Rohini is a wonderful orator {_} a dancer. (and / because)','and'),
        ('John likes pizza {_} pasta. (and / because)','and'),
        ('Neha did not come {_} she had other plans. (and / because)','because'),
        ('I wanted to play {_} it was raining. (but / and)','but'),
        ('Jack {_} Anna were late. (and / but)','and')], cols=1)
    c.ex('Reason match', 'Join with because.', [
        ('The girl is hiding / she is afraid.','The girl is hiding because she is afraid.'),
        ('I like to drink milk / it is good for my health.','I like to drink milk because it is good for my health.'),
        ('Ram raised his hand / he wanted to answer.','Ram raised his hand because he wanted to answer.')], cols=1)
    return c


def ch12():
    c = Chapter(12, 'Opposites, Similes and Word Groups', '🔄', COLORS[11],
                ['know word opposites (antonyms)', 'use similes like "as busy as a bee"', 'group words and use quantity words'])
    c.h('Opposites (antonyms)')
    c.raw(table(['hot – cold','big – small','up – down','fast – slow','happy – sad','day – night','open – close','full – empty'],
                [['tall – short','heavy – light','in – out','strong – weak','clean – dirty','early – late','first – last','near – far']]))
    c.h('Similes')
    c.p('A <b>simile</b> compares two things using <b>as … as</b>.')
    c.raw(table(['as white as snow','as black as a crow','as cold as ice','as light as a feather','as busy as a bee'],
                [['as sour as a lemon','as sweet as honey','as slow as a tortoise','as clever as a fox','as soft as a kitten']]))
    c.h('Words that tell how much (quantifiers)')
    c.p('<b>much</b> (not countable: much rice) · <b>many</b> (countable: many friends) · <b>few</b> and <b>little</b> (not much) · '
        '<b>some</b> · <b>a lot of</b> · <b>more</b> and <b>less</b>.')
    c.h('Joining actions in order (sequence words)')
    c.p('<b>First, next, then, after that, finally</b> — to tell steps in order. Making lemonade: First get lemons. Next squeeze them. '
        'Then add sugar. After that add salt. Finally add mint leaves.')
    c.ex('Write the opposite', 'Write the antonym.', [
        (f'{a} → {{_}}', b) for a, b in [('give','take'),('beautiful','ugly'),('long','short'),('narrow','wide'),('sour','sweet'),
        ('slow','fast'),('young','old'),('wet','dry'),('clean','dirty'),('pull','push'),('laugh','cry'),('first','last')]], cols=4)
    c.ex('Opposite pairs in a sentence', 'Fill the blank with the opposite.', [
        ('My table feels smooth but the sandpaper is {_}.','rough'),('The stone is heavy but the feather is {_}.','light'),
        ('My grandfather is old but I am {_}.','young'),('We should keep our room {_}. (not dirty)','clean'),
        ('I missed school because I slept {_} last night.','late')], cols=1)
    c.ex('Complete the simile', 'Choose: honey, snow, ice, bee, feather, tortoise.', [
        ('as white as {_}','snow'),('as busy as a {_}','bee'),('as sweet as {_}','honey'),('as light as a {_}','feather'),
        ('as cold as {_}','ice'),('as slow as a {_}','tortoise')], cols=3)
    c.ex('Group names', 'Write the group name: footwear, clothes, jewellery, fruits, vegetables.', [
        ('shoes, slippers, sandals → {_}','footwear'),('shirt, frock, trousers → {_}','clothes'),
        ('ring, necklace, earrings → {_}','jewellery'),('apple, mango, banana → {_}','fruits'),('carrot, peas, potato → {_}','vegetables')], cols=1)
    c.ex('Put the steps in order', 'Number the steps 1, 2, 3 for making a sandwich.', [
        ('Eat the sandwich.','4'),('Put bread on a plate.','1'),('Spread butter on the bread.','2'),('Add a slice of tomato.','3')], cols=1)
    c.ex('Few or many?', 'Choose the right word.', [
        ('There isn\'t {_} rice in the bowl. (much / many)','much'),('Jack has {_} friends. (much / many)','many'),
        ('There is a {_} milk in the glass. (little / few)','little'),('They went on a trip a {_} days ago. (few / little)','few')], cols=1)
    return c
