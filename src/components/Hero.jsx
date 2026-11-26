function Hero({ title, description, activeCategory }) {
  return (
    <section
      id="home"
      className="mb-10 rounded-2xl overflow-hidden relative py-14 md:py-20 flex flex-col justify-center items-center text-center px-6 shadow-xl bg-[#0f172a] border border-[#1e293b]"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.94)), radial-gradient(circle at top right, rgba(99, 102, 241, 0.32), transparent 55%), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <h1 className="text-3xl sm:text-[2.65rem] font-extrabold mb-3.5 tracking-tight leading-tight max-w-2xl bg-gradient-to-r from-white via-slate-100 to-[#a5b4fc] bg-clip-text text-transparent">
        {title}
      </h1>

      <p className="max-w-[640px] text-[#cbd5e1] text-sm sm:text-base leading-relaxed">{description}</p>

      {activeCategory && activeCategory !== "all" && (
        <div className="mt-5 text-xs text-indigo-200 bg-[#0f172a]/85 px-3.5 py-1.5 rounded-full border border-indigo-500/40">
          Menampilkan kategori: <strong className="capitalize text-white">{activeCategory}</strong>
        </div>
      )}
    </section>
  );
}

export default Hero;
