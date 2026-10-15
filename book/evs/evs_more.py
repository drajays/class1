# EVS Class 1 — chapters 9-15, revision, appendices
from evs_core import *

def ch9():
    c = Chapter(9, 'The Clothes We Wear', '👕', COLORS[8],
        ['say why we wear clothes', 'choose clothes for each season', 'know costumes of the world', 'take care of clothes'])
    c.h('Why do we wear clothes?')
    c.p('Clothes cover and protect our body from heat, cold, wind, rain, sun, dirt, dust and insect bites. Cloth is also used for bags, bedsheets, curtains, sofa covers and carpets.')
    c.h('Clothes for different seasons')
    c.raw(table(['Season','We wear','Why / where it comes from'],
                [['☀️ Summer','cotton clothes','keep us cool and dry; cotton comes from the cotton plant'],
                 ['❄️ Winter','woollen clothes','keep us warm; wool comes from sheep, goat and yak'],
                 ['🌧️ Rainy','raincoat, waterproof shoes, umbrella','keep us dry; plastic does not let water in']]))
    c.tryit('Place a cotton cloth, a woollen cloth and plastic on your hand and drop water. Which one keeps your hand dry? (plastic)')
    c.h('Clothes around the world')
    c.p('A special dress of a place is called a <b>costume</b>. A <b>kimono</b> is worn in Japan. A <b>saree</b> is worn in Bharat, Sri Lanka, Pakistan, Bangladesh and Nepal.')
    c.p('We also wear <b>uniforms</b> (soldier, police, doctor), <b>party wear</b> on festivals, weddings and birthdays, and comfortable <b>home wear</b> (T-shirt, shorts, kurta, pyjamas).')
    c.remember('Wear clean, ironed clothes. Dirty clothes can make us sick. Learn to dress yourself – <b>self-help is the best help</b>.')
    c.h('How to wear a T-shirt')
    c.p('1) Pick up the T-shirt by the bottom. 2) Look for the back. 3) Put your head through. 4) Right arm in right sleeve. 5) Left arm in left sleeve. 6) Pull the bottom over your belly.')
    wb(c, [('waterproof','keeps water out'),('silkworm','worm that makes silk thread'),('costume','a special style of dress'),('uniform','same dress worn by a group')])
    c.ex('Unscramble', 'Write the correct word.', [('LANEC → we wear this in cold… (clean)','clean'),('LCOO','cool'),('RAWM','warm'),('AINR','rain')], cols=2)
    c.ex('Match the season', 'Write the season.', [
        ('Woollen sweater','winter'),('Cotton shirt','summer'),('Raincoat','rainy'),('Umbrella','rainy')], cols=2)
    c.ex('Who wears the uniform?', 'Write the job.', [
        ('Khaki uniform, cap, whistle','police'),('Green/camouflage uniform','soldier'),('Black coat and white band','lawyer'),('White coat','doctor')], cols=2)
    c.ex('Answer the questions', '', [
        ('Why do we wear clothes?','to protect our body from heat, cold, rain, dust, insects'),
        ('Give two reasons to wear woollen clothes in winter.','they keep us warm; they protect from cold weather')], cols=1)
    c.fun('<b>👗 Fancy dress:</b> Dress as a person from a state of Bharat or as a helper (doctor, farmer, soldier) and speak two lines about their job.')
    return c

