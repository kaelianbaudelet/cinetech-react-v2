/**
 * Composant de présentation pour une section de la page.
 * Prend un titre et des composants enfants (children).
 */
export default function Section({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {children}
    </section>
  );
}
