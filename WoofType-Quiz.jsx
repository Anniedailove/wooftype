import { useState, useEffect, useRef } from "react";

// ─── BREED DATA (condensed) ───────────────────────────────────────────────────
const BREEDS = {
  husky: {
    name:"Siberian Husky",emoji:"🐺",
    gradient:"linear-gradient(135deg,#667eea 0%,#764ba2 50%,#f093fb 100%)",
    color:"#764ba2",accent:"#f093fb",
    tagline:"Wild heart. Free spirit. Always chasing the horizon.",
    free:"You are the Siberian Husky — boundless, magnetic, and impossible to tame. You thrive on adventure and get restless inside routines that feel too small for your spirit. People are drawn to your striking energy and genuine love for life. You make friends everywhere, though you march to your own beat. There's a whole report waiting to show you how to work with your nature — not against it.",
    testimonial:{name:"Marcus T.",location:"Denver, CO",text:"As a Husky I finally understood why I've always felt 'too much' for most people. The career section alone changed how I think about my work.",stars:5},
    videoQuote:"\"I took the quiz as a joke and ended up crying reading my report. It was so accurate it was scary.\"",
    report:{
      identity:{text:"Husky personalities combine fierce independence with deep loyalty. You feel things intensely but express them in bursts, which confuses people who don't know you. Your greatest tension is between freedom and belonging — you don't have to choose.",steps:["Identify one relationship you've been inconsistent in. Send one honest message — not an apology, just presence.","Schedule one 'solo adventure hour' weekly with zero agenda. A Husky without open sky becomes anxious."]},
      energy:{text:"Your energy runs in powerful waves — high highs and sudden crashes. Fighting this rhythm causes burnout. Your body needs movement that feels like freedom, not obligation.",steps:["Replace one workout with something playful — a trail run, a swim, dancing alone. Track your mood.","When a crash comes, give yourself 20 minutes of intentional rest. You'll return at 80% instead of grinding to 40%."]},
      relationships:{text:"You love fiercely but your independence can read as emotional distance. The Husky who learns to verbalize affection becomes almost irresistibly magnetic.",steps:["Once a day for two weeks, say out loud what you appreciate about someone close. It will feel awkward. Do it anyway.","When needing space: 'I need a few hours, it's not about you, I'll be back.' This prevents 90% of Husky relationship conflicts."]},
      career:{text:"You suffocate in rigid structures. Traditional offices feel like a sled harness with no snow. You need freedom, variety, and meaningful challenge.",steps:["List every constraint vs. fuel in your current work. If constraints outnumber 2:1, start planning an exit.","Identify one skill you genuinely love. Research three roles where that skill is the main event."]},
      wellness:{text:"Your mental health ties directly to physical freedom and forward momentum. Stagnation is your enemy. You don't need more rest — you need more meaning in your movement.",steps:["Start a 'novelty log' — one new thing weekly. New route, new food, new conversation.","Notice when you pick fights or feel irritable. This almost always means you've been still too long. Move first."]},
    },
    monthly:["🌊 Riding Your Energy Waves Without Burning Out","🐺 Building Your Pack: Relationships on Your Terms","🧭 Career Freedom: Designing Work That Fits You","🔥 Channeling Intensity Into Creative Power","🌿 Grounding Practices for Free Spirits"],
    referralMsg:"I just discovered I'm a Siberian Husky personality 🐺 This quiz broke down my career, relationships & energy with actual action steps. Find your breed →",
  },
  golden:{
    name:"Golden Retriever",emoji:"🐾",
    gradient:"linear-gradient(135deg,#f7971e 0%,#ffd200 50%,#ff6b35 100%)",
    color:"#f7971e",accent:"#ffd200",
    tagline:"Warm, whole-hearted, and everyone's favorite person.",
    free:"You are the Golden Retriever — radiant, genuine, and the person everyone feels better after talking to. You lead with warmth and find joy in simple things. People trust you easily and for good reason — your kindness is never a performance. But there's a side of you nobody talks about, and it's quietly costing you. Your full report reveals it.",
    testimonial:{name:"Priya M.",location:"Austin, TX",text:"I cried reading the relationships section. It described exactly how I give and give and never ask for anything back. The action steps helped me finally change that.",stars:5},
    videoQuote:"\"The 'needs journal' exercise changed my longest friendship in 3 weeks. I finally started asking for what I needed.\"",
    report:{
      identity:{text:"Goldens are emotionally intelligent beyond surface niceness. You sense when someone's struggling before they say a word. But you feel responsible for everyone's happiness — a beautiful burden. The version of you that receives as generously as you give is extraordinary.",steps:["Ask for help with something real this week — something that costs you vulnerability.","Write three things you need in your closest relationships that you've never asked for. Pick one. Ask this week."]},
      energy:{text:"Your energy is warm and generous but has a ceiling. You give until empty, then wonder why you feel resentful. This isn't a flaw — it's a refueling problem.",steps:["Identify your one 'energy vampire.' Reduce contact by 30% this month.","Create a recharge ritual that belongs only to you. Use it proactively — not just in crisis."]},
      relationships:{text:"You are an extraordinary partner. The invisible risk: you give so freely that relationships become unbalanced without either person noticing — until you snap.",steps:["Start a 'needs journal' — each evening write one thing you needed and whether you got it.","Practice 'I need' instead of 'it would be nice if.' One is a request. The other is a wish."]},
      career:{text:"You shine in human-centered work where warmth translates to impact. The danger is taking roles that use your niceness without rewarding your intelligence.",steps:["Audit: how often did you use emotional vs. analytical intelligence last month? If 90/10, you're underutilized.","Find once where you softened feedback at the cost of clarity. Practice the clear version — warmth intact."]},
      wellness:{text:"Your wellness lives in connection and meaning. But there's a quieter threat — absorbing others' stress and calling it empathy. Feeling with someone and feeling for them are different.",steps:["After social interactions: whose feelings are you carrying that aren't yours? Consciously set them down.","Schedule one self-indulgent activity weekly — something that benefits nobody but you."]},
    },
    monthly:["💛 The Art of Receiving: Letting People Love You Back","🛡️ Boundaries with Warmth: Saying No Without Guilt","💼 Career Worth: Getting Paid What You're Actually Worth","🌸 The Joy Practice: Rediscovering What Lights You Up","🤝 Relationship Audit: Who Fills Your Cup?"],
    referralMsg:"I just found out I'm a Golden Retriever personality 🐾 The quiz gave me real insight about my relationships + action steps to improve them. Find your breed →",
  },
  border:{
    name:"Border Collie",emoji:"🧠",
    gradient:"linear-gradient(135deg,#11998e 0%,#38ef7d 50%,#7bed9f 100%)",
    color:"#11998e",accent:"#38ef7d",
    tagline:"Sharper than you let on. Always ten steps ahead.",
    free:"You are the Border Collie — one of the most intelligent and driven personalities alive, even when playing it cool. You notice everything, think fast, and feel quietly frustrated when people around you aren't keeping pace. You carry more responsibility than anyone asked you to. Your full report shows you how to turn that intensity into your greatest asset.",
    testimonial:{name:"James K.",location:"Seattle, WA",text:"The perfectionism section hit so hard. I've been my own worst enemy for years. The 'closed, next' exercise genuinely changed my relationship with decision-making.",stars:5},
    videoQuote:"\"I finally understood why I'm exhausted despite doing everything 'right.' The energy section was a revelation.\"",
    report:{
      identity:{text:"Your mind runs simulations, improves systems, anticipates next moves constantly. This is extraordinary — but it means you almost never truly rest. Your inner critic is as sharp as your intellect.",steps:["Write your three harshest recent self-criticisms. Rewrite each as feedback from a mentor. Notice the tone.","Identify one area where 'good enough' is genuinely sufficient. Deliver at that level without guilt."]},
      energy:{text:"You run on cognitive fuel. Mental under-stimulation drains you as badly as overexertion. Your greatest energy leak isn't effort — it's rumination.",steps:["Set a 'closing time' for decisions: once made, it's made. When your mind returns, say 'Closed. Next.' for 30 days.","Add one purely physical activity weekly that demands body presence and prevents mental multitasking."]},
      relationships:{text:"You love through reliability and quiet devotion. But your standards applied to people can create unintended distance. Learning to express warmth in languages others receive is your greatest relationship unlock.",steps:["Resist solving one problem a close person shares. Just listen and ask 'how does that feel?'","Tell someone you love them without context or reason. Not after something nice — just because."]},
      career:{text:"Underemployment is physically painful for you — your brain manufactures problems if not given real ones. You need work that challenges your full capacity.",steps:["List every work task by cognitive demand: high/medium/low. If 40%+ is low, you have a stimulation deficit.","Identify your highest-leverage skill. Find one way to use it more centrally this month."]},
      wellness:{text:"Your nervous system runs hot. You need full-absorption activities that occupy your mind while resting your analytical engine.",steps:["Try one 'full-absorption' activity this week — rock climbing, chess, learning a song. Something that quiets the monologue.","Sleep is your highest-leverage wellness tool. Every hour under 7 costs 20% of your cognitive edge. Track it."]},
    },
    monthly:["🧩 Perfectionism to Precision: Freeing Your Best Self","💼 Playing Bigger: Stop Managing, Start Leading","❤️ Warmth as Strategy: Deeper Relationships","🧘 The Off Switch: Rest That Actually Works","🚀 Your Next Level: Building the Life Your Mind Deserves"],
    referralMsg:"I'm a Border Collie personality 🧠 The quiz gave me a deep breakdown of my strengths, blind spots and actual action steps. Which breed are you? →",
  },
  basset:{
    name:"Basset Hound",emoji:"🛋️",
    gradient:"linear-gradient(135deg,#c94b4b 0%,#e96c51 50%,#f5a623 100%)",
    color:"#c94b4b",accent:"#f5a623",
    tagline:"Deeply content. Surprisingly wise. Unhurried on purpose.",
    free:"You are the Basset Hound — calm, grounded, and quietly profound. You've discovered something most people spend their whole lives learning: presence is its own reward. Most people underestimate you. Your full report shows you why that's actually your superpower.",
    testimonial:{name:"Elena R.",location:"Portland, OR",text:"I always thought being 'slow' was a weakness. This report reframed my whole identity. The career section gave me permission to stop apologizing for how I work.",stars:5},
    videoQuote:"\"I sent the 'being seen' section to my partner and we had a 2-hour conversation we'd needed for years.\"",
    report:{
      identity:{text:"Basset personalities have a rare gift: full presence. While others chase the next thing, you're actually tasting your food, listening, feeling the sunlight. Your depth is consistently underestimated by people who mistake stillness for slowness.",steps:["Let someone underestimate you this week without correcting them. Observe how much energy you save.","Write a 'depth inventory' — five things you understand more deeply than most. Acknowledge this is rare."]},
      energy:{text:"Your energy is steady and sustainable — the rarest kind. You don't spike and crash; you flow. But your comfort zone can quietly become a cage.",steps:["Distinguish between rest you chose and rest that chose you. Make every rest period intentional this week.","Add one 5-minute physical movement each morning. Not for fitness — for activation."]},
      relationships:{text:"You are the most steadfast partner possible. You remember what matters to people and act on it years later. The risk: your quiet loyalty can become invisible — taken for granted.",steps:["Tell someone specifically what you've quietly done for them. Not for credit — to open a reciprocity conversation.","Identify one relationship where you feel taken for granted. Decide: conversation or distance. Both are valid."]},
      career:{text:"You do your deepest work at your own pace. Fast-paced startup culture is your kryptonite — it rewards speed over substance. You're built for the opposite.",steps:["Identify the time in your career you were most proud of your work. Reverse-engineer those conditions.","Find one task you've been rushing that would benefit from more time. Give it that time. Compare results."]},
      wellness:{text:"Your wellness is rooted in sensory pleasure and environmental comfort. A beautiful space, good food, a comfortable bed — these aren't luxuries, they're infrastructure.",steps:["Identify one part of your environment that drains you. Fix it this week. Track your mood.","Build a morning sensory ritual: one smell, one taste, one sound that signals 'this day is mine.'"]},
    },
    monthly:["🌿 Turning Stillness Into Strategy","🏡 Environment as Medicine: Designing Your Space","💛 Being Seen: Letting People Appreciate You","🌱 Gentle Growth: Expanding Without Losing Peace","📚 The Wisdom Advantage: Using Depth in a Speed World"],
    referralMsg:"Apparently I'm a Basset Hound personality 🛋️ This quiz nailed my work style, relationships and gave me actual steps to grow. Which breed are you? →",
  },
  dalmatian:{
    name:"Dalmatian",emoji:"🎭",
    gradient:"linear-gradient(135deg,#fc466b 0%,#ff6b6b 50%,#ffa07a 100%)",
    color:"#fc466b",accent:"#ffa07a",
    tagline:"Vivid, original, and impossible to overlook.",
    free:"You are the Dalmatian — high-energy, one of a kind, and impossible to ignore. You stand out without trying, leave impressions without planning, and bring enough energy to power a room. Life for you is not background music — it's the main event. Your full report reveals the one thing standing between your energy and your true impact.",
    testimonial:{name:"Taylor B.",location:"Miami, FL",text:"The 'project inventory' exercise made me realize I'd started 14 things this year and finished 2. That was the wake-up call I needed.",stars:5},
    videoQuote:"\"I finally finished something I was proud of after the 'one thing' exercise. First time in two years.\"",
    report:{
      identity:{text:"Your creative fire, when focused, produces extraordinary things. But your intensity needs direction — without it, you scatter energy across too many unfinished ideas. The gap between inspiration and completion is where your confidence quietly erodes.",steps:["Do a 'project inventory' — list everything started in 6 months. Count completions vs. abandonments.","Choose one unfinished project that still excites you. Commit 30 minutes daily for two weeks before starting anything new."]},
      energy:{text:"Your energy is electric and renewable — but directional. Pointed at the right thing, unstoppable. Scattered, it burns bright and leaves nothing. Your greatest tool isn't rest — it's focus.",steps:["Every morning write: 'Today I will finish ___.' One thing. Not a list. Build this for 21 days.","When a shiny idea pulls at you, write it down — honor it — then return. The idea waits. Your momentum won't."]},
      relationships:{text:"You love passionately and expressively. Your intensity can overwhelm people not built like you, and your pace can leave partners feeling like they're watching you rather than being with you.",steps:["In one key relationship, slow down to ask three questions and listen fully before sharing anything.","Find the person who tells you the truth without softening it. Ask: 'How do I make you feel when we're together?'"]},
      career:{text:"Monotony is your kryptonite — not laziness, but your brain under-performs without stimulation. You need enough variety to stay alive and enough structure to actually ship things.",steps:["Identify your single most marketable talent. Make sure current work centers on it, not adjacent to it.","Set one 'ship date' per month — a date by which something releases into the world, finished or not."]},
      wellness:{text:"Your health connects directly to creative output and social stimulation. But your nervous system needs more recovery than you give it — the crash after the high is data, not weakness.",steps:["Add one 'zero stimulation' period daily — 10 minutes with no phone, no music. This is neurological recovery.","Track your mood for two weeks against creative output. Your lowest days follow your least creative ones."]},
    },
    monthly:["🎯 Focus as a Superpower: Finishing What You Start","🎨 Creative Momentum: Building a Body of Work","⚡ Energy Architecture: Performing Without Burning Out","💫 Stage Presence in Real Life: Leading Rooms","🔥 The Originality Edge: Monetizing What Makes You Different"],
    referralMsg:"I just found out I'm a Dalmatian personality 🎭 The quiz was eerily accurate about why I can't finish things — and gave me a fix. Which breed are you? →",
  },
  newfoundland:{
    name:"Newfoundland",emoji:"🏔️",
    gradient:"linear-gradient(135deg,#4e54c8 0%,#8f94fb 50%,#b8c6db 100%)",
    color:"#4e54c8",accent:"#8f94fb",
    tagline:"Gentle giant. The safest place anyone knows.",
    free:"You are the Newfoundland — steady, protective, and profoundly comforting to everyone lucky enough to know you. You don't need to be loudest because your presence speaks for itself. People lean on you instinctively. What nobody talks about is the weight you quietly carry — and your full report addresses exactly that.",
    testimonial:{name:"Angela W.",location:"Chicago, IL",text:"The line 'who holds you?' completely wrecked me in the best way. I've been the strong one my whole life. This report gave me language for something I didn't know how to say.",stars:5},
    videoQuote:"\"I've been the strong one for 35 years. This report was the first time I felt truly seen.\"",
    report:{
      identity:{text:"You are the quiet load-bearer of every community you belong to. You process before speaking, feel before acting, love before judging. Your emotional reservoir is vast — but you absorb weight that was never yours to carry.",steps:["Each evening: 'What am I carrying that belongs to someone else?' List it. Close the notebook. Release it.","Identify one person you support who has never asked how you are. Notice that. Decide what to do."]},
      energy:{text:"Your energy is deep and slow-burning — built for endurance, not sprinting. You absorb stress like a sponge without releasing it. Your fatigue is often emotional, not physical.",steps:["Try 'emotional offloading' — a walk, journal entry, or conversation where you talk about yourself for 10 minutes without pivoting to others.","Notice your body signals when carrying too much. Build a personal list of early warning signs."]},
      relationships:{text:"You are one of the most devoted partners possible. People feel safe with you in a rare way. The shadow: you can disappear into others' needs so completely your own wants become unrecognizable. Who holds you?",steps:["Name one thing you want — not need, not should — just want. Tell one person. Let them respond.","When did someone last take care of you the way you take care of others? If you can't remember, that's your data point."]},
      career:{text:"You need work with real weight — where your presence makes things safer, better, or more human. Superficial roles in high-glamour environments will hollow you out.",steps:["Write a 'meaning audit': which parts of your work genuinely matter to real people? Adjust the ratio.","Where does your steady presence create value nobody acknowledges? Make that visible."]},
      wellness:{text:"Your wellness is built on feeling that the people and things you care about are okay. When you're powerless to help, your system goes into quiet distress that looks like tiredness. This is grief, not laziness.",steps:["Build a 'control inventory' — things you can affect vs. cannot. Practice: 'I care and I cannot fix it. Both are true.'","Physical warmth is genuinely therapeutic for your type — weighted blankets, hot baths, good food."]},
    },
    monthly:["🛡️ Protecting Your Energy Without Closing Your Heart","💙 Letting People In: Receiving the Love You Give","🏔️ Carrying Less: The Art of Emotional Boundaries","🌊 Depth as a Career Asset: Leading Without Noise","🕯️ Sustainable Care: How to Last a Lifetime"],
    referralMsg:"I'm a Newfoundland personality 🏔️ The quiz described me so accurately I sent it to my whole family. Which breed are you? →",
  },
  shiba:{
    name:"Shiba Inu",emoji:"🦊",
    gradient:"linear-gradient(135deg,#f46b45 0%,#eea849 50%,#f7971e 100%)",
    color:"#f46b45",accent:"#eea849",
    tagline:"Fiercely independent. Quietly hilarious. Deeply misunderstood.",
    free:"You are the Shiba Inu — confident, self-possessed, and unbothered by what others think. You have your own code and you live by it. You come across as aloof, but the people who've earned your trust know a completely different side: playful, fierce, and unexpectedly tender. Your full report shows what they're seeing — and what you might be protecting.",
    testimonial:{name:"Chris L.",location:"San Francisco, CA",text:"I've never felt more accurately described by anything. The vulnerability section was uncomfortable to read — which means it was exactly right. Worth every penny.",stars:5},
    videoQuote:"\"Reading this was uncomfortable. That meant it was right. I've already used the trust exercise twice.\"",
    report:{
      identity:{text:"Your values aren't negotiable and your sense of self doesn't bend to social pressure — a form of integrity that's genuinely rare. But there's a fine line between selective and isolated, between principled and rigid.",steps:["Write your actual values — five words maximum. Post them somewhere visible. Evaluate weekly choices against them.","Identify one person kept at arm's length not because they hurt you but because letting them in feels risky. Consider one small act of openness."]},
      energy:{text:"Your energy is precise and non-negotiable. You know what depletes you and protect yourself with admirable efficiency. The growth edge: some things you avoid have value on the other side.",steps:["Identify one thing you reliably avoid that might genuinely benefit you. Do it once, on your terms. Collect data.","Build a 'recharge protocol' you communicate to close people: 'When I go quiet, I need X amount of time.' Prevents misreading."]},
      relationships:{text:"Once committed, your loyalty is absolute and care runs deep. But your reserve can make people feel evaluated rather than welcomed. The people worth having are worth the cost of occasional vulnerability.",steps:["Choose one person you trust. Tell them one true thing you've never said out loud. Notice what happens to the relationship.","Practice micro-expressions of warmth — a specific compliment, a remembered detail, a text that says 'I thought of you.'"]},
      career:{text:"You excel with full ownership of your craft. Micromanagement is performance-destroying for your type. You need environments that judge you by output, not process.",steps:["Audit your current autonomy 1–10. Below 6, start building a case — or an exit plan.","Identify your one non-negotiable work condition. Make sure your current or next role explicitly provides it."]},
      wellness:{text:"Your wellness ties to authenticity and autonomy. Being asked to perform emotions you don't feel, or socialize past your limit, is genuinely depleting. The practice is protecting this without total withdrawal.",steps:["Reframe alone time as 'operating system updates' — essential, not antisocial. Schedule it like a meeting.","Find one physical practice that belongs entirely to you: solo running, martial arts, swimming, archery."]},
    },
    monthly:["🦊 Independence vs. Isolation: Finding the Right Distance","🔑 Trust as a Practice: Opening Without Losing Yourself","💼 Autonomy by Design: Building a Career on Your Terms","🎯 Precision Living: Cutting What Doesn't Belong","🌸 The Soft Side: Warmth as Strength, Not Weakness"],
    referralMsg:"I'm a Shiba Inu personality 🦊 Apparently 'fiercely independent and deeply misunderstood' — and honestly accurate. Find your breed →",
  },
  labrador:{
    name:"Labrador Retriever",emoji:"🌞",
    gradient:"linear-gradient(135deg,#f9d423 0%,#ff9f43 50%,#ee5a24 100%)",
    color:"#f9a825",accent:"#ff9f43",
    tagline:"Enthusiastic, reliable, and genuinely good to the core.",
    free:"You are the Labrador — exuberant, dependable, and the person who makes everything feel like it's going to be okay. You approach life with an open heart and infectious energy. You're everyone's favorite — but your full report asks a harder question: when are you your own?",
    testimonial:{name:"Keisha D.",location:"Atlanta, GA",text:"The part about being 'everyone's reliable one but nobody's priority' described my whole life. The self-advocacy steps have already changed how I show up at work.",stars:5},
    videoQuote:"\"I read this to my boyfriend and he said 'this is EXACTLY you.' Then he cried. Then I cried.\"",
    report:{
      identity:{text:"You work hard, play hard, and show up consistently without needing recognition — a rarity that makes you magnetic. But 'reliable' can quietly become 'taken for granted.' The version of you that holds others to the same standards you hold yourself is the most powerful version.",steps:["List your top five commitments to others. Then your top five to yourself. Compare. They tell you everything.","This week, do one thing purely for yourself that you'd normally only do if someone else needed it."]},
      energy:{text:"Your energy is abundant when pointed at things you care about. But 'agreeable' and 'energized' aren't the same. You can sustain effort in mismatched roles longer than any other type — which means your burnout arrives quietly, when it's hardest to recover.",steps:["Rate Monday–Friday for energy and meaning for one month (1–5 each). The pattern shows exactly where you're leaking.","When you say yes this week, pause: 'Am I saying yes because I want to, or to not disappoint someone?'"]},
      relationships:{text:"You are affectionate, fun, and rock-solid loyal. The growth edge: you can be so focused on positive atmosphere that you skip real conversations that would deepen things.",steps:["In your closest relationship, ask one genuinely difficult question you've been keeping light. Stay in it.","Practice receiving a compliment without deflecting. No 'oh it was nothing.' Just say 'thank you' and let it land."]},
      career:{text:"You elevate every team you join. But teams don't always elevate you back. Your agreeableness makes it hard to be seen as a leader rather than support. You have both — stop letting people hire half of you.",steps:["Identify the last time you softened a strong opinion at work. Write the unsoftened version. What would have happened?","Find one opportunity this week to disagree — professionally, specifically, with a solution attached."]},
      wellness:{text:"Your wellness is social and physical in equal measure. Isolation hits you fast. But you need to ensure social time is truly nourishing — being around people and being truly seen are not the same.",steps:["Audit your last 10 social interactions: how many left you genuinely connected vs. just stimulated? Prioritize depth.","Build one purely physical daily habit. Your body processes emotion through movement more than you realize."]},
    },
    monthly:["🌞 From Likable to Respected: Advocating for Yourself","💪 Saying No as an Act of Love","🤝 Depth Over Frequency: Better Relationships","🏆 Career Visibility: Getting Seen for What You Do","✨ Finding Your Edge: What Makes You Irreplaceable"],
    referralMsg:"I'm a Labrador Retriever personality 🌞 The quiz asked 'when are you your own favorite person?' and I had no answer. Find your breed →",
  },
};