def ch10():
    c = Chapter(10, 'Air and Water', '💨', COLORS[9],
        ['feel and say what air is', 'know uses of air', 'keep air clean', 'know uses and sources of water', 'save water'])
    c.h('Air is everywhere')
    c.p('We cannot see air but we can <b>feel</b> it: wave a scarf, switch on a fan, watch a tree sway in a storm. Moving air is <b>wind</b>. '
        'A very soft wind is a <b>breeze</b>. A very strong wind is a <b>storm</b>.')
    c.fun('<b>🎈 Try:</b> blow up a balloon, then prick it with a needle. The air rushes out and the balloon shrinks – air was inside it!')
    c.h('Uses of air')
    c.p('Plants and animals breathe air · plants use air to make food · air fills footballs, balloons, tyres · air dries clothes · air helps things burn (cooking) · '
        'wind flies kites and parachutes, sails boats · air makes music in a flute or trumpet. '
        'A candle stops burning under a glass because it runs out of air.')
    c.h('Dirty air')
    c.p('Dust, smoke and germs make the air dirty; breathing it makes us sick. Smoke comes from burning waste, factories and crackers. '
        'Keep air clean: use public transport, grow more plants, use a handkerchief when you sneeze or cough.')
    c.h('Water')
    c.p('We use water for drinking, cooking, washing clothes and bathing. Fish, whales and dolphins live in water. Animals need water to drink and bathe. Plants need water to grow.')
    c.h('Sources of water')
    c.raw(table(['Source','Details'],
                [['🌧️ Rain','main source of water on Earth'],['⛲ Underground water','rain seeps into the ground; we dig wells'],
                 ['🏞️ Surface water','lakes, ponds, rivers, seas, oceans'],['🌊 Sea/ocean water','very salty; salt must be removed before drinking']]))
    c.p('Water gets polluted by throwing waste in water bodies, washing clothes and bathing animals in them.')
    c.h('Save water')
    c.remember('Fix leaking taps · turn off the tap while brushing · use a bucket and mug, not a hose · water plants with a watering can · '
               'collect rain water · use waste water from the purifier for chores.')
    wb(c, [('breeze','a very soft wind'),('storm','a very strong wind'),('potted plant','plant growing in a pot'),('dispose','to throw away')])
    c.ex('Fill in the blanks', '', [
        ('A very soft wind is called a {_}. (breeze/storm)','breeze'),('Air is used by plants to make their {_}. (food/house)','food'),
        ('Dust, smoke and germs make the air {_}. (dirty/clean)','dirty'),('Water is home to {_} like fish. (animals/cars)','animals')], cols=1)
    c.ex('Unscramble', 'Write the word.', [('WDIN','wind'),('TORMS','storm'),('MOKSE','smoke'),('OEACN','ocean'),('PATS','taps')], cols=3)
    c.ex('How can we save water?', 'Write two ways.', [('Way 1 {_}','e.g. turn off the tap'),('Way 2 {_}','e.g. fix leaking taps')], cols=1)
    c.ex('Answer the questions', '', [
        ('Why do animals need water?','to drink and bathe'),('How can we get underground water?','by digging wells'),
        ('What is the main source of water?','rain'),('How does a handkerchief help keep air clean?','it stops germs from spreading into the air when we sneeze')], cols=1)
    c.fun('<b>🌿 Experiment:</b> keep a potted plant in the sun without water for a few days (not in the rainy season). It droops – plants need water!')
    return c

def ch11():
    c = Chapter(11, 'Places in My Neighbourhood', '🏘️', COLORS[10],
        ['say who neighbours are', 'be a good neighbour', 'name places and their services',
         'know essential and non-essential services', 'be safe in the neighbourhood'])
    c.h('Neighbours')
    c.p('Houses close to ours and the people living there are our <b>neighbours</b>. The people and places around our house together are our <b>neighbourhood</b>.')
    c.remember('A good neighbour helps when needed, shares joys and problems, celebrates festivals together, greets with a smile and is respectful. '
               'Sam uncle looked grumpy but helped a hurt child – respect everyone!')
    c.h('Services in the neighbourhood')
    c.raw(table(['Place','What it gives'],
                [['💊 Chemist shop','medicines, bandages'],['🏥 Hospital','doctors and nurses treat us; ambulance'],
                 ['🛒 Market','food, fruits, vegetables, milk, cloth, salons'],['⛽ Fuel station','petrol and diesel'],
                 ['🚌 Bus stop','board a bus for city travel'],['🚓 Police station','keeps us safe from thieves'],
                 ['🚉 Railway station','trains to other cities'],['🏦 Bank / ATM','keep and take out money safely'],
                 ['🛕 Places of worship','temple, mosque, gurudwara, church – to pray'],['🏫 School / college','learn with teachers'],
                 ['🌳 Park','trees, benches, swings; play and relax'],['🚒 Fire station','firefighters put out fires']]))
    c.p('<b>Essential services</b> are needed even in a crisis: chemist, hospital, police, grocery, bank. The others are non-essential.')
    c.h('Our duties')
    c.p('Keep the neighbourhood clean · grow and care for plants · take care of benches and swings · do not block corridors and stairs · thank garbage collectors and house helps.')
    c.h('Be safe')
    c.remember('Talk to strangers only with your family. If a stranger offers a ride, candy or toy – step away and shout <b>"No!"</b>. '
               'If lost, find a person in uniform (police, guard). Never share your address or phone number with a stranger.')
    wb(c, [('first aid','first help before a doctor comes'),('essential','must have'),('approach','come near')])
    c.ex('Where do we go?', 'Name the place.', [
        ('To buy medicine','chemist shop'),('To keep money','bank'),('To catch a train','railway station'),('To get petrol','fuel station'),
        ('When we are sick','hospital'),('When there is a theft','police station')], cols=2)
    c.ex('True or false', '', [
        ('We go to a hospital to buy vegetables.','F'),('Firefighters work at a fire station.','T'),
        ('We should never share our address with a stranger.','T'),('Sick people go to the police station.','F')], cols=1)
    c.ex('Answer the questions', '', [
        ('Who are neighbours?','people who live near our house'),
        ('Write two things a good neighbour does.','helps others, shares joys, greets with a smile'),
        ('What does an ATM do?','gives us money from the bank'),('What will you do if a stranger offers you a toy?','step away and say No')], cols=1)
    c.fun('<b>🚶 Visit:</b> walk around with your family and write the names of five places in your neighbourhood.')
    return c

