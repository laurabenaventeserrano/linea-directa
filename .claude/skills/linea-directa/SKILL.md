---
name: linea-directa
description: The approved look of Línea Directa, Laura's telephone game in ~/Documents/LINEA DIRECTA/ (name, pastel style, the fuchsia phone, the character card, windows, heart buttons). Use before ANY change to lab/linea-directa/ — new rules, mechanics, content, characters, bug fixes or copy — and whenever someone asks to redesign, restyle, rename or "improve" the game. It says what is frozen and what may change.
---

# Línea Directa · the approved look

This skill says **what is frozen**. For **how to build** anything in the style (tokens, components, cursors, tags, copy voice), load `linea-directa-style` as well.

**The goal of the game (Laura, 17 Oct 2026): someone in the lineup likes you. Guess who, and block them.** It must be obvious on both screens: the title tagline ("Guess who likes you." in Titan One, "Then block them." below), the HUD goal chip, the lineup title ("ONE OF THEM LIKES YOU") and the case banner ("♥ WHO LIKES YOU?"). Every character is a satirical dating red flag (the 2 a.m. caller, the gym bro, the ex talker, the still married, the love bomber, the not ready, the no labels, the ghoster, the orbiter, the paracetamol who replies every 8 hours, the one with a girlfriend, the too-soon planner). All copy is satire.

**Three hearts (Laura, 19 Oct 2026).** You get three chances in the whole game. Blocking someone who doesn't like you costs a heart, stamps them WRONG ONE for that case, and the one who likes you keeps bothering you: a moment later they text you from an UNKNOWN NUMBER in their own voice (a `pester` line, tagged MSG in the clues). Lose all three and it's game over: "Out of hearts", with their last message.

**Every character has their own personality (Laura, 19 Oct 2026).** Each one has a voice note in `candidates.js` and speaks only in that voice: three `hellos` (when you call them), three `pester` messages (when you miss them) and one `caught` line (when you block them). A new character needs all of it, in a voice nobody else has.

Laura has approved this look. **Changing the rules, mechanics or content is never permission to change the look.** On 17 Oct 2026 a mechanics change also replaced the name, palette, fonts, phone and cards without being asked ("Red Flag Hotline", paper/ink/red, green CRT, a red desk phone with a cord). Laura had to ask for all of it back. Don't let this happen again.

## The rule

1. **The look is frozen.** The name, palette, fonts, window chrome, phone, base, heart buttons, screen and card anatomy only change when Laura asks for that specific change, in so many words.
2. **When asked for mechanics or content**, edit `game.js` (logic) and `candidates.js` (data) only. New UI that a mechanic needs gets built from the pieces below, in the same tokens, and it's small.
3. **If a mechanic seems to need a visual change** (a new screen, a light on the phone, a cord, another colour), **ask first**. Don't decide it on your own and don't hide it inside a bigger change.
4. **Never rewrite `index.html` from scratch.** Use targeted edits.
5. After any change, compare with the reference version: `git -C ~/Desktop/laura-portfolio show bb5c8d0:lab/linea-directa/index.html` (the approved pastel style; the game lived in the portfolio until 17 Oct 2026, so its history is in that repo) and `phone.js`. If anything in the frozen list looks different, put it back.

## Frozen

**Name:** **Línea Directa.** The logo is two Titan One labels, "Línea" (butter, −5°) and "Directa" (sky, +3°), with the fuchsia heart between them. Window title: `♥ LÍNEA DIRECTA.EXE`. Never rename the game, not even in the `<title>` or in what the hotline says.

**The phone (`phone.js`, do not edit):** the fuchsia handheld with a rounded top, the yellow LCD, 12 dark rounded keys, a 4×3 dot speaker, a 5-line grille, a white highlight stroke, and a hard dark offset shadow. It sits on the hexagonal fuchsia base. No cord, no LED, no desk phone, no other shape. Behaviour: drag it to pick up, drop it on the base to hang up, tap a key to dial, shake while ringing (`.ph.ring`). On the title screen it gives a gentle wiggle.

**Palette (`:root` in `index.html`):** fuchsia `#FF2E9A` is **only for the phone** (plus the logo and dialog titles). Everything else is pastel: line `#A9507E`, text `#7A3A60`, cream `#FFFBF4`, blush `#FFD1E4`, pink `#FFB3D1`, mint `#C3F0DF`, sky `#C9E2FF`, lavender `#DCCBFF`, butter `#FFF0B3`, periwinkle `#7B86E6` (screen text), screen `#F1F0FF`, green `#8ADB93`, red `#FF7FA3`, shadow `#F5A9C9`. Background (proposal branch `propuesta-portada-tablero`, Laura asked to remove the old one, 19 Oct 2026): the board pattern on pink — line swirls, lavender hearts, sky stars — on every screen, no gradient, no white grid. No dark mode, no paper/ink, no neon, no CRT green.

**Fonts:** Silkscreen (UI, labels, buttons), VT323 (screens, numbers, clues), Titan One (logo, names, dialog titles). Nothing else.

**Chrome:** every panel is a `.win`: a cream window with a 3px line border, 16px radius, a 6px pink offset shadow, a coloured `.bar` title strip with three dots (yellow, green, red), and a `.status` strip at the bottom. Screens are a `.lcd` or `.list`: light lavender with periwinkle VT323 text. The CALL / DELETE / HANG UP buttons are **hearts** (green, lavender, red). The other buttons are `.btn`: cream or butter with a hard line shadow.

