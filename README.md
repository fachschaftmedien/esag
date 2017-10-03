# esag
Erstsemester Woche Fachbereich Medien

## über dieses Repository
Dieses Repository enthält die FS Medien Ersti-Wochen Seite, ggf. als Github Project Page über https

##Setup
Voraussetzungen:
- Git installiert
- Node installiert
- Basiskenntnisse Vue, SCSS und Webpack (und damit html, css und javascript)

##Installation
1. clone das Repository über git und nutze ggf. den GitHub-Desktop Client (oder andere, komplett optional)
2. navigiere im Terminal in das entsprechenden Repository Ordner
3. führe `npm install` aus, um alle in der package.json gelisteten Abhängigkeiten zu installieren
4. öffne das Projekt in einer IDE bzw. Editor deiner Wahl

##Arbeiten
1. Ändere den Code (!nicht auf gh-pages branch)
2. teste ihn, in dem du `npm run start` ausführst
3. Betrachte das Ergebnis im Browser (wird automatisch geöffnet und aktualisiert, Hot Module Replacement hält die Seite immer aktuell)
4. Wenn es funktioniert, commit und push

##Deployment
- Gehostet als Git Project Page:
  1. führe `npm run build` aus
  2. nach Abschluss des Builds, kopiere den Inhalt des `/dist` -Verzeichnisses
  3. wechsele auf den gh-pages branch und überschreibe dort den kompletten Inhalt mit dem kopierten Dateien
  4. commit und push
- Gehostet auf eigenen Server:
  1. führe `npm run build` aus
  2. nach Abschluss des Builds, wähle deinen FTP-Client deiner Wahl aus (alternativ scp über ssh)
  3. kopiere den Inhalt des `/dist` -Verzeichnisses in das entsprechende Verzeichnis auf dem Server (erstelle dieses ggf. zuerst)
  
##Informationen zur Struktur
Die Dateien, die den Build-Prozess beeinflussen sind index.js in /config und die webpack.prod.config.js bzw. webpack.dev.config.js
Die Dateien, die die Seite aufbauen, befinden sich in src, Bilder, Videos und andere Inhalte in static
Das HTML-Grundgerüst der Seite, sowie das Stylesheet das die Farben bestimmt ist auf der obersten Ebene zu finden
Das Echo so wie einige Utility-Funktionen, die nicht speziell zu Componenten gehören sind unter src/js zu finden
Den Rest findet man mit Kenntnissen der Grundlegen Struktur von Vue2 Projekten heraus, denn das Projekt wurde mittels Vue-CLI mit dem Preset für Webpack und als PWA erstellt

##Funny Facts
Die Seite funktioniert, ein mal aufgerufen auch offline
