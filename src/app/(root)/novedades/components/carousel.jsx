export function CarouselWithContent({ novedades }) {
  return (
    <div data-hs-carousel='{
      "loadingClasses": "opacity-0",
      "dotsItemClasses": "hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer",
      "slidesQty": {
        "xs": 1,
        "lg": 3
      }
    }' className="relative">
      <div className="hs-carousel w-full overflow-hidden bg-white rounded-lg">
        <div className="relative min-h-72 -mx-1">
          <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700">
            {novedades.map((novedad) => (
              <div key={novedad.id} className="hs-carousel-slide px-1">
                <ImageComponent novedad={novedad} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ... botones de navegación y paginación del carrusel ... */}
    </div>
  );
}