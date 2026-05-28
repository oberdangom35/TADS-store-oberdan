function Selo({ texto = "Novo", cor = "verde" }) {
  return (
    <span className={`selo selo-${cor}`}>
      {texto}
    </span>
  );
}

export default Selo;
