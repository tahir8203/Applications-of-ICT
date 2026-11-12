/* Portal content for ICT-1013: cheat sheets, viva questions, "ICT today" notes, toolbox, safety steps and practice banks.
   All people, banks, shops and messages in the practice banks are fictional. */
window.ICTData = {
sheets: [
 {ic:'⌨️', t:'Keyboard shortcuts (Windows)', tag:'Sessions 1 & 5', b:`
  <div class="tblwrap"><table class="cal"><tr><th>Shortcut</th><th>What it does</th><th>Shortcut</th><th>What it does</th></tr>
  <tr><td><kbd>Ctrl</kbd>+<kbd>C</kbd> / <kbd>X</kbd> / <kbd>V</kbd></td><td>Copy / cut / paste</td><td><kbd>Ctrl</kbd>+<kbd>Z</kbd> / <kbd>Y</kbd></td><td>Undo / redo</td></tr>
  <tr><td><kbd>Ctrl</kbd>+<kbd>S</kbd></td><td>Save</td><td><kbd>Ctrl</kbd>+<kbd>P</kbd></td><td>Print</td></tr>
  <tr><td><kbd>Ctrl</kbd>+<kbd>A</kbd></td><td>Select all</td><td><kbd>Ctrl</kbd>+<kbd>F</kbd></td><td>Find on the page or in the document</td></tr>
  <tr><td><kbd>Alt</kbd>+<kbd>Tab</kbd></td><td>Switch between open windows</td><td><kbd>Win</kbd>+<kbd>D</kbd></td><td>Show the desktop</td></tr>
  <tr><td><kbd>Win</kbd>+<kbd>E</kbd></td><td>Open File Explorer</td><td><kbd>Win</kbd>+<kbd>L</kbd></td><td>Lock the computer</td></tr>
  <tr><td><kbd>Win</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd></td><td>Screenshot of a selected area</td><td><kbd>Win</kbd>+<kbd>V</kbd></td><td>Clipboard history</td></tr>
  <tr><td><kbd>F2</kbd></td><td>Rename the selected file</td><td><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Esc</kbd></td><td>Task Manager</td></tr>
  <tr><td><kbd>Ctrl</kbd>+<kbd>T</kbd></td><td>New browser tab</td><td><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd></td><td>Reopen the tab you just closed</td></tr></table></div>
  <p>On a Mac, use <kbd>⌘ Command</kbd> where Windows uses <kbd>Ctrl</kbd>. Lock your screen (<kbd>Win</kbd>+<kbd>L</kbd>) every time you leave a shared or lab computer.</p>`},
 {ic:'📝', t:'Microsoft Word essentials', tag:'Session 5', b:`
  <ul><li><b>Use Styles</b> (Heading 1, Heading 2, Normal) instead of formatting each heading by hand. Styles give you an automatic table of contents: <i>References → Table of Contents</i>.</li>
  <li><b>Page break</b>: <kbd>Ctrl</kbd>+<kbd>Enter</kbd>. Never press Enter many times to reach a new page.</li>
  <li><b>Find and replace</b>: <kbd>Ctrl</kbd>+<kbd>H</kbd>. <b>Insert a link</b>: <kbd>Ctrl</kbd>+<kbd>K</kbd>.</li>
  <li><b>Track Changes</b> (<i>Review</i> tab) shows who changed what; <b>Comments</b> are for feedback without editing the text.</li>
  <li><b>Citations</b>: <i>References → Insert Citation</i>, style APA, then <i>Bibliography</i> to build the reference list.</li>
  <li><b>Assignments</b>: 12 pt readable font, 1.5 or double spacing if asked, page numbers, your name and roll number, then export to PDF (<i>File → Save As → PDF</i>) so the layout does not change.</li></ul>`},
 {ic:'📊', t:'Excel formulas you will use', tag:'Session 5', b:`
  <p>Every formula starts with <code>=</code>. A range is written <code>B2:B11</code>.</p>
  <div class="tblwrap"><table class="cal"><tr><th>Formula</th><th>Meaning</th><th>Example use in psychology</th></tr>
  <tr><td><code>=SUM(B2:B11)</code></td><td>Add the values</td><td>Total score on a 10-item scale</td></tr>
  <tr><td><code>=AVERAGE(B2:B11)</code></td><td>Mean</td><td>Mean stress score of a group</td></tr>
  <tr><td><code>=MEDIAN(B2:B11)</code></td><td>Middle value</td><td>Typical reaction time when there are outliers</td></tr>
  <tr><td><code>=MAX(…)</code> / <code>=MIN(…)</code></td><td>Largest / smallest</td><td>Range of scores</td></tr>
  <tr><td><code>=COUNT(B2:B11)</code></td><td>How many cells hold numbers</td><td>Number of participants who answered</td></tr>
  <tr><td><code>=COUNTIF(B2:B11,"&gt;=50")</code></td><td>Count cells that meet a condition</td><td>How many scored 50 or more</td></tr>
  <tr><td><code>=IF(B2&gt;=50,"Pass","Fail")</code></td><td>Choose between two results</td><td>Label each participant</td></tr>
  <tr><td><code>=STDEV.S(B2:B11)</code></td><td>Sample standard deviation</td><td>How spread out the scores are</td></tr>
  <tr><td><code>=ROUND(C2,2)</code></td><td>Round to 2 decimal places</td><td>Report a mean as 14.37</td></tr></table></div>
  <p><b>Relative vs absolute:</b> <code>B2</code> changes when you copy the formula down; <code>$B$2</code> stays fixed. <b>Common errors:</b> <code>#DIV/0!</code> dividing by zero or an empty cell · <code>#NAME?</code> misspelt function · <code>#VALUE!</code> text where a number is needed · <code>#REF!</code> a cell that was deleted.</p>
  <p><b>Charts:</b> bar chart to compare groups, line chart for change over time, pie chart only for parts of one whole (few slices).</p>`},
 {ic:'🖥️', t:'PowerPoint: slides people can read', tag:'Session 5', b:`
  <ul><li><b>One idea per slide.</b> A slide supports what you say; it is not your script.</li>
  <li>As a rule of thumb, keep to about <b>6 lines</b> and a few words per line, with text of <b>24 pt or larger</b>.</li>
  <li><b>High contrast</b>: dark text on a light background or the opposite. Avoid red on green.</li>
  <li>Use a real picture or a simple chart instead of a paragraph. Give every chart a title and axis labels.</li>
  <li>Use the same fonts and colours on every slide (<i>Slide Master</i>).</li>
  <li>Few animations, used for a reason (for example, revealing one step at a time).</li>
  <li>Shortcuts: <kbd>F5</kbd> start from the first slide · <kbd>Shift</kbd>+<kbd>F5</kbd> start from the current slide · <kbd>Ctrl</kbd>+<kbd>M</kbd> new slide · <kbd>B</kbd> black screen while presenting.</li>
  <li>Last slide: sources (APA) and a clear closing message, not just "Thank you".</li></ul>`},
 {ic:'🔎', t:'Search operators', tag:'Session 3', b:`
  <div class="tblwrap"><table class="cal"><tr><th>Type this</th><th>What you get</th></tr>
  <tr><td><code>"working memory"</code></td><td>The exact phrase</td></tr>
  <tr><td><code>anxiety -medication</code></td><td>Pages about anxiety that do not mention medication</td></tr>
  <tr><td><code>site:edu.pk counselling</code></td><td>Results only from Pakistani university websites</td></tr>
  <tr><td><code>filetype:pdf "stress scale"</code></td><td>Only PDF files</td></tr>
  <tr><td><code>depression OR "low mood"</code></td><td>Either term</td></tr>
  <tr><td><code>intitle:"cognitive dissonance"</code></td><td>Pages with the phrase in the title</td></tr></table></div>
  <p><b>For assignments</b> start with <b>Google Scholar</b> and your university's digital library, not a general search. In Scholar, use <i>Cited by</i> to find newer work and the <b>❞ Cite</b> button to copy an APA reference (always check it). <b>Before you trust a page:</b> who wrote it, when, what is their evidence, and does another reliable source agree?</p>`},
 {ic:'📧', t:'Formal email template', tag:'Session 4', b:`
  <pre class="code">To:       teacher@university.example
Subject:  ICT-1013 – Assignment 1 submission – Roll No. BSPSY-24-017

Dear Sir / Dear Ma'am,

I hope you are well. Please find attached my Assignment 1
for ICT-1013 (BS Psychology, Semester 1).

Kindly confirm that you have received it.

Regards,
Ayesha Khan
Roll No. BSPSY-24-017 · BS Psychology, Semester 1</pre>
  <ul><li><b>Subject</b> says the course, the purpose and your roll number.</li><li><b>To</b> = people who must act · <b>Cc</b> = people who should know · <b>Bcc</b> = hidden copies (use it to protect addresses in a group email).</li>
  <li>No ALL CAPS, no chat spelling ("plz", "u"), no emojis. One topic per email.</li><li>Name the attachment clearly: <code>ICT1013_A1_BSPSY-24-017.pdf</code>. Check that it is attached before sending.</li>
  <li>Reply within one working day, and use <b>Reply all</b> only when everyone needs your answer.</li></ul>`},
 {ic:'💾', t:'Data units and file types', tag:'Session 1', b:`
  <div class="tblwrap"><table class="cal"><tr><th>Unit</th><th>Size</th><th>Roughly</th></tr>
  <tr><td>Bit</td><td>0 or 1</td><td>The smallest piece of data</td></tr><tr><td>Byte (B)</td><td>8 bits</td><td>One letter of English text</td></tr>
  <tr><td>Kilobyte (KB)</td><td>1,024 bytes</td><td>A short text message</td></tr><tr><td>Megabyte (MB)</td><td>1,024 KB</td><td>One phone photo is 2–5 MB</td></tr>
  <tr><td>Gigabyte (GB)</td><td>1,024 MB</td><td>About one hour of HD video</td></tr><tr><td>Terabyte (TB)</td><td>1,024 GB</td><td>A large external hard drive</td></tr></table></div>
  <p>Storage makers count in thousands (1 GB = 1,000 MB), which is why a "64 GB" phone shows less. <b>Internet speed</b> is measured in mega<b>bits</b> per second (Mbps); divide by 8 to get megabytes per second.</p>
  <p><b>File types:</b> <code>.docx</code> Word · <code>.xlsx</code> Excel · <code>.pptx</code> PowerPoint · <code>.pdf</code> fixed layout for sharing · <code>.jpg</code> photo · <code>.png</code> image with sharp text or transparency · <code>.mp3</code> audio · <code>.mp4</code> video · <code>.zip</code> compressed folder · <code>.csv</code> plain data table · <code>.exe</code> / <code>.apk</code> programs: open only from sources you trust.</p>`},
 {ic:'☁️', t:'Cloud storage, sharing and backup', tag:'Sessions 6–7', b:`
  <ul><li><b>Sharing roles:</b> <b>Viewer</b> can read · <b>Commenter</b> can add comments · <b>Editor</b> can change and share. Give the lowest role that gets the job done.</li>
  <li><b>"Anyone with the link"</b> means anyone who gets the link, including people it is forwarded to. For personal or research data, share with named people only.</li>
  <li><b>Version history</b> lets you see and restore earlier versions, so a group member's mistake can be undone.</li>
  <li><b>3-2-1 backup rule:</b> <b>3</b> copies of important files, on <b>2</b> different kinds of storage, with <b>1</b> copy in another place (for example, the cloud).</li>
  <li><b>Sync is not backup:</b> if you delete a synced file, it is deleted everywhere. Check the cloud recycle bin quickly.</li>
  <li><b>Research data:</b> remove names and phone numbers before uploading participant data; keep the code list separately and protected.</li></ul>`},
 {ic:'🎥', t:'Video-call etiquette', tag:'Session 9', b:`
  <ul><li>Join 2–3 minutes early; test the microphone and camera first.</li><li><b>Mute</b> when you are not speaking. Use <b>Raise hand</b> or the chat to ask for a turn.</li>
  <li>Face a light source; do not sit with a window behind you. Camera at eye level.</li><li>Use your real name as the display name in class.</li>
  <li>Before <b>sharing your screen</b>, close private chats, email and banking tabs. Share one window instead of the whole screen.</li>
  <li><b>Recording</b> needs everyone's knowledge and consent. Never record or screenshot a counselling or private session without permission.</li>
  <li>If the connection is weak: turn off your video, close other apps, move closer to the router.</li></ul>`},
 {ic:'🔐', t:'Passwords, 2FA and passkeys', tag:'Sessions 15 & 20', b:`
  <ul><li><b>Long beats complicated.</b> A passphrase of four or more unrelated words is long and easy to remember.</li>
  <li><b>One account, one password.</b> If one website is breached, reused passwords open your other accounts.</li>
  <li>A <b>password manager</b> creates and remembers different passwords for you; you remember one strong master password.</li>
  <li><b>Two-factor authentication (2FA)</b> adds a second proof: a code from an authenticator app is safer than an SMS code. Turn it on for email first, because email resets every other account.</li>
  <li><b>Passkeys</b> replace the password with your device's fingerprint, face or PIN. There is nothing to type, so there is nothing for a fake website to steal.</li>
  <li><b>Never share</b> a password, PIN or one-time code (OTP) with anyone, including someone who says they are from the bank or the university.</li>
  <li>Change a password immediately if a service reports a breach or you typed it into a page you no longer trust.</li></ul>`},
 {ic:'🎣', t:'Phishing: red flags and what to do', tag:'Sessions 15–16 & 20', b:`
  <div class="grid g2"><div><h4>Red flags</h4><ul><li><b>Urgency or fear</b>: "account blocked in 24 hours"</li><li><b>A prize or refund</b> you did not expect</li><li>Asks for a <b>password, PIN, OTP or card number</b></li><li><b>Sender address</b> does not match the organisation</li><li><b>Link text and real address differ</b>; misspelt domain</li><li>Unexpected <b>attachment</b>, especially <code>.zip</code>, <code>.exe</code>, <code>.apk</code></li><li>Generic greeting, poor spelling, unusual payment method</li></ul></div>
  <div><h4>What to do</h4><ol><li><b>Stop.</b> Do not click, reply or call the number in the message.</li><li><b>Check</b> using the official app, or type the official website address yourself.</li><li><b>Report</b> it (email "Report phishing", your bank's official helpline) and delete it.</li><li>If you already entered details: change the password, turn on 2FA, and call your bank on the number printed on your card.</li></ol></div></div>
  <p>The same tricks arrive by SMS ("smishing"), phone call ("vishing"), WhatsApp and QR codes.</p>`},
 {ic:'💳', t:'Safe online banking and shopping', tag:'Sessions 15–16', b:`
  <ul><li>Install banking and wallet apps <b>only from the official app store</b>, and keep them updated.</li>
  <li>The bank will <b>never</b> ask for your PIN, password or OTP by call, SMS, email or WhatsApp.</li>
  <li>Do not bank on public Wi-Fi or a shared computer. Lock your phone with a PIN or fingerprint.</li>
  <li>Turn on <b>transaction alerts</b> and check your statement regularly; report anything you do not recognise at once.</li>
  <li><b>Before paying a shop:</b> look for <code>https://</code> and the correct domain, read recent reviews outside the shop's own page, check the return policy and a real contact address.</li>
  <li>A price far below the market, payment only by direct transfer to a personal account, and pressure to "pay now" are warning signs.</li>
  <li>Prefer cash on delivery or a card or wallet with buyer protection for a shop you have not used before. Keep the order confirmation and receipts.</li></ul>
  <p class="tiny">Wallet and bank features, limits and fees change often. Check the provider's official app or website for current details.</p>`},
 {ic:'🩺', t:'Health apps and telemedicine: privacy checklist', tag:'Sessions 13–14', b:`
  <ul><li>Health information is <b>sensitive personal data</b>. Before installing an app, read what it collects and who it shares it with.</li>
  <li>Give only the permissions the app needs. A step counter does not need your contacts.</li>
  <li>Fitness trackers and apps give <b>estimates</b>. They are not medical devices unless they are certified as such.</li>
  <li>An app, a website or an AI chatbot can give information; it <b>cannot replace</b> a qualified doctor or psychologist.</li>
  <li><b>Online consultation:</b> use a recognised platform and a registered professional, sit in a private place, use headphones, and do not record without consent.</li>
  <li>In an emergency or crisis, contact local emergency services or go to the nearest hospital. Do not wait for an online appointment.</li>
  <li><b>As a future psychologist:</b> confidentiality, informed consent and secure storage of client records apply online exactly as they do in a clinic.</li></ul>`},
 {ic:'🤝', t:'Netiquette and your digital footprint', tag:'Sessions 17–18', b:`
  <ul><li><b>Think before you post:</b> is it true, is it kind, is it necessary, and would you say it face to face?</li>
  <li>Text has no tone of voice. Re-read a message before sending; disagree with the idea, not the person.</li>
  <li>Do not share someone's photo, number or screenshot of a private chat without permission.</li>
  <li>Class and work groups: stay on topic, no late-night messages unless urgent, no forwards without checking.</li>
  <li><b>Active footprint</b> = what you post. <b>Passive footprint</b> = what is collected about you (searches, location, cookies).</li>
  <li>Search your own name twice a year. Review privacy settings, remove old public posts, and keep a professional profile for study and work.</li>
  <li>Universities and employers do look at public profiles. What you post today can be found years later.</li></ul>`},
 {ic:'🛑', t:'Cyberbullying: what to do', tag:'Sessions 19–20', b:`
  <ol><li><b>Do not reply</b> and do not retaliate. A reaction is what the bully wants.</li><li><b>Save the evidence:</b> screenshots with date, time, username and link.</li>
  <li><b>Block and report</b> the account on the platform.</li><li><b>Tell someone you trust:</b> a parent, teacher, the student affairs office or a counsellor.</li>
  <li><b>Report serious cases</b> (threats, blackmail, sharing private images, impersonation) to the national cybercrime authority. In Pakistan this is the National Cyber Crime Investigation Agency (NCCIA), under the Prevention of Electronic Crimes Act (PECA) 2016.</li></ol>
  <p><b>If you see it happen (bystander):</b> do not like, share or forward it; support the person privately; report the content. <b>Forms:</b> harassment, exclusion, impersonation, doxxing (publishing private details), outing, cyberstalking, spreading rumours.</p>
  <p class="tiny">If someone is in immediate danger, contact local emergency services.</p>`},
 {ic:'©️', t:'Copyright and Creative Commons', tag:'Session 21', b:`
  <p><b>Copyright</b> protects an original work automatically from the moment it is created. "I found it on Google" is not permission.</p>
  <div class="tblwrap"><table class="cal"><tr><th>Licence</th><th>You may</th><th>Condition</th></tr>
  <tr><td><b>CC BY</b></td><td>Copy, change, use commercially</td><td>Give credit</td></tr><tr><td><b>CC BY-SA</b></td><td>Same as BY</td><td>Credit + share your version under the same licence</td></tr>
  <tr><td><b>CC BY-NC</b></td><td>Copy and change</td><td>Credit + non-commercial use only</td></tr><tr><td><b>CC BY-ND</b></td><td>Copy and share unchanged</td><td>Credit + no changed versions</td></tr>
  <tr><td><b>CC0 / Public domain</b></td><td>Anything</td><td>No conditions (credit is still good practice)</td></tr></table></div>
  <p><b>Types of intellectual property:</b> copyright (books, music, software, photos) · trademark (names and logos) · patent (inventions) · trade secret (confidential know-how). <b>Software licences:</b> proprietary, freeware, shareware (trial), open source. Using cracked or pirated software is illegal and a common source of malware.</p>
  <p><b>Credit an image like this:</b> Title, by Author, Source, licence. Example: "Brain scan" by A. Rehman, Wikimedia Commons, CC BY 4.0.</p>`},
 {ic:'✍️', t:'Plagiarism and APA 7 quick guide', tag:'Sessions 23–24', b:`
  <p><b>Plagiarism</b> is presenting someone else's words, ideas, data or images as your own. Types: copy-paste (direct) · patchwork (mixing copied phrases) · paraphrasing without a citation · self-plagiarism (reusing your old work without permission) · unacknowledged AI-generated text, where your institution requires disclosure.</p>
  <p><b>Avoid it:</b> take notes in your own words, put copied words in "quotation marks" at once, cite as you write, and paraphrase by changing both the words and the structure, then cite.</p>
  <div class="tblwrap"><table class="cal"><tr><th>Source</th><th>APA 7 reference format</th></tr>
  <tr><td>Book</td><td>Author, A. A. (Year). <i>Title of the book in sentence case</i> (2nd ed.). Publisher.</td></tr>
  <tr><td>Journal article</td><td>Author, A. A., &amp; Author, B. B. (Year). Title of the article. <i>Journal Name, volume</i>(issue), pages. https://doi.org/…</td></tr>
  <tr><td>Web page</td><td>Author or Organisation. (Year, Month Day). <i>Title of the page</i>. Site Name. URL</td></tr></table></div>
  <p><b>In the text:</b> one author (Khan, 2024) · two authors (Khan &amp; Ali, 2024) · three or more (Khan et al., 2024) · direct quotation (Khan, 2024, p. 12). The reference list is in alphabetical order with a hanging indent.</p>`},
 {ic:'🧐', t:'Fake news and fact-checking (SIFT)', tag:'Sessions 25–26', b:`
  <div class="tblwrap"><table class="cal"><tr><th>Term</th><th>False?</th><th>Meant to harm?</th><th>Example</th></tr>
  <tr><td><b>Misinformation</b></td><td>Yes</td><td>No</td><td>Forwarding a wrong home remedy, believing it</td></tr>
  <tr><td><b>Disinformation</b></td><td>Yes</td><td>Yes</td><td>An invented quote made to damage someone</td></tr>
  <tr><td><b>Malinformation</b></td><td>No</td><td>Yes</td><td>Leaking a real private message to hurt a person</td></tr></table></div>
  <p><b>SIFT:</b> <b>S</b>top before you share · <b>I</b>nvestigate the source (who is behind it?) · <b>F</b>ind better coverage (do reliable outlets report it?) · <b>T</b>race the claim, quote or picture to its original context.</p>
  <ul><li><b>Lateral reading:</b> open new tabs and see what others say about the source, instead of reading only the page itself.</li><li><b>Reverse image search</b> (Google Lens, TinEye) shows where a picture first appeared.</li>
  <li><b>Deepfakes:</b> look for odd lighting, blurred edges around the face, lip movement that does not match the sound; above all, check whether a trusted source carries the same video.</li>
  <li><b>Why we fall for it:</b> confirmation bias, strong emotion, repetition (the illusory truth effect) and trust in the person who forwarded it.</li></ul>`},
 {ic:'🤖', t:'Using AI tools responsibly', tag:'Sessions 2, 22 & 24', b:`
  <ul><li><b>Know the rule first.</b> Follow your teacher's and university's policy for each assignment. If AI help is allowed, say how you used it.</li>
  <li><b>AI can be confidently wrong.</b> Chatbots sometimes invent facts, quotations and references. Check every claim and open every reference yourself.</li>
  <li><b>Do not paste private data</b> into a chatbot: client or participant information, ID numbers, passwords or unpublished research data.</li>
  <li><b>Good uses:</b> explaining a concept in simpler words, brainstorming questions, making practice quizzes, checking grammar, outlining, and summarising a text you have already read.</li>
  <li><b>Poor uses:</b> submitting generated text as your own, asking for a diagnosis or treatment, or trusting statistics without a source.</li>
  <li><b>Bias:</b> AI learns from human data and can repeat stereotypes. Read the output critically.</li>
  <li><b>You stay responsible</b> for anything you submit or share, whoever drafted it.</li></ul>`}
],

viva: [
 ['What does ICT stand for, and how is it different from IT?','Information and Communication Technologies. IT focuses on computers and software for storing and processing information; ICT also includes the communication side: networks, the internet, phones, broadcasting and the services built on them.'],
 ['What is the difference between hardware and software? Give two examples of each.','Hardware is the physical equipment you can touch, such as a keyboard and a hard drive. Software is the set of instructions that tells the hardware what to do, such as Windows (system software) and Microsoft Word (application software).'],
 ['Explain the input–process–output cycle with an example.','Data is entered (input), the computer works on it (process), and a result is produced (output); results can also be kept (storage). Example: you type quiz marks (input), Excel calculates the average (process) and shows a chart (output).'],
 ['What is cloud storage? Name one benefit and one risk.','Saving files on a provider\'s servers over the internet instead of only on your own device. Benefit: access from any device and easy sharing. Risk: you depend on the internet and on the provider\'s security, and a weak password or a public link can expose your files.'],
 ['How does a search engine decide which results to show?','It crawls web pages, stores them in an index, and then ranks the pages that match your query using many signals such as relevance, quality, freshness and your location. Paid results are marked as ads or sponsored.'],
 ['What makes an email formal?','A clear subject line, a polite greeting, a short message on one topic in complete sentences, a proper closing with your name and roll number, a clearly named attachment, and no chat abbreviations, emojis or all capitals.'],
 ['What is the difference between Cc and Bcc?','Cc sends a visible copy to people who should be informed. Bcc sends a hidden copy; other receivers cannot see Bcc addresses, which protects privacy in group emails.'],
 ['Why should you use Styles in Word?','Styles keep headings consistent, let you change the look of the whole document in one step, and allow Word to build an automatic table of contents and navigation pane.'],
 ['What is the difference between a relative and an absolute cell reference?','A relative reference such as B2 changes when the formula is copied. An absolute reference such as $B$2 always points to the same cell.'],
 ['What can Google Workspace do that a file on your own computer cannot?','Several people can edit the same document at the same time, every change is saved automatically, comments and suggestions are tracked, and version history lets you restore an earlier version.'],
 ['State the 3-2-1 backup rule.','Keep three copies of important data, on two different types of storage, with one copy kept in a different place, for example in the cloud.'],
 ['What is a Learning Management System? Give an example.','A website or app where a course is run online: materials, assignments, quizzes, grades and announcements in one place. Examples are Moodle and Google Classroom.'],
 ['What are the limits of health and fitness apps?','They give estimates from sensors and self-reports, they may share sensitive data, and they can increase anxiety about numbers. They support healthy habits but do not replace assessment by a qualified professional.'],
 ['What is telemedicine, and what must be protected during it?','Health care provided at a distance using video, audio or chat. The patient\'s privacy and confidentiality must be protected: a secure platform, a private room, informed consent and safe records.'],
 ['What is two-factor authentication?','A login that needs two different proofs: something you know (a password) plus something you have (a code from your phone or an authenticator app) or something you are (a fingerprint). A stolen password alone is then not enough.'],
 ['How would you recognise a phishing message?','It creates urgency or offers a reward, asks for a password, PIN or OTP, comes from an address that does not match the organisation, and contains a link whose real address is different or misspelt.'],
 ['What is a digital footprint?','The record of everything you do online. The active footprint is what you post on purpose; the passive footprint is what is collected about you, such as search history, location and cookies.'],
 ['Give three rules of netiquette.','Be respectful and remember there is a person behind the screen; do not write in all capitals or share private content without permission; check facts before forwarding and stay on topic in groups.'],
 ['What should a person do if they are cyberbullied?','Do not reply, save the evidence, block and report the account, tell a trusted adult or the university, and report serious cases such as threats or blackmail to the cybercrime authority.'],
 ['What is copyright, and when does it start?','A legal right that gives the creator control over copying and using their original work. It starts automatically as soon as the work is created in a fixed form; registration is not required for protection.'],
 ['What does the licence CC BY-NC allow?','Anyone may copy, share and adapt the work as long as they give credit to the creator and do not use it for commercial purposes.'],
 ['What is plagiarism? How is paraphrasing different?','Plagiarism is presenting another person\'s words or ideas as your own. Paraphrasing is restating an idea in your own words and sentence structure and citing the source; without the citation it is still plagiarism.'],
 ['Write the APA in-text citation for a 2023 book by Ahmed and Raza.','(Ahmed & Raza, 2023). With a direct quotation, add the page: (Ahmed & Raza, 2023, p. 45).'],
 ['Differentiate misinformation and disinformation.','Both are false. Misinformation is shared by mistake, without the intention to harm. Disinformation is created or shared on purpose to deceive or harm.'],
 ['Explain the SIFT method.','Stop before reacting or sharing; Investigate the source; Find better coverage from reliable outlets; Trace claims, quotes and media back to the original context.'],
 ['Why is ICT important for a psychology student?','For finding and evaluating research, collecting data with online forms, analysing it in spreadsheets or statistics software, writing and citing reports, presenting findings, online counselling and tele-health, and protecting the confidentiality of client and participant data.']
],

modern: [
 ['🤖','Generative AI assistants','Chatbots and writing assistants can explain, summarise, translate and draft text, and can create images and audio. They predict likely words from patterns in their training data, so they can sound certain and still be wrong. Use them to learn faster, then verify and cite real sources.','Sessions 2 & 22'],
 ['🧑‍💻','AI inside office tools','Word processors, spreadsheets and presentation tools now include assistants that suggest formulas, summarise long documents and design slides. The skill that matters is checking the result: does the formula use the right range, does the summary miss something important?','Sessions 5–6'],
 ['🎭','Deepfakes and voice cloning','A few seconds of audio or a handful of photos can be enough to imitate a person. Scam calls now copy the voice of a relative or a manager. Agree on a family code word, call back on a number you already know, and never send money because of a call alone.','Sessions 20 & 25'],
 ['🔑','Passkeys replace passwords','Large services now let you sign in with a fingerprint, face or device PIN. The secret key stays on your device and works only on the real website, so a fake page cannot steal it.','Sessions 15 & 20'],
 ['⚡','Instant payments and QR codes','Instant payment systems, such as Raast operated by the State Bank of Pakistan, move money between accounts within seconds using a mobile number or QR code. Speed helps honest users and scammers alike: check the name shown before you confirm, because a completed transfer is hard to reverse.','Sessions 15–16'],
 ['🩺','Digital mental-health tools','Mood trackers, guided-relaxation apps and online counselling platforms have made support easier to reach. Quality varies widely. Look for evidence, qualified professionals and a clear privacy policy; an app is a support, not a therapist.','Sessions 13–14'],
 ['⌚','Wearables and health data','Watches and bands estimate heart rate, sleep and activity all day. The same data can reveal routines, location and health conditions, so check who the device shares it with and switch off what you do not need.','Session 13'],
 ['🎓','Online learning and micro-credentials','Universities and platforms such as Coursera and edX offer short certificates that employers increasingly recognise. Finishing matters more than enrolling: choose one course, set a weekly time, and complete the assessments.','Sessions 11–12'],
 ['🛡️','Privacy is becoming law','More countries now give people legal rights over their personal data, such as knowing what is collected and asking for deletion. For psychologists, data-protection rules sit on top of professional ethics: consent, minimum necessary data and secure storage.','Sessions 17 & 22'],
 ['🧘','Digital well-being','Phones now report screen time, limit apps and silence notifications on a schedule. Design features such as endless scrolling and streaks are built to hold attention; knowing how they work is the first step in using technology on your own terms.','Sessions 10 & 13']
],

tools: [
 ['Google Scholar','Search engine for academic articles, with "Cited by" and ready-made citations','Research'],
 ['Zotero','Free reference manager: saves sources from the browser and builds APA reference lists in Word and Google Docs','Citations'],
 ['Your university digital library','Paid journals and e-books that are free for students through the university login','Research'],
 ['JASP','Free, open-source statistics program with menus (t-tests, ANOVA, correlation) and APA-style tables','Statistics'],
 ['jamovi','Free, open-source statistics program built like a spreadsheet','Statistics'],
 ['Google Forms','Free online questionnaires; answers go straight into a spreadsheet','Data collection'],
 ['PsyToolkit','Free web tool for running psychology experiments and surveys online','Experiments'],
 ['Canva','Posters, infographics and presentation designs from templates','Design'],
 ['Google Lens / TinEye','Reverse image search: find where a picture first appeared','Fact-checking'],
 ['Wayback Machine','Saved copies of web pages from earlier dates (web.archive.org)','Fact-checking'],
 ['Have I Been Pwned','Check whether your email address appears in known data breaches','Security'],
 ['Authenticator app','Creates 2FA login codes on your phone, even without a signal','Security']
],

safety: [
 ['I clicked a suspicious link or entered my password','<ol><li>Change that password now, from a device you trust.</li><li>Change it everywhere else you used the same password.</li><li>Turn on two-factor authentication.</li><li>Check the account\'s recent activity and sign out of other devices.</li></ol>'],
 ['I shared my bank PIN or OTP, or money left my account','<ol><li>Call your bank at once on the number printed on your card or shown in the official app.</li><li>Ask them to block the card or wallet and record a complaint; note the complaint number.</li><li>Keep all messages and call details as evidence.</li><li>Report the fraud to the cybercrime authority.</li></ol>'],
 ['My social media account was hacked','<ol><li>Use the platform\'s official "account hacked" recovery page.</li><li>Reset the password of the email linked to the account first.</li><li>Tell your contacts not to trust messages from the account.</li><li>After recovery, remove unknown devices and apps, and turn on 2FA.</li></ol>'],
 ['I lost my phone','<ol><li>Use Find My Device (Android) or Find My (iPhone) from another device to lock or erase it.</li><li>Ask your mobile operator to block the SIM.</li><li>Change the passwords of email, banking and wallet apps.</li><li>Tell your bank if a wallet or banking app was on the phone.</li></ol>'],
 ['Someone is bullying or blackmailing me online','<ol><li>Do not reply, pay or negotiate.</li><li>Save screenshots with date, time and username.</li><li>Block and report the account on the platform.</li><li>Tell a trusted adult or the university, and report it to the cybercrime authority.</li></ol>'],
 ['My laptop is full or very slow before a deadline','<ol><li>Save your work and restart.</li><li>Close unused browser tabs and programs.</li><li>Empty the recycle bin and move large videos to cloud or external storage.</li><li>Keep a second copy of the assignment in the cloud before you do anything else.</li></ol>']
],

tips: [
 'Read the whole question and <b>underline the command word</b>: define, list, differentiate, explain, give an example.',
 'For "differentiate" questions, draw a <b>two-column table</b> with at least three clear points.',
 'Give a <b>real example</b> with every definition, ideally one from psychology or daily student life.',
 'In scenario questions, name the <b>problem</b>, the <b>risk</b>, and the <b>correct action</b> step by step.',
 'Learn the <b>acronyms</b> with their full forms: ICT, LMS, MOOC, 2FA, OTP, IP (intellectual property), CC, APA, SIFT.',
 'In MCQs, cross out the options that are clearly wrong first; watch for "always" and "never".',
 'Practise the <b>practical skills</b> on a real computer: a formal email, a formula, a shared document, an APA reference.',
 'Use the <b>Midterm and Final mock exams</b> in the Practice centre under time, then review every mistake.',
 'Official marks, weightage and exam format are announced by your instructor. This portal is for preparation only.'
],

/* Fictional messages for the phishing spotter. safe:true means a normal, legitimate message. */
phish: [
 {ch:'SMS', from:'+92 3XX 5550147', subj:'', body:'Dear customer, your ATM card has been BLOCKED. To reactivate, reply with your 16-digit card number and PIN within 2 hours. — Mehran Bank Head Office', safe:false, flags:['Asks for card number and PIN','Urgent deadline','Sent from a personal mobile number'], why:'A bank never asks for your PIN or full card number by SMS. Call the number printed on your card instead.'},
 {ch:'Email', from:'registrar@university.example', subj:'Mid-term date sheet, Fall semester', body:'Dear students, the mid-term date sheet has been uploaded on the LMS under Announcements. Please log in to the LMS as usual to view it. — Office of the Registrar', safe:true, flags:['Sender address matches the university','No link, no request for a password','Tells you to use the LMS you already know'], why:'Nothing is requested and you are sent to the normal LMS, which you open yourself.'},
 {ch:'Email', from:'security@rnehranbank.example', subj:'Unusual sign-in detected!!!', body:'We noticed unusual activity. Your account will be permanently closed today unless you verify now: http://rnehranbank.example/verify-login', safe:false, flags:['Domain starts with r-n, made to look like the letter m','Threat with a same-day deadline','Link to a login page'], why:'Look-alike domain plus urgency. Never sign in through a link in a message; type the real address yourself.'},
 {ch:'WhatsApp', from:'Unknown number', subj:'', body:'Assalam o alaikum, I sent a 6-digit code to your number by mistake. Please send it back to me quickly, it is urgent.', safe:false, flags:['Asks for a one-time code','Unknown sender','Pressure to act fast'], why:'That code is the verification code for YOUR WhatsApp account. Sharing it hands your account to the scammer.'},
 {ch:'Email', from:'no-reply@bazaar-shop.example', subj:'Your order #48213 has been shipped', body:'Hello Ali, your order placed on 3 March has been shipped. You can track it from "My Orders" in the app. Cash on delivery: Rs. 1,850.', safe:true, flags:['Matches an order you placed','No link to click and no payment request','Directs you to the app'], why:'It confirms something you did and asks for nothing. Still check it inside the app rather than through a message.'},
 {ch:'SMS', from:'8-digit short code', subj:'', body:'Congratulations! Your mobile number has won Rs. 500,000 in the lucky draw. To receive your prize send Rs. 2,500 registration fee to the wallet account 03XX-5550199.', safe:false, flags:['A prize you never entered for','Asks you to pay a fee first','Payment to a personal wallet'], why:'Advance-fee fraud: real prizes never require a payment to collect them.'},
 {ch:'Email', from:'it-helpdesk@university.example', subj:'Scheduled maintenance Saturday 10 pm', body:'The LMS will be unavailable on Saturday from 10 pm to 12 am for maintenance. No action is needed. Please submit assignments before this time.', safe:true, flags:['Information only','No link, attachment or request','Correct university domain'], why:'A plain notice that asks for nothing is normal. Be suspicious only if a "maintenance" email asks you to log in or confirm a password.'},
 {ch:'Email', from:'it-helpdesk@universty-portal.example', subj:'Mailbox full — verify your password', body:'Your mailbox has reached its limit. To avoid losing emails, confirm your username and password in the attached form (Mailbox_Upgrade.html).', safe:false, flags:['Misspelt domain (universty)','Asks for a password','Unexpected HTML attachment'], why:'IT staff never need your password. The attachment is a fake login page.'},
 {ch:'Call', from:'Caller saying "bank verification officer"', subj:'', body:'"Sir, your account will be closed under new State Bank rules. I am sending an OTP to verify you. Please read it to me now while you are on the line."', safe:false, flags:['Asks you to read out an OTP','Fear of account closure','Keeps you on the line so you cannot check'], why:'An OTP approves a transaction or login. Reading it out lets the caller take your money. Hang up and call the bank yourself.'},
 {ch:'Email', from:'dr.sana@university.example', subj:'Feedback on your Assignment 1', body:'Dear Hamza, I have added comments to your assignment in our shared class folder. Please review them before Thursday\'s class. Regards, Dr Sana', safe:true, flags:['Known teacher and correct domain','Refers to real coursework','No password or payment request'], why:'An expected message from a known sender about real work. Open the shared folder from your own Drive to be extra careful.'},
 {ch:'WhatsApp', from:'Contact showing your cousin\'s photo, new number', subj:'', body:'Hi, this is my new number. I am stuck at the hospital and my wallet is not working. Please send Rs. 15,000 to this account right now, I will return it tonight.', safe:false, flags:['New number claiming to be a relative','Emergency story and pressure','Request for money'], why:'Impersonation scam. Call your cousin on the old number you already have before doing anything.'},
 {ch:'Email', from:'careers@global-hr-jobs.example', subj:'Selected! Work from home, Rs. 150,000 per month', body:'You have been selected without interview. To issue your offer letter, pay the Rs. 5,000 security deposit today and send a photo of your CNIC and bank card.', safe:false, flags:['Job offer without applying or interview','Asks for money and ID/bank card photos','Too good to be true'], why:'Real employers do not charge you to hire you, and never need a photo of your bank card.'},
 {ch:'App notification', from:'Your banking app', subj:'', body:'Rs. 3,200 was paid for your electricity bill from your account ending 4471. If this was not you, open the app and go to Help.', safe:true, flags:['Appears inside the official app','No link and no request for details','Matches a bill you paid'], why:'Transaction alerts inside the official app are a good security feature. Act through the app\'s own Help section if something is wrong.'},
 {ch:'QR code', from:'Sticker on a parking machine', subj:'', body:'A paper sticker placed over the original sign says: "New! Scan to pay parking fee". The page it opens asks for your card number, expiry date and CVV.', safe:false, flags:['Sticker placed over the original sign','Unknown web address after scanning','Asks for full card details'], why:'"Quishing": a fake QR code leading to a payment page. Check the address that appears before opening, and pay only through the official method.'}
],

/* [shortcut, action, where] for the shortcut trainer */
keys: [
 ['Ctrl + C','Copy the selection','Everywhere'],['Ctrl + V','Paste','Everywhere'],['Ctrl + X','Cut the selection','Everywhere'],['Ctrl + Z','Undo the last action','Everywhere'],
 ['Ctrl + Y','Redo the action you undid','Everywhere'],['Ctrl + S','Save the file','Everywhere'],['Ctrl + P','Print','Everywhere'],['Ctrl + A','Select everything','Everywhere'],
 ['Ctrl + F','Find a word on the page or in the document','Everywhere'],['Ctrl + H','Find and replace','Word'],['Ctrl + B','Make text bold','Word'],['Ctrl + K','Insert a hyperlink','Word'],
 ['Ctrl + Enter','Insert a page break','Word'],['Alt + Tab','Switch between open windows','Windows'],['Win + D','Show the desktop','Windows'],['Win + E','Open File Explorer','Windows'],
 ['Win + L','Lock the computer','Windows'],['Win + Shift + S','Take a screenshot of a selected area','Windows'],['F2','Rename the selected file or edit the cell','Windows / Excel'],['F5','Start the slide show from the first slide','PowerPoint'],
 ['Shift + F5','Start the slide show from the current slide','PowerPoint'],['Ctrl + M','Add a new slide','PowerPoint'],['Alt + =','Insert AutoSum','Excel'],['Ctrl + T','Open a new browser tab','Browser'],
 ['Ctrl + Shift + T','Reopen the last closed tab','Browser'],['Ctrl + Shift + Esc','Open Task Manager','Windows']
],

/* Example addresses for the web-journey visualizer (fictional sites on reserved example domains). */
journeys: ['https://www.university.example/library/search?q=memory','https://lms.university.example/courses/ict-1013','http://old-shop.example/checkout','https://scholar.example/articles/stress-and-sleep.pdf']
};
