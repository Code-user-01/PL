/********** CONTENEDOR DE CARGA **********/

document.addEventListener('DOMContentLoaded', function() {
    const loadingContainer = document.getElementById('loading-container');
    console.log('Contenedor de carga mostrado.');

    // Mostrar el contenedor de carga por al menos 2 segundos
    setTimeout(function() {
        if (document.readyState === 'complete') {
            loadingContainer.style.display = 'none';
            console.log('Documento listo, contenedor de carga oculto.');
        } else {
            window.addEventListener('load', function() {
                loadingContainer.style.display = 'none';
                console.log('Ventana cargada, contenedor de carga oculto.');
            });
        }
    }, 1500);
});


document.addEventListener('DOMContentLoaded', function() {
    /********** MENÚ RESPONSIVO **********/
    document.getElementById('menu-toggle').addEventListener('click', function() {
        document.querySelector('nav ul').classList.toggle('show');
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            document.querySelector('nav ul').classList.remove('show');
        }
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = document.querySelector('nav').contains(event.target);
        const isMenuToggle = event.target.id === 'menu-toggle';
        if (!isClickInsideMenu && !isMenuToggle) {
            document.querySelector('nav ul').classList.remove('show');
        }
    });

    // Cerrar menú al seleccionar una sección y desplazarse suavemente
    document.querySelectorAll('nav ul li a').forEach(function(menuItem) {
        menuItem.addEventListener('click', function(event) {
            const target = event.target;
            if (target.matches('.modo') || target.matches('.idioma')) {
                return;
            }

            const sectionId = target.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);

            if (section) {
                event.preventDefault();
                const yOffset = -70; // Ajuste de desplazamiento para dejar espacio para el título
                const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({ top: y, behavior: 'smooth' });
                document.querySelector('nav ul').classList.remove('show');
            }
        });
    });
});



/********** PROYECTOS **********/
document.addEventListener('DOMContentLoaded', function() {
    const projects = document.querySelectorAll('#projects .project');
    projects.forEach(project => {
        project.addEventListener('click', function() {
            const info = this.querySelector('.project-info');
            info.style.display = info.style.display === 'flex' ? 'none' : 'flex';
        });
    });
});

/********** CONTACTO **********/
// Inicializa EmailJS con tu Public Key
emailjs.init("144pCfJfQBqZ6_aUE");

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const serviceID = "service_pyq0naa"; // Tu Service ID
    const templateID = "template_s97q7kb"; // Tu Template ID

    emailjs.sendForm(serviceID, templateID, this).then(
        function(response) {
            alert("Mensaje enviado correctamente!");
            document.getElementById("contact-form").reset();
        },
        function(error) {
            alert("Error al enviar el mensaje: " + JSON.stringify(error));
        }
    );
});

/********** FORMACIÓN **********/
const gallery = document.querySelector('.gallery');
let isDown = false;
let startX;
let scrollLeft;
let currentIndex = 0;

function updateGalleryPosition() {
    gallery.style.transform = `translateX(-${currentIndex * 100}%)`;
}

gallery.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDown = true;
    startX = e.pageX;
    gallery.style.cursor = 'grabbing';
});

gallery.addEventListener('mouseleave', () => {
    isDown = false;
    gallery.style.cursor = 'grab';
});

gallery.addEventListener('mouseup', (e) => {
    isDown = false;
    const moveX = e.pageX - startX;
    if (moveX > 50 && currentIndex > 0) {
        currentIndex--;
    } else if (moveX < -50 && currentIndex < gallery.children.length - 1) {
        currentIndex++;
    }
    updateGalleryPosition();
    gallery.style.cursor = 'grab';
});

gallery.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * -1;
    gallery.style.transform = `translateX(${scrollLeft - walk}px)`;
});

gallery.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
    scrollLeft = gallery.scrollLeft;
});

gallery.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const x = e.touches[0].pageX;
    const walk = (x - startX) * -1;
    gallery.style.transform = `translateX(${scrollLeft - walk}px)`;
});

