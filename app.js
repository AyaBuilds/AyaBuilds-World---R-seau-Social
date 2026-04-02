// ══════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');
  document.getElementById('nav-' + name).classList.add('active');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ══════════════════════════════════════════
// ESPACE 1 — PERSONNAGE
// ══════════════════════════════════════════
let charState = {
  hair: 'long',
  hairColor: '#6b4c3b',
  skin: '#fde3d8',
  outfit: 'tshirt',
  outfitColor: '#f0b8c8',
  eyeColor: '#3d2b1f',
  accessories: new Set()
};

function updateChar() {
  document.getElementById('char-head').setAttribute('fill', charState.skin);
  document.getElementById('char-arm-l').setAttribute('fill', charState.skin);
  document.getElementById('char-arm-r').setAttribute('fill', charState.skin);
  document.getElementById('char-leg-l').setAttribute('fill', charState.skin);
  document.getElementById('char-leg-r').setAttribute('fill', charState.skin);
  renderHair();
  document.getElementById('char-body').setAttribute('fill', charState.outfitColor);
  document.getElementById('char-eye-l').setAttribute('fill', charState.eyeColor);
  document.getElementById('char-eye-r').setAttribute('fill', charState.eyeColor);
  updateAccessories();
  const name = document.getElementById('char-display-name').value || 'Aya';
  document.getElementById('topbar-name').textContent = name;
  document.getElementById('topbar-avatar').textContent = name[0].toUpperCase();
}

