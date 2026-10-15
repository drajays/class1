# Chapters 1-5: numbers, place value, comparing, ordinals, addition
from lib import *

NAMES = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen',
         'fourteen','fifteen','sixteen','seventeen','eighteen','nineteen']
TENS = {2:'twenty',3:'thirty',4:'forty',5:'fifty',6:'sixty',7:'seventy',8:'eighty',9:'ninety'}
def name(n):
    if n < 20: return NAMES[n]
    if n == 100: return 'one hundred'
    t, o = divmod(n, 10)
    return TENS[t] + (' ' + NAMES[o] if o else '')


def ch1():
    c = Chapter(1, 'Numbers 1 to 100', '🔢', COLORS[0],
                ['digits, numbers and number names', 'count forward and backward up to 100',
                 'find numbers before, after and between', 'skip count by 2s, 5s and 10s', 'tell even and odd numbers'])
    c.h('Digits, numbers and numerals')
    c.p('A <b>digit</b> is one little symbol. There are only <b>10 digits</b>: <b>0 1 2 3 4 5 6 7 8 9</b>. '
        'We join digits to make bigger <b>numbers</b>. The way we write a number with digits (like <b>47</b>) is its <b>numeral</b>.')
    c.raw(table(['Digit','Number with one digit','Number with two digits'],
                [['7','7','73'],['4','4','48'],['9','9','95']]))
    c.remember('Counting numbers go: 1, 2, 3 … 10, 11, 12 … 99, 100. Every number has a place in the line and a name!')
    c.h('The hundred chart')
    c.raw(hundred_chart())
    c.tip('Point to a number and ask: "What is one more? One less? What is 10 more?" Moving down one row always adds 10.')
    c.h('Number names')
    c.raw(table(['0–9','10–19','Tens'],
                [[', '.join(f'{i} {NAMES[i]}' for i in range(0,10)),
                  ', '.join(f'{i} {NAMES[i]}' for i in range(10,20)),
                  ', '.join(f'{t*10} {TENS[t]}' for t in range(2,10))+', 100 one hundred']]))
    c.p('To write a number name like <b>47</b>: say the tens word, then the ones word → <b>forty seven</b>.')
    c.h('Before, after, between')
    c.p('The number just <b>before</b> 8 is 7 (one less). The number just <b>after</b> 8 is 9 (one more). '
        'The number <b>between</b> 7 and 9 is 8.')
    c.raw(numline(5, 12, mark=8))
    c.h('Skip counting')
    c.p('Instead of counting 1 by 1, we can <b>jump</b>. Jumps of 2: 2, 4, 6, 8, 10. Jumps of 5: 5, 10, 15, 20. Jumps of 10: 10, 20, 30, 40.')
    c.raw(numline(0, 10, hop=(0, 2)))
    c.h('Even and odd numbers')
    c.p('Make pairs. If nobody is left alone the number is <b>even</b> (2, 4, 6, 8, 10). If one is left out it is <b>odd</b> (1, 3, 5, 7, 9).')
    c.raw('<div class="row">6 → ' + '🧒🧒 '*3 + ' <b>even</b> &nbsp;&nbsp; 7 → ' + '🧒🧒 '*3 + '🧒 <b>odd</b></div>')
    c.remember('Look at the <b>ones digit</b>: 0, 2, 4, 6, 8 → even.  1, 3, 5, 7, 9 → odd.')

    c.ex('Fill the missing numbers', 'Write the number that is missing.', [
        ('3, 4, {_}, 6, {_}', '5, 7'), ('17, {_}, 19, 20', '18'), ('45, 46, {_}, 48', '47'),
        ('68, {_}, 70, 71', '69'), ('96, 97, {_}, 99, {_}', '98, 100'), ('34, 33, 32, {_}, 30', '31'),
        ('50, 49, {_}, 47, {_}', '48, 46'), ('81, {_}, 83, {_}, 85', '82, 84')], cols=2)
    c.ex('Before, after, between', 'Write the correct number.', [
        ('Just after 49 is {_}', '50'), ('Just before 75 is {_}', '74'), ('Between 38 and 40 is {_}', '39'),
        ('One more than 59 is {_}', '60'), ('One less than 20 is {_}', '19'), ('Just after 32 is {_}', '33'),
        ('10 more than 87 is {_}', '97'), ('One less than 31 is {_}', '30')], cols=2)
    c.ex('Number names', 'Write the numeral for the name.', [
        ('fifteen = {_}','15'),('thirty = {_}','30'),('fifty five = {_}','55'),('seventy eight = {_}','78'),
        ('twenty nine = {_}','29'),('ninety = {_}','90')], cols=3)
    c.ex('Write the name', 'Write the number name.', [
        (f'{n} = {{_}}', name(n)) for n in (12, 27, 43, 60, 85, 99)], cols=2)
    c.ex('Skip counting', 'Keep jumping!', [
        ('2, 4, {_}, {_}, 10', '6, 8'), ('5, 10, {_}, {_}, 25', '15, 20'), ('10, 20, {_}, {_}, 50', '30, 40'),
        ('29, 31, {_}, 35', '33'), ('69, 71, {_}, 75', '73'), ('12, 14, {_}, {_}, 20', '16, 18')], cols=2)
    c.ex('Unscramble the number', 'Put the letters in order to make a number name, then write the number.', [
        ('<i>ent</i> → {_} = {_}', 'ten = 10'), ('<i>ni en yt</i> → {_} = {_}', 'ninety = 90'),
        ('<i>rity ht</i> → {_} = {_}', 'thirty = 30'), ('<i>ven se yt</i> → {_} = {_}', 'seventy = 70')], cols=1)
    c.ex('Even or odd?', 'Write E for even and O for odd.', [
        (f'{n} → {{_}}', 'E' if n % 2 == 0 else 'O') for n in (12, 17, 20, 33, 48, 95)], cols=3)
    c.fun('<b>🧩 Think!</b> I am a two-digit number. I have <b>0</b> in the ones place and <b>5</b> in the tens place. Who am I? → <b>50</b>')
    return c


