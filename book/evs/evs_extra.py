# "More from the book" gap-fill for EVS chapters 1-15 (concepts found in the source dossiers that
# the first pass skipped). Called from build.py before rendering; appends to each chapter.
from evs_core import wb, table


def _more(c, title):
    c.raw(f'<h2>📌 More from the book — {title}</h2>')


def e1(c):
    _more(c, 'Feelings')
    c.p('We feel many things: <b>happy 😊, sad 😢, angry 😠, scared 😨, excited 🤩, tired 😴</b>. '
        'Scared means <b>afraid</b>. We can show what we feel with our face and words. '
        'When I am tired, I go to sleep. When I feel excited I dance with joy!')
    c.fun('<b>🧰 Mood box:</b> Fill a small carton with things that help you calm down and cheer up — crayons, a colouring book, '
          'a nice-smelling soap, pictures of favourite things. Open it when you feel angry or sad.')
    c.ex('What do I feel?', 'Write the feeling word: happy, sad, angry, scared, excited.', [
        ('My friend broke my toy. I feel {_}.', 'sad / angry'), ('Grandmother is visiting me. I feel {_}.', 'excited / happy'),
        ('I see a big dog barking at me. I feel {_}.', 'scared'), ('I won a prize! I feel {_}.', 'happy')], cols=1)
    c.ex('Calm down', 'Tick-and-tell: what can you do when you feel angry?', [
        ('Take a deep breath and count to ten.', 'good choice'), ('Shout and throw things.', 'not a good choice'),
        ('Look at your mood box.', 'good choice'), ('Talk to an elder about it.', 'good choice')], cols=1)


def e2(c):
    _more(c, 'Five senses, good habits and being kind')
    c.raw(table(['Sense organ', 'Sense', 'It helps us…'],
                [['👀 Eyes', 'seeing', 'see the colourful world, read, look at artwork'], ['👂 Ears', 'hearing', 'hear music, voices, calls'],
                 ['👃 Nose', 'smelling', 'smell and breathe'], ['👅 Tongue', 'tasting', 'taste and speak'],
                 ['🖐️ Skin', 'touching', 'feel hot or cold, smooth or rough']]))
    c.p('Together these are <b>The Five Senses</b>. Our body parts also help us: neck moves and holds the head, fingers point, hands and legs do many jobs.')
    c.p('<b>Good habits:</b> do yoga and simple breathing exercises daily · sleep <b>8 hours</b> · stay happy and smile · '
        'rinse mouth after every meal · avoid uncovered food · wear a mask in crowded places. Indoor games are played inside a building; outdoor games outside.')
    c.p('<b>Respecting all:</b> Some people cannot see, hear or walk — like Disha, who uses a wheelchair. '
        'People who cannot see read with <b>Braille</b> (raised dots). Always be kind, include everyone and help.')
    c.ex('Which sense?', 'Write the sense organ.', [
        ('To know if the tea is hot or cold: {_}', 'skin'), ('To hear a friend call your name: {_}', 'ears'),
        ('To taste a mango: {_}', 'tongue'), ('To smell a flower: {_}', 'nose')], cols=2)
    c.ex('Think', 'Answer.', [
        ('Aryan listens to loud music. Which sound will he not hear? {_}', 'his friend calling his name'),
        ('Ryan slept straight after dinner. Which habit did he miss? {_}', 'rinsing the mouth / brushing'),
        ('Kayan is in a wheelchair. Your friend stops playing so he can join too. Your friend is {_}.', 'kind')], cols=1)