def ch12():
    c = Chapter(12, 'People Who Help Us', '🧑‍🔧', COLORS[11],
        ['name community helpers and what they do', 'know where they work', 'respect all work'])
    c.h('Our helpers')
    c.raw(table(['Helper','What they do','Where'],
                [['🏠 House help','cleans and cooks','our home'],['🥛 Milkman / 📰 newspaper person','delivers milk, newspapers','our home'],
                 ['⚡ Electrician','fixes electric problems','home'],['🔧 Plumber','fixes taps and pipes','home'],
                 ['📦 Courier / postal worker','delivers parcels, letters','post office'],['👮 Police','keeps city safe; catches thieves','police station'],
                 ['🩺 Doctor','treats sick people','hospital / clinic'],['👩‍⚕️ Nurse','cares for patients, helps doctors','hospital'],
                 ['🚦 Traffic police','controls traffic','road'],['💇 Hair dresser','cuts and styles hair','salon'],
                 ['🥦 Greengrocer','sells fruits and vegetables','shop'],['💊 Chemist','sells medicines','chemist shop'],
                 ['🪚 Carpenter','builds things from wood','workshop'],['👞 Cobbler','mends shoes','shop'],
                 ['🚒 Firefighter','saves people from fire','fire station'],['🌾 Farmer','grows our food','fields'],
                 ['🪖 Soldier','protects our country','border'],['👩‍🚀 Astronaut','travels to space','space'],
                 ['🔬 Scientist','finds new things','laboratory'],['👩‍🏫 Teacher','teaches','school'],['🧵 Tailor','stitches clothes','shop']]))
    c.p('Firefighters wear heavy fire-proof jackets, trousers, boots, helmets, goggles and gloves for protection.')
    c.remember('Work done to earn money is a <b>job</b>. We need money to buy food, clothes and things. <b>No work is big or small</b> – respect all workers.')
    c.ex('Who am I?', 'Name the helper.', [
        ('I grow food.','farmer'),('I treat sick people.','doctor'),('I fix leaking taps.','plumber'),('I fight enemies of the country.','soldier'),
        ('I mend shoes.','cobbler'),('I deliver your parcels.','courier')], cols=2)
    c.ex('Whom will you call?', 'Name the helper.', [
        ('Your mother loses her purse','police'),('You need a study table','carpenter'),('Your shoe is torn','cobbler'),('Light is not working','electrician')], cols=2)
    c.ex('Answer the questions', '', [
        ('When do we go to a doctor?','when we are sick or hurt'),('How does a firefighter help us?','saves people from fire'),
        ('How does a milkman help us?','brings milk to our house'),('What does a farmer do?','grows food in fields')], cols=1)
    c.ex('Emergency numbers', 'Write the number.', [
        ('Police','100'),('Ambulance','102 (or 108)'),('Fire','101')], cols=3)
    c.fun('<b>🎭 Enact:</b> dress up as a helper of your choice and tell the class how they help us. <br><b>🙏 Life skill:</b> accept mistakes – say <b>"sorry"</b> and promise not to repeat.')
    return c

