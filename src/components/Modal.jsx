import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Die Modal-Komponente rendert einen Dialog, der basierend auf dem `open`-Prop angezeigt oder ausgeblendet wird
function Modal({ open, children, onClose }) {
  const dialog = useRef(); // Erzeugt ein Ref-Objekt für das <dialog> Element
  
  // useEffect-Hook zum Anzeigen oder Schließen des Dialogs basierend auf dem `open`-Prop
  useEffect(() => {
    if (open) {
      dialog.current.showModal(); // Zeigt den Dialog an
    } else {
      dialog.current.close(); // Schließt den Dialog
    }
  }, [open]); // Abhängig von `open`, d.h. dieser Effekt wird ausgeführt, wenn sich `open` ändert

  // `createPortal` rendert die Modal-Inhalte in einem speziellen DOM-Element außerhalb des normalen DOM-Hierarchieflusses
  return createPortal(
    // Dialog-Element mit der Klasse "modal" und dem Ref `dialog`
    // Hinzufügen der `onClose`-Eigenschaft, um auf das Schließen des Dialogs zu reagieren
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children} {/* Einfügen der Kinderkomponenten */}
    </dialog>,
    document.getElementById('modal') // Modal-Inhalte werden im DOM-Element mit der ID 'modal' gerendert
  );
}

export default Modal; // Exportiert die Modal-Komponente als Standardexport
