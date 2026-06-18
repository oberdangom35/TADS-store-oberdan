import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCarrinho } from '../contexts/CarrinhoContext';
import logo from '../assets/images/logo/logo.png';

function Cabecalho({ busca, setBusca, categoria, setCategoria, categorias, buscaAberta, setBuscaAberta }) {
  const [menuCategoriaAberto, setMenuCategoriaAberto] = useState(false);
  const [menuUsuarioAberto, setMenuUsuarioAberto] = useState(false);
  const [categoriasVisiveis, setCategoriasVisiveis] = useState([]);
  const [categoriasOcultas, setCategoriasOcultas] = useState([]);
  const categoriasRef = useRef(null);
  const usuarioRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { logado, sair, usuario } = useAuth();
  const { totalItens } = useCarrinho();

  const toggleBusca = () => {
    setBuscaAberta(!buscaAberta);
  };

  const limparBusca = () => {
    setBusca('');
  };

  const handleBuscaChange = (e) => {
    const novaBusca = e.target.value;
    setBusca(novaBusca);
    if (!buscaAberta) {
      setBuscaAberta(true);
    }
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const selecionarCategoria = (slug) => {
    setCategoria(slug);
    setMenuCategoriaAberto(false);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const toggleMenuCategoria = () => {
    setMenuCategoriaAberto(!menuCategoriaAberto);
  };

  const voltarHome = () => {
    setBusca('');
    setCategoria('all');
  };

  useEffect(() => {
    const calcularCategoriasVisiveis = () => {
      if (!categorias || categorias.length === 0) return;
      
      const larguraTela = window.innerWidth;
      let maxVisiveis;
      
      if (larguraTela >= 1200) {
        maxVisiveis = 7;
      } else if (larguraTela >= 900) {
        maxVisiveis = 6;
      } else if (larguraTela >= 700) {
        maxVisiveis = 5;
      } else if (larguraTela >= 500) {
        maxVisiveis = 3;
      } else {
        maxVisiveis = 2;
      }
      
      const visiveis = categorias.slice(0, maxVisiveis);
      const ocultas = categorias.slice(maxVisiveis);
      
      setCategoriasVisiveis(visiveis);
      setCategoriasOcultas(ocultas);
    };
    
    calcularCategoriasVisiveis();
    window.addEventListener('resize', calcularCategoriasVisiveis);
    
    return () => window.removeEventListener('resize', calcularCategoriasVisiveis);
  }, [categorias]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriasRef.current && !categoriasRef.current.contains(event.target)) {
        setMenuCategoriaAberto(false);
      }
      if (usuarioRef.current && !usuarioRef.current.contains(event.target)) {
        setMenuUsuarioAberto(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (busca && busca.length > 0) {
      setBuscaAberta(true);
    }
  }, [busca]);

  return (
    <header className="cabecalho">
      <div className="cabecalho-container">
        <Link to="/" className="cabecalho-logo" onClick={voltarHome}>
          <img src={logo} alt="TADS Store - Oberdan" />
        </Link>
        <nav>
          <ul>
            <li className="cabecalho-busca-item">
              {buscaAberta ? (
                <div className="cabecalho-busca-container">
                  <input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={busca}
                    onChange={handleBuscaChange}
                    className="cabecalho-busca-input"
                    autoFocus
                    autoComplete="off"
                  />
                  {busca && (
                    <button onClick={limparBusca} className="cabecalho-busca-limpar">
                      ✕
                    </button>
                  )}
                  <button onClick={toggleBusca} className="cabecalho-busca-fechar">
                    ✓
                  </button>
                </div>
              ) : (
                <button onClick={toggleBusca} className="cabecalho-busca-btn" title="Buscar produtos">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  {busca && <span className="cabecalho-busca-badge"></span>}
                </button>
              )}
            </li>
            <li className="cabecalho-icone-item">
              <button 
                className="cabecalho-icone-btn cabecalho-carrinho-btn" 
                title="Carrinho de compras"
                onClick={() => navigate('/carrinho')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {totalItens > 0 && (
                  <span className="cabecalho-carrinho-badge">{totalItens}</span>
                )}
              </button>
            </li>
            <li className="cabecalho-icone-item cabecalho-usuario-wrapper" ref={usuarioRef}>
              {logado ? (
                <>
                  <button 
                    className="cabecalho-icone-btn cabecalho-usuario-btn" 
                    title="Minha Conta"
                    onClick={() => setMenuUsuarioAberto(!menuUsuarioAberto)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span className="cabecalho-usuario-status"></span>
                  </button>
                  
                  {menuUsuarioAberto && (
                    <div className="cabecalho-usuario-dropdown">
                      <div className="cabecalho-usuario-info">
                        <strong>{usuario?.firstName || usuario?.username}</strong>
                        {usuario?.email && <span>{usuario.email}</span>}
                      </div>
                      <div className="cabecalho-usuario-divider"></div>
                      <button 
                        className="cabecalho-usuario-item"
                        onClick={() => {
                          setMenuUsuarioAberto(false);
                          navigate('/minha-conta');
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        Minha Conta
                      </button>
                      <button 
                        className="cabecalho-usuario-item"
                        onClick={() => {
                          setMenuUsuarioAberto(false);
                          navigate('/meus-pedidos');
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                        Meus Pedidos
                      </button>
                      <div className="cabecalho-usuario-divider"></div>
                      <button 
                        className="cabecalho-usuario-item cabecalho-usuario-sair"
                        onClick={() => {
                          setMenuUsuarioAberto(false);
                          sair();
                          navigate('/');
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Sair
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login" className="cabecalho-icone-btn" title="Entrar">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
      
      {categorias && categorias.length > 0 && (
        <div className="cabecalho-categorias" ref={categoriasRef}>
          <span 
            className={`categoria-link ${categoria === 'all' ? 'ativa' : ''}`}
            onClick={() => selecionarCategoria('all')}
          >
            Todas as Categorias
          </span>
          
          {categoriasVisiveis && categoriasVisiveis.map((cat) => (
            <span key={cat.slug}>
              <span className="categoria-separador">|</span>
              <span
                className={`categoria-link ${categoria === cat.slug ? 'ativa' : ''}`}
                onClick={() => selecionarCategoria(cat.slug)}
              >
                {cat.name}
              </span>
            </span>
          ))}

          {categoriasOcultas && categoriasOcultas.length > 0 && (
            <>
              <span className="categoria-separador">|</span>
              <div className="categoria-mais-wrapper">
                <span 
                  className="categoria-link categoria-mais"
                  onClick={toggleMenuCategoria}
                >
                  Mais
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>

                {menuCategoriaAberto && (
                  <div className="categoria-dropdown">
                    {categoriasOcultas.map((cat) => (
                      <div
                        key={cat.slug}
                        className={`categoria-dropdown-item ${categoria === cat.slug ? 'ativa' : ''}`}
                        onClick={() => selecionarCategoria(cat.slug)}
                      >
                        {cat.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Cabecalho;
