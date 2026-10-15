# EVS Class 1 — chapters 1-8. Reuses book/maths/lib.py
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'maths'))
from lib import *

def wb(c, pairs):
    c.raw('<h3>🔤 Word Master</h3>' + table(['Word', 'Meaning'], pairs))

def ch1():
    c = Chapter(1, 'All About Me', '🧒', COLORS[0],
        ['say who I am: name, age, school, family, address', 'understand why an identity card is important',
         'tell my likes and dislikes', 'name my moods and handle them calmly', 'know that I am unique and special'])
    c.h('Who am I?')
    c.p('Every one of us has a name, an age, a birthday, a school and a family. Telling these things is called <b>introducing myself</b>.')
    c.raw(table(['My name is','I am a','My birthday is on','I am in class','I study in','I live in'],
                [['_____','girl / boy','__ / __ / ____','1','_____ school','_____ (city/town)']]))
    c.p('Other things I should know: my father\'s name, my mother\'s name, my address, my blood group and my parent\'s phone number.')
    c.remember('An <b>identity card</b> has important facts about us – name, address and a guardian\'s phone number. It tells others who we are and keeps us safe. Wear it to school every day.')
    c.p('People call us by different names – a pet name, a school name, a nickname. Every name has a meaning. Ask your family what your name means!')
    c.h('What I like and what I don\'t like')
    c.p('I like to play football, read books, paint pictures and fly kites. I do not like to see my friends cry. I do not like to fall sick. '
        'Our <b>likes and dislikes</b> are not the same – and that is perfectly fine. We can give a reason: "I do not like dirt because it makes air and water bad."')
    c.h('My different moods')
    c.raw(table(['When I feel…','I can…'],
                [['😀 Happy (when I come to school)','dance and jump with joy'],['😢 Sad (when I cannot go out to play)','play an indoor game'],
                 ['😨 Scared (when clouds thunder)','count 1 to 10 and calm down'],['😠 Angry','stamp my feet… then take a deep breath'],
                 ['😴 Tired','go to sleep']]))
    c.p('A <b>mood</b> is how we feel inside. All moods are okay. What matters is what we <i>choose to do</i> next.')
    c.h('How am I unique?')
    c.p('Some of us are tall, some are short. Some have brown hair, some have black hair. Our likes and dislikes are different too. '
        'So we are all <b>special and unique</b> – there is no one else exactly like me!')
    c.tryit('Make a <b>Mood-o-Meter</b>. Each day for one week, mark how you feel: 😀 😐 😢 😠 😨.')
    c.remember('When I am angry or sad I should <b>not</b> throw things or shout. I can breathe deeply, count to 20, drink water, read a book or talk to someone I trust.')
    wb(c, [('information','a fact'),('mood','a feeling'),('scared','afraid'),('excited','thrilled'),('unique','the only one of its kind'),('dessert','a sweet dish')])
    c.ex('Fill in the blanks', 'Choose from: identity, look, special, same.', [
        ('An {_} card has important information about us.','identity'),('Our likes and dislikes are not the {_}.','same'),
        ('All of us do not {_} the same.','look'),('We all are {_} and unique.','special')], cols=1)
    c.ex('How do I feel?', 'Complete the sentences about yourself.', [
        ('I laugh when {_}','my own answer (e.g. I play with my friends)'),('I stamp my feet when {_}','my own answer'),
        ('I take a deep breath when {_}','my own answer')], cols=1)
    c.ex('Think and answer', 'Answer in a sentence.', [
        ('How do you feel on your birthday?','happy, excited'),('How will you feel if your friend gets hurt?','sad; I will help'),
        ('Name three things you like to do with a friend.','e.g. play, draw, read'),
        ('What details are on your school identity card?','name, class, school, address, parent phone')], cols=1)
    c.ex('Choose the best way', 'When I am angry I should… (tick the good choice)', [
        ('throw things around','✗'),('take a deep breath and count to 20','✓'),('yell and cry','✗'),('talk to someone I trust','✓')], cols=1)
    c.fun('<b>🎒 Go beyond:</b> Riya went to a place where nobody has a name. What problems will she face? '
          '(We would not know whom to call! Each person is special, so each needs a name.)')
    c.fun('<b>🎨 Fun with friends:</b> make a "Managing My Mood Box" from a paper carton. Fill it with things that calm you – a soft toy, a book, a drawing.')
    return c

