import logoIFES from '../assets/images/logo/logoIFES.svg';
import logoGitHub from '../assets/images/logo/github.svg';

function Rodape() {
  const anoAtual = new Date().getFullYear();
  
  return (
    <footer className="rodape">
      <div className="rodape-esquerda">
        <img src={logoIFES} alt="IFES" className="rodape-logo-ifes" />
      </div>
      
      <div className="rodape-centro">
        <p>© {anoAtual} Oberdan Gomes - Todos os Direitos Reservados</p>
      </div>
      
      <div className="rodape-direita">
        <a 
          href="https://github.com/oberdangom35/TADS-store-oberdan" 
          target="_blank" 
          rel="noopener noreferrer"
          className="rodape-link-github"
          title="Ver no GitHub"
        >
          <img src={logoGitHub} alt="GitHub" className="rodape-logo-github" />
        </a>
      </div>
    </footer>
  );
}

export default Rodape;
