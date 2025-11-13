### 🇬🇧 ENGLISH VERSION
## PhysioReact

# Overview:
PhysioReact is an offline-capable web application designed for physiotherapists and other healthcare professionals to create proprioceptive and cognitive stimulation exercises. It offers customizable visual stimuli to train attention, reaction speed, inhibition, executive functions, and sensorimotor coordination. PhysioReact is part of the PhysioTools suite (PhysioStroop, PhysioTempo, etc.).

# Features:
	•	Stimuli types: colors (red, blue, green, yellow, purple, orange, black, gray), arrows (8 directions), numbers (1 to 12), letters (A to Z).
	•	Combined mode: colored arrows only, or background color cues for Go/No-Go tasks.
	•	Timing settings: fixed duration, random duration range, inter-stimulus delay.
	•	Session settings: work duration, rest duration, repetition count, automatic restart.
	•	Offline functionality using a service worker and web manifest.

# Technologies used:
HTML5, CSS3, Vanilla JavaScript (ES6), Service Worker (offline support), PWA-ready, GitHub Pages compatible.

# Project structure:
index.html
style.css
app.js
service-worker.js
manifest.webmanifest
assets folder (optional)

# Installation:
	1.	Local use: clone the repository and open index.html in a browser. Offline service worker may require serving files from a local server.
	2.	GitHub Pages deployment: push the repository to GitHub, activate Pages in Settings → Pages, and load the app directly online or install it offline.

# How to use:
	1.	Select stimuli: enable or disable colors, arrows, numbers, letters, or activate the combined mode.
	2.	Configure timing: choose fixed duration, random duration, and inter-stimulus delay.
	3.	Configure session: set work time, rest time, repetitions, and auto-restart.
	4.	Start the session: press “Start session” to begin the automatic visual training flow.

# Roadmap:
Planned enhancements include sound cues, tablet optimization, preset saving, session log export, accessibility theme, and scripted (non-random) sequences.

# License:
Code: PolyForm Noncommercial 1.0.0
Assets: CC BY-NC 4.0

### 🇫🇷 FRANCAIS

## PhysioReact

# Présentation :
PhysioReact est une application web fonctionnant entièrement hors-ligne, destinée aux physiothérapeutes et professionnels de santé pour proposer des exercices de stimulation proprioceptive et cognitive. Elle permet d’afficher des stimuli personnalisables afin de travailler l’attention, le temps de réaction, l’inhibition, les fonctions exécutives et la coordination sensorimotrice. PhysioReact fait partie de la suite PhysioTools (PhysioStroop, PhysioTempo, etc.).

# Fonctionnalités :
	•	Types de stimuli : couleurs (rouge, bleu, vert, jaune, violet, orange, noir, gris), flèches (8 directions), chiffres (1 à 12), lettres (A à Z).
	•	Mode combiné : flèches colorées uniquement, ou fond coloré pour tâches Go / No-Go.
	•	Réglages d’affichage : durée fixe, durée aléatoire entre deux valeurs, délai entre stimuli.
	•	Logique de session : durée de travail, durée de repos, nombre de répétitions, redémarrage automatique.
	•	Fonctionnement hors-ligne grâce au service worker et au manifest.

# Technologies :
HTML5, CSS3, JavaScript Vanilla (ES6), Service Worker, application PWA, compatible GitHub Pages.

# Structure du projet :
index.html
style.css
app.js
service-worker.js
manifest.webmanifest
dossier assets (facultatif)

# Installation :
	1.	Utilisation locale : cloner le dépôt et ouvrir index.html dans un navigateur. Le mode hors-ligne peut nécessiter un petit serveur local.
	2.	Déploiement GitHub Pages : envoyer le projet sur GitHub, activer GitHub Pages dans Settings → Pages, et accéder à l’application en ligne ou hors-ligne.

# Utilisation :
	1.	Choisir les stimuli : activer les couleurs, flèches, chiffres, lettres ou le mode combiné.
	2.	Régler le timing : durée fixe, durée aléatoire, délai entre stimuli.
	3.	Régler la session : durée de travail, durée de repos, répétitions, redémarrage automatique.
	4.	Lancer la session : cliquer sur “Start session” pour démarrer l’enchaînement automatique des stimuli.

# Roadmap :
Améliorations prévues : feedback sonore, interface tablette, sauvegarde de presets, export des logs, thème haute visibilité, séquences scriptées non aléatoires.

# Licence :
Code : PolyForm Noncommercial 1.0.0
Assets : CC BY-NC 4.0
