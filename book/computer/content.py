# Computer Class 1 — chapters, glossary, appendices (English, kid-friendly)
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'maths'))
from lib import *
from lib import Chapter, table, COLORS, blank

CSS_EXTRA = """
.wm{background:#fff4e6;border-radius:10px;padding:2mm 4mm;margin:3mm 0;font-size:11.5pt}
.wisdom{background:#e6fcf5;border:2px solid #38d9a9;border-radius:12px;padding:3mm 5mm;margin:3mm 0}
.wisdom:before{content:"💡 Wisdom Box  ";font-weight:800;color:#087f5b}
.part{display:flex;gap:4mm;align-items:center;border:2px solid var(--c);border-radius:12px;padding:2mm 4mm;margin:2mm 0;break-inside:avoid}
.part .e{font-size:30pt}
.ex{break-inside:avoid}
"""


def wm(c, items):  # Word Master
    c.raw('<div class="wm"><b>📘 Word Master:</b> ' + ' &nbsp;•&nbsp; '.join(f'<b>{a}</b> – {b}' for a, b in items) + '</div>')


def wisdom(c, t): c.raw(f'<div class="wisdom">{t}</div>')


def part(c, e, name, text): c.raw(f'<div class="part"><span class="e">{e}</span><div><b>{name}</b><br>{text}</div></div>')


def ch1():
    c = Chapter(1, 'Computer — My Friend', '🖥️', COLORS[0],
                ['say what a computer is', 'name places where computers are used', 'know the types: desktop, laptop, tablet, smartphone'])
    c.p('We all have friends to play and learn with. Let us meet a new friend — the <b>computer</b>! '
        'A computer is a smart electronic machine that helps us write, draw, play, learn and talk to people far away.')
    c.fun('<b>🎵 Sing along:</b> Computer! Computer! Be my friend, our friendship will have no end. '
          'Computer! Computer! Let me write my name, let me play a game, let me draw the Sun, let me have some fun.')
    c.h('Places where we see computers')
    c.raw(table(['Place', 'What computers do there'], [
        ['🏠 Home', 'games, cartoons, online classes'], ['🏫 School', 'teaching and learning'], ['🏢 Office', 'typing, meetings, storing work'],
        ['🏦 Bank', 'money details, ATM'], ['🛒 Shops and malls', 'making bills'], ['🍽️ Restaurants', 'orders and bills'],
        ['✈️ Airport / 🚉 railway station', 'booking and showing tickets'], ['🏥 Hospital', 'patient records']]))
    c.h('Types of computers')
    part(c, '🖥️', 'Desktop', 'Stays on a desk. Has separate parts — monitor, keyboard, mouse, CPU.')
    part(c, '💻', 'Laptop', 'Light and can be carried. Everything is in one folding body.')
    part(c, '📱', 'Tablet', 'Flat touch-screen computer. We touch the screen to work.')
    part(c, '📲', 'Smartphone', 'A phone that is also a small computer!')
    wisdom(c, 'A smartphone is also a type of computer. An ATM is a computer too!')
    wm(c, [('computer', 'an electronic machine that helps us work'), ('desktop', 'a computer for a desk'), ('laptop', 'a computer you can carry on your lap')])
    c.ex('Where do we see computers?', 'Fill in the place.', [
        ('We see desktops in use at {_} and in offices.', 'home / school'), ('We buy tickets on computers at an {_} or railway station.', 'airport'),
        ('A bill is made on a computer in a {_}.', 'shop / restaurant'), ('Doctors keep patient records in a {_}.', 'hospital')], cols=1)
    c.ex('Name the computer', 'Write: desktop, laptop, tablet or smartphone.', [
        ('Has a screen, keyboard and CPU on a desk → {_}', 'desktop'), ('Light and foldable → {_}', 'laptop'),
        ('Flat, touch screen → {_}', 'tablet'), ('A phone that works like a computer → {_}', 'smartphone')], cols=1)
    c.ex('True or false?', 'Write T or F.', [
        ('A computer is our friend that helps us. {_}', 'T'), ('Computers are only used at home. {_}', 'F'),
        ('A smartphone is a type of computer. {_}', 'T'), ('A laptop cannot be carried. {_}', 'F')], cols=2)
    c.fun('<b>🎨 Fun with friends:</b> Draw a computer and colour it your favourite colours. Write MY COMPUTER on it.')
    c.tip('Point out computers outside — ATM, billing machine, ticket counter. Ask "What is this computer helping with?"')
    return c


