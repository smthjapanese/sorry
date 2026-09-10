// starfield
(function generateStars() {
  const container = document.getElementById('stars');
  const count = 80;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = (Math.random() * 4) + 's';
    container.appendChild(star);
  }
})();

// falling petals
(function generatePetals() {
  const container = document.getElementById('petals');
  const emojis = ['🌸', '🤍', '✨'];
  const count = 18;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('span');
    petal.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (10 + Math.random() * 12) + 's';
    petal.style.animationDelay = (Math.random() * 12) + 's';
    petal.style.fontSize = (12 + Math.random() * 10) + 'px';
    container.appendChild(petal);
  }
})();

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => observer.observe(el));

// final button
const btn = document.getElementById('forgiveBtn');
const message = document.getElementById('finalMessage');
btn.addEventListener('click', () => {
  btn.style.display = 'none';
  message.hidden = false;
  burstHearts();
});

// puzzle game
(function initPuzzle() {
  const grid = document.getElementById('puzzle');
  const winMsg = document.getElementById('puzzleWin');
  if (!grid) return;

  const size = 3;
  const total = size * size;
  let order = [...Array(total).keys()];

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    if (arr.every((v, i) => v === i)) return shuffle(arr);
    return arr;
  }
  order = shuffle(order);

  let selected = null;

  function render() {
    grid.innerHTML = '';
    order.forEach((value, pos) => {
      const tile = document.createElement('div');
      tile.className = 'puzzle-tile';
      const col = value % size;
      const row = Math.floor(value / size);
      tile.style.backgroundPosition = `${(col / (size - 1)) * 100}% ${(row / (size - 1)) * 100}%`;
      tile.dataset.pos = pos;
      tile.addEventListener('click', () => onTileClick(pos));
      grid.appendChild(tile);
    });
  }

  function onTileClick(pos) {
    const tiles = grid.children;
    if (selected === null) {
      selected = pos;
      tiles[pos].classList.add('selected');
      return;
    }
    if (selected === pos) {
      tiles[pos].classList.remove('selected');
      selected = null;
      return;
    }
    [order[selected], order[pos]] = [order[pos], order[selected]];
    tiles[selected].classList.remove('selected');
    selected = null;
    render();
    checkWin();
  }

  function checkWin() {
    if (order.every((v, i) => v === i)) {
      winMsg.hidden = false;
      grid.querySelectorAll('.puzzle-tile').forEach((t) => t.classList.add('solved'));
    }
  }

  render();
})();

// tir game
(function initTir() {
  const arena = document.getElementById('tirArena');
  const counterEl = document.getElementById('tirCount');
  const winMsg = document.getElementById('tirWin');
  if (!arena) return;

  const words = ['обида', 'молчание', 'ссора', 'недопонимание', 'холодность', 'усталость', 'гордость', 'спешка'];
  const target = 10;
  let popped = 0;
  let spawnTimer = null;

  function spawnBubble() {
    if (popped >= target) return;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = words[Math.floor(Math.random() * words.length)];
    const arenaWidth = arena.clientWidth;
    const maxLeft = Math.max(arenaWidth - 100, 20);
    bubble.style.left = Math.random() * maxLeft + 'px';
    const duration = 4.5 + Math.random() * 2;
    bubble.style.animationDuration = duration + 's';

    bubble.addEventListener('click', () => popBubble(bubble));
    bubble.addEventListener('animationend', () => bubble.remove());

    arena.appendChild(bubble);
  }

  function popBubble(bubble) {
    const left = bubble.offsetLeft;
    const top = bubble.offsetTop;
    bubble.remove();

    const heart = document.createElement('span');
    heart.className = 'bubble-pop';
    heart.textContent = '💛';
    heart.style.left = left + 'px';
    heart.style.top = top + 'px';
    arena.appendChild(heart);
    setTimeout(() => heart.remove(), 750);

    popped++;
    counterEl.textContent = String(Math.min(popped, target));

    if (popped >= target) {
      clearInterval(spawnTimer);
      winMsg.hidden = false;
      arena.querySelectorAll('.bubble').forEach((b) => b.remove());
    }
  }

  spawnTimer = setInterval(spawnBubble, 900);
  spawnBubble();
})();

function burstHearts() {
  const emojis = ['💛', '🤍', '💫', '🌸'];
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('span');
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';
    heart.style.fontSize = (16 + Math.random() * 18) + 'px';
    heart.style.zIndex = '999';
    heart.style.pointerEvents = 'none';
    heart.style.transition = `transform ${2 + Math.random() * 2}s ease-out, opacity ${2 + Math.random() * 2}s ease-out`;
    document.body.appendChild(heart);
    requestAnimationFrame(() => {
      heart.style.transform = `translateY(-${100 + Math.random() * 40}vh) translateX(${(Math.random() - 0.5) * 200}px) rotate(${(Math.random() - 0.5) * 180}deg)`;
      heart.style.opacity = '0';
    });
    setTimeout(() => heart.remove(), 4200);
  }
}
