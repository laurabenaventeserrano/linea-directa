// LÍNEA DIRECTA · the twelve candidates.
//
// THE GOAL: one of them likes you. Guess who, and block them.
//
// This is everything the game knows about them. Each round one of the candidates
// who hasn't been blocked yet has a crush on you, and the hotline gives clues
// about their traits. You can call anyone to hear them out (they answer with
// `hello`). When you know, you block them from their card: the right one is gone
// for good, the wrong one ends the game. To add someone, copy a block:
//   traits:  one value per trait (see TRAITS). No two people share a combination.
//   hello:   what they say when you call them. Make it hint at their red flag.
//   pixels:  24×24 portrait. Each letter is a colour from `palette` (or from
//            BASE_PALETTE in game.js); '.' is transparent and shows `bg`.
//   reveal:  what the card shows once they're blocked.
// Everything here is satire.

window.LD_DATA = {

  // The keys (texts, plans, exes) are the trait colours in the CSS; the labels are what shows.
  traits: {
    texts: { label:'TEXTS', values:{ double:'100 a day', late:'only at 2 a.m.', slow:'every 8 hours' } },
    plans: { label:'PLANS', values:{ soon:'way too soon', never:'“let’s see”', cancel:'cancels' } },
    exes:  { label:'TALKS', values:{ gym:'the gym', ex:'their ex', you:'you. a lot.' } }
  },

  // What the hotline says about the one who likes you. Several per value so jokes don't repeat.
  clues: {
    texts: {
      double: [
        'The one who likes you sent “hey”, “hey??”, “ok wow” and a voice note. In ninety seconds.',
        'Your admirer texts in paragraphs. Several. Before you’ve answered the first one.',
        'They text you good morning, good night and eleven updates in between.'
      ],
      late: [
        'The one who likes you only texts after midnight. “u up?” is their love language.',
        'Silent all day. Then, at 2:07 a.m.: “thinking about u”.',
        'They call you at 2 a.m. and act surprised you were asleep.'
      ],
      slow: [
        'Your admirer replies like paracetamol: one every eight hours.',
        'They answer your message from Monday on Thursday. With “haha”.',
        'They watch your story in four seconds. They answer your text in four days.'
      ]
    },
    plans: {
      soon: [
        'The one who likes you has already named your future dog. You’ve met twice.',
        'They brought up a trip to Lisbon together. On the first date.',
        'They want you to meet their mum. This Sunday. You met on Tuesday.'
      ],
      never: [
        'Ask them what you are and you get “let’s see where it goes”.',
        'They’re “not ready for anything serious right now”. They’ve said it for three years.',
        'Their idea of a plan is “we’ll see”. They never see.'
      ],
      cancel: [
        'They cancel an hour before. Every time. With a different dead grandma.',
        'You’ve been stood up at the same café three times. The waiter knows your name.',
        'They say “raincheck” more than they say your name.'
      ]
    },
    exes: {
      gym: [
        'The one who likes you can’t finish a sentence without saying “leg day”.',
        'Every date is near a gym. Every photo is a mirror selfie.',
        'They asked how much protein is in your love.'
      ],
      ex: [
        'Your admirer has mentioned their ex in every conversation. Including this one.',
        'They still have their ex’s hoodie, Netflix and mum’s number.',
        'Ask about their week and you get the full history of their last relationship.'
      ],
      you: [
        'They’ve liked every photo you’ve posted since 2016. Tonight.',
        'They talk about you to everyone. They’ve met you once.',
        'They know your coffee order, your star sign and your ex’s new partner’s name.'
      ]
    }
  },

  // The hotline: answering or calling it gets you the next clue about the one who likes you.
  hotline: {
    number:'555-3524', label:'555-FLAG',
    ring:'Línea Directa. Someone in your lineup likes you. Sorry. Here’s what we know.',
    again:'Hotline again. More on your admirer, coming up.',
    not:'And one more thing: it’s not {name}. They don’t even know you exist.',
    empty:'That’s everything we have. Find them. Block them.',
    enough:'You know who likes you. Block them before they text.'
  },
  // What the one who liked you says when you block them.
  caught: [
    'Wait, you’re blocking me? I already named our dog.',
    'Blocked? Bold. I’ll just watch your stories, then.',
    'Fine. I’ll text you at 2 a.m. to talk about it.',
    'My ex never blocked me, just so you know.'
  ],
  // Completion screen, chosen by how many clues and calls it took.
  ending: [
    { max:20, title:'Certified heart blocker', line:'Twelve admirers, twelve blocks. Your therapist would be proud. Now delete the apps.' },
    { max:30, title:'Mostly survived', line:'You blocked them all. A few too many calls, but honestly that’s just dating.' },
    { max:999, title:'You would have dated all of them', line:'You blocked every admirer eventually. Mostly by calling them. Please never do this in real life.' }
  ],

  candidates: [
    {
      id:'jordan', name:'Jordan', age:31, phone:'555-0101', bg:'#CFE6D4', pitch:.85,
      traits:{ texts:'slow', plans:'cancel', exes:'you' },
      hello:'…oh. Hey. I just saw your message. From Tuesday.',
      reveal:{
        archetype:'The Ghoster', flag:'Vanishes mid-crush',
        quote:'I’m not really on my phone that much.',
        stats:[['Last seen','2 months ago'],['Status','online (apparently)'],['Comes back','when you’re over it']],
        why:'Likes you just enough to disappear. Then comes back like a zombie the week you finally move on.',
        danger:'Emotional damage', level:4
      },
      palette:{ s:'#EAD3C0', d:'#C9AE98', h:'#2B2522', v:'#2B2522', c:'#4B4F5C' },
      fade:true,
      pixels:[
        '........................',
        '........................',
        '........kkkkkkkk........',
        '......kkcccccccckk......',
        '.....kcccccccccccck.....',
        '....kccckhhhhhhkccck....',
        '....kcckhhhhhhhhkcck....',
        '....kcckhhhssshhkcck....',
        '....kcksssssssssskck....',
        '....kcksvvvssvvvskck....',
        '....kcksssssssssskck....',
        '....kcksesssesssskck....',
        '....kcksssddssssskck....',
        '....kcksssssssssskck....',
        '....kckssskkksssskck....',
        '....kccksssssssskcck....',
        '....kccckddddddkccck....',
        '...kcccccckssskcccccck..',
        '..kcccccccckkcccccccck..',
        '.kccccccccwccwcccccccck.',
        '.kccccccccwccwcccccccck.',
        '.kccccccsGGGGscccccccck.',
        '.kccccccsGGGGscccccccck.',
        '.kcccccckkkkkkcccccccck.'
      ]
    },
    {
      id:'ricky', name:'Ricky', age:34, phone:'555-0102', bg:'#F4CFC8', pitch:1.15,
      traits:{ texts:'double', plans:'soon', exes:'you' },
      hello:'Hey you. I literally just thought about you. Isn’t that crazy?',
      reveal:{
        archetype:'The Love Bomber', flag:'Way too intense, way too soon',
        quote:'I’ve never felt this way before.',
        stats:[['“I love you” after','4 days'],['Bouquets before date two','3'],['Playlists made for you','2']],
        why:'Hands you the whole relationship in two weeks, then asks why you’re being so distant.',
        danger:'Sugar crash', level:3
      },
      palette:{ s:'#E0A77E', d:'#BF8158', h:'#3B2216', g:'#6E4630', v:'#3B2216', c:'#D3242C', C:'#8F1419' },
      pixels:[
        '........................',
        '..........kkkkk.........',
        '........kkhhhggk........',
        '.......khhhhhhgghk......',
        '......khhhhhhhhhhk......',
        '......khhhhhhhhhhk......',
        '......khsssssssshk......',
        '......khsssssssshk......',
        '......khvvvssvvvhk......',
        '......kssssssssssk......',
        '......kssessssessk......',
        '.....ksssessssesssk.....',
        '.....ksppssddssppsk.....',
        '.....kdssssssssssdk.....',
        '......kskwwwwwwksk......',
        '.......kskkkkkksk.......',
        '........kkddddkk........',
        '.........kssssk.........',
        '....kkkkkksssskkkkkk....',
        '...kccccwwsssswwcccck...',
        '..kcccccccyyyyccccccck..',
        '.kcccccccccssccccccccck.',
        '.kcccccccccCCccccccccck.',
        '.kcccccccccCCccccccccck.'
      ],
      // the rose
      over:[
        [12,2,'kkk'],[13,1,'krRrk'],[14,1,'kRrRk'],[15,2,'kkk'],
        [16,3,'V'],[17,3,'V'],[18,3,'VV'],[19,3,'V'],[20,2,'kssk'],[21,2,'kssk'],[22,2,'kkk']
      ]
    },
    {
      id:'sam', name:'Sam', age:28, phone:'555-0103', bg:'#EFE3CF', pitch:1.05,
      traits:{ texts:'late', plans:'never', exes:'gym' },
      hello:'Heyyy. What are we? Don’t answer that. Labels are for jam jars.',
      reveal:{
        archetype:'The No Labels', flag:'Won’t say what you are',
        quote:'Why do we have to put a label on it?',
        stats:[['Time together','7 months'],['Official status','n/a'],['Met the parents','technically']],
        why:'All the benefits of a relationship, none of the paperwork. You are the paperwork.',
        danger:'Chronic confusion', level:3
      },
      palette:{ s:'#F0C3A4', d:'#D29C7C', h:'#9A4A2A', g:'#C26A3E', v:'#9A4A2A', c:'#E7A6A1', C:'#C9827D' },
      pixels:[
        '..........kkkk..........',
        '.........khhhgk.........',
        '.........khhhhk.........',
        '........kkkhhkkk........',
        '.......khhhhhhhhk.......',
        '......khhhhhhhghhk......',
        '......khhhsshhhhhk......',
        '.....khhsssssshhshk.....',
        '.....khsssssssssshk.....',
        '.....khsvvvssvvvshk.....',
        '.....khsssssssssshk.....',
        '.....khskksssskkshk.....',
        '.....khspssddsspshk.....',
        '.....khsssssssksshk.....',
        '......ksssskkksssk......',
        '.......kssssssssk.......',
        '........kkddddkk........',
        '.........kssssk.........',
        '....kkkkkksssskkkkkk....',
        '...ksssssssssskccccck...',
        '..kssskcccccccccccccck..',
        '.kskcccccccccccccccccck.',
        '.kskcccccccccccccccccck.',
        '.kskcccccccCcccccccccck.'
      ]
    },
    {
      id:'casey', name:'Casey', age:30, phone:'555-0104', bg:'#CFE6D4', pitch:1.2,
      traits:{ texts:'late', plans:'cancel', exes:'you' },
      hello:'Heyyy. Sorry, is it late? It’s not late. Are you up?',
      reveal:{
        archetype:'The 2 a.m. Caller', flag:'Only calls after midnight',
        quote:'You up?',
        stats:[['Calls before 11 p.m.','0'],['Calls after 2 a.m.','all of them'],['Daylight dates','pending']],
        why:'Completely into you between 2 and 4 a.m. Completely busy the rest of the day.',
        danger:'Sleep deprivation', level:3
      },
      palette:{ s:'#C98D63', d:'#A86E47', h:'#2A1C17', v:'#2A1C17', c:'#4A5D86', C:'#33426A' },
      pixels:[
        '...........ww...........',
        '..........kwwk..........',
        '........kkkkkkkk........',
        '.......kyyyyyyyyk.......',
        '......kyyyyyyyyyyk......',
        '......kYYYYYYYYYYk......',
        '......kkkkkkkkkkkk......',
        '.....khhhhhsssshhhk.....',
        '.....khhsssssssshhk.....',
        '.....khsvvvssvvvshk.....',
        '.....khsssssssssshk.....',
        '.....khsssesssseshk.....',
        '.....khspssddsspshk.....',
        '.....khsssssssssshk.....',
        '.....khssssskkksshk.....',
        '.....khksssssssskhk.....',
        '.....khhhkddddkhhhk.....',
        '.....khhhksssskhhhk.....',
        '....kccccksssskccccck...',
        '...kccccckwwwwkccccccck.',
        '..kcccccckwwwwkcccccck..',
        '.kccccccCkwwwwkCcccccck.',
        '.kccccccccwwwwcccccccck.',
        '.kccccccccwwwwcccccccck.'
      ],
      // the phone, held up
      over:[
        [11,17,'kkkkk'],[12,17,'kGGGk'],[13,17,'kGrGk'],[14,17,'kGGGk'],[15,17,'kGGGk'],[16,17,'kkkkk'],
        [17,16,'kssssk'],[18,16,'kssssk']
      ]
    },
    {
      id:'brad', name:'Brad', age:36, phone:'555-0105', bg:'#F4CFC8', pitch:.7,
      traits:{ texts:'double', plans:'never', exes:'gym' },
      hello:'Yo. Can’t talk long, between sets. You lift?',
      reveal:{
        archetype:'The Gym Bro', flag:'Only talks about the gym',
        quote:'Rest day? Never heard of her.',
        stats:[['Mirror selfies','312'],['Questions about you','0'],['Protein shakes per date','2']],
        why:'Likes you almost as much as leg day. Almost.',
        danger:'Protein overdose', level:2
      },
      palette:{ s:'#D9A27A', d:'#B57D55', h:'#5A3A22', g:'#8A5E3C', v:'#5A3A22', c:'#2B2421', C:'#17120F' },
      pixels:[
        '........................',
        '........................',
        '........................',
        '........kkkkkkkk........',
        '.......khhhhhhhhk.......',
        '......khghghghghhk......',
        '......khhhhhhhhhhk......',
        '......kssssssssssk......',
        '......kssssssssssk......',
        '......ksvvvssvvvsk......',
        '......kkkkkkkkkkkk......',
        '.....kskwnnkkwnnksk.....',
        '.....kskRnnkknnRksk.....',
        '.....kdskkksskkksdk.....',
        '......ksshhhhhhssk......',
        '.......kssskksssk.......',
        '........kkddddkk........',
        '.........kssssk.........',
        '....kkkkkksssskkkkkk....',
        '...kcccccCwwwwCccccck...',
        '..kcccccCkwyywkCccccck..',
        '.kccccccCkwwywkCcccccck.',
        '.kccccccCkwwwwkCcccccck.',
        '.kccccccCkwwwwkCcccccck.'
      ]
    },
    {
      id:'robin', name:'Robin', age:33, phone:'555-0106', bg:'#EFE3CF', pitch:.9,
      traits:{ texts:'slow', plans:'never', exes:'ex' },
      hello:'Hi. Look, I’m not ready for anything right now. Anyway, how are you?',
      reveal:{
        archetype:'The Not Ready', flag:'Not ready for a relationship',
        quote:'I really like you, but I’m not in a place for this.',
        stats:[['Years not ready','3'],['Times they said it','19'],['Dates anyway','weekly']],
        why:'Not ready for a relationship. Somehow always ready for a date with you.',
        danger:'Endless waiting', level:3
      },
      palette:{ s:'#8D5A3B', d:'#6E422A', h:'#17120F', v:'#17120F', c:'#2E2A2B', C:'#17120F' },
      pixels:[
        '........................',
        '........................',
        '........kkkkkkkk........',
        '.......kRRRRRRRRk.......',
        '......kRhhhhhhhhRk......',
        '.....kRkhhhhhhhhkRk.....',
        '....kRkhhhhhhhhhhkRk....',
        '....kRkhhsssssshhkRk....',
        '...kkkksssssssssskkkk...',
        '...krrksvvvssvvvskrrk...',
        '...krrkskkksskkkskrrk...',
        '...krrkkseskkseskkrrk...',
        '...krrkskkksskkkskrrk...',
        '...kkkkssssddsssskkkk...',
        '......kssskkkksssk......',
        '.......kssssssssk.......',
        '......kkcccccccckk......',
        '.......kcccccccck.......',
        '....kkkkcCccccCckkkk....',
        '...kcccccccccccccccck...',
        '..kcccccccccccccccccck..',
        '.kcccccccccccccccccccck.',
        '.kcccccccccccccccccccck.',
        '.kcccccccccccccccccccck.'
      ]
    },
    {
      id:'taylor', name:'Taylor', age:27, phone:'555-0107', bg:'#F4CFC8', pitch:1.25,
      traits:{ texts:'double', plans:'cancel', exes:'gym' },
      hello:'Hey! Hold on, other line… Okay. Hi! Who’s this again?',
      reveal:{
        archetype:'The One With a Girlfriend', flag:'Already taken',
        quote:'It’s complicated. She doesn’t get me like you do.',
        stats:[['Girlfriends','1 (that you know of)'],['Phones','2'],['Photos with you','none, for some reason']],
        why:'Likes you. Also likes their girlfriend. Can’t meet on weekends, for some reason.',
        danger:'Plot twist', level:5
      },
      palette:{ s:'#A86B45', d:'#855032', h:'#1E1512', g:'#3C2A22', v:'#1E1512', c:'#3E9A5C', C:'#2B6B40' },
      pixels:[
        '........kkkkkkkk........',
        '......kkhhhhhhhhkk......',
        '.....khhghhhhhhghhk.....',
        '....khhhhhhhhhhhhhhk....',
        '...khhghhhhhhhhhhghhk...',
        '...khhhhhhhhhhhhhhhhk...',
        '..khhhhhhhhhhhhhhhhhhk..',
        '..khhhhhhsssssshhhhhhk..',
        '..khhhhsssssssssshhhhk..',
        '..khhhhsvvvssvvvshhhhk..',
        '..khhhhsssssssssshhhhk..',
        '..khhhhsewsssewsshhhhk..',
        '..khhhysssddsssssyhhhk..',
        '..khhyhsssssssssshyhhk..',
        '..khhhysssrrrrsssyhhhk..',
        '..khhhhhsssssssshhhhhk..',
        '..khhhhhhkddddkhhhhhhk..',
        '...khhhhhksssskhhhhhk...',
        '....kkkkkksssskkkkkk....',
        '...kccccccsssscccccck...',
        '..kccccccccsscccccccck..',
        '.kcccccccccccccccccccck.',
        '.kcccccccccccccccccccck.',
        '.kcccccccccccccccccccck.'
      ],
      // two phones, two conversations
      over:[
        [15,1,'kkkkk'],[16,1,'kGGGk'],[17,1,'kGGGk'],[18,1,'kGGGk'],[19,1,'kkkkk'],[20,1,'ksssk'],
        [14,18,'kkkkk'],[15,18,'kGGGk'],[16,18,'kGGrk'],[17,18,'kGGGk'],[18,18,'kkkkk'],[19,18,'ksssk']
      ]
    },
    {
      id:'morgan', name:'Morgan', age:35, phone:'555-0108', bg:'#CFE6D4', pitch:1.1,
      traits:{ texts:'late', plans:'soon', exes:'you' },
      hello:'Hi! Quick question: aisle or window? For Lisbon. In spring.',
      reveal:{
        archetype:'The Too-Soon Planner', flag:'Plans the wedding on date one',
        quote:'We should go to Lisbon in spring. Just us.',
        stats:[['Trips planned','4'],['Dates so far','1'],['Future dog’s name','Biscuit']],
        why:'Has your whole future in a planner after one coffee. You never got a say.',
        danger:'Long-term disappointment', level:4
      },
      palette:{ s:'#F2C29E', d:'#D59C76', h:'#E3B341', g:'#F4D27A', v:'#A97C1B', c:'#3F4E78', C:'#2B3657' },
      pixels:[
        '........................',
        '........................',
        '........kkkkkkkk........',
        '.......khhhhgghhk.......',
        '......khhhhhhhhhhk......',
        '......kkkkkkkkkkkk......',
        '......khkkkhhkkkhk......',
        '.....khhhhhhhhhhhhk.....',
        '.....khhsssssssshhk.....',
        '.....khsvvvssvvvshk.....',
        '.....khsssssssssshk.....',
        '.....khssessssesshk.....',
        '.....khspssddsspshk.....',
        '.....khsssssssssshk.....',
        '.....khskwwwwwwkshk.....',
        '.....khhskkkkkkshhk.....',
        '.....khhhkddddkhhhk.....',
        '......kkkksssskkkk......',
        '....kkkkkksssskkkkkk....',
        '...kcccccwwsswwccccck...',
        '..kccccccwwrrwwcccccck..',
        '.kcccccccCwrrwCccccccck.',
        '.kcccccccCwrrwCccccccck.',
        '.kcccccccCwrrwCccccccck.'
      ],
      // the planner
      over:[
        [16,15,'kkkkkkk'],[17,15,'krrrrrk'],[18,15,'kwnwnwk'],[19,15,'kwwwwwk'],[20,15,'kwnRnwk'],[21,15,'kwwwwwk'],[22,15,'kkkkkkk']
      ]
    },
    {
      id:'vicky', name:'Vicky', age:29, phone:'555-0109', bg:'#F4CFC8', pitch:1.15,
      traits:{ texts:'slow', plans:'never', exes:'you' },
      hello:'Oh, hi! Loved your story. And the one before. And the one from 2019.',
      reveal:{
        archetype:'The Orbiter', flag:'Watches everything, says nothing',
        quote:'Saw your story. Not that I was looking.',
        stats:[['Stories watched','all of them'],['Messages sent','0'],['Likes on old photos','14']],
        why:'Likes you from a safe distance. Never texts, never leaves, always orbiting.',
        danger:'Full surveillance', level:3
      },
      palette:{ s:'#F3C9A8', d:'#D9A07E', h:'#B8442E', g:'#E07A5F', v:'#7A2A1C', c:'#8E5BB5', C:'#6A3F8C' },
      pixels:[
        '........................',
        '........kkkkkkkk........',
        '......kkhhhhhhhhkk......',
        '.....khhhhhhhhhgghk.....',
        '....khhhhhhhhhhhgghk....',
        '....khhhhhhhhhhhhhhk....',
        '....khhhhhhhhhhhhhhk....',
        '....khhsssssssssshhk....',
        '....khhsssssssssshhk....',
        '....khhsvvvssvvvshhk....',
        '....khhsssssssssshhk....',
        '....khhsewsssewsshhk....',
        '....khyssssddssssyhk....',
        '....khysspsssspssyhk....',
        '....khhsssrrrrssshhk....',
        '....khhhsssssssshhhk....',
        '....khhhhkddddkhhhhk....',
        '....khhhhksssskhhhhk....',
        '...khhhhhksssskhhhhhk...',
        '..khhhhccwsssswcchhhhk..',
        '..khhhcccwwsswwccchhhk..',
        '.kkhhcccccccccccccchhkk.',
        '.kcccccccccccccccccccck.',
        '.kcccccccccccccccccccck.'
      ],
      // the magnifying glass
      over:[
        [16,18,' kkk'],[17,18,'kwwwk'],[18,18,'kwbwk'],[19,18,'kwwwk'],[20,18,' kkk'],[21,17,'kk'],[22,16,'kk']
      ]
    },
    {
      id:'mia', name:'Mia', age:26, phone:'555-0110', bg:'#CFE6D4', pitch:1.3,
      traits:{ texts:'slow', plans:'soon', exes:'gym' },
      hello:'Hiii! Sorry, just saw this. Eight hours later. As usual.',
      reveal:{
        archetype:'The Paracetamol', flag:'Replies every 8 hours',
        quote:'Sorry, just saw this!',
        stats:[['Average reply time','8 hours'],['Doses per day','3'],['Effect','mild']],
        why:'Likes you in small doses. One message every eight hours, with food.',
        danger:'Mild relief', level:2
      },
      palette:{ s:'#F6CBA9', d:'#DDA585', h:'#E9C46A', g:'#F6E2A0', v:'#B08A3E', c:'#F28DB2', C:'#D46A94', r:'#E0566E' },
      pixels:[
        '..........kkkk..........',
        '.........khhggk.........',
        '.........khhhhk.........',
        '.......kkkhhhhkkk.......',
        '......khhhhhhhhhhk......',
        '.....khhhhhhhhgghhk.....',
        '.....khhhhhhhhhhhhk.....',
        '.....khsssssssssshk.....',
        '.....khsssssssssshk.....',
        '.....khsvvvssvvvshk.....',
        '.....khsssssssssshk.....',
        '.....khsewsssewsshk.....',
        '.....kyssssddssssyk.....',
        '.....khsspsssspsshk.....',
        '.....khsssrrrrssshk.....',
        '......kssssssssssk......',
        '.......kssddddssk.......',
        '........kksssskk........',
        '.........kssssk.........',
        '...kccccccsssscccccck...',
        '..kccccccccsscccccccck..',
        '.kcccccccccccccccccccck.',
        '.kcccccccccccccccccccck.',
        '.kcccccccccccccccccccck.'
      ],
      // the phone, recording
      over:[
        [11,1,'kkkkk'],[12,1,'kbbbk'],[13,1,'kbrbk'],[14,1,'kbbbk'],[15,1,'kbbbk'],[16,1,'kkkkk'],[17,1,'ksssk'],[18,2,'ksk']
      ]
    },
    {
      id:'nina', name:'Nina', age:32, phone:'555-0111', bg:'#EFE3CF', pitch:1.0,
      traits:{ texts:'double', plans:'never', exes:'ex' },
      hello:'Oh. Hi. Sorry, I thought you were someone else. My ex has the same ringtone.',
      reveal:{
        archetype:'The Ex Talker', flag:'Only talks about their ex',
        quote:'Sorry, that’s just something my ex used to say.',
        stats:[['Times the ex came up','23'],['Ex’s birthday','still celebrated'],['“Over it”','apparently']],
        why:'Likes you. Talks about their ex. Sitting across from you, still talking to someone who isn’t there.',
        danger:'Rebound risk', level:3
      },
      palette:{ s:'#E8B58F', d:'#C99272', h:'#2B1B17', g:'#5A3A30', v:'#2B1B17', c:'#6C8EBF', C:'#4A6A99', r:'#C2416E' },
      pixels:[
        '........................',
        '........................',
        '.......kkkkkkkkkk.......',
        '......khhhhhhhhhhk......',
        '.....khhhhhhhhgghhk.....',
        '....khhhhhhhhhhhhhhk....',
        '....khhhhhhhhhhhhhhk....',
        '....khhhhhhhhhhhhhhk....',
        '....khhsssssssssshhk....',
        '....khhsssssssssshhk....',
        '....khhkkkksskkkkhhk....',
        '....khhkewksskewkhhk....',
        '....khhssssddsssshhk....',
        '....khhsspsssspsshhk....',
        '....khhssssrrsssshhk....',
        '....khhhsssssssshhhk....',
        '....khhhhkddddkhhhhk....',
        '....kkkkkksssskkkkkk....',
        '.........kssssk.........',
        '...kccccccsssscccccck...',
        '..kccccccccsscccccccck..',
        '.kcccccccccccccccccccck.',
        '.kcccccccccccccccccccck.',
        '.kcccccccccccccccccccck.'
      ],
      // the old photo
      over:[
        [16,17,'kkkkk'],[17,17,'kwrwk'],[18,17,'krrrk'],[19,17,'kwrwk'],[20,17,'kwwwk'],[21,17,'kkkkk']
      ]
    },
    {
      id:'alex', name:'Alex', age:38, phone:'555-0112', bg:'#EFE3CF', pitch:.8,
      traits:{ texts:'late', plans:'cancel', exes:'ex' },
      hello:'Hey. Can’t talk long. Text me, don’t call. Actually, don’t text either.',
      reveal:{
        archetype:'The Still Married', flag:'Married. Currently.',
        quote:'We’re basically separated. We just live together. And share a bank account.',
        stats:[['Wedding rings','1 (in the pocket)'],['“My ex-wife”','current wife'],['Free on weekends','never']],
        why:'Likes you a lot. Talks about “the ex”, who still lives with them and is very much their wife.',
        danger:'Divorce lawyer', level:5
      },
      palette:{ s:'#E8B48F', d:'#C48C68', h:'#2E2A28', g:'#4A4440', v:'#2E2A28', c:'#C9E2FF', C:'#8FB3DE', y:'#E3B341' },
      pixels:[
        '..........kkkk..........',
        '.........khhhgk.........',
        '.........khhhhk.........',
        '........kkkhhkkk........',
        '.......khhhhhhhhk.......',
        '......khhhhhhhghhk......',
        '......khhhsshhhhhk......',
        '.....khhsssssshhshk.....',
        '.....khsssssssssshk.....',
        '.....khsvvvssvvvshk.....',
        '.....khsssssssssshk.....',
        '.....khskksssskkshk.....',
        '.....khspssddsspshk.....',
        '.....khsssssssksshk.....',
        '......ksssskkksssk......',
        '.......kssssssssk.......',
        '........kkddddkk........',
        '.........kssssk.........',
        '....kkkkkksssskkkkkk....',
        '...ksssssssssskccccck...',
        '..kssskcccccccccccccck..',
        '.kskcccccccccccccccccck.',
        '.kskcccccccccccccccccck.',
        '.kskcccccccCcccccccccck.'
      ],
      // the wedding ring
      over:[
        [16,1,'kkkk'],[17,1,'kssk'],[18,1,'kyyk'],[19,1,'kssk'],[20,1,'kssk']
      ]
    }
  ]
};
