import { useEffect, useState } from 'react';

/**
 * Composant de démonstration de l'utilisation de useEffect.
 * Simule un chargement de données après 2 secondes.
 */
export default function TestEffect() {
  const [message, setMessage] = useState('Chargement...');
  useEffect(() => {
    setTimeout(() => {
      setMessage('Données reçues !');
    }, 2000);
  }, []);
  return <p>{message}</p>;
}
