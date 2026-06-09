import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

function Erro404({ busca, setBusca, categoria, setCategoria, categorias, buscaAberta, setBuscaAberta }) {
  return (
    <Layout 
      busca={busca}
      setBusca={setBusca}
      categoria={categoria}
      setCategoria={setCategoria}
      categorias={categorias}
      buscaAberta={buscaAberta}
      setBuscaAberta={setBuscaAberta}
    >
      <div className="erro404-container">
        <div className="erro404-conteudo">
          <h1 className="erro404-titulo">ERRO 404!</h1>
          <p className="erro404-subtitulo">
            Parece que a página que você procura não existe.
          </p>

          <div className="erro404-secao">
            <h2 className="erro404-secao-titulo">Mas o que é este erro?</h2>
            <p className="erro404-texto">
              O erro 404 (também chamado de <strong>Error 404 - Page Not Found</strong>) é um código de status HTTP que indica que o navegador conseguiu se conectar ao servidor, mas a página ou o arquivo solicitado não foi localizado.
            </p>
          </div>

          <div className="erro404-secao">
            <h3 className="erro404-secao-titulo">As causas mais comuns para esse erro incluem:</h3>
            <ul className="erro404-lista">
              <li><strong>URL digitada incorretamente:</strong> Erros de digitação ou caracteres extras na barra de endereço.</li>
              <li><strong>Página removida:</strong> Conteúdos que foram apagados do site sem um redirecionamento.</li>
              <li><strong>Links quebrados:</strong> Links externos ou internos que apontam para endereços antigos que sofreram alterações.</li>
            </ul>
          </div>

          <div className="erro404-secao">
            <p className="erro404-texto">
              O que você pode fazer por enquanto é voltar à página inicial <Link to="/" className="erro404-link">clicando aqui</Link>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Erro404;