def ch2():
    c = Chapter(2, 'A Smart Machine', '🤖', COLORS[1], ['say what a machine is', 'know what makes machines work: fuel, electricity, people', 'say why a computer is smart'])
    c.p('A <b>machine</b> is a man-made thing that helps us do work easily. Some machines need <b>fuel</b> (petrol, diesel), some need <b>electricity</b>, and some work with <b>human power</b>.')
    c.raw(table(['Runs on fuel ⛽', 'Runs on electricity ⚡', 'Runs on human power 💪'],
                [['car, bus, scooter', 'fan, TV, computer, washing machine', 'bicycle, pedal boat, hand pump']]))
    c.remember('The Sun, trees and rivers are <b>not</b> machines — they are not made by people.')
    c.h('Why is a computer a smart machine?')
    c.raw('<div class="row">✅ It never gets tired. &nbsp; ✅ It never makes mistakes. &nbsp; ✅ It works very fast.<br>'
          '✅ It can store pictures, books, songs and movies. &nbsp; ✅ It does what we ask it to do.</div>')
    wm(c, [('machine', 'a man-made thing that helps us work'), ('fuel', 'petrol, wood etc. that give power to machines')])
    c.ex('Tick the machines', 'Write M for machine or N for not a machine.', [
        ('Washing machine {_}', 'M'), ('Sun {_}', 'N'), ('Mixer {_}', 'M'), ('Tree {_}', 'N'), ('Smartphone {_}', 'M'), ('Moon {_}', 'N')], cols=3)
    c.ex('True or false?', 'Write T or F.', [
        ('A washing machine runs on fuel. {_}', 'F (electricity)'), ('A smartphone is a machine as it makes our work easy. {_}', 'T'),
        ('The Sun is not a machine because it is not made by people. {_}', 'T'), ('A computer gets tired easily. {_}', 'F')], cols=1)
    c.ex('Unjumble the letters', 'Write the word.', [
        ('ULEF → {_}', 'FUEL'), ('TSRAM → {_}', 'SMART'), ('IYLECETCRIT → {_}', 'ELECTRICITY'), ('EMCANHI → {_}', 'MACHINE')], cols=2)
    c.ex('Match what it runs on', '(a) fuel (b) electricity (c) human power', [
        ('Bus → {_}', '(a)'), ('Fan → {_}', '(b)'), ('Bicycle → {_}', '(c)'), ('Computer → {_}', '(b)')], cols=4)
    c.ex('Answer', 'Write short answers.', [
        ('Name two machines that run on electricity. {_}', 'fan, TV, computer…'), ('Name two machines that run on fuel. {_}', 'car, bus…'),
        ('Write two things that make a computer smart. {_}', 'never tires, never makes mistakes, works fast, stores a lot'),
        ('Name two things not made by people. {_}', 'Sun, trees, river…')], cols=1)
    return c


