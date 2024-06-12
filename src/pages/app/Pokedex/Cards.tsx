import { MicrophoneIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";

export interface CardsProps {
  filteredPokeList: any;
  page: number;
  getColorType: (data: string) => void;
}

const Cards = ({ filteredPokeList, page, getColorType }: CardsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);

  const openModal = async (item: any) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${item.name}`
      );

      console.log(response.data);
      setSelectedPokemon(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setIsModalOpen(false);
  };

  const startIndex = page === 1 ? 0 : 12 * (page - 1);
  const endIndex =
    startIndex + 12 <= filteredPokeList.length
      ? startIndex + 12
      : filteredPokeList.length;

  return (
    <div className="grid grid-cols-3 gap-4">
      {filteredPokeList.slice(startIndex, endIndex).map(
        (
          item: {
            id: number;
            name: string;
            sprite: string;
            crie: string;
            types: any;
          },
          key: number
        ) => {
          const crie = new Audio(item.crie);
          return (
            <div
              key={key}
              className="capitalize p-4 rounded-md flex flex-col gap-2 hover:animate-pulse cursor-pointer"
              style={{
                background: `${getColorType(item.types[0].type.name)}80`,
              }}
              onClick={() => openModal(item)}
              onMouseEnter={() => {
                crie.volume = 0.05;
                crie.play();
              }}
            >
              <div className="bg-white/30 p-4 rounded-md flex justify-center items-center">
                <img src={item.sprite} alt={item.name} width={150} />
              </div>

              <div className="font-medium flex justify-between items-center">
                <div>{item.name}</div>

                <div className="text-whitee">Nº {item.id}</div>
              </div>

              <div className="text-xs font-medium text-white grid grid-cols-2 gap-2">
                {item.types.map((subItem: any, subKey: number) => {
                  return (
                    <div
                      key={subKey}
                      className="py-0.5 rounded-md flex justify-center items-center"
                      style={{
                        background: `${getColorType(subItem.type.name)}`,
                      }}
                    >
                      {subItem.type.name}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
      )}

      {isModalOpen && selectedPokemon && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50"
          onClick={closeModal}
        >
          <div
            className="p-4 rounded-md flex flex-col gap-4"
            style={{
              background: `${getColorType(selectedPokemon.types[0].type.name)}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white p-4 rounded-md font-medium flex justify-between items-center capitalize">
              <div>{selectedPokemon.name}</div>

              <div className="text-whitee">Nº {selectedPokemon.id}</div>
            </div>

            <div className="flex gap-4">
              <div className="bg-white/40 p-4 rounded-md relative">
                <img
                  src={selectedPokemon.sprites.other.home.front_default}
                  alt={selectedPokemon.name}
                  width={250}
                  className="pulsar"
                />

                <button
                  type="button"
                  onClick={() => {
                    const crie = new Audio(selectedPokemon.cries.latest);

                    crie.volume = 0.05;
                    crie.play();
                  }}
                  className="bg-white p-2 rounded-full absolute top-2 right-2"
                >
                  <MicrophoneIcon className="w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div className="bg-white p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>Altura: </div>

                    <div>{selectedPokemon.height / 10} m</div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>Peso: </div>

                    <div>{selectedPokemon.weight / 10} kg</div>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <div>Tipo:</div>

                    <div className="text-xs font-medium text-white capitalize flex gap-2">
                      {selectedPokemon.types.map(
                        (item: any, subKey: number) => {
                          return (
                            <div
                              key={subKey}
                              className="py-0.5 px-2 rounded-md flex justify-center items-center"
                              style={{
                                background: `${getColorType(item.type.name)}`,
                              }}
                            >
                              {item.type.name}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-md">
                  <div>
                    {selectedPokemon.stats.map((stat: any) => (
                      <div
                        key={stat.stat.name}
                        className="flex justify-between items-center capitalize"
                      >
                        <div>{stat.stat.name}:</div>
                        <div>{stat.base_stat}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