def ch2():
    c = Chapter(2, 'My Amazing Body', '🧍', COLORS[1],
        ['name the parts of my body and what each does', 'know the five senses and their organs',
         'tell the four tastes', 'keep my body clean and healthy', 'respect people with special needs'])
    c.h('Parts of our body')
    c.p('Head, face, neck, arms, hands, fingers, legs, feet and toes. Each part does different work.')
    c.raw(table(['Part','What we do with it'],
                [['✋ Hands & fingers','eat, hold, write, pick up things, point'],['💪 Arms & shoulders','push, pull and pick up things'],
                 ['🙆 Neck','moves and holds the head'],['🦵 Legs & feet','walk, run, jump'],
                 ['🤸 Hands + legs together','crawl, skip, march, swim, stretch']]))
    c.h('The five senses')
    c.raw(table(['Sense organ','Sense','It helps us to…'],
                [['👀 Eyes','sight','see the beautiful world'],['👂 Ears','hearing','hear sounds'],
                 ['👃 Nose','smell','smell and breathe'],['👅 Tongue','taste','taste and speak'],
                 ['🖐️ Skin','touch','feel hot or cold, smooth or rough']]))
    c.remember('Tongue has <b>taste buds</b> that tell four tastes: <b>sweet, salty, sour, bitter</b>.')
    c.h('Taking care of my body')
    c.p('Brush teeth in the morning and before bed. Wash hands with soap and water before and after meals, after sneezing and after the toilet. '
        'Rinse the mouth after meals. Bathe daily with soap, dry with a clean towel. Wash and comb hair. Trim nails. Exercise daily.')
    c.raw(table(['Indoor games (inside a building)','Outdoor games (open space)'],
                [['carrom, ludo, chess, puzzles','football, cycling, running, swimming']]))
    c.remember('Sleep <b>8 hours</b> a day. Eat healthy food, drink plenty of water, cover your mouth when you sneeze, wear a mask when you have a cold, and avoid touching your face.')
    c.h('People with special needs')
    c.p('Not everyone uses their body in the same way. <b>Disha</b> cannot walk, but she moves in a wheelchair and does her work. '
        '<b>Tom</b> cannot see, but his senses of touch and smell are very strong. We should help and respect everyone.')
    c.fun('<b>⭐ Wisdom:</b> <b>Braille</b> lets blind people read by touching raised dots. It was invented by <b>Louis Braille</b>. '
          'The Indian ₹10 coin has raised marks to help identify it by touch.')
    wb(c, [('taste buds','parts of the tongue that tell tastes'),('bitter','a sharp taste'),('rinse','wash with clean water'),('trim','cut neatly'),('chores','daily jobs')])
    c.ex('Choose the correct option', 'Pick one.', [
        ('Our ears help us to… (see / hear / talk)','hear'),('We smell food with our… (hands / nose / ears)','nose'),
        ('While bathing we use… (soap and water / toothbrush)','soap and water'),
        ('Which is done with hands? (holding a ball / running)','holding a ball')], cols=1)
    c.ex('True or false', 'Write T or F.', [
        ('Breathing exercises keep us healthy.','T'),('We should not drink enough water.','F'),
        ('Taste buds help us taste only sweets.','F'),('We clean our teeth with a toothbrush.','T')], cols=1)
    c.ex('Name the sense organ', 'Write the organ.', [
        ('I help you see.','eyes'),('I help you hear.','ears'),('I help you smell.','nose'),('I help you taste.','tongue'),('I help you feel hot and cold.','skin')], cols=1)
    c.ex('Taste', 'sweet / sour / salty / bitter', [
        ('Sugar','sweet'),('Lemon','sour'),('Chips','salty'),('Bitter gourd (karela)','bitter')], cols=2)
    c.ex('Indoor (I) or outdoor (O)?', 'Write I or O.', [
        ('Football','O'),('Chess','I'),('Cycling','O'),('Carrom','I'),('Swimming','O'),('Ludo','I')], cols=3)
    return c

