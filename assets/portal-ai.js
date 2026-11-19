/* AI & psychology unit (version 2.1): cheat sheets, viva answers and the "Responsible AI use?" game.
   Loaded after portal-data.js. All people, tools and organisations in the scenarios are fictional. */
(function(){
const D = window.ICTData;

D.aiSheets = [
 {ic:'🗣️', t:'Prompting for study (not for cheating)', tag:'Sessions 2 & 22', b:`
  <p>A <b>prompt</b> is the instruction you give an AI tool. Good prompts state the <b>role, task, level and format</b>.</p>
  <ul><li><b>Explain:</b> "Explain classical conditioning to a first-year psychology student in 5 short points with one everyday example."</li>
  <li><b>Quiz me:</b> "Ask me 5 multiple-choice questions on working memory, one at a time, and tell me why my answer is right or wrong."</li>
  <li><b>Feedback on my own draft:</b> "Point out unclear sentences in my paragraph. Do not rewrite it." (only if your teacher allows AI feedback)</li>
  <li><b>Plan:</b> "Make a 7-day revision timetable for these topics: …"</li></ul>
  <p><b>Avoid:</b> "Write my assignment on…". Even when allowed, AI output is a draft you must check, change and disclose.</p>
  <p class="tiny">Tip: ask the tool "What might be wrong or missing in your answer?" — then check in your textbook.</p>`},
 {ic:'📚', t:'Citing AI tools in APA 7', tag:'Session 23', b:`
  <p>Use this only when your teacher allows AI and you used its output. Pattern:</p>
  <p class="fxl"><i>Author. (Year). Title of tool (Version) [Large language model]. URL</i></p>
  <p>Example with a <b>fictional</b> tool: <i>Example AI Lab. (2026). StudyBot (Version 4) [Large language model]. https://studybot.example</i></p>
  <ul><li>In the text: (Example AI Lab, 2026).</li>
  <li>Describe <b>how</b> you used it (e.g. in the method or a note) and keep a copy of your prompts and the replies.</li>
  <li>An AI tool is <b>not an author</b> of your work and cannot be the source of facts — find and cite the original research.</li></ul>
  <p class="tiny">APA Style updates its guidance; check the latest APA Style website before submitting.</p>`},
 {ic:'🔒', t:'AI and confidentiality', tag:'Sessions 14, 22 & 23', b:`
  <ul><li><b>Never paste</b> client notes, interview transcripts, survey answers with names, or anyone's health information into a public AI tool.</li>
  <li>Removing a name is often <b>not enough</b>: age, place, job and story details can still identify a person.</li>
  <li>Many tools may store prompts or use them to improve their models. Read the tool's privacy settings and your institution's rules.</li>
  <li>In research, participants agreed to a specific use of their data in the <b>informed consent</b>. Sending it to an outside AI service may break that agreement.</li>
  <li>When in doubt, ask your supervisor <b>before</b> using any tool on real data. Use invented examples to practise.</li></ul>`},
 {ic:'🧐', t:'Spotting AI hallucinations', tag:'Sessions 2, 23 & 26', b:`
  <p>A <b>hallucination</b> is when an AI tool states something false or invented as if it were true.</p>
  <ul><li><b>Fake references:</b> real-looking authors, journals and DOIs that do not exist. Search every reference in Google Scholar or the library.</li>
  <li><b>Made-up numbers:</b> exact percentages with no source.</li>
  <li><b>Wrong quotes:</b> famous people "saying" things they never said.</li>
  <li><b>Outdated facts:</b> the tool's knowledge may stop at a certain date.</li>
  <li><b>Overconfidence:</b> no "maybe" or "evidence is mixed" on debated topics.</li></ul>
  <p><b>Check with SIFT:</b> Stop, Investigate the source, Find better coverage, Trace to the original.</p>`},
 {ic:'🧠', t:'AI in psychology: uses and limits', tag:'Sessions 2, 13, 14 & 22', b:`
  <div class="tblwrap"><table class="cal"><tr><th>Area</th><th>Possible help</th><th>Limits & ethics</th></tr>
  <tr><td>Study</td><td>Explanations, quizzes, summaries of your own notes</td><td>Can be wrong; follow course AI rules; disclose use</td></tr>
  <tr><td>Research</td><td>Finding literature, cleaning data, coding help</td><td>Check every reference; protect participant data; report AI use in the method</td></tr>
  <tr><td>Mental-health apps</td><td>Mood tracking, reminders, psychoeducation, guided exercises</td><td>Not a replacement for a qualified professional; privacy of sensitive data; risk in a crisis</td></tr>
  <tr><td>Assessment</td><td>Scoring support, screening tools</td><td>Bias in training data; diagnosis needs a qualified professional</td></tr></table></div>
  <p>Key principles: <b>human responsibility, consent, confidentiality, fairness and honesty</b>. A chatbot is never a crisis service — people in danger need local emergency services or a qualified professional.</p>`}
];

D.aiViva = [
 ['What is generative AI?','AI that creates new content such as text, images or audio by predicting likely patterns learned from large amounts of existing data. Chatbots and image generators are examples.'],
 ['What is a prompt?','The instruction or question a user gives an AI tool. A clear prompt states the task, the level, the format and any limits.'],
 ['What is an AI hallucination?','When an AI tool confidently gives false or invented information, such as a reference that does not exist. That is why every AI claim must be verified.'],
 ['Why can AI output be biased?','Because it learns from human-produced data, which contains stereotypes and gaps. The output can repeat or even amplify those biases.'],
 ['Is using AI for an assignment plagiarism?','It depends on the course policy. Submitting AI-generated work as your own without permission or disclosure is academic dishonesty. When AI use is allowed, follow the rules and disclose it.'],
 ['How do you cite an AI tool in APA 7?','Author (the company). (Year). Title of the tool (Version) [Large language model]. URL. You also explain how you used it, and cite original research for facts.'],
 ['Why should client or participant data never be pasted into a public chatbot?','It breaks confidentiality and may break the informed consent participants gave. The data may be stored by the provider, and details can identify a person even without a name.'],
 ['Can an AI mental-health app replace a psychologist?','No. Apps can support psychoeducation, tracking and exercises, but they cannot replace assessment, diagnosis and treatment by a qualified professional, especially in a crisis.'],
 ['What is a deepfake and why does it matter for psychology?','A realistic fake video, image or voice made with AI. It can be used for fraud, harassment or misinformation and can cause real psychological harm to victims.'],
 ['Name three responsible ways a student can use AI.','To explain a difficult concept and then check it in the textbook, to make self-test quizzes, and to plan a revision timetable — always within the course policy.']
];

/* Game: a = 0 Responsible, 1 Check the rule first, 2 Not OK */
D.aiGame = [
 {s:'Mahnoor asks a chatbot to explain the difference between reliability and validity, then checks the explanation in her research methods textbook.', a:0, why:'Using AI to understand a concept and then verifying it is a good learning use.'},
 {s:'Danish pastes his teacher\'s essay question into a chatbot and submits the answer under his own name.', a:2, why:'Presenting AI-written work as your own is academic dishonesty.'},
 {s:'Sobia copies notes from a counselling practice session, including the client\'s age, town and family story, into a free chatbot to "summarise" them.', a:2, why:'Even without a name, these details can identify the client. This breaks confidentiality.'},
 {s:'Arsalan wants to use an AI grammar tool to polish his own assignment paragraph.', a:1, why:'Often allowed, but courses differ. Check the policy and disclose the use if required.'},
 {s:'Fatima asks AI to make 10 practice MCQs on Week 7 topics so she can test herself before the quiz.', a:0, why:'Self-testing with AI-made questions is a helpful study strategy (just check the answers are correct).'},
 {s:'Hassan uses five references suggested by a chatbot in his literature review without opening any of them.', a:2, why:'Chatbots can invent references. Every source must be found and read before it is cited.'},
 {s:'A group wants to use an AI image generator to make the cover picture for their project poster.', a:1, why:'Check the course rules and the tool\'s terms, avoid real people\'s faces, and label the image as AI-made.'},
 {s:'Komal feels very low late at night and relies only on a chatbot instead of talking to anyone.', a:2, why:'A chatbot is not a crisis service. Talking to a trusted person or a qualified professional matters; in danger, contact local emergency services.'},
 {s:'Junaid uses AI to make a 7-day revision timetable from his list of exam topics.', a:0, why:'Planning and organising study time is a low-risk, helpful use.'},
 {s:'Your research supervisor has not said anything about AI. You want to use an AI tool to help analyse your anonymised survey data.', a:1, why:'Ask your supervisor first and check how the tool stores data. Report any AI use in your method section.'},
 {s:'Rida asks AI to translate a difficult English article summary into Urdu to understand it, then reads the original article.', a:0, why:'Using AI as a support to understand, then returning to the original source, is responsible.'},
 {s:'Bilal makes a realistic AI video of a classmate saying embarrassing things "as a joke" and shares it in the class group.', a:2, why:'This is a deepfake used to humiliate someone — a form of cyberbullying and possibly an offence.'}
];

/* Add AI viva answers to the main viva list once. */
if(!D.viva.some(v=>v[0]===D.aiViva[0][0])) D.viva.push(...D.aiViva);
})();