gallery.addEventListener('touchend', (e) => {
    const moveX = e.changedTouches[0].pageX - startX;
    if (moveX > 50 && currentIndex > 0) {
        currentIndex--;
    } else if (moveX < -50 && currentIndex < gallery.children.length - 1) {
        currentIndex++;
    }
    updateGalleryPosition();
});

/********** IDIOMAS Y BANDERAS **********/
const flags = ['flag-icon-es', 'flag-icon-us', 'flag-icon-fr', 'flag-icon-th'];
let currentFlagIndex = 0;
const languages = ['es', 'en', 'fr', 'th'];

document.getElementById('flag').addEventListener('click', () => {
    currentFlagIndex = (currentFlagIndex + 1) % flags.length;
    document.getElementById('flag').className = 'flag-icon ' + flags[currentFlagIndex];
    loadLanguage(languages[currentFlagIndex]);
});

async function loadLanguage(lang) {
    try {
        const response = await fetch('js/translations.json');
        const translations = await response.json();
        const texts = translations[lang];

        // Header
        document.querySelector('header h1').textContent = texts.header.title || '';
        document.querySelector('nav ul li a[href="#about"]').textContent = texts.header.nav.about || '';
        document.querySelector('nav ul li a[href="#skills"]').textContent = texts.header.nav.skills || '';
        document.querySelector('nav ul li a[href="#projects"]').textContent = texts.header.nav.projects || '';
        document.querySelector('nav ul li a[href="#services"]').textContent = texts.header.nav.services || '';
        document.querySelector('nav ul li a[href="#contact"]').textContent = texts.header.nav.contact || '';
        document.querySelector('nav ul li a[href="#references"]').textContent = texts.header.nav.references || '';
        document.querySelector('nav ul li a[href="#education"]').textContent = texts.header.nav.education || '';

        // About Section
        document.querySelector('#about h2').innerHTML = `<i class="fas fa-user"></i> ${texts.about.title || ''}`;
        document.querySelector('#about .about-content p').textContent = texts.about.text || '';

      // Skills Section
    document.querySelector('#skills h2').innerHTML = `<i class="fas fa-laptop-code"></i> ${texts.skills.title || ''}`;
    const skillsCategories = texts.skills.categories;
    const skillsItems = texts.skills.items;
    document.querySelector('#skills ul li:nth-child(1)').innerHTML = `${skillsCategories.languages || ''}: ${skillsItems.languages || ''}`;
    document.querySelector('#skills ul li:nth-child(2)').innerHTML = `${skillsCategories.certifications || ''}: ${skillsItems.certifications || ''}`;
    document.querySelector('#skills ul li:nth-child(3)').innerHTML = `${skillsCategories.tools || ''}: ${skillsItems.tools || ''}`;
    document.querySelector('#skills ul li:nth-child(4)').innerHTML = `${skillsCategories.softSkills || ''}: ${skillsItems.softSkills.join(', ') || ''}`;
    document.querySelector('#skills ul li:nth-child(5)').innerHTML = `${skillsCategories.improving || ''}: ${skillsItems.improving || ''}`;
        // Proyectos
        document.querySelector('#projects h2').innerHTML = `<i class="fas fa-project-diagram"></i> ${texts.projects.title || ''}`;
        const projectItems = texts.projects.items;
        document.querySelectorAll('#projects ul li').forEach((projectElement, index) => {
            const project = projectItems[index] || {};
            projectElement.querySelector('h3').textContent = project.title || '';
            projectElement.querySelector('p:nth-child(2)').textContent = `${texts.projects.technologies || ''}: ${project.technologies || ''}`;
            projectElement.querySelector('p:nth-child(3)').textContent = project.description || '';
            projectElement.querySelector('a').textContent = project.preview || '';
        });

        // Services Section
        document.querySelector('#services h2').innerHTML = `<i class="fas fa-concierge-bell"></i> ${texts.services.title || ''}`;
        const servicesItems = texts.services.items;
        document.querySelector('#services ul li:nth-child(1) h3').textContent = servicesItems[0].title || '';
        document.querySelector('#services ul li:nth-child(1) p').textContent = servicesItems[0].description || '';
        document.querySelector('#services ul li:nth-child(2) h3').textContent = servicesItems[1].title || '';
        document.querySelector('#services ul li:nth-child(2) p').textContent = servicesItems[1].description || '';
        document.querySelector('#services ul li:nth-child(3) h3').textContent = servicesItems[2].title || '';
        document.querySelector('#services ul li:nth-child(3) p').textContent = servicesItems[2].description || '';
        document.querySelector('#services ul li:nth-child(4) h3').textContent = servicesItems[3].title || '';
        document.querySelector('#services ul li:nth-child(4) p').textContent = servicesItems[3].description || '';
       

        // Contact Section
        document.querySelector('#contact h2').innerHTML = `<i class="fas fa-envelope"></i> ${texts.contact.title || ''}`;
        document.querySelector('#contact p:nth-child(2)').textContent = texts.contact.description || '';
        document.querySelector('#contact-form label[for="name"]').textContent = texts.contact.form.name || '';
        document.querySelector('#contact-form label[for="email"]').textContent = texts.contact.form.email || '';
        document.querySelector('#contact-form label[for="message"]').textContent = texts.contact.form.message || '';
        document.querySelector('#contact-form button').textContent = texts.contact.form.button || '';
        document.querySelector('.contact-hours').textContent = texts.contact.hours || '';

        // References Section
        document.querySelector('#references h2').innerHTML = `<i class="fas fa-star"></i> ${texts.references.title || ''}`;
        const referencesItems = texts.references.items;
        document.querySelectorAll('#references ul li').forEach((referenceElement, index) => {
            const reference = referencesItems[index] || {};
            referenceElement.querySelector('h3').textContent = reference.name || '';
            referenceElement.querySelector('p').textContent = reference.description || '';
        });

        // Education Section
        document.querySelector('#education h2').innerHTML = `<i class="fas fa-graduation-cap"></i> ${texts.education.title || ''}`;
        document.querySelector('#education p:nth-child(2)').textContent = texts.education.description || '';
        document.querySelector('#education ul li:nth-child(1)').textContent = texts.education.items[0] || '';
        document.querySelector('#education ul li:nth-child(2)').textContent = texts.education.items[1] || '';
        document.querySelector('#education ul li:nth-child(3)').textContent = texts.education.items[2] || '';
        document.querySelector('#education p:nth-child(4)').textContent = texts.education.additionalInfo || '';
        document.querySelector('#education p:nth-child(5)').textContent = texts.education.quote || '';
        document.querySelector('#education h3').textContent = texts.education.certificates.title || '';

        // Footer
        document.querySelector('footer p').textContent = texts.footer.text || '';
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Cargar el idioma por defecto (español)
loadLanguage('es');


/********** MODO OSCURO/CLARO **********/
document.getElementById('theme-icon').addEventListener('click', function () {
    var icon = document.getElementById('theme-icon');
    var body = document.body;

    // Alternar entre iconos y temas al hacer clic
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-sun', 'fa-moon');
        body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        icon.classList.replace('fa-moon', 'fa-sun');
        body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark');
    }
});

// Al cargar la página, aplicar el tema guardado en localStorage o por defecto el modo oscuro
document.addEventListener('DOMContentLoaded', function () {
    var theme = localStorage.getItem('theme') || 'dark'; // Por defecto 'dark'
    var icon = document.getElementById('theme-icon');
    var body = document.body;

    if (theme === 'dark') {
        icon.classList.add('fa-sun');
        icon.classList.remove('fa-moon');
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    } else {
        icon.classList.add('fa-moon');
        icon.classList.remove('fa-sun');
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    }
});

/********** ACCESIBILIDAD **********/
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
});

/********** FORZAR CARGA EN "ACERCA DE MI" **********/
window.onload = function() {
    document.getElementById('about').scrollIntoView(true);
};


document.getElementById('backToTop').addEventListener('click', function() {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});
