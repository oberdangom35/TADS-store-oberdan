import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const AuthContext = createContext();

const INACTIVITY_TIMEOUT = 10 * 60 * 1000;

export function AuthProvider({ children }) {
  const [logado, setLogado] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const inactivityTimerRef = useRef(null);
  const tokenExpirationRef = useRef(null);

  const limparSessao = useCallback(() => {
    localStorage.removeItem('tads-store-token');
    localStorage.removeItem('tads-store-refresh-token');
    localStorage.removeItem('tads-store-user');
    localStorage.removeItem('tads-store-expiration');
    setLogado(false);
    setUsuario(null);
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    if (tokenExpirationRef.current) {
      clearTimeout(tokenExpirationRef.current);
    }
  }, []);

  const renovarExpiracao = useCallback(() => {
    const novaExpiracao = Date.now() + INACTIVITY_TIMEOUT;
    localStorage.setItem('tads-store-expiration', novaExpiracao.toString());
    
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    inactivityTimerRef.current = setTimeout(() => {
      limparSessao();
      window.location.href = '/login';
    }, INACTIVITY_TIMEOUT);
  }, [limparSessao]);

  const verificarToken = useCallback(() => {
    const token = localStorage.getItem('tads-store-token');
    const expiracao = localStorage.getItem('tads-store-expiration');
    const dadosUsuario = localStorage.getItem('tads-store-user');
    
    if (token && expiracao && dadosUsuario) {
      const agora = Date.now();
      const tempoExpiracao = parseInt(expiracao, 10);
      
      if (agora < tempoExpiracao) {
        setLogado(true);
        setUsuario(JSON.parse(dadosUsuario));
        renovarExpiracao();
        return true;
      } else {
        limparSessao();
      }
    }
    return false;
  }, [limparSessao, renovarExpiracao]);

  useEffect(() => {
    verificarToken();
    setCarregando(false);
    
    const eventos = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    
    const handleAtividade = () => {
      if (logado) {
        renovarExpiracao();
      }
    };
    
    eventos.forEach(evento => {
      document.addEventListener(evento, handleAtividade);
    });
    
    return () => {
      eventos.forEach(evento => {
        document.removeEventListener(evento, handleAtividade);
      });
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      if (tokenExpirationRef.current) {
        clearTimeout(tokenExpirationRef.current);
      }
    };
  }, [logado, verificarToken, renovarExpiracao]);

  const entrar = async (nomeUsuario, senha) => {
    try {
      const resposta = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: nomeUsuario,
          password: senha,
          expiresInMins: 30
        })
      });

      if (!resposta.ok) {
        const erro = await resposta.json();
        return { 
          sucesso: false, 
          erro: erro.message || 'Usuário ou senha incorretos' 
        };
      }

      const dados = await resposta.json();
      
      const respostaUsuario = await fetch(`https://dummyjson.com/users/${dados.id}`);
      const dadosCompletos = await respostaUsuario.json();
      
      localStorage.setItem('tads-store-token', dados.accessToken);
      localStorage.setItem('tads-store-refresh-token', dados.refreshToken);
      localStorage.setItem('tads-store-user', JSON.stringify({
        id: dadosCompletos.id,
        username: dadosCompletos.username,
        email: dadosCompletos.email,
        firstName: dadosCompletos.firstName,
        lastName: dadosCompletos.lastName,
        maidenName: dadosCompletos.maidenName,
        age: dadosCompletos.age,
        gender: dadosCompletos.gender,
        phone: dadosCompletos.phone,
        birthDate: dadosCompletos.birthDate,
        image: dadosCompletos.image,
        password: dadosCompletos.password,
        address: dadosCompletos.address,
        bank: dadosCompletos.bank
      }));
      
      const expiracao = Date.now() + INACTIVITY_TIMEOUT;
      localStorage.setItem('tads-store-expiration', expiracao.toString());
      
      setLogado(true);
      setUsuario({
        id: dadosCompletos.id,
        username: dadosCompletos.username,
        email: dadosCompletos.email,
        firstName: dadosCompletos.firstName,
        lastName: dadosCompletos.lastName,
        maidenName: dadosCompletos.maidenName,
        age: dadosCompletos.age,
        gender: dadosCompletos.gender,
        phone: dadosCompletos.phone,
        birthDate: dadosCompletos.birthDate,
        image: dadosCompletos.image,
        password: dadosCompletos.password,
        address: dadosCompletos.address,
        bank: dadosCompletos.bank
      });
      
      renovarExpiracao();
      
      return { sucesso: true };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return { 
        sucesso: false, 
        erro: 'Erro ao conectar com o servidor. Tente novamente.' 
      };
    }
  };

  const sair = () => {
    limparSessao();
  };

  return (
    <AuthContext.Provider value={{ 
      logado, 
      usuario, 
      entrar, 
      sair, 
      carregando,
      renovarExpiracao 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
