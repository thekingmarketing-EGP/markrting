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
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typingTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

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

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeEffect, 1000);
});