function shadeColor(hex, pct) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const num = parseInt(hex, 16);
  let r = (num >> 16) + pct * 2.55;
  let g = ((num >> 8) & 0xff) + pct * 2.55;
  let b = (num & 0xff) + pct * 2.55;
  r = Math.min(255, Math.max(0, Math.round(r)));
  g = Math.min(255, Math.max(0, Math.round(g)));
  b = Math.min(255, Math.max(0, Math.round(b)));
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function renderHair() {
  const c = charState.hairColor;
  const dark = shadeColor(c, -30);
  const mid = shadeColor(c, -15);
  const light = shadeColor(c, 20);
  const gB = document.getElementById('char-hair-back-g');
  const gF = document.getElementById('char-hair-front-g');
  const h = charState.hair;

  if (h === 'none') { gB.innerHTML = ''; gF.innerHTML = ''; return; }

  if (h === 'long') {
    gB.innerHTML = `
      <path d="M52 95 Q46 55 60 44 Q75 35 90 36 Q105 35 120 44 Q134 55 128 95 Q118 120 115 180 Q112 220 108 255 L72 255 Q68 220 65 180 Q62 120 52 95Z" fill="${c}"/>
      <path d="M52 95 Q50 75 53 95 Q55 115 57 140 Q60 180 63 210 Q66 235 70 255 L68 255 Q64 230 61 205 Q57 175 54 140 Q51 110 52 95Z" fill="${dark}" opacity="0.4"/>
      <path d="M128 95 Q130 75 127 95 Q125 115 123 140 Q120 180 117 210 Q114 235 110 255 L112 255 Q116 230 119 205 Q123 175 126 140 Q129 110 128 95Z" fill="${dark}" opacity="0.4"/>
      <path d="M78 36 Q90 33 102 36 Q95 40 90 39 Q85 40 78 36Z" fill="${light}" opacity="0.6"/>`;
    gF.innerHTML = `
      <path d="M52 92 Q50 62 62 52 Q74 43 90 42 Q106 43 118 52 Q130 62 128 92 Q116 72 90 70 Q64 72 52 92Z" fill="${c}"/>
      <path d="M52 92 Q53 78 58 68 Q65 57 74 52 Q63 60 59 73 Q56 84 56 94Z" fill="${dark}" opacity="0.5"/>
      <path d="M128 92 Q127 78 122 68 Q115 57 106 52 Q117 60 121 73 Q124 84 124 94Z" fill="${dark}" opacity="0.5"/>
      <path d="M70 50 Q80 44 90 43 Q100 44 110 50 Q100 47 90 46 Q80 47 70 50Z" fill="${light}" opacity="0.7"/>
      <path d="M57 80 Q60 68 68 60 Q65 70 62 82Z" fill="${light}" opacity="0.3"/>
      <path d="M123 80 Q120 68 112 60 Q115 70 118 82Z" fill="${light}" opacity="0.3"/>`;
  }
  else if (h === 'curly') {
    gB.innerHTML = `
      <path d="M50 90 Q42 48 64 40 Q77 35 90 36 Q103 35 116 40 Q138 48 130 90 Q120 70 90 68 Q60 70 50 90Z" fill="${c}"/>
      <circle cx="56" cy="78" r="12" fill="${c}"/>
      <circle cx="60" cy="60" r="10" fill="${c}"/>
      <circle cx="124" cy="78" r="12" fill="${c}"/>
      <circle cx="120" cy="60" r="10" fill="${c}"/>
      <circle cx="68" cy="46" r="9" fill="${c}"/>
      <circle cx="112" cy="46" r="9" fill="${c}"/>
      <circle cx="90" cy="40" r="10" fill="${c}"/>`;
    gF.innerHTML = `
      <path d="M54 88 Q52 68 64 56 Q76 46 90 44 Q104 46 116 56 Q128 68 126 88 Q118 72 90 70 Q62 72 54 88Z" fill="${c}"/>
      <circle cx="58" cy="76" r="10" fill="${c}"/><circle cx="58" cy="76" r="5" fill="${light}" opacity="0.4"/>
      <circle cx="122" cy="76" r="10" fill="${c}"/><circle cx="122" cy="76" r="5" fill="${light}" opacity="0.4"/>
      <circle cx="66" cy="54" r="9" fill="${c}"/><circle cx="66" cy="54" r="4" fill="${light}" opacity="0.4"/>
      <circle cx="114" cy="54" r="9" fill="${c}"/><circle cx="114" cy="54" r="4" fill="${light}" opacity="0.4"/>
      <circle cx="90" cy="46" r="9" fill="${c}"/><circle cx="90" cy="46" r="4" fill="${light}" opacity="0.4"/>
      <circle cx="78" cy="48" r="7" fill="${c}"/>
      <circle cx="102" cy="48" r="7" fill="${c}"/>`;
  }
  else if (h === 'short') {
    gB.innerHTML = `
      <path d="M58 98 Q55 70 66 57 Q78 46 90 46 Q102 46 114 57 Q125 70 122 98 Q118 80 90 78 Q62 80 58 98Z" fill="${c}"/>
      <path d="M57 90 Q55 75 58 90 Q59 98 58 98 Q55 85 57 90Z" fill="${dark}" opacity="0.4"/>`;
    gF.innerHTML = `
      <path d="M58 96 Q54 68 67 57 Q79 46 90 46 Q101 46 113 57 Q126 68 122 96 Q116 76 90 74 Q64 76 58 96Z" fill="${c}"/>
      <path d="M62 92 Q60 72 70 60 Q66 72 63 86Z" fill="${dark}" opacity="0.45"/>
      <path d="M118 92 Q120 72 110 60 Q114 72 117 86Z" fill="${dark}" opacity="0.45"/>
      <path d="M75 50 Q90 45 105 50 Q92 47 90 47 Q88 47 75 50Z" fill="${light}" opacity="0.6"/>
      <path d="M64 70 Q67 58 76 52 Q69 60 65 72Z" fill="${light}" opacity="0.3"/>`;
  }
  else if (h === 'bun') {
    gB.innerHTML = `
      <path d="M64 96 Q62 74 74 64 Q82 57 90 58 Q98 57 106 64 Q118 74 116 96 Q110 82 90 80 Q70 82 64 96Z" fill="${c}"/>`;
    gF.innerHTML = `
      <path d="M64 94 Q62 74 74 64 Q82 57 90 58 Q98 57 106 64 Q118 74 116 94 Q110 80 90 78 Q70 80 64 94Z" fill="${c}"/>
      <path d="M68 88 Q66 74 74 66 Q70 76 68 88Z" fill="${dark}" opacity="0.4"/>
      <path d="M112 88 Q114 74 106 66 Q110 76 112 88Z" fill="${dark}" opacity="0.4"/>
      <circle cx="90" cy="46" r="17" fill="${c}"/>
      <circle cx="90" cy="46" r="17" fill="none" stroke="${dark}" stroke-width="2" opacity="0.3"/>
      <path d="M78 36 Q90 30 102 36 Q96 32 90 31 Q84 32 78 36Z" fill="${light}" opacity="0.6"/>
      <path d="M77 56 Q88 60 90 62 Q92 60 103 56 Q97 60 90 61 Q83 60 77 56Z" fill="${dark}" opacity="0.3"/>
      <circle cx="90" cy="46" r="6" fill="${mid}" opacity="0.4"/>`;
  }
  else if (h === 'ponytail') {
    gB.innerHTML = `
      <path d="M62 92 Q58 66 70 56 Q80 48 90 48 Q100 48 110 56 Q122 66 118 92 Q112 75 90 73 Q68 75 62 92Z" fill="${c}"/>
      <path d="M88 62 Q90 60 92 62 L96 130 Q92 140 90 145 Q88 140 84 130Z" fill="${c}"/>
      <path d="M90 60 Q91 62 93 130 Q91 140 90 145 Q91 138 92 130 Q94 70 90 60Z" fill="${dark}" opacity="0.4"/>
      <path d="M88 62 Q86 130 84 145 Q85 138 86 130 Q88 70 88 62Z" fill="${light}" opacity="0.3"/>
      <ellipse cx="90" cy="62" rx="5" ry="4" fill="${mid}"/>`;
    gF.innerHTML = `
      <path d="M62 90 Q58 66 70 56 Q80 48 90 48 Q100 48 110 56 Q122 66 118 90 Q112 72 90 70 Q68 72 62 90Z" fill="${c}"/>
      <path d="M66 84 Q64 70 72 60 Q68 72 65 86Z" fill="${dark}" opacity="0.45"/>
      <path d="M114 84 Q116 70 108 60 Q112 72 115 86Z" fill="${dark}" opacity="0.45"/>
      <path d="M76 52 Q90 46 104 52 Q94 48 90 48 Q86 48 76 52Z" fill="${light}" opacity="0.6"/>`;
  }
  else if (h === 'braid') {
    gB.innerHTML = `
      <path d="M55 92 Q52 58 66 48 Q78 40 90 40 Q102 40 114 48 Q128 58 125 92 Q118 72 90 70 Q62 72 55 92Z" fill="${c}"/>`;
    gF.innerHTML = `
      <path d="M55 90 Q52 58 66 48 Q78 40 90 40 Q102 40 114 48 Q128 58 125 90 Q118 70 90 68 Q62 70 55 90Z" fill="${c}"/>
      <path d="M59 86 Q57 65 67 55 Q63 68 60 84Z" fill="${dark}" opacity="0.45"/>
      <path d="M121 86 Q123 65 113 55 Q117 68 120 84Z" fill="${dark}" opacity="0.45"/>
      <path d="M74 48 Q90 42 106 48 Q96 44 90 44 Q84 44 74 48Z" fill="${light}" opacity="0.6"/>
      <path d="M84 255 Q88 200 89 140 Q90 100 90 68 Q90 100 91 140 Q92 200 96 255Z" fill="${dark}" opacity="0.5"/>
      <path d="M87 255 Q86 210 85 160 Q86 120 87 90 Q88 85 88 90 Q88 120 87 160 Q86 210 86 255Z" fill="${light}" opacity="0.35"/>
      <path d="M86 100 Q90 108 94 100 M86 116 Q90 124 94 116 M86 132 Q90 140 94 132 M86 148 Q90 156 94 148 M86 164 Q90 172 94 164 M86 180 Q90 188 94 180 M86 196 Q90 204 94 196 M86 212 Q90 220 94 212 M86 228 Q90 236 94 228 M86 244 Q90 252 94 244" stroke="${dark}" stroke-width="1.5" fill="none" opacity="0.5"/>`;
  }
  else if (h === 'halfup') {
    gB.innerHTML = `
      <path d="M52 95 Q46 55 60 44 Q75 35 90 36 Q105 35 120 44 Q134 55 128 95 Q118 120 115 180 Q112 220 108 255 L72 255 Q68 220 65 180 Q62 120 52 95Z" fill="${c}"/>`;
    gF.innerHTML = `
      <path d="M52 92 Q50 62 62 52 Q74 43 90 42 Q106 43 118 52 Q130 62 128 92 Q116 72 90 70 Q64 72 52 92Z" fill="${c}"/>
      <path d="M56 86 Q54 68 62 57 Q58 70 55 84Z" fill="${dark}" opacity="0.45"/>
      <path d="M124 86 Q126 68 118 57 Q122 70 125 84Z" fill="${dark}" opacity="0.45"/>
      <path d="M70 50 Q90 44 110 50 Q100 46 90 45 Q80 46 70 50Z" fill="${light}" opacity="0.6"/>
      <path d="M74 54 Q90 49 106 54 L104 66 Q90 60 76 66Z" fill="${mid}"/>
      <ellipse cx="90" cy="58" rx="8" ry="5" fill="${mid}"/>
      <circle cx="90" cy="57" r="4" fill="${dark}" opacity="0.5"/>
      <path d="M82 57 Q90 52 98 57 Q94 53 90 52 Q86 53 82 57Z" fill="${light}" opacity="0.5"/>`;
  }
}

