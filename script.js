const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

document.querySelectorAll("[data-scroll]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll("[data-demo]").forEach(control => {
  control.addEventListener("click", event => {
    event.preventDefault();
    showToast(`${control.dataset.demo}. Демонстрационный раздел.`);
  });
});

const registrationForm = document.querySelector("#registrationForm");
if (registrationForm) {
  registrationForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!registrationForm.reportValidity()) return;
    const formData = new FormData(registrationForm);
    const firstName = String(formData.get("firstName") || "").trim();
    document.querySelector("#formMessage").textContent =
      `Спасибо, ${firstName}! Форма заполнена. Отправка данных на сервер не выполняется.`;
    registrationForm.reset();
  });
}

const markAllRead = document.querySelector("#markAllRead");
if (markAllRead) {
  markAllRead.addEventListener("click", () => {
    document.querySelectorAll(".notification.unread").forEach(item => item.classList.remove("unread"));
    markAllRead.textContent = "Все уведомления прочитаны";
    document.querySelector(".notification-dot")?.remove();
    showToast("Уведомления отмечены как прочитанные.");
  });
}

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  sections.forEach(section => observer.observe(section));
}