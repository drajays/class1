# Chapters 11-14 + revision, front & back matter
from lib import *


def ch11():
    c = Chapter(11, 'Measurement', '📏', COLORS[10],
                ['compare length, height, weight and capacity', 'measure with hand spans, foot spans and crayons',
                 'order things from shortest to longest'])
    c.h('Comparing things')
    c.raw(table(['We say','Words','Example'],
                [['Length','long / longer / longest, short / shorter / shortest','pencil vs. crayon'],
                 ['Height','tall / taller / tallest','giraffe 🦒 vs. rabbit 🐇'],
                 ['Thickness','thick / thicker, thin / thinner','a dictionary vs. a notebook'],
                 ['Weight','heavy / heavier, light / lighter','elephant 🐘 vs. feather 🪶'],
                 ['Capacity','full, half, empty, holds more / less','a bucket vs. a cup']]))
    c.h('Measuring with non-standard units')
    c.p('We can measure with our <b>hand span</b> ✋, <b>foot span</b> 🦶 or <b>crayons</b> 🖍️. '
        'Put them end to end, with no gaps, and count.')
    c.remember('Use the <b>same unit</b> to compare. My hand is bigger than yours, so we must both use the same crayon!')
    c.ex('Choose', 'Circle (write) the right word.', [
        ('Elephant or ant — which is heavier? {_}','elephant'),('Giraffe or rabbit — which is taller? {_}','giraffe'),
        ('Bucket or cup — which holds more water? {_}','bucket'),('Ruler or chalk — which is longer? {_}','ruler'),
        ('Dictionary or notebook — which is thicker? {_}','dictionary'),('Feather or stone — which is lighter? {_}','feather')], cols=1)
    c.ex('Order them', 'Write the order.', [
        ('Shortest to longest: ✏️ (5 cm), 📏 (30 cm), 🖍️ (9 cm) → {_}','pencil, crayon, ruler'),
        ('Lightest to heaviest: 🐘 elephant, 🐱 cat, 🐭 mouse → {_}','mouse, cat, elephant'),
        ('Longest to shortest: 🚌 bus, 🚲 cycle, 🚗 car → {_}','bus, car, cycle')], cols=1)
    c.ex('Measure it!', 'Measure with your hand span and crayon. Write how many.', [
        ('My maths notebook is {_} crayons long.','answers vary'),('My table is {_} hand spans long.','answers vary'),
        ('My room door is {_} foot spans wide.','answers vary')], cols=1)
    return c


def ch12():
    c = Chapter(12, 'Patterns', '🎨', COLORS[11],
                ['find what repeats in a pattern (the unit)', 'continue shape, colour, letter and number patterns',
                 'spot the odd one out'])
    c.h('Look for what repeats')
    c.raw('<div class="row em2">🔴🔵🔴🔵🔴🔵 → AB AB AB</div>'
          '<div class="row em2">🍎🍌🍌🍎🍌🍌 → ABB ABB</div>'
          '<div class="row em2">🔺⭕🟥🔺⭕🟥 → ABC ABC</div>')
    c.p('The part that repeats is the <b>unit of repeat</b>. Number patterns can also <b>grow</b>: 5, 10, 15, 20 (add 5 each time).')
    c.ex('Continue the pattern', 'Write the next three.', [
        ('A, B, B, A, B, B, A, B, {_}, {_}, {_}','B, A, B'),('5, 9, 5, 9, 5, 9, {_}, {_}, {_}','5, 9, 5'),
        ('P, Q, R, P, Q, R, P, {_}, {_}, {_}','Q, R, P'),('8, 4, 4, 8, 4, 4, {_}, {_}, {_}','8, 4, 4'),
        ('1, 2, 3, 1, 2, 3, {_}, {_}, {_}','1, 2, 3'),('10, 20, 30, 40, {_}, {_}, {_}','50, 60, 70')], cols=1)
    c.ex('Number patterns', 'Find the rule and continue.', [
        ('2, 3, 4, 2, {_}, {_}, {_}','3, 4, 2'),('11, 22, 33, 11, {_}, {_}, {_}','22, 33, 11'),
        ('20, 30, 40, {_}','50'),('15, 20, 25, {_}','30'),('18, 20, 22, {_}','24'),('60, 70, 80, {_}','90'),
        ('2, 10, 18, 26, {_}','34'),('3, 5, 7, 3, 5, 7, {_}, {_}, {_}','3, 5, 7')], cols=2)
    c.ex('Odd one out', 'Which does not belong?', [
        ('first, second, third, fourth, <i>five</i>, sixth → {_}','five (should be fifth)'),
        ('Monday, Tuesday, <i>March</i>, Wednesday → {_}','March'),
        ('🍎🍌🍇🚗🍊 → {_}','🚗'),('2, 4, 6, 9, 10 → {_}','9'),('🔺🔺⭕🔺 → {_}','⭕')], cols=1)
    c.fun('<b>🎨 Create:</b> Draw your own ABC pattern with three colours. Ask a friend to continue it.')
    return c


