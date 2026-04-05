document.addEventListener("DOMContentLoaded", () => {
    // تأثير الكتابة
    const textArray = ["تصميم احترافي 🎨", "تصوير يبيع 📸", "إعلانات بذكاء 💰", "خطة مدروسة 🧠"];
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

    // المنيو
    const mobileMenu = document.getElementById("mobile-menu");
    const navList = document.querySelector(".nav-list");
    const menuText = document.querySelector(".menu-text");

    if (mobileMenu) {
        mobileMenu.onclick = () => {
            navList.classList.toggle("active");
            if (menuText) {
                menuText.textContent = navList.classList.contains("active") ? "إغلاق" : "القائمة";
            }
        };
    }

    // إغلاق المنيو عند اختيار خدمة
    document.querySelectorAll(".nav-list a").forEach(link => {
        link.onclick = () => {
            navList.classList.remove("active");
            if(menuText) menuText.textContent = "القائمة";
        };
    });
});