function updateAccessories() {
  const g = document.getElementById('char-accessories');
  g.innerHTML = '';
  if (charState.accessories.has('glasses')) {
    g.innerHTML += `<circle cx="76" cy="97" r="9" fill="none" stroke="#4a3020" stroke-width="2.5"/>
    <circle cx="104" cy="97" r="9" fill="none" stroke="#4a3020" stroke-width="2.5"/>
    <line x1="85" y1="97" x2="95" y2="97" stroke="#4a3020" stroke-width="2"/>
    <line x1="52" y1="97" x2="67" y2="97" stroke="#4a3020" stroke-width="2"/>
    <line x1="113" y1="97" x2="128" y2="97" stroke="#4a3020" stroke-width="2"/>`;
  }
  if (charState.accessories.has('hat')) {
    g.innerHTML += `<ellipse cx="90" cy="60" rx="44" ry="8" fill="${charState.hairColor}"/>
    <rect x="58" y="32" width="64" height="30" rx="10" fill="${charState.hairColor}"/>`;
  }
  if (charState.accessories.has('crown')) {
    g.innerHTML += `<polygon points="70,62 80,48 90,58 100,48 110,62 114,66 66,66" fill="#f5c842"/>
    <rect x="66" y="62" width="48" height="8" rx="2" fill="#e8a800"/>
    <circle cx="90" cy="50" r="3" fill="#e24b4a"/>
    <circle cx="78" cy="58" r="2.5" fill="#4a8ec2"/>
    <circle cx="102" cy="58" r="2.5" fill="#4a8ec2"/>`;
  }
  if (charState.accessories.has('bow')) {
    g.innerHTML += `<path d="M72 58 Q78 54 84 58 Q78 62 72 58Z" fill="#f0b8c8"/>
    <path d="M96 58 Q102 54 108 58 Q102 62 96 58Z" fill="#f0b8c8"/>
    <circle cx="90" cy="58" r="4" fill="#e091aa"/>`;
  }
  if (charState.accessories.has('earrings')) {
    g.innerHTML += `<circle cx="52" cy="107" r="4" fill="#f5c842"/>
    <circle cx="52" cy="118" r="3" fill="#e24b4a"/>
    <line x1="52" y1="111" x2="52" y2="115" stroke="#f5c842" stroke-width="1.5"/>
    <circle cx="128" cy="107" r="4" fill="#f5c842"/>
    <circle cx="128" cy="118" r="3" fill="#e24b4a"/>
    <line x1="128" y1="111" x2="128" y2="115" stroke="#f5c842" stroke-width="1.5"/>`;
  }
}

