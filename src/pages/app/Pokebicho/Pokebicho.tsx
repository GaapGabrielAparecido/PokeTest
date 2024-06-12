import { useState } from "react";

import { Form, Formik, FormikHelpers } from "formik";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";

const pokeBichos = [
  {
    label: "Doduo",
    value: 1,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/84.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/84.ogg",
  },
  {
    label: "Pidgeot",
    value: 2,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/18.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/18.ogg",
  },
  {
    label: "Mudbray",
    value: 3,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/749.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/749.ogg",
  },
  {
    label: "Butterfree",
    value: 4,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/12.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/12.ogg",
  },
  {
    label: "Herdier",
    value: 5,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/507.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/507.ogg",
  },
  {
    label: "Gogoat",
    value: 6,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/673.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/673.ogg",
  },
  {
    label: "Skiddo",
    value: 7,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/672.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/672.ogg",
  },
  {
    label: "Camerupt",
    value: 8,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/323.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/323.ogg",
  },
  {
    label: "Ekans",
    value: 9,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/23.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/23.ogg",
  },
  {
    label: "Diggersby",
    value: 10,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/660.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/660.ogg",
  },
  {
    label: "Mudsdale",
    value: 11,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/750.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/750.ogg",
  },
  {
    label: "Donphan",
    value: 12,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/232.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/232.ogg",
  },
  {
    label: "Blaziken",
    value: 13,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/257.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/257.ogg",
  },
  {
    label: "Purrloin",
    value: 14,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/509.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/509.ogg",
  },
  {
    label: "Krookodile",
    value: 15,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/553.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/553.ogg",
  },
  {
    label: "Pyroar",
    value: 16,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/668.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/668.ogg",
  },
  {
    label: "Chimchar",
    value: 17,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/390.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/390.ogg",
  },
  {
    label: "Lechonk",
    value: 18,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/915.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/915.ogg",
  },
  {
    label: "Ho-Oh",
    value: 19,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/250.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/250.ogg",
  },
  {
    label: "Fearow",
    value: 20,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/22.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/22.ogg",
  },
  {
    label: "Tauros",
    value: 21,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/128.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/128.ogg",
  },
  {
    label: "Raikou",
    value: 22,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/243.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/243.ogg",
  },
  {
    label: "Ursaring",
    value: 23,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/217.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/217.ogg",
  },
  {
    label: "Stantler",
    value: 24,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/234.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/234.ogg",
  },
  {
    label: "Miltank",
    value: 25,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/241.png",
    cry: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/241.ogg",
  },
];

export interface FormValues {
  poke: string;
  number: string;
  sweepstakes: string;
  value: string;
  name: string;
}

const Pokebicho = () => {
  const [poke, setPoke] = useState<any>({});

  const navigate = useNavigate();

  const initial: FormValues = {
    poke: "",
    number: "",
    sweepstakes: "",
    value: "10",
    name: "",
  };

  const validation = object().shape({
    poke: string().required("é um campo obrigatório."),
    number: string().required("é um campo obrigatório."),
    sweepstakes: string().required("é um campo obrigatório."),
    name: string().required("é um campo obrigatório."),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      let bilhetes = [];

      const storedBilhetes = localStorage.getItem("bilhetes");
      if (storedBilhetes) {
        bilhetes = JSON.parse(storedBilhetes);
      }

      bilhetes.push(values);

      localStorage.setItem("bilhetes", JSON.stringify(bilhetes));

      navigate("/pokebicho/sorteios");
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      setSubmitting(false);
    }
  };

  const getColor = (value: number) => {
    const colorIndex = Math.floor((value - 1) / 5) % 5;
    const colors = ["#2980EF", "#3FA129", "#FAC000", "#E62829", "#9141CB"];
    return colors[colorIndex];
  };

  return (
    <div className="h-[85vh] p-4 flex flex-1 flex-col gap-4">
      <Formik
        initialValues={initial}
        validationSchema={validation}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, handleChange }) => (
          <Form>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-5 gap-4">
                {pokeBichos.map(
                  (
                    item: {
                      label: string;
                      value: number;
                      image: string;
                      cry: string;
                    },
                    key: number
                  ) => (
                    <div
                      key={key}
                      onClick={() => {
                        const cry = new Audio(item.cry);
                        cry.volume = 0.05;
                        cry.play();

                        setFieldValue("poke", item.value);

                        setPoke(item);
                      }}
                      className="p-4 rounded-md flex flex-col gap-4 cursor-pointer"
                      style={{
                        background: `${getColor(item.value)}80`,
                      }}
                    >
                      <div className="bg-white/40 p-2 rounded-md flex justify-center items-center">
                        <img src={item.image} alt={item.label} width={150} />
                      </div>

                      <div className="bg-white text-xs font-medium p-4 rounded-md flex justify-between gap-2">
                        <div>{item.label}</div>

                        <div className="whitespace-nowrap">Nº {item.value}</div>
                      </div>
                    </div>
                  )
                )}
              </div>

              {values.poke && (
                <div className="bg-white p-4 rounded-md flex flex-col gap-4">
                  <div
                    className="p-4 rounded-md flex justify-center items-center"
                    style={{
                      background: `${getColor(poke.value)}80`,
                    }}
                  >
                    <img
                      src={poke.image}
                      alt={poke.label}
                      width={300}
                      className="pulsar"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="number">Número:</label>
                      <select
                        name="number"
                        value={values.number}
                        onChange={handleChange}
                        className={`rounded-md border ${
                          errors.number ? "border-red-300" : "border-zinc-300"
                        }`}
                      >
                        <option value="">Selecione</option>
                        {[...Array(100)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                      {errors.number && (
                        <div className="text-sm text-red-500">
                          Número {errors.number}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="sweepstakes">Sorteios:</label>
                      <select
                        name="sweepstakes"
                        value={values.sweepstakes}
                        onChange={handleChange}
                        className={`rounded-md border ${
                          errors.sweepstakes
                            ? "border-red-300"
                            : "border-zinc-300"
                        }`}
                      >
                        <option value="">Selecione</option>
                        {[...Array(5)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                      {errors.sweepstakes && (
                        <div className="text-sm text-red-500">
                          Sorteios {errors.sweepstakes}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="value">Valor:</label>
                      <input
                        name="value"
                        type="number"
                        value={
                          Number(values.value) * Number(values.sweepstakes)
                        }
                        className="rounded-md border border-zinc-300"
                        disabled
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="name">Nome:</label>
                      <input
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        className={`rounded-md border ${
                          errors.name ? "border-red-300" : "border-zinc-300"
                        }`}
                      />
                      {errors.name && (
                        <div className="text-sm text-red-500">
                          Nome {errors.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <button type="submit" className="bg-zinc-100 p-2 rounded-md">
                    Apostar
                  </button>
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Pokebicho;
