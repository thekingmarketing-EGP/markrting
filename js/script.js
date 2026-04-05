document.addEventListener("DOMContentLoaded", () => {
    // 1. تأثير الكتابة
    const textArray = [
        "تصميم احترافي يخطف العين 🎨",
        "تصوير يبيع المنتج قبل ما يتكلم 📸",
        "تمويل وإدارة إعلانات بذكاء 💰",
        "حملات واتساب توصل لعميلك 📲",
        "خطة محتوى مدروسة مش عشوائية 🧠"
    ];

    const typingTextElement = document.querySelector(".typing-text");
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typingTextElement) return;
        const currentText = textArray[textIndex];
        typingTextElement.textContent = isDeleting 
            ? currentText.substring(0, charIndex - 1) 
            : currentText.substring(0, charIndex + 1);

        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

        let typeSpeed = isDeleting ? 40 : 80;
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500;
        }
        setTimeout(typeEffect, typeSpeed);
    }
    setTimeout(typeEffect, 1000);

    // 2. التحكم في القائمة الجانبية (الأهم لمشكلة الصورة)
    const mobileMenu = document.getElementById("mobile-menu");
    const navList = document.querySelector(".nav-list");
    const menuText = document.querySelector(".menu-text");

    if (mobileMenu) {
        mobileMenu.onclick = () => {
            navList.classList.toggle("active");
            
            // تغيير شكل الزر والنص
            if (navList.classList.contains("active")) {
                menuText.textContent = "إغلاق";
                mobileMenu.style.opacity = "0.8";
            } else {
                menuText.textContent = "القائمة";
                mobileMenu.style.opacity = "1";
            }
        };
    }

    // قفل المنيو لو دوسنا على أي رابط (عشان الموقع ما يهنقش)
    document.querySelectorAll(".nav-list a").forEach(link => {
        link.onclick = () => {
            navList.classList.remove("active");
            menuText.textContent = "القائمة";
        };
    });
});