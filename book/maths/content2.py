# Chapters 6-10: subtraction, mixed, word problems, tables, shapes
from lib import *


def ch6():
    c = Chapter(6, 'Subtraction', '➖', COLORS[5],
                ['take away objects and find what is left', 'find the difference between two groups',
                 'subtract 0 and subtract a number from itself', 'subtract 1-digit from 2-digit numbers'])
    c.h('Taking away')
    c.p('<b>Subtraction</b> means taking some away, or finding how many more or less. The sign is <b>−</b> (minus). '
        'The big number we start with is the <b>minuend</b>, the one we take away is the <b>subtrahend</b>, the answer is the <b>difference</b>.')
    c.raw('<div class="row em2">🍪🍪🍪🍪🍪🍪🍪 − ❌❌❌ &nbsp; <b>7 − 3 = 4</b></div>'
          '<div class="row sm">Cross out 3 cookies. 4 are left.</div>')
    c.raw(numline(0, 10, mark=4, hop=(7, 4)))
    c.p('Count back: start at <b>7</b>, hop back <b>3</b> → <b>4</b>.')
    c.remember('Any number − 0 = the same number (9 − 0 = 9). Any number − itself = 0 (6 − 6 = 0).')
    c.h('How many fewer? (difference)')
    c.p('Picture A has 9 books, picture B has 5. How many fewer? <b>9 − 5 = 4</b>.')
    c.h('Subtracting 2-digit numbers')
    c.p('Subtract the <b>ones</b> first, then the <b>tens</b>.')
    c.raw(vsum(48, 25, '−') + '<span style="font-size:15pt">&nbsp; 8 − 5 = 3 ones, 4 − 2 = 2 tens → <b>23</b></span>')
    c.ex('Cross out and subtract', 'Cross out and find what is left.', [
        (f'{a} − {b} = {{_}}', str(a - b)) for a, b in [(7,3),(8,4),(6,2),(9,4),(10,3),(10,8)]], cols=3)
    c.ex('Subtract', 'Find the difference.', [
        (f'{a} − {b} = {{_}}', str(a - b)) for a, b in [(7,2),(5,3),(9,6),(4,4),(8,0),(9,2),(5,5),(2,0),(9,9),(7,3)]], cols=5)
    c.ex('Tick or cross', 'Is the answer right? Write ✓ or ✗. If wrong, write the right answer.', [
        ('12 − 0 = 0', '✗ (12)'),('29 − 0 = 29', '✓'),('36 − 0 = 35', '✗ (36)'),('42 − 0 = 0', '✗ (42)'),
        ('88 − 0 = 87', '✗ (88)'),('93 − 0 = 93', '✓'),('50 − 0 = 50', '✓'),('70 − 0 = 0', '✗ (70)'),
        ('99 − 0 = 98', '✗ (99)'),('0 − 0 = 0', '✓')], cols=2)
    c.ex('Vertical subtraction', 'Ones first, then tens.', [
        (vsum(a, b, '−'), str(a - b)) for a, b in [(28,16),(36,12),(44,23),(69,14),(38,27),(49,35),(88,22),(96,33),(15,5),(27,14)]], cols=5)
    c.ex('Subtract from 10 and 20', 'Draw sticks and cross out if you need help.', [
        ('17 − 3 = {_}','14'),('20 − 7 = {_}','13'),('16 − 6 = {_}','10'),('19 − 9 = {_}','10'),('18 − 5 = {_}','13'),('12 − 4 = {_}','8')], cols=3)
    c.ex('How many fewer?', 'Picture A and Picture B. Find the difference.', [
        ('Books: A 5, B 9 → {_}','4'),('Blocks: A 10, B 7 → {_}','3'),('Toy cars: A 6, B 12 → {_}','6'),
        ('Pencils: A 8, B 15 → {_}','7')], cols=2)
    return c