function setHair(style, btn) {
  charState.hair = style;
  document.querySelectorAll('[data-hair]').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  updateChar();
}
function setHairColor(c, dot) {
  charState.hairColor = c;
  dot.closest('.color-grid').querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
  dot.classList.add('selected');
  updateChar();
}
function setSkin(c, dot) {
  charState.skin = c;
  dot.closest('.color-grid').querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
  dot.classList.add('selected');
  updateChar();
}
function setOutfit(style, btn) {
  charState.outfit = style;
  btn.closest('.option-grid').querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  updateChar();
}
function setOutfitColor(c, dot) {
  charState.outfitColor = c;
  dot.closest('.color-grid').querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
  dot.classList.add('selected');
  updateChar();
}
function setEyeColor(c, dot) {
  charState.eyeColor = c;
  dot.closest('.color-grid').querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
  dot.classList.add('selected');
  updateChar();
}
function toggleAccessory(acc, btn) {
  if (charState.accessories.has(acc)) {
    charState.accessories.delete(acc);
    btn.classList.remove('selected');
  } else {
    charState.accessories.add(acc);
    btn.classList.add('selected');
  }
  updateChar();
}
function clearAccessories() {
  charState.accessories.clear();
  document.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
  updateChar();
}
function toggleBadge(el) { el.classList.toggle('active-badge'); }
function saveCharacter() { showToast('Personnage sauvegardé !'); }

// ══════════════════════════════════════════
// ESPACE 2 — MESSAGERIE
// ══════════════════════════════════════════
const contacts = [
  { id: 1, name: 'Soline', init: 'S', color: '#e091aa', online: true, messages: [
    { from: 'in', text: 'Coucou ! Tu as vu le nouveau skin ?', time: '14:02' },
    { from: 'out', text: 'Oui il est trop beau !', time: '14:05' },
    { from: 'in', text: 'T\'as customisé ton perso ?', time: '14:07' },
  ]},
  { id: 2, name: 'Karim', init: 'K', color: '#4a8ec2', online: true, messages: [
    { from: 'in', text: 'On fait une partie de morpion ?', time: '13:30' },
    { from: 'out', text: 'Je suis prête ! Attends-moi', time: '13:32' },
  ]},
  { id: 3, name: 'Léa', init: 'L', color: '#7bc47b', online: false, messages: [
    { from: 'in', text: 'T\'es disponible ce soir ?', time: '11:00' },
  ]},
  { id: 4, name: 'Noah', init: 'N', color: '#9055a2', online: false, messages: [
    { from: 'out', text: 'Salut ! Comment tu vas ?', time: 'Hier' },
    { from: 'in', text: 'Bien merci ! Et toi ?', time: 'Hier' },
  ]},
];
let activeContact = null;

function initMessages() {
  const list = document.getElementById('chat-list-items');
  list.innerHTML = contacts.map(c => `
    <div class="chat-item" onclick="openChat(${c.id})" id="chat-item-${c.id}">
      <div class="avatar-circle" style="background:${c.color}">${c.init}</div>
      <div class="chat-item-info">
        <div class="chat-item-name">${c.name}</div>
        <div class="chat-item-preview">${c.messages[c.messages.length - 1].text}</div>
      </div>
      ${c.online ? '<div class="chat-unread">●</div>' : ''}
    </div>
  `).join('');
  openChat(1);
}

function openChat(id) {
  activeContact = contacts.find(c => c.id === id);
  document.querySelectorAll('.chat-item').forEach(el => el.classList.remove('active'));
  const item = document.getElementById('chat-item-' + id);
  if (item) item.classList.add('active');
  document.getElementById('chat-header-name').textContent = activeContact.name;
  const hdrAvt = document.getElementById('chat-header-avatar');
  hdrAvt.textContent = activeContact.init;
  hdrAvt.style.background = activeContact.color;
  renderMessages();
}

function renderMessages() {
  if (!activeContact) return;
  const area = document.getElementById('messages-area');
  area.innerHTML = activeContact.messages.map(m => `
    <div class="msg msg-${m.from === 'out' ? 'out' : 'in'}">
      ${m.text}
      <span class="msg-time">${m.time}</span>
    </div>
  `).join('');
  area.scrollTop = area.scrollHeight;
}

function sendMessage() {
  const inp = document.getElementById('msg-input');
  const text = inp.value.trim();
  if (!text || !activeContact) return;
  const now = new Date();
  const time = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
  activeContact.messages.push({ from: 'out', text, time });
  inp.value = '';
  renderMessages();
  const replies = [
    'Super ! J\'adore ça !', 'Haha c\'est trop drôle !',
    'Oui complètement d\'accord !', 'Tu m\'as l\'air d\'excellente humeur !',
    'On devrait faire ça plus souvent !', 'Trop bien !!',
    'Je suis là pour toi !', 'C\'est noté !',
  ];
  setTimeout(() => {
    activeContact.messages.push({ from: 'in', text: replies[Math.floor(Math.random() * replies.length)], time });
    renderMessages();
  }, 1000 + Math.random() * 1000);
}