def e3(c):
    _more(c, 'Family at home, relatives and kindness')
    c.p('A family loves and takes care of us. We have a <b>first name</b> and a <b>surname</b> (family name). '
        'In a happy family everyone shares work: someone shops for groceries, someone cleans, someone helps with homework. '
        'We celebrate festivals and occasions like a <b>housewarming</b> (a party for moving into a new house) together.')
    c.raw(table(['English', 'हिंदी'],
                [['mother', 'माँ'], ['father', 'पिता / पापा'], ['grandfather', 'दादा / नाना'], ['grandmother', 'दादी / नानी'],
                 ['brother', 'भाई'], ['sister', 'बहन'], ['uncle', 'चाचा / मामा'], ['aunt', 'चाची / मौसी']]))
    c.ex('Unscramble', 'Write the family word.', [
        ('garnd mtoehr → {_}', 'grand mother'), ('bhorter → {_}', 'brother'), ('sitser → {_}', 'sister'),
        ('farhet → {_}', 'father')], cols=2)
    c.ex('Who does the work?', 'Write who in your home does it. (own answer)', [
        ('Shops for groceries: {_}', 'own answer'), ('Cleans the house: {_}', 'own answer'),
        ('Helps me with homework: {_}', 'own answer'), ('Reads me a story: {_}', 'own answer')], cols=1)
    c.ex('Kind or unkind?', 'Write the right word.', [
        ('A boy cheers up his sick sister. He is {_}.', 'kind'), ('A girl helps an old lady cross the road. She is {_}.', 'kind / caring'),
        ('A boy helps father clean the house. He is {_}.', 'helpful')], cols=1)


def e4(c):
    _more(c, 'Animal homes, walls and house safety')
    c.p('Like us, animals also need a house. A house keeps them safe from <b>bad weather, hunters and other animals</b>. '
        'A kennel is a house for a dog. A <b>hunter</b> kills animals for food or sport.')
    c.p('<b>Walls</b> are made of bricks or stone. They enclose or divide a room and support water pipes and electric wiring. '
        'A <b>kutchia</b> house is made of mud, straw or bamboo; a <b>pucca</b> house is made of bricks, cement and concrete (strong).')
    c.p('<b>Keep safe at home:</b> ask an elder before using scissors, knives or blades · never touch electrical items with wet hands or bare feet '
        '(electric shock) · do not jump on beds or sofas · keep your house clean with proper drainage for dirty water.')
    c.p('<b>Be a good host:</b> when relatives visit, greet them with a smile and respect them.')
    c.ex('Why do animals need houses?', 'Tick the true reasons by writing T or F.', [
        ('To be safe from rain and heat.', 'T'), ('To be safe from hunters.', 'T'), ('To play video games.', 'F')], cols=1)
    c.ex('Safe or unsafe?', 'Write safe or unsafe.', [
        ('Touching a switch with wet hands', 'unsafe'), ('Asking an elder to cut fruit with a knife', 'safe'),
        ('Jumping on the sofa', 'unsafe'), ('Greeting guests with a smile', 'safe')], cols=2)
    c.ex('Check your Math', 'Riya paints 2 pictures on each of 3 walls. How many paintings?', [('2 + 2 + 2 = {_}', '6')], cols=1)


def e5(c):
    _more(c, 'Places in school, Gurukul and safety')
    c.raw(table(['Place', 'What happens there'],
                [['Assembly hall', 'we sing the morning prayer and start the day'], ['Library', 'we read books; the librarian helps us choose'],
                 ['Staff room', 'teachers rest and correct notebooks'], ['Music & dance room', 'we learn instruments and dance'],
                 ['Office', 'fees are paid; student records are kept'], ['Auditorium', 'a room for plays, dance and songs']]))
    c.p('<b>Long ago</b> there were no schools like ours. In Bharat we had <b>Gurukuls</b> in open places like forests, where students '
        'learnt reading, writing and life skills with their guru. Today our <b>bus driver</b> picks us up from home and drops us back.')
    c.p('<b>Be safe at school:</b> keep bottle and bag in the right place · do not litter · never take things from a <b>stranger</b> '
        '(unknown person) · tell a teacher if something feels wrong · do your work on your own (self-help).')
    c.ex('Where will you go?', 'Write the place.', [
        ('To read a story book: {_}', 'library'), ('To sing the morning prayer: {_}', 'assembly hall'),
        ('To pay fees: {_}', 'office'), ('To learn a dance: {_}', 'music and dance room')], cols=2)
    c.ex('Stay safe', 'What will you do?', [
        ('A stranger offers you chocolates outside school. {_}', 'say no and tell a teacher'),
        ('You forgot to do your homework. {_}', 'tell the teacher the truth'),
        ('You see litter on the floor. {_}', 'pick it up and put it in the dustbin')], cols=1)