def ch7():
    c = Chapter(7, 'Add and Subtract Together', '🔁', COLORS[6],
                ['see that addition and subtraction are partners', 'make a fact family from three numbers',
                 'do quick mental maths with 2, 5 and 10', 'choose + or − correctly'])
    c.h('Fact families')
    c.p('Three numbers can make <b>two additions</b> and <b>two subtractions</b>. Take the family <b>3, 4, 7</b>:')
    c.raw(table(['3 + 4 = 7','4 + 3 = 7','7 − 3 = 4','7 − 4 = 3'], [['➕','➕','➖','➖']]))
    c.remember('The <b>biggest</b> number is the one we start with in subtraction and the one we <b>get</b> in addition.')
    c.h('Mental maths')
    c.p('Adding or subtracting <b>10</b> only changes the <b>tens</b> digit: 45 + 10 = 55, 45 − 10 = 35.')
    c.ex('Fact family', 'Write 2 additions and 2 subtractions.', [
        ('2, 5, 7', '2+5=7, 5+2=7, 7−2=5, 7−5=2'),('4, 6, 10', '4+6=10, 6+4=10, 10−4=6, 10−6=4'),
        ('3, 8, 11', '3+8=11, 8+3=11, 11−3=8, 11−8=3')], cols=1)
    c.ex('Sum and difference puzzle', 'Numbers: 10, 20, 20, 30, 30, 40, 40, 50. Which two numbers have this sum and difference?', [
        ('Sum 30, difference 10 → {_} and {_}','20 and 10'),('Sum 70, difference 10 → {_} and {_}','40 and 30'),
        ('Sum 50, difference 10 → {_} and {_}','30 and 20'),('Sum 90, difference 10 → {_} and {_}','50 and 40')], cols=1)
    mix = [(16,'−',6),(40,'+',9),(9,'+',4),(62,'−',0),(10,'+',7),(7,'−',6),(71,'+',3),(16,'−',5),(20,'+',8),(59,'−',59)]
    c.ex('Plus or minus?', 'Look at the sign carefully.', [
        (f'{a} {o} {b} = {{_}}', str(a + b if o == '+' else a - b)) for a, o, b in mix], cols=5)
    c.ex('Write + or −', 'Which sign makes it true?', [
        ('8 {_} 2 = 6','−'),('4 {_} 5 = 9','+'),('9 {_} 3 = 6','−'),('7 {_} 7 = 14','+'),('10 {_} 4 = 6','−'),('6 {_} 3 = 9','+')], cols=3)
    c.ex('Jump by 10', 'Add or subtract 10.', [
        (f'{a} {o} 10 = {{_}}', str(a + 10 if o == '+' else a - 10)) for a, o in
        [(20,'+'),(50,'−'),(45,'+'),(70,'−'),(37,'+'),(99,'−'),(64,'−'),(77,'+')]], cols=4)
    c.ex('Missing number', 'Find the missing number.', [
        ('80 = 80 + {_}','0'),('54 = {_} + 4','50'),('{_} = 20 + 2','22'),('7 + {_} = 12','5'),('15 − {_} = 9','6'),('{_} − 4 = 11','15')], cols=3)
    return c