function sendReact(emoji) {
  if (!activeContact) return;
  const now = new Date();
  const time = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
  activeContact.messages.push({ from: 'out', text: emoji, time });
  renderMessages();
}

function newConvo() { showToast('Fonctionnalité bientôt disponible !'); }

// ══════════════════════════════════════════
// ESPACE 3 — JEUX
// ══════════════════════════════════════════
function openGame(game) {
  document.getElementById('games-list').style.display = 'none';
  document.getElementById('back-to-games-btn').style.display = 'flex';
  document.querySelectorAll('.game-container').forEach(g => g.classList.remove('active'));
  document.getElementById('game-' + game).classList.add('active');
  if (game === 'morpion') initMorpion();
  if (game === 'sudoku') initSudoku();
  if (game === 'riddles') initRiddles();
}
function backToGamesList() {
  document.getElementById('games-list').style.display = 'block';
  document.getElementById('back-to-games-btn').style.display = 'none';
  document.querySelectorAll('.game-container').forEach(g => g.classList.remove('active'));
}

/* ── MORPION ── */
let board = [], currentPlayer = 'X', morpionMode = 'bot', gameOver = false;

function initMorpion() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;
  document.getElementById('morpion-status').textContent = 'À toi de jouer (X)';
  const b = document.getElementById('morpion-board');
  b.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'morpion-cell';
    cell.dataset.i = i;
    cell.onclick = () => playMorpion(i);
    b.appendChild(cell);
  }
}
function setMorpionMode(m) {
  morpionMode = m;
  document.getElementById('mode-bot').className = m === 'bot' ? 'btn btn-secondary' : 'btn btn-ghost';
  document.getElementById('mode-friend').className = m === 'friend' ? 'btn btn-secondary' : 'btn btn-ghost';
  resetMorpion();
}
function playMorpion(i) {
  if (gameOver || board[i]) return;
  board[i] = currentPlayer;
  renderMorpion();
  const win = checkWin();
  if (win) { document.getElementById('morpion-status').textContent = currentPlayer + ' a gagné !'; gameOver = true; return; }
  if (board.every(c => c)) { document.getElementById('morpion-status').textContent = 'Match nul !'; gameOver = true; return; }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (morpionMode === 'bot' && currentPlayer === 'O') {
    document.getElementById('morpion-status').textContent = 'Le bot réfléchit...';
    setTimeout(botPlay, 500);
  } else {
    document.getElementById('morpion-status').textContent = 'À ' + currentPlayer + ' de jouer';
  }
}
function botPlay() {
  if (gameOver) return;
  let best = -Infinity, move = -1;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'O';
      const score = minimax(board, 0, false);
      board[i] = '';
      if (score > best) { best = score; move = i; }
    }
  }
  if (move >= 0) playMorpionBot(move);
}
function minimax(b, depth, isMax) {
  const w = checkWinFor(b);
  if (w === 'O') return 10 - depth;
  if (w === 'X') return depth - 10;
  if (b.every(c => c)) return 0;
  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) if (!b[i]) { b[i] = 'O'; best = Math.max(best, minimax(b, depth + 1, false)); b[i] = ''; }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) if (!b[i]) { b[i] = 'X'; best = Math.min(best, minimax(b, depth + 1, true)); b[i] = ''; }
    return best;
  }
}
function playMorpionBot(i) {
  board[i] = 'O';
  renderMorpion();
  const win = checkWin();
  if (win) { document.getElementById('morpion-status').textContent = 'Le bot a gagné !'; gameOver = true; return; }
  if (board.every(c => c)) { document.getElementById('morpion-status').textContent = 'Match nul !'; gameOver = true; return; }
  currentPlayer = 'X';
  document.getElementById('morpion-status').textContent = 'À toi de jouer (X)';
}
function renderMorpion() {
  document.querySelectorAll('.morpion-cell').forEach((cell, i) => {
    cell.textContent = board[i];
    cell.className = 'morpion-cell' + (board[i] === 'O' ? ' o-cell' : '');
  });
}
function checkWin() {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (const [a, b, c] of lines) if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  return null;
}
function checkWinFor(b) {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (const [a, bc, c] of lines) if (b[a] && b[a] === b[bc] && b[a] === b[c]) return b[a];
  return null;
}
function resetMorpion() { initMorpion(); }

