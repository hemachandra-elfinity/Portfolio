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
// Contact form feedback


// const contactForm = document.getElementById('contactForm');
// const formMessage = document.getElementById('formMessage');
// if (contactForm && formMessage) {
//     contactForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         formMessage.textContent = 'Thank you for your message!';
//         contactForm.reset();
//         setTimeout(() => {
//             formMessage.textContent = '';
//         }, 4000);
//     });
// } 


  
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const responseMsg = document.getElementById("responseMsg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const params = new URLSearchParams(formData).toString();

    fetch("https://script.google.com/macros/s/AKfycbzqBgSFXJ4vaLPLhR4VEf6N-r-GMZXN0brWUlGNnUIDa47nkH0IMCpwoB0MmJ0hTv-_mg/exec", {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(res => res.text())
    .then(result => {
      console.log("Response:", result);
      if (result.trim() === "Success") {
        form.reset();
        responseMsg.style.display = "block";
        setTimeout(() => responseMsg.style.display = "none", 4000);
      } else {
        alert("Success");
      }
    })
    .catch(err => {
      console.error("Error:", err);
      alert("Error submitting form.");
    });
  });
});
  // Load data on page load
  fetchSheetData();

