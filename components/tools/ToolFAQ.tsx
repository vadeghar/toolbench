export type FAQItem = {
  question: string;
  answer: string;
};

export function ToolFAQ({ items }: { items: FAQItem[] }) {
  if (!items.length) return null;

  return (
    <section className="tool-faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading">Frequently asked questions</h2>
      {items.map((item) => (
        <div className="tool-faq-item" key={item.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}
    </section>
  );
}
