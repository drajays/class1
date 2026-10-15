# English Class 1 — chapters 13-17, glossary, appendices
from lib import *


def passage(title, text):
    return f'<div class="box fun"><b>📖 {title}</b><p style="font-size:14.5pt;line-height:1.7">{text}</p></div>'


def ch13():
    c = Chapter(13, 'Reading Comprehension', '🧐', COLORS[12],
                ['read a short passage carefully', 'answer who, what, where, why questions', 'find naming and describing words in a passage'])
    c.h('How to read and answer')
    c.raw(table(['1 Read 👀','2 Think 💭','3 Find ✏️','4 Write 💬'],
                [['Read the passage two times.','What is it about?','Find the answer in the text.','Answer in a full sentence.']]))
    c.remember('Start the answer with words from the question. <i>Where does Rex take his dog?</i> → <b>Rex takes his dog to the park.</b>')
    c.raw(passage('Rex and Chestnut',
        'Rex\'s father gifted him a dog on his birthday. He named him Chestnut. Rex loves to play with his dog. '
        'Sometimes, he takes his dog to the park. Rex throws a ball and Chestnut catches it. They run, jump and chase each other. Chestnut is very loyal.'))
    c.ex('Rex and Chestnut', 'Answer in a sentence.', [
        ('What does Rex love to do?','Rex loves to play with his dog.'),
        ('How do Rex and Chestnut spend time together?','They run, jump and chase each other.'),
        ('Where does Rex take his dog?','Rex takes his dog to the park.'),
        ('Write two naming words from the passage.','Rex, dog (also father, ball, park, Chestnut)'),
        ('Who gifted Rex a dog?','Rex\'s father.')], cols=1)
    c.raw(passage('The Planetarium',
        'Anna and Kevin went to see the planetarium at the museum. A special guide took them on a tour. Kevin learnt about the sun, moons and stars. '
        'He was delighted at the end and thought, "I will come back someday." On the way back Anna said that Saturn is her favourite planet because it has many rings. '
        'Kevin said, "Earth is my favourite planet as it supports life." The teacher asked them to make a project on Saturn. Both decided to work together.'))
    c.ex('The Planetarium', 'Answer the questions.', [
        ('Where did Anna and Kevin go?','To the planetarium at the museum.'),
        ('Why was Saturn Anna\'s favourite planet?','Because it has many rings.'),
        ('Which planet supports life?','Earth.'),
        ('What project did the teacher give?','A project on the planet Saturn.')], cols=1)
    c.raw(passage('The Puppy',
        'A little boy saw a signboard, "Puppies for sale". He asked his father to buy one. The farmer whistled and four little balls of fur came running. '
        'The boy saw one more puppy running slowly to catch up. The farmer said, "Choose another one. That puppy limps." '
        'The boy rolled up his trouser leg and showed his wooden leg. "I too do not run well," he said, "and this puppy needs someone who understands him."'))
    c.ex('The Puppy', 'Think and answer.', [
        ('What did the boy see on the signboard?','Puppies for sale.'),
        ('Which puppy did the boy choose?','The puppy that limped.'),
        ('Why did he choose that puppy?','He understood it because he also had a wooden leg.'),
        ('Pick two words that describe the boy: naughty, foolish, kind, understanding, greedy.','kind, understanding')], cols=1)
    c.raw(passage('Jaguars',
        'Jaguars are large wild cats. They have yellow fur with black spots. Jaguars live in the rain forests of South America. '
        'They live alone and sleep on tree branches. Jaguars hunt at night because they can see better in the dark. They are meat eaters and have sharp teeth.'))
    c.ex('Jaguars', 'Answer the questions.', [
        ('What does a jaguar\'s fur look like?','Yellow with black spots.'),
        ('Where do jaguars live?','In the rain forests of South America.'),
        ('When do jaguars hunt?','At night.'),
        ('Write two naming words from the passage.','jaguars, fur (cats, forests, teeth)'),
        ('True or false: Jaguars eat only leaves.','False')], cols=1)
    return c


