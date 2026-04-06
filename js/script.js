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
    setTimeout(typeEffect, 1000);

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
});
