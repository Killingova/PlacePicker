﻿### Dokumentation für die `PlacePicker` App 26.06.2024

#### Übersicht
Die `PlacePicker` App ermöglicht es Benutzern, eine persönliche Sammlung von Orten zu erstellen, die sie besuchen möchten oder bereits besucht haben. Die App nutzt `localStorage`, um die Auswahl der Orte zu speichern, und verwendet die Geolokalisierung des Benutzers, um Orte nach Entfernung zu sortieren.

#### Hauptkomponenten und ihre Funktionen

##### 1. `App` Komponente
Die `App` Komponente ist die zentrale Komponente der Anwendung, die den Zustand der ausgewählten und verfügbaren Orte verwaltet, das Modal steuert und die Geolokalisierungsdaten abruft und verarbeitet.

- **Initialisierung der gespeicherten Orte:** Beim Start der App werden die gespeicherten Orts-IDs aus dem `localStorage` abgerufen und die entsprechenden Orte in `AVAILABLE_PLACES` gesucht. Diese Orte werden im Zustand `pickedPlaces` gespeichert.
- **Abrufen und Sortieren der Orte nach Entfernung:** Beim ersten Rendern der Komponente wird die Geolokalisierung des Benutzers abgerufen, und die Orte in `AVAILABLE_PLACES` werden nach Entfernung sortiert. Diese sortierten Orte werden im Zustand `availablePlaces` gespeichert.
- **Funktionen zum Öffnen und Schließen des Modals:**
  - `handleStartRemovePlace(id)`: Öffnet das Modal und setzt den aktuell ausgewählten Ort.
  - `handleStopRemovePlace()`: Schließt das Modal.
- **Funktion zum Hinzufügen eines Ortes zu den ausgewählten Orten:** `handleSelectPlace(id)` fügt einen Ort zu den ausgewählten Orten hinzu, wenn dieser noch nicht ausgewählt ist, und speichert die ID des Ortes im `localStorage`.
- **Funktion zum Entfernen eines Ortes aus den ausgewählten Orten:** `handleRemovePlace()` entfernt einen Ort aus den ausgewählten Orten und aktualisiert den `localStorage`, indem die ID des entfernten Ortes entfernt wird.

##### 2. `Modal` Komponente
Die `Modal` Komponente rendert einen Dialog, der basierend auf einem `open`-Prop angezeigt oder ausgeblendet wird. Sie verwendet `createPortal`, um die Modal-Inhalte in einem speziellen DOM-Element außerhalb des normalen DOM-Hierarchieflusses zu rendern.

- **Ref-Initialisierung:** Ein Ref-Objekt wird erstellt, um das `<dialog>`-Element zu referenzieren.
- **Steuerung des Dialogs:** Ein `useEffect`-Hook zeigt den Dialog an oder schließt ihn basierend auf dem `open`-Prop.
- **Schließen des Dialogs:** Die `onClose`-Eigenschaft wird hinzugefügt, um auf das Schließen des Dialogs zu reagieren, z.B. durch Drücken der ESC-Taste.

##### 3. `DeleteConfirmation` Komponente
Die `DeleteConfirmation` Komponente zeigt eine Bestätigungsnachricht an, die den Benutzer fragt, ob er einen Ort wirklich entfernen möchte. Sie enthält zwei Buttons, die auf Benutzeraktionen reagieren:

- **"No"-Button:** Ruft die `onCancel`-Funktion auf, wenn er geklickt wird.
- **"Yes"-Button:** Ruft die `onConfirm`-Funktion auf, wenn er geklickt wird.
- **Fortschrittsbalken:** Zeigt die verbleibende Zeit bis zur automatischen Bestätigung an.

##### 4. `ProgressBar` Komponente
Die `ProgressBar` Komponente zeigt den Fortschritt der verbleibenden Zeit bis zur automatischen Bestätigung an.

- **State Initialisierung:** Der `remainingTime`-State wird mit dem Wert des Timers initialisiert.
- **Intervall zur Aktualisierung des Fortschritts:** Ein `useEffect`-Hook erstellt ein Intervall, das den Fortschritt alle 10 ms aktualisiert und den `remainingTime`-State verringert. Die Cleanup-Funktion löscht das Intervall, wenn die Komponente unmontiert wird oder der Effekt neu ausgeführt wird.

#### useEffect-Hooks im Detail

1. **useEffect-Hook zum Abrufen der Geolocation und Sortieren der Orte:**
   - **Beschreibung:** Dieser Hook wird verwendet, um die aktuelle Geoposition des Benutzers abzurufen und die Orte in `AVAILABLE_PLACES` nach Entfernung zu sortieren.
   - **Abhängigkeiten:** Der Hook hat ein leeres Abhängigkeitsarray `[]`, was bedeutet, dass er nur einmal beim ersten Rendern der Komponente ausgeführt wird.
   - **Ablauf:**
     - Beim ersten Rendern der Komponente wird die Geolokalisierung des Benutzers abgerufen.
     - Die Orte in `AVAILABLE_PLACES` werden nach Entfernung basierend auf der aktuellen Position des Benutzers sortiert.
     - Die sortierten Orte werden im Zustand `availablePlaces` gespeichert.