def ch14():
    c = Chapter(14, 'Story Time and Poems', '🧸', COLORS[13],
                ['enjoy short stories and rhymes', 'answer questions about characters and events',
                 'say rhymes with actions', 'retell a story in order'])
    c.p('<i>These are short retellings written for this book, inspired by the Grade 1 reading units.</i>')
    c.raw(passage('Jim\'s Pet Dog Nix',
        'Jim has a pet dog called Nix. Nix wags his tail when he is happy. He jumps with joy when he sees Jim. '
        'If Jim throws a ball, Nix runs after it. He sits on his red mat. Jim has put a blue collar on Nix so that everyone knows he belongs to Jim.'))
    c.ex('Nix the dog', 'Say and write.', [
        ('Jim\'s dog is called {_}.','Nix'),('Nix wags his {_} when he is happy.','tail'),
        ('Nix runs after a {_}.','ball'),('The colours in the story are {_} and {_}.','red, blue'),
        ('Jim put a {_} on Nix.','collar')], cols=1)
    c.raw(passage('The Three Little Rabbits',
        'Three little rabbits lived in a house with a green roof. The first was black, the second grey and the third white. '
        'One day there was a hole in the roof and rain dripped in. The rabbits could not sleep. '
        'The grey rabbit said, "Put a bucket under the hole." The black rabbit said, "Let us go to another house." The white rabbit said, "Let us fix the roof."'))
    c.ex('Three little rabbits', 'Answer.', [
        ('How many rabbits were there?','Three'),('What colours were they?','Black, grey and white.'),
        ('Why could the rabbits not sleep?','Rain dripped through a hole in the roof.'),
        ('Whose idea do you like best? Why?','answers vary (fixing the roof is a lasting solution)')], cols=1)
    c.raw(passage('My Fluffy Cat',
        'My cat Squeak is a fluffy ball of brown fur. When he was a kitten he used to squeak, so we named him Squeak. '
        'He bats paper and wool and jumps after a rubber ball. He sometimes brings us a rat, a bird or a frog as a gift. '
        'He holds them gently, so they are not hurt, and we let them go safely.'))
    c.ex('Squeak', 'Answer.', [
        ('What colour is Squeak?','Brown'),('Why is he called Squeak?','He used to squeak as a kitten.'),
        ('What does he bring home?','A rat, a bird or a frog.'),('Are the animals hurt?','No, he holds them gently.')], cols=1)
    c.raw(passage('Grandpa\'s Glasses',
        'Grandpa wanted to read the newspaper but could not find his glasses. He looked on the table, under the table, in his bedroom and on the shelf. '
        '"Have you seen my glasses?" he asked Grandma. Grandma looked at him and laughed. "They are on top of your head!" she said. Grandpa laughed too.'))
    c.ex('Grandpa', 'Answer.', [
        ('Why was Grandpa looking for his glasses?','To read the newspaper.'),
        ('Where were the glasses?','On top of his head.'),('Why did they laugh?','Because the glasses were on his head all the time.')], cols=1)
    c.raw(passage('Jack and the Beanstalk (short)',
        'Jack was a poor boy. He sold his cow for five magic beans. His angry mother threw the beans out of the window. '
        'In the morning a giant beanstalk had grown. Jack climbed up and saw a giant counting gold. He took a bag of gold and ran down. '
        'The giant chased him but Jack reached the ground safely. Jack and his mother were rich and happy.'))
    c.ex('Put in order', 'Write 1, 2, 3, 4 to show the right order.', [
        ('Jack ran down with the gold.','4'),('The beans grew into a tall tree.','2'),('Jack sold his cow for beans.','1'),
        ('Jack saw a giant on top of the tree.','3')], cols=1)
    c.h('Rhymes to say and act')
    c.raw('<div class="box try"><b>Incy Wincy Spider</b><br>Incy Wincy Spider climbed up the spout;<br>Down came the rain and washed the spider out.<br>'
          'Out came the sun and dried up all the rain;<br>Incy Wincy Spider climbed up the spout again.</div>'
          '<div class="box try"><b>Thirty Days Has September</b><br>Thirty days has September, April, June and November.<br>'
          'All the rest have thirty-one, except February alone, which has twenty-eight.</div>'
          '<div class="box try"><b>Days of the Week</b><br>Monday\'s child is fair of face, Tuesday\'s child is full of grace,<br>'
          'Wednesday\'s child is full of woe, Thursday\'s child has far to go.</div>')
    c.ex('Rhyme time', 'Find the rhyming words.', [
        ('spout – ?  (a) out  (b) day','out'),('rain – ?  (a) pain  (b) sun','pain'),
        ('September – ?  (a) November  (b) January','November'),('go – ?  (a) no  (b) cat','no')], cols=1)
    return c


