import { Link, useNavigate } from 'react-router-dom';
import { useCarrinho } from '../contexts/CarrinhoContext';
import { useAuth } from '../contexts/AuthContext';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';

function Carrinho({ busca, setBusca, categoria, setCategoria, categorias, buscaAberta, setBuscaAberta }) {
  const { itens, removerDoCarrinho, atualizarQuantidade, totalValor } = useCarrinho();
  const { logado } = useAuth();
  const navigate = useNavigate();

  const todosFreteGratis = itens.length > 0 && itens.every(item => item.freteGratis === true);

  const handleFinalizarCompra = () => {
    if (!logado) {
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="app-container">
      <Cabecalho 
        busca={busca}
        setBusca={setBusca}
        categoria={categoria}
        setCategoria={setCategoria}
        categorias={categorias}
        buscaAberta={buscaAberta}
        setBuscaAberta={setBuscaAberta}
      />
      
      <main className="carrinho-container">
        <h1>Carrinho de Compras</h1>
        
        {itens.length > 0 && (
          <div className="checkout-etapas">
            <div className="checkout-etapa checkout-etapa-ativa">
              <span className="checkout-etapa-numero">1</span>
              <span className="checkout-etapa-texto">Carrinho</span>
            </div>
            <div className="checkout-etapa">
              <span className="checkout-etapa-numero">2</span>
              <span className="checkout-etapa-texto">Endereço</span>
            </div>
            <div className="checkout-etapa">
              <span className="checkout-etapa-numero">3</span>
              <span className="checkout-etapa-texto">Pagamento</span>
            </div>
            <div className="checkout-etapa">
              <span className="checkout-etapa-numero">4</span>
              <span className="checkout-etapa-texto">Confirmação</span>
            </div>
          </div>
        )}
        
        {itens.length === 0 ? (
          <div className="carrinho-vazio">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <p>Seu carrinho está vazio</p>
            <Link to="/" className="carrinho-voltar-link">
              ← Voltar para a Loja
            </Link>
          </div>
        ) : (
          <div className="carrinho-conteudo">
            <div className="carrinho-itens">
              {itens.map(item => (
                <div key={item.id} className="carrinho-item">
                  <img src={item.image} alt={item.title} className="carrinho-item-imagem" />
                  
                  <div className="carrinho-item-info">
                    <Link to={`/produto/${item.id}`} className="carrinho-item-titulo">{item.title}</Link>
                  </div>
                  
                  <div className="carrinho-item-quantidade">
                    <button 
                      onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                      className="carrinho-quantidade-btn"
                    >
                      -
                    </button>
                    <span className="carrinho-quantidade-valor">{item.quantidade}</span>
                    <button 
                      onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                      className="carrinho-quantidade-btn"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="carrinho-item-preco">
                    <span className="carrinho-preco-total">
                      R$ {(parseFloat(item.price.replace('$', '')) * item.quantidade).toFixed(2)}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => removerDoCarrinho(item.id)}
                    className="carrinho-item-remover"
                    title="Remover item"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="carrinho-resumo">
              <h2>Resumo do Pedido</h2>
              
              <div className="carrinho-resumo-linha">
                <span>Subtotal ({itens.reduce((total, item) => total + item.quantidade, 0)} itens)</span>
                <span>R$ {totalValor.toFixed(2)}</span>
              </div>
              
              {todosFreteGratis && (
                <div className="carrinho-resumo-linha">
                  <span>Frete</span>
                  <span className="carrinho-frete-gratis">Grátis</span>
                </div>
              )}
              
              <div className="carrinho-resumo-total">
                <span>Total</span>
                <span>R$ {totalValor.toFixed(2)}</span>
              </div>
              
              <button onClick={handleFinalizarCompra} className="carrinho-finalizar-btn">
                Continuar para Endereço
              </button>
              
              <Link to="/" className="carrinho-continuar-link">
                ← Continuar comprando
              </Link>
            </div>
          </div>
        )}
      </main>
      
      <Rodape />
    </div>
  );
}

export default Carrinho;