2. **useEffect-Hook zum Anzeigen oder Schließen des Dialogs:**
   - **Beschreibung:** Dieser Hook wird verwendet, um das `<dialog>`-Element basierend auf dem `open`-Prop anzuzeigen oder zu schließen.
   - **Abhängigkeiten:** Der Hook hat `open` als Abhängigkeit, was bedeutet, dass er jedes Mal ausgeführt wird, wenn sich der Wert von `open` ändert.
   - **Ablauf:**
     - Wenn `open` auf `true` gesetzt wird, wird der Dialog angezeigt.
     - Wenn `open` auf `false` gesetzt wird, wird der Dialog geschlossen.
     - Der Hook fügt einen `close`-Event-Listener hinzu und entfernt ihn in der Cleanup-Funktion, um das `onClose`-Prop korrekt zu handhaben.

3. **useEffect-Hook zum Setzen des Timers in `DeleteConfirmation`:**
   - **Beschreibung:** Dieser Hook wird verwendet, um einen Timer zu setzen, der nach einer bestimmten Zeit (`TIMER`) automatisch die `onConfirm`-Funktion aufruft.
   - **Abhängigkeiten:** Der Hook hat `onConfirm` als Abhängigkeit, was bedeutet, dass er jedes Mal ausgeführt wird, wenn sich der Wert von `onConfirm` ändert.
   - **Ablauf:**
     - Der Timer wird gesetzt, um nach `TIMER` ms die `onConfirm`-Funktion aufzurufen.
     - Die Cleanup-Funktion löscht den Timer, wenn die Komponente unmontiert wird oder der Effekt neu ausgeführt wird.

4. **useEffect-Hook zum Setzen des Intervalls in `ProgressBar`:**
   - **Beschreibung:** Dieser Hook wird verwendet, um ein Intervall zu setzen, das alle 10 ms den `remainingTime`-State aktualisiert.
   - **Abhängigkeiten:** Der Hook hat ein leeres Abhängigkeitsarray `[]`, was bedeutet, dass er nur einmal beim ersten Rendern der Komponente ausgeführt wird.
   - **Ablauf:**
     - Das Intervall wird gesetzt, um alle 10 ms den `remainingTime`-State zu verringern.
     - Die Cleanup-Funktion löscht das Intervall, wenn die Komponente unmontiert wird oder der Effekt neu ausgeführt wird.

#### useCallback-Hook im Detail

1. **useCallback-Hook für `handleRemovePlace`:**
   - **Beschreibung:** Der `useCallback` Hook wird verwendet, um die `handleRemovePlace`-Funktion nur dann neu zu erstellen, wenn sich die Abhängigkeiten ändern.
   - **Abhängigkeiten:** Der Hook hat ein leeres Abhängigkeitsarray `[]`, was bedeutet, dass die Funktion nur einmal beim ersten Rendern der Komponente erstellt wird.
   - **Ablauf:**
     - Die `handleRemovePlace`-Funktion entfernt den ausgewählten Ort aus `pickedPlaces`.
     - Aktualisiert den `localStorage`, indem die ID des entfernten Ortes entfernt wird.
     - Schließt das Modal.

### Zusammenfassung
Die `PlacePicker` App ist eine interaktive Anwendung, die es Benutzern ermöglicht, eine Liste von Orten zu verwalten, die sie besuchen möchten. Durch die Verwendung von `localStorage` bleiben die ausgewählten Orte auch nach einem Neuladen der Seite erhalten. Die App nutzt die Geolokalisierung des Benutzers, um eine personalisierte Sortierung der Orte nach Entfernung anzubieten. Die `Modal`- und `DeleteConfirmation`-Komponenten bieten eine intuitive Möglichkeit, Orte aus der Liste zu entfernen.

### Wichtige Punkte zu `useEffect` und `useCallback`

- `useEffect`:
  - Wird verwendet, um Seiteneffekte zu handhaben, wie z.B. das Abrufen von Daten, das Setzen von Timern oder das Aktualisieren der UI basierend auf Zustandsänderungen.
  - Hat ein Abhängigkeitsarray, das bestimmt, wann der Effekt erneut ausgeführt wird. Ein leeres Array bedeutet, dass der Effekt nur einmal beim ersten Rendern ausgeführt wird.
  - Cleanup-Funktion: Wird verwendet, um Aufräumarbeiten durchzuführen, wenn der Effekt abgebrochen wird, z.B. das Löschen von Timern oder Event-Listenern.

- `useCallback`:
  - Wird verwendet, um eine Funktion zu erstellen, die nur dann neu erstellt wird, wenn sich die Abhängigkeiten ändern.
  - Hilfreich, um zu verhindern, dass Funktionen bei jedem Rendern neu erstellt werden, was zu unnötigen Re-Renders führen kann.

Diese detaillierte Dokumentation soll helfen, die Verwendung und Funktionsweise der `useEffect` und `useCallback` Hooks in der `PlacePicker` App besser zu verstehen.
