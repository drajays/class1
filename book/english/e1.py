# English Class 1 — chapters 1-6: letters, phonics, sentences, articles, nouns, plurals
from lib import *


def ch1():
    c = Chapter(1, 'Letters, Vowels and Sounds', '🔤', COLORS[0],
                ['say and write the 26 letters of the alphabet', 'tell capital and small letters apart',
                 'know vowels and consonants', 'put words in alphabetical order'])
    c.h('The alphabet')
    c.p('There are <b>26 letters</b> in the English alphabet. Each letter has a <b>capital</b> (big) and a <b>small</b> form.')
    c.raw(table(['Capital','A B C D E F G H I J K L M','N O P Q R S T U V W X Y Z'],
                [['small','a b c d e f g h i j k l m','n o p q r s t u v w x y z']]))
    c.h('Vowels and consonants')
    c.p('The five letters <b>a e i o u</b> are <b>vowels</b>. Every word needs a vowel sound. The other 21 letters are <b>consonants</b>.')
    c.raw('<div class="row em2"><b style="color:#e03131">a e i o u</b> &nbsp; 🍎 🥚 🍦 🐙 ☂️</div>'
          '<div class="row sm">apple, egg, ice-cream, octopus, umbrella</div>')
    c.remember('Use <b>Capital letters</b> for: the first word of a sentence, names (Riya, India), the word <b>I</b>, days and months.')
    c.tip('Say the letter <b>sound</b> (/a/ as in apple), not only the letter name (ay). Sounds help children read.')
    c.ex('Capital and small', 'Write the matching letter.', [
        ('B → {_}','b'),('d → {_}','D'),('M → {_}','m'),('q → {_}','Q'),('R → {_}','r'),('g → {_}','G')], cols=3)
    c.ex('Vowel or consonant?', 'Write V for vowel and C for consonant.', [
        (f'{l} → {{_}}', 'V' if l in 'aeiou' else 'C') for l in 'tobupkei']  , cols=4)
    c.ex('What comes next?', 'Write the missing letter.', [
        ('a, b, {_}, d','c'),('g, h, {_}, j','i'),('m, n, {_}, p','o'),('s, t, {_}, v','u'),('w, x, {_}, z','y')], cols=3)
    c.ex('Alphabetical order', 'Write the words in ABC order.', [
        ('cat, ant, bat → {_}','ant, bat, cat'),('sun, moon, star → {_}','moon, star, sun'),
        ('dog, egg, cow → {_}','cow, dog, egg'),('pen, ink, jar → {_}','ink, jar, pen')], cols=1)
    c.ex('First sound', 'Write the first letter of each picture word.', [
        ('🍌 → {_}','b'),('🐘 → {_}','e'),('🐟 → {_}','f'),('🏠 → {_}','h'),('🌙 → {_}','m'),('🐍 → {_}','s')], cols=3)
    return c


