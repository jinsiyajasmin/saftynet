"use client";

import { products } from "./seo";

export default function ProductsSection() {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2 className="text-4xl font-semibold text-center mb-3">Our products</h2>
        <p className="text-gray-500 text-center max-w-[640px] mx-auto mb-12">
          SafetyNett software for QHSE management and ISO audits. Both open in a new tab.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product) => (
            <article
              key={product.href}
              className="rounded-2xl border border-gray-200 bg-[#f9fafb] p-8 flex flex-col"
            >
              <h3 className="text-2xl font-semibold mb-3">{product.name}</h3>
              <p className="text-gray-500 leading-relaxed mb-6 flex-1">{product.summary}</p>
              <a
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit px-5 py-2.5 rounded-xl text-white font-medium bg-gradient-to-r from-[#6C63FF] to-[#3F3DFF] hover:from-[#5a55e0] hover:to-[#2f2cda] transition"
              >
                Visit {product.name}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
