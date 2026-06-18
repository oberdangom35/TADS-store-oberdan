import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../contexts/CarrinhoContext';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';

function Confirmacao({ busca, setBusca, categoria, setCategoria, categorias, buscaAberta, setBuscaAberta }) {
  const { limparCarrinho } = useCarrinho();
  
  useEffect(() => {
    limparCarrinho();
  }, [limparCarrinho]);

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
      
      <main className="confirmacao-container">
        <div className="confirmacao-conteudo">
          <div className="confirmacao-titulo">
            <h1>Pedido Realizado com Sucesso!</h1>
            <div className="confirmacao-icone">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
          
          <div className="confirmacao-aviso">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <div>
              <h2>Projeto Acadêmico</h2>
              <p>
                Este é um projeto desenvolvido para fins educacionais. 
                Nenhuma transação financeira real foi processada. 
                As rotinas de pagamento não são executadas, mas seu pedido foi registrado com sucesso no sistema.
              </p>
            </div>
          </div>
          
          <div className="confirmacao-info">
            <h3>Próximos Passos</h3>
            <ul>
              <li>Em um sistema real, você receberia um e-mail de confirmação;</li>
              <li>O pedido seria processado e enviado para o endereço informado;</li>
              <li>Você poderia acompanhar o status do pagamento, da entrega, todo histórico 
                de pedidos, na página <Link to="/meus-pedidos">Meus Pedidos.</Link>  </li>
            </ul>
          </div>
        </div>
      </main>
      
      <Rodape />
    </div>
  );
}

export default Confirmacao;
