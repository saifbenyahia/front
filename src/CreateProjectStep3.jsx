import React, { useState } from 'react';
import './CreateProject.css';

const CreateProjectStep3 = ({ onNavigate, onSaveDraft, draftProject }) => {
  const [title, setTitle] = useState(draftProject?.title || '');
  const [subtitle, setSubtitle] = useState(draftProject?.subtitle || '');
  const [photoName, setPhotoName] = useState(draftProject?.photoName || '');

  const MAX_TITLE = 60;
  const MAX_SUBTITLE = 135;

  const isFormComplete = title.trim().length > 0 && title.length <= MAX_TITLE &&
                         subtitle.trim().length > 0 && subtitle.length <= MAX_SUBTITLE;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoName(e.target.files[0].name);
    }
  };

  const handleSubmit = () => {
    if (isFormComplete) {
      if(onSaveDraft) onSaveDraft({ title, subtitle, photoName });
      onNavigate('projectEditor');
    }
  };

  return (
    <div className="cp-wrapper">
      
      {/* Minimal Header */}
      <header className="cp-header">
        <div className="cp-logo" onClick={() => onNavigate('home')}>Hive.tn</div>
        <img 
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80" 
          alt="Avatar" 
          className="cp-user-avatar"
          onClick={() => onNavigate('profile')}
        />
      </header>

      {/* Progress Bar (Étape 3: Pleine) */}
      <div className="cp-progress-container">
        <div className="cp-progress-segment active"></div>
        <div className="cp-progress-segment active"></div>
        <div className="cp-progress-segment active"></div>
      </div>

      {/* Main Content Area */}
      <main className="cp-main">
        
        {/* Title */}
        <div style={{ maxWidth: '700px', width: '100%', textAlign: 'left', marginBottom: '40px' }}>
          <h1 className="cp-title" style={{ marginBottom: '10px' }}>Commençons par les bases</h1>
          <p className="cp-description">Facilitez la découverte de votre projet par notre communauté.</p>
        </div>

        {/* Form Container */}
        <div style={{ maxWidth: '700px', width: '100%', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '30px', textAlign: 'left' }}>
            
            {/* Title Input */}
            <div className="cp-form-group">
              <label className="cp-form-label">Titre</label>
              <input 
                type="text" 
                className="cp-input" 
                placeholder="La Ferme Hydroponique Tunisienne"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className={`cp-char-count ${title.length > MAX_TITLE ? 'error' : ''}`}>
                {title.length}/{MAX_TITLE}
              </div>
            </div>

            {/* Subtitle Textarea */}
            <div className="cp-form-group">
              <label className="cp-form-label">Sous-titre</label>
              <textarea 
                className="cp-textarea" 
                placeholder="Une approche écologique et locale pour produire des légumes frais toute l'année..."
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              ></textarea>
              <div className={`cp-char-count ${subtitle.length > MAX_SUBTITLE ? 'error' : ''}`}>
                {subtitle.length}/{MAX_SUBTITLE}
              </div>
            </div>

            {/* Photo Upload (Optional) */}
            <div className="cp-form-group" style={{ marginBottom: 0 }}>
              <label className="cp-form-label">Photo principale du projet (Optionnel)</label>
              <div className="cp-file-upload">
                <input 
                  type="file" 
                  id="project-photo" 
                  className="cp-file-input" 
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                />
                <label htmlFor="project-photo" className="cp-file-label">
                  {photoName ? `Image sélectionnée : ${photoName}` : "Cliquez ici pour uploader une image"}
                </label>
                {!photoName && <span className="cp-file-hint">Formats supportés: JPEG, PNG, GIF. Ratio conseillé 16:9.</span>}
              </div>
            </div>

          </div>

      </main>

      {/* Footer Navigation */}
      <footer className="cp-footer">
        <div className="cp-footer-text">
          Dernière étape avant la validation !
        </div>
        <button 
          className="cp-btn-next" 
          disabled={!isFormComplete}
          onClick={handleSubmit}
        >
          Valider mon projet
        </button>
      </footer>

    </div>
  );
};

export default CreateProjectStep3;
