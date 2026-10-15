console.log("Скрипт подключен");

const options = {
    threshold: 0.15,                    // сколько процентов элемента должно быть видно (0–1)
    rootMargin: "0px 0px -50px 0px"    // сдвиг границ области видимости
};

const Observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const el = entry.target;

            if (el.classList.contains("stagger-item")) {
                const parent = el.parentElement;
                const items = parent.querySelectorAll(".stagger-item");

                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add("animate");
                    }, index * 180);
                });
                items.forEach((item) => Observer.unobserve(item));
            } else {
                el.classList.add("animate")
                Observer.unobserve(el);
            }
        }

    });
}, options);

const elements = document.querySelectorAll(".animate-on-scroll, .slide-left, .slide-right, .fade-in, .stagger-item");

elements.forEach((el) => {
    Observer.observe(el);
});

const progressBar = document.querySelector(".scroll-progress");
window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const percent = (scrolled / height) * 100;
    progressBar.style.width = percent + "%";
});

const header = document.querySelector("header")
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        header.style.background = "rgba(10, 10, 10, 0.98)";

    } else {
        header.style.background = "rgba(10, 10, 10, 0.9)";
    }
});
const links = document.querySelectorAll('.a[href^="#"]');

links.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();                 // браузер не прыгает сам
        const id = link.getAttribute("href");
        const section = document.querySelector(id);

        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }

        console.log("Клик по ссылке на", id);
    });
});

const particles = document.querySelector(".particles");
for (let i = 0; i < 50; i++) {
    const particle = document.createElement("particles");
    particle.classList.add("particle");
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 15 + "s";
    particle.style.animationDuration = (8 + Math.random() * 20) + "s";
    particles.appendChild(particle);
}

function animateCounter(element) {
    const original = element.textContent;
    const target = parseFloat(original) || 0;
    let current = 0;
    const step = target / 60;

    const timer = sertInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = original;
            clearInterval(timer);

        }else {
        element.textContent = Math.floor(current)
        
    }
    }, 30)
}
const stats = document.querySelector(".stats");
const statsObserver = new IntersectionObserver ((entries) => {
    if (entries[0].Intersecting) {
        document.query.Selectorall(".stat-number").forEach((num) => {
            animateCounter(num);
        });
        statsObserver.unobserve(stats);
    }
})
statsObserver.observe(stats);

