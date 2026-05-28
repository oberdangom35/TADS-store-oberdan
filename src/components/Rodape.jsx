function Rodape() {
  const anoAtual = new Date().getFullYear();
  
  return (
    <footer className="rodape">
      <p>© {anoAtual} Oberdan Gomes - Todos os Direitos Reservados</p>
    </footer>
  );
}

export default Rodape;
