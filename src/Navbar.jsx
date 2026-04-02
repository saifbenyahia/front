import React, { useState, useRef, useEffect } from 'react';
import './Home.css';

const Navbar = ({ onNavigate, isAuthenticated, onLogout, activeTab }) => {
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

  const handleCreateProject = () => {
    if (isAuthenticated) {
      onNavigate('startProject');
    } else {
      onNavigate('signIn', 'Vous devez être connecté pour créer un projet.');
    }
  };

  return (
    <nav className="navbar" style={{ zIndex: 110, position: 'relative' }}>
      <div className="nav-left">
        <h1 className="nav-logo" onClick={() => onNavigate('home')}>Hive.tn</h1>
      </div>
      <div className="nav-center">
        <span className={`nav-link ${activeTab === 'discover' ? 'active' : ''}`} style={{cursor: 'pointer'}} onClick={() => onNavigate('discover')}>Découvrir</span>
        <span className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} style={{cursor: 'pointer'}} onClick={() => onNavigate('home')}>Accueil</span>
        <span className={`nav-link ${activeTab === 'startProject' ? 'active' : ''}`} style={{cursor: 'pointer'}} onClick={handleCreateProject}>Lancer un projet</span>
      </div>
      <div className="nav-right">
        {!isAuthenticated ? (
          <>
            <span className="nav-link" style={{cursor: 'pointer'}} onClick={() => onNavigate('signIn')}>Connexion</span>
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
                  if (onLogout) onLogout();
                }}>🚪 Déconnexion</div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