def ch2():
    c = Chapter(2, 'Place Value: Tens and Ones', '🧱', COLORS[1],
                ['make a group of ten', 'say how many tens and ones are in a number',
                 'write numbers in expanded form (40 + 5)', 'build a number from tens and ones'])
    c.h('Ten ones make one ten')
    c.p('When we have 10 loose sticks, we tie them into <b>one bundle</b> — that is <b>1 ten</b>. '
        'The sticks left over are the <b>ones</b>.')
    c.raw(f'<div class="row"><b>26</b> &nbsp; {tens_ones(26)} &nbsp; = 2 tens + 6 ones = <b>20 + 6</b></div>')
    c.raw(f'<div class="row"><b>43</b> &nbsp; {tens_ones(43)} &nbsp; = 4 tens + 3 ones = <b>40 + 3</b></div>')
    c.raw(table(['Number','Tens (T)','Ones (O)','Expanded form'],
                [['14','1','4','10 + 4'],['35','3','5','30 + 5'],['60','6','0','60 + 0'],['99','9','9','90 + 9']]))
    c.remember('In <b>47</b>: the 4 is in the <b>tens</b> place (it means 40). The 7 is in the <b>ones</b> place (it means 7). '
               'The <b>place value</b> of 4 is 40, of 7 is 7.')
    c.tip('Use real bundles of ice-cream sticks or straws with rubber bands. Let the child make 2-digit numbers physically before writing them.')
    c.ex('Tens and ones', 'How many tens and how many ones?', [
        (f'{n} → {{_}} tens, {{_}} ones', f'{n//10} tens, {n%10} ones') for n in (19, 27, 34, 56, 70, 88)], cols=2)
    c.ex('Make the number', 'Write the number.', [
        ('6 tens and 7 ones = {_}','67'),('1 ten and 7 ones = {_}','17'),('9 tens and 9 ones = {_}','99'),
        ('8 tens = {_}','80'),('1 one = {_}','1'),('3 tens and 0 ones = {_}','30'),
        ('7 tens and 2 ones = {_}','72'),('4 tens and 8 ones = {_}','48')], cols=2)
    c.ex('Expanded form', 'Write as tens + ones.', [
        ('72 = {_} + {_}','70 + 2'),('65 = {_} + {_}','60 + 5'),('19 = {_} + {_}','10 + 9'),
        ('45 = {_} + {_}','40 + 5'),('38 = {_} + {_}','30 + 8'),('50 = {_} + {_}','50 + 0')], cols=2)
    c.ex('Back to the number', 'Write the number for the expanded form.', [
        ('60 + 4 = {_}','64'),('30 + 9 = {_}','39'),('50 + 0 = {_}','50'),('20 + 2 = {_}','22'),
        ('80 + 8 = {_}','88'),('10 + 9 = {_}','19')], cols=3)
    c.ex('Match', 'Draw a line to match the number with its expanded form. (Write the letter.)', [
        ('74 = {_}   (a) 70 + 4   (b) 40 + 7','a: 70 + 4'),('35 = {_}   (a) 30 + 5   (b) 50 + 3','a: 30 + 5'),
        ('29 = {_}   (a) 90 + 2   (b) 20 + 9','b: 20 + 9'),('61 = {_}   (a) 10 + 6   (b) 60 + 1','b: 60 + 1')], cols=1)
    c.ex('Fill the table', 'Complete the table.', [
        ('Number {_}, name <i>fourteen</i>, 10 + 4','14'),('65, name {_}, {_} + 5','sixty five, 60'),
        ('12, name <i>twelve</i>, 1 ten and {_} ones','2'),('Number {_}, 50 + 0','50')], cols=1)
    c.fun('<b>🧩 Think!</b> The number has 2 in the tens place and its ones digit is 4 more than 4. → <b>28</b>. '
          'Biggest 2-digit number: <b>99</b>. Smallest: <b>10</b>.')
    return c


