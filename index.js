// Tunggu hingga halaman dimuat sepenuhnya
document.addEventListener('DOMContentLoaded', function() {
    console.log("Halaman Ulang Tahun Mama siap!");
    
    // Tambahkan elemen dekoratif
    addDecorativeElements();
    
    // Animasi huruf satu per satu
    animateLettersOneByOne();
    
    // Tambahkan efek pada kue
    addCakeEffects();
    
    // Tambahkan efek interaktif
    addInteractiveEffects();
    
    // Setup musik - PASTIKAN INI DIPANGGIL
    setupMusic();
});

// Fungsi untuk menambahkan elemen dekoratif
function addDecorativeElements() {
    const container = document.querySelector('.animate-container');
    
    // Tambahkan 20 elemen dekoratif (hati dan bintang)
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'decorative-element';
        
        // Pilih antara hati atau bintang
        if (Math.random() > 0.5) {
            element.innerHTML = '<i class="fas fa-heart"></i>';
            element.classList.add('heart');
        } else {
            element.innerHTML = '<i class="fas fa-star"></i>';
            element.classList.add('star');
        }
        
        // Posisi acak
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        element.style.left = `${left}%`;
        element.style.top = `${top}%`;
        
        // Animasi float dengan delay berbeda
        const duration = 3 + Math.random() * 4;
        const delay = Math.random() * 5;
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        
        // Ukuran acak
        const size = 0.5 + Math.random() * 1.5;
        element.style.fontSize = `${size}rem`;
        
        // Opacity acak
        element.style.opacity = 0.3 + Math.random() * 0.5;
        
        container.appendChild(element);
    }
}

// Fungsi untuk animasi huruf satu per satu
function animateLettersOneByOne() {
    const happySpans = document.querySelectorAll('.Happy span');
    const birthdaySpans = document.querySelectorAll('.Birthday span');
    
    // Animasi untuk HAPPY
    happySpans.forEach((span, index) => {
        // Set awal tidak terlihat
        span.style.opacity = '0';
        span.style.transform = 'translateY(30px)';
        
        // Animasi dengan delay bertahap
        setTimeout(() => {
            span.style.transition = 'all 0.8s ease';
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
            
            // Setelah muncul, tambahkan animasi bounce
            setTimeout(() => {
                span.style.animation = `bounce 1.5s ease-in-out 0.5s infinite`;
            }, 1000);
        }, index * 200);
    });
    
    // Animasi untuk BIRTHDAY (setelah HAPPY selesai)
    setTimeout(() => {
        birthdaySpans.forEach((span, index) => {
            // Set awal tidak terlihat
            span.style.opacity = '0';
            span.style.transform = 'translateY(30px)';
            
            // Animasi dengan delay bertahap
            setTimeout(() => {
                span.style.transition = 'all 0.8s ease';
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
                
                // Setelah muncul, tambahkan animasi bounce
                setTimeout(() => {
                    span.style.animation = `bounce 1.5s ease-in-out 0.5s infinite`;
                }, 1000);
            }, index * 150);
        });
    }, happySpans.length * 200 + 300);
}