def e6(c):
    _more(c, 'More kinds of plants and saving trees')
    c.p('<b>Creepers</b> have very weak stems and grow along the ground — bottle gourd, watermelon, pumpkin. '
        '<b>Water plants</b> grow in water — lotus and water lily. The <b>mimosa</b> is called the <b>shy plant</b> '
        'because it folds its leaves when we touch it.')
    c.p('Plants, like us, need <b>air and water</b> to live. Trees give fruits, wood, shade and clean air. '
        'Long ago, women of a village hugged trees so that they would not be cut — the <b>Chipko</b> movement ("chipko" = stick to).')
    c.ex('Name the plant', 'Write creeper, water plant or tree.', [
        ('Lotus: {_}', 'water plant'), ('Pumpkin: {_}', 'creeper'), ('Mango: {_}', 'tree'), ('Water lily: {_}', 'water plant')], cols=2)
    c.ex('Sequence', 'Put 1–4 to show how to grow a plant.', [
        ('Water the seedling every day', '3'), ('Dig a small pit', '1'), ('Put a seed and cover with soil', '2'),
        ('A new plant grows', '4')], cols=1)
    c.fun('<b>🌱 Do:</b> Plant a tree and add a new green friend to your friend list. Make homemade paper from old newspaper to save trees.')


def e7(c):
    _more(c, 'What animals eat, reptiles and pets')
    c.raw(table(['Eat only plants (herbivores)', 'Eat other animals (carnivores)', 'Eat both (omnivores)'],
                [['cow, goat, elephant, deer', 'lion, leopard, polar bear, hyena, cheetah', 'bear, squirrel, rat, crow']]))
    c.p('<b>Reptiles</b> have <b>scales</b> instead of hair or feathers: snake, lizard, crocodile, turtle. '
        'Fish and octopus live in water. Some birds <b>cannot fly</b>: ostrich, penguin, emu.')
    c.p('<b>Caring for a pet:</b> keep it in clean surroundings · give it food and water · bathe it regularly · show it love and affection. '
        'A <b>vet</b> treats sick or hurt animals.')
    c.ex('What do they eat?', 'Write plants, animals or both.', [
        ('Lion: {_}', 'animals'), ('Cow: {_}', 'plants'), ('Crow: {_}', 'both'), ('Bear: {_}', 'both')], cols=2)
    c.ex('Birds and reptiles', 'Name three of each.', [
        ('Three birds that cannot fly: {_}', 'ostrich, penguin, emu'), ('Three animals with scales: {_}', 'snake, lizard, crocodile'),
        ('Who treats a sick pet? {_}', 'a vet')], cols=1)


def e8(c):
    _more(c, 'Raw and cooked food, junk food and life skill')
    c.p('We eat some food <b>raw</b> (fruits, salad) and some <b>cooked</b> (rice, dal). '
        '<b>Cooking</b> makes food soft, easy to digest, tasty and good-smelling.')
    c.p('<b>Healthy habits:</b> chew with your <b>mouth closed</b> — it is polite and keeps food in; '
        '<b>rinse your mouth</b> after every meal to keep teeth clean; wash hands before and after eating; never waste food; '
        'avoid <b>junk food</b> (chips, fizzy drinks) because it is less healthy.')
    wb(c, [('local', 'from a particular place'), ('seasonal', 'available in a particular time of the year'),
           ('junk food', 'food that is less healthy')])
    c.ex('Fill in the blanks', 'Use: play, snacks, plants, clean.', [
        ('Food gives us energy to work and {_}.', 'play'), ('We also eat {_} between meals.', 'snacks'),
        ('We get vegetables from {_}.', 'plants'), ('Drinking water is stored in {_} vessels.', 'clean')], cols=1)
    c.ex('Choose', 'Pick the right answer.', [
        ('We must chew food with our: eyes closed / mouth closed / ears closed', 'mouth closed'),
        ('Aman eats rice, dal and paneer. His food is: vegetarian / non-vegetarian / vegan', 'vegetarian'),
        ('Which is not a drink? soup / salad / milk', 'salad'),
        ('The morning meal is: lunch / dinner / breakfast', 'breakfast')], cols=1)
    c.ex('Crossword clues', 'Write the word.', [
        ('The meal we eat at night {_}', 'dinner'), ('The meal we eat in the morning {_}', 'breakfast'),
        ('We should drink 6–8 glasses of this daily {_}', 'water'), ('One who eats only plant food {_}', 'vegan'),
        ('One who eats plant and milk products {_}', 'vegetarian')], cols=1)
    c.ex('Think', 'Answer.', [
        ('Why should we rinse our mouth after every meal? {_}', 'to keep teeth clean and healthy'),
        ('Why should we chew with our mouth closed? {_}', 'it is polite and food does not fall out'),
        ('Order the numbers from small to big: meals 3, glasses of water 8, my age 6 → {_}', '3, 6, 8')], cols=1)
    c.fun('<b>🍮 Fun with friends:</b> Custard is delicious. Ask a grown-up what is needed (milk, custard powder, sugar). '
          'Sort them: milk is from animals, sugar is from plants.')


