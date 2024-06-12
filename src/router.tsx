import { Routes, Route } from "react-router-dom";

import Layout from "./pages/app/Layout/Layout";

import Pokedex from "./pages/app/Pokedex/Pokedex";
import Pokebicho from "./pages/app/Pokebicho/Pokebicho";
import Pokesorteios from "./pages/app/Pokebicho/Pokesorteios";

import NoPage from "./pages/error/NoPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Pokedex />} />
        <Route path="/pokebicho" element={<Pokebicho />} />
        <Route path="/pokebicho/sorteios" element={<Pokesorteios />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
