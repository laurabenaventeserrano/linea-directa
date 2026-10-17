// LÍNEA DIRECTA · the eleven candidates.
//
// This is everything the game knows about them. Each round the hotline picks one
// of the candidates who hasn't been blocked yet and gives clues about their traits.
// You can call anyone to hear them out (they answer with `hello`). When you know,
// you block them from their card: the right one is gone for good, the wrong one
// ends the game. To add someone, copy a block:
//   traits:  one value per trait (see TRAITS). Two people can share a combination;
//            the hotline then tells them apart with "it's not {name}" clues.
//   hello:   what they say when you call them. Make it hint at their red flag.
//   pixels:  24×24 portrait. Each letter is a colour from `palette` (or from
//            BASE_PALETTE in game.js); '.' is transparent and shows `bg`.
//   reveal:  what the card shows once they're blocked.

window.LD_DATA = {

  traits: {
    texts: { label:'TEXTS', values:{ double:'double-texts', read:'leaves on read' } },
    plans: { label:'PLANS', values:{ big:'big plans', vague:'“let’s see”' } },
    exes:  { label:'EXES',  values:{ crazy:'all “crazy”', close:'still close' } }
  },

  // What a caller says about the red flag. Several per value so jokes don't repeat.
  clues: {
    texts: {
      double: [
        'They send “you up?”, then “hello??”, then “ok wow”. All inside ninety seconds.',
        'Their texts arrive in paragraphs. Several. Before you’ve answered the first one.',
        'They double-text. They triple-text. They once sent a voice note about a voice note.'
      ],
      read: [
        'They watch every story you post but take three business days to reply.',
        'Your last message to them says “Read”. It has said “Read” since March.',
        'They reply “haha” to everything. Eventually.'
      ]
    },
    plans: {
      big: [
        'They’ve already named your future dog. You’ve met twice.',
        'They brought up a trip to Lisbon together. On the first date.',
        'They have a five-year plan and you’re in it. Allegedly.'
      ],
      vague: [
        'Ask them what you are and you get “let’s see where it goes”.',
        'They won’t commit to dinner on Thursday. It’s Wednesday.',
        'Their idea of a plan is “we’ll see”. They never see.'
      ]
    },
    exes: {
      crazy: [
        'All their exes are apparently crazy. Every single one.',
        'Their ex “just didn’t get them”. Neither did the four before.',
        'Ask about their ex and you get a forty-minute TED talk with no happy ending.'
      ],
      close: [
        'They’re “still really close” with their ex. They had brunch on Sunday.',
        'Their ex likes every photo within a minute. Apparently it’s nothing.',
        'They keep every ex in their contacts. Just in case.'
      ]
    }
  },

  // The hotline: answering or calling it gets you the next clue about the current red flag.
  hotline: {
    number:'555-3524', label:'555-FLAG',
    ring:'Línea Directa. Someone on your list is a disaster. Here’s what we know.',
    again:'Hotline again. More dirt, coming up.',
    not:'And one more thing: it’s not {name}.',
    empty:'That’s everything we have. Time to guess.',
    enough:'You already know enough. Block them.'
  },
  // What the red flag says when you block them.
  caught: [
    '…okay. Fine. It’s me.',
    'Who told you? Was it my ex? It was my ex.',
    'I mean, technically, yes.',
    'Wow. Okay. Yes. But in my defence…'
  ],
  // Completion screen, chosen by how many clues and calls it took.
  ending: [
    { max:20, title:'Certified red flag detector', line:'Eleven disasters avoided. Your therapist would be proud. Now delete the apps.' },
    { max:30, title:'Mostly survived', line:'You got there. A few too many calls, but honestly that’s just dating.' },
    { max:999, title:'You would have dated all of them', line:'You found every red flag eventually. Mostly by calling them. Please never do this in real life.' }
  ],

  candidates: [
    {
      id:'jordan', name:'Jordan', age:31, phone:'555-0101', bg:'#CFE6D4', pitch:.85,
      traits:{ texts:'read', plans:'big', exes:'crazy' },
      hello:'…oh. Hi. Sorry, I’m not really on my phone that much.',
      reveal:{
        archetype:'The Ghoster', flag:'Ghosting',
        quote:'I’m not really on my phone that much.',
        stats:[['Last seen','2 months ago'],['Status','online (apparently)'],['Reply rate','0%']],
        why:'Disappears exactly when you start thinking this might actually go somewhere.',
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
      traits:{ texts:'double', plans:'big', exes:'crazy' },
      hello:'Hey you. I literally just thought about you. Isn’t that crazy?',
      reveal:{
        archetype:'The Love Bomber', flag:'Love bombing',
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
      traits:{ texts:'read', plans:'vague', exes:'crazy' },
      hello:'Heyyy. What are we? Kidding. Don’t answer that.',
      reveal:{
        archetype:'The Situationship', flag:'No labels, ever',
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
      traits:{ texts:'read', plans:'vague', exes:'close' },
      hello:'Omg hiii. I saw your story. Anyway, gotta go!',
      reveal:{
        archetype:'The Breadcrumber', flag:'Breadcrumbing',
        quote:'We should totally hang out soon!!',
        stats:[['Messages per month','1 (at 1 a.m.)'],['Stories watched','all of them'],['Plans made','0']],
        why:'Drops a like every three weeks. Just enough to keep you hungry.',
        danger:'Slow starvation', level:2
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
      traits:{ texts:'double', plans:'vague', exes:'crazy' },
      hello:'Yo. Before you ask: my ex was crazy.',
      reveal:{
        archetype:'The Walking Red Flag', flag:'Every ex was “crazy”',
        quote:'My ex was psycho. Like, all of them.',
        stats:[['Exes','6'],['Exes who were “crazy”','6'],['Self-awareness','loading…']],
        why:'If every story has the same villain, check who’s telling it.',
        danger:'Actual hazard', level:5
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
      traits:{ texts:'read', plans:'big', exes:'close' },
      hello:'Hi. Is this going to be a conversation? Okay.',
      reveal:{
        archetype:'The Emotionally Unavailable', flag:'Feelings: out of office',
        quote:'Can we not do the whole feelings thing?',
        stats:[['Deep talks','0'],['Subject changes per minute','3'],['Headphones','always on']],
        why:'Takes you to a rooftop dinner, then changes the subject the moment you say “feelings”.',
        danger:'Cold front', level:3
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
      traits:{ texts:'double', plans:'vague', exes:'close' },
      hello:'Hey! Sorry, hold on, other line. Okay. Hi!',
      reveal:{
        archetype:'The Option Collector', flag:'Everyone on hold',
        quote:'I’m just seeing where things go. With everyone.',
        stats:[['Active chats','14'],['Dating apps','5'],['You are','option 9']],
        why:'Never says yes, never says no. Keeps everyone warm, just in case.',
        danger:'Waiting list', level:3
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
      traits:{ texts:'double', plans:'big', exes:'close' },
      hello:'Hi! I was just looking at flights for us. Kidding. Unless?',
      reveal:{
        archetype:'The Future Faker', flag:'Fake future plans',
        quote:'We should go to Lisbon in spring. Just us.',
        stats:[['Trips planned','4'],['Trips taken','0'],['Future dog’s name','Biscuit']],
        why:'Sells you a whole future together. The future never actually shows up.',
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
      traits:{ texts:'double', plans:'big', exes:'crazy' },
      hello:'Who was that on the other line? Kidding. Who was it, though?',
      reveal:{
        archetype:'The Detective', flag:'Checks your phone',
        quote:'I’m not jealous. I just want to know who Sara is.',
        stats:[['Location sharing','always on'],['Questions about your coworker','11'],['Trust','pending']],
        why:'Calls it caring. Knows your last seen, your followers and your password.',
        danger:'Full surveillance', level:4
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
      traits:{ texts:'read', plans:'vague', exes:'close' },
      hello:'Hiii! Wait, say that again, I’m recording.',
      reveal:{
        archetype:'The Content Creator', flag:'You’re content',
        quote:'Can you do that again? The light was bad.',
        stats:[['Dates filmed','all of them'],['Your face in the post','cropped'],['Caption about you','“my person”']],
        why:'Every date is a shoot. You’re the lighting, the backdrop and the alibi.',
        danger:'Public exposure', level:2
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
      traits:{ texts:'read', plans:'big', exes:'close' },
      hello:'Oh. Hi. Sorry, I thought you were someone else.',
      reveal:{
        archetype:'The Unfinished Business', flag:'Not over her ex',
        quote:'Sorry, that’s just something my ex used to say.',
        stats:[['Times the ex came up','23'],['Ex’s birthday','still celebrated'],['“Over it”','apparently']],
        why:'Sitting across from you, still talking to someone who isn’t there.',
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
    }
  ]
};
