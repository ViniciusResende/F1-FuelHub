import { FaHeart, FaGithub } from 'react-icons/fa';

/** Styles */
import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p className="made-with-love">
            Made with <FaHeart className="heart-icon" /> by{' '}
            <span className="authors">Vinicius, Romana and Lucas</span>
          </p>
          <p className="project-info">
            Project part of the subject Software Engineering II
          </p>
          <p className="university">
            Project developed in the Federal University of Minas Gerais (UFMG)
          </p>
        </div>
        
        <div className="footer-section">
          <a 
            href="https://github.com/ViniciusResende/F1-FuelHub"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <FaGithub className="github-icon" />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 