def ch3():
    c = Chapter(3, 'A Handy Machine', '🧰', COLORS[2], ['know how a computer helps me, my family and others', 'know the benefits of a computer'])
    c.p('A computer is very <b>handy</b> — it helps everyone in many ways.')
    c.raw(table(['Who?', 'How a computer helps'], [
        ['👧 Me', 'play games, listen to music, learn, type letters, draw and paint, attend online classes'],
        ['👨‍👩‍👧 My family', 'pay bills, shop online, send emails and messages, attend meetings, book tickets, order food, store work'],
        ['🏫 School', 'teaching and learning'], ['📚 Library', 'keeping details of books issued and returned'],
        ['✈️ Airport / Railway', 'booking tickets'], ['🏥 Hospital', 'keeping details of patients'],
        ['🛒 Shops / Restaurants', 'making bills'], ['🚗 Vehicles', 'showing maps (GPS)'], ['🏦 Bank', 'keeping details of money']]))
    c.h('Benefits of a computer')
    c.raw('<div class="row">✔ It does not make mistakes. ✔ We can work faster. ✔ It saves our time. ✔ It can do different jobs.</div>')
    wisdom(c, 'An ATM is also a computer. We use it to take out and put in money.')
    c.ex('Match', 'Where is the computer used → for what? (a) teaching (b) booking tickets (c) patient details (d) making bills', [
        ('School → {_}', '(a)'), ('Railway station → {_}', '(b)'), ('Hospital → {_}', '(c)'), ('Shop → {_}', '(d)')], cols=4)
    c.ex('True or false?', 'Write T or F.', [
        ('A computer saves our time. {_}', 'T'), ('A computer can only play games. {_}', 'F'),
        ('We can attend online classes on a computer. {_}', 'T'), ('Computers make a lot of mistakes. {_}', 'F')], cols=2)
    c.ex('Tell me', 'Write one use.', [
        ('One use of a computer for me: {_}', 'play / learn / draw…'), ('One use for my parents: {_}', 'pay bills / shop / office work'),
        ('One benefit of a computer: {_}', 'saves time / fast / no mistakes')], cols=1)
    c.fun('<b>🗣️ Activity:</b> Ask at home — "What do you use a computer or phone for?" Draw two uses.')
    return c