def ch3():
    c = Chapter(3, 'Comparing and Ordering', '⚖️', COLORS[2],
                ['say which number is bigger or smaller', 'use the signs &gt;, &lt; and =',
                 'arrange numbers in ascending and descending order', 'make the biggest and smallest number from digits'])
    c.h('Which is more?')
    c.p('First look at the <b>tens</b>. The number with more tens is bigger. If tens are the same, look at the <b>ones</b>.')
    c.raw('<div class="row"><b>47</b> and <b>39</b>: tens 4 &gt; 3, so <b>47 &gt; 39</b>.</div>'
          '<div class="row"><b>52</b> and <b>58</b>: tens same (5), ones 2 &lt; 8, so <b>52 &lt; 58</b>.</div>')
    c.remember('The hungry crocodile 🐊 always opens its mouth to eat the <b>bigger</b> number.  '
               '<b>&gt;</b> greater than &nbsp; <b>&lt;</b> less than &nbsp; <b>=</b> equal to')
    c.h('Ascending and descending')
    c.p('<b>Ascending</b> = going up 🪜 smallest → biggest: 12, 25, 40, 71.<br><b>Descending</b> = going down 🛝 biggest → smallest: 71, 40, 25, 12.')
    pairs = [(91,89),(76,51),(38,68),(24,42),(31,13),(67,28)]
    c.ex('Circle the bigger', 'Which number is bigger? Write it.', [
        (f'{a} or {b} → {{_}}', str(max(a, b))) for a, b in pairs], cols=3)
    pairs2 = [(63,17),(43,47),(19,14),(47,74),(93,92),(29,64)]
    c.ex('Circle the smaller', 'Which number is smaller? Write it.', [
        (f'{a} or {b} → {{_}}', str(min(a, b))) for a, b in pairs2], cols=3)
    sg = [(51,51),(99,91),(47,14),(48,68),(31,60),(12,9),(40+5,75)]
    c.ex('Put &gt;, &lt; or =', 'Write the correct sign in the blank.', [
        (f'{a} {{_}} {b}', '>' if a > b else '<' if a < b else '=') for a, b in sg], cols=3)
    c.ex('Put in order', 'Write in the order asked.', [
        ('Ascending: 45, 12, 78, 30 → {_}', '12, 30, 45, 78'),
        ('Ascending: 9, 99, 19, 91 → {_}', '9, 19, 91, 99'),
        ('Descending: 23, 67, 41, 8 → {_}', '67, 41, 23, 8'),
        ('Descending: 17, 71, 74, 27 → {_}', '74, 71, 27, 17')], cols=1)
    digs = [(3,4),(6,7),(1,9),(8,6),(5,2),(9,4)]
    c.ex('Biggest and smallest', 'Make the biggest and the smallest 2-digit number using both digits.', [
        (f'Digits {a}, {b} → biggest {{_}}, smallest {{_}}', f'{max(a,b)}{min(a,b)}, {min(a,b)}{max(a,b)}') for a, b in digs], cols=2)
    c.ex('Choose the right number', 'Pick the correct number.', [
        ('Greater than 90 but smaller than 100: (a) 89 (b) 92 (c) 77', 'b) 92'),
        ('Greater than 45 but smaller than 73: (a) 88 (b) 40 (c) 62', 'c) 62'),
        ('Greatest: (a) 62 (b) 58 (c) 47 (d) 84', 'd) 84'),
        ('Smallest: (a) 14 (b) 81 (c) 8 (d) 41', 'c) 8'),
        ('Greater than 23 but smaller than 40: (a) 30 (b) 15 (c) 62', 'a) 30')], cols=1)
    c.tip('Play "Higher or Lower": show two cards 10–99; child says which is bigger and why (tens first!).')
    return c