def ch3():
    c = Chapter(3, 'I Love My Family', '👨‍👩‍👧‍👦', COLORS[2],
        ['say why family is important', 'know types of families', 'name family members and surname',
         'tell festivals and places of worship', 'help at home'])
    c.h('Family')
    c.p('A family is a group of people who live together, love and help each other. Home is our <b>first place of learning</b>. '
        'Family members teach us to grow up as good people.')
    c.raw('<div class="row em2">👴 👵 👨 👩 👦 👧 👶</div>'
          '<div class="row">grandfather · grandmother · father · mother · brother · sister · baby</div>')
    c.h('Types of families')
    c.raw(table(['Type','Who lives together'],
                [['Small family','father, mother and children'],['Single-parent family','one parent (mother or father) with child/children'],
                 ['Big (joint) family','grandparents, uncles, aunts, cousins, all together']]))
    c.remember('Big or small, <b>each family is special</b>. A pet dog can be part of the family too!')
    c.h('Surname')
    c.p('Most family members share a last name after the first name – called the <b>surname</b>. '
        'In <b>Zoya Sharma</b>, Zoya is the first name and Sharma is the surname.')
    c.h('Fun together')
    c.p('Families eat together, cook together, play games, go on picnics, visit relatives, pray, celebrate birthdays and share happiness and sorrow.')
    c.h('Celebrations')
    c.p('We celebrate birthdays, weddings, housewarming parties and <b>festivals</b>. Festivals help us understand our culture and bring people closer. '
        'Bharat is a land of festivals: Holi, Dussehra, Diwali, Eid, Christmas, Gurpurab; harvest festivals: Pongal, Onam, Baisakhi.')
    c.raw(table(['🛕 Temple','🕌 Mosque','🛐 Gurudwara','⛪ Church'],[['Hindus pray','Muslims pray','Sikhs pray','Christians pray']]))
    c.p('All places of worship are clean, peaceful places where people pray. They are alike in that way.')
    c.h('Me as a helping hand')
    c.p('I can pack my school bag, clean my room, help wash the car, get ready for school myself, wash vegetables and help in gardening.')
    wb(c, [('surname','last name'),('relative','a person connected to the family'),('occasion','event'),('culture','way of life'),('grocery','household and food items'),('worship','to pray')])
    c.ex('Unscramble', 'Write the family member.', [
        ('athfer','father'),('other + m','mother'),('sitser','sister'),('thbrore','brother'),('garnd mtoehr','grand mother'),('rangd athfer','grand father')], cols=2)
    c.ex('Choose the correct option', 'Pick one.', [
        ('A family with one parent is a… (big / small / single-parent family)','single-parent family'),
        ('___ is a place of worship. (Mosque / Onam / Holi)','Mosque'),
        ('We live at home with our… (family / strangers)','family'),
        ('Members of a family… (share work / do not talk)','share work')], cols=1)
    c.ex('Tick the right word', '', [
        ('All families are same / different.','different'),('Gurudwara is a festival / place of worship.','place of worship'),
        ('Family members share / do not share happiness.','share')], cols=1)
    c.ex('Surname', 'Write the first name and surname of any two classmates and underline the surname.', [
        ('Classmate 1: {_} {_}','own answer'),('Classmate 2: {_} {_}','own answer')], cols=1)
    c.ex('Think and answer', 'Answer in a sentence.', [
        ('Write two things you do to help your family.','e.g. clean my room, water plants'),
        ('Write two ways you have fun with your family.','e.g. picnic, play games'),
        ('Why is a single-parent family not the same as a big family?','one parent lives with the child; a big family has many members'),
        ('What is a small family?','parents and children living together')], cols=1)
    return c

