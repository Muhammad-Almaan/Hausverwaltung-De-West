/* ============================================================
   DANIEL IMMOBILIEN – components.js
   Injects shared Nav + Footer into every page via JS.
   Each page calls initComponents() after DOM ready.
   ============================================================ */

function initComponents() {

  /* ── Detect path prefix for pages/ subfolder ── */
  const isSubPage = window.location.pathname.includes('/pages/');
  const root = isSubPage ? '../' : './';

  /* ──────────────────────────────────────────────
     NAV HTML
  ────────────────────────────────────────────── */
  const navHTML = `
  <nav class="nav" role="navigation" aria-label="Hauptnavigation">
    <div class="nav__inner">

      <!-- Logo: Daniel Immobilien -->
      <a href="${root}index.html" class="nav__logo" aria-label="Daniel Immobilien – Startseite">
        <div class="nav__logo-mark">
          <!-- House icon SVG -->
          <svg viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" aria-hidden="true">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
            <path d="M9 21V12h6v9"/>
          </svg>
        </div>
        <div class="nav__logo-text">
          <span class="nav__logo-name">Hausverwaltung de West</span>
          <span class="nav__logo-sub">Immowest</span>
        </div>
      </a>

      <!-- Desktop Nav Links -->
      <div class="nav__links" role="menubar">
        <!-- "About Us" -->
        <a href="${root}pages/about.html"    class="nav__link" role="menuitem">Über uns</a>
        <!-- "Services" -->
        <a href="${root}pages/services.html" class="nav__link" role="menuitem">Leistungen</a>
        <!-- "Contact" -->
        <a href="${root}pages/contact.html"  class="nav__link" role="menuitem">Kontakt</a>
      </div>

      <!-- Hamburger button (mobile) -->
      <button class="nav__burger" aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobile-nav">
        <span class="nav__burger-line"></span>
        <span class="nav__burger-line"></span>
        <span class="nav__burger-line"></span>
      </button>
    </div>

    <!-- Mobile dropdown menu -->
    <div class="nav__mobile" id="mobile-nav" aria-label="Mobile Navigation">
      <div class="nav__mobile-inner">
        <!-- "About Us" -->
        <a href="${root}pages/about.html"    class="nav__mobile-link">Über uns</a>
        <!-- "Services" -->
        <a href="${root}pages/services.html" class="nav__mobile-link">Leistungen</a>
        <!-- "Contact" -->
        <a href="${root}pages/contact.html"  class="nav__mobile-link">Kontakt</a>
      </div>
    </div>
  </nav>`;

  /* ──────────────────────────────────────────────
     FOOTER HTML
  ────────────────────────────────────────────── */
  const footerHTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer__top">

        <!-- Col 1: Brand -->
        <div class="footer__brand">
          <div class="footer__logo">
            <div class="footer__logo-mark">
              <svg viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" aria-hidden="true">
                <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
                <path d="M9 21V12h6v9"/>
              </svg>
            </div>
            <!-- Footer brand name -->
            <span class="footer__logo-name">Hausverwaltung de West - Immowest</span>
          </div>
          <!-- Footer tagline: "Your trusted real estate partner in Munich and the surrounding area – for over 20 years." -->
          <p class="footer__tagline">Ihr vertrauensvoller Immobilienpartner in Dortmund und Umgebung.</p>
          <div class="footer__socials">
          </div>
        </div>

        <!-- Col 2: Navigation -->
        <div>
          <!-- Column heading: "Navigation" -->
          <h3 class="footer__col-title">Navigation</h3>
          <div class="footer__links">
            <!-- "About Us" -->
            <a href="${root}pages/about.html"    class="footer__link">Über uns</a>
            <!-- "Services" -->
            <a href="${root}pages/services.html" class="footer__link">Leistungen</a>
            <!-- "Contact" -->
            <a href="${root}pages/contact.html"  class="footer__link">Kontakt</a>
          </div>
        </div>

        <!-- Col 3: Legal -->
        <div>
          <!-- Column heading: "Legal" -->
          <h3 class="footer__col-title">Rechtliches</h3>
          <div class="footer__links">
            <!-- "Privacy Policy" -->
            <a href="${root}pages/privacy.html" class="footer__link">Datenschutzerklärung</a>
            <!-- "Imprint" – German law requires this on every commercial website -->
            <a href="${root}pages/privacy.html#impressum" class="footer__link">Impressum</a>
          </div>
        </div>

        <!-- Col 4: Contact Info -->
        <div>
          <!-- Column heading: "Contact" -->
          <h3 class="footer__col-title">Kontakt</h3>
          <div class="footer__links">
            <a href="https://maps.google.com/?q=Obermarkstraße+100,44267+Dortmund" 
               target="_blank"
               rel="noopener noreferrer"
               class="footer__link">
              Obermarkstraße 100<br>44267 Dortmund
            </a>
            <a href="tel:+4915560922517" class="footer__link">+49 231 9272 5415</a>
            <a href="mailto:d.dewest@immowest-hausverwaltung.de" class="footer__link">d.dewest@immowest-hausverwaltung.de</a>
          </div>
        </div>

      </div><!-- /footer__top -->
    </div><!-- /container -->

    <!-- Footer bottom bar -->
    <div class="footer__bottom container">
      <!-- Copyright: "© 2025 Daniel Immobilien – All rights reserved." -->
      <p class="footer__copy">© 2025 Hausverwaltung de West - Immowest – Alle Rechte vorbehalten.</p>
      <!-- Disclaimer: "All information without guarantee. Subject to change." -->
      <p class="footer__copy">Alle Angaben ohne Gewähr. Änderungen vorbehalten.</p>
    </div>
  </footer>`;

  /* ── Inject into page ── */
  const navMount    = document.getElementById('nav-mount');
  const footerMount = document.getElementById('footer-mount');
  if (navMount)    navMount.innerHTML    = navHTML;
  if (footerMount) footerMount.innerHTML = footerHTML;
}