def ch13():
    c = Chapter(13, 'My Country Bharat', '🇮🇳', COLORS[12],
        ['know about Bharat and its states', 'understand unity in diversity', 'know national symbols',
         'name some monuments and celebrations', 'see how life has changed'])
    c.h('Bharat')
    c.p('Our country <b>Bharat</b> is also called <b>Hindustan</b> and <b>India</b>. It is the 7th largest country in the world and has many states. The capital is <b>New Delhi</b>.')
    c.h('Unity in diversity')
    c.p('People in Bharat look different, speak different languages, wear different clothes, eat different food and pray in different places – '
        'greeting as "Sat Sri Akaal", "Vanakkam", "Nomoskar" – but we are all Indians. This is <b>Unity in Diversity</b>.')
    c.h('National symbols')
    c.raw(table(['Symbol','Ours','What it shows'],
                [['🚩 Flag','Tiranga (tricolour)','saffron – courage; white – truth and peace; green – wealth and life; blue Ashoka Chakra – progress'],
                 ['🦁 Emblem','Lion Capital of Ashoka','seal of our country; on notes and coins'],['🐅 Animal','Tiger','strength and power'],
                 ['🦚 Bird','Peacock','peace and grace'],['🪷 Flower','Lotus','purity'],['🎵 Anthem','Jana Gana Mana','sung on Republic Day, Independence Day']]))
    c.fun('<b>🌶️ Fun fact:</b> Bharat is the world\'s largest producer of spices.')
    c.h('Monuments')
    c.p('Monuments are buildings built to remind us of people or events of the past.')
    c.raw(table(['Monument','Place'],
                [['Taj Mahal','Agra, Uttar Pradesh'],['Qutub Minar / India Gate / Red Fort','Delhi'],['Bara Imambara','Lucknow, Uttar Pradesh'],
                 ['Charminar','Hyderabad'],['Gateway of India','Mumbai'],['Brihadeeswara Temple','Thanjavur, Tamil Nadu'],['Sanchi Stupa','Madhya Pradesh']]))
    c.h('Our celebrations')
    c.p('Diwali, Holi, Eid, Christmas, Gurpurab, Dussehra, Onam, Raksha Bandhan; national days: <b>Republic Day (26 Jan)</b>, <b>Independence Day (15 Aug)</b>, '
        '<b>Gandhi Jayanti (2 Oct)</b>, <b>Teachers\' Day (5 Sep)</b>, <b>Children\'s Day (14 Nov)</b>.')
    c.h('Changing face of Bharat')
    c.raw(table(['Long ago','Now'],
                [['travel on horses, bullock carts, ships','aeroplanes, cars, metro'],['letters','phone and video calls'],
                 ['farming by hand and with animals','farming with machines']]))
    wb(c, [('diversity','differences'),('patriotism','love for one\'s country'),('freedom','being free'),('unity','being together'),('seal','official mark used for stamping')])
    c.ex('Fill in the blanks', 'Use: Bharat, Lotus, Tiger, Delhi.', [
        ('{_} has many states.','Bharat'),('{_} is our national flower.','Lotus'),('Qutub Minar is in {_}.','Delhi'),('Our national animal {_} is a symbol of strength.','Tiger')], cols=1)
    c.ex('True or false', '', [
        ('Peacock is the symbol of peace and grace.','T'),('Our flag has two colours.','F (three)'),('We celebrate Pongal in Bharat.','T'),('Long ago, farming was done by machines.','F')], cols=1)
    c.ex('Choose the correct option', '', [
        ('Also known as Hindustan and India: Bharat / Bhutan / Delhi','Bharat'),('White colour in our flag shows: truth / growth / both','truth (and peace)'),
        ('Bara Imambara is in: Delhi / Mumbai / Lucknow','Lucknow')], cols=1)
    c.ex('Answer the questions', '', [
        ('Name four states of Bharat.','e.g. Uttar Pradesh, Kerala, Punjab, Gujarat'),
        ('Name four festivals of Bharat.','Diwali, Holi, Eid, Christmas'),('How did people travel in the past?','on horses, in ships')], cols=1)
    c.fun('<b>🪁 Make:</b> a tri-colour kite and write your wish for the country on it.')
    return c

