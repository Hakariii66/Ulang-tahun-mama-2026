/* ============================================================
   index.js — Ulang Tahun Mama 🎂
   ============================================================ */

// Ambil audio SEKALI di awal, pakai terus
const audio = document.getElementById('birthdayAudio');
let isPlaying = false;

// ── Fungsi toggle musik ───────────────────────────────────────
function playMusic() {
    audio.play()
        .then(() => {
            isPlaying = true;
            setMusicIcon(true);
        })
        .catch(err => console.warn('Play gagal:', err));
}

function pauseMusic() {
    audio.pause();
    isPlaying = false;
    setMusicIcon(false);
}

function setMusicIcon(playing) {
    const icon = document.querySelector('.music-control i');
    const ring = document.querySelector('.music-ring');
    if (icon) icon.className = playing ? 'bi bi-pause-circle' : 'bi bi-play-circle';
    if (ring) ring.style.animationPlayState = playing ? 'running' : 'paused';
}

// ── Tombol musik (on/off) ─────────────────────────────────────
const musicControl = document.querySelector('.music-control');
const ring = document.createElement('div');
ring.classList.add('music-ring');
ring.style.animationPlayState = 'paused';
musicControl.appendChild(ring);

musicControl.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

// ── Splash Screen ─────────────────────────────────────────────
const splashStyle = document.createElement('style');
splashStyle.textContent = `
    @keyframes splashPulse {
        0%, 100% { transform: scale(1); }
        50%       { transform: scale(1.2); }
    }
    @keyframes splashGlow {
        0%   { box-shadow: 0 0 20px rgba(194,24,91,0.5); }
        100% { box-shadow: 0 0 50px rgba(194,24,91,1), 0 0 80px rgba(255,215,0,0.4); }
    }
`;
document.head.appendChild(splashStyle);

const splash = document.createElement('div');
splash.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: linear-gradient(135deg, #1a0033, #2d0050, #0d001a);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    cursor: pointer;
`;
splash.innerHTML = `
    <div style="font-size:5rem; animation: splashPulse 1.5s ease-in-out infinite;">🎂</div>
    <div style="
        font-family: 'Dancing Script', cursive;
        font-size: clamp(1.8rem, 6vw, 3rem);
        color: #ffd700;
        text-shadow: 0 0 20px rgba(255,215,0,0.7);
        text-align: center;
        padding: 0 1rem;
    ">Klik untuk membuka<br>hadiah spesial Mama 🎀</div>
    <div style="
        margin-top: 8px;
        padding: 14px 36px;
        border-radius: 50px;
        background: linear-gradient(135deg, #c2185b, #7b1fa2);
        color: white;
        font-size: 1.1rem;
        font-family: 'Playfair Display', serif;
        box-shadow: 0 0 30px rgba(194,24,91,0.6);
        animation: splashGlow 1.5s ease-in-out infinite alternate;
    ">✨ Buka Sekarang ✨</div>
`;
document.body.appendChild(splash);

splash.addEventListener('click', () => {
    // Play musik langsung saat klik splash (interaksi valid dari user)
    playMusic();

    // Animasi keluar splash
    splash.style.transition = 'opacity 0.8s ease';
    splash.style.opacity = '0';
    splash.style.pointerEvents = 'none';
    setTimeout(() => splash.remove(), 800);

    // Mulai semua efek visual
    startEffects();
}, { once: true });

// ── Semua efek visual ─────────────────────────────────────────
function startEffects() {
    createCursor();
    createStars();
    startConfetti();
    startHearts();
}

// ── Custom Cursor ─────────────────────────────────────────────
function createCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top  = e.clientY + 'px';
    });
}

// ── Stars Background ──────────────────────────────────────────
function createStars() {
    const bg = document.createElement('div');
    bg.classList.add('stars-bg');
    document.body.prepend(bg);
    for (let i = 0; i < 120; i++) {
        const s = document.createElement('div');
        s.classList.add('star');
        const size = Math.random() * 3 + 1;
        s.style.cssText = `
            width:  ${size}px;
            height: ${size}px;
            top:    ${Math.random() * 100}%;
            left:   ${Math.random() * 100}%;
            --dur:  ${(Math.random() * 4 + 2).toFixed(1)}s;
            --delay:${(Math.random() * 5).toFixed(1)}s;
        `;
        bg.appendChild(s);
    }
}

// ── Confetti ──────────────────────────────────────────────────
function startConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confettiCanvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const COLORS = ['#ffd700','#e91e8c','#f48fb1','#ce93d8','#ffffff','#ff8a65','#80cbc4'];

    class Piece {
        constructor() { this.reset(true); }
        reset(init = false) {
            this.x        = Math.random() * canvas.width;
            this.y        = init ? Math.random() * -canvas.height : -20;
            this.size     = Math.random() * 8 + 4;
            this.speedY   = Math.random() * 2 + 1;
            this.speedX   = (Math.random() - 0.5) * 2;
            this.rotation = Math.random() * 360;
            this.rotSpeed = (Math.random() - 0.5) * 4;
            this.color    = COLORS[Math.floor(Math.random() * COLORS.length)];
            this.shape    = Math.random() < 0.5 ? 'rect' : 'circle';
            this.opacity  = Math.random() * 0.6 + 0.4;
        }
        update() {
            this.y += this.speedY; this.x += this.speedX; this.rotation += this.rotSpeed;
            if (this.y > canvas.height + 20) this.reset();
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle   = this.color;
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            if (this.shape === 'rect') {
                ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
            } else {
                ctx.beginPath(); ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2); ctx.fill();
            }
            ctx.restore();
        }
    }

    const pieces = Array.from({ length: 120 }, () => new Piece());
    (function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
    })();
}

// ── Floating Hearts & Sparkle ─────────────────────────────────
function startHearts() {
    const EMOJIS = ['💖','💕','💗','🌸','✨','💫','🎀','💝'];

    setInterval(() => {
        const el = document.createElement('div');
        el.classList.add('heart');
        el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        el.style.left              = Math.random() * 100 + 'vw';
        el.style.bottom            = '-60px';
        el.style.fontSize          = (Math.random() * 1.2 + 0.8) + 'rem';
        el.style.animationDuration = (Math.random() * 4000 + 4000) + 'ms';
        document.body.appendChild(el);
        el.addEventListener('animationend', () => el.remove());
    }, 500);

    document.addEventListener('click', (e) => {
        if (e.target.closest('.music-control')) return;
        for (let i = 0; i < 8; i++) {
            const spark = document.createElement('div');
            const angle = (i / 8) * 360;
            const dist  = Math.random() * 60 + 30;
            const tx    = Math.cos((angle * Math.PI) / 180) * dist;
            const ty    = Math.sin((angle * Math.PI) / 180) * dist;
            spark.style.cssText = `
                position:fixed; left:${e.clientX}px; top:${e.clientY}px;
                pointer-events:none; z-index:9998;
                font-size:${Math.random() * 1.2 + 0.6}rem;
                transform:translate(-50%,-50%);
                transition:transform 0.7s ease-out, opacity 0.7s ease-out;
                opacity:1;
            `;
            spark.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
            document.body.appendChild(spark);
            requestAnimationFrame(() => {
                spark.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0.3)`;
                spark.style.opacity   = '0';
            });
            setTimeout(() => spark.remove(), 700);
        }
    });
}