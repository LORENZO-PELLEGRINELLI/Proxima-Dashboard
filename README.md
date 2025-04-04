# Dashboard di Controllo per il Robot

Questa repository contiene il codice sorgente per una dashboard realizzata in React con Vite, progettata per controllare e monitorare il robot in tempo reale. La dashboard permette di inviare comandi manuali al robot, visualizzare i dati dei sensori, monitorare lo stato della connessione e passare tra la modalità manuale e quella autonoma.

## Indice

- [Panoramica](#panoramica)
- [Caratteristiche](#caratteristiche)
- [Tecnologie Utilizzate](#tecnologie-utilizzate)
- [Requisiti](#requisiti)
- [Installazione](#installazione)
- [Utilizzo](#utilizzo)
- [Struttura del Codice](#struttura-del-codice)
- [Contributi](#contributi)
- [Licenza](#licenza)

## Panoramica

La dashboard di controllo per il robot è un'interfaccia web interattiva che consente di:
- Monitorare i dati in tempo reale provenienti dai sensori del robot (distanza, stato dei sensori infrarossi, velocità e forza del segnale WiFi).
- Inviare comandi di movimento (avanti, indietro, sinistra, destra, stop) attraverso pulsanti e comandi da tastiera.
- Gestire la modalità di controllo, passando dalla modalità manuale a quella autonoma.

## Caratteristiche

- **Visualizzazione in Tempo Reale:**  
  La dashboard aggiorna i dati del robot ogni 100ms, mostrando informazioni quali la distanza rilevata, lo stato dei sensori IR e la velocità corrente.

- **Controllo Manuale:**  
  Consente il controllo diretto del robot tramite pulsanti on-screen e supporta i comandi da tastiera (tasti freccia) per inviare comandi di movimento ripetuti.

- **Switch tra Modalità:**  
  È possibile passare dalla modalità manuale a quella autonoma direttamente dalla dashboard.

- **Tema Scuro/Chiaro:**  
  Supporta il cambio del tema dell'interfaccia (dark/light) per adattarsi alle preferenze dell'utente.

- **Stato della Connessione:**  
  Un indicatore visualizza lo stato della connessione tra la dashboard e il robot.

## Tecnologie Utilizzate

- **React** – Libreria JavaScript per la creazione di interfacce utente.
- **Vite** – Strumento di build rapido e leggero per applicazioni web moderne.
- **Fetch API** – Per le richieste HTTP verso il robot.
- **lucide-react** – Icone vettoriali per arricchire l'interfaccia utente.

## Requisiti

- **Node.js** (versione 14 o superiore) e **npm** (o yarn) installati sul sistema.
- Una rete locale configurata in cui il robot è raggiungibile (ad esempio, tramite l'indirizzo IP `192.168.1.50`).

## Installazione

1. **Clona il repository:**

   ```bash
   git clone https://github.com/tuo-username/dashboard-robot.git
   cd dashboard-robot



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
