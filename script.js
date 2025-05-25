document.addEventListener('DOMContentLoaded', function() {
    // Initialize Slideshow
    const initSlideshow = () => {
        const slides = document.querySelectorAll('.slide');
        if (slides.length > 0) {
            let currentSlide = 0;
            slides[currentSlide].classList.add('active');
            
            const nextSlide = () => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            };
            
            setInterval(nextSlide, 5000);
        }
    };

    // Smooth Scrolling
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Header Scroll Effect
    const initHeaderScroll = () => {
        const header = document.querySelector('header');
        if (header) {
            window.addEventListener('scroll', function() {
                header.classList.toggle('scrolled', window.scrollY > 50);
            });
        }
    };

    // Mobile Menu Toggle
    const initMobileMenu = () => {
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                document.querySelector('nav').classList.toggle('active');
                this.querySelector('i').classList.toggle('fa-times');
                this.querySelector('i').classList.toggle('fa-bars');
            });
        }
    };

    // Form Handling
    const initForm = () => {
        const form = document.getElementById('form-contato');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const submitButton = form.querySelector('button');
                
                // Show loading state
                submitButton.classList.add('loading');
                submitButton.disabled = true;
                
                // FormSubmit handling
                fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        const nextPage = form.querySelector('[name="_next"]').value;
                        if (nextPage) {
                            window.location.href = nextPage;
                        } else {
                            alert('Mensagem enviada com sucesso!');
                            form.reset();
                        }
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Ocorreu um erro. Por favor, tente novamente.');
                })
                .finally(() => {
                    submitButton.classList.remove('loading');
                    submitButton.disabled = false;
                });
            });
        }
    };

    // Animate Elements on Scroll
    const initAnimations = () => {
        const fadeElements = document.querySelectorAll('.about-content, .service-card, .contact-content');
        
        const fadeInOnScroll = function() {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                if (elementTop < window.innerHeight - 150) {
                    element.style.opacity = "1";
                    element.style.transform = "translateY(0)";
                }
            });
        };
        
        fadeElements.forEach(element => {
            element.style.opacity = "0";
            element.style.transform = "translateY(20px)";
            element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        });
        
        fadeInOnScroll();
        window.addEventListener('scroll', fadeInOnScroll);
    };

    // Initialize all components
    initSlideshow();
    initSmoothScroll();
    initHeaderScroll();
    initMobileMenu();
    initForm();
    initAnimations();
});

// Service Booking Function
function agendarServico(servico) {
    const mensagem = `Olá, vim pelo site. Gostaria de agendar uma massagem *${servico}*. Poderia me informar sobre horários disponíveis?`;
    window.open(`https://wa.me/5581986688718?text=${encodeURIComponent(mensagem)}`, '_blank');
}