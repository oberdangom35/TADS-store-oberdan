import { Link } from 'react-router-dom';
import Botao from './Botao';
import Selo from './Selo';

function ProdutoCard({ produto }) {
  const precoFormatado = produto.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  const freteGratis = produto.price < 100;

  return (
    <Link to={`/produto/${produto.id}`} className="produto-card-link">
      <div className="produto-card">
        <div className="produto-imagem">
          <img src={produto.thumbnail} alt={produto.title} />
          {freteGratis && <Selo texto="Frete Grátis" cor="verde" />}
        </div>
        <div className="produto-info">
          <h3>{produto.title}</h3>
          <p className="produto-descricao">{produto.description}</p>
          <p className="produto-preco">{precoFormatado}</p>
          <div className="produto-acoes">
            <Botao texto="Comprar" />
            <button className="botao botao-secundario">Carrinho</button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProdutoCard;