def ch2():
    c = Chapter(2, 'Phonics: Word Families and Magic e', '🔊', COLORS[1],
                ['read word families like -at, -ig, -ack', 'use the magic e to make long vowel sounds',
                 'read sh, ch, th, wh and blends like br, gr, bl', 'make new words with -ed and -ing'])
    c.h('Word families (rhymes)')
    c.p('Words that end in the same sounds <b>rhyme</b>. Change the first letter to make a new word.')
    c.raw(table(['-at','-ig','-ip','-in','-ack','-ill'],
                [['cat, bat, mat, hat','big, pig, dig, wig','dip, hip, lip, tip','bin, pin, tin, win',
                  'back, Jack, sack, pack','hill, bill, mill, fill']]))
    c.h('Magic e ✨')
    c.p('A silent <b>e</b> at the end makes the vowel say its <b>name</b>.')
    c.raw(table(['Without e','With magic e'],
                [['can, man, cap','cane, mane, cape'],['kit, rid, pin','kite, ride, pine'],['hop, not, rob','hope, note, robe'],
                 ['cub, tub, cut','cube, tube, cute']]))
    c.h('Sounds in pairs and groups')
    c.raw(table(['sh','ch','th','wh','qu'],
                [['ship, shop, fish','chair, chip, lunch','this, thin, bath','what, when, why','queen, quick, quack']]))
    c.raw(table(['br','gr','tr','bl','cl','fl'],
                [['brown, bring','green, grow','tree, train','blue, black','clap, clock','flag, fly']]))
    c.remember('To make <b>-ed</b> and <b>-ing</b> words: wash → washed → washing, cook → cooked → cooking, jump → jumped → jumping.')
    c.ex('Word families', 'Add a letter to make a word. Use b, d, f, h, l, p, t, w.', [
        ('__ig (a farm animal that says oink → p…)','pig'),('__ip (the edge of your mouth → l…)','lip'),
        ('__in (a place for rubbish → b…)','bin'),('__ick (a stick → s… t…)','stick'),
        ('__ack (a bag → s…)','sack'),('__ill (a small mountain → h…)','hill')], cols=2)
    c.ex('Add magic e', 'Add e and read the new word.', [
        ('cap + e = {_}','cape'),('kit + e = {_}','kite'),('tub + e = {_}','tube'),('hop + e = {_}','hope'),
        ('pin + e = {_}','pine'),('cub + e = {_}','cube')], cols=3)
    c.ex('Choose the right word', 'Circle (write) the correct word.', [
        ('Please draw a straight ___ . (line / fine)','line'),('The third pig\'s house was made of ___ . (brick / trick)','brick'),
        ('We went to Mumbai in a ___ . (train / grain)','train'),('He ___ to the party. (came / game)','came'),
        ('We went to ___ in a big restaurant. (mine / dine)','dine'),('The ___ tree is very tall. (wine / pine)','pine')], cols=1)
    c.ex('Rhyming words', 'Write two words that rhyme.', [
        ('cake → {_}, {_}','bake, lake'),('moon → {_}, {_}','spoon, noon'),('name → {_}, {_}','game, same'),
        ('race → {_}, {_}','face, place'),('pile → {_}, {_}','mile, smile'),('walk → {_}, {_}','talk, chalk')], cols=2)
    c.ex('-ed and -ing', 'Make new words.', [
        ('wash → {_}, {_}','washed, washing'),('cook → {_}, {_}','cooked, cooking'),
        ('look → {_}, {_}','looked, looking'),('jump → {_}, {_}','jumped, jumping')], cols=2)
    c.ex('sh or ch?', 'Fill in sh or ch.', [
        ('__eep 🐑','sh'),('__air 🪑','ch'),('__ip 🚢','sh'),('__eese 🧀','ch'),('__oe 👟','sh'),('lun__ 🍱','ch')], cols=3)
    return c


def ch3():
    c = Chapter(3, 'Sentences and Punctuation', '✍️', COLORS[2],
                ['know that a sentence tells a complete thought', 'start with a capital letter and end with . ? !',
                 'put jumbled words in order', 'use commas in a list'])
    c.h('What is a sentence?')
    c.p('A <b>sentence</b> is a group of words that tells a complete thought. It starts with a <b>capital letter</b> and ends with a '
        '<b>full stop (.)</b>, <b>question mark (?)</b> or <b>exclamation mark (!)</b>.')
    c.raw(table(['Kind','Ends with','Example'],
                [['Telling','full stop .','Jim has a pet dog.'],['Asking','question mark ?','Who are you?'],
                 ['Surprise / feeling','exclamation mark !','What a big giant!']]))
    c.h('Commas in a list')
    c.p('Use a <b>comma ( , )</b> between things in a list. Use <b>and</b> before the last one: I bought rice, dal, bread <b>and</b> oil.')
    c.remember('Sentence = Capital letter + words that make sense + . ? !')
    c.ex('Put the words in order', 'Make a sentence. Start with a capital letter.', [
        ('are / you / who ?','Who are you?'),('at / I / home / am .','I am at home.'),
        ('is / my / Nix / dog / cute / pet .','My pet dog Nix is cute.'),('shop / to / Ram / the / go / did ?','Did Ram go to the shop?')], cols=1)
    c.ex('Capital letters and full stops', 'Write the sentence correctly.', [
        ('mr phil is now well and dr small is happy','Mr Phil is now well and Dr Small is happy.'),
        ('riya and ram looked for grandpas glasses','Riya and Ram looked for Grandpa\'s glasses.'),
        ('peacock is the national bird','Peacock is the national bird.'),('my uncle lives in mumbai','My uncle lives in Mumbai.')], cols=1)
    c.ex('Which mark?', 'Write . ? or !', [
        ('Where do you live{_}','?'),('I like mangoes{_}','.'),('Wow, what a big tree{_}','!'),
        ('What is your name{_}','?'),('The cat is asleep{_}','.'),('Help, fire{_}','!')], cols=2)
    c.ex('Add commas', 'Rewrite with commas and and.', [
        ('Mother bought rice dal bread and oil.','Mother bought rice, dal, bread and oil.'),
        ('The fruit shop has apples mangoes melons and bananas.','The fruit shop has apples, mangoes, melons and bananas.'),
        ('Tina packed jeans a pink top and shoes.','Tina packed jeans, a pink top and shoes.')], cols=1)
    c.ex('Complete the sentence', 'Use your own words.', [
        ('I like to eat {_}.','answers vary'),('My favourite colour is {_}.','answers vary'),('At school I play with {_}.','answers vary')], cols=1)
    return c