/* ── SUDOKU ── */
const sudokuPuzzle = [
  [5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]
];
const sudokuSolution = [
  [5,3,4,6,7,8,9,1,2],[6,7,2,1,9,5,3,4,8],[1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],[4,2,6,8,5,3,7,9,1],[7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],[2,8,7,4,1,9,6,3,5],[3,4,5,2,8,6,1,7,9]
];
function initSudoku() {
  const g = document.getElementById('sudoku-grid');
  g.innerHTML = '';
  document.getElementById('sudoku-msg').textContent = '';
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = document.createElement('div');
      cell.className = 'sudoku-cell';
      if ((c + 1) % 3 === 0 && c < 8) cell.classList.add('sudoku-box-border-right');
      if ((r + 1) % 3 === 0 && r < 8) cell.classList.add('sudoku-box-border-bottom');
      const inp = document.createElement('input');
      inp.type = 'text';
      inp.maxLength = 1;
      if (sudokuPuzzle[r][c]) {
        cell.classList.add('given');
        inp.value = sudokuPuzzle[r][c];
        inp.readOnly = true;
      } else {
        inp.dataset.r = r;
        inp.dataset.c = c;
        inp.addEventListener('input', function () {
          this.value = this.value.replace(/[^1-9]/g, '');
          this.value = this.value ? this.value[this.value.length - 1] : '';
        });
      }
      cell.appendChild(inp);
      g.appendChild(cell);
    }
  }
}
function checkSudoku() {
  let errors = 0, empty = 0;
  document.querySelectorAll('.sudoku-cell:not(.given) input').forEach(inp => {
    const r = +inp.dataset.r, c = +inp.dataset.c;
    if (!inp.value) { empty++; inp.style.color = 'var(--brown-muted)'; }
    else if (+inp.value !== sudokuSolution[r][c]) { errors++; inp.style.color = '#e24b4a'; }
    else { inp.style.color = 'var(--rose-deep)'; }
  });
  const msg = document.getElementById('sudoku-msg');
  if (empty > 0) msg.textContent = `Il reste ${empty} case(s) vide(s).`;
  else if (errors > 0) msg.textContent = `${errors} erreur(s) — les cases en rouge sont incorrectes.`;
  else msg.textContent = 'Félicitations ! Grille complète et correcte !';
}

/* ── DEVINETTES ── */
const riddles = [
  { q: "J'ai des villes, mais pas de maisons. Des montagnes, mais pas d'arbres. De l'eau, mais pas de poissons. Qu'est-ce que je suis ?", choices: ["Un livre", "Une carte", "Un rêve", "Un tableau"], answer: 1 },
  { q: "Plus je sèche, plus je suis mouillée. Qu'est-ce que je suis ?", choices: ["Une éponge", "Une serviette", "La pluie", "Une cascade"], answer: 1 },
  { q: "Je parle sans bouche et j'entends sans oreilles. Je n'ai pas de corps mais je prends vie avec le vent. Qu'est-ce que je suis ?", choices: ["Un fantôme", "Un écho", "La fumée", "Un nuage"], answer: 1 },
  { q: "Quel est l'animal qui a la tête en bas quand il dort ?", choices: ["Le chat", "La chauve-souris", "L'escargot", "Le poisson"], answer: 1 },
  { q: "Je suis toujours devant toi mais ne peut jamais être vu. Qu'est-ce que je suis ?", choices: ["L'avenir", "L'ombre", "Le miroir", "La lumière"], answer: 0 },
  { q: "Plus tu en enlèves, plus je suis grande. Qu'est-ce que je suis ?", choices: ["Une dette", "Un trou", "Une promesse", "Un secret"], answer: 1 },
  { q: "Qu'est-ce qui a des clefs mais n'ouvre aucune porte ?", choices: ["Un coffre", "Un clavier", "Un piano", "Un cadenas"], answer: 2 },
];
let riddleIndex = 0, riddleScore = 0, riddleTotal = 0, riddleAnswered = false;

function initRiddles() {
  riddleIndex = 0; riddleScore = 0; riddleTotal = 0; riddleAnswered = false;
  showRiddle();
}
function showRiddle() {
  if (riddleIndex >= riddles.length) riddleIndex = 0;
  riddleAnswered = false;
  const r = riddles[riddleIndex];
  document.getElementById('riddle-container').innerHTML = `
    <div class="riddle-card">
      <div class="riddle-q">${r.q}</div>
      <div class="riddle-choices">
        ${r.choices.map((c, i) => `<button class="riddle-choice" onclick="answerRiddle(${i},this)">${c}</button>`).join('')}
      </div>
    </div>`;
  updateRiddleScore();
}
function answerRiddle(idx, btn) {
  if (riddleAnswered) return;
  riddleAnswered = true;
  riddleTotal++;
  const r = riddles[riddleIndex];
  document.querySelectorAll('.riddle-choice')[r.answer].classList.add('correct');
  if (idx !== r.answer) btn.classList.add('wrong');
  else riddleScore++;
  updateRiddleScore();
}
function nextRiddle() {
  riddleIndex = (riddleIndex + 1) % riddles.length;
  showRiddle();
}
function updateRiddleScore() {
  document.getElementById('riddle-score').textContent = riddleScore + ' / ' + riddleTotal;
}

