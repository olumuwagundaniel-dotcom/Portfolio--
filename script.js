const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const progress = document.getElementById("progress");

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

function updateProgress(){
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = percent + "%";
}
window.addEventListener("scroll", updateProgress, {passive:true});
updateProgress();

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("feedbackForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(
    `Hello Daniel,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent from your portfolio website.`
  );
  const note = document.getElementById("formNote");
  note.textContent = "Opening your email app…";
  window.location.href = `mailto:olumuwagundaniel@gmail.com?subject=${subject}&body=${body}`;
});
