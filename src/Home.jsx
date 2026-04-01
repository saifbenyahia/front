import React, { useState, useEffect, useRef } from 'react';
import './Home.css';

const Home = ({ onNavigate, isAuthenticated, onLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Oasis Solidaire : Irrigation intelligente",
      creator: "Par AgriTech Tozeur",
      desc: "Système d'irrigation goutte-à-goutte connecté et autonome en énergie solaire pour secourir les petits agriculteurs de l'Oasis de Tozeur.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
      funded: 65,
      collected: "18 500 DT",
      daysLeft: 14,
      category: "Environnement"
    },
    {
      id: 2,
      title: "Dar El Harka : Coworking & Artisanat",
      creator: "Par Collectif Medina, Tunis",
      desc: "Rénovation d'une maison historique de la Medina pour la transformer en espace de création pour les jeunes artisans tunisiens.",
      image: "https://images.unsplash.com/photo-1528157777178-0062a444aeb8?w=800&q=80",
      funded: 115,
      collected: "46 000 DT",
      daysLeft: 2,
      category: "Culture & Économie"
    },
    {
      id: 3,
      title: "Tbibi : Accès aux soins ruraux",
      creator: "Par Dr. Amine S., Kasserine",
      desc: "Déploiement d'une clinique mobile équipée pour des téléconsultations spécialisées dans les zones reculées de Kasserine.",
      image: "https://images.unsplash.com/photo-1576091160399-11cb953bff43?w=800&q=80",
      funded: 42,
      collected: "21 000 DT",
      daysLeft: 35,
      category: "Santé & Tech"
    }
  ];

  return (
    <div className="home-container">
      <div className="home-content-wrapper">
        
        {/* Navigation */}
        <nav className="navbar">
          <div className="nav-left">
            <h1 className="nav-logo" onClick={() => onNavigate('home')}>Hive.tn</h1>
          </div>
          <div className="nav-center">
            <span className="nav-link active">Découvrir</span>
            <span className="nav-link" style={{cursor: 'pointer'}} onClick={() => onNavigate('startProject')}>Lancer un projet</span>
          </div>
          <div className="nav-right">
            {!isAuthenticated ? (
              <>
                <span className="nav-link" onClick={() => onNavigate('signIn')}>Connexion</span>
                <button className="nav-btn-solid" onClick={() => onNavigate('signUp')}>S'inscrire</button>
              </>
            ) : (
              <div className="user-profile-container" ref={menuRef}>
                <div 
                  className="user-avatar" 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80" alt="Avatar Utilisateur" />
                </div>
                
                {showProfileMenu && (
                  <div className="profile-dropdown">
                    <div className="dropdown-header">
                      <strong>Ayoub B.</strong>
                      <span className="text-small" style={{ color: '#a1a1aa', fontSize: '13px' }}>ayoub@hive.tn</span>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-item" onClick={() => onNavigate('profile')}>👤 Profil</div>
                    <div className="dropdown-item" onClick={() => onNavigate('settings')}>⚙️ Paramètres</div>
                    <div className="dropdown-item" onClick={() => onNavigate('saved')}>🔖 Enregistrements</div>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-item text-danger" onClick={() => {
                      setShowProfileMenu(false);
                      onLogout();
                    }}>🚪 Déconnexion</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Hero Banner */}
        <section className="hero-section">
          <h1 className="hero-title">
            Financez les idées de <span>demain</span>,<br/> aujourd'hui.
          </h1>
          <p className="hero-subtitle">
            Hive.tn est la première plateforme de financement participatif en Tunisie dédiée aux projets innovants, solidaires et créatifs. Rejoignez la ruche.
          </p>
          <div className="hero-actions">
            <button className="hero-btn-primary" onClick={() => onNavigate('discover')}>Soutenir un projet</button>
            <button className="hero-btn-secondary" onClick={() => onNavigate('signUp')}>Créer mon projet</button>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="projects-section">
          <h2 className="section-title">Projets à soutenir en Tunisie</h2>
          
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card" style={{ cursor: 'pointer' }} onClick={() => onNavigate('projectDetails')}>
                <div className="project-image-container">
                  <div className="project-badge">{project.category}</div>
                  <img src={project.image} alt={project.title} className="project-image" />
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-creator">{project.creator}</div>
                  <p className="project-desc">{project.desc}</p>
                  
                  <div className="project-stats">
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: `${Math.min(project.funded, 100)}%` }}></div>
                    </div>
                    <div className="stats-row">
                      <div className="stat-item">
                        <span className="stat-value">{project.funded}%</span>
                        <span className="stat-label">financé</span>
                      </div>
                      <div className="stat-item" style={{ textAlign: 'center' }}>
                        <span className="stat-value" style={{ color: '#fff' }}>{project.collected}</span>
                        <span className="stat-label">récolté</span>
                      </div>
                      <div className="stat-item" style={{ textAlign: 'right' }}>
                        <span className="stat-value" style={{ color: '#fff' }}>{project.daysLeft}</span>
                        <span className="stat-label">jours restants</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comment ça marche Section */}
        <section className="how-it-works-section">
          <div className="hiw-container">
            <h2 className="section-title text-center">Comment ça marche ?</h2>
            <div className="hiw-grid">
              <div className="hiw-step">
                <div className="hiw-icon">💡</div>
                <h3>1. Soutenez un projet</h3>
                <p>Découvrez des idées tunisiennes innovantes et contribuez financièrement à leur réalisation en toute simplicité.</p>
              </div>
              <div className="hiw-step">
                <div className="hiw-icon">🛡️</div>
                <h3>2. Fonds sécurisés par jalons</h3>
                <p>Votre argent est protégé. Le financement est divisé en plusieurs jalons de réalisation clairs et définis à l'avance.</p>
              </div>
              <div className="hiw-step">
                <div className="hiw-icon">✅</div>
                <h3>3. Déblocage sur preuve</h3>
                <p>Les fonds ne sont débloqués au créateur qu'après validation stricte des preuves d'avancement du projet (factures, photos).</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Home;