def ch13():
    c = Chapter(13, 'Data Handling', '📊', COLORS[12],
                ['collect information', 'read a table, pictograph and bar graph', 'answer questions: most, least, how many more, total'])
    c.h('Collecting and showing data')
    c.p('Data is information. We put it in a <b>table</b> or draw it as a <b>graph</b> so that it is easy to read.')
    c.raw(table(['Ice cream seller','Cones sold'],[['Sam','🍦🍦'],['Kate','🍦🍦🍦'],['Becky','🍦🍦🍦🍦🍦']]))
    c.p('Becky sold the <b>most</b> (5). Sam sold the <b>least</b> (2). Altogether: 2 + 3 + 5 = <b>10</b>.')
    c.h('Bar graph')
    c.raw(bars([('Radish',5),('Carrot',9),('Tomato',7),('Corn',6),('Cauli',3),('Mush',4)]))
    c.p('<span class="sm">Robbie Rabbit\'s garden. Each bar shows how many.</span>')
    c.ex('Ice cream (Sam 2, Kate 3, Becky 5)', 'Look at the table above.', [
        ('Who sold the most? {_}','Becky'),('Who sold the least? {_}','Sam'),
        ('How many more did Becky sell than Sam? {_}','3'),('How many cones were sold in all? {_}','10')], cols=1)
    c.ex('Cars sold this week', 'Mon 8, Tue 5, Wed OFF (holiday), Thu 4, Fri 7, Sat 9', [
        ('How many cars were sold on Thursday? {_}','4'),('On which day were the most cars sold? {_}','Saturday'),
        ('On which working day were the fewest cars sold? {_}','Thursday'),
        ('Cars sold on Tuesday and Saturday together {_}','14')], cols=1)
    c.ex("Robbie's garden", 'Use the bar graph.', [
        ('Which vegetable is the most? {_}','Carrots'),('Which is the least? {_}','Cauliflowers'),
        ('How many more carrots than radishes? {_}','4'),('Tomatoes + corn = {_}','13')], cols=1)
    c.ex('Our class snacks', 'Burger 8, Fries 3, Brownie 4, Ice-cream 5.', [
        ('How many like fries? {_}','3'),('Which snack is liked by 5 friends? {_}','Ice-cream'),
        ('Which two snacks add up to 7? {_}','Fries and Brownie'),('How many like burger and brownie? {_}','12')], cols=1)
    c.ex('Collect your own', 'Count at home and write the number.', [
        ('Members in my house {_}','answers vary'),('Chairs in my house {_}','answers vary'),
        ('Windows in my house {_}','answers vary'),('Books in my bag {_}','answers vary')], cols=2)
    return c