def ch8():
    c = Chapter(8, 'Story Problems', '📖', COLORS[7],
                ['read a story problem carefully', 'decide whether to add or subtract', 'write a number sentence',
                 'answer in a complete sentence'])
    c.h('Four steps to solve a story')
    c.raw(table(['1 Read 👀','2 Think 💭','3 Solve ✏️','4 Answer 💬'],
                [['Read it twice. What is asked?','Joining? → +<br>Taking away? → −','Write the number sentence','Write a sentence with the unit']]))
    c.p('<b>Clue words:</b> in all, altogether, total, more came → <b>+</b>. &nbsp; left, flew away, ate, gave away, fewer → <b>−</b>.')
    c.tryit('Sammy has 18 cupcakes. Tommy ate 6. How many are left? → "ate" means take away → 18 − 6 = <b>12</b>. '
            'Answer: <b>12 cupcakes are left.</b>')
    probs = [
        ('Sita made 3 sandwiches. Rita made 3 more. How many sandwiches in all?', '3 + 3 = 6'),
        ('Priya brought 8 paper cups. She lost 2. How many are left?', '8 − 2 = 6'),
        ('There are 17 aeroplanes. 5 are broken. How many are not broken?', '17 − 5 = 12'),
        ('There are 9 bugs. 9 more bugs came. How many bugs are there now?', '9 + 9 = 18'),
        ('Luisa caught 8 fish. She caught 9 more. How many fish in all?', '8 + 9 = 17'),
        ('There are 18 rabbits. 8 run away. How many are left?', '18 − 8 = 10'),
        ('Sita has 18 lollipops. She gives 7 to her sister. How many are left?', '18 − 7 = 11'),
        ('Lovely has 30 candies. Ritu takes 20. How many are left?', '30 − 20 = 10'),
        ('Polly has 25 balloons. 13 burst. How many are left?', '25 − 13 = 12'),
    ]
    c.ex('Story problems A', 'Write the number sentence and the answer.', [(q + ' → {_}', a) for q, a in probs[:5]], cols=1)
    c.ex('Story problems B', 'Write the number sentence and the answer.', [(q + ' → {_}', a) for q, a in probs[5:]], cols=1)
    more = [
        ('Tyler has 31 cookies and bakes 18 more. How many now?', '31 + 18 = 49'),
        ('Sara has 32 apples and buys 15 more. How many now?', '32 + 15 = 47'),
        ('Jake has 45 marbles and finds 12 more. How many in all?', '45 + 12 = 57'),
        ('Twinkle saw 17 butterflies. 5 flew away. How many are left?', '17 − 5 = 12'),
        ('Jai has 25 kites. His brother takes 13. How many are left with Jai?', '25 − 13 = 12'),
        ('Mother gave me 50 rupees. I spent 40 on dog food. How much is left?', '50 − 40 = 10'),
        ('Mayur read 32 pages and has 7 more to read. How many pages in the book?', '32 + 7 = 39'),
        ('I planted 5 saplings Monday, 3 Tuesday, 3 Wednesday. How many in all?', '5 + 3 + 3 = 11'),
        ('There are 9 cups on a table. 6 fell and broke. How many are left?', '9 − 6 = 3'),
    ]
    c.ex('Story problems C', 'Write the number sentence and the answer.', [(q + ' → {_}', a) for q, a in more], cols=1)
    c.ex('Write your own', 'Make a story for each number sentence and tell it to someone.', [
        ('5 + 4 = 9', 'any story that joins 5 and 4'), ('10 − 3 = 7', 'any story that takes 3 from 10')], cols=1)
    c.tip('Let the child act the story with toys first, then draw it, then write the numbers.')
    return c


def ch9():
    c = Chapter(9, 'Times Tables', '✖️', COLORS[8],
                ['understand multiplication as repeated addition', 'say tables of 2, 3, 4, 5, 6, 7, 8, 9 and 10',
                 'find "n times a number"'])
    c.h('Repeated addition')
    c.p('3 plates with 2 cakes each: 2 + 2 + 2 = 6. We write <b>3 × 2 = 6</b> and say <b>"3 times 2 is 6"</b>.')
    c.raw('<div class="row em2">🍰🍰 &nbsp; 🍰🍰 &nbsp; 🍰🍰</div>')
    c.remember('A <b>times table</b> is just a number added again and again: 5, 10, 15, 20 … is the table of 5.')
    def tbl(n): return table([f'Table of {n}'], [[f'{n} × {i} = {n*i}'] for i in range(1, 11)])
    c.raw('<div class="flex" style="align-items:flex-start">' + ''.join(tbl(n) for n in (2, 3, 4, 5)) + '</div>')
    c.raw('<div class="flex" style="align-items:flex-start">' + ''.join(tbl(n) for n in (6, 7, 8, 9)) + '</div>')
    c.p('Table of 10: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.')
    c.tip('Say tables as a rhythm. Learn 2, 5, 10 first, then 3, 4, then 6–9. Tables of 9: the tens digit goes up, the ones digit goes down!')
    c.ex('Repeated addition', 'Fill in.', [
        ('2 + 2 + 2 + 2 = {_} → 4 × 2 = {_}','8, 8'),('5 + 5 + 5 = {_} → 3 × 5 = {_}','15, 15'),
        ('10 + 10 = {_} → 2 × 10 = {_}','20, 20'),('3 + 3 + 3 + 3 = {_} → 4 × 3 = {_}','12, 12')], cols=1)
    import random
    c.ex('Dodging', 'Solve.', [(f'{a} × {b} = {{_}}', str(a * b)) for a, b in
         [(2,5),(3,4),(2,8),(5,3),(4,5),(6,4),(3,7),(6,8),(4,9),(10,7),(3,3),(6,10),(4,6),(6,7),(4,4),(5,5),(9,2),(8,3),(7,2),(9,5)]], cols=5)
    c.ex('"Times" words', 'Write the answer.', [
        ('3 times 3 = {_}','9'),('4 times 5 = {_}','20'),('2 times 6 = {_}','12'),('8 times 9 = {_}','72'),
        ('3 times 8 = {_}','24'),('5 times 4 = {_}','20'),('9 times 7 = {_}','63'),('7 times 7 = {_}','49')], cols=4)
    c.ex('Complete the table', 'Skip count to finish.', [
        ('Table of 6: 6, 12, {_}, 24, {_}','18, 30'),('Table of 7: 7, 14, {_}, 28, {_}','21, 35'),
        ('Table of 8: 8, 16, {_}, 32, {_}','24, 40'),('Table of 9: 9, 18, {_}, 36, {_}','27, 45')], cols=1)
    c.ex('Story', 'Solve.', [
        ('4 baskets with 5 mangoes each. How many mangoes? {_}','4 × 5 = 20'),
        ('There are 6 boxes with 3 pencils in each. How many pencils? {_}','6 × 3 = 18'),
        ('Each spider has 8 legs. How many legs do 2 spiders have? {_}','2 × 8 = 16')], cols=1)
    return c


