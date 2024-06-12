import { useEffect, useState } from "react";

const Pokesorteios = () => {
  const [pokeBilhetes, setPokeBilhetes] = useState([]);
  const [pokeSorteios, setPokeSorteios] = useState<any>([]);
  const [valorSorteio, setValorSorteio] = useState<any>(1000000);

  useEffect(() => {
    const storedBilhetes = localStorage.getItem("bilhetes");
    if (storedBilhetes) {
      setPokeBilhetes(JSON.parse(storedBilhetes));
    }
  }, []);

  const sortearBilhetes = () => {
    const valor = parseFloat(valorSorteio);

    const sorteios = [];
    for (let i = 0; i < 5; i++) {
      const poke = Math.floor(Math.random() * 25) + 1;
      const number = Math.floor(Math.random() * 100) + 1;
      sorteios.push({ poke, number });
    }
    setValorSorteio(valor);
    setPokeSorteios(sorteios);
  };

  const bilhetesVencedores = pokeBilhetes.filter((bilhete: any) =>
    pokeSorteios.some(
      (sorteio: any) =>
        sorteio.poke === bilhete.poke && sorteio.number === bilhete.number
    )
  );

  return (
    <div className="h-[85vh] p-4 flex flex-1 flex-col gap-4">
      {pokeSorteios.length > 0 && (
        <div className="bg-white p-4 rounded-md flex justify-center gap-4 relative">
          {pokeSorteios.map((item: any, key: number) => (
            <div
              key={key}
              className="bg-zinc-800 p-4 rounded-full flex justify-center items-center z-10"
            >
              <div className="h-24 w-24 bg-white p-4 rounded-full flex justify-center items-center">
                {item.poke}-{item.number}
              </div>
            </div>
          ))}

          <div className="bg-red-500 h-20 w-full rounded-t-md absolute top-0"></div>
        </div>
      )}

      <div className="bg-white p-4 rounded-md flex gap-4">
        <input
          type="number"
          placeholder="Valor do Sorteio"
          min={1000}
          value={valorSorteio}
          onChange={(e: any) => setValorSorteio(e.target.value)}
          className="border rounded-md flex-1"
        />

        <button
          onClick={sortearBilhetes}
          className="bg-zinc-100 p-2 rounded-md"
        >
          Sortear
        </button>
      </div>

      {pokeSorteios.length > 0 && (
        <div className="bg-white p-4 rounded-md grid grid-cols-2 md:grid-cols-3 gap-4">
          {bilhetesVencedores.length > 0 ? (
            bilhetesVencedores.map((bilhete: any, key: number) => (
              <div
                key={key}
                className="bg-zinc-100 p-4 rounded-md flex justify-between items-center gap-4"
              >
                <div>
                  <div>
                    Número premiado: {bilhete.poke}-{bilhete.number}
                  </div>

                  <div>Nome: {bilhete.name}</div>

                  <div>
                    Prêmio: R${" "}
                    {valorSorteio /
                      bilhetesVencedores.length /
                      bilhete.sweepstakes}
                  </div>
                </div>

                <img src="logo.svg" alt="logo" width={60} />
              </div>
            ))
          ) : (
            <div>Não houve ganhadores.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Pokesorteios;
