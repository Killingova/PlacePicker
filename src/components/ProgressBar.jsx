import { useState, useEffect } from "react";

export default function ProgressBar({timer}) {
    const [remainingTime, setRemainingTime] = useState(timer);

     // useEffect-Hook für das Intervall
  useEffect(() => {
    // Setzen eines Intervalls, das alle 10 Millisekunden ausgeführt wird
    const interval = setInterval(() => {
      console.log('INTERVAL');
      // Aktualisieren des verbleibenden Zeitwerts
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    // Cleanup-Funktion, die das Intervall löscht, wenn die Komponente unmontiert wird oder der Effekt neu ausgeführt wird
    return () => {
      clearInterval(interval);
    };
  }, []); // Leeres Abhängigkeitsarray bedeutet, dass dieser Effekt nur beim ersten Rendern ausgeführt wird

   {/* Fortschrittsbalken, der den verbleibenden Zeitwert anzeigt */}
   return <progress value={remainingTime} max={timer} />
}