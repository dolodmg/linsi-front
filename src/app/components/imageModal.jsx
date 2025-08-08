"use client";

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const ImageModal = ({ src, alt, className = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  if (!src) return null;

  return (
    <>
      <div 
        className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-[1.02] ${className}`}
        onClick={openModal}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-48 sm:h-52 md:h-60 lg:h-64 xl:h-72 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20 pointer-events-none">
          <div className="bg-white/90 rounded-full p-2">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          <div className="relative max-w-7xl max-h-[90vh] mx-4 z-10">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-20"
              aria-label="Cerrar imagen"
            >
              <IoClose className="w-8 h-8" />
            </button>
            
            <div className="bg-white rounded-lg p-2 shadow-2xl">
              <img
                src={src}
                alt={alt}
                className="max-w-full max-h-[80vh] object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModal;