import Botao from './Botao';
import Selo from './Selo';

function ProdutoCard({ produto }) {
  const precoFormatado = produto.preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  return (
    <div className="produto-card">
      <div className="produto-imagem">
        <img src={produto.imagem} alt={produto.nome} />
        {produto.freteGratis && <Selo texto="Frete Grátis" cor="verde" />}
      </div>
      <div className="produto-info">
        <h3>{produto.nome}</h3>
        <p className="produto-descricao">{produto.descricao}</p>
        <p className="produto-preco">{precoFormatado}</p>
        <div className="produto-acoes">
          <Botao texto="Comprar" />
          <button className="botao botao-secundario">Carrinho</button>
        </div>
      </div>
    </div>
  );
}

export default ProdutoCard;