const QUESTIONS = [
  {id:1,text:"Your perfect Saturday looks like...",emoji:"🗓️",options:[
    {label:"Exploring somewhere completely new",emoji:"🗺️",breeds:{husky:3,dalmatian:2}},
    {label:"Cozy at home with people I love",emoji:"🏠",breeds:{golden:3,newfoundland:2,basset:2}},
    {label:"Deep in a project or passion of mine",emoji:"🔬",breeds:{border:3,shiba:2}},
    {label:"Social plans — the more the merrier",emoji:"🎉",breeds:{labrador:3,golden:2,dalmatian:2}},
  ]},
  {id:2,text:"When things go wrong, you first...",emoji:"⚡",options:[
    {label:"Immediately start solving it",emoji:"🔧",breeds:{border:3,labrador:2}},
    {label:"Make sure everyone around you is okay",emoji:"🤗",breeds:{golden:3,newfoundland:3}},
    {label:"Go quiet and process alone",emoji:"🤫",breeds:{shiba:3,basset:2}},
    {label:"Shake it off and keep moving",emoji:"💨",breeds:{husky:3,dalmatian:2,labrador:2}},
  ]},
  {id:3,text:"People close to you would call you...",emoji:"💬",options:[
    {label:"The reliable one — always shows up",emoji:"🏅",breeds:{labrador:3,newfoundland:3}},
    {label:"The wild card — keeps life interesting",emoji:"🃏",breeds:{husky:3,dalmatian:3}},
    {label:"The deep thinker — always processing",emoji:"🧩",breeds:{border:3,basset:2,shiba:2}},
    {label:"The warm heart — makes everyone feel welcome",emoji:"☀️",breeds:{golden:3,labrador:2}},
  ]},
  {id:4,text:"At a party, you naturally...",emoji:"🎊",options:[
    {label:"Work the room and meet everyone",emoji:"🤝",breeds:{dalmatian:3,labrador:3}},
    {label:"Find one person and go really deep",emoji:"💭",breeds:{golden:3,newfoundland:2,basset:2}},
    {label:"Observe first, connect with a select few",emoji:"👀",breeds:{shiba:3,border:2}},
    {label:"Become the entertainment — can't help it",emoji:"🎭",breeds:{dalmatian:3,husky:2}},
  ]},
  {id:5,text:"Your relationship with rules is...",emoji:"📋",options:[
    {label:"Respectful — they exist for a reason",emoji:"✅",breeds:{labrador:3,newfoundland:2,golden:2}},
    {label:"Selective — I follow the ones that make sense",emoji:"🤔",breeds:{shiba:3,border:2}},
    {label:"Questioning — I need to understand first",emoji:"❓",breeds:{border:3,dalmatian:1}},
    {label:"Flexible — rules are more like suggestions",emoji:"😏",breeds:{husky:3,dalmatian:3}},
  ]},
  {id:6,text:"When you care about someone, you show it by...",emoji:"💞",options:[
    {label:"Showing up consistently, no matter what",emoji:"🤍",breeds:{newfoundland:3,labrador:3}},
    {label:"Doing thoughtful things without being asked",emoji:"🎁",breeds:{golden:3,basset:2}},
    {label:"Spending real, quality time together",emoji:"⏰",breeds:{basset:3,husky:2,shiba:2}},
    {label:"Being fully, energetically present with them",emoji:"✨",breeds:{dalmatian:3,labrador:2}},
  ]},
  {id:7,text:"What motivates you most deeply?",emoji:"🔥",options:[
    {label:"Freedom — new experiences, open possibilities",emoji:"🌍",breeds:{husky:3,dalmatian:2}},
    {label:"Connection — making people feel loved",emoji:"💝",breeds:{golden:3,newfoundland:2,labrador:2}},
    {label:"Mastery — getting genuinely excellent at something",emoji:"🏆",breeds:{border:3,shiba:2}},
    {label:"Expression — creating, performing, being seen",emoji:"🎨",breeds:{dalmatian:3,husky:2}},
  ]},
  {id:8,text:"In a conflict, you tend to...",emoji:"⚖️",options:[
    {label:"Address it directly and move on fast",emoji:"💥",breeds:{border:3,shiba:2,labrador:2}},
    {label:"Try to smooth it over and restore harmony",emoji:"🕊️",breeds:{golden:3,newfoundland:2}},
    {label:"Go quiet until fully processed",emoji:"🌙",breeds:{shiba:3,basset:2}},
    {label:"Get it out loud — I'd rather argue and resolve",emoji:"🗣️",breeds:{husky:3,dalmatian:2}},
  ]},
];