def ch4():
    c = Chapter(4, 'Home Sweet Home', '🏠', COLORS[3],
        ['say why we need a house', 'know animal homes', 'tell pucca and kutcha houses and their parts',
         'know what makes a healthy house', 'follow safety rules at home'])
    c.h('Why do we need a house?')
    c.p('A house is a place where a family lives together. It has rooms: bedroom, living room, kitchen, washroom. A house keeps us safe from…')
    c.raw(table(['heat and cold','rain and storm','thieves','wild animals','germs and diseases'],[['☀️❄️','🌧️⛈️','🚪','🐅','🦠']]))
    c.h('Animals need homes too')
    c.raw(table(['Animal','Home'],[['🐕 Dog','kennel'],['🐄 Cow','shed'],['🐦 Bird','nest'],['🐟 Fish','pond / water'],['🐝 Bee','beehive'],['🐒 Monkey','tree']]))
    c.h('Types of houses')
    c.raw(table(['','Pucca house','Kutcha house'],
                [['Made of','cement, bricks, iron, steel, concrete, wood','wood, straw, bamboo, mud, dry leaves'],
                 ['Strong?','strong and long-lasting','not very strong'],['Examples','multi-storey building, bungalow','mud hut']]))
    c.p('Many people build our houses: <b>mason</b>, <b>carpenter</b>, <b>plumber</b>, <b>electrician</b>, <b>painter</b>. We should respect them.')
    c.h('Parts of a house')
    c.raw(table(['Part','Job'],
                [['Doors','we enter the house through the main door'],['Windows','bring in sunlight and fresh air'],
                 ['Roof','covers the top; <b>flat</b> in hot places, <b>sloping</b> in rainy/snowy places so water drains off'],
                 ['Floor','bottom surface of a room'],['Walls','enclose rooms; support pipes and wires'],['Grills','steel or iron guards on windows']]))
    c.h('A healthy house')
    c.p('Free from flies, mosquitoes and rats · many doors and windows for sunlight and air · proper drainage · two dustbins (dry and wet waste) · things kept in place.')
    c.h('Safety in the house')
    c.remember('Ask an elder before using scissors, knives or blades. Stay away from the gas stove, fire and matchsticks. '
               'Do not touch electric things with wet hands. Take medicine only from parents. Do not jump on beds. Be careful on the balcony. '
               'If someone makes you uneasy, walk away and tell a trusted grown-up.')
    wb(c, [('kennel',"a dog's house"),('germs','tiny living things that make us sick'),('drain off','flow away'),('enclose','surround'),('concrete','stone and cement mix')])
    c.ex('Fill in the blanks', 'Use: flat, door, kutcha, clean.', [
        ('The two types of houses are {_} and pucca.','kutcha'),('We enter the house through the main {_}.','door'),
        ('Hot places have houses with {_} roofs.','flat'),('A {_} house keeps us disease-free.','clean')], cols=1)
    c.ex('Choose the correct option', '', [
        ('Not used to make a kutcha house: mud / steel / straw','steel'),('Not found in a house: wall / market / floor','market'),
        ('A good house has: dustbin / covered drains / both','both')], cols=1)
    c.ex('Unsafe or safe?', 'Write U or S.', [
        ('Playing with matchsticks','U'),('Asking an elder to use scissors','S'),('Touching a switch with wet hands','U'),
        ('Taking medicine from parents','S')], cols=2)
    c.ex('Answer the questions', '', [
        ('Name three things used to build a kutcha house.','mud, straw, bamboo'),
        ('Why do some houses have sloping roofs?','so rain water or snow can drain off'),
        ('Give two features of a healthy house.','clean, free of pests, windows for air and light'),
        ('One difference between kutcha and pucca house.','pucca is strong (cement, bricks); kutcha is weak (mud, straw)')], cols=1)
    c.fun('<b>💭 Think:</b> If there were no water and electricity for a day, what difficulties would you face? (no fan, light, cooking, bathing…)')
    return c