**The character card (`.cand`)** is the board-game card: pink with the hearts-and-555 pattern, a 3px line border, a hard line shadow, each one slightly tilted. From top to bottom:
1. `#NN` in a cream tag, plus the **name on a butter Titan One label** with the age.
2. The **photo in the film-strip frame** (`.frame` + `.strip`) on a pastel background (mint, sky, butter or lavender, alternating). It's the button that crosses them out (a line-coloured X).
3. The traits, in a cream box: a Silkscreen tag in the trait colour (texts = pink, plans = mint, exes = butter, not = lavender) and the value in VT323. Text wraps; it's never cut off.
4. The **phone number on its LCD strip** (`.tel`, labelled ☎ CALL). It's the button that calls them; they answer with their `hello` line.
5. The **✕ BLOCK** button (`.blk`, pastel red). This is how you guess. The first tap arms it ("SURE? TAP AGAIN", butter, pulsing for 3 s) and the second tap blocks. Block the one who likes you and they're gone; block the wrong one and you lose a heart (three in total).

States: crossed (X, grey photo), WRONG ONE (stamp, shake, on every wrong block; that card can't be blocked again this case), dialled (periwinkle ring), on the line (green ring), blocked (flat blush, grey photo, BLOCKED stamp, the archetype replaces the traits, number dashed, no BLOCK button). Stamps sit low on the photo, never over the face.

**Hover tags (`.tip`):** everything clickable carries a `data-tip` ("CALL VICKY", "BLOCK VICKY", "DIAL 5", "PICK UP", "HANG UP"…). One floating tag shows it on mouse hover: Silkscreen 10px on butter, a 2px line border, a hard line shadow. Anything new that's clickable gets a `data-tip` too. The tag follows the cursor, just above the fingertip (added at Laura's request, 17 Oct 2026).

**Cursors:** the pixel cursors in `cursors/` (arrow, pointing hand, open hand, fist), in the game's colours, Nintendo-handheld style. Always use `cursor:var(--cur-…)`, never a system cursor (added at Laura's request, 17 Oct 2026).

**Title screen: phone + sheet (proposal, branch `propuesta-portada-tablero`, 19 Oct 2026, pending Laura's approval):** only two things on the board-pattern background, nothing else (Laura removed the board, the tokens, the cards and the labels). **The phone is the protagonist:** the title phone stands big (430px) on the left, slightly tilted, with a larger caller ID beside it. On the right, the plain cream score sheet with two pieces of tape holds the logo, the tagline, the menu and PRESS START. On small screens the phone comes first, then the sheet. If approved, this replaces the card fan below.

**Title screen (card fan):** the logo, then the title phone in front of all the character cards fanned behind it like a hand of cards (dealt in on load), with a tilted caller-ID screen ("☎ INCOMING CALL / CALLER ID: ???"). Below that are the tagline (the goal: **Guess who likes you.** / Then block them.), a cream game menu with a pink-heart selector (ANSWER THE HOTLINE · HOW TO PLAY · SOUND) and a blinking ▶ PRESS START ◀. No hint box (removed at Laura's request, 17 Oct 2026). The arrow keys and Enter work the menu (chosen by Laura, 17 Oct 2026).

**Game screen (approved by Laura, 17 Oct 2026, branch `propuesta-ui-juego`):** on desktop (≥900×560) the game and the title screen are a fixed 1440×960 stage scaled to fit the window (`.staged`, `fit()` in `game.js`): everything fits, no page scroll. On top, the **HUD** (`.hud`), with no case number (CASE 01/12 removed at Laura's request, 19 Oct 2026): BLOCKED as a row of hearts plus the count on a screen chip, LIFE as three hearts, CLUES and CALLS, the goal chip ("♥ SOMEONE HERE LIKES YOU · GUESS WHO · BLOCK THEM", blush) and NEW GAME on the right. **♪ ON and ? (sound and how to play) stay next to ☎ HOTLINE under the call pad, where they always were** (Laura, 17 Oct 2026). The phone window on the left with the clues window filling the rest; the lineup on the right in 6 columns × 2 rows. Each case opens with the **case banner** (`.banner`): "CASE 01" on a big butter label plus a "♥ WHO LIKES YOU?" screen tag, popping in for 1.6 s. Instructions are not paragraphs: the screen shows the **next step** in one line (`#nowNext`, e.g. "▶ CROSS OUT WHO DOESN'T FIT"); the keys live in HOW TO PLAY. Below that size the layout flows as before, with the HUD on top.

**Traits:** TEXTS (100 a day · only at 2 a.m. · every 8 hours), PLANS (way too soon · "let's see" · cancels), TALKS (the gym · their ex · you. a lot.). The TALKS trait keeps the `exes` key and its butter colour. Three values per trait, and **no two cards share the same combination**, so every card reads differently and the traits match the character (Laura asked for no repeats, 17 Oct 2026). When adding someone, give them a combination nobody has.

**Dialogs:** a pink grid overlay, a `.win` window, a centred `.pad`, the title in fuchsia Titan One with a line stroke, a big butter `.btn-big` button.

## What may change without asking

- Rules, scoring, clue logic, timing and sounds in `game.js`.
- Characters, clues and lines in `candidates.js`. New portraits keep the 24×24 pixel format and sit inside the card above.
- Bug fixes that don't change how anything looks.

## Before you finish

- [ ] The name still reads Línea Directa everywhere.
- [ ] `phone.js` is untouched (its phone drawing matches `phoneSVG`/`baseSVG` in `git -C ~/Desktop/laura-portfolio show bb5c8d0:lab/linea-directa/index.html`) and the phone looks like the approved one.
- [ ] The `:root` tokens and fonts are unchanged.
- [ ] The cards still follow the anatomy above.
- [ ] Open the game (desktop and 390px wide) and look at it next to the approved version (`bb5c8d0` in the portfolio repo).
- [ ] Tell Laura exactly what changed visually, even small things. If you can't name it, it shouldn't have changed.
