import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';

function MeusPedidos({ busca, setBusca, categoria, setCategoria, categorias, buscaAberta, setBuscaAberta }) {
  const { usuario } = useAuth();

  const obterSaudacao = () => {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) {
      return 'Bom dia';
    } else if (hora >= 12 && hora < 18) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
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
      
      <main className="minha-conta-page">
        <div className="minha-conta-header">
          <div className="conta-card-azul">
            <div className="conta-avatar">
              {usuario?.image ? (
                <img src={usuario.image} alt={usuario.username} />
              ) : (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              )}
            </div>
            <div className="conta-card-info">
              <h1>{obterSaudacao()}, {usuario?.firstName && usuario?.lastName ? `${usuario.firstName} ${usuario.lastName}` : usuario?.firstName || usuario?.username}!</h1>
              <p>{usuario?.email || usuario?.username}</p>
            </div>
          </div>
        </div>

        <div className="minha-conta-content">
          <aside className="conta-menu">
            <Link to="/minha-conta" className="conta-menu-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Minha Conta
            </Link>
            <Link to="/meus-enderecos" className="conta-menu-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Meus Endereços
            </Link>
            <Link to="/meus-cartoes" className="conta-menu-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
              Meus Cartões
            </Link>
            <Link to="/meus-pedidos" className="conta-menu-item ativo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              Meus Pedidos
            </Link>
          </aside>

          <div className="conta-dados-area">
            <div className="conta-secao">
              <h2>Meus Pedidos</h2>
              <div className="conta-vazio">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <p><strong>Funcionalidade de Projeto Acadêmico</strong></p>
                <p style={{ marginTop: '1rem', color: 'var(--cor-texto-secundario)', maxWidth: '700px', textAlign: 'justify',lineHeight: '1.6' }}>
                  Em uma loja real, aqui seriam exibidos todos os seus pedidos realizados, 
                  permitindo acompanhar o status de entrega, rastrear encomendas, 
                  visualizar detalhes dos produtos comprados e histórico completo de compras.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Rodape />
    </div>
  );
}

export default MeusPedidos;