def ch14():
    c = Chapter(14, 'The World Around Us', '🌍', COLORS[13],
        ['know that the world has seven continents', 'know flags, currencies and monuments', 'meet animals and children of the world', 'know world celebrations'])
    c.h('Our world')
    c.p('The world has <b>7 continents</b> – Asia, Africa, North America, South America, Antarctica, Europe, Australia – and many countries. Russia is the largest country. '
        'We travel by aeroplane or cruise ship, and talk through letters, TV, books, phones, laptops and tablets.')
    c.raw(table(['Country','Currency','Monument'],
                [['Bharat','Rupee','Taj Mahal'],['Nigeria','Naira','—'],['USA','US Dollar','Statue of Liberty'],['Peru','Sol','Machu Picchu'],
                 ['Russia','Ruble','Kremlin'],['Australia','Australian Dollar','Opera House'],['Egypt','Egyptian Pound','Great Pyramid']]))
    c.h('Animals around the world')
    c.raw(table(['Animal','Lives in','Fact'],
                [['🦒 Giraffe','Africa','tallest land animal'],['🐼 Giant panda','Asia','loves bamboo'],['🐻‍❄️ Polar bear','Arctic','black skin under fur; fast swimmer'],
                 ['🐧 Penguin','Antarctica','bird that cannot fly but swims well'],['🦘 Kangaroo','Australia','jumps very high'],
                 ['🐨 Koala','Australia','eats eucalyptus leaves'],['🦌 Reindeer','Europe','deer family'],
                 ['🐻 Grizzly bear','North America','needs large space'],['🦙 Llama','South America','alert, guards other animals']]))
    c.h('Children around the world')
    c.raw(table(['Greeting','Country','Favourite food'],
                [['Sawubona','Ethiopia (Africa)','fufu'],['Bonjour','Canada','poutine'],['Ni Hao','China','hotpot'],
                 ['Olá','Brazil','picanha'],['Hallo','Germany','sauerbraten'],['Kia Ora','New Zealand','seafood']]))
    c.h('Celebrations')
    c.p('Halloween – USA · Lantern Festival – China · La Tomatina – Spain · Fire Festival – Scotland · Fez Festival – Morocco · Carnival – Italy.')
    c.remember('Celebrations bring people together and help us learn about different cultures. Be friendly to children from other countries!')
    c.ex('Fill in the blanks', 'Use: Italy, Russia, Kangaroos, Arctic.', [
        ('{_} is the largest country.','Russia'),('Carnival is celebrated in {_}.','Italy'),('{_} are found in Australia.','Kangaroos'),('Polar bears live in the {_} region.','Arctic')], cols=1)
    c.ex('True or false', '', [
        ('Taj Mahal is in Brazil.','F (India)'),('The Opera House is in Australia.','T'),('We can go to Africa from Bharat in an aeroplane.','T'),
        ('We can write an e-mail to talk to relatives in another country.','T')], cols=1)
    c.ex('Who am I?', '', [
        ('I live in Antarctica. I swim well.','penguin'),('I am the tallest land animal.','giraffe'),('I live in South America and guard others.','llama'),
        ('I eat eucalyptus leaves.','koala'),('I love bamboo.','panda')], cols=2)
    c.ex('Answer the questions', '', [
        ('Name two festivals celebrated outside Bharat.','Halloween, Carnival'),('Why are monuments important?','they remind us of people and events of the past'),
        ('Currency of Russia?','Ruble'),('Currency of Nigeria?','Naira')], cols=1)
    c.fun('<b>🏳️ Make:</b> a flag of another country and note how it differs from ours.')
    return c