def e9(c):
    _more(c, 'Clothes for weather, costumes and uniforms')
    c.p('In <b>summer</b> wear cotton clothes — they keep us cool and dry. Cotton comes from the cotton plant. '
        'In <b>winter</b> wear woollen clothes. In the <b>rainy season</b> wear raincoats and waterproof shoes, and carry an umbrella. '
        'Silk thread is made by the <b>silkworm</b>.')
    c.p('A special dress of a place is called a <b>costume</b>. People who do a particular job wear a <b>uniform</b> '
        '(doctor, police, pilot, soldier, school children).')
    c.fun('<b>🔬 Try it:</b> Put a drop of water on a piece of cotton, wool and plastic. Which soaks the water? '
          'Cotton soaks it; plastic does not — that is why raincoats are plastic-like.')
    c.ex('Right clothes', 'Write the clothes for the weather.', [
        ('Very hot day: {_}', 'cotton clothes'), ('Cold day: {_}', 'woollen clothes / sweater'),
        ('Heavy rain: {_}', 'raincoat, umbrella, waterproof shoes')], cols=1)
    c.ex('Unscramble', 'Write the clothes.', [
        ('We must wear LANEC clothes → {_}', 'clean'), ('AINR → {_}', 'rain'), ('IRSKT → {_}', 'skirt'), ('RTHSI → {_}', 'shirt')], cols=2)
    c.ex('Self-help', 'Sequence 1–4 to wear a T-shirt.', [
        ('Pull it down over your body', '4'), ('Put your head through the neck', '2'), ('Put your arms in the sleeves', '3'),
        ('Hold the T-shirt', '1')], cols=1)


def e10(c):
    _more(c, 'Air, water, pollution and saving')
    c.p('<b>Air</b> is all around us. We cannot see it but can <b>feel</b> it when it blows. It takes space — a balloon gets its shape because of the air in it. '
        'Air is used to fill footballs, balloons and tyres, wind lets boats sail and kites fly, and a <b>burning candle needs air</b>: '
        'cover it with a glass and it stops burning. Planes, helicopters, kites and balloons fly in the air.')
    c.p('Keep air clean: use a handkerchief while sneezing; do not burn waste; plant trees.')
    c.p('<b>Water</b> comes to our taps through pipes from the water tank of a water plant. '
        'Rain water collects as <b>surface water</b> in lakes, ponds, rivers, seas and oceans. Ocean and sea water is <b>salty</b>. '
        'We use water for drinking, bathing, cooking and washing. Do not throw wastes into water bodies. '
        'Sports like boating, rafting and scuba diving are done in water. Save rain water for later use.')
    c.ex('Air or water?', 'Write A or W.', [
        ('Kites fly with it {_}', 'A'), ('It comes through taps {_}', 'W'), ('A candle needs it to burn {_}', 'A'),
        ('Ocean water is salty {_}', 'W')], cols=2)
    c.ex('Water bodies', 'Order by quantity: 1 = holds the most water. Pond, ocean, river, glass.', [
        ('1st {_}', 'ocean'), ('2nd {_}', 'river'), ('3rd {_}', 'pond'), ('4th {_}', 'glass')], cols=2)
    c.ex('Save and keep clean', 'Write two ways each.', [
        ('Two ways to save water {_}', 'close the tap, use a bucket, reuse water for plants'),
        ('Why use a handkerchief while sneezing? {_}', 'so germs do not spread in the air')], cols=1)


