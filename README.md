# PhysioReact

PhysioReact is an offline-capable static web app for physiotherapists and rehabilitation professionals. It helps create visual reaction, motor choice, attention, and inhibition exercises with configurable stimuli, timing, and work/rest sessions.

PhysioReact is an exercise and rehabilitation support tool. It does not replace clinical reasoning, professional assessment, or patient-specific supervision.

## Project Structure

- `index.html`: app layout, controls, and stimulus display area.
- `css/style.css`: visual styles, responsive layout basics, and fullscreen exercise view.
- `js/app.js`: main app logic, settings binding, stimulus generation, session timers, countdown, sound cues, fullscreen, and service worker registration.
- `service-worker.js`: offline cache setup.
- `manifest.webmanifest`: PWA metadata and icons.
- `icons/`: app icons.
- `README.md`: project documentation.
- `LICENCE`: license information.

## Available Stimulus Modes

PhysioReact can display several stimulus families:

- Colors: selected colors appear as the stimulus background.
- Arrows: selected arrow directions appear as neutral visual stimuli.
- Numbers: selected numbers from 1 to 12 appear as neutral visual stimuli.
- Letters: selected letters from A to Z appear as neutral visual stimuli.
- Combined mode: selected arrows, numbers, and letters are used with Go/No-Go cues or with random selected background colors.

## Combined Mode / Go-No-Go

Combined mode has two explicit Go/No-Go cue modes:

- `Stimulus color = Go/No-Go`: the arrow, letter, or number is colored.
- `Background color = Go/No-Go`: the stimulus background is colored while the arrow, letter, or number stays neutral and readable.

The Go/No-Go color code is fixed:

- Green `#00aa00` = Go.
- Orange `#ff8800` = No-Go.

Go/No-Go colors are not random in Combined mode. The displayed content can still be randomized from the selected arrows, numbers, and letters, but the Go/No-Go cue itself is limited to green and orange.

## Combined Mode / Random Background

Combined mode also includes `Stimulus + random background color`. This mode is not Go/No-Go.

In this mode:

- The app randomly selects an arrow, number, or letter from the selected stimuli.
- The app randomly selects a background color from the selected colors.
- The background color can be any selected color, such as blue, green, red, yellow, purple, orange, black, or gray.
- The background colors are not limited to green and orange.
- The stimulus remains neutral or contrasted for readability.

## Timing And Session Settings

The app includes:

- Fixed display duration.
- Random display duration between a minimum and maximum value.
- Inter-stimulus delay.
- Work duration.
- Rest duration.
- Repetition count.
- Optional automatic restart between repetitions.
- Limit for the same stimulus appearing repeatedly.

## Running Locally

The app can be opened directly with `index.html`, but service worker behavior is more reliable when served from a local web server.

From the repository root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## PWA / Offline Use

PhysioReact includes a web manifest and service worker for offline-capable use. When changing app shell files such as `index.html`, `css/style.css`, `js/app.js`, `manifest.webmanifest`, or `service-worker.js`, check whether the service worker cache name must be incremented so users receive the latest version.

## Version Francaise

PhysioReact est une webapp statique utilisable hors ligne pour les kinesitherapeutes et professionnels de la reeducation. Elle aide a construire des exercices visuels de reaction, de choix moteur, d'attention et d'inhibition avec des stimuli, des durees et des cycles travail/repos configurables.

PhysioReact est une aide a l'exercice et a la reeducation. L'application ne remplace pas le raisonnement clinique, l'evaluation professionnelle ou la supervision adaptee au patient.

### Structure Du Projet

- `index.html` : structure de l'application, controles et zone d'affichage du stimulus.
- `css/style.css` : styles visuels, bases responsives et vue plein ecran d'exercice.
- `js/app.js` : logique principale, generation des stimuli, sessions, timers, compte a rebours, sons, plein ecran et enregistrement du service worker.
- `service-worker.js` : cache hors ligne.
- `manifest.webmanifest` : metadonnees PWA et icones.
- `icons/` : icones de l'application.
- `README.md` : documentation du projet.
- `LICENCE` : informations de licence.

### Modes Disponibles

- Couleurs : les couleurs selectionnees apparaissent en fond.
- Fleches : les directions selectionnees apparaissent comme stimuli neutres.
- Chiffres : les chiffres selectionnes de 1 a 12 apparaissent comme stimuli neutres.
- Lettres : les lettres selectionnees de A a Z apparaissent comme stimuli neutres.
- Combined mode : les fleches, chiffres et lettres selectionnes sont utilises avec des indices Go/No-Go ou avec des fonds colores aleatoires selectionnes.

### Combined Mode / Go-No-Go

Le Combined mode propose deux logiques explicites :

- `Stimulus color = Go/No-Go` : la fleche, lettre ou chiffre porte la couleur Go/No-Go.
- `Background color = Go/No-Go` : le fond porte la couleur Go/No-Go, tandis que le stimulus reste neutre et lisible.

Le code couleur est fixe :

- Vert `#00aa00` = Go.
- Orange `#ff8800` = No-Go.

La couleur Go/No-Go n'est pas aleatoire en Combined mode. Le contenu affiche peut rester aleatoire selon les fleches, chiffres et lettres selectionnes, mais l'indice Go/No-Go est limite au vert et a l'orange.

### Combined Mode / Fond Aleatoire

Le Combined mode inclut aussi `Stimulus + random background color`. Ce mode n'est pas un Go/No-Go.

Dans ce mode :

- L'application tire aleatoirement une fleche, un chiffre ou une lettre parmi les stimuli selectionnes.
- L'application tire aleatoirement une couleur de fond parmi les couleurs selectionnees.
- La couleur de fond peut etre n'importe quelle couleur selectionnee : bleu, vert, rouge, jaune, violet, orange, noir ou gris.
- Les couleurs de fond ne sont pas limitees au vert et a l'orange.
- Le stimulus reste neutre ou contraste pour rester lisible.

### Reglages Timing Et Session

L'application inclut une duree d'affichage fixe ou aleatoire, un delai inter-stimulus, une duree de travail, une duree de repos, un nombre de repetitions, un redemarrage automatique optionnel et une limite de repetitions du meme stimulus.

### Lancement Local

Depuis la racine du depot :

```bash
python3 -m http.server 8000
```

Puis ouvrir :

```text
http://localhost:8000
```

## License

Code: PolyForm Noncommercial 1.0.0

Assets: CC BY-NC 4.0
