import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import { getAllProducts } from "../services/api";

// Halaman utama (Beranda) yang menampilkan banner hero dan daftar katalog produk.

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mengambil seluruh daftar produk saat komponen pertama kali di-mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data produk.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="container-main py-8">
      <Hero
        title="Discover Curated Products on DibiTech"
        description="Jelajahi berbagai produk pilihan berkualitas tinggi dengan penawaran terbaik dan pengiriman cepat."
        activeCategory="all"
      />

      {/* Conditional rendering berdasarkan status request API */}
      {loading && <p>Memuat produk...</p>}
      {error && <p className="text-rose-600">{error}</p>}

      {/* Grid daftar produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((product) => (
          <div key={product.id} className="bg-white border border-slate-200 rounded-xl p-4">
            <img src={product.image} alt={product.title} className="w-full h-44 object-contain mb-3" />
            <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>
            <p className="text-indigo-600 font-bold mt-2">${product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;
