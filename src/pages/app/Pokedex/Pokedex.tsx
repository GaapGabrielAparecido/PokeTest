import { useEffect, useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import Pagination from "./Pagination";
import Cards from "./Cards";

import axios from "axios";

const Pokedex = () => {
  const [isReady, setIsReady] = useState(false);

  const [pokeGen, setPokeGen] = useState(1);
  const [pokeList, setPokeList] = useState<any>([]);

  const [filteredPokeList, setFilteredPokeList] = useState<any>([]);
  const [pokeFilter, setPokeFilter] = useState({
    nameOrId: "",
    type: "",
  });

  const filterPokeList = () => {
    let filteredList = [...pokeList];

    if (pokeFilter.nameOrId) {
      filteredList = filteredList.filter(
        (poke) =>
          poke.name.toLowerCase().includes(pokeFilter.nameOrId.toLowerCase()) ||
          poke.id.toString() === pokeFilter.nameOrId
      );
    }
    if (pokeFilter.type) {
      filteredList = filteredList.filter((poke) =>
        poke.types.some((type: any) => type.type.name === pokeFilter.type)
      );
    }

    console.log(filteredList);
    setFilteredPokeList(filteredList);
    setPage(1);
  };

  const types = [
    { value: "normal", label: "Normal" },
    { value: "fighting", label: "Fighting" },
    { value: "flying", label: "Flying" },
    { value: "poison", label: "Poison" },
    { value: "ground", label: "Ground" },
    { value: "rock", label: "Rock" },
    { value: "bug", label: "Bug" },
    { value: "ghost", label: "Ghost" },
    { value: "steel", label: "Steel" },
    { value: "fire", label: "Fire" },
    { value: "water", label: "Water" },
    { value: "grass", label: "Grass" },
    { value: "electric", label: "Electric" },
    { value: "psychic", label: "Psychic" },
    { value: "ice", label: "Ice" },
    { value: "dragon", label: "Dragon" },
    { value: "dark", label: "Dark" },
    { value: "fairy", label: "Fairy" },
  ];
  const getColorType = (type: string) => {
    let color = "";

    switch (type) {
      case "normal":
        color = "#9FA19F";
        break;
      case "fighting":
        color = "#FF8000";
        break;
      case "flying":
        color = "#81B9EF";
        break;
      case "poison":
        color = "#9141CB";
        break;
      case "ground":
        color = "#915121";
        break;
      case "rock":
        color = "#AFA981";
        break;
      case "bug":
        color = "#91A119";
        break;
      case "ghost":
        color = "#704170";
        break;
      case "steel":
        color = "#60A1B8";
        break;
      case "fire":
        color = "#E62829";
        break;
      case "water":
        color = "#2980EF";
        break;
      case "grass":
        color = "#3FA129";
        break;
      case "electric":
        color = "#FAC000";
        break;
      case "psychic":
        color = "#EF4179";
        break;
      case "ice":
        color = "#3DCEF3";
        break;
      case "dragon":
        color = "#5060E1";
        break;
      case "dark":
        color = "#624D4E";
        break;
      case "fairy":
        color = "#EF70EF";
        break;
      default:
        color = "#f1f1f1";
        break;
    }

    return color;
  };

  const [page, setPage] = useState(1);

  const getData = async () => {
    setIsReady(false);
    setPage(1);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/generation/${pokeGen}`
      );

      const pokeListNormalized = await Promise.all(
        response.data.pokemon_species.map(async (item: { name: string }) => {
          try {
            const responsePoke = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${item.name}`
            );
            return {
              id: responsePoke.data.id,
              name: responsePoke.data.name,
              sprite: responsePoke.data.sprites.other.home.front_default,
              crie: responsePoke.data.cries.latest,
              types: responsePoke.data.types,
            };
          } catch (error) {
            console.error("Error fetching Pokemon:", error);
          }
        })
      );

      const filteredPokeListNormalized = pokeListNormalized.filter(
        (poke: any) => poke !== undefined && poke !== null
      );

      filteredPokeListNormalized.sort((a, b) => a.id - b.id);

      setPokeList(filteredPokeListNormalized);
      setFilteredPokeList(filteredPokeListNormalized);

      setIsReady(true);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [pokeGen]);

  return (
    <div className="h-[85vh] p-4 flex flex-1 flex-col gap-4 relative">
      {isReady ? (
        <>
          <div className="flex">
            <select
              value={pokeGen}
              onChange={(e: any) => setPokeGen(e.target.value)}
              className="bg-zinc-200 hover:bg-zinc-300 p-2 rounded-s-md appearance-none transition-all duration-150 cursor-pointer"
            >
              <option value="1">Geração 1</option>
              <option value="2">Geração 2</option>
              <option value="3">Geração 3</option>
              <option value="4">Geração 4</option>
              <option value="5">Geração 5</option>
              <option value="6">Geração 6</option>
              <option value="7">Geração 7</option>
              <option value="8">Geração 8</option>
              <option value="9">Geração 9</option>
            </select>

            <input
              type="text"
              placeholder="Buscar..."
              value={pokeFilter.nameOrId}
              onChange={(e) =>
                setPokeFilter((prevFilter) => ({
                  ...prevFilter,
                  nameOrId: e.target.value,
                }))
              }
              className="bg-zinc-50 p-2 flex-1"
            />

            <select
              value={pokeFilter.type}
              onChange={(e) =>
                setPokeFilter((prevFilter) => ({
                  ...prevFilter,
                  type: e.target.value,
                }))
              }
              className="p-2 appearance-none"
              style={{
                background: getColorType(pokeFilter.type),
              }}
            >
              <option value="" className="bg-white">
                Todos os Tipos
              </option>
              {types.map((type: { value: string; label: string }) => {
                return (
                  <option value={type.value} className="bg-white">
                    {type.label}
                  </option>
                );
              })}
            </select>

            <button
              type="button"
              onClick={filterPokeList}
              className="bg-zinc-200 hover:bg-zinc-300 p-2 rounded-e-md flex items-center gap-1 transition-all duration-150"
            >
              <MagnifyingGlassIcon className="w-5" />
              Filtrar
            </button>
          </div>

          <Cards
            filteredPokeList={filteredPokeList}
            page={page}
            getColorType={getColorType}
          />

          <Pagination
            filteredPokeList={filteredPokeList}
            page={page}
            setPage={setPage}
          />
        </>
      ) : (
        <div className="flex flex-1 justify-center items-center">
          <img src="logo.svg" alt="logo" width={50} className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Pokedex;