def ch14():
    c = Chapter(14, 'Thinking Puzzles', '🧠', COLORS[13],
                ['think carefully and use clues', 'solve logic and number puzzles', 'explain how I found my answer'])
    c.h('Be a detective! 🕵️')
    c.p('Read each puzzle slowly. Draw a picture if it helps. There is always a clue!')
    c.ex('Puzzles', 'Think and write the answer.', [
        ('A magic machine: 9 goes in, 4 comes out. 11 → 6, 12 → 7. If 14 goes in, what comes out? {_}','9 (take away 5)'),
        ('There are 5 books in each of 3 cartons. How many books in all? {_}','15'),
        ('Sia lives on the 5th floor. She climbed to the 2nd floor and got tired. How many more floors? {_}','3'),
        ('In a book page 1 is blank, page 2 is printed, page 3 is blank, page 4 is printed … Next two printed pages after 8: {_} and {_}','10 and 12'),
        ('Mayur read 32 pages. 7 pages are left. How many pages are in the book? {_}','39'),
        ('What is the sum of the first 5 counting numbers (1 to 5)? {_}','15'),
        ('I am a number with 0 in the ones place and 5 in the tens place. I am {_}','50'),
        ('Which month is between January and March? {_}','February'),
        ('Which day is between Saturday and Monday? {_}','Sunday'),
        ('50 cups on my head, 1 fell down. How many are left? {_}','49')], cols=1)
    c.ex('Letters and positions', 'Use the word APPLE.', [
        ('The 3rd letter is {_}','P'),('E is the {_} letter','5th'),('Starting from the right, the 2nd letter is {_}','L'),
        ('How many times does P come? {_}','2')], cols=2)
    c.ex('More puzzles', 'Fill the blanks.', [
        ('20 = {_} × 10','2'),('1 more than the smallest 2-digit number {_}','11'),
        ('4 tens + 5 ones − 3 tens = {_}','15'),('8 times 9 = {_}','72'),
        ('There are 3 animals in a dark room. How many eyes? {_}','6 (3 pairs)')], cols=1)
    c.fun('<b>🎉 Party planner:</b> You are planning a surprise party for a friend. How many friends? How many balloons in 2s, 5s or 10s? '
          'How many slices of cake? Draw your plan and share it with someone at home.')
    return c


def revision():
    c = Chapter(15, 'Revision Tests', '🏆', COLORS[0], ['check what I have learnt', 'find topics I still need to practise'])
    c.h('Test 1 — Numbers')
    c.ex('Test 1', '10 marks. Write the answers.', [
        ('Number after 79 {_}','80'),('Number before 60 {_}','59'),('Write 43 in words {_}','forty three'),
        ('Tens and ones in 58 {_} tens {_} ones','5 tens 8 ones'),('Expanded form of 72 {_}','70 + 2'),
        ('Bigger: 46 or 64? {_}','64'),('Put &gt; or &lt;: 38 {_} 83','<'),('Even or odd: 27 {_}','odd'),
        ('Third day of the week {_}','Wednesday'),('Skip count by 5: 10, 15, {_}, {_}','20, 25')], cols=2)
    c.h('Test 2 — Operations')
    c.ex('Test 2', '10 marks.', [
        ('7 + 8 = {_}','15'),('15 − 6 = {_}','9'),('34 + 5 = {_}','39'),('48 − 12 = {_}','36'),('30 + 20 = {_}','50'),
        ('9 × 2 = {_}','18'),('5 × 6 = {_}','30'),('Fact family of 2, 6, 8: 2 + 6 = {_}, 8 − 2 = {_}','8, 6'),
        ('28 + 10 = {_}','38'),('100 − 10 = {_}','90')], cols=2)
    c.h('Test 3 — Mixed')
    c.ex('Test 3', '10 marks.', [
        ('A box has 12 pencils. 5 are broken. How many are good? {_}','7'),
        ('Ria had 15 stickers and got 9 more. How many now? {_}','24'),
        ('Pattern: 2, 4, 6, 8, {_}','10'),('A dice is a {_} shape','cube'),('A triangle has {_} corners','3'),
        ('Longer: a pencil or a bus? {_}','bus'),('Next: 🔴🔵🔴🔵🔴 {_}','🔵'),
        ('Table of 3: 3 × 4 = {_}','12'),('How many tens in 90? {_}','9'),('Smallest 2-digit number {_}','10')], cols=2)
    c.raw('<div class="cert"><div style="font-size:36pt">🏅🌟🏅</div><h2>Maths Star Certificate</h2>'
          '<p style="font-size:16pt">This is to say that <span class="blank" style="min-width:70mm"></span> has completed Class 1 Maths!</p>'
          '<p>Date: <span class="blank" style="min-width:40mm"></span></p></div>')
    return c