def ch15():
    c = Chapter(15, 'Asking Questions, Facts and Opinions', '❓', COLORS[0],
                ['ask questions with who, what, where, when, why', 'tell a fact from an opinion', 'say things in order'])
    c.h('Question words (wh- words)')
    c.raw(table(['Word','Asks about','Example'],
                [['<b>Who</b>','a person','Who is your best friend?'],['<b>What</b>','a thing','What is your name?'],
                 ['<b>Where</b>','a place','Where do you live?'],['<b>When</b>','a time','When is your birthday?'],
                 ['<b>Why</b>','a reason','Why are you late?'],['<b>How</b>','the way / how many','How are you?']]))
    c.h('Facts and opinions')
    c.p('A <b>fact</b> is always true and can be checked. An <b>opinion</b> tells what someone feels or thinks — it can be different for different people.')
    c.raw(table(['Fact','Opinion'],[['The sun rises in the east.','Pizza is the most delicious food.'],
                                   ['We need oxygen to live.','The rose is the most beautiful flower.']]))
    c.remember('Opinion clue words: <b>best, most beautiful, tastiest, I think, I like</b>.')
    c.ex('Fill in the question word', 'Who / What / Where / When / Why', [
        ('{_} is your name?','What'),('{_} do you live?','Where'),('{_} is your birthday?','When'),
        ('{_} are you late?','Why'),('{_} is your best friend?','Who')], cols=1)
    c.ex('Fact or opinion?', 'Write F or O.', [
        ('Pizza is the most delicious meal.','O'),('We need oxygen to live.','F'),('Rose is the most beautiful flower.','O'),
        ('The sun rises in the east.','F'),('Dogs are the best pets.','O'),('A week has seven days.','F')], cols=1)
    c.ex('My favourite animal', 'Write one fact and one opinion.', [
        ('Fact: {_}','answers vary, e.g. A dog has four legs.'),('Opinion: {_}','answers vary, e.g. Dogs are lovely.')], cols=1)
    c.ex('Order the steps', 'Number the steps of brushing teeth.', [
        ('Rinse your mouth.','4'),('Put paste on the brush.','2'),('Take your brush.','1'),('Brush up and down.','3')], cols=1)
    c.ex('Make a question', 'Turn the answer into a question using a wh- word.', [
        ('My name is Aditi.','What is your name?'),('I live in Lucknow.','Where do you live?'),
        ('My birthday is in May.','When is your birthday?')], cols=1)
    return c


def ch16():
    c = Chapter(16, 'Writing and Composition', '📝', COLORS[1],
                ['write 5 to 6 sentences on a topic', 'describe a picture', 'write about myself',
                 'use adjectives, capital letters and full stops'])
    c.h('How to write')
    c.raw(table(['Plan 🗒️','Write ✏️','Check ✅'],
                [['Think of 5–6 things to say.','One idea in each sentence.','Capital letter? Full stop? Do the words make sense?']]))
    c.h('Model: My Pet')
    c.raw('<div class="box fun">I love my pet cat. Her name is Sike. She lives in my house. She looks cute and fluffy. '
          'She feels soft. She likes to sit with me.</div>')
    c.h('Model: All About Me')
    c.raw('<div class="box fun">My name is Advaita. I am in Class 1. I live in Lucknow. My favourite colour is pink. '
          'I like to play with my puppies. I am a kind and happy girl.</div>')
    c.ex('Describe the picture', 'Look at any picture book. Write 3 to 4 sentences. Use words: in, on, under, big, small, red.', [
        ('Sentence 1: {_}','answers vary'),('Sentence 2: {_}','answers vary'),('Sentence 3: {_}','answers vary')], cols=1)
    c.ex('All about me', 'Write about yourself.', [
        ('My name is {_}.','answers vary'),('I am in class {_}.','answers vary'),('I live in {_}.','answers vary'),
        ('My best friend is {_}.','answers vary'),('I like {_}.','answers vary'),('I am {_} (a describing word).','answers vary')], cols=1)
    c.ex('My mother (adjectives)', 'Use these words: caring, kind, helpful, beautiful, understanding. Write 4 sentences.', [
        ('I love my mother because she is {_}.','answers vary'),('She is happy when {_}.','answers vary'),
        ('She is sad when {_}.','answers vary'),('My favourite memory with her is {_}.','answers vary')], cols=1)
    c.ex('Stretch the sentence', 'Finish the sentence in an exciting way.', [
        ('While I was watering plants in my garden, I was surprised when {_}.','answers vary'),
        ('My father and I went to the top of the water slide and then {_}.','answers vary'),
        ('On my way to school I saw {_}.','answers vary')], cols=1)
    c.ex('Letter to a friend', 'Fill in the blanks.', [
        ('Dear {_} (friend\'s name),','answers vary'),('Yesterday I went to the {_}.','zoo (any place)'),
        ('I saw a {_} and an {_}.','answers vary'),('I enjoyed myself. Your friend, {_}.','your name')], cols=1)
    c.fun('<b>🌟 Challenge:</b> Write 5 sentences on <b>"My Best Friend"</b>. Draw a picture of your friend.')
    return c


