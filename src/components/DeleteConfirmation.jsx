// `DeleteConfirmation`-Komponente, die zwei Funktionen `onConfirm` und `onCancel` als Props empfängt
export default function DeleteConfirmation({ onConfirm, onCancel }) {
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
    </div>
  );
}