def ch5():
    c = Chapter(5, 'My School', '🏫', COLORS[4],
        ['name places in school and what happens there', 'know people who help at school',
         'make good choices', 'follow school safety rules'])
    c.h('Why we go to school')
    c.p('School is a place where we study, learn skills and values, make friends and make good choices. We wear a <b>uniform</b>. '
        '<i>School is a place to learn, be good to all and have fun. Teachers are good, friends are fine, I go to school always on time.</i>')
    c.h('Places in my school')
    c.raw(table(['Place','What happens there'],
                [['🏛️ Assembly hall','we sing the morning prayer'],['👩‍💼 Principal\'s room','the principal sits here'],
                 ['📚 Library','we read books; the librarian helps'],['🧑‍🏫 Staff room','teachers rest and correct notebooks'],
                 ['🩺 Medical room','nurse helps when we feel unwell'],['💻 Computer room','we learn to use the computer'],
                 ['🎵 Music & dance room','we learn instruments and dance'],['🛝 Playground','we play on swings and slides'],
                 ['🧾 Office','fees are paid; student records kept'],['🎭 Auditorium','plays, songs and shows']]))
    c.fun('<b>📜 Wisdom:</b> Long ago there were no schools. In Bharat children learnt in <b>Gurukuls</b> – in forests or on mountains, from their Gurus.')
    c.h('People who help us at school')
    c.raw(table(['Helper','Job'],
                [['🛡️ Security guard','looks after the safety of the school'],['🚌 Bus driver','brings us to school and takes us home'],
                 ['🌳 Gardener','takes care of the school garden'],['🧹 School helper','keeps school clean, helps teachers and us'],
                 ['👩‍🏫 Teacher','teaches different subjects']]))
    c.h('Good choices at school')
    c.p('Wear clean ironed uniform · reach on time · listen to teachers · be kind to classmates · use the dustbin · respect helpers · keep the school clean.')
    c.h('Safety rules')
    c.remember('Keep bags and bottles in place · respect desks and chairs · wait in a line patiently · walk carefully on stairs · '
               'stand in a queue for the bus · get in/out only after the vehicle has stopped · stay seated in a moving vehicle · beware of strangers.')
    wb(c, [('gather','come together'),('auditorium','hall for shows and functions'),('littering','making a place untidy'),('classmate','a member of the same class'),('stranger','a person we do not know')])
    c.ex('Fill in the blanks', 'Use: clean, medical, music, uniform.', [
        ('We should keep our school {_}.','clean'),('We learn music in the {_} room.','music'),
        ('We wear {_} to school every day.','uniform'),('We visit the {_} room when we feel unwell.','medical')], cols=1)
    c.ex('Who am I?', 'Name the school helper.', [
        ('I keep your classroom clean.','school helper'),('I take care of the school garden.','gardener'),
        ('I teach you different subjects.','teacher'),('I drive the school bus.','bus driver')], cols=1)
    c.ex('Where do we go?', 'Name the place.', [
        ('To read a story book','library'),('To play on a swing','playground'),('To pay fees','office'),('To sing the morning prayer','assembly hall')], cols=2)
    c.ex('Right or wrong?', 'Write ✓ or ✗.', [
        ('Run on the stairs.','✗'),('Wait in a queue for the bus.','✓'),('Throw waste in the dustbin.','✓'),('Talk to strangers outside school.','✗')], cols=2)
    c.fun('<b>🖊️ Think:</b> Is there any other place in your school that is not listed above? Write its name.')
    return c

