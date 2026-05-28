import { useNavigate } from 'react-router-dom';
import imagemErro404 from '../assets/images/outros/404.png';

function Erro404() {
  const navigate = useNavigate();

  const voltarHome = () => {
    navigate('/');
  };

  return (
    <div className="erro404-wrapper">
      <div className="erro404-container">
        <div className="erro404-conteudo">
          <img src={imagemErro404} alt="Erro 404" className="erro404-imagem" />
          <button className="erro404-botao" onClick={voltarHome}>
            Voltar para Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Erro404;