def ch15():
    c = Chapter(15, 'Our Universe', '🌌', COLORS[14],
        ['name things in the sky', 'know phases of the Moon and the rainbow', 'know the Sun and the planets',
         'know landforms of the Earth', 'keep the Earth pollution-free'])
    c.h('Things in the sky')
    c.p('The sky looks different by day and by night. We see the <b>Sun</b>, <b>Moon</b>, <b>stars</b> and <b>clouds</b>.')
    c.raw(table(['','Facts'],
                [['🌙 Moon','seen at night; its shape keeps changing. <b>Full moon</b> – like a ball. <b>New moon</b> – cannot be seen. Astronauts reach it in a spaceship launched by a rocket.'],
                 ['☁️ Clouds','look like cotton balls; float; dark clouds bring rain'],
                 ['🌈 Rainbow','seven colours after rain: <b>violet, indigo, blue, green, yellow, orange, red</b>'],
                 ['⭐ Stars','twinkle at night; very big but look small because they are far; too many to count'],
                 ['☀️ Sun','a star close to us; a big ball of fire; gives heat and light; all living things need it']]))
    c.p('The Sun and the <b>eight planets</b> make the <b>Solar System</b>.')
    c.raw(table(['1','2','3','4','5','6','7','8'],
                [['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune']]))
    c.p('Mercury is the nearest planet to the Sun, Neptune the farthest, and Saturn has rings. Remember: <i>My Very Educated Mother Just Served Us Noodles.</i>')
    c.h('Our Earth')
    c.p('Earth is the only known planet with air and water, so we can live here. Most of it is covered with water; the rest is land. The Earth <b>rotates</b> on its axis – that causes day and night.')
    c.raw(table(['Landform','What it is'],
                [['🌾 Plain','flat, smooth land; most crops grow here'],['⛰️ Hill','land higher than around it; apples, cherries, plums grow'],
                 ['🏔️ Mountain','very high hill; tops may have snow'],['🏞️ Valley','low land between hills or mountains'],
                 ['🏜️ Desert','sandy land, very hot, little rain'],['🌲 Forest','plants growing close; wild animals live here']]))
    c.h('Land pollution')
    c.p('Waste from houses, factories and agriculture dumped on land makes it dirty and makes us sick. '
        '<b>Stop it:</b> grow more plants, dispose of waste properly (dry and wet dustbins).')
    wb(c, [('spaceship','vehicle that travels to space'),('polluted','made dirty'),('planet','a large body moving around the Sun'),('rotate','to spin')])
    c.ex('Fill in the blanks', 'Use: Moon, heat, clouds, rocket.', [
        ('The Sun gives us {_} and light.','heat'),('The shape of the {_} keeps changing.','Moon'),
        ('A {_} takes a spaceship to the Moon.','rocket'),('It rains when there are dark {_}.','clouds')], cols=1)
    c.ex('Unscramble the planets', '', [
        ('MREYCUR','Mercury'),('ENUVS','Venus'),('THEAR','Earth'),('SMAR','Mars'),('JPIUETR','Jupiter'),('TARSUN','Saturn'),('UNARUS','Uranus'),('PTUNEEN','Neptune')], cols=4)
    c.ex('Choose the correct option', '', [
        ('When the Moon is like a ball it is a: full moon / new moon','full moon'),('A band of seven colours: cloud / rainbow','rainbow'),
        ('Plants grow very close together in: plain / valley / forest','forest')], cols=1)
    c.ex('Who am I?', '', [
        ('I am a big ball of fire. All living things need me.','Sun'),('We twinkle every night. You cannot count us.','stars'),
        ('You see me at night; my shape changes.','Moon'),('I am land covered with sand.','desert')], cols=2)
    c.ex('Answer the questions', '', [
        ('Why do stars look small?','they are very far away'),('What is a new moon?','when we cannot see the Moon'),
        ('What is a cloud?','a ball of water drops floating in the sky'),('What is common among the Sun, Moon and stars?','all are in the sky and give light'),
        ('Why keep land pollution-free?','so we and the plants and animals stay healthy')], cols=1)
    return c