// ══════════════════════════════════════════
// ESPACE 4 — COMPTE
// ══════════════════════════════════════════
let authMethod = 'email';
function switchAuthTab(tab, btn) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('auth-register').style.display = tab === 'register' ? 'block' : 'none';
  document.getElementById('auth-login').style.display = tab === 'login' ? 'block' : 'none';
}
function setAuthMethod(m) {
  authMethod = m;
  document.getElementById('method-email-btn').className = m === 'email' ? 'method-btn active' : 'method-btn';
  document.getElementById('method-tel-btn').className = m === 'tel' ? 'method-btn active' : 'method-btn';
  document.getElementById('email-field').style.display = m === 'email' ? 'block' : 'none';
  document.getElementById('tel-field').style.display = m === 'tel' ? 'block' : 'none';
}
function registerAccount() {
  const user = document.getElementById('reg-username').value.trim();
  const pwd = document.getElementById('reg-pwd').value;
  const pwd2 = document.getElementById('reg-pwd2').value;
  if (!user) { showToast('Merci d\'entrer un pseudo.'); return; }
  if (authMethod === 'email' && !document.getElementById('reg-email').value.includes('@')) { showToast('Email invalide.'); return; }
  if (authMethod === 'tel' && document.getElementById('reg-tel').value.length < 8) { showToast('Numéro invalide.'); return; }
  if (pwd.length < 8) { showToast('Mot de passe trop court (8 caractères min).'); return; }
  if (pwd !== pwd2) { showToast('Les mots de passe ne correspondent pas.'); return; }
  document.getElementById('reg-success').style.display = 'block';
  document.getElementById('topbar-name').textContent = user;
  document.getElementById('topbar-avatar').textContent = user[0].toUpperCase();
  document.getElementById('char-display-name').value = user;
}
function loginAccount() {
  const id = document.getElementById('login-id').value.trim();
  const pwd = document.getElementById('login-pwd').value;
  if (!id || !pwd) { showToast('Remplis tous les champs.'); return; }
  document.getElementById('login-success').style.display = 'block';
}

// ══════════════════════════════════════════
// ESPACE 5 — AMIS
// ══════════════════════════════════════════
const friendsData = [
  { id: 1, name: 'Soline', init: 'S', color: '#e091aa', status: 'online', mood: 'Créative du jour', mutual: 4 },
  { id: 2, name: 'Karim', init: 'K', color: '#4a8ec2', status: 'online', mood: 'Prêt à jouer !', mutual: 2 },
  { id: 3, name: 'Léa', init: 'L', color: '#7bc47b', status: 'offline', mood: 'En mode détente', mutual: 6 },
  { id: 4, name: 'Noah', init: 'N', color: '#9055a2', status: 'offline', mood: 'Artiste en herbe', mutual: 1 },
  { id: 5, name: 'Mia', init: 'M', color: '#e8a87c', status: 'online', mood: 'Gamer since 2015', mutual: 3 },
  { id: 6, name: 'Rayan', init: 'R', color: '#c46a6a', status: 'offline', mood: 'Musique & code', mutual: 5 },
];
const requests = [
  { name: 'Zoé', init: 'Z', color: '#d4a0e0', mutual: '3 amis en commun' },
  { name: 'Axel', init: 'A', color: '#7ab8d4', mutual: '1 ami en commun' },
];
const suggestions = [
  { name: 'Emma', init: 'E', color: '#f5c842', mutual: '5 amis en commun' },
  { name: 'Lucas', init: 'L2', color: '#5ca07a', mutual: '2 amis en commun' },
];
let currentFriendFilter = 'all';

function initFriends() {
  renderFriends('all');
  document.getElementById('friend-requests').innerHTML = requests.map(r => `
    <div class="req-item">
      <div class="avatar-circle" style="background:${r.color};width:38px;height:38px;font-size:15px">${r.init}</div>
      <div class="req-info"><div class="req-name">${r.name}</div><div class="req-mutual">${r.mutual}</div></div>
      <div class="req-btns">
        <button class="req-accept" onclick="acceptRequest(this,'${r.name}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></button>
        <button class="req-decline" onclick="this.closest('.req-item').remove()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
      </div>
    </div>`).join('');
  document.getElementById('friend-suggestions').innerHTML = suggestions.map(s => `
    <div class="req-item">
      <div class="avatar-circle" style="background:${s.color};width:38px;height:38px;font-size:15px">${s.init}</div>
      <div class="req-info"><div class="req-name">${s.name}</div><div class="req-mutual">${s.mutual}</div></div>
      <button class="friend-action-btn primary" onclick="showToast('Demande envoyée à ${s.name} !')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Ajouter
      </button>
    </div>`).join('');
}

function renderFriends(filter) {
  currentFriendFilter = filter;
  const search = document.getElementById('friend-search').value.toLowerCase();
  const filtered = friendsData.filter(f => {
    if (filter === 'online' && f.status !== 'online') return false;
    if (filter === 'offline' && f.status !== 'offline') return false;
    if (search && !f.name.toLowerCase().includes(search)) return false;
    return true;
  });
  document.getElementById('friends-grid').innerHTML = filtered.map(f => `
    <div class="friend-card">
      <div style="position:relative;width:58px;margin:0 auto 10px">
        <div class="friend-avatar" style="background:${f.color}">${f.init}</div>
        ${f.status === 'online' ? '<div style="position:absolute;bottom:2px;right:0;width:12px;height:12px;border-radius:50%;background:#7bc47b;border:2px solid #fff"></div>' : ''}
      </div>
      <div class="friend-name">${f.name}</div>
      <div class="friend-status-text">${f.mood}</div>
      <div style="font-size:11px;color:var(--brown-light);margin-bottom:10px">${f.mutual} amis en commun</div>
      <div class="friend-actions">
        <button class="friend-action-btn" onclick="openChat(${f.id <= 4 ? f.id : 1});showScreen('messages')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Message
        </button>
        <button class="friend-action-btn" onclick="showToast('Profil de ${f.name} bientôt disponible !')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M5 21v-1a7 7 0 0 1 14 0v1"/></svg>
          Profil
        </button>
      </div>
    </div>`).join('') || '<p style="color:var(--brown-muted);font-size:14px;padding:20px 0">Aucun résultat</p>';
}