def ch4():
    c = Chapter(4, 'Articles: a, an, the', '🅰️', COLORS[3],
                ['use a before consonant sounds', 'use an before vowel sounds', 'use the for something special'])
    c.h('a, an and the')
    c.p('<b>A</b>, <b>an</b> and <b>the</b> are called <b>articles</b>. They come before a naming word.')
    c.raw(table(['Article','When we use it','Examples'],
                [['<b>a</b>','before a word that starts with a consonant sound','a cat, a book, a pen'],
                 ['<b>an</b>','before a word that starts with a vowel sound (a e i o u)','an apple, an egg, an owl'],
                 ['<b>the</b>','when we talk about one special thing','the sun, the moon']]))
    c.remember('Listen to the first <b>sound</b>: <b>an</b> hour (we say "our"), <b>a</b> unicorn (we say "yoo").')
    c.ex('a or an?', 'Write a or an.', [
        (f'{{_}} {w}', 'an' if w[0] in 'aeiou' else 'a') for w in
        ('arrow','egg','girl','ice-cream','elephant','dog','orange','book','umbrella','mango')], cols=5)
    c.ex('Fill in the sentence', 'Choose a or an.', [
        ('I eat {_} egg every morning.','an'),('Rahul shot {_} arrow at the target.','an'),('Mother packs {_} apple and {_} mango.','an, a'),
        ('She also keeps {_} bottle of juice and {_} sandwich.','a, a'),('Father takes {_} book to read.','a'),
        ('The children keep {_} aeroplane and {_} football to play.','an, a')], cols=1)
    c.ex('Right or wrong?', 'Write ✓ or ✗. If wrong, write the correct words.', [
        ('a apple','✗ an apple'),('an umbrella','✓'),('a elephant','✗ an elephant'),('an dog','✗ a dog'),
        ('an orange','✓'),('a school','✓')], cols=3)
    c.ex('Zoo letter', 'Fill in a, an or the.', [
        ('I went to {_} zoo yesterday.','the'),('I saw {_} lion.','a'),('I saw {_} elephant.','an'),
        ('{_} sun was very hot.','The')], cols=2)
    return c


def ch5():
    c = Chapter(5, 'Nouns: Naming Words', '🏷️', COLORS[4],
                ['say what a noun is', 'sort nouns into person, place, animal and thing',
                 'tell common and proper nouns apart', 'start a name with a capital letter'])
    c.h('What is a noun?')
    c.p('A <b>noun</b> is the name of a <b>person</b>, <b>place</b>, <b>animal</b> or <b>thing</b>. It is also called a <b>naming word</b>.')
    c.raw(table(['Person','Place','Animal','Thing'],
                [['teacher, girl','school, park','dog, parrot','book, ball'],['Riya, Ram','Lucknow, India','Bruno, Simba','Maggi, Cadbury']]))
    c.h('Common and proper nouns')
    c.p('A <b>common noun</b> is a general name: girl, school, dog, food. A <b>proper noun</b> names one special person, place, animal or thing '
        'and <b>always starts with a capital letter</b>: Riya, Lucknow, Bruno, Maggi.')
    c.raw(table(['Common noun','Proper noun','Sentence'],
                [['girl','Riya','She is a girl. Her name is Riya.'],['school','Seth M.R. Jaipuria','My school is Seth M.R. Jaipuria.'],
                 ['food','Maggi','My favourite food is Maggi.'],['dog','Bruno','Bruno is my pet dog.']]))
    c.remember('Days (Monday), months (June), cities (Delhi), countries (India) are proper nouns → <b>capital letter</b>.')
    c.ex('Sort the nouns', 'Write P (person), L (place), A (animal) or T (thing).', [
        (f'{w} → {{_}}', k) for w, k in [('principal','P'),('village','L'),('snake','A'),('book','T'),('alligator','A'),
        ('teacher','P'),('street','L'),('carpenter','P'),('zebra','A'),('palace','L'),('watch','T'),('chair','T')]], cols=4)
    c.ex('Common or proper?', 'Write C or P.', [
        (f'{w} → {{_}}', k) for w, k in [('boy','C'),('Rohan','P'),('city','C'),('Lucknow','P'),('Bruno','P'),('dog','C')]], cols=3)
    c.ex('Fill with a noun', 'Use words: igloo, rabbit, castle, drum, moon, king.', [
        ('Eskimos live in an {_}.','igloo'),('The {_} and the queen live in a big {_}.','king, castle'),
        ('I can beat a {_}.','drum'),('At night I can see the {_} and stars.','moon'),('A {_} has long ears.','rabbit')], cols=1)
    c.ex('Capital letters', 'Rewrite the sentence correctly.', [
        ('I live in lucknow.','I live in Lucknow.'),('Today is thursday.','Today is Thursday.'),
        ('My brother\'s name is rohan.','My brother\'s name is Rohan.'),('Delhi is the capital of india.','Delhi is the capital of India.')], cols=1)
    c.ex('Find the nouns', 'Write the nouns in each sentence.', [
        ('The boy ran to his mother.','boy, mother'),('The milk tastes sour.','milk'),('Rose is a beautiful girl.','Rose, girl'),
        ('The cat sat on the mat.','cat, mat'),('Ravi has a red kite.','Ravi, kite')], cols=1)
    c.fun('<b>🎮 Noun game:</b> Pick a letter, e.g. B. Name a <b>person</b> (Bipin), <b>place</b> (Bombay), <b>animal</b> (bat), <b>thing</b> (ball).')
    return c


