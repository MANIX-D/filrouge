
import React from "react";

// import Header from "../components/Header";
// import Footer from "../components/Footer";
import { useEffect, useState } from 'react';

// Exemple d’images du carousel (à remplacer par tes vraies images)
const images = [
  '/images/hero1.jpg',
  '/images/hero2.jpg',
  '/images/hero3.jpg',
  '/images/hero4.jpg',
  '/images/hero5.jpg',
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Animation en fondu automatique toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* Images en fondu */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`carousel ${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}

      {/* Overlay sombre pour le contraste */}
      <div className="absolute inset-0 bg-black/40 z-20"></div>

      {/* Texte Hero */}
      <div className="relative z-30 h-full flex flex-col justify-center items-start px-6 md:px-20 text-white max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          Trouvez le talent parfait<br />pour votre projet
        </h1>
        <p className="text-sm md:text-base mb-6 text-gray-200">
          Connectez-vous avec des freelances qualifiés et faites avancer vos projets rapidement et efficacement.
        </p>
        <div className="flex gap-4">
          <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition">
            Publier un projet
          </button>
          <button className="border border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-black transition">
            Devenir freelance
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

