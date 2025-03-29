// Definim la funció reportWebVitals que permet mesurar el rendiment de l'aplicació
const reportWebVitals = onPerfEntry => {
  // Comprovem si la funció passada com a paràmetre és una funció vàlida
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Carreguem dinàmicament el mòdul 'web-vitals' per mesurar diferents mètriques de rendiment
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Mesurem el Cumulative Layout Shift (CLS), que mesura la estabilitat visual de la pàgina
      getCLS(onPerfEntry);

      // Mesurem el First Input Delay (FID), que mesura el temps fins a la primera interacció de l'usuari
      getFID(onPerfEntry);

      // Mesurem el First Contentful Paint (FCP), que mesura el temps fins que el primer contingut és visible
      getFCP(onPerfEntry);

      // Mesurem el Largest Contentful Paint (LCP), que mesura el temps fins que el contingut més gran es carrega
      getLCP(onPerfEntry);

      // Mesurem el Time to First Byte (TTFB), que mesura el temps fins que es rep el primer byte des del servidor
      getTTFB(onPerfEntry);
    });
  }
};

// Exportem la funció per poder utilitzar-la en altres arxius
export default reportWebVitals;
