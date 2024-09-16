// Función para obtener el valor de una cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Función para establecer una cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/`;
}

// Función para mostrar el aviso de cookies con estilo de tarjeta
function showCookieBanner() {
    const overlay = document.createElement('div');
    overlay.id = "cookie-overlay";
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '10000';
    document.body.appendChild(overlay);

    const banner = document.createElement('div');
    banner.id = "cookie-banner";
    banner.style.backgroundColor = '#fff';
    banner.style.color = '#333';
    banner.style.width = '90%';
    banner.style.maxWidth = '400px';
    banner.style.borderRadius = '8px';
    banner.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    banner.style.padding = '20px';
    banner.style.textAlign = 'center';
    banner.style.fontFamily = 'Arial, sans-serif';
    banner.innerHTML = `
        <h2 style="margin-bottom: 20px; font-size: 1.5rem; color: #333;">Este sitio utiliza cookies</h2>
        <p style="margin-bottom: 20px; font-size: 1rem; line-height: 1.5;">Utilizamos cookies para mejorar tu experiencia. 
        Al continuar navegando, aceptas nuestro uso de cookies. 
        <a href="/privacy-policy.html" style="color: #007bff; text-decoration: underline;">Política de Privacidad</a> | 
        <a href="/cookies-policy.html" style="color: #007bff; text-decoration: underline;">Política de Cookies</a>
        </p>
        <button onclick="acceptCookies()" style="padding: 10px 20px; margin: 10px; border: none; background-color: #28a745; color: #fff; font-size: 16px; cursor: pointer; border-radius: 5px;">Aceptar</button>
        <button onclick="rejectCookies()" style="padding: 10px 20px; margin: 10px; border: none; background-color: #dc3545; color: #fff; font-size: 16px; cursor: pointer; border-radius: 5px;">Rechazar</button>
    `;
    overlay.appendChild(banner);
    document.body.style.overflow = 'hidden'; // Evita el scroll de la página
}

// Función para aceptar cookies
function acceptCookies() {
    setCookie('cookieConsent', 'accepted', 365);
    document.getElementById('cookie-overlay').remove();
    document.body.style.overflow = ''; // Restaura el scroll
    initializeCookies(); // Inicializar las cookies al aceptar
}

// Función para rechazar cookies
function rejectCookies() {
    setCookie('cookieConsent', 'rejected', 365);
    window.location.href = "https://www.google.com"; // Redirige al usuario a Google si no acepta cookies
}

// Función para bloquear acceso si se rechazaron las cookies
function blockAccessIfRejected() {
    if (getCookie('cookieConsent') === 'rejected') {
        showCookieBanner(); // Muestra el banner de cookies nuevamente
    }
}

// Función para inicializar las cookies necesarias
function initializeCookies() {
    if (getCookie('cookieConsent') === 'accepted') {
        // Cookie de preferencias de usuario
        setCookie('language', 'es', 365);
        setCookie('theme', 'dark', 365);

        // Cookie de autenticación (ejemplo)
        setCookie('session_id', 'abc123', 1); // Sesión de 1 día

        // Cookie de carrito de compras (ejemplo)
        setCookie('cart_items', 'item1,item2,item3', 1); // Caduca en 1 día

        // Cookie de análisis propio (ejemplo)
        setCookie('analytics_id', 'unique_user_id', 730); // Caduca en 2 años

        // Cookie de funcionalidades específicas (ejemplo)
        setCookie('form_progress', 'step2', 1); // Caduca en 1 hora
    }
}

// Inicializar el script de cookies al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    const consent = getCookie('cookieConsent');
    
    if (!consent) {
        showCookieBanner();
    } else if (consent === 'accepted') {
        initializeCookies();
    } else if (consent === 'rejected') {
        blockAccessIfRejected(); // Bloquea acceso si se rechazaron las cookies
    }
});