def ch4():
    c = Chapter(4, 'Know My Friend — Parts of a Computer', '⌨️', COLORS[3],
                ['name the main parts of a computer', 'use the keyboard and mouse correctly', 'know what data, memory and storage are'])
    c.p('Like our body has parts, a computer has parts too. Each part has its own work. All parts are connected to the <b>CPU</b>.')
    part(c, '🧠', 'CPU (Central Processing Unit)', 'The brain of the computer. It looks like a box and controls all the other parts.')
    part(c, '🖥️', 'Monitor', 'Looks like a TV screen. It shows us what we do — videos, games, pictures.')
    part(c, '⌨️', 'Keyboard', 'Many small buttons called keys. We type letters, numbers and words with it.')
    part(c, '🖱️', 'Mouse', 'Helps us point, select, draw and play games. It moves the arrow (pointer) on the screen.')
    part(c, '🔊', 'Speakers', 'Let us hear songs, music and sounds.')
    part(c, '🖨️', 'Printer', 'Takes a print of our work on paper.')
    wisdom(c, 'An all-in-one computer has the CPU inside the monitor.')
    c.h('The keyboard')
    c.raw(table(['Key type', 'How many', 'What for'], [
        ['Alphabet keys (A to Z)', '26', 'typing words and sentences'], ['Number keys (0 to 9)', '10', 'typing numbers'],
        ['Special keys', 'many', 'Spacebar (longest key), Enter, Backspace, Caps Lock …']]))
    c.raw(table(['Special key', 'What it does'], [
        ['Spacebar', 'gives space between two words — it is the longest key'], ['Enter', 'moves the cursor to the next line'],
        ['Backspace', 'erases the letter on the left of the cursor — the "eraser" key'], ['Caps Lock', 'types capital letters (the light turns on)']]))
    c.p('<b>Cursor</b> = the bright blinking line that shows where you will type.')
    c.h('The mouse')
    c.raw(table(['Mouse action', 'What to do', 'What happens'], [
        ['Single click', 'press the left button once', 'selects an item'], ['Double click', 'press the left button twice, quickly', 'opens an item'],
        ['Right click', 'press the right button once', 'shows a list of commands'], ['Drag and drop', 'hold the left button, move, then release', 'moves an item to a new place']]))
    c.p('Parts of a mouse: left button, right button, scroll wheel, wire (a wireless mouse has no wire). Hold the mouse gently, with your hand resting on it.')
    c.h('Data, memory and storage')
    c.p('<b>Data</b> is a collection of words, numbers, pictures or sounds. A computer keeps data safe in <b>storage devices</b>: hard disk, memory card, DVD and pen drive.')
    wm(c, [('connect', 'to join together'), ('blink', 'a light that goes on and off'), ('storage', 'a place to keep things safe')])
    c.ex('Name the parts', 'Which are parts of a computer? Write Y or N.', [
        ('CPU {_}', 'Y'), ('cat {_}', 'N'), ('keyboard {_}', 'Y'), ('cupboard {_}', 'N'), ('mouse {_}', 'Y'),
        ('blackboard {_}', 'N'), ('speaker {_}', 'Y'), ('cooker {_}', 'N'), ('printer {_}', 'Y'), ('monitor {_}', 'Y')], cols=5)
    c.ex('True or false?', 'Write T or F.', [
        ('The CPU is the most important part of a computer. {_}', 'T'), ('The keyboard looks like a television. {_}', 'F (monitor)'),
        ('The mouse helps us to point at items. {_}', 'T'), ('We can listen to a song through speakers. {_}', 'T'),
        ('The mouse can print what you see on the monitor. {_}', 'F (printer)')], cols=1)
    c.ex('Choose the correct part', 'Keyboard, monitor, speaker or mouse?', [
        ('Pari types a letter with the {_}.', 'keyboard'), ('Vartika watches a cartoon on the {_}.', 'monitor'),
        ('Saurabh connects the {_} to play music.', 'speaker'), ('I move the pointer using the {_}.', 'mouse')], cols=1)
    c.ex('Unjumble the keys', 'Write the key name.', [
        ('SRPAECBA → {_}', 'SPACEBAR'), ('REETN → {_}', 'ENTER'), ('ABCACESPK → {_}', 'BACKSPACE'), ('SPAC KOCL → {_}', 'CAPS LOCK')], cols=2)
    c.ex('Space or Backspace?', 'Where should the cursor / space be? Write the new word(s).', [
        ('Bedroom — press Space after d → {_}', 'Bed room'), ('Pencilbox — Space after l → {_}', 'Pencil box'),
        ('Carpet — cursor after t, Backspace 3 times → {_}', 'Car'), ('Jugnu — cursor after last u, Backspace 2 times → {_}', 'Jug'),
        ('Pink — cursor after k, Backspace once → {_}', 'Pin')], cols=1)
    c.ex('Answer', 'Short answers.', [
        ('Name the three types of keys. {_}', 'alphabet, number, special'), ('Name three mouse actions. {_}', 'single click, double click, right click, drag and drop'),
        ('Name three storage devices. {_}', 'hard disk, memory card, DVD, pen drive'),
        ('What is the blinking line that shows where to type? {_}', 'cursor')], cols=1)
    c.fun('<b>🔎 Mystery word:</b> Write the letter for each clue. 1 comes just after K; 2 first letter; 3 just before O; 4 between F and H; 5 after T and before V; 6 just before B; 7 just after F; 8 between D and F. The word is: <b>L A N G U A G E</b>.')
    c.tip('Let the child practise typing their name, then the names of the family. Use a mouse pad and teach the "light touch".')
    return c