// Fungsi untuk efek pada kue
function addCakeEffects() {
    const cake = document.querySelector('.animate-cake i');
    
    // Tambahkan efek cahaya pada kue
    const cakeGlow = document.createElement('div');
    cakeGlow.style.position = 'absolute';
    cakeGlow.style.width = '150px';
    cakeGlow.style.height = '150px';
    cakeGlow.style.background = 'radial-gradient(circle, rgba(255,107,157,0.3) 0%, rgba(255,107,157,0) 70%)';
    cakeGlow.style.borderRadius = '50%';
    cakeGlow.style.top = '50%';
    cakeGlow.style.left = '50%';
    cakeGlow.style.transform = 'translate(-50%, -50%)';
    cakeGlow.style.zIndex = '1';
    cakeGlow.style.animation = 'pulse 2s ease-in-out infinite';
    
    document.querySelector('.animate-cake').style.position = 'relative';
    document.querySelector('.animate-cake').appendChild(cakeGlow);
    
    // Tambahkan style untuk animasi pulse
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
        }
    `;
    document.head.appendChild(style);
    
    // Efek hover pada kue
    cake.parentElement.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    cake.parentElement.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// Fungsi musik yang benar
function setupMusic() {
    const audio = document.getElementById('birthdayAudio');
    const musicBtn = document.querySelector('.music-control');
    
    if (!audio || !musicBtn) {
        console.error("Elemen audio atau tombol musik tidak ditemukan!");
        return;
    }
    
    // Atur volume
    audio.volume = 0.7;
    
    // Status musik
    let isPlaying = false;
    
    // Event listener untuk tombol musik
    musicBtn.addEventListener('click', function() {
        if (!isPlaying) {
            // Coba play musik
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Berhasil diputar
                    isPlaying = true;
                    musicBtn.innerHTML = '<i class="bi bi-pause-circle"></i>';
                    musicBtn.classList.add('playing');
                    console.log("Musik mulai diputar");
                }).catch(error => {
                    // Gagal diputar
                    console.error("Gagal memutar musik:", error);
                    alert("Klik tombol musik sekali lagi untuk memutar");
                });
            }
        } else {
            // Pause musik
            audio.pause();
            isPlaying = false;
            musicBtn.innerHTML = '<i class="bi bi-play-circle"></i>';
            musicBtn.classList.remove('playing');
            console.log("Musik dijeda");
        }
    });
    
    // Coba auto-play saat halaman dimuat (browser mungkin memblokir ini)
    setTimeout(() => {
        if (!isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                musicBtn.innerHTML = '<i class="bi bi-pause-circle"></i>';
                musicBtn.classList.add('playing');
                console.log("Musik auto-play berhasil");
            }).catch(error => {
                console.log("Auto-play diblokir, user harus klik tombol terlebih dahulu");
            });
        }
    }, 1000);
}

// Fungsi untuk efek interaktif
function addInteractiveEffects() {
    const greetingsContainer = document.querySelector('.greetings-container');
    
    // Tambahkan efek saat container ucapan dihover
    greetingsContainer.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
        this.style.transition = 'all 0.3s ease';
    });
    
    greetingsContainer.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
    
    // Tambahkan efek saat huruf dihover
    const allSpans = document.querySelectorAll('h1 span');
    allSpans.forEach(span => {
        span.addEventListener('mouseenter', function() {
            this.style.color = '#ff0066';
            this.style.transform = 'scale(1.3) rotate(5deg)';
            this.style.textShadow = '0 0 15px rgba(255, 0, 102, 0.5)';
            this.style.transition = 'all 0.3s ease';
        });
        
        span.addEventListener('mouseleave', function() {
            // Kembalikan ke warna asli berdasarkan kelas parent
            if (this.parentElement.classList.contains('Happy')) {
                this.style.color = '#ff4081';
            } else {
                this.style.color = '#2196F3';
            }
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.2)';
        });
    });
    
    // Tambahkan efek konfeti sederhana saat mengklik
    document.addEventListener('click', function(e) {
        // Hanya buat konfeti jika tidak mengklik teks penting
        if (!e.target.closest('.greetings-container') && 
            !e.target.closest('h1 span') && 
            !e.target.closest('.animate-cake') &&
            !e.target.closest('.music-control')) {
            createSimpleConfetti(e.clientX, e.clientY);
        }
    });
}

// Fungsi untuk membuat konfeti sederhana
function createSimpleConfetti(x, y) {
    const colors = ['#ff6b9d', '#ff9e6d', '#ffcc5c', '#5d9cec', '#a78bfa'];
    
    for (let i = 0; i < 10; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '12px';
        confetti.style.height = '12px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.left = `${x}px`;
        confetti.style.top = `${y}px`;
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.opacity = '0.8';
        
        // Animasi konfeti
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 3;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = x;
        let posY = y;
        let opacity = 0.8;
        let rotation = 0;
        
        function animate() {
            posX += vx;
            posY += vy;
            vy += 0.08; // gravitasi lebih lambat
            opacity -= 0.02;
            rotation += 3;
            
            confetti.style.left = `${posX}px`;
            confetti.style.top = `${posY}px`;
            confetti.style.opacity = opacity;
            confetti.style.transform = `rotate(${rotation}deg)`;
            
            if (opacity > 0 && posY < window.innerHeight) {
                requestAnimationFrame(animate);
            } else {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }
        }
        
        document.body.appendChild(confetti);
        requestAnimationFrame(animate);
    }
}