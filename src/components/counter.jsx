import { useState } from 'react';

/**
 * Composant additionneur simple pour tester le State React.
 */
export default function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  return (
    <div className="bg-gray-100 p-4 shadow">
      <p>Compteur : {count}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1"
        onClick={increment}
      >
        +1
      </button>
    </div>
  );
}
