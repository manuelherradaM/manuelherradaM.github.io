// $(document).ready(function () {
//     $(window).scroll(function () {
//         // checks if window is scrolled more than 500px, adds/removes solid class
//         if ($(this).scrollTop() > 500) {
//             $('.navbar').addClass('solid');
//             $('.back-to-top').addClass('visible');
//         } else {
//             $('.navbar').removeClass('solid');
//             $('.back-to-top').removeClass('visible');
//         }

//     });
// });


// $(document).ready(function () {
//     // Add smooth scrolling to all links
//     $("a").on('click', function (event) {

//         // Make sure this.hash has a value before overriding default behavior
//         if (this.hash !== "") {
//             // Prevent default anchor click behavior
//             event.preventDefault();

//             // Store hash
//             var hash = this.hash;

//             // Using jQuery's animate() method to add smooth page scroll
//             // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
//             $('html, body').animate({
//                 scrollTop: $(hash).offset().top
//             }, 800, function () {

//                 // Add hash (#) to URL when done scrolling (default click behavior)
//                 window.location.hash = hash;
//             });
//         } // End if
//     });
// });

// Función para el modo oscuro
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Verificar si hay una preferencia guardada
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', null);
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// Función para actualizar colores de partículas
function updateParticlesColors(isDark) {
    if (window.pJSDom && window.pJSDom[0]) {
        const particles = window.pJSDom[0].pJS.particles;
        
        if (isDark) {
            particles.color.value = ['#ffffff', '#00b894', '#0984e3'];
            particles.line_linked.color = '#ffffff';
        } else {
            particles.color.value = ['#2d3436', '#0984e3', '#00b894'];
            particles.line_linked.color = '#2d3436';
        }
        
        // Actualizar partículas
        window.pJSDom[0].pJS.fn.particlesRefresh();
    }
}

// Función para el scroll suave
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
document.getElementById("contact-me").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita la recarga de la página

    let formData = new FormData(this);

    try {
      let response = await fetch(this.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        new bootstrap.Modal(document.getElementById("confirmationModal")).show(); // Muestra el modal
        this.reset(); // Limpia el formulario después del envío
      } else {
        alert("Hubo un error al enviar el formulario. Inténtalo nuevamente.");
      }
    } catch (error) {
      alert("Error de conexión. Revisa tu internet e inténtalo de nuevo.");
    }
  });
// Función para validar el formulario
function initFormValidation() {
    const form = document.querySelector('#contact-me form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // Aquí puedes agregar el código para enviar el formulario
                form.submit();
            } else {
                alert('Por favor, completa todos los campos');
            }
        });
    }
}

// Agregar esta función al inicio del archivo
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Inicializar todas las funciones cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
    initSmoothScroll();
    initFormValidation();
    initNavbarScroll();
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#ffffff', '#00b894', '#0984e3']
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.6,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 3,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
});