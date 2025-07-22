// Hamburger menu functionality
const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLinks');
if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('active');
    });
    // Close menu on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('active');
        });
    });
}
// Smooth scroll for nav links
navLinks && navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Real-time phone validation: alert if non-numeric or not 10 digits (if not empty)
const phoneInput = document.getElementById("phone");
if (phoneInput) {
  phoneInput.addEventListener("input", function() {
    const value = this.value;
    if (value && (/[^0-9]/.test(value) || value.length > 10)) {
      alert("❌ Please enter only numbers and ensure the phone number is 10 digits.");
    }
  });
}

  document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const phonePattern = /^[0-9]{10}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const form = document.getElementById("contactForm");
  const thankYou = document.getElementById("thankYouMessage");
  const submitBtn = form.querySelector("button");

  if (!phonePattern.test(phone)) {
    alert("❌ Please enter a valid 10-digit phone number.");
  } else if (!emailPattern.test(email)) {
    alert("❌ Please enter a valid email address.");
  } else {
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    fetch("https://script.google.com/macros/s/AKfycbwfXwnPwVvw3uN4fs4MLBAwJqw5RrCFJ9j4orGnkhg1W9EpXRqbdXkzZO-FobzXZkoqfA/exec", {
      method: "POST",
      body: new FormData(form)
    })
    .then(response => response.text())
    .then(data => {
      if (data.toLowerCase().includes("success")) {
        form.style.display = "none";
        thankYou.style.display = "block";
        form.reset();
      } else {
        alert("❌ Failed to submit form. Please try again.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("❌ Submission error occurred.");
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    });
  }
});