def revision():
    c = Chapter(18, 'Revision Tests', '🏆', COLORS[2], ['check what I have learnt', 'find topics I need to practise'])
    c.h('Test 1 — Words')
    c.ex('Test 1', '10 marks.', [
        ('Write the vowels: {_}','a, e, i, o, u'),('{_} elephant (a / an)','an'),('Plural of child: {_}','children'),
        ('Opposite of up: {_}','down'),('Feminine of king: {_}','queen'),('Rhymes with cake: {_}','bake / lake / make'),
        ('Add magic e: cap → {_}','cape'),('Past of run: {_}','ran'),('Noun or verb? jump → {_}','verb'),
        ('Proper noun: dog / Bruno → {_}','Bruno')], cols=2)
    c.h('Test 2 — Sentences')
    c.ex('Test 2', '10 marks.', [
        ('Correct: my friend is riya','My friend is Riya.'),('{_} (is / are) playing football. They','are'),
        ('I {_} (am / is) happy.','am'),('{_} are my books. (This / These)','These'),
        ('She {_} (has / have) a doll.','has'),('He is a boy. {_} name is Raj. (His / Her)','His'),
        ('I carry an umbrella {_} it is raining. (and / because)','because'),
        ('The cat is {_} the table. (under / unders)','under'),('Write a describing word for sugar: {_}','sweet'),
        ('Fact or opinion: Mangoes are the best fruit.','Opinion')], cols=1)
    c.h('Test 3 — Read and answer')
    c.raw(passage('Read', 'Mira has a red kite. She flies it in the park with her brother Rohan. The kite goes high in the sky. Mira is very happy.'))
    c.ex('Test 3', '5 marks.', [
        ('What colour is Mira\'s kite?','Red'),('Where does she fly it?','In the park.'),('Who flies it with her?','Her brother Rohan.'),
        ('How does Mira feel?','Happy.'),('Write one naming word from the story.','Mira / kite / park / Rohan / sky')], cols=1)
    c.raw('<div class="cert"><div style="font-size:36pt">🏅🌟🏅</div><h2>English Star Certificate</h2>'
          '<p style="font-size:16pt">This is to say that <span class="blank" style="min-width:70mm"></span> has completed Class 1 English!</p>'
          '<p>Date: <span class="blank" style="min-width:40mm"></span></p></div>')
    return c


def glossary():
    rows = [('Vowel','a, e, i, o, u'),('Consonant','all the other letters'),('Noun','naming word'),
            ('Proper noun','special name with a capital letter'),('Pronoun','takes the place of a noun: he, she, it, they'),
            ('Verb','action word'),('Adjective','describing word'),('Preposition','position word: in, on, under'),
            ('Conjunction','joining word: and, but, because'),('Article','a, an, the'),('Singular','one'),('Plural','more than one'),
            ('Antonym','opposite word'),('Simile','as … as comparison'),('Sentence','complete thought, capital letter + full stop'),
            ('Fact','true statement'),('Opinion','what someone feels or thinks')]
    return '<div class="chapter" style="--c:#1864ab"><h2>📚 Word Bank</h2>' + table(['Word', 'Meaning'], rows) + '</div>'