def ch4():
    c = Chapter(4, 'Ordinal Numbers', '🏅', COLORS[3],
                ['tell the difference between counting and position numbers', 'read and write 1st to 10th',
                 'use first, second, third… for position of people, things, days and months'])
    c.h('Counting numbers and position numbers')
    c.p('<b>Cardinal numbers</b> tell <i>how many</i>: 1, 2, 3 … <br><b>Ordinal numbers</b> tell the <i>position</i> or rank: 1st, 2nd, 3rd …')
    c.raw(table(['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th'],
                [['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth']]))
    c.raw('<div class="row em2">🐻 🐘 🐥 🐒 🐢 🐇</div>'
          '<div class="row">Ben Bear is <b>1st</b>, Ernie Elephant <b>2nd</b>, Charlie Chick <b>3rd</b>, Abe Ape <b>4th</b>, Tom Tortoise <b>5th</b>, Rabbit <b>6th</b>.</div>')
    c.remember('Ordinals ending: 1<b>st</b>, 2<b>nd</b>, 3<b>rd</b>, then <b>th</b> for 4th to 10th.')
    c.h('Days and months have positions too')
    c.p('Monday is the <b>1st</b> day of the week, Tuesday the <b>2nd</b> … Sunday the <b>7th</b>. January is the <b>1st</b> month, February the <b>2nd</b> …')
    days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    c.ex('Days of the week', 'Start with Monday as the 1st day. Write the day.', [
        (f'{{_}} is the {i}{["st","nd","rd"][i-1] if i<4 else "th"} day of the week.', d) for i, d in enumerate(days, 1)], cols=1)
    c.ex('The animal race', 'Ben Bear came first, Ernie Elephant second, Charlie Chick third, Abe Ape fourth.', [
        ('Who came 2nd? {_}','Ernie Elephant'),('Who came 4th? {_}','Abe Ape'),('Charlie Chick came {_}','3rd'),
        ('Who came 1st? {_}','Ben Bear')], cols=2)
    c.ex('Children in a line', '🧒 Ryan (1st) 👧 Tony 👦 Tom 👧 Mindy 👦 Lou 👧 Eric 👦 Suzy 👧 Jim 👦 Mary 🧒 Ann', [
        ('Who is in the 3rd place? {_}','Tom'),('Mindy is in the {_} place','4th'),
        ('Who is in the 10th place? {_}','Ann'),('If Tony and Tom leave the line, Mindy will be {_}','2nd')], cols=1)
    c.ex('Months', 'Write the month.', [
        ('The 1st month is {_}','January'),('February is the {_} month','2nd'),('The 5th month is {_}','May'),
        ('{_} comes between January and March','February'),('The 12th month is {_}','December')], cols=1)
    c.fun('<b>🎮 Game:</b> Line up 5 toys. Ask "Which toy is 3rd?" Then swap two toys and ask again!')
    return c


