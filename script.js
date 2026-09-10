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
