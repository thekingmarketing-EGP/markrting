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
// === دوال قسم السوشيال ميديا الجديد (نافذة الفيس بوك) ===
// === دوال قسم السوشيال ميديا الجديد (نافذة الفيس بوك الديناميكية) ===
function openProjectModal(folderName, displayName) {
    const modal = document.getElementById('fb-project-modal');
    const titleElement = document.getElementById('modal-project-title');
    
    // استدعاء عناصر الصور من جوه النافذة المنبثقة
    const coverImg = document.querySelector('.fb-cover-photo img');
    const logoImg = document.querySelector('.fb-profile-logo img');
    const post1 = document.querySelector('.fb-portfolio-gallery .fb-work-item:nth-child(1) img');
    const post2 = document.querySelector('.fb-portfolio-gallery .fb-work-item:nth-child(2) img');
    const post3 = document.querySelector('.fb-portfolio-gallery .fb-work-item:nth-child(3) img');
    const post4 = document.querySelector('.fb-portfolio-gallery .fb-work-item:nth-child(4) img');

    if (modal && titleElement) {
        // تغيير الاسم
        titleElement.textContent = displayName;
        
        // تغيير مسارات الصور أوتوماتيك بناءً على اسم الفولدر
        coverImg.src = `../social media/${folderName}/caver1.jpg`;
        logoImg.src = `../social media/${folderName}/logo1.png`;
        post1.src = `../social media/${folderName}/d1.jpg`;
        post2.src = `../social media/${folderName}/d2.jpg`;
        post3.src = `../social media/${folderName}/d3.jpg`;
        post4.src = `../social media/${folderName}/d4.jpg`;

        // إظهار النافذة
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    }
}

function closeProjectModal() {
    const modal = document.getElementById('fb-project-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }
}

// قفل النافذة عند الضغط خارجها
window.addEventListener('click', function(event) {
    const modal = document.getElementById('fb-project-modal');
    if (event.target === modal) {
        closeProjectModal();
    }
});
// === دوال قسم الباقات الجديد المتفاعل (تفتيح قائمة الشرح) ===
// دالة لتفعيل الشرح عند الوقوف على السطر li
const featureItems = document.querySelectorAll('.package-features li');

featureItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.classList.add('show-desc');
    });
    
    item.addEventListener('mouseleave', function() {
        this.classList.remove('show-desc');
    });
});

// دالة لتطبيق الأنميشن الذي يركز الكاميرا Spotlight على الباقات بالأولويات المطلوبة
// (PRO MAX: 40%, KING: 30%, BOOM: 20%, START: 10%)
const packageCards = document.querySelectorAll('.pricing-card');

// ترتيب الباقات المطلوب للأولوية
const packagePriority = ['promax', 'king', 'boom', 'start'];

function activateSpotlightCycle() {
    packagePriority.forEach((packageName, index) => {
        const card = document.querySelector(`.pricing-card[data-package="${packageName}"]`);
        
        // حساب التأخير بناءً على النسبة المطلوبة للأولوية
        // (40/30/20/10) - سيتم تفعيل الباقة التالية بعد التأخير المحدد
        let delay;
        if (packageName === 'promax') delay = 0; // أول باقة تظهر (40%)
        else if (packageName === 'king') delay = 4000; // تظهر بعد أول باقة (30%)
        else if (packageName === 'boom') delay = 7000; // تظهر بعد ثاني باقة (20%)
        else if (packageName === 'start') delay = 9000; // تظهر بعد ثالث باقة (10%)
        
        // تفعيل الأنميشن Spotlight بالكاميرا على الباقة بعد التأخير
        setTimeout(() => {
            // إزالة التأثير من كل الباقات الأخرى
            packageCards.forEach(c => c.classList.remove('spotlight-active'));
            // تطبيق التأثير على الباقة المطلوبة
            if (card) {
                card.classList.add('spotlight-active');
            }
        }, delay);
        
        // إزالة التأثير من آخر باقة بعد النسبة الـ 10%
        if (index === packagePriority.length - 1) {
            setTimeout(() => {
                packageCards.forEach(c => c.classList.remove('spotlight-active'));
            }, 10000); // 9000 (بدء آخر باقة) + 1000 (مدة الـ 10%) = 10000
        }
    });
}

// تفعيل الدورة Spotlight عند تحميل الصفحة مرة واحدة
window.addEventListener('load', activateSpotlightCycle);

