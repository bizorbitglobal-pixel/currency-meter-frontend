import Image from "next/image";

export default function Section({ title, content, img }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {content}
        </p>
      </div>
      {img && (
        <div>
          <Image src={img} alt={title} width={500} height={300} className="rounded-xl shadow-lg" />
        </div>
      )}
    </section>
  );
}
