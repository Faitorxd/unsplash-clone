import { useRef } from "react";

const slides = [
  { name: "Tonos Fríos", path: "/tonos-frios" },
  { name: "Wallpapers", path: "/wallpapers" },
  { name: "Naturaleza", path: "/naturaleza" },
  { name: "Renders 3D", path: "/renders-3d" },
  { name: "Viajar", path: "/viajar" },
  { name: "Arquitectura", path: "/arquitectura-interiores" },
  { name: "Texturas Y Patrones", path: "/texturas-patrones" },
  { name: "Fotografía Callejera", path: "/fotografia-callejera" },
  { name: "Película", path: "/pelicula" },
  { name: "Archivístico", path: "/archivistico" },
  { name: "Experimental", path: "/experimental" },
  { name: "Animales", path: "/animales" },
  { name: "Moda Y Belleza", path: "/moda-belleza" },
  { name: "Gente", path: "/gente" },
  { name: "Espiritualidad", path: "/espiritualidad" },
  { name: "Negocios Y Trabajo", path: "/negocios-trabajo" },
  { name: "Comida Y Bebida", path: "/comida-bebida" },
  { name: "Salud Y Bienestar", path: "/salud-bienestar" },
  { name: "Deportivo", path: "/deportivo" },
  { name: "Actualidades", path: "/actualidades" },
];

export default function Carrusel() {
    const scrollContainer = useRef(null);

  const scroll = (scrollOffset) => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft += scrollOffset;
    }
  };
  
  return (
    <div style={{ display: "flex", alignItems: "center", overflowX: "hidden" }}>
      <button onClick={() => scroll(-100)}>{"<"}</button>
      <div
        ref={scrollContainer}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} style={{ flexShrink: 0, width: 115 }}>
            <div
              onClick={() => {
              }}
            >
              <span style={{ fontSize: "12px" }}>{slide.name}</span>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => scroll(100)}>{">"}</button>
    </div>
  );
}