def glossary():
    rows = [('Addition','joining groups; sign +; answer = sum'),('Subtraction','taking away; sign −; answer = difference'),
            ('Digit','one of 0–9'),('Place value','what a digit is worth: 4 in 47 = 40'),('Ordinal','position: 1st, 2nd'),
            ('Ascending','going up, smallest first'),('Descending','going down, biggest first'),
            ('Number bond','two numbers that make a total'),('Pattern','something that repeats by a rule'),
            ('Plane shape','flat shape'),('Solid shape','shape you can hold'),('Data','information collected'),
            ('Times table','list of multiples'),('Even / Odd','pairs leftover? none / one')]
    return ('<div class="chapter" style="--c:#1864ab"><h2>📚 Word Bank</h2>'
            + table(['Word','Meaning'], rows) + '</div>')


def appendix_tables():
    def tb(n):
        rows = ''.join(f'<tr><td>{n} × {i}</td><td><b>{n*i}</b></td></tr>' for i in range(1, 11))
        return (f'<table class="t" style="margin:0;width:100%"><tr><th colspan="2" style="background:{COLORS[n % 15]};color:#fff">Table of {n}</th></tr>'
                f'{rows}</table>')
    grid = ''.join(f'<div>{tb(n)}</div>' for n in range(1, 21))
    return ('<div class="chapter" style="--c:#1864ab"><h2>📎 Appendix A — Tables 1 to 20</h2>'
            '<p class="sm">Class 1 needs tables 2–10. Tables 11–20 are a bonus for curious minds. '
            'Tip: tables of 11 → 11, 22, 33 … (repeat the digit!). Table of 20 → just double the table of 2 and add a zero.</p>'
            f'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4mm;font-size:10.5pt">{grid}</div></div>')


def appendix_resources():
    rows = [
        ('Book', 'NCERT <b>Math-Magic, Class 1</b> — the official textbook; free PDF and chapter videos', 'ncert.nic.in → Textbook'),
        ('App / site', '<b>DIKSHA</b> — government learning portal; QR-coded lessons, videos, worksheets', 'diksha.gov.in'),
        ('App', '<b>Khan Academy Kids</b> — free, ad-free early maths, reading, stories', 'khankids.ai / app stores'),
        ('Site', '<b>Math Playground</b> — free games for counting, addition, subtraction, patterns', 'mathplayground.com'),
        ('Site', '<b>Topmarks</b> — free interactive number lines, hundred squares, shape sorters', 'topmarks.co.uk'),
        ('Video', '<b>Numberblocks</b> (BBC CBeebies) — numbers 1–100 as friendly characters', 'cbeebies.com / YouTube'),
        ('Video', '<b>Maths songs</b> — skip-counting and times-table songs on YouTube kids channels', 'search "skip counting 2 5 10"'),
        ('At home', 'Ten-frame, hundred chart, dice, playing cards, buttons, ice-cream sticks bundles, a number line on the floor', 'make with paper'),
        ('Game', 'Dominoes, Ludo, snakes & ladders, "shop" role-play with toy money — real maths in play', 'family time'),
    ]
    t = table(['Type', 'What & why', 'Where'], rows)
    return ('<div class="chapter" style="--c:#2b8a3e"><h2>🌟 Appendix B — Best Resources</h2>'
            f'{t}<div class="box tip"><b>Rule of thumb:</b> 15–20 minutes a day beats 2 hours on Sunday. '
            'Use real things first (buttons, fruits), pictures next, numbers last. Praise effort, not speed. '
            'Names and websites change; search by the name shown.</div>'
            '<h2 style="margin-top:6mm">🎯 Five-minute daily games</h2><ol>'
            '<li><b>Number of the day:</b> one more, one less, 10 more, 10 less, tens and ones.</li>'
            '<li><b>Dice race:</b> roll two dice, add, then subtract the small from the big.</li>'
            '<li><b>Shop:</b> items cost 5, 10, 20 rupees — pay and find change.</li>'
            '<li><b>Skip-count walk:</b> take 2, 5 or 10 steps at a time up the stairs.</li>'
            '<li><b>Shape hunt:</b> find a cube, cylinder, cone and sphere in the kitchen.</li></ol></div>')
