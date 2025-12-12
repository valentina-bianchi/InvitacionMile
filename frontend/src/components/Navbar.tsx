import { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string | null, e: React.MouseEvent) => {
    if (!href) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const menuItems = [
    { label: 'Mis 15 Mile', icon: '🎂', href: '#home' },
    { label: 'Confirmar Asistencia', href: '#confirmation-page' },
    { label: 'Ver Ubicación', href: '#location-page' },
    { label: '¿Cuánto conoces a Mile?', href: '#quiz-page' },
    { label: 'Itinerario', href: '#itinerario-page' },
    { label: 'Agregar canciones', href: '#spotify-page' },
    { label: 'Subir fotos', href: '#photos-page' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          {/* Logo/Icono */}
          <a
            href="#home"
            onClick={(e) => handleNavClick('#home', e)}
            className={styles.logo}
          >
            <span className={styles.logoIcon}>🎂</span>
            <span className={styles.logoText}>Mis 15 Mile</span>
          </a>

          {/* Desktop Menu */}
          <div className={styles.desktopMenu}>
            {menuItems.slice(1).map((item) => (
              <a
                key={item.label}
                href={item.href || '#'}
                onClick={(e) => handleNavClick(item.href, e)}
                className={styles.menuItem}
                style={!item.href ? { cursor: 'default', pointerEvents: 'none' } : {}}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.mobileMenuButton}
            aria-label="Toggle menu"
          >
            <svg
              className={styles.mobileMenuIcon}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={styles.mobileMenu}>
            {menuItems.slice(1).map((item) => (
              <a
                key={item.label}
                href={item.href || '#'}
                onClick={(e) => {
                  handleNavClick(item.href, e);
                }}
                className={styles.mobileMenuItem}
                style={!item.href ? { cursor: 'default', pointerEvents: 'none', opacity: 0.6 } : {}}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

