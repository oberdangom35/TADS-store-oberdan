import logo from '../assets/images/logo/logo.png';

function Cabecalho() {
  return (
    <header className="cabecalho">
      <div className="cabecalho-container">
        <div className="cabecalho-logo">
          <img src={logo} alt="TADS Store - Oberdan" />
        </div>
        <nav>
          <ul>
            <li>Produtos</li>
            <li>Categorias</li>
            <li>Carrinho</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Cabecalho;
