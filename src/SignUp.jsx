import React from 'react';
import './SignUp.css';

const SignUp = ({ onSwitch, onHome }) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-logo" style={{ cursor: 'pointer' }} onClick={onHome}>Hive.tn</h1>
          <h2 className="auth-title">Rejoignez la ruche</h2>
          <p className="auth-subtitle">Créez votre compte pour soutenir ou lancer des projets innovants.</p>
        </div>
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <input type="text" id="fullname" required placeholder=" " />
            <label htmlFor="fullname">Nom complet</label>
          </div>
          <div className="input-group">
            <input type="email" id="email" required placeholder=" " />
            <label htmlFor="email">Adresse Email</label>
          </div>
          <div className="input-group">
            <input type="password" id="password" required placeholder=" " />
            <label htmlFor="password">Mot de passe</label>
          </div>
          <div className="input-group">
            <input type="password" id="confirmPassword" required placeholder=" " />
            <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
          </div>
          
          <button type="submit" className="auth-button">
            <span>Créer mon compte</span>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="btn-icon"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </form>
        <div className="auth-footer">
          Déjà un compte ? <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }} className="auth-link">Connectez-vous</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