def appendix_lists():
    def L(title, words): return f'<h3>{title}</h3><p>{words}</p>'
    return ('<div class="chapter" style="--c:#1864ab"><h2>📎 Appendix A — Word Lists to Practise</h2>'
            + L('Sight words', 'the, a, and, is, it, in, on, at, of, to, I, you, he, she, we, they, my, me, are, was, have, has, do, go, up, see, like, look, can, said, come, play, big, little, good, said, with, for')
            + L('Irregular plurals', 'child – children · man – men · woman – women · foot – feet · tooth – teeth · mouse – mice · goose – geese · ox – oxen')
            + L('Same in singular and plural', 'sheep · deer · fish · hair · grass')
            + L('Past tense — change completely', 'run – ran · sleep – slept · see – saw · teach – taught · buy – bought · bring – brought · catch – caught · eat – ate · go – went · come – came · give – gave · make – made')
            + L('Past tense — add -ed', 'play – played · dance – danced · climb – climbed · cook – cooked · ask – asked · jump – jumped · wash – washed')
            + L('Past tense — no change', 'cut · put · read · hit · hurt · let · set')
            + L('Opposites (39 pairs)', 'forward–backward · beautiful–ugly · rough–smooth · noisy–quiet · give–take · empty–full · early–late · find–lose · under–over · here–there · narrow–wide · high–low · love–hate · shout–whisper · buy–sell · back–front · young–old · clean–dirty · wet–dry · slow–fast · long–short · sit–stand · sour–sweet · in–out · first–last · sad–happy · day–night · open–close · tall–short · fat–thin · big–small · laugh–cry · pull–push · up–down · strong–weak · heavy–light · more–less · near–far')
            + L('Male and female', 'father–mother · brother–sister · grandfather–grandmother · nephew–niece · king–queen · son–daughter · uncle–aunt · man–woman · gentleman–lady · sir–madam · fox–vixen · gander–goose · cock–hen · horse–mare · bull–cow · prince–princess · lion–lioness · deer–doe · peacock–peahen · tiger–tigress')
            + L('Body parts', 'head, hair, face, forehead, eyebrow, eye, ear, cheek, lips, chin, neck, chest, shoulder, elbow, wrist, fingers, leg, thigh, knee, ankle, feet, toes')
            + '</div>')


def appendix_resources():
    rows = [
        ('Book', 'NCERT <b>Marigold, Class 1</b> English textbook — free PDF with rhymes and stories', 'ncert.nic.in → Textbook'),
        ('Site', '<b>DIKSHA</b> — free English lessons, stories and worksheets', 'diksha.gov.in'),
        ('App', '<b>Khan Academy Kids</b> — free reading, phonics and stories', 'khankids.ai / app stores'),
        ('Site', '<b>StoryWeaver</b> (Pratham Books) — thousands of free picture stories in many levels and Indian languages', 'storyweaver.org.in'),
        ('Site', '<b>Starfall</b> — free phonics and early reading games', 'starfall.com'),
        ('Site', '<b>Oxford Owl</b> — free eBooks and reading tips for parents', 'home.oxfordowl.co.uk'),
        ('Video', '<b>Phonics songs</b> on kids YouTube channels (letter sounds, rhymes)', 'search "phonics song for kids"'),
        ('At home', 'A library card, picture books, letter cards, a whiteboard, a small notebook for daily 3 sentences', 'home'),
    ]
    return ('<div class="chapter" style="--c:#2b8a3e"><h2>🌟 Appendix B — Best Resources</h2>'
            + table(['Type', 'What & why', 'Where'], rows)
            + '<div class="box tip"><b>Daily routine (15 min):</b> read aloud together (5), sound/spelling game (5), write 2–3 sentences (5). '
              'Read one story every day. Praise effort. Names and websites change; search by the name shown.</div>'
            + '<h2 style="margin-top:6mm">🎯 Five-minute English games</h2><ol>'
              '<li><b>I spy</b> with my little eye something that begins with /b/.</li>'
              '<li><b>Rhyme chain:</b> cat – bat – mat – hat …</li>'
              '<li><b>Noun game:</b> person, place, animal, thing with the same letter.</li>'
              '<li><b>Story dice:</b> pick a character, a place, a problem — tell a story.</li>'
              '<li><b>Word of the day:</b> use it in three sentences.</li></ol></div>')
