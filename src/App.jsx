import { useRef, useState, useEffect } from 'react';
import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

// Abrufen der gespeicherten IDs aus dem localStorage und Initialisieren der gespeicherten Orte
const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storedPlaces = storedIds.map((id) => 
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  const selectedPlace = useRef(); // Ref für den aktuell ausgewählten Ort
  const [modalIsOpen, setModalIsOpen] = useState(false); // Zustand für das Modal (offen/geschlossen)
  const [availablePlaces, setAvailablePlaces] = useState([]); // Zustand für verfügbare Orte
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces); // Zustand für ausgewählte Orte mit Initialwert aus localStorage
  
  // useEffect-Hook zum Abrufen der aktuellen Geolocation und Sortieren der Orte nach Entfernung
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // Sortieren der Orte nach Entfernung basierend auf der aktuellen Position
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES, 
        position.coords.latitude, 
        position.coords.longitude
      );
  
      // Setzen der sortierten Orte in den Zustand availablePlaces
      setAvailablePlaces(sortedPlaces);
    });
  }, []); // Leeres Abhängigkeitsarray bedeutet, dass dieser Effekt nur beim ersten Rendern ausgeführt wird
  
  // Funktion zum Starten des Entfernens eines Ortes
  function handleStartRemovePlace(id) {
    setModalIsOpen(true); // Öffnen des Modals
    selectedPlace.current = id; // Setzen des zu entfernenden Ortes in die Ref
  }

  // Funktion zum Abbrechen des Entfernens eines Ortes
  function handleStopRemovePlace() {
    setModalIsOpen(false); // Schließen des Modals
  }

  // Funktion zum Hinzufügen eines Ortes zu den ausgewählten Orten
  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      // Überprüfen, ob der Ort bereits ausgewählt ist
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces; // Wenn ja, keine Änderung
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id); // Finden des Ortes in AVAILABLE_PLACES
      return [place, ...prevPickedPlaces]; // Hinzufügen des Ortes zu den ausgewählten Orten
    });

    // Abrufen der gespeicherten IDs aus dem localStorage
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    // Überprüfen, ob die ID bereits gespeichert ist
    if (storedIds.indexOf(id) === -1) {
      // Hinzufügen der neuen ID zu den gespeicherten IDs und Speichern im localStorage
      localStorage.setItem(
        'selectedPlaces', 
        JSON.stringify([id, ...storedIds])
      );
    }
  }

  // Funktion zum Entfernen eines Ortes aus den ausgewählten Orten
  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current) // Entfernen des Ortes aus den ausgewählten Orten
    );

    setModalIsOpen(false); // Schließen des Modals

    // Abrufen der gespeicherten IDs aus dem localStorage
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    // Entfernen der ID des ausgewählten Ortes aus den gespeicherten IDs und Speichern im localStorage
    localStorage.setItem(
      'selectedPlaces', 
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
    );
  }

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distances..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
