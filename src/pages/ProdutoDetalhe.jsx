import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Selo from '../components/Selo';

function ProdutoDetalhe({ busca, setBusca, categoria, setCategoria, categorias, buscaAberta, setBuscaAberta }) {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [imagemSelecionada, setImagemSelecionada] = useState(0);

  useEffect(() => {
    const buscarProduto = async () => {
      try {
        setCarregando(true);
        setErro(null);
        
        const resposta = await fetch(`https://dummyjson.com/products/${id}`);
        
        if (!resposta.ok) {
          throw new Error('Produto não encontrado');
        }
        
        const dados = await resposta.json();
        setProduto(dados);
      } catch (error) {
        setErro('Não foi possível carregar o produto. Tente novamente mais tarde.');
        console.error('Erro ao buscar produto:', error);
      } finally {
        setCarregando(false);
      }
    };

    buscarProduto();
  }, [id]);

  if (carregando) {
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
        <div className="produto-detalhe-carregando">
          <div className="spinner"></div>
          <p>Carregando produto...</p>
        </div>
      </Layout>
    );
  }

  if (erro || !produto) {
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
        <div className="produto-detalhe-erro">
          <h2>Produto não encontrado</h2>
          <p>{erro || 'O produto que você procura não existe.'}</p>
          <Link to="/" className="botao">Voltar para a loja</Link>
        </div>
      </Layout>
    );
  }

  const precoFormatado = produto.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  const freteGratis = produto.price < 100;
  const desconto = produto.discountPercentage;

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
      <div className="produto-detalhe">
        <div className="produto-detalhe-container">
          <Link to="/" className="produto-detalhe-voltar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Voltar
          </Link>

          <div className="produto-detalhe-grid">
            {/* QUADRANTE 1: Imagem do Produto (Superior Esquerdo) */}
            <div className="produto-detalhe-quadrante-1">
              <div className="produto-detalhe-imagem-principal">
                <img src={produto.images?.[imagemSelecionada] || produto.thumbnail} alt={produto.title} />
                {freteGratis && <Selo texto="Frete Grátis" cor="verde" />}
                
                {produto.images && produto.images.length > 1 && (
                  <div className="produto-detalhe-miniaturas">
                    {produto.images.slice(0, 4).map((img, index) => (
                      <img 
                        key={index} 
                        src={img} 
                        alt={`${produto.title} - ${index + 1}`}
                        className={imagemSelecionada === index ? 'ativa' : ''}
                        onClick={() => setImagemSelecionada(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* QUADRANTE 2: Info, Preço e Botões (Superior Direito) */}
            <div className="produto-detalhe-quadrante-2">
              <h1 className="produto-detalhe-titulo">{produto.title}</h1>
              
              <div className="produto-detalhe-avaliacao">
                <div className="produto-detalhe-estrelas">
                  {'★'.repeat(Math.round(produto.rating))}
                  {'☆'.repeat(5 - Math.round(produto.rating))}
                </div>
                <span className="produto-detalhe-rating">
                  {produto.rating.toFixed(1)}
                </span>
              </div>

              <p className="produto-detalhe-descricao">{produto.description}</p>

              <div className="produto-detalhe-preco-container">
                <div className="produto-detalhe-precos">
                  {desconto > 0 && (
                    <div className="produto-detalhe-preco-antigo">
                      <p className="produto-detalhe-preco-original">
                        {(produto.price / (1 - desconto / 100)).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL"
                        })}
                      </p>
                      <Selo texto={`${desconto.toFixed(0)}% OFF`} cor="desconto" />
                    </div>
                  )}
                  <div className="produto-detalhe-preco-e-acoes">
                    <p className="produto-detalhe-preco">{precoFormatado}</p>
                    <div className="produto-detalhe-acoes">
                      <button className="botao">Comprar</button>
                      <button className="botao botao-secundario">Carrinho</button>
                    </div>
                  </div>
                </div>
              </div>

              {produto.tags && produto.tags.length > 0 && (
                <div className="produto-detalhe-tags">
                  <strong>Tags:</strong>
                  {produto.tags.map((tag, index) => (
                    <span key={index} className="produto-detalhe-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {/* QUADRANTE 3: Detalhes do Produto (Inferior Esquerdo) */}
            <div className="produto-detalhe-quadrante-3">
              <div className="produto-detalhe-detalhes">
                <h3>Detalhes do Produto</h3>
                <ul>
                  <li><strong>Marca:</strong> {produto.brand || 'Não informado'}</li>
                  <li><strong>Categoria:</strong> {produto.category}</li>
                  <li><strong>SKU:</strong> {produto.sku}</li>
                  <li><strong>Peso:</strong> {produto.weight}g</li>
                  <li><strong>Dimensões:</strong> {produto.dimensions?.width} x {produto.dimensions?.height} x {produto.dimensions?.depth} cm</li>
                  <li><strong>Garantia:</strong> {produto.warrantyInformation || 'Não informado'}</li>
                  <li><strong>Envio:</strong> {produto.shippingInformation || 'Consulte o prazo'}</li>
                </ul>
              </div>
            </div>

            {/* QUADRANTE 4: Avaliações dos Clientes (Inferior Direito) */}
            <div className="produto-detalhe-quadrante-4">
              {produto.reviews && produto.reviews.length > 0 && (
                <div className="produto-detalhe-avaliacoes">
                  <h3>Avaliações dos Clientes</h3>
                  <div className="produto-detalhe-avaliacoes-lista">
                    {produto.reviews.map((review, index) => (
                      <div key={index}>
                        {index > 0 && <div className="produto-detalhe-avaliacao-divisor"></div>}
                        <div className="produto-detalhe-avaliacao-item">
                          <div className="produto-detalhe-avaliacao-header">
                            <strong>{review.reviewerName}</strong>
                            <div className="produto-detalhe-estrelas">
                              {'★'.repeat(review.rating)}
                              {'☆'.repeat(5 - review.rating)}
                            </div>
                            <span className="produto-detalhe-avaliacao-data">
                              {new Date(review.date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <p className="produto-detalhe-avaliacao-comentario">{review.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProdutoDetalhe;
