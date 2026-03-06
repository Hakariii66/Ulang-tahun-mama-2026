/* =========================================
   ULANG TAHUN MAMA - Birthday JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. INJECT MISSING HTML ELEMENTS ────────────────────────────────────────

  // Add canvas for stars
  const starsCanvas = document.createElement('canvas');
  starsCanvas.id = 'stars-canvas';
  document.body.prepend(starsCanvas);

  // Add canvas for confetti
  const confettiCanvas = document.createElement('canvas');
  confettiCanvas.id = 'confetti-canvas';
  document.body.prepend(confettiCanvas);

  // Add divider between cake and greetings
  const animateContainer = document.querySelector('.animate-container');
  const greetingsContainer = document.querySelector('.greetings-container');

  const divider = document.createElement('div');
  divider.className = 'divider';
  divider.innerHTML = `<i class="bi bi-stars divider-icon"></i>`;
  animateContainer.parentElement.insertBefore(divider, greetingsContainer);

  // Add hearts row inside greetings text
  const greetingsText = document.querySelector('.greetings-text');
  const heartRow = document.createElement('div');
  heartRow.className = 'heart-row';
  heartRow.innerHTML = `<span>🤍</span><span>💛</span><span>🌸</span><span>💛</span><span>🤍</span>`;
  greetingsText.appendChild(heartRow);

  // Add music button
  const musicBtn = document.createElement('button');
  musicBtn.className = 'music-btn';
  musicBtn.innerHTML = `<i class="bi bi-music-note-beamed"></i>`;
  musicBtn.title = 'Toggle music feel';
  document.body.appendChild(musicBtn);

  // ─── 2. LETTER ANIMATIONS ────────────────────────────────────────────────────

  const happySpans = document.querySelectorAll('.Happy span');
  const birthdaySpans = document.querySelectorAll('.Birthday span');

  // Set individual wave delays for looping animations
  happySpans.forEach((span, i) => {
    span.style.animationDelay = `${0.1 + i * 0.12}s`;
  });
  birthdaySpans.forEach((span, i) => {
    span.style.animationDelay = `${0.7 + i * 0.1}s`;
  });

  // Staggered entry reveal
  setTimeout(() => {
    happySpans.forEach((span, i) => {
      setTimeout(() => {
        span.classList.add('letter-appear');
      }, i * 100);
    });
  }, 400);

  setTimeout(() => {
    birthdaySpans.forEach((span, i) => {
      setTimeout(() => {
        span.classList.add('birthday-appear');
      }, i * 90);
    });
  }, 1000);

  // Greetings card fade in
  setTimeout(() => {
    greetingsText.classList.add('visible');
  }, 1800);


  // ─── 3. STARFIELD ────────────────────────────────────────────────────────────

  const sc = starsCanvas;
  const sCtx = sc.getContext('2d');

  function resizeStars() {
    sc.width = window.innerWidth;
    sc.height = window.innerHeight;
  }
  resizeStars();
  window.addEventListener('resize', resizeStars);

  const stars = Array.from({ length: 180 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.8 + 0.2,
    alpha: Math.random(),
    speed: Math.random() * 0.008 + 0.003,
    phase: Math.random() * Math.PI * 2,
  }));

  function drawStars(t) {
    sCtx.clearRect(0, 0, sc.width, sc.height);
    stars.forEach(s => {
      const alpha = 0.3 + 0.7 * Math.abs(Math.sin(s.phase + t * s.speed));
      sCtx.beginPath();
      sCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      sCtx.fillStyle = `rgba(255, 255, 220, ${alpha})`;
      sCtx.fill();
    });
    requestAnimationFrame(drawStars);
  }
  requestAnimationFrame(drawStars);


  // ─── 4. CONFETTI ─────────────────────────────────────────────────────────────

  const cc = confettiCanvas;
  const cCtx = cc.getContext('2d');

  function resizeConfetti() {
    cc.width = window.innerWidth;
    cc.height = window.innerHeight;
  }
  resizeConfetti();
  window.addEventListener('resize', resizeConfetti);

  const CONFETTI_COLORS = [
    '#f7c948', '#ffe98a', '#e8637a', '#ffb3c1',
    '#b39ddb', '#80deea', '#fff', '#ff8a65',
  ];

  const confettiPieces = [];

  function spawnConfetti(count) {
    for (let i = 0; i < count; i++) {
      confettiPieces.push({
        x: Math.random() * cc.width,
        y: -10 - Math.random() * 200,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 3,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 2 + 1.5,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.15,
        wobble: Math.random() * 0.1,
        wobblePhase: Math.random() * Math.PI * 2,
        opacity: 1,
      });
    }
  }

  function drawConfetti() {
    cCtx.clearRect(0, 0, cc.width, cc.height);

    for (let i = confettiPieces.length - 1; i >= 0; i--) {
      const p = confettiPieces[i];
      p.x += p.vx + Math.sin(p.wobblePhase) * p.wobble;
      p.y += p.vy;
      p.rot += p.rotSpeed;
      p.wobblePhase += 0.05;
      p.vy += 0.03; // gravity

      if (p.y > cc.height + 20) {
        confettiPieces.splice(i, 1);
        continue;
      }

      cCtx.save();
      cCtx.translate(p.x, p.y);
      cCtx.rotate(p.rot);
      cCtx.globalAlpha = p.opacity;
      cCtx.fillStyle = p.color;
      cCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      cCtx.restore();
    }

    requestAnimationFrame(drawConfetti);
  }
  requestAnimationFrame(drawConfetti);

  // Burst on load
  setTimeout(() => spawnConfetti(160), 1200);
  setTimeout(() => spawnConfetti(80), 2500);
  setTimeout(() => spawnConfetti(60), 4000);

  // Occasional confetti
  setInterval(() => {
    if (confettiPieces.length < 40) {
      spawnConfetti(30);
    }
  }, 8000);


  // ─── 5. FLOATING BALLOONS ────────────────────────────────────────────────────

  const BALLOONS = ['🎈', '🎀', '🌸', '🎊', '✨', '🌷', '💖'];

  function spawnBalloon() {
    const el = document.createElement('div');
    el.className = 'balloon';
    el.textContent = BALLOONS[Math.floor(Math.random() * BALLOONS.length)];

    const x = Math.random() * 90 + 5; // 5% to 95% from left
    const duration = Math.random() * 8 + 8; // 8-16s
    const size = Math.random() * 1.5 + 1.5; // 1.5-3rem in em

    el.style.left = x + 'vw';
    el.style.fontSize = size + 'rem';
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = '0s';

    document.body.appendChild(el);

    setTimeout(() => el.remove(), duration * 1000 + 500);
  }

  // Start spawning balloons
  setTimeout(() => spawnBalloon(), 600);
  setInterval(spawnBalloon, 3500);


  // ─── 6. SPARKLE ON CLICK ─────────────────────────────────────────────────────

  document.addEventListener('click', (e) => {
    createSparkle(e.clientX, e.clientY);
  });

  function createSparkle(x, y) {
    const EMOJIS = ['✨', '🌟', '💫', '⭐', '🌸'];
    for (let i = 0; i < 6; i++) {
      const el = document.createElement('div');
      el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      el.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: ${Math.random() * 1.2 + 0.8}rem;
        pointer-events: none;
        z-index: 9999;
        user-select: none;
        transform: translate(-50%, -50%);
        animation: sparkleOut 0.9s ease forwards;
      `;

      const angle = (i / 6) * Math.PI * 2 + Math.random() * 0.5;
      const dist = Math.random() * 60 + 40;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;

      el.style.setProperty('--tx', tx + 'px');
      el.style.setProperty('--ty', ty + 'px');

      document.body.appendChild(el);
      setTimeout(() => el.remove(), 950);
    }
  }

  // Inject sparkle keyframe dynamically
  const sparkleStyle = document.createElement('style');
  sparkleStyle.textContent = `
    @keyframes sparkleOut {
      0%   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      100% { opacity: 0; transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0.3); }
    }
  `;
  document.head.appendChild(sparkleStyle);

  // ─── 8. CAKE CLICK EFFECT ────────────────────────────────────────────────────

  const cakeEl = document.querySelector('.animate-cake');
  cakeEl.style.cursor = 'pointer';
  cakeEl.addEventListener('click', () => {
    spawnConfetti(100);
    for (let i = 0; i < 5; i++) setTimeout(spawnBalloon, i * 300);

    // Quick shake
    cakeEl.style.animation = 'none';
    cakeEl.style.transform = 'scale(1.3) rotate(-10deg)';
    setTimeout(() => {
      cakeEl.style.transform = '';
      cakeEl.style.animation = '';
    }, 300);
  });

});