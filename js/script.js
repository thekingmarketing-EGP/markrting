document.addEventListener("DOMContentLoaded", () => {
    // 1. تأثير الكتابة الذكي
    const textArray = ["تصميم احترافي یخطف العين 🎨", "تصوير يبيع المنتج قبل ما يتكلم 📸", "تمويل وإدارة إعلانات بذكاء 💰", "خطة مدروسة مش عشوائية 🧠"];
    const typingTextElement = document.querySelector(".typing-text");
    let textIndex = 0, charIndex = 0, isDeleting = false;

    function typeEffect() {
        if (!typingTextElement) return;
        const currentText = textArray[textIndex];
        typingTextElement.textContent = isDeleting ? currentText.substring(0, charIndex - 1) : currentText.substring(0, charIndex + 1);
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        let typeSpeed = isDeleting ? 40 : 80;
        if (!isDeleting && charIndex === currentText.length) { typeSpeed = 2000; isDeleting = true; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; textIndex = (textIndex + 1) % textArray.length; typeSpeed = 500; }
        setTimeout(typeEffect, typeSpeed);
    }
    if (typingTextElement) setTimeout(typeEffect, 1000);

    // 2. القائمة الجانبية للموبايل
    const mobileMenu = document.getElementById("mobile-menu");
    const navList = document.querySelector(".nav-list");
    const menuText = document.querySelector(".menu-text");

    if (mobileMenu) {
        mobileMenu.onclick = () => {
            navList.classList.toggle("active");
            mobileMenu.classList.toggle("active");
            if (navList.classList.contains("active")) {
                menuText.textContent = "إغلاق";
            } else {
                menuText.textContent = "القائمة";
            }
        };
    }

    // إغلاق عند الضغط على رابط
    document.querySelectorAll(".nav-list a").forEach(link => {
        link.onclick = () => {
            if(navList) navList.classList.remove("active");
            if(mobileMenu) mobileMenu.classList.remove("active");
            if(menuText) menuText.textContent = "القائمة";
        };
    });

    // 3. الماوس التفاعلي المخصص للكمبيوتر
    const cursor = document.querySelector('.custom-cursor');
    const cursorGlow = document.querySelector('.custom-cursor-glow');
    if (window.innerWidth > 992 && cursor && cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            setTimeout(() => {
                cursorGlow.style.left = e.clientX + 'px';
                cursorGlow.style.top = e.clientY + 'px';
            }, 50);
        });
        const interactiveElements = document.querySelectorAll('a, button, .menu-toggle, .services-trigger');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorGlow.style.width = '60px'; cursorGlow.style.height = '60px';
                cursorGlow.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorGlow.style.width = '40px'; cursorGlow.style.height = '40px';
                cursorGlow.style.backgroundColor = 'transparent';
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // 4. نظام العداد الوهمي الذكي
    const counterDisplay = document.getElementById("count-display");
    if (counterDisplay) {
        let currentCount = localStorage.getItem("kingVisitorCount");
        if (!currentCount) {
            currentCount = 60000;
        } else {
            currentCount = parseInt(currentCount);
        }
        
        const updateDisplay = () => { counterDisplay.textContent = currentCount.toLocaleString(); };
        updateDisplay(); 

        setInterval(() => {
            const randomIncrease = Math.floor(Math.random() * 4) + 1;
            currentCount += randomIncrease;
            localStorage.setItem("kingVisitorCount", currentCount);
            updateDisplay();
        }, Math.floor(Math.random() * 5000) + 3000); 
    }

    // 5. تشغيل القائمة المنبثقة للخدمات (الموبايل)
    const servicesTrigger = document.querySelector(".services-trigger");
    const servicesPopup = document.querySelector(".mobile-services-popup");
    if (servicesTrigger && servicesPopup) {
        servicesTrigger.addEventListener("click", (e) => {
            e.stopPropagation(); 
            servicesPopup.classList.toggle("show");
        });
        document.addEventListener("click", (e) => {
            if (!servicesTrigger.contains(e.target)) {
                servicesPopup.classList.remove("show");
            }
        });
    }

    // 6. تشغيل أنميشن الاحتفال (Confetti) في صفحة سابقة الأعمال فقط
    if (document.querySelector('.portfolio-gallery')) {
        createConfetti();
        setTimeout(partyHorns, 1000); 
    }
});

// --- دوال أنميشن الاحتفال ---
function createConfetti() {
    const colors = ['#ffd700', '#ffffff', '#ff4500', '#32cd32', '#1e90ff'];
    const container = document.body;

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (Math.random() * 8 + 5) + 'px'; 
        confetti.style.height = (Math.random() * 15 + 8) + 'px'; 
        
        const fallDuration = Math.random() * 3 + 2; 
        const fallDelay = Math.random() * 2; 
        
        confetti.style.animation = `confettiFall ${fallDuration}s linear ${fallDelay}s forwards`;

        const keyframes = `
            @keyframes confettiFall {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(${Math.random() * 720}deg); opacity: 0; }
            }
        `;
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = keyframes;
        document.head.appendChild(styleSheet);

        container.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, (fallDuration + fallDelay) * 1000);
    }
}

function partyHorns() {
    const leftHorn = document.createElement('div');
    leftHorn.innerHTML = '🎉';
    leftHorn.style = 'position:fixed; left: 20px; bottom: 20px; font-size: 3rem; z-index:10000; animation: hornBlastLeft 1s ease-out forwards; pointer-events: none;';
    
    const rightHorn = document.createElement('div');
    rightHorn.innerHTML = '🎉';
    rightHorn.style = 'position:fixed; right: 20px; bottom: 20px; font-size: 3rem; z-index:10000; animation: hornBlastRight 1s ease-out forwards; pointer-events: none;';

    const keyframes = `
        @keyframes hornBlastLeft {
            0% { transform: scale(0) rotate(0); opacity: 1; }
            50% { transform: scale(2) rotate(-30deg); opacity: 1; }
            100% { transform: scale(1.5) rotate(-20deg) translateY(-100px); opacity: 0; }
        }
        @keyframes hornBlastRight {
            0% { transform: scale(0) rotate(0); opacity: 1; }
            50% { transform: scale(2) rotate(30deg); opacity: 1; }
            100% { transform: scale(1.5) rotate(20deg) translateY(-100px); opacity: 0; }
        }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);

    document.body.appendChild(leftHorn);
    document.body.appendChild(rightHorn);

    setTimeout(() => {
        leftHorn.remove();
        rightHorn.remove();
    }, 1000);
}
