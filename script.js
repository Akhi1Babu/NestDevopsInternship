document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');

            // Animate hamburger icon
            const bars = mobileMenuToggle.querySelectorAll('.bar');
            // Check if active class is present to toggle animation state (simple version)
            // You can add more complex animations via CSS or JS here
        });
    }

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        });
    });

    // Contact Form Submission Handler (AJAX)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        submitBtn.textContent = 'Message Sent!';
                        submitBtn.style.backgroundColor = '#10b981'; // Green color
                        contactForm.reset();
                    } else {
                        response.json().then(data => {
                            if (Object.hasOwn(data, 'errors')) {
                                alert(data["errors"].map(error => error["message"]).join(", "));
                            } else {
                                submitBtn.textContent = 'Error!';
                                submitBtn.style.backgroundColor = '#ef4444'; // Red color
                            }
                        })
                    }
                })
                .catch(error => {
                    submitBtn.textContent = 'Error!';
                    submitBtn.style.backgroundColor = '#ef4444'; // Red color
                    console.error('Error:', error);
                })
                .finally(() => {
                    // Reset button after delay
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.backgroundColor = ''; // Reset to CSS default (or gradient)
                        // Note: If you rely on the CSS gradient, setting '' usually removes inline style, falling back to CSS.
                        // But if your CSS was overwritten significantly, just ensure style.css handles the .btn-primary state.
                        submitBtn.disabled = false;
                    }, 3000);
                });
        });
    }

    // Smooth scroll for anchor links (safeguard for older browsers if CSS scroll-behavior fails)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