def ch6():
    c = Chapter(6, 'Plants Around Us', '🌳', COLORS[5],
        ['know that plants are living things', 'name the parts of a plant', 'tell trees, shrubs, herbs, climbers, creepers',
         'know water and desert plants', 'tell how plants grow and why they matter'])
    c.h('Plants are living things')
    c.p('Plants need <b>air, water and sunlight</b> to live. They grow. They cannot move from place to place, but a sunflower turns to face the Sun. '
        'The <b>mimosa</b> ("shy plant") folds its leaves when touched.')
    c.h('Parts of a plant')
    c.raw(table(['Part','Job'],[['🌱 Root','holds the plant in soil, drinks water'],['🌿 Stem','carries water, holds the plant up'],
                                 ['🍃 Leaf','makes food for the plant'],['🌸 Flower','becomes a fruit'],['🍎 Fruit & seed','seeds grow into new plants']]))
    c.h('Types of plants')
    c.raw(table(['Type','Stem','Examples'],
                [['🌳 Trees','thick, woody (trunk)','banyan, mango, coconut'],['🌹 Shrubs','thin and hard; many branches near the ground','rose, cotton, shoe flower, henna'],
                 ['🌿 Herbs','soft stem','mint, grass, spinach'],['🫛 Climbers','weak; need support','peas, beans, money plant'],
                 ['🎃 Creepers','very weak; grow on the ground','bottle gourd, watermelon, pumpkin'],
                 ['🪷 Water plants','grow in water','lotus, water lily'],['🌵 Desert plants','many thorns; grow in sand','cactus']]))
    c.h('How plants grow')
    c.p('Most fruits have seeds inside (apple, papaya, mango). A seed gets air, water and sunlight and sprouts: <b>seed → sprout → seedling → plant</b>.')
    c.h('Plants – our green friends')
    c.p('Plants give us fresh air, shade, shelter, homes for birds and animals, food, and wood, paper, rubber, oil and medicines. Cotton for clothes comes from a plant.')
    c.h('Taking care of plants')
    c.remember('Water them regularly · keep them in sunlight · do not pluck leaves or hurt them · do not cut trees for our benefit.')
    c.fun('<b>🌲 Chipko Movement:</b> Women of a village in Uttar Pradesh hugged trees to stop them being cut. Many trees were saved.')
    wb(c, [('shy','not comfortable meeting people'),('benefit','use / gain'),('axe','to chop'),('trunk','thick woody stem of a tree')])
    c.ex('Yes or no?', 'Write Y or N.', [
        ('Grass is a tree.','N'),('Lotus is a water plant.','Y'),('Herbs are smaller than shrubs.','Y'),('Plants give us medicines.','Y')], cols=2)
    c.ex('Fill in the blanks', 'Use: soft, climber, cotton, cactus.', [
        ('A {_} grows in the desert.','cactus'),('Mint has a {_} stem.','soft'),('A money plant is a {_}.','climber'),
        ('Plants give us {_}, used to make clothes.','cotton')], cols=1)
    c.ex('Sort the plants', 'Write tree, shrub, herb, climber or creeper.', [
        ('Mango','tree'),('Rose','shrub'),('Spinach','herb'),('Pea','climber'),('Pumpkin','creeper'),('Banyan','tree')], cols=3)
    c.ex('Answer the questions', '', [
        ('What are trees?','big strong plants with thick woody stems'),
        ('What happens when a seed gets air, water and sunlight?','it sprouts and grows into a plant'),
        ('Why are plants called living things?','they grow and need air, water and sunlight'),
        ('Name two ways to take care of a plant.','water it, keep it in sunlight')], cols=1)
    c.ex('Order the steps of growing a plant', 'Write 1–4.', [
        ('Seedling with leaves','3'),('Seed is sown in soil','1'),('Plant with flowers','4'),('Sprouting','2')], cols=2)
    c.fun('<b>🤔 Go beyond:</b> Can you sit in the shade of a herb or a shrub? No – they are too small. A tree gives big shade.')
    return c

def ch7():
    c = Chapter(7, 'Animals Around Us', '🐾', COLORS[6],
        ['tell where animals live', 'know what animals eat', 'know pets and how to care for them',
         'sort animals: birds, insects, reptiles', 'be kind to animals'])
    c.h('Animals are living things')
    c.p('Animals need air, food, water and shelter. Different animals live in different places.')
    c.raw(table(['Land','Water','Land and water','Trees'],
                [['dog, deer, camel','fish, octopus','crocodile, turtle, frog','monkey, birds']]))
    c.fun('<b>⭐ Wisdom:</b> Polar bears live in very cold places of snow and ice. They swim in icy water and hunt fish.')
    c.h('Animal sounds')
    c.raw(table(['Dog','Cat','Lion','Goat','Cow','Bird'],[['barks','meows','roars','bleats','moos','chirps']]))
    c.h('Pets and friends')
    c.p('Animals that live in our house are <b>pets</b> – cows and dogs are common. Take care of pets by: giving fresh food and clean water, '
        'taking them for walks, keeping them clean, not teasing them, taking them to the <b>vet</b> when sick, and giving love.')
    c.p('Some animals work for us: horses and camels carry people and loads; police dogs help find thieves. We must be kind to them.')
    c.h('What do animals eat?')
    c.raw(table(['Plant-eaters','Meat-eaters','Both'],
                [['cow, sheep, goat, horse, deer','lion, leopard, polar bear, hyena, cheetah','bear, squirrel, rat, crow']]))
    c.h('Types of animals')
    c.raw(table(['Group','Facts','Examples'],
                [['🐦 Birds','wings, feathers, two legs, beak, no teeth; most fly','sparrow, crow, owl; (cannot fly: ostrich, penguin)'],
                 ['🐜 Insects','very small, six legs; some have wings','mosquito, beetle, ant, housefly'],
                 ['🐍 Reptiles','scales on the body','snake, lizard, crocodile, turtle']]))
    c.fun('Spiders and ticks have <b>eight</b> legs – they are not insects. All birds and some insects have wings, but only birds have beaks.')
    wb(c, [('vet','doctor for animals'),('affection','love and care'),('scales','flat plates on the skin of fish and snakes'),('thirsty','needing water'),('ease','comfort')])
    c.ex('Yes or no?', 'Write Y or N.', [
        ('Hyena and cheetah eat other animals.','Y'),('Reptiles have feathers.','N'),
        ('Crocodiles, turtles and frogs live on land and in water.','Y'),('We should take care of our pets.','Y')], cols=1)
    c.ex('Choose the correct answer', '', [
        ('Eat only leaves and grass: deer and cow / crow and bear / lion and cheetah','deer and cow'),
        ('Not an insect: mosquito / housefly / sparrow','sparrow'),
        ('Snakes, crocodiles and lizards are: birds / insects / reptiles','reptiles')], cols=1)
    c.ex('Where do they live?', 'Write land, water, trees or land and water.', [
        ('Frog','land and water'),('Fish','water'),('Camel','land'),('Monkey','trees'),('Octopus','water'),('Crocodile','land and water')], cols=3)
    c.ex('Name them', '', [
        ('Three animals that live on both land and water','frog, turtle, crocodile'),
        ('Three animals with scales','snake, lizard, fish'),('Four animals that can fly','sparrow, crow, owl, butterfly'),
        ('Why can\'t you keep a whale as a pet?','it is huge and lives in the sea')], cols=1)
    c.fun('<b>🎭 Fun with friends:</b> Make an animal mask from paper. Make a collage of land, water and land-and-water animals.')
    return c