const MONTHLY_THEMES=[
  {icon:"⚡",title:"Energy & Vitality",label:"Month 1",note:"Unlocks now"},
  {icon:"💞",title:"Relationships & Love",label:"Month 2",note:"Coming soon"},
  {icon:"💼",title:"Career & Purpose",label:"Month 3",note:"Coming soon"},
  {icon:"🧘",title:"Stress & Calm",label:"Month 4",note:"Coming soon"},
  {icon:"🗣️",title:"Communication",label:"Month 5",note:"Coming soon"},
];

const RECENT_BUYERS=[
  "Sarah from Austin just unlocked her Golden Retriever report 🐾",
  "Marcus from Denver just joined the monthly membership 🌟",
  "Priya from NYC just discovered she's a Border Collie 🧠",
  "James from Seattle just unlocked his full report 🐺",
  "Taylor from Miami just joined the membership 🎭",
  "Angela from Chicago unlocked her Newfoundland report 🏔️",
  "Chris from SF just became a Shiba Inu member 🦊",
  "Keisha from Atlanta just shared her breed result 🌞",
];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const CSS=`
  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  body{background:#0f0c29;font-family:'Nunito',sans-serif;color:#fff;}
  .app{min-height:100vh;background:linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;position:relative;overflow:hidden;}
  .orb{position:fixed;border-radius:50%;pointer-events:none;z-index:0;filter:blur(80px);opacity:.32;animation:orbFloat 8s ease-in-out infinite;}
  .orb1{width:500px;height:500px;background:radial-gradient(circle,#667eea,#764ba2);top:-150px;left:-100px;animation-delay:0s;}
  .orb2{width:400px;height:400px;background:radial-gradient(circle,#f7971e,#fc466b);bottom:-100px;right:-80px;animation-delay:-3s;}
  .orb3{width:300px;height:300px;background:radial-gradient(circle,#11998e,#38ef7d);top:40%;left:60%;animation-delay:-5s;}
  @keyframes orbFloat{0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-30px) scale(1.05);}}
  .card{background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.15);border-radius:32px;padding:48px 44px;max-width:640px;width:100%;backdrop-filter:blur(24px);box-shadow:0 32px 80px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.15);position:relative;z-index:1;}
  .eyebrow{font-size:12px;font-weight:800;letter-spacing:.25em;text-transform:uppercase;background:linear-gradient(90deg,#f7971e,#ffd200,#f7971e);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 3s linear infinite;margin-bottom:14px;}
  @keyframes shimmer{to{background-position:200% center;}}
  .woof-logo{font-family:'Fredoka One',cursive;font-size:48px;line-height:1;margin-bottom:4px;background:linear-gradient(135deg,#FF6B35,#FFD200,#FF3CAC);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:gradMove 3s ease infinite;}
  .woof-tagline-sm{font-size:13px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:20px;}

  h1{font-family:'Fredoka One',cursive;font-size:50px;line-height:1.05;color:#fff;margin-bottom:14px;}
  .grad{background:linear-gradient(135deg,#f7971e,#ffd200,#ff6b6b,#a855f7);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:gradMove 4s ease infinite;}
  @keyframes gradMove{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
  .subtitle{font-size:17px;color:rgba(255,255,255,.65);line-height:1.6;margin-bottom:28px;font-weight:500;}
  .stats{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:28px;}
  .stat-pill{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:50px;padding:9px 18px;display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:#fff;}
  .stat-val{font-family:'Fredoka One',cursive;font-size:19px;color:#ffd200;}
  .breed-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px;}
  .breed-tag{font-size:13px;font-weight:700;padding:5px 13px;border-radius:50px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;transition:all .2s;cursor:default;}
  .breed-tag:hover{background:rgba(255,255,255,.2);transform:translateY(-2px);}
  .btn-main{background:linear-gradient(135deg,#f7971e,#ffd200);color:#1a0a00;border:none;border-radius:50px;padding:16px 38px;font-size:17px;font-family:'Fredoka One',cursive;cursor:pointer;transition:all .25s;box-shadow:0 8px 32px rgba(247,151,30,.5);display:inline-flex;align-items:center;gap:8px;}
  .btn-main:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 16px 48px rgba(247,151,30,.6);}
  .btn-main:disabled{opacity:.6;cursor:not-allowed;transform:none;}
  .btn-ghost{background:rgba(255,255,255,.08);color:rgba(255,255,255,.7);border:1.5px solid rgba(255,255,255,.2);border-radius:50px;padding:14px 26px;font-size:15px;font-family:'Nunito',sans-serif;font-weight:700;cursor:pointer;transition:all .2s;}
  .btn-ghost:hover{background:rgba(255,255,255,.15);color:#fff;}
  .btn-danger{background:rgba(239,68,68,.15);color:#fca5a5;border:1.5px solid rgba(239,68,68,.3);border-radius:50px;padding:12px 24px;font-size:14px;font-family:'Nunito',sans-serif;font-weight:700;cursor:pointer;transition:all .2s;}
  .btn-danger:hover{background:rgba(239,68,68,.25);}
  .prog-wrap{margin-bottom:32px;}
  .prog-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}
  .prog-lbl{font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5);}
  .prog-remain{font-size:13px;font-weight:900;color:#ffd200;}
  .prog-track{height:8px;background:rgba(255,255,255,.1);border-radius:4px;overflow:hidden;}
  .prog-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,#667eea,#f7971e,#ffd200,#38ef7d);background-size:200% auto;animation:shimmer 2s linear infinite;transition:width .6s cubic-bezier(.34,1.56,.64,1);}
  .q-emoji{font-size:36px;display:block;margin-bottom:12px;animation:bounce 2s ease-in-out infinite;}
  @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  .q-text{font-family:'Fredoka One',cursive;font-size:27px;line-height:1.3;color:#fff;margin-bottom:26px;}
  .options{display:flex;flex-direction:column;gap:12px;}
  .opt{background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.12);border-radius:18px;padding:16px 20px;font-size:16px;font-family:'Nunito',sans-serif;font-weight:700;color:#fff;cursor:pointer;text-align:left;transition:all .22s cubic-bezier(.34,1.56,.64,1);display:flex;align-items:center;gap:14px;}
  .opt:hover{background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.35);transform:translateX(6px) scale(1.01);box-shadow:0 8px 24px rgba(0,0,0,.3);}
  .opt.sel{background:linear-gradient(135deg,rgba(247,151,30,.25),rgba(255,210,0,.15));border-color:#ffd200;transform:translateX(6px) scale(1.01);}
  .opt-emoji{font-size:24px;flex-shrink:0;}
  .opt-dot{width:22px;height:22px;border-radius:50%;flex-shrink:0;margin-left:auto;border:2px solid rgba(255,255,255,.3);background:transparent;transition:all .2s;display:flex;align-items:center;justify-content:center;}
  .opt.sel .opt-dot{background:#ffd200;border-color:#ffd200;}
  .opt-dot-i{width:8px;height:8px;border-radius:50%;background:#1a0a00;opacity:0;transition:opacity .15s;}
  .opt.sel .opt-dot-i{opacity:1;}
  .anim{transition:opacity .25s ease,transform .25s ease;}
  .anim.in{opacity:1;transform:translateY(0);}
  .anim.out{opacity:0;transform:translateY(16px);}
  .divider{border:none;border-top:1px solid rgba(255,255,255,.1);margin:24px 0;}
  .inp-lbl{font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:8px;display:block;}
  .inp{width:100%;background:rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.2);border-radius:14px;padding:14px 18px;font-size:16px;font-family:'Nunito',sans-serif;font-weight:600;color:#fff;margin-bottom:16px;outline:none;transition:all .2s;}
  .inp::placeholder{color:rgba(255,255,255,.3);}
  .inp:focus{border-color:#ffd200;background:rgba(255,255,255,.12);}
  .breed-header{border-radius:24px;padding:32px;margin-bottom:24px;text-align:center;position:relative;overflow:hidden;}
  .breed-emoji-big{font-size:76px;display:block;margin-bottom:12px;animation:popIn .5s cubic-bezier(.34,1.56,.64,1);}
  @keyframes popIn{from{transform:scale(0) rotate(-20deg)}to{transform:scale(1) rotate(0)}}
  .breed-type-badge{display:inline-block;margin-bottom:10px;background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.4);border-radius:50px;padding:4px 16px;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#fff;}
  .breed-name{font-family:'Fredoka One',cursive;font-size:36px;color:#fff;margin-bottom:6px;text-shadow:0 2px 20px rgba(0,0,0,.4);}
  .breed-tagline{font-size:15px;color:rgba(255,255,255,.85);font-style:italic;font-weight:600;}
  .insight-box{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:24px;margin-bottom:18px;}
  .sec-title{font-family:'Fredoka One',cursive;font-size:18px;color:#ffd200;margin-bottom:12px;display:flex;align-items:center;gap:8px;}
  .body-text{font-size:15px;line-height:1.8;color:rgba(255,255,255,.85);font-weight:500;}

  /* VIDEO BOX */
  .video-box{background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.15);border-radius:20px;margin-bottom:18px;overflow:hidden;}
  .video-thumb{width:100%;aspect-ratio:16/9;background:linear-gradient(135deg,rgba(102,126,234,.3),rgba(118,75,162,.3));display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;position:relative;transition:all .2s;}
  .video-thumb:hover .play-btn{transform:scale(1.1);}
  .play-btn{width:64px;height:64px;background:rgba(255,255,255,.95);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 32px rgba(0,0,0,.4);transition:transform .2s;}
  .play-icon{width:0;height:0;border-style:solid;border-width:12px 0 12px 22px;border-color:transparent transparent transparent #1a1a2e;margin-left:4px;}
  .video-quote{padding:16px 20px;font-size:14px;color:rgba(255,255,255,.7);font-style:italic;font-weight:600;border-top:1px solid rgba(255,255,255,.08);}

  /* SHARE */
  .share-box{background:linear-gradient(135deg,rgba(102,126,234,.2),rgba(118,75,162,.2));border:1px solid rgba(102,126,234,.4);border-radius:18px;padding:18px 22px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;}
  .btn-share{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border:none;border-radius:50px;padding:10px 22px;font-size:13px;font-family:'Nunito',sans-serif;font-weight:800;cursor:pointer;transition:all .2s;white-space:nowrap;}
  .btn-share:hover{transform:scale(1.05);box-shadow:0 4px 16px rgba(102,126,234,.5);}

  /* SOCIAL PROOF */
  .sp-ticker{background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);border-radius:12px;padding:10px 16px;font-size:13px;font-weight:700;color:#86efac;margin-bottom:16px;display:flex;align-items:center;gap:10px;}
  .sp-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;flex-shrink:0;animation:spulse 2s infinite;}
  @keyframes spulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.7}}
  .sp-count{background:linear-gradient(135deg,rgba(247,151,30,.15),rgba(255,210,0,.1));border:1px solid rgba(247,151,30,.3);border-radius:12px;padding:10px 18px;font-size:14px;font-weight:700;color:#ffd200;text-align:center;margin-bottom:18px;}

  /* PAYWALL */
  .paywall{background:linear-gradient(135deg,rgba(247,151,30,.1),rgba(255,210,0,.05));border:1.5px solid rgba(247,151,30,.35);border-radius:24px;padding:28px;position:relative;overflow:hidden;}
  .paywall::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#f7971e,#ffd200,#fc466b,#667eea,#11998e,#f7971e);background-size:300% auto;animation:shimmer 3s linear infinite;}
  .pwall-badge{display:inline-flex;align-items:center;gap:6px;border-radius:50px;padding:5px 16px;font-size:12px;font-weight:800;margin-bottom:14px;background:rgba(247,151,30,.2);border:1px solid rgba(247,151,30,.5);color:#ffd200;}
  .pwall-title{font-family:'Fredoka One',cursive;font-size:23px;color:#fff;margin-bottom:8px;}
  .pwall-sub{font-size:14px;color:rgba(255,255,255,.6);line-height:1.7;margin-bottom:16px;font-weight:600;}
  .feature-pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;}
  .feature-pill{font-size:12px;font-weight:800;padding:5px 14px;border-radius:50px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.8);}
  .testi{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:18px 20px;margin-bottom:16px;}
  .testi-stars{color:#ffd200;font-size:15px;margin-bottom:8px;}
  .testi-text{font-size:14px;color:rgba(255,255,255,.8);font-style:italic;line-height:1.6;margin-bottom:8px;font-weight:600;}
  .testi-author{font-size:12px;color:rgba(255,255,255,.45);font-weight:700;}
  .tier-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;}
  .tier{background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.12);border-radius:18px;padding:20px 18px;cursor:pointer;transition:all .22s;position:relative;}
  .tier:hover{background:rgba(255,255,255,.12);transform:translateY(-3px);}
  .tier.active{border-color:#ffd200;background:rgba(255,210,0,.12);}
  .tier-hot{position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#f7971e,#ffd200);color:#1a0a00;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;padding:3px 14px;border-radius:50px;white-space:nowrap;}
  .tier-price{font-family:'Fredoka One',cursive;font-size:28px;color:#fff;}
  .tier-per{font-size:11px;color:rgba(255,255,255,.45);font-weight:700;}
  .tier-name{font-size:13px;font-weight:800;color:rgba(255,255,255,.7);margin:4px 0 8px;}
  .tier-features{list-style:none;}
  .tier-features li{font-size:12px;color:rgba(255,255,255,.6);font-weight:700;padding:2px 0;display:flex;gap:6px;}
  .annual-tier{background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.12);border-radius:16px;padding:16px 20px;cursor:pointer;transition:all .22s;display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}
  .annual-tier:hover,.annual-tier.active{border-color:#ffd200;background:rgba(255,210,0,.1);}
  .monthly-box{background:rgba(102,126,234,.12);border:1px solid rgba(102,126,234,.3);border-radius:18px;padding:20px 22px;margin-bottom:16px;}
  .monthly-lbl{font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#93c5fd;margin-bottom:12px;}
  .month-row{display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid rgba(147,197,253,.15);}
  .month-row:last-child{border-bottom:none;}
  .guarantee{background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);border-radius:12px;padding:12px 16px;display:flex;gap:10px;align-items:center;margin-top:12px;}
  .guarantee-text{font-size:12px;color:#86efac;font-weight:700;line-height:1.4;}
  .trust-row{display:flex;gap:16px;flex-wrap:wrap;margin-top:10px;}
  .trust-item{font-size:11px;color:rgba(255,255,255,.4);font-weight:700;display:flex;align-items:center;gap:4px;}

  /* TIMER */
  .timer-bar{background:linear-gradient(135deg,rgba(239,68,68,.15),rgba(251,146,60,.1));border:1px solid rgba(239,68,68,.4);border-radius:14px;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px;}
  .timer-lbl{font-size:13px;font-weight:700;color:rgba(255,255,255,.7);}
  .timer-num{font-family:'Fredoka One',cursive;font-size:26px;background:linear-gradient(135deg,#f7971e,#ef4444);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
  .timer-urgent{animation:timerPulse .8s ease-in-out infinite;}
  @keyframes timerPulse{0%,100%{opacity:1}50%{opacity:.6}}

  /* REFERRAL BOX */
  .referral-box{background:linear-gradient(135deg,rgba(56,239,125,.12),rgba(17,153,142,.08));border:1.5px solid rgba(56,239,125,.35);border-radius:20px;padding:24px;margin-top:16px;}
  .referral-title{font-family:'Fredoka One',cursive;font-size:20px;color:#38ef7d;margin-bottom:8px;}
  .referral-sub{font-size:14px;color:rgba(255,255,255,.65);font-weight:600;line-height:1.6;margin-bottom:16px;}
  .referral-link{background:rgba(0,0,0,.3);border:1px dashed rgba(56,239,125,.4);border-radius:12px;padding:12px 16px;font-size:13px;font-weight:700;color:#38ef7d;font-family:'Nunito',sans-serif;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;word-break:break-all;}
  .btn-copy{background:rgba(56,239,125,.2);color:#38ef7d;border:1px solid rgba(56,239,125,.4);border-radius:50px;padding:7px 16px;font-size:12px;font-weight:800;cursor:pointer;transition:all .2s;white-space:nowrap;}
  .btn-copy:hover{background:rgba(56,239,125,.35);}
  .referral-steps{list-style:none;margin-top:8px;}
  .referral-steps li{font-size:13px;color:rgba(255,255,255,.65);font-weight:600;padding:4px 0;display:flex;gap:8px;}
  .ref-num{background:rgba(56,239,125,.2);color:#38ef7d;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;flex-shrink:0;margin-top:1px;}

  /* MODAL */
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,.85);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;z-index:100;padding:20px;}
  .modal{background:linear-gradient(135deg,#1a1a2e,#16213e);border:1.5px solid rgba(255,255,255,.15);border-radius:28px;padding:40px 36px;max-width:480px;width:100%;box-shadow:0 40px 100px rgba(0,0,0,.7);max-height:90vh;overflow-y:auto;}
  .modal-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;}
  .modal-title{font-family:'Fredoka One',cursive;font-size:24px;color:#fff;}
  .close-btn{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.6);width:34px;height:34px;border-radius:50%;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;}
  .order-box{background:rgba(247,151,30,.12);border:1px solid rgba(247,151,30,.3);border-radius:14px;padding:16px 18px;display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
  .order-price{font-family:'Fredoka One',cursive;font-size:22px;color:#ffd200;}
  .g2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  .order-bump{background:rgba(255,255,255,.05);border:1.5px dashed rgba(255,210,0,.4);border-radius:14px;padding:14px 16px;cursor:pointer;transition:all .2s;margin-bottom:16px;display:flex;gap:12px;align-items:flex-start;}
  .order-bump:hover,.order-bump.on{background:rgba(255,210,0,.08);border-style:solid;border-color:#ffd200;}
  .bump-check{width:22px;height:22px;border-radius:6px;border:2px solid rgba(255,255,255,.3);background:transparent;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;transition:all .2s;margin-top:1px;}
  .bump-check.on{background:#ffd200;border-color:#ffd200;color:#1a0a00;font-weight:900;}
  .note{font-size:11px;color:rgba(255,255,255,.3);text-align:center;margin-top:10px;font-style:italic;}

  /* PAUSE MODAL */
  .pause-box{background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.3);border-radius:20px;padding:24px;margin-top:24px;}
  .pause-title{font-family:'Fredoka One',cursive;font-size:20px;color:#93c5fd;margin-bottom:8px;}
  .pause-sub{font-size:14px;color:rgba(255,255,255,.6);font-weight:600;line-height:1.6;margin-bottom:16px;}
  .pause-options{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px;}
  .pause-opt{background:rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.15);border-radius:12px;padding:10px 18px;font-size:14px;font-weight:700;color:rgba(255,255,255,.7);cursor:pointer;transition:all .2s;}
  .pause-opt:hover,.pause-opt.active{border-color:#93c5fd;background:rgba(147,197,253,.15);color:#93c5fd;}

  /* EXIT INTENT */
  .exit-overlay{position:fixed;inset:0;background:rgba(0,0,0,.92);backdrop-filter:blur(16px);display:flex;align-items:center;justify-content:center;z-index:200;padding:20px;}
  .exit-modal{background:linear-gradient(135deg,#1a1a2e,#16213e);border:2px solid rgba(247,151,30,.5);border-radius:32px;padding:44px 40px;max-width:440px;width:100%;text-align:center;box-shadow:0 40px 100px rgba(0,0,0,.8),0 0 60px rgba(247,151,30,.2);}
  .exit-emoji{font-size:56px;display:block;margin-bottom:14px;animation:bounce 1.5s ease-in-out infinite;}
  .exit-title{font-family:'Fredoka One',cursive;font-size:30px;color:#fff;margin-bottom:10px;}
  .exit-sub{font-size:15px;color:rgba(255,255,255,.6);line-height:1.65;margin-bottom:20px;font-weight:600;}
  .exit-price{font-family:'Fredoka One',cursive;font-size:52px;background:linear-gradient(135deg,#f7971e,#ffd200);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
  .exit-og{font-size:14px;color:rgba(255,255,255,.4);text-decoration:line-through;margin-bottom:22px;font-weight:700;}

  /* PREMIUM */
  .badge-success{background:rgba(34,197,94,.15);border:1px solid rgba(34,197,94,.4);color:#86efac;border-radius:50px;padding:5px 16px;font-size:12px;font-weight:800;display:inline-flex;align-items:center;gap:6px;}
  .badge-member{background:rgba(102,126,234,.15);border:1px solid rgba(102,126,234,.4);color:#93c5fd;border-radius:50px;padding:5px 16px;font-size:12px;font-weight:800;display:inline-flex;align-items:center;gap:6px;margin-left:6px;}
  .prm-section{border-radius:20px;padding:22px 24px;margin-bottom:14px;border:1px solid;}
  .action-box{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:16px 18px;margin-top:14px;}
  .action-step{display:flex;gap:12px;margin-bottom:12px;align-items:flex-start;}
  .action-step:last-child{margin-bottom:0;}
  .step-num{background:linear-gradient(135deg,#f7971e,#ffd200);color:#1a0a00;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;flex-shrink:0;margin-top:1px;}
  .step-text{font-size:14px;line-height:1.65;color:rgba(255,255,255,.8);font-weight:600;}
  .action-lbl{font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#ffd200;margin-bottom:12px;}
  .scroll-card{max-height:88vh;overflow-y:auto;}
  .scroll-card::-webkit-scrollbar{width:4px;}
  .scroll-card::-webkit-scrollbar-thumb{background:rgba(255,210,0,.4);border-radius:2px;}
  @media(max-width:520px){.card{padding:32px 22px;}h1{font-size:36px;}.tier-grid{grid-template-columns:1fr;}.g2{grid-template-columns:1fr;}.annual-tier{flex-direction:column;align-items:flex-start;gap:6px;}}
`;

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function Timer({secs}){
  const m=Math.floor(secs/60),s=secs%60,urgent=secs<120;
  return(
    <div className="timer-bar">
      <span className="timer-lbl">⏰ Introductory price expires in</span>
      <span className={`timer-num${urgent?" timer-urgent":""}`}>{String(m).padStart(2,"0")}:{String(s).padStart(2,"0")}</span>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App(){
  const[screen,setScreen]=useState("intro");
  const[scores,setScores]=useState({});
  const[qIdx,setQIdx]=useState(0);
  const[result,setResult]=useState(null);
  const[animIn,setAnimIn]=useState(true);
  const[selOpt,setSelOpt]=useState(null);
  const[email,setEmail]=useState("");
  const[name,setName]=useState("");
  const[emailErr,setEmailErr]=useState("");
  const[payOpen,setPayOpen]=useState(false);
  const[tier,setTier]=useState("membership");
  const[bumpOn,setBumpOn]=useState(false);
  const[processing,setProcessing]=useState(false);
  const[purchased,setPurchased]=useState(null);
  const[card,setCard]=useState({name:"",number:"",exp:"",cvv:""});
  const[timerSecs,setTimerSecs]=useState(15*60);
  const[timerOn,setTimerOn]=useState(false);
  const[buyerIdx,setBuyerIdx]=useState(0);
  const[showExit,setShowExit]=useState(false);
  const[exitShown,setExitShown]=useState(false);
  const[shareDone,setShareDone]=useState(false);
  const[refCopied,setRefCopied]=useState(false);
  const[showPause,setShowPause]=useState(false);
  const[pauseMonths,setPauseMonths]=useState(1);
  const[pauseActive,setPauseActive]=useState(false);
  const[videoPaused,setVideoPaused]=useState(true);
  const topRef=useRef(null);
  const timerRef=useRef(null);

  const totalQ=QUESTIONS.length;
  const progress=(qIdx/totalQ)*100;
  const remaining=totalQ-qIdx;
  const referralCode=name?`ref-${name.toLowerCase().replace(/\s/g,"-")}-${Math.random().toString(36).slice(2,6)}`:"ref-youruniquecode";
  const referralUrl=`wooftype.com/${referralCode}`;

  useEffect(()=>{
    if(timerOn&&timerSecs>0){timerRef.current=setInterval(()=>setTimerSecs(s=>s-1),1000);}
    return()=>clearInterval(timerRef.current);
  },[timerOn]);

  useEffect(()=>{
    const t=setInterval(()=>setBuyerIdx(i=>i+1),4500);
    return()=>clearInterval(t);
  },[]);

  useEffect(()=>{
    if(screen!=="result")return;
    const handler=(e)=>{if(e.clientY<30&&!exitShown&&!purchased){setShowExit(true);setExitShown(true);}};
    document.addEventListener("mousemove",handler);
    return()=>document.removeEventListener("mousemove",handler);
  },[screen,exitShown,purchased]);

  function pick(opt){
    if(selOpt)return;
    setSelOpt(opt);
    const ns={...scores};
    Object.entries(opt.breeds).forEach(([b,p])=>{ns[b]=(ns[b]||0)+p;});
    setTimeout(()=>{
      setSelOpt(null);setAnimIn(false);
      setTimeout(()=>{
        if(qIdx+1<totalQ){setQIdx(qIdx+1);setAnimIn(true);}
        else{
          const top=Object.entries(ns).sort((a,b)=>b[1]-a[1])[0][0];
          setResult(BREEDS[top]);setScores(ns);setScreen("email");setAnimIn(true);
        }
      },200);
    },360);
  }

  function submitEmail(){
    if(!email.includes("@")||!email.includes(".")){setEmailErr("Please enter a valid email.");return;}
    setEmailErr("");setScreen("result");setTimerOn(true);
    setTimeout(()=>topRef.current?.scrollIntoView({behavior:"smooth"}),50);
  }

  function getTotal(){
    const base=tier==="report"?9.99:tier==="membership"?7.99:3.99;
    return(base+(bumpOn?4.99:0)).toFixed(2);
  }

  function pay(){
    setProcessing(true);
    setTimeout(()=>{
      setProcessing(false);setPurchased(tier);setPayOpen(false);
      setScreen(tier==="report"?"premium":"membership");
      clearInterval(timerRef.current);
      setTimeout(()=>topRef.current?.scrollIntoView({behavior:"smooth"}),50);
    },2000);
  }

  function share(){
    const msg=result?.referralMsg+` ${referralUrl}`;
    navigator.clipboard?.writeText(msg).catch(()=>{});
    setShareDone(true);setTimeout(()=>setShareDone(false),3000);
  }

  function copyRef(){
    navigator.clipboard?.writeText(`https://${referralUrl}`).catch(()=>{});
    setRefCopied(true);setTimeout(()=>setRefCopied(false),3000);
  }

  function restart(){
    setScreen("intro");setScores({});setQIdx(0);setResult(null);
    setEmail("");setName("");setPurchased(null);setBumpOn(false);
    setCard({name:"",number:"",exp:"",cvv:""});
    setTimerSecs(15*60);setTimerOn(false);
    setShowExit(false);setExitShown(false);setShareDone(false);
    setRefCopied(false);setShowPause(false);setPauseActive(false);
    clearInterval(timerRef.current);
    setTimeout(()=>topRef.current?.scrollIntoView({behavior:"smooth"}),50);
  }

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if(screen==="intro")return(
    <><style>{CSS}</style>
    <div className="app">
      <div className="orb orb1"/><div className="orb orb2"/><div className="orb orb3"/>
      <div className="card" ref={topRef}>
        <div className="woof-logo">WoofType</div>
        <div className="woof-tagline-sm">🐾 Discover Your Inner Breed</div>
        <h1><span className="grad">WoofType</span><br/>Which Breed Are You?</h1>
        <p className="subtitle">Discover your inner breed in 8 questions 🐾 Real insight. Real action steps. Zero fluff.</p>
        <div className="sp-count">🔥 <strong>2,847 people</strong> discovered their WoofType this week 🐾</div>
        <div className="stats">
          {[["8","⚡","Questions"],["8","🐾","Breeds"],["Free","🎁","Insight"],["5","🌟","Life Areas"]].map(([v,ic,l])=>(
            <div key={l} className="stat-pill"><span>{ic}</span><span className="stat-val">{v}</span><span style={{fontSize:12,color:"rgba(255,255,255,0.5)",fontWeight:700}}>{l}</span></div>
          ))}
        </div>
        <button className="btn-main" onClick={()=>setScreen("quiz")}>🐾 Find My WoofType →</button>
        <div className="breed-tags">
          {["🐺 Husky","🐾 Golden","🧠 Border Collie","🛋️ Basset","🎭 Dalmatian","🏔️ Newfoundland","🦊 Shiba","🌞 Labrador"].map(b=>(
            <span key={b} className="breed-tag">{b}</span>
          ))}
        </div>
      </div>
    </div></>
  );

  // ── QUIZ ───────────────────────────────────────────────────────────────────
  if(screen==="quiz"){
    const q=QUESTIONS[qIdx];
    return(
      <><style>{CSS}</style>
      <div className="app">
        <div className="orb orb1"/><div className="orb orb2"/><div className="orb orb3"/>
        <div className="card">
          <div className="prog-wrap">
            <div className="prog-meta">
              <span className="prog-lbl">Question {qIdx+1} of {totalQ}</span>
              <span className="prog-remain">{remaining===1?"🏁 Last one!":`✨ ${remaining} to go`}</span>
            </div>
            <div className="prog-track"><div className="prog-fill" style={{width:`${progress}%`}}/></div>
          </div>
          <div className={`anim ${animIn?"in":"out"}`}>
            <span className="q-emoji">{q.emoji}</span>
            <div className="q-text">{q.text}</div>
            <div className="options">
              {q.options.map((opt,i)=>(
                <button key={i} className={`opt${selOpt===opt?" sel":""}`} onClick={()=>pick(opt)}>
                  <span className="opt-emoji">{opt.emoji}</span>
                  <span style={{flex:1}}>{opt.label}</span>
                  <div className="opt-dot"><div className="opt-dot-i"/></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div></>
    );
  }

  // ── EMAIL GATE ─────────────────────────────────────────────────────────────
  if(screen==="email")return(
    <><style>{CSS}</style>
    <div className="app">
      <div className="orb orb1"/><div className="orb orb2"/><div className="orb orb3"/>
      <div className="card" style={{textAlign:"center"}}>
        <span style={{fontSize:72,display:"block",marginBottom:12,animation:"popIn .5s cubic-bezier(.34,1.56,.64,1)"}}>{result?.emoji}</span>
        <div className="eyebrow" style={{textAlign:"center"}}>✨ Your result is waiting!</div>
        <h1 style={{fontSize:34,textAlign:"center",marginBottom:12}}>Meet Your <span className="grad">WoofType</span></h1>
        <p className="subtitle" style={{textAlign:"center",marginBottom:24}}>Drop your details to reveal your WoofType — free, instantly. 🐾</p>
        <div style={{textAlign:"left"}}>
          <label className="inp-lbl">Your First Name</label>
          <input className="inp" placeholder="e.g. Alex" value={name} onChange={e=>setName(e.target.value)}/>
          <label className="inp-lbl">Email Address</label>
          <input className="inp" placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submitEmail()}/>
          {emailErr&&<div style={{fontSize:13,color:"#f87171",marginBottom:12,fontWeight:700}}>⚠️ {emailErr}</div>}
          <button className="btn-main" style={{width:"100%",justifyContent:"center",marginBottom:12}} onClick={submitEmail}>🐾 Reveal My WoofType!</button>
          <p style={{fontSize:11,color:"rgba(255,255,255,.3)",textAlign:"center",fontWeight:600}}>🔒 Zero spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </div></>
  );

  // ── RESULT ─────────────────────────────────────────────────────────────────
  if(screen==="result"&&result)return(
    <><style>{CSS}</style>
    <div className="app">
      <div className="orb orb1"/><div className="orb orb2"/><div className="orb orb3"/>
      <div className="card" ref={topRef}>
        <div className="breed-header" style={{background:result.gradient}}>
          <span className="breed-emoji-big">{result.emoji}</span>
          <div className="breed-type-badge">{name?`${name}, you are the`:"You are the"}</div>
          <div className="breed-name">{result.name}</div>
          <div className="breed-tagline">"{result.tagline}"</div>
        </div>

        <div className="sp-ticker"><div className="sp-dot"/>{RECENT_BUYERS[buyerIdx%RECENT_BUYERS.length]}</div>

        {/* VIDEO PLACEHOLDER */}
        <div className="video-box">
          <div className="video-thumb" onClick={()=>setVideoPaused(!videoPaused)}>
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16,padding:24}}>
              <div className="play-btn"><div className="play-icon"/></div>
              <div style={{textAlign:"center"}}>
                <div style={{fontFamily:"'Fredoka One',cursive",fontSize:18,color:"#fff",marginBottom:4}}>🎬 See What Members Are Saying</div>
                <div style={{fontSize:13,color:"rgba(255,255,255,.6)",fontWeight:600}}>2 min · Real {result.name} members</div>
              </div>
            </div>
          </div>
          <div className="video-quote">💬 {result.videoQuote}</div>
        </div>

        <div className="insight-box">
          <div className="sec-title">🌿 Your Free Insight</div>
          <p className="body-text">{result.free}</p>
        </div>

        <div className="share-box">
          <div style={{fontSize:14,fontWeight:700,color:"rgba(255,255,255,.8)"}}>🐾 Share your result with friends!</div>
          <button className="btn-share" onClick={share}>{shareDone?"✅ Copied!":"Share My WoofType 🐾"}</button>
        </div>

        <div className="divider"/>

        <div className="paywall">
          <Timer secs={timerSecs}/>
          <div className="pwall-badge">🔒 Full Breed Report</div>
          <div className="pwall-title">Unlock Your Complete {result.name} Profile</div>
          <p className="pwall-sub">Deep analysis across 5 life areas — each with 2 concrete action steps built specifically for your breed. Plus monthly growth themes to keep you evolving.</p>
          <div className="feature-pills">
            {["🧠 Identity","⚡ Energy","💞 Relationships","💼 Career","🌿 Wellness"].map(f=>(
              <span key={f} className="feature-pill">{f}</span>
            ))}
          </div>
          <div className="testi">
            <div className="testi-stars">{"★".repeat(result.testimonial.stars)}</div>
            <div className="testi-text">"{result.testimonial.text}"</div>
            <div className="testi-author">— {result.testimonial.name}, {result.testimonial.location}</div>
          </div>
          <div className="tier-grid">
            <div className={`tier${tier==="report"?" active":""}`} onClick={()=>setTier("report")}>
              <div className="tier-name">One-Time Report</div>
              <div className="tier-price">$9.99</div>
              <div className="tier-per">one time · yours forever</div>
              <ul className="tier-features">
                <li>✦ Full 5-area deep dive</li>
                <li>✦ 10 action steps</li>
                <li>✦ Lifetime access</li>
              </ul>
            </div>
            <div className={`tier${tier==="membership"?" active":""}`} onClick={()=>setTier("membership")} style={{position:"relative"}}>
              <div className="tier-hot">🔥 Most Popular</div>
              <div className="tier-name">Monthly Growth</div>
              <div className="tier-price">$7.99</div>
              <div className="tier-per">per month · cancel anytime</div>
              <ul className="tier-features">
                <li>✦ Full report included</li>
                <li>✦ Monthly theme drops</li>
                <li>✦ Breed challenges</li>
                <li>✦ Cancel anytime</li>
              </ul>
            </div>
          </div>
          <div className={`annual-tier${tier==="annual"?" active":""}`} onClick={()=>setTier("annual")}>
            <div>
              <div style={{fontSize:13,fontWeight:800,color:"rgba(255,255,255,.8)",marginBottom:2}}>🏆 Annual — Best Value (Save 50%)</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.4)",fontWeight:700}}>Everything in Monthly · $47.88/year billed once</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Fredoka One',cursive",fontSize:22,color:"#fff"}}>$3.99</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.4)",fontWeight:700}}>/month</div>
            </div>
          </div>
          <div className="monthly-box">
            <div className="monthly-lbl">📅 Monthly Themes (Members Only)</div>
            {MONTHLY_THEMES.map((t,i)=>(
              <div key={i} className="month-row">
                <div style={{fontSize:18,width:32,textAlign:"center"}}>{t.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:800,color:"#93c5fd"}}>{t.label}: {t.title}</div>
                  <div style={{fontSize:11,color:"rgba(147,197,253,.6)"}}>Personalized for {result.name}s</div>
                </div>
                <div style={{fontSize:10,color:"rgba(147,197,253,.5)",fontStyle:"italic"}}>{t.note}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:12}}>
            <button className="btn-main" onClick={()=>setPayOpen(true)}>
              {tier==="report"?"🔓 Get My Report · $9.99":tier==="membership"?"🚀 Join Monthly · $7.99/mo":"🏆 Join Annual · $3.99/mo"}
            </button>
            <button className="btn-ghost" onClick={restart}>↩ Retake</button>
          </div>
          <div className="guarantee">
            <span style={{fontSize:22}}>🛡️</span>
            <div className="guarantee-text"><strong>30-Day Money-Back Guarantee.</strong> Not completely happy? Full refund, no questions asked.</div>
          </div>
          <div className="trust-row">
            <span className="trust-item">🔒 Secure Checkout</span>
            <span className="trust-item">⚡ Instant Access</span>
            <span className="trust-item">✉️ Cancel Anytime</span>
          </div>
        </div>
      </div>

      {/* PAYMENT MODAL */}
      {payOpen&&(
        <div className="overlay">
          <div className="modal">
            <div className="modal-hdr">
              <div className="modal-title">Complete Order</div>
              <button className="close-btn" onClick={()=>setPayOpen(false)}>✕</button>
            </div>
            <Timer secs={timerSecs}/>
            <div className="order-box">
              <div>
                <div style={{fontWeight:700,fontSize:14,color:"#fff"}}>{result.name} — {tier==="report"?"One-Time Report":tier==="membership"?"Monthly Membership":"Annual Membership"}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.4)",marginTop:2,fontWeight:600}}>{tier==="report"?"Yours forever":"Cancel anytime"} · Instant access</div>
              </div>
              <div className="order-price">${tier==="report"?"9.99":tier==="membership"?"7.99":"3.99"}</div>
            </div>
            <div className={`order-bump${bumpOn?" on":""}`} onClick={()=>setBumpOn(!bumpOn)}>
              <div className={`bump-check${bumpOn?" on":""}`}>{bumpOn?"✓":""}</div>
              <div>
                <div style={{fontSize:13,fontWeight:800,color:"#ffd200",marginBottom:3}}>⬆️ Add Compatibility Guide · +$4.99</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.5)",fontWeight:600,lineHeight:1.5}}>Discover which breeds you're most compatible with in love, friendship & work.</div>
              </div>
            </div>
            <label className="inp-lbl">Name on Card</label>
            <input className="inp" placeholder="Jane Smith" value={card.name} onChange={e=>setCard({...card,name:e.target.value})}/>
            <label className="inp-lbl">Card Number</label>
            <input className="inp" placeholder="4242 4242 4242 4242" maxLength={19} value={card.number} onChange={e=>setCard({...card,number:e.target.value.replace(/\D/g,"").replace(/(.{4})/g,"$1 ").trim()})}/>
            <div className="g2">
              <div><label className="inp-lbl">Expiry</label><input className="inp" placeholder="MM / YY" value={card.exp} onChange={e=>setCard({...card,exp:e.target.value})}/></div>
              <div><label className="inp-lbl">CVV</label><input className="inp" placeholder="•••" maxLength={4} value={card.cvv} onChange={e=>setCard({...card,cvv:e.target.value})}/></div>
            </div>
            <button className="btn-main" style={{width:"100%",justifyContent:"center",opacity:processing?.65:1,marginBottom:8}} onClick={pay} disabled={processing}>
              {processing?"⏳ Processing...":` Pay $${getTotal()} & Unlock`}
            </button>
            <div className="guarantee" style={{marginBottom:8}}>
              <span>🛡️</span>
              <div className="guarantee-text">30-day money-back guarantee. No questions asked.</div>
            </div>
            <div className="note">🔒 Demo checkout · No real charge made</div>
          </div>
        </div>
      )}

      {/* EXIT INTENT */}
      {showExit&&(
        <div className="exit-overlay">
          <div className="exit-modal">
            <span className="exit-emoji">{result.emoji}</span>
            <div className="exit-title">Hold up! 👋</div>
            <p className="exit-sub">Your {result.name} full report is still here. We're offering it at our lowest price — today only.</p>
            <div className="exit-price">$6.99</div>
            <div className="exit-og">Regular price: $9.99</div>
            <button className="btn-main" style={{width:"100%",justifyContent:"center",marginBottom:12}} onClick={()=>{setShowExit(false);setTier("report");setPayOpen(true);}}>
              🎉 Grab it for $6.99 →
            </button>
            <button className="btn-ghost" style={{width:"100%",justifyContent:"center"}} onClick={()=>setShowExit(false)}>
              No thanks, I'll pass on the savings
            </button>
          </div>
        </div>
      )}
    </div></>
  );

  // ── PREMIUM / MEMBERSHIP ───────────────────────────────────────────────────
  if((screen==="premium"||screen==="membership")&&result){
    const areas=[
      {key:"identity",icon:"🧠",label:"Identity & Core Strengths",gradient:"linear-gradient(135deg,rgba(102,126,234,.15),rgba(118,75,162,.1))",border:"rgba(102,126,234,.3)"},
      {key:"energy",icon:"⚡",label:"Energy & Vitality",gradient:"linear-gradient(135deg,rgba(247,151,30,.15),rgba(255,210,0,.1))",border:"rgba(247,151,30,.3)"},
      {key:"relationships",icon:"💞",label:"Relationships & Love",gradient:"linear-gradient(135deg,rgba(252,70,107,.15),rgba(63,94,251,.1))",border:"rgba(252,70,107,.3)"},
      {key:"career",icon:"💼",label:"Career & Purpose",gradient:"linear-gradient(135deg,rgba(17,153,142,.15),rgba(56,239,125,.1))",border:"rgba(17,153,142,.3)"},
      {key:"wellness",icon:"🌿",label:"Wellness & Mind",gradient:"linear-gradient(135deg,rgba(34,197,94,.12),rgba(16,185,129,.08))",border:"rgba(34,197,94,.3)"},
    ];
    return(
      <><style>{CSS}</style>
      <div className="app">
        <div className="orb orb1"/><div className="orb orb2"/><div className="orb orb3"/>
        <div className="card scroll-card" ref={topRef}>
          <div style={{marginBottom:16,display:"flex",flexWrap:"wrap",gap:8}}>
            <span className="badge-success">✦ {screen==="membership"?"Membership Active":"Report Unlocked"}</span>
            {screen==="membership"&&<span className="badge-member">📅 Monthly Themes Active</span>}
          </div>
          <div className="breed-header" style={{background:result.gradient,marginBottom:24}}>
            <span className="breed-emoji-big">{result.emoji}</span>
            <div className="breed-type-badge">{result.name} · Full Report</div>
            <div className="breed-name">{name?`${name}'s Profile`:"Your Profile"}</div>
            <div className="breed-tagline">"{result.tagline}"</div>
          </div>

          {areas.map(({key,icon,label,gradient,border})=>{
            const s=result.report[key];
            if(!s)return null;
            return(
              <div key={key} className="prm-section" style={{background:gradient,borderColor:border}}>
                <div className="sec-title">{icon} {label}</div>
                <p className="body-text">{s.text}</p>
                <div className="action-box">
                  <div className="action-lbl">🎯 Your 2 Action Steps This Week</div>
                  {s.steps.map((step,i)=>(
                    <div key={i} className="action-step">
                      <div className="step-num">{i+1}</div>
                      <div className="step-text">{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {screen==="membership"&&(
            <>
              <div className="divider"/>
              <span className="badge-member" style={{marginBottom:16}}>📅 Your Monthly Growth Journey</span>
              <p className="body-text" style={{marginBottom:14}}>Each month a new theme drops — breed-specific challenges, reflections, and action steps tailored to your {result.name} nature.</p>
              <div className="monthly-box">
                <div className="monthly-lbl">Your Upcoming Themes</div>
                {result.monthly.map((t,i)=>(
                  <div key={i} className="month-row">
                    <div style={{fontSize:18,width:32,textAlign:"center"}}>{t.split(" ")[0]}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:800,color:"#93c5fd"}}>Month {i+1}: {t.substring(t.indexOf(" ")+1)}</div>
                      <div style={{fontSize:11,color:"rgba(147,197,253,.6)"}}>Personalized for {result.name} personalities</div>
                    </div>
                    <div style={{fontSize:10,color:"rgba(147,197,253,.5)",fontStyle:"italic"}}>{i===0?"Now":"Soon"}</div>
                  </div>
                ))}
              </div>

              {/* REFERRAL PROGRAM */}
              <div className="referral-box">
                <div className="referral-title">🤝 Refer a Friend, Get a Free Month! 🐾</div>
                <p className="referral-sub">Share your unique link. When a friend joins any plan, you both get one month free — automatically. No limit on referrals.</p>
                <div className="referral-link">
                  <span>{referralUrl}</span>
                  <button className="btn-copy" onClick={copyRef}>{refCopied?"✅ Copied!":"Copy Link"}</button>
                </div>
                <ul className="referral-steps">
                  {["Share your link on TikTok, Instagram, or text it to a friend","They sign up for any report or membership","You BOTH get one free month — credited automatically","No limit — every referral earns you another month free 🎉"].map((s,i)=>(
                    <li key={i}><span className="ref-num">{i+1}</span>{s}</li>
                  ))}
                </ul>
                <div style={{marginTop:14}}>
                  <button className="btn-share" style={{padding:"10px 22px"}} onClick={share}>
                    {shareDone?"✅ Copied Share Message!":"📤 Share My Breed Result"}
                  </button>
                </div>
              </div>

              {/* PAUSE SUBSCRIPTION */}
              {!pauseActive?(
                <div className="pause-box">
                  <div className="pause-title">⏸️ Need a Break? Pause Instead of Cancel.</div>
                  <p className="pause-sub">Life gets busy. Pause your membership for 1, 2, or 3 months — no charge while paused. Your profile and monthly themes will be right here when you return.</p>
                  <div className="pause-options">
                    {[1,2,3].map(m=>(
                      <div key={m} className={`pause-opt${pauseMonths===m?" active":""}`} onClick={()=>setPauseMonths(m)}>
                        {m} Month{m>1?"s":""}
                      </div>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                    <button className="btn-ghost" style={{fontSize:14,padding:"11px 22px"}} onClick={()=>{setPauseActive(true);}}>
                      ⏸️ Pause for {pauseMonths} Month{pauseMonths>1?"s":""}
                    </button>
                    <button className="btn-danger" onClick={restart}>Cancel Membership</button>
                  </div>
                </div>
              ):(
                <div className="pause-box" style={{textAlign:"center"}}>
                  <div style={{fontSize:36,marginBottom:8}}>⏸️</div>
                  <div className="pause-title" style={{textAlign:"center"}}>Membership Paused</div>
                  <p className="pause-sub" style={{textAlign:"center"}}>Paused for {pauseMonths} month{pauseMonths>1?"s":""}. No charge during this time. We'll email you before it resumes.</p>
                  <button className="btn-main" style={{margin:"0 auto"}} onClick={()=>setPauseActive(false)}>▶️ Resume Now</button>
                </div>
              )}
            </>
          )}

          <div className="divider"/>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <button className="btn-ghost" onClick={restart}>↩ Take Quiz Again</button>
            <button className="btn-share" style={{padding:"13px 24px"}} onClick={share}>
              {shareDone?"✅ Copied!":"🐾 Share My WoofType"}
            </button>
          </div>
        </div>
      </div></>
    );
  }

  return null;
}