def ch5():
    c = Chapter(5, 'Connect with Computer', '🔗', COLORS[4], ['know the language a computer understands', 'follow and give simple commands', 'try coding and decoding fun'])
    c.p('People speak many languages — Hindi, English, Tamil, French… A computer understands only <b>machine language</b>, made of just two numbers: <b>0</b> and <b>1</b>.')
    c.raw('<div class="sl" style="font-size:20pt;text-align:center;background:#e7f5ff;border-radius:12px;padding:3mm">0 1 0 1 1 0 1 1 0</div>')
    c.p('A <b>command</b> is an order. A <b>code</b> is a set of symbols that gives commands to a computer. Computers follow commands exactly — they cannot think on their own.')
    c.h('Coding fun — follow the commands')
    c.raw(table(['Command', 'Meaning'], [['2 →', 'move 2 steps right'], ['3 ↓', 'move 3 steps down'], ['1 ←', 'move 1 step left'], ['2 ↑', 'move 2 steps up']]))
    c.h('Decoding fun')
    c.raw(table(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'], [[str(i) for i in range(1, 14)]]))
    c.raw(table(['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], [[str(i) for i in range(14, 27)]]))
    c.p('Solving a code is called <b>decoding</b>. Example: 8 5 12 12 15 = H E L L O.')
    wm(c, [('code', 'symbols used for a message'), ('decode', 'solve a code'), ('command', 'an order'), ('connect', 'join or link')])
    c.ex('Languages', 'Which are languages? Write Y or N.', [
        ('Hindi {_}', 'Y'), ('speaker {_}', 'N'), ('Punjabi {_}', 'Y'), ('mouse {_}', 'N'), ('German {_}', 'Y'), ('Tamil {_}', 'Y'), ('Math {_}', 'N'), ('French {_}', 'Y')], cols=4)
    c.ex('True or false?', 'Write T or F.', [
        ('People around the world speak just one language. {_}', 'F'), ('A computer understands machine language. {_}', 'T'),
        ('Machine language uses only 0 and 1. {_}', 'T'), ('A computer thinks on its own. {_}', 'F')], cols=1)
    c.ex('Unjumble', 'Write the word.', [
        ('AMCIHEN → {_} (language of a computer)', 'MACHINE'), ('ROCPMTUE → {_}', 'COMPUTER'),
        ('MMOCDNAS → {_} (a computer follows them)', 'COMMANDS'), ('CDOEIDNG → {_} (solving a code)', 'DECODING')], cols=1)
    c.ex('Decode', 'Use the key to find the word.', [
        ('8 5 12 12 15 → {_}', 'HELLO'), ('3 15 13 16 21 20 5 18 → {_}', 'COMPUTER'), ('20 8 5 → {_}', 'THE'), ('25 15 21 → {_}', 'YOU')], cols=2)
    c.ex('Follow the commands', 'Start at the ★ and move. Where do you reach? (Write the number of steps in total.)', [
        ('2 → , 2 ↓ : total steps {_}', '4'), ('3 → , 1 ↑ , 2 ← : total steps {_}', '6'), ('1 ↓ , 1 → , 1 ↓ , 1 → : total steps {_}', '4')], cols=1)
    c.ex('Order the steps for washing hands', 'Write 1 to 5. (a) rinse (b) wet hands (c) dry with towel (d) rub 20 seconds (e) apply soap', [
        ('(a) {_}', '4'), ('(b) {_}', '1'), ('(c) {_}', '5'), ('(d) {_}', '3'), ('(e) {_}', '2')], cols=5)
    c.h('How is a computer different from me?')
    c.raw(table(['Question', 'Computer', 'Me'], [
        ['Does it get tired?', 'No', 'Yes'], ['Does it make mistakes?', 'No', 'Sometimes'], ['Does it forget things?', 'No', 'Sometimes'],
        ['Can it solve sums quickly?', 'Yes', 'With practice'], ['Can it think on its own?', 'No', 'Yes! 🧠']]))
    c.fun('<b>🧠 Who is smarter?</b> A computer follows our commands. Who gives the commands? <b>We do!</b> We are smarter because we can think.')
    c.tip('Play "Robot": the child gives commands (forward, turn left) to a parent who acts like a robot — and sees why exact commands matter.')
    return c


def ch6():
    c = Chapter(6, "Do's and Don'ts of a Computer", '✅', COLORS[5], ['look after the computer', 'use the computer safely', 'follow rules while using a computer'])
    c.p('We love our friends and take care of them. Let us take care of our friend, the computer.')
    c.raw('<div class="flex" style="align-items:flex-start"><div style="flex:1;background:#ebfbee;border-radius:12px;padding:3mm 5mm"><b>✅ Do</b><ul>'
          '<li>Keep the computer clean and dry.</li><li>Press the keys gently.</li><li>Use the mouse on a mouse pad.</li>'
          '<li>Sit straight in front of the computer.</li><li>Take turns in school.</li><li>Take permission and help from elders or teachers.</li>'
          '<li>Use headphones so you do not disturb others.</li></ul></div>'
          '<div style="flex:1;background:#fff5f5;border-radius:12px;padding:3mm 5mm"><b>❌ Don\'t</b><ul>'
          '<li>Don\'t eat or drink near a computer.</li><li>Never touch the mouse or keyboard with dirty hands.</li>'
          '<li>Never sit very close to the screen.</li><li>Don\'t play with the wires.</li><li>Don\'t keep the sound loud.</li>'
          '<li>Don\'t put a pencil or ruler into the computer.</li><li>Never switch off directly from the main power button.</li></ul></div></div>')
    wm(c, [("do's", 'things we should do'), ("don'ts", 'things we should not do'), ('gently', 'softly'), ('permission', 'asking before doing'),
           ('disturb', 'to trouble')])
    c.ex('True or false?', 'Write T or F.', [
        ('You should eat and drink near a computer. {_}', 'F'), ('You should keep a computer clean. {_}', 'T'),
        ('You should play with computer wires. {_}', 'F'), ('You should sit very close to a computer. {_}', 'F')], cols=1)
    c.ex('Fill in the blanks', 'Words: gently, dry, loud, turns', [
        ('Keep the computer clean and {_}.', 'dry'), ('Press the keys of the keyboard {_}.', 'gently'),
        ('Do not play {_} music.', 'loud'), ('In school, we should take {_} to use the computer.', 'turns')], cols=1)
    c.ex('Choose the correct option', '', [
        ('Rishi is playing games. He should keep the sound (loud / low). {_}', 'low'),
        ('Akansha is typing. She should press the keys (hard / gently). {_}', 'gently'),
        ('Neha wants to clean the computer. She should use a (dry / wet) cloth. {_}', 'dry'),
        ('Sharing is a (good / bad) habit. {_}', 'good')], cols=1)
    c.ex("Do or Don't?", 'Write DO or DON\'T.', [
        ('Sit straight in front of the computer {_}', 'DO'), ('Touch the wires {_}', "DON'T"), ('Press keys hard {_}', "DON'T"),
        ('Ask elders for help {_}', 'DO')], cols=2)
    c.ex('Answer', '', [
        ('Write one thing you should do. {_}', 'any correct do'), ('Write one thing you should not do. {_}', 'any correct don\'t'),
        ('How should we sit in front of a computer? {_}', 'straight'), ('Whom should we ask for help? {_}', 'elders or teachers')], cols=1)
    c.fun("<b>📝 Class rules:</b> With your friends, make 3 Do's and 3 Don'ts for your classroom computer. Write them on a chart.")
    return c


def revision():
    c = Chapter(7, 'Revision Tests', '🏆', COLORS[6], ['check what I have learnt'])
    c.ex('Test 1 — Basics', '10 marks.', [
        ('A computer is an {_} machine.', 'electronic'), ('Name one type of computer. {_}', 'desktop / laptop / tablet / smartphone'),
        ('The brain of the computer is the {_}.', 'CPU'), ('We see pictures and videos on the {_}.', 'monitor'),
        ('We type with the {_}.', 'keyboard'), ('We point and click with the {_}.', 'mouse'),
        ('We hear sounds through {_}.', 'speakers'), ('A printer takes a {_} on paper.', 'print'),
        ('The longest key is the {_}.', 'spacebar'), ('Machine language has {_} and {_}.', '0 and 1')], cols=2)
    c.ex('Test 2 — Uses & rules', '10 marks.', [
        ('A computer saves our {_}.', 'time'), ('Banks keep money details on a {_}.', 'computer'),
        ('Name a storage device. {_}', 'pen drive / hard disk / memory card / DVD'), ('A computer follows our {_}.', 'commands'),
        ('Solving a code is called {_}.', 'decoding'), ("Eating near a computer is a {_} (do / don't).", "don't"),
        ('Keys should be pressed {_}.', 'gently'), ('Press Enter to go to the next {_}.', 'line'),
        ('Backspace erases the letter on the {_}.', 'left'), ('Double click {_} an item.', 'opens')], cols=2)
    c.raw('<div class="cert"><div style="font-size:36pt">🏅💻🏅</div><h2>Computer Star Certificate</h2>'
          '<p style="font-size:16pt">This is to say that <span class="blank" style="min-width:70mm"></span> has completed Class 1 Computer!</p>'
          '<p>Date: <span class="blank" style="min-width:40mm"></span></p></div>')
    return c


def glossary():
    rows = [('Computer', 'an electronic machine'), ('Machine', 'a man-made thing that helps us work'), ('CPU', 'brain of the computer'),
            ('Monitor', 'screen that shows work'), ('Keyboard', 'keys for typing'), ('Mouse', 'pointing device'), ('Cursor', 'blinking line where you type'),
            ('Data', 'words, numbers, pictures or sounds'), ('Storage', 'place to keep data safe'), ('Command', 'an order to a computer'),
            ('Code', 'symbols that give commands'), ('Decode', 'to solve a code')]
    return '<div class="chapter" style="--c:#1864ab"><h2>📚 Word Bank</h2>' + table(['Word', 'Meaning'], rows) + '</div>'


def appendix_resources():
    rows = [
        ('Site', '<b>Code.org — Hour of Code</b>: free beginner coding puzzles with drag-and-drop blocks', 'code.org'),
        ('App', '<b>ScratchJr</b>: free app to make your own stories and games for ages 5–7', 'scratchjr.org'),
        ('Site', '<b>CS Unplugged</b>: computer-science activities without a computer (great for "robot" games)', 'csunplugged.org'),
        ('Site', '<b>BBC Dance Mat Typing</b>: friendly typing lessons for kids', 'search "BBC Dance Mat Typing"'),
        ('Software', '<b>Tux Paint</b>: free paint program designed for young children', 'tuxpaint.org'),
        ('App', '<b>Khan Academy Kids</b>: free early learning app', 'app stores'),
        ('Portal', '<b>DIKSHA</b>: government learning portal with lessons and videos', 'diksha.gov.in'),
        ('At home', 'Paper keyboard (draw keys), cardboard monitor, "robot" commands game', 'make with paper'),
    ]
    return ('<div class="chapter" style="--c:#2b8a3e"><h2>🌟 Appendix — Best Resources</h2>'
            + table(['Type', 'What & why', 'Where'], rows)
            + '<div class="box tip"><b>Screen-time tip:</b> 20–30 minutes at a time, sitting straight, screen at eye level, with an adult nearby. '
              'Names and websites change; search by the name shown.</div>'
            '<h2 style="margin-top:6mm">🎯 Five-minute activities</h2><ol>'
            '<li><b>Name the part:</b> point to monitor, keyboard, mouse and say its job.</li>'
            '<li><b>Type your name:</b> use Shift/Caps Lock for the first letter.</li>'
            '<li><b>Robot game:</b> give exact commands — "2 steps forward, turn left".</li>'
            '<li><b>Secret code:</b> write your name in numbers (A=1, B=2…).</li>'
            '<li><b>Computer or not?</b> look around the house and sort machines.</li></ol></div>')
