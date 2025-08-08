import { useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Inter } from "next/font/google";
import { getAreasAction } from "@/actions/area";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const AreasDropdown = ({ value, onChange }) => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areasData = await getAreasAction();
        setAreas(areasData);
      } catch (error) {
        console.error("Error al obtener las áreas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  return (
    <div className="flex flex-col">
      <p className="text-black font-medium text-md mb-2">Áreas de interés</p>
      {loading ? (
        <p className="text-gray-600">Cargando áreas...</p>
      ) : (
        <Select
          aria-label="Selecciona un área de interés"
          placeholder="Elige una opción"
          value={value}
          onChange={onChange}
          className="min-w-[194px]" 
        >
          {areas.map((area) => (
            <SelectItem key={area.id} value={area.id} className="text-gray-600">
              {area.name}
            </SelectItem>
          ))}
        </Select>
      )}
    </div>
  );
};