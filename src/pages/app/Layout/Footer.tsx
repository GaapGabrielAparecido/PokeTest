const Footer = () => {
  return (
    <div className="h-[5vh] bg-zinc-900 text-xs text-white px-4 flex justify-between items-center">
      <div>© Copyright 2024 | Todos os Direitos Reservados | Gaap</div>

      <div>
        Desenvolvido por{" "}
        <a
          href="https://github.com/GaapGabrielAparecido"
          className="font-medium"
        >
          GaapGabrielAparecido
        </a>
      </div>
    </div>
  );
};

export default Footer;
