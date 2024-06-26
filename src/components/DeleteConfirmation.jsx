import { useEffect} from "react";
import ProgressBar from "./ProgressBar.jsx";

const TIMER = 3000; 

// `DeleteConfirmation`-Komponente, die zwei Funktionen `onConfirm` und `onCancel` als Props empfängt
export default function DeleteConfirmation({ onConfirm, onCancel }) {


 

  // useEffect-Hook für den Timer
  useEffect(() => {
    console.log('TIMER SET');
    // Setzen eines Timers, der nach `TIMER` Millisekunden die `onConfirm`-Funktion aufruft
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    // Cleanup-Funktion, die den Timer löscht, wenn die Komponente unmontiert wird oder der Effekt neu ausgeführt wird
    return () => {
      console.log('Cleaning up timer');
      clearTimeout(timer);
    };
  }, [onConfirm]); // Abhängigkeit `onConfirm`, d.h. dieser Effekt wird erneut ausgeführt, wenn sich `onConfirm` ändert

  return (
    // Haupt-Container für die Bestätigungsnachricht
    <div id="delete-confirmation">
      {/* Überschrift der Bestätigungsnachricht */}
      <h2>Are you sure?</h2>
      {/* Beschreibender Text der Bestätigungsnachricht */}
      <p>Do you really want to remove this place?</p>
      {/* Container für die Aktionsbuttons */}
      <div id="confirmation-actions">
        {/* "No"-Button, der die `onCancel`-Funktion aufruft, wenn er geklickt wird */}
        <button onClick={onCancel} className="button-text">
          No
        </button>
        {/* "Yes"-Button, der die `onConfirm`-Funktion aufruft, wenn er geklickt wird */}
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
     <ProgressBar timer={TIMER}/>
    </div>
  );
}
