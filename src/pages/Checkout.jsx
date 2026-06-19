import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCarrinho } from '../contexts/CarrinhoContext';
import { useAuth } from '../contexts/AuthContext';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';

function Checkout({ busca, setBusca, categoria, setCategoria, categorias, buscaAberta, setBuscaAberta }) {
  const { itens, totalValor } = useCarrinho();
  const { usuario } = useAuth();
  const navigate = useNavigate();
  
  const todosFreteGratis = itens.length > 0 && itens.every(item => item.freteGratis === true);
  
  const [etapa, setEtapa] = useState('endereco');
  const [tipoEndereco, setTipoEndereco] = useState(() => {
    return localStorage.getItem('tads-store-tipo-endereco') || 'padrao';
  });
  
  const [endereco, setEndereco] = useState({
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  });
  
  const [carregandoCep, setCarregandoCep] = useState(false);
  const [erroCep, setErroCep] = useState('');
  
  const [pagamento, setPagamento] = useState({
    tipo: 'cartao',
    numeroCartao: '',
    nomeCartao: '',
    validade: '',
    cvv: '',
    parcelas: 1
  });

  useEffect(() => {
    if (usuario?.bank) {
      const nomeCompleto = usuario?.firstName && usuario?.maidenName && usuario?.lastName 
        ? `${usuario.firstName} ${usuario.maidenName} ${usuario.lastName}`
        : usuario?.firstName && usuario?.lastName 
        ? `${usuario.firstName} ${usuario.lastName}`
        : usuario?.firstName || '';
      
      const cvv = String(Math.floor(Math.random() * 900) + 100);
      
      setPagamento(prev => ({
        ...prev,
        numeroCartao: usuario.bank.cardNumber || '',
        nomeCartao: nomeCompleto,
        validade: usuario.bank.cardExpire || '',
        cvv: cvv
      }));
    }
  }, [usuario]);

  useEffect(() => {
    localStorage.setItem('tads-store-tipo-endereco', tipoEndereco);
  }, [tipoEndereco]);

  useEffect(() => {
    const buscarCep = async () => {
      const cepLimpo = endereco.cep.replace(/\D/g, '');
      
      if (cepLimpo.length === 8) {
        setCarregandoCep(true);
        setErroCep('');
        
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
          const data = await response.json();
          
          if (data.erro) {
            setErroCep('CEP não encontrado');
          } else {
            setEndereco(prev => ({
              ...prev,
              rua: data.logradouro || '',
              bairro: data.bairro || '',
              cidade: data.localidade || '',
              estado: data.uf || ''
            }));
          }
        } catch (error) {
          setErroCep('Erro ao buscar CEP');
        } finally {
          setCarregandoCep(false);
        }
      }
    };
    
    buscarCep();
  }, [endereco.cep]);

  if (itens.length === 0) {
    navigate('/carrinho');
    return null;
  }

  const formatarCep = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    if (apenasNumeros.length <= 5) {
      return apenasNumeros;
    }
    return `${apenasNumeros.slice(0, 5)}-${apenasNumeros.slice(5, 8)}`;
  };

  const handleCepChange = (e) => {
    const valorFormatado = formatarCep(e.target.value);
    setEndereco({...endereco, cep: valorFormatado});
  };

  const avancarParaPagamento = () => {
    if (tipoEndereco === 'padrao') {
      setEtapa('pagamento');
      return;
    }
    
    if (!endereco.cep || !endereco.rua || !endereco.numero || !endereco.bairro || !endereco.cidade || !endereco.estado) {
      alert('Por favor, preencha todos os campos obrigatórios do endereço.');
      return;
    }
    
    setEtapa('pagamento');
  };

  const handleEnderecoSubmit = (e) => {
    e.preventDefault();
    avancarParaPagamento();
  };

  const handlePagamentoSubmit = (e) => {
    e.preventDefault();
    
    const enderecoFinal = tipoEndereco === 'padrao' 
      ? {
          rua: usuario?.address?.address || '',
          cidade: usuario?.address?.city || '',
          estado: usuario?.address?.state || '',
          cep: usuario?.address?.postalCode || ''
        }
      : endereco;
    
    navigate('/confirmacao', {
      state: {
        endereco: enderecoFinal,
        pagamento: pagamento
      }
    });
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
      
      <main className="checkout-container">
        <h1>{etapa === 'endereco' ? 'Endereço de Entrega' : 'Informações de Pagamento'}</h1>
        
        <div className="checkout-etapas">
          <div className="checkout-etapa checkout-etapa-concluida">
            <span className="checkout-etapa-numero">1</span>
            <span className="checkout-etapa-texto">Carrinho</span>
          </div>
          <div className={`checkout-etapa ${etapa === 'endereco' ? 'checkout-etapa-ativa' : 'checkout-etapa-concluida'}`}>
            <span className="checkout-etapa-numero">2</span>
            <span className="checkout-etapa-texto">Endereço</span>
          </div>
          <div className={`checkout-etapa ${etapa === 'pagamento' ? 'checkout-etapa-ativa' : ''}`}>
            <span className="checkout-etapa-numero">3</span>
            <span className="checkout-etapa-texto">Pagamento</span>
          </div>
          <div className="checkout-etapa">
            <span className="checkout-etapa-numero">4</span>
            <span className="checkout-etapa-texto">Confirmação</span>
          </div>
        </div>
        
        <div className="checkout-conteudo">
          <div className="checkout-formulario">
            {etapa === 'endereco' ? (
              <form onSubmit={handleEnderecoSubmit} className="checkout-form">
                <h2>Endereço de Entrega</h2>
                
                <div className="checkout-tipo-endereco">
                  <button
                    type="button"
                    className={tipoEndereco === 'padrao' ? 'ativo' : ''}
                    onClick={() => setTipoEndereco('padrao')}
                  >
                    Endereço Padrão
                  </button>
                  <button
                    type="button"
                    className={tipoEndereco === 'outro' ? 'ativo' : ''}
                    onClick={() => setTipoEndereco('outro')}
                  >
                    Outro Endereço
                  </button>
                </div>

                {tipoEndereco === 'padrao' ? (
                  <>
                    <div className="checkout-campo-grupo">
                      <div className="checkout-campo checkout-campo-pequeno">
                        <label>CEP</label>
                        <input
                          type="text"
                          value={usuario?.address?.postalCode || ''}
                          disabled
                          placeholder="Não informado"
                        />
                      </div>
                      
                      <div className="checkout-campo">
                        <label>Rua</label>
                        <input
                          type="text"
                          value={usuario?.address?.address || ''}
                          disabled
                          placeholder="Não informado"
                        />
                      </div>
                    </div>
                    
                    <div className="checkout-campo-grupo checkout-campo-grupo-tres">
                      <div className="checkout-campo">
                        <label>Bairro</label>
                        <input
                          type="text"
                          value={usuario?.address?.address?.split(',')[1]?.trim() || 'Centro'}
                          disabled
                          placeholder="Não informado"
                        />
                      </div>
                      
                      <div className="checkout-campo">
                        <label>Cidade</label>
                        <input
                          type="text"
                          value={usuario?.address?.city || ''}
                          disabled
                          placeholder="Não informado"
                        />
                      </div>
                      
                      <div className="checkout-campo checkout-campo-pequeno">
                        <label>Estado</label>
                        <input
                          type="text"
                          value={usuario?.address?.state || ''}
                          disabled
                          placeholder="UF"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                <div className="checkout-campo-grupo">
                  <div className="checkout-campo checkout-campo-pequeno">
                    <label htmlFor="cep">CEP<span class="asterisco-vermelho">*</span></label>
                    <input
                      id="cep"
                      type="text"
                      value={endereco.cep}
                      onChange={handleCepChange}
                      placeholder="00000-000"
                      maxLength="9"
                      required
                    />
                    {carregandoCep && <span className="checkout-campo-info">Buscando CEP...</span>}
                    {erroCep && <span className="checkout-campo-erro">{erroCep}</span>}
                  </div>
                  
                  <div className="checkout-campo">
                    <label htmlFor="rua">Rua<span class="asterisco-vermelho">*</span></label>
                    <input
                      id="rua"
                      type="text"
                      value={endereco.rua}
                      onChange={(e) => setEndereco({...endereco, rua: e.target.value})}
                      disabled={carregandoCep}
                      required
                    />
                  </div>
                </div>
                
                <div className="checkout-campo-grupo">
                  
                  <div className="checkout-campo checkout-campo-pequeno">
                    <label htmlFor="numero">Número<span class="asterisco-vermelho">*</span></label>
                    <input
                      id="numero"
                      type="text"
                      value={endereco.numero}
                      onChange={(e) => setEndereco({...endereco, numero: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="checkout-campo">
                    <label htmlFor="complemento">Complemento</label>
                    <input
                      id="complemento"
                      type="text"
                      value={endereco.complemento}
                      onChange={(e) => setEndereco({...endereco, complemento: e.target.value})}
                      placeholder="Apto, bloco, etc (opcional)"
                    />
                  </div>
                </div>
                
                <div className="checkout-campo-grupo checkout-campo-grupo-tres">
                  <div className="checkout-campo">
                    <label htmlFor="bairro">Bairro<span class="asterisco-vermelho">*</span></label>
                    <input
                      id="bairro"
                      type="text"
                      value={endereco.bairro}
                      onChange={(e) => setEndereco({...endereco, bairro: e.target.value})}
                      disabled={carregandoCep}
                      required
                    />
                  </div>
                  
                  <div className="checkout-campo">
                    <label htmlFor="cidade">Cidade<span class="asterisco-vermelho">*</span></label>
                    <input
                      id="cidade"
                      type="text"
                      value={endereco.cidade}
                      onChange={(e) => setEndereco({...endereco, cidade: e.target.value})}
                      disabled={carregandoCep}
                      required
                    />
                  </div>
                  
                  <div className="checkout-campo checkout-campo-pequeno">
                    <label htmlFor="estado">Estado<span class="asterisco-vermelho">*</span></label>
                    <input
                      id="estado"
                      type="text"
                      value={endereco.estado}
                      onChange={(e) => setEndereco({...endereco, estado: e.target.value.toUpperCase()})}
                      disabled={carregandoCep}
                      maxLength="2"
                      placeholder="UF"
                      style={{textTransform: 'uppercase'}}
                      required
                    />
                  </div>
                </div>
                  </>
                )}
              </form>
            ) : (
              <form onSubmit={handlePagamentoSubmit} className="checkout-form">
                <h2>Informações de Pagamento - <span className="checkout-aviso-ficticios">⚠️ Dados Fictícios ⚠️</span></h2>
                
                <div className="checkout-tipo-pagamento">
                  <label className="checkout-radio">
                    <input
                      type="radio"
                      name="tipoPagamento"
                      value="cartao"
                      checked={pagamento.tipo === 'cartao'}
                      onChange={(e) => setPagamento({...pagamento, tipo: e.target.value})}
                    />
                    <span>Cartão de Crédito</span>
                  </label>
                </div>
                
                <>
                    <div className="checkout-campo-grupo">
                      <div className="checkout-campo checkout-campo-cartao">
                        <label htmlFor="numeroCartao">Número do Cartão<span class="asterisco-vermelho">*</span></label>
                        <input
                          id="numeroCartao"
                          type="text"
                          value={pagamento.numeroCartao}
                          disabled
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>
                      
                      <div className="checkout-campo">
                        <label htmlFor="nomeCartao">Nome no Cartão<span class="asterisco-vermelho">*</span></label>
                        <input
                          id="nomeCartao"
                          type="text"
                          value={pagamento.nomeCartao}
                          onChange={(e) => setPagamento({...pagamento, nomeCartao: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="checkout-campo-grupo checkout-campo-grupo-tres">
                      <div className="checkout-campo">
                        <label htmlFor="validade">Validade<span class="asterisco-vermelho">*</span></label>
                        <input
                          id="validade"
                          type="text"
                          value={pagamento.validade}
                          disabled
                          placeholder="MM/AA"
                        />
                      </div>
                      
                      <div className="checkout-campo checkout-campo-pequeno">
                        <label htmlFor="cvv">CVV<span class="asterisco-vermelho">*</span></label>
                        <input
                          id="cvv"
                          type="text"
                          value={pagamento.cvv}
                          disabled
                          placeholder="000"
                          maxLength="3"
                        />
                      </div>
                      
                      <div className="checkout-campo">
                        <label htmlFor="parcelas">Parcelamento<span class="asterisco-vermelho">*</span></label>
                        <select
                          id="parcelas"
                          value={pagamento.parcelas}
                          onChange={(e) => setPagamento({...pagamento, parcelas: parseInt(e.target.value)})}
                          className="checkout-select"
                        >
                          {[...Array(10)].map((_, i) => {
                            const numParcelas = i + 1;
                            const valorParcela = (totalValor / numParcelas).toFixed(2);
                            return (
                              <option key={numParcelas} value={numParcelas}>
                                {numParcelas}x de R$ {valorParcela}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                </>
              </form>
            )}
          </div>
          
          <div className="checkout-resumo">
            <h2>Resumo do Pedido</h2>
            
            <div className="checkout-resumo-itens">
              {itens.map(item => (
                <div key={item.id} className="checkout-resumo-item">
                  <img src={item.image} alt={item.title} />
                  <div>
                    <p className="checkout-resumo-item-titulo">{item.title}</p>
                    <p className="checkout-resumo-item-qtd">Qtd: {item.quantidade}</p>
                  </div>
                  <span className="checkout-resumo-item-preco">
                    R$ {(parseFloat(item.price.replace('$', '')) * item.quantidade).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            {todosFreteGratis && (
              <div className="checkout-resumo-frete">
                <span>Frete</span>
                <span className="checkout-frete-gratis">Grátis</span>
              </div>
            )}
            
            <div className="checkout-resumo-total">
              <span>Total</span>
              <span>R$ {totalValor.toFixed(2)}</span>
            </div>
            
            {etapa === 'pagamento' && pagamento.parcelas > 1 && (
              <div className="checkout-resumo-parcelas">
                <span>{pagamento.parcelas}x de R$ {(totalValor / pagamento.parcelas).toFixed(2)}</span>
              </div>
            )}
            
            {etapa === 'endereco' ? (
              <>
                <button 
                  type="button" 
                  onClick={avancarParaPagamento}
                  className="checkout-btn-proximo"
                >
                  Continuar para Pagamento
                </button>
                <Link to="/carrinho" className="checkout-link-voltar">
                  ← Voltar para o Carrinho
                </Link>
              </>
            ) : (
              <>
                <button 
                  type="button" 
                  onClick={handlePagamentoSubmit}
                  className="checkout-btn-finalizar"
                >
                  Finalizar Pedido
                </button>
                <button 
                  type="button" 
                  onClick={() => setEtapa('endereco')}
                  className="checkout-link-voltar"
                >
                  ← Voltar para Endereço
                </button>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Rodape />
    </div>
  );
}

export default Checkout;