// === دوال قسم البروشور التفاعلي (3D Flipbook) ===
document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll('.flip-book .page');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const book = document.getElementById('interactive-book');
    
    let currentPage = 0; // رقم الورقة الحالية اللي ظاهرة

    // دالة تقليب الورقة للأمام (تفتح الصفحة)
    function flipNext() {
        if (currentPage < pages.length - 1) {
            pages[currentPage].classList.add('flipped');
            currentPage++;
        }
    }

    // دالة إرجاع الورقة للخلف (تقفل الصفحة)
    function flipPrev() {
        if (currentPage > 0) {
            currentPage--;
            pages[currentPage].classList.remove('flipped');
        }
    }

    // تشغيل الأزرار
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', flipNext);
        prevBtn.addEventListener('click', flipPrev);
    }

    // === نظام السحب باللمس (Touch & Swipe) للموبايل والكمبيوتر ===
    let startX = 0;
    let isDragging = false;

    if (book) {
        // للموبايل
        book.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        book.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            let endX = e.changedTouches[0].clientX;
            handleSwipe(startX, endX);
            isDragging = false;
        });
        
        // للكمبيوتر (سحب بالماوس)
        book.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            isDragging = true;
            book.style.cursor = 'grabbing';
        });
        
        window.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            let endX = e.clientX;
            handleSwipe(startX, endX);
            isDragging = false;
            book.style.cursor = 'grab';
        });

        // منطق حساب اتجاه السحب
        function handleSwipe(start, end) {
            let threshold = 50; // مسافة السحب المطلوبة عشان يقلب
            // سحب لليمين (يعني بتمسك الورقة من الشمال وتسحبها يمين عشان تفتحها)
            if (end - start > threshold) {
                flipNext();
            } 
            // سحب لليسار (بترجع الورقة تاني)
            else if (start - end > threshold) {
                flipPrev();
            }
        }
    }
});

// === دوال قسم الاستيكرات (Bottle Mockup) ===
document.addEventListener("DOMContentLoaded", () => {
    // ⚠️ استبدلنا الصورة بـ container
    const stickerContainer = document.getElementById('sticker-container'); 
    const stickerImg = document.getElementById('current-sticker');
    const nextStickerBtn = document.getElementById('next-sticker');
    const prevStickerBtn = document.getElementById('prev-sticker');
    
    if (stickerImg && stickerContainer && nextStickerBtn && prevStickerBtn) {
        let currentStickerIndex = 1;
        const totalStickers = 10;

        function updateSticker(newIndex) {
            // ⚠️ الأنميشن على الـ Container
            stickerContainer.classList.add('fade-out');
            
            setTimeout(() => {
                stickerImg.src = `../img/استكرات/${newIndex}.jpg`; 
                currentStickerIndex = newIndex;
                
                stickerContainer.classList.remove('fade-out');
            }, 300); 
        }

        nextStickerBtn.addEventListener('click', () => {
            let nextIndex = currentStickerIndex < totalStickers ? currentStickerIndex + 1 : 1;
            updateSticker(nextIndex);
        });

        prevStickerBtn.addEventListener('click', () => {
            let prevIndex = currentStickerIndex > 1 ? currentStickerIndex - 1 : totalStickers;
            updateSticker(prevIndex);
        });
    }
});

// === دوال قسم المنيو التفاعلي ===
document.addEventListener("DOMContentLoaded", () => {
    const menuPages = document.querySelectorAll('#menu-interactive-book .page');
    const menuNextBtn = document.getElementById('menu-next-btn');
    const menuPrevBtn = document.getElementById('menu-prev-btn');
    const menuBook = document.getElementById('menu-interactive-book');
    
    if (menuBook && menuPages.length > 0) {
        let currentMenuPage = 0;

        function flipMenuNext() {
            if (currentMenuPage < menuPages.length - 1) {
                menuPages[currentMenuPage].classList.add('flipped');
                currentMenuPage++;
            }
        }

        function flipMenuPrev() {
            if (currentMenuPage > 0) {
                currentMenuPage--;
                menuPages[currentMenuPage].classList.remove('flipped');
            }
        }

        if (menuNextBtn && menuPrevBtn) {
            menuNextBtn.addEventListener('click', flipMenuNext);
            menuPrevBtn.addEventListener('click', flipMenuPrev);
        }

        // نظام السحب باللمس للمنيو (Touch & Swipe)
        let startXMenu = 0;
        let isDraggingMenu = false;

        menuBook.addEventListener('touchstart', (e) => {
            startXMenu = e.touches[0].clientX;
            isDraggingMenu = true;
        });

        menuBook.addEventListener('touchend', (e) => {
            if (!isDraggingMenu) return;
            let endXMenu = e.changedTouches[0].clientX;
            handleMenuSwipe(startXMenu, endXMenu);
            isDraggingMenu = false;
        });
        
        menuBook.addEventListener('mousedown', (e) => {
            startXMenu = e.clientX;
            isDraggingMenu = true;
            menuBook.style.cursor = 'grabbing';
        });
        
        window.addEventListener('mouseup', (e) => {
            if (!isDraggingMenu) return;
            let endXMenu = e.clientX;
            handleMenuSwipe(startXMenu, endXMenu);
            isDraggingMenu = false;
            menuBook.style.cursor = 'grab';
        });

        function handleMenuSwipe(start, end) {
            let threshold = 50;
            if (end - start > threshold) {
                flipMenuNext();
            } else if (start - end > threshold) {
                flipMenuPrev();
            }
        }
    }
});