def revision():
    c = Chapter(16, 'Revision Tests', '🏆', COLORS[0], ['check what I have learnt', 'find what I need to read again'])
    c.ex('Test 1 — Me, my body and my family', '10 marks.', [
        ('An ___ card has important facts about us.','identity'),('We hear with our ___.','ears'),('Four tastes: sweet, salty, sour, ___.','bitter'),
        ('We should sleep ___ hours a day.','8'),('A family with one parent is a ___ family.','single-parent'),
        ('Last name after the first name is the ___.','surname'),('A house made of cement and bricks is ___.','pucca'),
        ('Flat or sloping roof for heavy rain?','sloping'),('Who looks after safety of the school?','security guard'),('Where do we read books in school?','library')], cols=2)
    c.ex('Test 2 — Living world', '10 marks.', [
        ('Plants need air, water and ___.','sunlight'),('Mint is a ___. (tree/herb)','herb'),('A money plant is a ___.','climber'),
        ('Animals with scales are ___.','reptiles'),('Insects have ___ legs.','six'),('Cows eat grass; they are ___-eaters.','plant'),
        ('Food from only plants is ___.','vegan'),('We eat ___ meals a day.','three'),('Cotton clothes are for ___ season.','summer'),('Wool comes from ___.','sheep')], cols=2)
    c.ex('Test 3 — Around me', '10 marks.', [
        ('Moving air is called ___.','wind'),('Main source of water on earth is ___.','rain'),('We keep money safely in a ___.','bank'),
        ('A ___ treats sick people.','doctor'),('Bharat is also called ___ and India.','Hindustan'),('Our national bird is the ___.','peacock'),
        ('Largest country in the world is ___.','Russia'),('The star that gives us light is the ___.','Sun'),
        ('Planet with rings is ___.','Saturn'),('The Earth is the only planet with air and ___.','water')], cols=2)
    c.raw('<div class="cert"><div style="font-size:36pt">🌿🌟🌿</div><h2>Little Explorer Certificate</h2>'
          '<p style="font-size:16pt">This is to certify that <span class="blank" style="min-width:70mm"></span> has completed Class 1 EVS!</p></div>')
    return c

def glossary():
    rows = [('Identity card','card with our name and details'),('Unique','only one of its kind'),('Family','people who live together and care for each other'),
            ('Pucca / kutcha','strong cement house / weak mud-straw house'),('Neighbour','person who lives near us'),('Herb, shrub, tree','small, medium, big plants'),
            ('Reptile','animal with scales'),('Vegan','only plant food'),('Costume','special dress of a place'),('Wind','moving air'),
            ('Monument','building to remember the past'),('Planet','a big world moving around the Sun'),('Pollution','making air, water or land dirty')]
    return '<div class="chapter" style="--c:#2b8a3e"><h2>📚 Word Bank</h2>' + table(['Word', 'Meaning'], rows) + '</div>'

def appendix_resources():
    rows = [('Book','NCERT <b>Looking Around</b> (Class 3) / Class 1–2 EVS "Marigold" stories – gentle follow-up reading','ncert.nic.in → Textbook'),
            ('App / site','<b>DIKSHA</b> – QR-coded EVS lessons, videos, worksheets','diksha.gov.in'),
            ('Video','<b>National Geographic Kids</b> – animals, planets, countries for children','kids.nationalgeographic.com'),
            ('Video','<b>NASA Space Place</b> – Sun, Moon, planets explained simply','spaceplace.nasa.gov'),
            ('Site','<b>Wild Kratts / BBC Bitesize (Early years)</b> – nature and animals','pbskids.org / bbc.co.uk/bitesize'),
            ('At home','Grow a bean in cotton wool; keep a rain gauge (cut bottle); make a bird feeder; a family tree chart','simple materials'),
            ('Outdoors','Neighbourhood walk, nature walk, visit a post office / fire station / farm','with family')]
    return ('<div class="chapter" style="--c:#2b8a3e"><h2>🌟 Appendix — Best Resources &amp; Activities</h2>'
            + table(['Type','What & why','Where'], rows)
            + '<div class="box tip"><b>Tip:</b> EVS is learnt by <i>seeing and doing</i>. After each chapter, spend 10 minutes outdoors on one activity. '
              'Names and sites change; search by the title shown.</div>'
            '<h2 style="margin-top:6mm">🗓️ Four-week activity plan</h2><ol>'
            '<li><b>Week 1 – Me &amp; Family:</b> mood-o-meter, family tree, helping at home.</li>'
            '<li><b>Week 2 – Living things:</b> plant a seed, feed birds, animal sounds game.</li>'
            '<li><b>Week 3 – Food, clothes, air, water:</b> float/sink test, season dressing, balloon and candle experiments.</li>'
            '<li><b>Week 4 – My place &amp; world:</b> neighbourhood map, helpers role-play, flag making, moon diary.</li></ol></div>')
