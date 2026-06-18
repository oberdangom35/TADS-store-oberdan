import { Link, useNavigate } from 'react-router-dom';
import { useCarrinho } from '../contexts/CarrinhoContext';
import Selo from './Selo';

function ProdutoCard({ produto }) {
  const navigate = useNavigate();
  const { adicionarAoCarrinho } = useCarrinho();
  const precoFormatado = produto.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  const freteGratis = produto.price < 100;

  const handleAdicionarCarrinho = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const produtoCarrinho = {
      id: produto.id,
      title: produto.title,
      price: `$${produto.price}`,
      image: produto.thumbnail,
      category: produto.category,
      freteGratis: freteGratis
    };
    adicionarAoCarrinho(produtoCarrinho);
  };

  const handleComprar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const produtoCarrinho = {
      id: produto.id,
      title: produto.title,
      price: `$${produto.price}`,
      image: produto.thumbnail,
      category: produto.category,
      freteGratis: freteGratis
    };
    adicionarAoCarrinho(produtoCarrinho);
    navigate('/carrinho');
  };

  return (
    <div className="produto-card">
      <Link to={`/produto/${produto.id}`} className="produto-card-link">
        <div className="produto-imagem">
          <img src={produto.thumbnail} alt={produto.title} />
          {freteGratis && <Selo texto="Frete Grátis" cor="verde" />}
        </div>
        <div className="produto-info">
          <h3>{produto.title}</h3>
          <p className="produto-descricao">{produto.description}</p>
          <p className="produto-preco">{precoFormatado}</p>
        </div>
      </Link>
      <div className="produto-acoes">
        <button onClick={handleComprar} className="botao">Comprar</button>
        <button onClick={handleAdicionarCarrinho} className="botao botao-secundario">Carrinho</button>
      </div>
    </div>
  );
}

export default ProdutoCard;
