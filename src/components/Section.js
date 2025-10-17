export default function Section({ title, content, img, imgProps }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-lg leading-relaxed">{content}</p>
      </div>
      {img && (
        <div>
          <img src={img} alt={title} className="rounded-xl shadow-lg" {...imgProps} />
        </div>
      )}
    </section>
  );
}
