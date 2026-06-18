import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';

function Login({ busca, setBusca, categoria, setCategoria, categorias, buscaAberta, setBuscaAberta }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregandoLogin, setCarregandoLogin] = useState(false);
  const { entrar, logado } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from || '/minha-conta';

  if (logado) {
    navigate(from);
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregandoLogin(true);
    
    try {
      const resultado = await entrar(usuario, senha);
      
      if (resultado.sucesso) {
        navigate(from);
      } else {
        setErro(resultado.erro);
      }
    } catch (error) {
      setErro('Erro ao fazer login. Tente novamente.');
    } finally {
      setCarregandoLogin(false);
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
      
      <main className="login-container">
        <div className="login-conteudo">
          <h1>Login</h1>
          
          <div className="login-form-wrapper">
            <p className="login-subtitulo">Entre com sua conta para acessar</p>
            
            <form onSubmit={handleSubmit} className="login-form">
          <div className="login-campo">
            <label htmlFor="usuario">Usuário:</label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Digite seu usuário"
              required
            />
          </div>
          
          <div className="login-campo">
            <label htmlFor="senha">Senha:</label>
            <div className="login-senha-wrapper">
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
              <button
                type="button"
                className="login-toggle-senha"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {mostrarSenha ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {erro && <p className="login-erro">{erro}</p>}
          
          <div className="login-botao-container">
            <button type="submit" className="login-botao" disabled={carregandoLogin}>
              {carregandoLogin ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
          </div>
        </div>
        
        <Link to="/" className="login-voltar">
          ← Voltar para a loja
        </Link>
      </main>
      
      <Rodape />
    </div>
  );
}

export default Login;
