export default function Section({ title, content, img }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-gray-700 leading-relaxed">{content}</p>
      </div>
      {img && (
        <div>
          <img src={img} alt={title} className="rounded-xl shadow-lg" />
        </div>
      )}
    </section>
  );
}