def ch6():
    c = Chapter(6, 'Singular, Plural and Gender', '👫', COLORS[5],
                ['tell one (singular) from many (plural)', 'add s to make plurals and learn special ones',
                 'know masculine and feminine words'])
    c.h('One or many?')
    c.p('<b>Singular</b> means <b>one</b>: boy, dog, pen. <b>Plural</b> means <b>more than one</b>: boys, dogs, pens.')
    c.raw(table(['Rule','Singular','Plural'],
                [['Add <b>s</b>','bird, egg, dog, pencil, toy','birds, eggs, dogs, pencils, toys'],
                 ['Change the word','child, man, woman, tooth, foot, mouse, goose, ox','children, men, women, teeth, feet, mice, geese, oxen'],
                 ['Same for one and many','sheep, deer, fish, hair, grass','sheep, deer, fish, hair, grass']]))
    c.h('Masculine and feminine')
    c.p('<b>Masculine</b> is for males (boys, men, male animals). <b>Feminine</b> is for females.')
    c.raw(table(['Masculine','father','brother','king','son','uncle','man','prince','lion','peacock','bull','horse','cock'],
                [['Feminine','mother','sister','queen','daughter','aunt','woman','princess','lioness','peahen','cow','mare','hen']]))
    c.ex('One to many', 'Write the plural.', [
        (f'{s} → {{_}}', p) for s, p in [('duck','ducks'),('umbrella','umbrellas'),('child','children'),('tooth','teeth'),
        ('mouse','mice'),('woman','women'),('foot','feet'),('man','men')]], cols=4)
    c.ex('Choose the correct plural', 'Circle (write) the right word.', [
        ('ox: oxes / oxen','oxen'),('sheep: sheeps / sheep','sheep'),('fish: fish / fishes','fish'),('mouse: mouses / mice','mice'),
        ('goose: gooses / geese','geese'),('man: mans / men','men')], cols=2)
    c.ex('Make it right', 'Rewrite the sentence correctly.', [
        ('I take my bicycle to the park with my three friend.','I take my bicycle to the park with my three friends.'),
        ('Many childs are in the park.','Many children are in the park.'),('The fishs are in the pond.','The fish are in the pond.'),
        ('Two mans are walking.','Two men are walking.')], cols=1)
    c.ex('Masculine or feminine', 'Choose the right word.', [
        ('The ___ is a very tall man. (king / queen)','king'),('A ___ lays eggs. (cock / hen)','hen'),
        ('The ___ is the king of the jungle. (lion / lioness)','lion'),('The ___ loves her cubs. (tiger / tigress)','tigress'),
        ('Veena is Mr Goel\'s ___ . (son / daughter)','daughter'),('My sister\'s daughter is my ___ . (nephew / niece)','niece')], cols=1)
    c.ex('Write the other gender', 'Write the matching word.', [
        ('father → {_}','mother'),('brother → {_}','sister'),('prince → {_}','princess'),('uncle → {_}','aunt'),
        ('grandfather → {_}','grandmother'),('boy → {_}','girl'),('nephew → {_}','niece'),('sir → {_}','madam')], cols=4)
    return c