def e11(c):
    _more(c, 'Good neighbours and neighbourhood places')
    c.p('Our <b>neighbours</b> live close to us. A good neighbour <b>helps</b>, shares, plays together, invites others and celebrates festivals together. '
        'Sam uncle did not talk much, but when a child fell he gave first aid — and everyone saw that he was kind. '
        '<b>First aid</b> is first medical help given before a doctor comes.')
    c.raw(table(['Place', 'What we do there'],
                [['Park 🌳', 'play, walk, relax'], ['Hospital 🏥', 'doctors and nurses treat us; ambulance carries sick people'],
                 ['Chemist 💊', 'buy medicines and bandages'], ['Market 🛒', 'buy food, fruit, vegetables, milk and clothes'],
                 ['Bus stop 🚏', 'board a bus'], ['Railway station 🚉', 'board trains to other cities'],
                 ['Place of worship 🛕', 'offer prayers']]))
    c.p('<b>Essential services</b> work even in a crisis: chemist, hospital, police, grocery, bank. '
        '<b>Our duties:</b> do not make too much noise, keep surroundings clean, do not block corridors or stairs, help neighbours.')
    c.ex('Where do we go?', 'Write the place.', [
        ('To buy medicines: {_}', 'chemist'), ('To board a train: {_}', 'railway station'), ('To pray: {_}', 'place of worship'),
        ('To buy vegetables: {_}', 'market')], cols=2)
    c.ex('Good neighbour?', 'Write yes or no.', [
        ('Help a neighbour who is sick {_}', 'yes'), ('Play loud music at night {_}', 'no'),
        ('Block the stairs with your things {_}', 'no'), ('Celebrate festivals together {_}', 'yes')], cols=2)


def e12(c):
    _more(c, 'More helpers')
    c.raw(table(['Helper', 'What they do'],
                [['House help 🧹', 'helps with cleaning and cooking'], ['Milk person 🥛 / newspaper person 📰', 'delivers milk and newspapers'],
                 ['Electrician 💡', 'fixes electrical problems'], ['Plumber 🔧', 'fixes taps and water pipes'],
                 ['Postal worker ✉️', 'delivers letters and parcels'], ['Police 👮', 'keeps us safe, catches thieves; works at police station'],
                 ['Traffic police 🚦', 'controls traffic on the road'], ['Doctor 🩺 / nurse', 'treat sick people at hospital or clinic'],
                 ['Greengrocer 🥕', 'sells fruit and vegetables'], ['Chemist 💊', 'sells medicines'],
                 ['Carpenter 🪚', 'makes and repairs wooden things'], ['Cobbler 👞', 'polishes and mends shoes'],
                 ['Farmer 🌾', 'grows food for us'], ['Astronaut 🚀', 'travels to space'], ['Scientist 🔬', 'finds new things and studies them']]))
    c.ex('Who helps us?', 'Write the helper.', [
        ('Mends our shoes: {_}', 'cobbler'), ('Fixes a leaking tap: {_}', 'plumber'), ('Cures us when we are sick: {_}', 'doctor'),
        ('Catches thieves: {_}', 'police'), ('Delivers a parcel: {_}', 'postal worker'), ('Helps with our lessons: {_}', 'teacher'),
        ('Stitches our clothes: {_}', 'tailor')], cols=2)
    c.ex('When I grow up', 'Tell a friend which job you would like and why. (own answer)', [('I would like to be a {_}', 'own answer')], cols=1)


def e13(c):
    _more(c, 'Symbols, anthem and culture')
    c.p('The deep <b>saffron</b> colour in our flag shows the <b>power and bravery</b> of our country. '
        'The <b>National Emblem</b> is the seal of our country; we see it on notes and coins. '
        'Our <b>National Anthem</b> is <b>Jana Gana Mana</b>; we stand straight and sing it on Republic Day and Independence Day.')
    c.p('Monuments like the Brihadishvara Temple (Thanjavur), Qutub Minar (Delhi) and Bara Imambara (Lucknow) remind us of our history. '
        'Each family has its own <b>culture</b> (way of life). We should <b>respect all cultures and food choices</b> — if a friend serves food on a banana leaf, '
        'we eat happily and say thank you. This is celebrating <b>diversity</b>.')
    c.ex('Past or present?', 'Write past or present.', [
        ('People connected by writing letters {_}', 'past'), ('People connect by video calling {_}', 'present'),
        ('Farming with machines {_}', 'present'), ('Travel in ships and bullock carts {_}', 'past')], cols=1)
    c.ex('Our symbols', 'Answer.', [
        ('Name a place where we see our National Emblem. {_}', 'coin / note'), ('Which song is our National Anthem? {_}', 'Jana Gana Mana'),
        ('Saffron shows {_}', 'power and bravery')], cols=1)


