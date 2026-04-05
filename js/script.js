document.addEventListener("DOMContentLoaded", () => {
    // 1. تأثير الكتابة التلقائي
    const textArray = [
        "تصميم احترافي يخطف العين 🎨",
        "تصوير يبيع المنتج قبل ما يتكلم 📸",
        "تمويل وإدارة إعلانات بذكاء 💰",
        "حملات واتساب توصل لعميلك 📲",
        "خطة محتوى مدروسة مش عشوائية 🧠",
        "تحليل مستمر علشان نكبر الصح 📊",
        "دراسة سوق تخليك سابق المنافسين 📈"
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

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // وقت الانتظار بعد اكتمال الجملة
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500;
        }
        setTimeout(typeEffect, typeSpeed);
    }

    // تشغيل تأثير الكتابة
    setTimeout(typeEffect, 1000);

    // 2. التحكم في القائمة الجانبية (Mobile Menu)
    const mobileMenu = document.getElementById("mobile-menu");
    const navList = document.querySelector(".nav-list");
    const menuText = document.querySelector(".menu-text");

    if (mobileMenu) {
        mobileMenu.onclick = () => {
            navList.classList.toggle("active");
            mobileMenu.classList.toggle("active");
            
            // تغيير النص الإرشادي عند الضغط
            if (navList.classList.contains("active")) {
                menuText.textContent = "إغلاق";
            } else {
                menuText.textContent = "القائمة";
            }
        };
    }
});
