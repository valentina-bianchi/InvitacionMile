import styles from './ItinerarioPage.module.css';

const ItinerarioPage = () => {
  const actividades = [
    { hora: '12:00 hs', titulo: 'Llegada y recepción', iconos: '' },
    { hora: '13:00 hs', titulo: 'Almuerzo', iconos: '🍔' },
    { hora: '15:00 hs', titulo: 'Taller de cerámica', iconos: '🎨🪵' },
    { hora: '17:00 hs', titulo: 'Torta y celebración', iconos: '🎂✨' },
  ];

  return (
    <div className={styles.container} id="itinerario-page">
      <div className={styles.content}>
        {/* Decoración superior */}
        <div className={styles.starsTop}>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
        </div>

        {/* Título */}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Itinerario</h1>
        </div>

        {/* Línea de tiempo / Caminito */}
        <div className={styles.timeline}>
          {actividades.map((actividad, index) => (
            <div key={index} className={styles.timelineItem}>
              {/* Línea vertical del caminito */}
              {index < actividades.length - 1 && (
                <div className={styles.timelineLine}></div>
              )}

              {/* Punto del caminito */}
              <div className={styles.timelineDot}></div>

              {/* Contenido de la actividad */}
              <div className={styles.activityCard}>
                <div className={styles.time}>{actividad.hora}</div>
                <div className={styles.separator}>—</div>
                <div className={styles.activityContent}>
                  <div className={styles.activityTitle}>{actividad.titulo}</div>
                  {actividad.iconos && (
                    <div className={styles.icons}>{actividad.iconos}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decoración inferior */}
        <div className={styles.starsBottom}>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
        </div>

        {/* Flecha para siguiente página */}
        <div className={styles.arrowDown} onClick={() => {
          const nextPage = document.getElementById('spotify-page');
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

export default ItinerarioPage;

