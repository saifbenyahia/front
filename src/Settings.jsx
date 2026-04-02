import React, { useState } from 'react';
import './Settings.css';
import Navbar from './Navbar';

const Settings = ({ onNavigate, isAuthenticated, onLogout }) => {
  const [activeTab, setActiveTab] = useState('account');
  const [saved, setSaved] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="settings-page-wrapper">
      
      {/* Navbar Principale */}
      <Navbar 
        onNavigate={onNavigate} 
        isAuthenticated={isAuthenticated} 
        onLogout={onLogout} 
        activeTab="settings" 
      />

      <div className="settings-main">
        <h1 className="settings-page-title">Paramètres</h1>
        
        <div className="settings-tabs" role="tablist" aria-label="Paramètres">
          <span 
            className={`settings-tab ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
            role="tab"
            aria-selected={activeTab === 'account'}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setActiveTab('account')}
          >
            Compte
          </span>
          <span 
            className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
            role="tab"
            aria-selected={activeTab === 'profile'}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setActiveTab('profile')}
          >
            Modifier le profil
          </span>
        </div>

        {/* --- ONGLET: COMPTE --- */}
        {activeTab === 'account' && (
          <div className="settings-grid">
            
            {/* Colonne Gauche - Formulaire */}
            <div className="settings-form-left">
              <div className="settings-form-group">
                <label className="settings-label">Email</label>
                <input type="email" className="settings-input" defaultValue="ayoub@hive.tn" />
              </div>

              <div className="settings-form-group">
                <label className="settings-label">Mot de passe</label>
                {!isChangingPassword ? (
                  <button className="settings-btn-outline" onClick={() => setIsChangingPassword(true)}>
                    Changer le mot de passe
                  </button>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
                    <div>
                      <input type="password" className="settings-input" placeholder="Nouveau mot de passe" />
                    </div>
                    <div>
                      <input type="password" className="settings-input" placeholder="Confirmer le nouveau mot de passe" />
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button className="nav-btn-solid" style={{ padding: '8px 16px', fontSize: '13px' }} onClick={() => setIsChangingPassword(false)}>
                        Valider
                      </button>
                      <button className="settings-btn-outline" style={{ padding: '8px 16px', fontSize: '13px' }} onClick={() => setIsChangingPassword(false)}>
                        Annuler
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="settings-form-group" style={{ marginTop: '32px' }}>
                <label className="settings-label">Mot de passe actuel</label>
                <input type="password" className="settings-input" placeholder="••••••••••••" />
                <div className="settings-help-text">Entrez votre mot de passe actuel pour sauvegarder ces modifications.</div>
              </div>

              <div className="settings-footer" style={{ borderTop: 'none', paddingTop: 0, marginTop: '16px' }}>
                <button className="nav-btn-solid" onClick={handleSave}>Enregistrer</button>
                {saved && (
                  <span style={{ color: '#05ce78', fontSize: '14px', fontWeight: '600', animation: 'fadeInDown 0.3s ease-out' }}>
                    ✓ Paramètres enregistrés avec succès !
                  </span>
                )}
              </div>
            </div>

            {/* Colonne Droite - Liens rapides */}
            <div className="settings-form-right">
              <div className="settings-sidebar-block">
                <div className="settings-sidebar-title">Confidentialité</div>
                <span className="settings-sidebar-link">Se désinscrire de Following</span>
                <span className="settings-sidebar-link">Désactiver les recommandations</span>
                <span className="settings-sidebar-link">Demander mes données personnelles</span>
                <span className="settings-sidebar-link">Se désinscrire de la recherche Hive.tn</span>
              </div>

              <div className="settings-sidebar-block">
                <div className="settings-sidebar-title">Sécurité</div>
                <div className="settings-sidebar-text">
                  <span className="settings-sidebar-link" style={{margin:0}}>Configurer l'A2F (2FA)</span>
                  <span className="badge-off">Off</span>
                </div>
                <span className="settings-sidebar-link">Déconnecter tous les autres appareils</span>
              </div>

              <div className="settings-sidebar-block">
                <div className="settings-sidebar-title">Supprimer le compte</div>
                <span className="settings-sidebar-link text-danger">Supprimer mon compte Hive.tn</span>
              </div>
            </div>

          </div>
        )}

        {/* --- ONGLET: MODIFIER LE PROFIL --- */}
        {activeTab === 'profile' && (
          <div className="settings-grid">
            
            {/* Colonne Gauche - Formulaire de profil */}
            <div className="settings-form-left">
              <div className="settings-form-group">
                <label className="settings-label">Nom</label>
                <input type="text" className="settings-input" defaultValue="Ayoub B." />
                <div className="settings-help-text">Attention : Une fois un projet lancé, vous ne pouvez plus modifier votre nom sur Hive.tn.</div>
              </div>

              <div className="settings-form-group">
                <label className="settings-label">Avatar</label>
                <div className="avatar-upload-box">
                  Choisissez une image depuis votre ordinateur
                </div>
                <div className="settings-help-text">JPEG, PNG ou GIF • Limite de fichier 50MB</div>
              </div>

              <div className="settings-form-group">
                <label className="settings-label">Biographie</label>
                <textarea className="settings-textarea" defaultValue="Passionné par l'innovation solidaire en Tunisie."></textarea>
                <div className="settings-help-text">Nous suggérons une courte bio. Si elle fait moins de 300 caractères, elle sera du plus bel effet sur votre profil.</div>
              </div>

              <div className="settings-form-group">
                <label className="settings-label">Confidentialité</label>
                <div className="checkbox-container">
                  <input type="checkbox" id="privacy-check" defaultChecked />
                  <label htmlFor="privacy-check">
                    Afficher uniquement mon nom et avatar
                    <span className="sub-label">Décochez cette case pour afficher publiquement votre biographie, vos sites web et les projets que vous avez soutenus.</span>
                  </label>
                </div>
              </div>

              <div className="settings-footer">
                <button className="nav-btn-solid" onClick={handleSave}>Sauvegarder les paramètres</button>
                {saved && (
                  <span style={{ color: '#05ce78', fontSize: '14px', fontWeight: '600', animation: 'fadeInDown 0.3s ease-out' }}>
                    ✓ Profil mis à jour !
                  </span>
                )}
                <span className="settings-sidebar-link" style={{ margin: 0, marginLeft: 'auto' }} onClick={() => onNavigate('profile')}>Voir le profil</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Settings;