def ch10():
    c = Chapter(10, 'Shapes Around Us', '🔷', COLORS[9],
                ['name flat (plane) shapes', 'name solid shapes', 'count sides and corners', 'find shapes in real things'])
    c.h('Plane (flat) shapes — 2D')
    c.raw(table(['Shape','Name','Sides','Corners','Looks like'],
                [['🔺','Triangle','3','3','roof, samosa'],['🟥','Square','4 (all equal)','4','window, chess board'],
                 ['▭','Rectangle','4 (opposite equal)','4','door, book'],['⭕','Circle','0 (curved)','0','clock, plate'],
                 ['🥚','Oval','0 (curved)','0','egg, mirror']]))
    c.h('Solid shapes — 3D')
    c.p('Solid shapes can be held. They take up space.')
    c.raw(table(['Shape','Name','Looks like','Can it roll?'],
                [['🎲','Cube','dice, ludo box','slides'],['📦','Cuboid','brick, matchbox','slides'],
                 ['🍦','Cone','ice-cream cone, party hat','rolls & slides'],['🥫','Cylinder','tin, pipe','rolls & slides'],
                 ['⚽','Sphere','ball, globe','rolls']]))
    c.remember('A flat shape has only length and breadth. A solid shape also has height.')
    c.ex('Name the shape', 'Write the name.', [
        ('🎲 → {_}','Cube'),('⚽ → {_}','Sphere'),('🥫 → {_}','Cylinder'),('🍦 → {_}','Cone'),('📦 → {_}','Cuboid'),
        ('🔺 → {_}','Triangle'),('⭕ → {_}','Circle'),('🟥 → {_}','Square')], cols=4)
    c.ex('Sides and corners', 'Fill in.', [
        ('A triangle has {_} sides.','3'),('A square has {_} corners.','4'),('A circle has {_} corners.','0'),
        ('A rectangle has {_} sides.','4')], cols=2)
    c.ex('Which shape?', 'Write the solid shape name.', [
        ('A football is a {_}.','sphere'),('A dice is a {_}.','cube'),('A birthday cap is a {_}.','cone'),
        ('A water pipe is a {_}.','cylinder'),('A brick is a {_}.','cuboid')], cols=1)
    c.ex('Count the shapes', 'Count and write.', [
        ('🔺🔺🔺 🟥🟥 ⭕ → triangles {_}, squares {_}, circles {_}','3, 2, 1'),
        ('⭕⭕⭕⭕ 🔺 🟥🟥🟥 → circles {_}, triangles {_}, squares {_}','4, 1, 3')], cols=1)
    c.fun('<b>🏠 Shape hunt:</b> Find one thing at home for each solid shape. Draw it and name it!')
    return c