def ch8():
    c = Chapter(8, 'The Food We Eat', '🍎', COLORS[7],
        ['say why we need food', 'know sources of food', 'tell vegetarian, non-vegetarian and vegan food',
         'know what to drink', 'follow healthy food habits'])
    c.h('Why do we need food?')
    c.p('Food helps us <b>live and grow</b> and gives us <b>energy</b> to work and play. We eat three meals: <b>breakfast</b> (morning), <b>lunch</b> (afternoon), '
        '<b>dinner</b> (night), and healthy <b>snacks</b> in between. A baby drinks milk, a growing child eats many kinds of food.')
    c.h('Sources of food')
    c.raw(table(['From plants 🌱','From animals 🐄'],
                [['fruits, vegetables, cereals (rice, wheat), pulses, nuts','milk, curd, butter, ghee, eggs, honey, fish, meat']]))
    c.raw(table(['Food choice','Meaning'],
                [['🥗 Vegetarian','food from plants, plus milk and milk products'],['🍗 Non-vegetarian','includes chicken, meat, egg, fish'],
                 ['🌱 Vegan','only food from plants']]))
    c.remember('We should respect everyone\'s food choices.')
    c.h('What do we drink?')
    c.p('Water first! Drink <b>6–8 glasses</b> of clean water daily, stored in a clean, covered vessel. We also drink milk, fruit juice, coconut water and soup.')
    c.h('Healthy food habits')
    c.p('Eat three meals at fixed times · never miss a meal · eat local and seasonal food · eat freshly cooked food · take small bites and chew well · '
        'wash hands before eating · wash fruits and vegetables · do not waste food · avoid too many chips, sweets and fizzy drinks.')
    c.fun('<b>🔬 Try it:</b> Put a banana in water. Does it float or sink? Find two more fruits that float.')
    wb(c, [('energy','power to work and play'),('vegetarian','plant food, milk and its products'),('vegan','only plant food'),('seasonal','available in a particular season')])
    c.ex('Plant or animal?', 'Write P for plants and A for animals.', [
        ('Milk','A'),('Rice','P'),('Egg','A'),('Banana','P'),('Honey','A'),('Spinach','P')], cols=3)
    c.ex('Meals', 'Fill in the blanks.', [
        ('We eat breakfast in the {_}.','morning'),('We eat lunch in the {_}.','afternoon'),('We eat dinner at {_}.','night'),
        ('Between meals we eat {_}.','snacks')], cols=2)
    c.ex('Answer the questions', '', [
        ('Why do we need food?','to live, grow and get energy'),('How many glasses of water should we drink daily?','6 to 8'),
        ('What is a vegan food?','food only from plants'),('Name two healthy snacks.','fruits, nuts')], cols=1)
    c.ex('Good habit or bad habit?', 'Write G or B.', [
        ('Eat fresh food','G'),('Skip breakfast','B'),('Wash hands before meals','G'),('Waste food','B')], cols=2)
    return c
