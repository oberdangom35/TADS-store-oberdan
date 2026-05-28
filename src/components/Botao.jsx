function Botao({ texto = "Clique aqui", onClick }) {
  return (
    <button className="botao" onClick={onClick}>
      {texto}
    </button>
  );
}

export default Botao;
