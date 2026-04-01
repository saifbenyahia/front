import React, { useState } from 'react';
import './SignIn.css';

const SignIn = ({ onSwitch, onForgotPassword, onHome }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-logo" style={{ cursor: 'pointer' }} onClick={onHome}>Hive.tn</h1>
          <h2 className="auth-title">Bon retour !</h2>
          <p className="auth-subtitle">Connectez-vous pour retrouver vos projets et vos dons.</p>
        </div>
        <form className="auth-form" onSubmit={(e) => { e.preventDefault(); onHome(); }}>
          <div className="input-group">
            <input type="email" id="email" required placeholder=" " />
            <label htmlFor="email">Adresse Email</label>
          </div>
          <div className="input-group">
            <input type={showPassword ? "text" : "password"} id="password" required placeholder=" " />
            <label htmlFor="password">Mot de passe</label>
            <button 
              type="button" 
              className="password-toggle-btn" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"></path></svg>
              )}
            </button>
          </div>
          <div className="auth-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span className="checkbox-custom"></span>
              <span className="text-small">Rester connecté</span>
            </label>
            <a href="#" onClick={(e) => { e.preventDefault(); onForgotPassword(); }} className="auth-link text-small">Mot de passe oublié ?</a>
          </div>
          <button type="submit" className="auth-button">
            <span>Se connecter</span>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="btn-icon"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </form>
        <div className="auth-footer">
          Nouveau sur Hive.tn ? <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }} className="auth-link">Inscrivez-vous</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