def ch5():
    c = Chapter(5, 'Addition', '➕', COLORS[4],
                ['join groups to find the total (sum)', 'know number bonds up to 10', 'add 1-digit and 2-digit numbers',
                 'know that order does not change the sum', 'add three small numbers'])
    c.h('Putting things together')
    c.p('<b>Addition</b> means joining two or more groups to find <b>how many in all</b>. We use the sign <b>+</b> (plus). '
        'The numbers we add are <b>addends</b>. The answer is the <b>sum</b>.')
    c.raw('<div class="row em2">🍎🍎🍎 + 🍎🍎 = 🍎🍎🍎🍎🍎 &nbsp; <b>3 + 2 = 5</b></div>')
    c.raw(numline(0, 10, mark=5, hop=(3, 5)))
    c.p('Count on: start at <b>3</b>, hop <b>2</b> more → <b>5</b>.')
    c.h('Number bonds')
    c.p('Two numbers that join to make a number are a <b>number bond</b>. Number bonds of 5: 0+5, 1+4, 2+3, 3+2, 4+1, 5+0.')
    c.raw(table(['Bonds of 10','','','','',''], [['0+10','1+9','2+8','3+7','4+6','5+5']]))
    c.h('Adding 2-digit numbers')
    c.p('Add the <b>ones</b> first, then the <b>tens</b>.')
    c.raw(vsum(24, 3) + '<span style="font-size:15pt">&nbsp; 4 + 3 = 7 ones, 2 tens stay 2 → <b>27</b></span>')
    c.remember('Order does not matter: <b>5 + 3 = 3 + 5 = 8</b>. And adding 0 changes nothing: 9 + 0 = 9.')
    c.ex('Number bonds', 'Write the missing number.', [
        (f'{a} + {{_}} = {t}', str(t - a)) for a, t in [(2,5),(4,5),(3,7),(6,10),(8,10),(1,9),(7,10),(5,9),(0,8)]], cols=3)
    c.ex('Add the numbers', 'Find the sum.', [
        (f'{a} + {b} = {{_}}', str(a + b)) for a, b in [(2,0),(5,3),(6,2),(4,8),(8,1),(7,2),(5,5),(8,10),(0,5),(7,3)]], cols=5)
    c.ex('Count on 2, 5 and 10', 'Mental maths.', [
        (f'{a} + {b} = {{_}}', str(a + b)) for a, b in [(22,2),(48,2),(34,2),(18,2),(15,5),(35,5),(95,5),(20,10),(45,10),(68,10)]], cols=5)
    c.ex('Vertical addition', 'Add the ones, then the tens.', [
        (vsum(a, b), str(a + b)) for a, b in [(17,2),(42,4),(60,3),(35,4),(18,9),(77,10),(51,6),(26,3),(34,5),(53,13)]], cols=5)
    c.ex('Change the order', 'Write the same sum the other way round.', [
        ('5 + 3 = {_} + {_}', '3 + 5'),('19 + 7 = {_} + 19','7'),('4 + 8 = {_} + 4','8'),('10 + 6 = 6 + {_}','10')], cols=2)
    c.ex('Add three numbers', 'First add two, then add the third.', [
        (f'{a} + {b} + {d} = {{_}}', str(a+b+d)) for a, b, d in [(3,5,1),(4,6,3),(7,1,4),(5,1,6),(5,2,4),(7,4,2)]], cols=3)
    c.ex('Make 10', 'Draw more to make 10. Write the missing number.', [
        (f'{"⚫"*a}{"⚪"*(10-a)} → {a} + {{_}} = 10', str(10-a)) for a in (2, 4, 6, 7, 9)], cols=1)
    c.tip('Use a ten-frame or 10 buttons. Cover some and ask "how many are hiding?" — this builds number bonds fast.')
    return c
