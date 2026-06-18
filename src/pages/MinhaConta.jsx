import { useAuth } from '../contexts/AuthContext';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';

function MinhaConta({ busca, setBusca, categoria, setCategoria, categorias, buscaAberta, setBuscaAberta }) {
  const { usuario, sair } = useAuth();

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
      
      <main className="minha-conta-container">
        <div className="minha-conta-box">
          <h1>Minha Conta</h1>
          
          <div className="minha-conta-info">
            <div className="conta-avatar">
              {usuario?.image ? (
                <img src={usuario.image} alt={usuario.username} />
              ) : (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              )}
            </div>
            
            <div className="conta-dados">
              <h2>Olá, {usuario?.firstName || usuario?.username}!</h2>
              <p className="conta-nome-completo">
                {usuario?.firstName && usuario?.lastName && `${usuario.firstName} ${usuario.lastName}`}
              </p>
              {usuario?.email && (
                <p className="conta-email">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  {usuario.email}
                </p>
              )}
              <p className="conta-username">@{usuario?.username}</p>
            </div>
          </div>
          
          <div className="minha-conta-acoes">
            <h3>Minhas Ações</h3>
            <ul>
              <li>📦 Visualizar pedidos</li>
              <li>❤️ Lista de favoritos</li>
              <li>⚙️ Configurações da conta</li>
              <li>🔒 Alterar senha</li>
            </ul>
          </div>
          
          <button onClick={sair} className="conta-sair-botao">
            Sair da conta
          </button>
        </div>
      </main>
      
      <Rodape />
    </div>
  );
}

export default MinhaConta;
