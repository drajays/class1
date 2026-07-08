#!/usr/bin/env python3
"""
generate_math_challenge.py — Generates docs/data/math_challenge_book.json
Contains 10 Class 2–3 stretch chapters with prerequisites linking back to math_book topics.
Expanded to 7 problems per chapter (70 total problems) with verified step-by-step solutions.
"""

import json
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(ROOT, "docs", "data")

def main():
    chapters = [
        {
            "id": "mc_add_carry",
            "title": "2-Digit Addition with Carry",
            "icon": "➕",
            "level": 3,
            "reqTopic": "add_sub",
            "reqTitle": "Addition & Subtraction",
            "concept": {
                "intro": [
                    "When numbers in the ones column add up to 10 or more, we carry!",
                    "First add the ones, then carry the 1 ten over to the tens column."
                ],
                "tip": "Always start adding from the ones place!"
            },
            "problems": [
                {
                    "skill": "pick",
                    "q": "What is 28 + 15?",
                    "options": ["43", "33", "45"],
                    "a": "43",
                    "why": "8 + 5 = 13 (3 ones, carry 1 ten). Tens: 2 + 1 + 1 (carried) = 4 tens. Total = 43!"
                },
                {
                    "skill": "pick",
                    "q": "What is 36 + 27?",
                    "options": ["63", "53", "65"],
                    "a": "63",
                    "why": "6 + 7 = 13 (3 ones, carry 1 ten). Tens: 3 + 2 + 1 = 6 tens. Total = 63!"
                },
                {
                    "skill": "pick",
                    "q": "What is 49 + 34?",
                    "options": ["83", "73", "85"],
                    "a": "83",
                    "why": "9 + 4 = 13 (3 ones, carry 1 ten). Tens: 4 + 3 + 1 = 8 tens. Total = 83!"
                },
                {
                    "skill": "pick",
                    "q": "What is 58 + 26?",
                    "options": ["84", "74", "86"],
                    "a": "84",
                    "why": "8 + 6 = 14 (4 ones, carry 1 ten). Tens: 5 + 2 + 1 = 8 tens. Total = 84!"
                },
                {
                    "skill": "pick",
                    "q": "What is 37 + 48?",
                    "options": ["85", "75", "87"],
                    "a": "85",
                    "why": "7 + 8 = 15 (5 ones, carry 1 ten). Tens: 3 + 4 + 1 = 8 tens. Total = 85!"
                },
                {
                    "skill": "pick",
                    "q": "What is 64 + 19?",
                    "options": ["83", "73", "85"],
                    "a": "83",
                    "why": "4 + 9 = 13 (3 ones, carry 1 ten). Tens: 6 + 1 + 1 = 8 tens. Total = 83!"
                },
                {
                    "skill": "pick",
                    "q": "What is 45 + 37?",
                    "options": ["82", "72", "84"],
                    "a": "82",
                    "why": "5 + 7 = 12 (2 ones, carry 1 ten). Tens: 4 + 3 + 1 = 8 tens. Total = 82!"
                }
            ]
        },
        {
            "id": "mc_sub_borrow",
            "title": "2-Digit Borrow Subtraction",
            "icon": "➖",
            "level": 3,
            "reqTopic": "add_sub",
            "reqTitle": "Addition & Subtraction",
            "concept": {
                "intro": [
                    "If the top number in the ones place is smaller than the bottom number, we borrow!",
                    "Borrow 1 ten from the tens column and turn it into 10 ones."
                ],
                "tip": "More on the floor? Go next door and get 10 more!"
            },
            "problems": [
                {
                    "skill": "pick",
                    "q": "What is 52 - 18?",
                    "options": ["34", "44", "36"],
                    "a": "34",
                    "why": "Borrow 1 ten: 12 - 8 = 4 ones. Tens left: 4 - 1 = 3 tens. Total = 34!"
                },
                {
                    "skill": "pick",
                    "q": "What is 65 - 29?",
                    "options": ["36", "46", "38"],
                    "a": "36",
                    "why": "Borrow 1 ten: 15 - 9 = 6 ones. Tens left: 5 - 2 = 3 tens. Total = 36!"
                },
                {
                    "skill": "pick",
                    "q": "What is 81 - 45?",
                    "options": ["36", "46", "26"],
                    "a": "36",
                    "why": "Borrow 1 ten: 11 - 5 = 6 ones. Tens left: 7 - 4 = 3 tens. Total = 36!"
                },
                {
                    "skill": "pick",
                    "q": "What is 73 - 27?",
                    "options": ["46", "56", "44"],
                    "a": "46",
                    "why": "Borrow 1 ten: 13 - 7 = 6 ones. Tens left: 6 - 2 = 4 tens. Total = 46!"
                },
                {
                    "skill": "pick",
                    "q": "What is 94 - 38?",
                    "options": ["56", "66", "54"],
                    "a": "56",
                    "why": "Borrow 1 ten: 14 - 8 = 6 ones. Tens left: 8 - 3 = 5 tens. Total = 56!"
                },
                {
                    "skill": "pick",
                    "q": "What is 60 - 25?",
                    "options": ["35", "45", "25"],
                    "a": "35",
                    "why": "Borrow 1 ten: 10 - 5 = 5 ones. Tens left: 5 - 2 = 3 tens. Total = 35!"
                },
                {
                    "skill": "pick",
                    "q": "What is 82 - 47?",
                    "options": ["35", "45", "37"],
                    "a": "35",
                    "why": "Borrow 1 ten: 12 - 7 = 5 ones. Tens left: 7 - 4 = 3 tens. Total = 35!"
                }
            ]
        },
        {
            "id": "mc_mult_intro",
            "title": "Intro to Multiplication ×",
            "icon": "✖️",
            "level": 4,
            "reqTopic": "tables",
            "reqTitle": "Multiplication Tables",
            "concept": {
                "intro": [
                    "Multiplication is fast repeated addition!",
                    "3 × 4 means 3 groups of 4: 4 + 4 + 4 = 12."
                ],
                "tip": "Use your tables to multiply quickly!"
            },
            "problems": [
                {
                    "skill": "pick",
                    "q": "What is 6 × 4?",
                    "options": ["24", "20", "28"],
                    "a": "24",
                    "why": "6 groups of 4 is 4 + 4 + 4 + 4 + 4 + 4 = 24!"
                },
                {
                    "skill": "pick",
                    "q": "What is 7 × 5?",
                    "options": ["35", "30", "40"],
                    "a": "35",
                    "why": "Count by 5s seven times: 5, 10, 15, 20, 25, 30, 35!"
                },
                {
                    "skill": "pick",
                    "q": "What is 8 × 3?",
                    "options": ["24", "21", "27"],
                    "a": "24",
                    "why": "8 groups of 3 = 24!"
                },
                {
                    "skill": "pick",
                    "q": "What is 9 × 4?",
                    "options": ["36", "32", "40"],
                    "a": "36",
                    "why": "9 groups of 4 = 36!"
                },
                {
                    "skill": "pick",
                    "q": "What is 7 × 3?",
                    "options": ["21", "18", "24"],
                    "a": "21",
                    "why": "7 groups of 3 = 21!"
                },
                {
                    "skill": "pick",
                    "q": "What is 8 × 5?",
                    "options": ["40", "35", "45"],
                    "a": "40",
                    "why": "8 groups of 5 = 40!"
                },
                {
                    "skill": "pick",
                    "q": "What is 6 × 6?",
                    "options": ["36", "30", "42"],
                    "a": "36",
                    "why": "6 groups of 6 = 36!"
                }
            ]
        },
        {
            "id": "mc_div_intro",
            "title": "Intro to Division ÷",
            "icon": "➗",
            "level": 4,
            "reqTopic": "tables",
            "reqTitle": "Multiplication Tables",
            "concept": {
                "intro": [
                    "Division means sharing equally!",
                    "12 ÷ 3 asks: if 12 puppies are shared into 3 groups, how many in each group?"
                ],
                "tip": "Division is the reverse of multiplication!"
            },
            "problems": [
                {
                    "skill": "pick",
                    "q": "What is 15 ÷ 3?",
                    "options": ["5", "4", "6"],
                    "a": "5",
                    "why": "Because 3 × 5 = 15, sharing 15 into 3 equal groups gives 5!"
                },
                {
                    "skill": "pick",
                    "q": "What is 20 ÷ 4?",
                    "options": ["5", "4", "6"],
                    "a": "5",
                    "why": "Because 4 × 5 = 20, sharing 20 into 4 equal groups gives 5!"
                },
                {
                    "skill": "pick",
                    "q": "What is 18 ÷ 2?",
                    "options": ["9", "8", "7"],
                    "a": "9",
                    "why": "Sharing 18 equally between 2 gives 9 each!"
                },
                {
                    "skill": "pick",
                    "q": "What is 24 ÷ 6?",
                    "options": ["4", "3", "5"],
                    "a": "4",
                    "why": "Because 6 × 4 = 24, 24 ÷ 6 = 4!"
                },
                {
                    "skill": "pick",
                    "q": "What is 30 ÷ 5?",
                    "options": ["6", "5", "7"],
                    "a": "6",
                    "why": "Because 5 × 6 = 30, 30 ÷ 5 = 6!"
                },
                {
                    "skill": "pick",
                    "q": "What is 28 ÷ 4?",
                    "options": ["7", "6", "8"],
                    "a": "7",
                    "why": "Because 4 × 7 = 28, 28 ÷ 4 = 7!"
                },
                {
                    "skill": "pick",
                    "q": "What is 36 ÷ 6?",
                    "options": ["6", "7", "5"],
                    "a": "6",
                    "why": "Because 6 × 6 = 36, 36 ÷ 6 = 6!"
                }
            ]
        },
        {
            "id": "mc_place_value_hundreds",
            "title": "3-Digit Place Value",
            "icon": "💯",
            "level": 3,
            "reqTopic": "place_value",
            "reqTitle": "Place Value",
            "concept": {
                "intro": [
                    "Numbers can have Hundreds, Tens, and Ones!",
                    "In 345: 3 is hundreds (300), 4 is tens (40), and 5 is ones."
                ],
                "tip": "Hundreds place is the third digit from the right!"
            },
            "problems": [
                {
                    "skill": "pick",
                    "q": "In the number 482, what is the value of digit 4?",
                    "options": ["400", "40", "4"],
                    "a": "400",
                    "why": "4 is in the hundreds place, so its value is 4 hundreds = 400!"
                },
                {
                    "skill": "pick",
                    "q": "Which number has 5 hundreds, 2 tens, and 7 ones?",
                    "options": ["527", "257", "725"],
                    "a": "527",
                    "why": "500 + 20 + 7 = 527!"
                },
                {
                    "skill": "pick",
                    "q": "What is 300 + 60 + 9?",
                    "options": ["369", "396", "639"],
                    "a": "369",
                    "why": "Combining 3 hundreds, 6 tens, and 9 ones gives 369!"
                },
                {
                    "skill": "pick",
                    "q": "In the number 739, what is the value of digit 3?",
                    "options": ["30", "300", "3"],
                    "a": "30",
                    "why": "3 is in the tens place, so its value is 30!"
                },
                {
                    "skill": "pick",
                    "q": "Which number is 8 hundreds + 0 tens + 4 ones?",
                    "options": ["804", "840", "408"],
                    "a": "804",
                    "why": "800 + 0 + 4 = 804!"
                },
                {
                    "skill": "pick",
                    "q": "What is the expanded form of 651?",
                    "options": ["600 + 50 + 1", "60 + 50 + 1", "600 + 5 + 1"],
                    "a": "600 + 50 + 1",
                    "why": "6 hundreds (600) + 5 tens (50) + 1 one = 600 + 50 + 1!"
                },
                {
                    "skill": "pick",
                    "q": "Which number is larger: 542 or 524?",
                    "options": ["542", "524", "They are equal"],
                    "a": "542",
                    "why": "Both have 5 hundreds, but 542 has 4 tens while 524 only has 2 tens!"
                }
            ]
        },
        {
            "id": "mc_money_shopping",
            "title": "Mall Money Word Problems",
            "icon": "🪙",
            "level": 4,
            "reqTopic": "money",
            "reqTitle": "Money & Shopping",
            "concept": {
                "intro": [
                    "Solve shopping problems by adding or subtracting prices!",
                    "Check how much money you have and how much change you get back."
                ],
                "tip": "Change = Money given - Total cost!"
            },
            "problems": [
                {
                    "skill": "pick",
                    "q": "Simba buys a bone for ₹25 and a ball for ₹15. How much does he spend in total?",
                    "options": ["₹40", "₹35", "₹45"],
                    "a": "₹40",
                    "why": "25 + 15 = ₹40 total!"
                },
                {
                    "skill": "pick",
                    "q": "Mufasa has ₹50. He buys a toy for ₹32. How much money is left?",
                    "options": ["₹18", "₹28", "₹12"],
                    "a": "₹18",
                    "why": "50 - 32 = ₹18 left!"
                },
                {
                    "skill": "pick",
                    "q": "Golu buys 3 puppy biscuits that cost ₹10 each. What is the total cost?",
                    "options": ["₹30", "₹20", "₹40"],
                    "a": "₹30",
                    "why": "3 × ₹10 = ₹30!"
                },
                {
                    "skill": "pick",
                    "q": "Whity has ₹100. She spends ₹65 on a chew rope. How much change does she get?",
                    "options": ["₹35", "₹45", "₹25"],
                    "a": "₹35",
                    "why": "100 - 65 = ₹35 change!"
                },
                {
                    "skill": "pick",
                    "q": "A collar costs ₹45 and a bowl costs ₹38. What is the total cost?",
                    "options": ["₹83", "₹73", "₹85"],
                    "a": "₹83",
                    "why": "45 + 38 = ₹83 total!"
                },
                {
                    "skill": "pick",
                    "q": "Advaita gives ₹50 for a book that costs ₹41. How much change should she get?",
                    "options": ["₹9", "₹11", "₹8"],
                    "a": "₹9",
                    "why": "50 - 41 = ₹9 change!"
                },
                {
                    "skill": "pick",
                    "q": "If one dog treat costs ₹12, how much do 4 treats cost?",
                    "options": ["₹48", "₹36", "₹52"],
                    "a": "₹48",
                    "why": "12 × 4 = ₹48!"
                }
            ]
        },
        {
            "id": "mc_time_calendar",
            "title": "Time & Calendar Challenge",
            "icon": "⏰",
            "level": 4,
            "reqTopic": "time",
            "reqTitle": "Time & Calendar",
            "concept": {
                "intro": [
                    "There are 60 minutes in an hour and 7 days in a week!",
                    "Let us calculate elapsed time and calendar dates."
                ],
                "tip": "Half an hour is 30 minutes!"
            },
            "problems": [
                {
                    "skill": "pick",
                    "q": "Puppy school starts at 9:00 AM and lasts 2 hours. What time does it end?",
                    "options": ["11:00 AM", "10:00 AM", "12:00 PM"],
                    "a": "11:00 AM",
                    "why": "9 + 2 = 11:00 AM!"
                },
                {
                    "skill": "pick",
                    "q": "How many minutes are there in half an hour?",
                    "options": ["30 minutes", "60 minutes", "15 minutes"],
                    "a": "30 minutes",
                    "why": "1 hour is 60 minutes, so half an hour is 30 minutes!"
                },
                {
                    "skill": "pick",
                    "q": "If today is Wednesday, what day will it be in 3 days?",
                    "options": ["Saturday", "Friday", "Sunday"],
                    "a": "Saturday",
                    "why": "1 day = Thursday, 2 days = Friday, 3 days = Saturday!"
                },
                {
                    "skill": "pick",
                    "q": "How many months in a year have 31 days?",
                    "options": ["7 months", "6 months", "5 months"],
                    "a": "7 months",
                    "why": "Jan, Mar, May, Jul, Aug, Oct, and Dec have 31 days (7 months)!"
                },
                {
                    "skill": "pick",
                    "q": "A cartoon starts at 4:15 PM and ends at 4:45 PM. How long was the cartoon?",
                    "options": ["30 minutes", "15 minutes", "45 minutes"],
                    "a": "30 minutes",
                    "why": "45 - 15 = 30 minutes long!"
                },
                {
                    "skill": "pick",
                    "q": "How many days are in 2 weeks?",
                    "options": ["14 days", "10 days", "12 days"],
                    "a": "14 days",
                    "why": "1 week = 7 days, so 2 weeks = 14 days!"
                },
                {
                    "skill": "pick",
                    "q": "If Simba sleeps for 1 hour and 15 minutes, how many total minutes is that?",
                    "options": ["75 minutes", "65 minutes", "85 minutes"],
                    "a": "75 minutes",
                    "why": "60 minutes + 15 minutes = 75 minutes!"
                }
            ]
        },
        {
            "id": "mc_measurement_units",
            "title": "Measurement Challenge",
            "icon": "📏",
            "level": 4,
            "reqTopic": "measurement",
            "reqTitle": "Measurement",
            "concept": {
                "intro": [
                    "We measure length in centimeters (cm) and meters (m), and weight in kilograms (kg)!",
                    "Let us compare lengths and weights accurately."
                ],
                "tip": "1 meter = 100 centimeters!"
            },
            "problems": [
                {
                    "skill": "pick",
                    "q": "Simba's leash is 120 cm long. Whity's leash is 95 cm long. How much longer is Simba's leash?",
                    "options": ["25 cm", "15 cm", "35 cm"],
                    "a": "25 cm",
                    "why": "120 - 95 = 25 cm longer!"
                },
                {
                    "skill": "pick",
                    "q": "Which unit is best for measuring the weight of a big dog?",
                    "options": ["Kilograms (kg)", "Centimeters (cm)", "Liters (L)"],
                    "a": "Kilograms (kg)",
                    "why": "Kilograms measure weight!"
                },
                {
                    "skill": "pick",
                    "q": "How many centimeters are in 1 meter?",
                    "options": ["100 cm", "10 cm", "1000 cm"],
                    "a": "100 cm",
                    "why": "1 meter is exactly 100 centimeters!"
                },
                {
                    "skill": "pick",
                    "q": "A puppy weighs 8 kg and a kitten weighs 3 kg. What is their total weight?",
                    "options": ["11 kg", "12 kg", "9 kg"],
                    "a": "11 kg",
                    "why": "8 + 3 = 11 kg!"
                },
                {
                    "skill": "pick",
                    "q": "How many centimeters are in 2 meters?",
                    "options": ["200 cm", "20 cm", "2000 cm"],
                    "a": "200 cm",
                    "why": "Since 1 m = 100 cm, 2 meters = 200 cm!"
                },
                {
                    "skill": "pick",
                    "q": "A ribbon is 45 cm long. Advaita cuts off 18 cm. How much ribbon is left?",
                    "options": ["27 cm", "37 cm", "25 cm"],
                    "a": "27 cm",
                    "why": "45 - 18 = 27 cm left!"
                },
                {
                    "skill": "pick",
                    "q": "Which unit is best for measuring water in a bucket?",
                    "options": ["Liters (L)", "Meters (m)", "Grams (g)"],
                    "a": "Liters (L)",
                    "why": "Liters measure liquid volume!"
                }
            ]
        },
        {
            "id": "mc_mental_math",
            "title": "Mental Math Speed Challenge",
            "icon": "⚡",
            "level": 5,
            "reqTopic": "tables",
            "reqTitle": "Multiplication Tables",
            "concept": {
                "intro": [
                    "Test your mental math power!",
                    "Look for shortcuts like adding tens first."
                ],
                "tip": "Break big numbers into tens and ones!"
            },
            "problems": [
                {
                    "skill": "pick",
                    "q": "What is 45 + 30?",
                    "options": ["75", "65", "85"],
                    "a": "75",
                    "why": "45 + 3 tens = 75!"
                },
                {
                    "skill": "pick",
                    "q": "What is 90 - 40?",
                    "options": ["50", "60", "40"],
                    "a": "50",
                    "why": "9 tens minus 4 tens = 5 tens = 50!"
                },
                {
                    "skill": "pick",
                    "q": "What is 9 × 5?",
                    "options": ["45", "40", "50"],
                    "a": "45",
                    "why": "9 × 5 = 45!"
                },
                {
                    "skill": "pick",
                    "q": "What is 60 + 25?",
                    "options": ["85", "75", "95"],
                    "a": "85",
                    "why": "60 + 20 + 5 = 85!"
                },
                {
                    "skill": "pick",
                    "q": "What is double 15?",
                    "options": ["30", "25", "35"],
                    "a": "30",
                    "why": "15 + 15 = 30!"
                },
                {
                    "skill": "pick",
                    "q": "What is half of 40?",
                    "options": ["20", "15", "25"],
                    "a": "20",
                    "why": "20 + 20 = 40, so half of 40 is 20!"
                },
                {
                    "skill": "pick",
                    "q": "What is 100 - 35?",
                    "options": ["65", "55", "75"],
                    "a": "65",
                    "why": "100 - 30 = 70, then 70 - 5 = 65!"
                }
            ]
        },
        {
            "id": "mc_word_problems2",
            "title": "2-Step Real World Problems",
            "icon": "🏆",
            "level": 5,
            "reqTopic": "word_problems",
            "reqTitle": "Word Problems",
            "concept": {
                "intro": [
                    "Some problems require two steps!",
                    "Read carefully: first solve step 1, then solve step 2."
                ],
                "tip": "Draw a quick picture if it helps!"
            },
            "problems": [
                {
                    "skill": "pick",
                    "q": "Advaita baked 15 cookies. Simba ate 4 and Mufasa ate 3. How many cookies are left?",
                    "options": ["8 cookies", "9 cookies", "7 cookies"],
                    "a": "8 cookies",
                    "why": "Total eaten: 4 + 3 = 7. Left: 15 - 7 = 8 cookies!"
                },
                {
                    "skill": "pick",
                    "q": "There were 24 birds on a tree. 10 flew away, then 5 more came. How many birds are on the tree now?",
                    "options": ["19 birds", "14 birds", "21 birds"],
                    "a": "19 birds",
                    "why": "Step 1: 24 - 10 = 14. Step 2: 14 + 5 = 19 birds!"
                },
                {
                    "skill": "pick",
                    "q": "Golu has 2 bags of treats with 6 treats in each bag. She gives 5 treats to Whity. How many treats does Golu have left?",
                    "options": ["7 treats", "12 treats", "8 treats"],
                    "a": "7 treats",
                    "why": "Total treats: 2 × 6 = 12. Left: 12 - 5 = 7 treats!"
                },
                {
                    "skill": "pick",
                    "q": "Simba had ₹50. He earned ₹20 more, then bought a ball for ₹35. How much money does he have now?",
                    "options": ["₹35", "₹45", "₹25"],
                    "a": "₹35",
                    "why": "Step 1: 50 + 20 = 70. Step 2: 70 - 35 = ₹35 left!"
                },
                {
                    "skill": "pick",
                    "q": "There are 18 puppies in the park. 6 go home, then 4 new puppies arrive. How many puppies are in the park?",
                    "options": ["16 puppies", "14 puppies", "18 puppies"],
                    "a": "16 puppies",
                    "why": "Step 1: 18 - 6 = 12. Step 2: 12 + 4 = 16 puppies!"
                },
                {
                    "skill": "pick",
                    "q": "Advaita has 3 boxes of crayons with 8 crayons each. She gives 6 crayons to a friend. How many crayons remain?",
                    "options": ["18 crayons", "24 crayons", "16 crayons"],
                    "a": "18 crayons",
                    "why": "Total crayons: 3 × 8 = 24. Left: 24 - 6 = 18 crayons!"
                },
                {
                    "skill": "pick",
                    "q": "A shop had 40 bones. It sold 15 in the morning and 12 in the evening. How many bones are left?",
                    "options": ["13 bones", "15 bones", "11 bones"],
                    "a": "13 bones",
                    "why": "Total sold: 15 + 12 = 27. Left: 40 - 27 = 13 bones!"
                }
            ]
        }
    ]

    out = {
        "subject": "math_challenge",
        "title": "Math Challenge Book",
        "icon": "🏆",
        "lang": "en-IN",
        "chapters": chapters
    }

    out_path = os.path.join(DATA_DIR, "math_challenge_book.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
    print(f"Generated {out_path} with {len(chapters)} chapters ({sum(len(c['problems']) for c in chapters)} problems)!")

if __name__ == "__main__":
    main()