def e14(c):
    _more(c, 'Continents, animals, greetings and food')
    c.raw(table(['Continent', 'Animals you may find'],
                [['Asia', 'panda (black patches), tiger, elephant'], ['Africa', 'lion, giraffe, zebra'],
                 ['North America', 'bison, bald eagle'], ['South America', 'sloth, llama'],
                 ['Europe', 'reindeer, brown bear'], ['Australia', 'kangaroo (jumps high), koala (eats eucalyptus leaves)'],
                 ['Antarctica', 'penguin (cannot fly, good swimmer)']]))
    c.p('There are <b>7 continents</b>. Every country has its own flag, currency (the Australian dollar in Australia, rupee in Bharat) and favourite food.')
    c.raw(table(['Greeting', 'Where', 'Food example'],
                [['Namaste', 'Bharat', 'roti, dal'], ['Ni Hao', 'China', 'hotpot'], ['Bonjour', 'France / Canada', 'poutine (Canada)'],
                 ['Hallo', 'Germany', 'sauerbraten'], ['Kia Ora', 'New Zealand', 'seafood']]))
    c.p('<b>Making connections:</b> if a new friend from another country does not speak your language, be kind — use gestures, help her learn, include her in play. '
        'Never make fun. Connecting with all people teaches us their culture.')
    c.ex('Animal clues', 'Guess the animal.', [
        ('I live in Antarctica and swim well. {_}', 'penguin'), ('I live in Australia and jump very high. {_}', 'kangaroo'),
        ('I live in Asia, have black patches and love bamboo. {_}', 'panda'), ('I love eucalyptus leaves. {_}', 'koala')], cols=1)
    c.ex('Greet', 'Match greeting with country.', [
        ('Ni Hao {_}', 'China'), ('Kia Ora {_}', 'New Zealand'), ('Hallo {_}', 'Germany'), ('Bonjour {_}', 'France / Canada')], cols=2)


def e15(c):
    _more(c, 'Landforms, land pollution and magical words')
    c.raw(table(['Landform', 'What it is'],
                [['Plain', 'wide flat land'], ['Mountain', 'very high land'], ['Valley', 'low land between two hills or mountains; green and beautiful'],
                 ['Desert', 'land covered with sand; very hot, little or no rain'],
                 ['Forest', 'land where plants grow very close; wild animals live here']]))
    c.p('<b>Rainbow colours:</b> Violet, Indigo, Blue, Green, Yellow, Orange, Red (VIBGYOR). '
        'Land is getting polluted by wastes. Keep it clean: <b>dispose of waste properly</b>, do not litter, reduce, reuse and recycle.')
    c.p('<b>Magical words:</b> Please · Sorry · Thank You. People who use them get love and respect.')
    c.ex('Landforms', 'Write the landform.', [
        ('Hot sandy land with little rain: {_}', 'desert'), ('Low land between two mountains: {_}', 'valley'),
        ('Plants grow close, wild animals live: {_}', 'forest')], cols=1)
    c.ex('Magical words', 'Which word? Please / Sorry / Thank You.', [
        ('Someone helps you carry your bag: {_}', 'Thank you'), ('You bump into a friend: {_}', 'Sorry'),
        ('You want a glass of water: Can I have water, {_}?', 'please')], cols=1)
    c.fun('<b>🌈 Make:</b> Colour a paper plate like a rainbow.')


EXTRA = {1: e1, 2: e2, 3: e3, 4: e4, 5: e5, 6: e6, 7: e7, 8: e8, 9: e9, 10: e10, 11: e11, 12: e12, 13: e13, 14: e14, 15: e15}


def add(chs):
    for c in chs:
        if c.no in EXTRA:
            EXTRA[c.no](c)
