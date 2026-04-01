import React, { useState } from 'react';
import './Home.css';
import './SavedProjects.css';

const SavedProjects = ({ onNavigate, onLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const savedProjects = [
    {
      id: 4,
      title: "AgriTech Gabès : Serres Connectées",
      creator: "Par GreenOasis",
      desc: "Développement de serres hydroponiques alimentées par énergie solaire pour optimiser l'agriculture en milieu aride.",
      image: "https://images.unsplash.com/photo-1592982537447-6f2e8f17ba81?w=800&q=80",
      funded: 85,
      collected: "38 250 DT",
      daysLeft: 12,
      category: "Agritech"
    },
    {
      id: 5,
      title: "Sicca Jazz : L'édition du Renouveau",
      creator: "Par Association Culturelle du Kef",
      desc: "Soutenez l'organisation du plus grand festival de jazz au Nord-Ouest. Devenez mécène culturel de la région de Sicca Veneria.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
      funded: 40,
      collected: "12 000 DT",
      daysLeft: 45,
      category: "Culture & Art"
    }
  ];

  return (
    <div className="saved-page-wrapper">
      
      {/* Navbar simplifiée */}
      <nav className="navbar" style={{ zIndex: 10, position: 'relative' }}>
        <div className="nav-left">
          <h1 className="nav-logo" onClick={() => onNavigate('home')}>Hive.tn</h1>
        </div>
        <div className="nav-right">
          <button className="nav-btn-solid" style={{marginRight: '20px'}} onClick={() => onNavigate('home')}>Retour à l'accueil</button>
          <div className="user-profile-container">
            <div className="user-avatar" onClick={() => setShowProfileMenu(!showProfileMenu)}>
               <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80" alt="Avatar Utilisateur" />
            </div>
            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <span className="text-bold" style={{ color: '#fff' }}>Ayoub B.</span>
                  <span className="text-small" style={{ color: '#a1a1aa', fontSize: '13px' }}>ayoub@hive.tn</span>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item" onClick={() => onNavigate('profile')}>👤 Profil</div>
                <div className="dropdown-item" onClick={() => onNavigate('settings')}>⚙️ Paramètres</div>
                <div className="dropdown-item" onClick={() => onNavigate('saved')}>🔖 Enregistrements</div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item text-danger" onClick={() => {
                  setShowProfileMenu(false);
                  if (onLogout) onLogout();
                }}>🚪 Déconnexion</div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="saved-main">
        {/* Header de la page */}
        <div className="saved-header">
          <div className="saved-icon-badge">🔖</div>
          <h1 className="saved-title">Projets Enregistrés</h1>
          <p className="saved-subtitle">Retrouvez ici les perles rares que vous avez mises de côté pour les soutenir plus tard.</p>
        </div>

        {/* Grille de projets */}
        <div className="projects-section" style={{ padding: '0', maxWidth: '100%' }}>
          <div className="projects-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 350px))', justifyContent: 'center' }}>
            {savedProjects.map(project => (
              <div key={project.id} className="project-card" style={{ cursor: 'pointer' }} onClick={() => onNavigate('projectDetails')}>
                <div className="project-image-container">
                  <div className="project-badge">{project.category}</div>
                  <img src={project.image} alt={project.title} className="project-image" />
                  
                  {/* Bouton pour retirer des favoris (simulé) */}
                  <div className="saved-bookmark-active">
                    🔖 Enregistré
                  </div>
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

                  <div style={{ marginTop: '24px' }}>
                     <button className="nav-btn-solid" style={{ width: '100%', padding: '10px', fontSize: '15px' }}>
                       Soutenir ce projet
                     </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SavedProjects;