function filterFriends() { renderFriends(currentFriendFilter); }
function filterTab(tab, btn) {
  document.querySelectorAll('[id^=ftab-]').forEach(b => b.className = 'btn btn-ghost');
  btn.className = 'btn btn-secondary';
  renderFriends(tab);
}
function addFriendSearch() {
  const v = document.getElementById('friend-search').value.trim();
  if (!v) { showToast('Entre un pseudo à chercher.'); return; }
  showToast('Demande d\'ami envoyée à ' + v + ' !');
  document.getElementById('friend-search').value = '';
}
function acceptRequest(btn, name) {
  btn.closest('.req-item').remove();
  showToast(name + ' est maintenant ton ami(e) !');
}

// ══════════════════════════════════════════
// PAGE D'ACCUEIL — FEED
// ══════════════════════════════════════════
let feedPosts = [
  { id: 1, user: 'Soline', init: 'S', color: '#e091aa', time: 'Il y a 5 min', badge: 'Créative', body: 'Je viens de finir mon personnage avec des cheveux bouclés roses et une couronne ! C\'est trop beau, venez voir dans l\'espace personnalisation !', likes: 14, liked: false, comments: 3 },
  { id: 2, user: 'Karim', init: 'K', color: '#4a8ec2', time: 'Il y a 22 min', badge: 'Gamer', body: 'Quelqu\'un pour une partie de morpion ? J\'ai battu le bot 5 fois de suite, j\'ai besoin d\'un vrai défi !', likes: 8, liked: false, comments: 6 },
  { id: 3, user: 'Mia', init: 'M', color: '#e8a87c', time: 'Il y a 1h', badge: 'Aventurière', body: 'Nouvelle sur AyaBuilds World et c\'est déjà mon endroit préféré sur internet ! La personnalisation de perso est trop bien faite !', likes: 31, liked: true, comments: 12 },
  { id: 4, user: 'Léa', init: 'L', color: '#7bc47b', time: 'Il y a 2h', badge: 'Mystérieuse', body: 'Quelqu\'un a trouvé toutes les réponses aux devinettes ? Je suis bloquée sur la n°5...', likes: 5, liked: false, comments: 4 },
];
let postIdCounter = 5;

function initHomeFeed() { renderFeed(); }

function renderFeed() {
  const feed = document.getElementById('home-feed');
  if (!feed) return;
  feed.innerHTML = feedPosts.map(p => `
    <div class="post-card" id="post-${p.id}">
      <div class="post-header">
        <div class="avatar-circle" style="background:${p.color}">${p.init}</div>
        <div class="post-user-info">
          <div class="post-username">${p.user}</div>
          <div class="post-time">${p.time}</div>
        </div>
        <span class="post-badge">${p.badge}</span>
      </div>
      <div class="post-body">${p.body}</div>
      <div class="post-actions">
        <button class="post-action-btn ${p.liked ? 'liked' : ''}" onclick="toggleLike(${p.id},this)">
          <svg viewBox="0 0 24 24" fill="${p.liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          ${p.likes}
        </button>
        <button class="post-action-btn" onclick="showToast('Commentaires bientôt disponibles !')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          ${p.comments}
        </button>
        <button class="post-action-btn" onclick="showToast('Lien copié !')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          Partager
        </button>
      </div>
    </div>`).join('');
}

function toggleLike(id) {
  const p = feedPosts.find(p => p.id === id);
  if (!p) return;
  p.liked = !p.liked;
  p.likes += p.liked ? 1 : -1;
  renderFeed();
}

function createPost() {
  const inp = document.getElementById('new-post-input');
  const text = inp.value.trim();
  if (!text) { showToast('Écris quelque chose d\'abord !'); return; }
  const username = document.getElementById('topbar-name').textContent || 'Moi';
  feedPosts.unshift({
    id: postIdCounter++,
    user: username,
    init: username[0].toUpperCase(),
    color: '#e091aa',
    time: 'À l\'instant',
    badge: 'Moi',
    body: text,
    likes: 0,
    liked: false,
    comments: 0
  });
  inp.value = '';
  renderFeed();
  showToast('Post publié !');
}

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
window.onload = function () {
  updateChar();
  initMessages();
  initFriends();
  initHomeFeed();
  document.getElementById('char-display-name').addEventListener('input', updateChar);
  const d = new Date();
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const months = ['jan', 'fév', 'mar', 'avr', 'mai', 'jun', 'jul', 'août', 'sep', 'oct', 'nov', 'déc'];
  document.getElementById('home-date').textContent = days[d.getDay()] + ' ' + d.getDate() + ' ' + months[d.getMonth()];
};
