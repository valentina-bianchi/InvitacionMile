import styles from './LocationPage.module.css';

const LocationPage = () => {
  const address = 'José Colombres 1260, Rosario, Santa Fe, Argentina';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const handleMapClick = () => {
    window.open(googleMapsUrl, '_blank');
  };

  const handleButtonClick = () => {
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className={styles.container} id="location-page">
      <div className={styles.content}>
        {/* Decoración superior */}
        <div className={styles.starsTop}>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
        </div>

        {/* Título */}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Lugar de celebración:</h1>
        </div>

        {/* Dirección */}
        <div className={styles.addressContainer}>
          <p className={styles.address}>José Colombres 1260</p>
          <p className={styles.clarification}>Aclaración: Altura Mendoza 7800</p>
        </div>

        {/* Google Maps */}
        <div className={styles.mapContainer}>
          <div className={styles.mapWrapper} onClick={handleMapClick}>
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del evento"
            ></iframe>
            <div className={styles.mapOverlay}>
              <p className={styles.mapHint}>Haz click para abrir en Google Maps</p>
            </div>
          </div>
        </div>

        {/* Botón VER UBICACIÓN */}
        <div className={styles.buttonContainer}>
          <button className={styles.locationButton} onClick={handleButtonClick}>
            VER UBICACIÓN
          </button>
        </div>

        {/* Decoración inferior */}
        <div className={styles.starsBottom}>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
        </div>

        {/* Flecha para siguiente página */}
        <div className={styles.arrowDown} onClick={() => {
          const nextPage = document.getElementById('confirmation-page');
          nextPage?.scrollIntoView({ behavior: 'smooth' });
        }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;

