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

const feedbackForm = document.getElementById("feedbackForm");

feedbackForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const note = document.getElementById("formNote");
  const submitButton = form.querySelector('button[type="submit"]');

  const formData = {
    name: form.elements["name"].value.trim(),
    email: form.elements["email"].value.trim(),
    message: form.elements["message"].value.trim(),
    _subject: "New portfolio message",
    _template: "table",
    _captcha: "false"
  };

  note.textContent = "Sending your message…";
  submitButton.disabled = true;

  try {
    const response = await fetch("https://formsubmit.co/ajax/olumuwagundaniel@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      note.textContent = "Thanks! Your message has been submitted. If this is your first time using the form, check your inbox to activate email delivery.";
      form.reset();
    } else {
      throw new Error(result.message || "The message could not be sent.");
    }
  } catch (error) {
    note.textContent = "Sorry, the message could not be sent right now. Please email me directly at olumuwagundaniel@gmail.com.";
  } finally {
    submitButton.disabled = false;
  }
});
