import React, { useState, useRef } from 'react';

const BasicsTab = ({ draftProject, onNavigate }) => {
  // We use the draftProject state injected from the creation path
  const [title, setTitle] = useState(draftProject?.title || '');
  const [subtitle, setSubtitle] = useState(draftProject?.subtitle || '');
  const [category, setCategory] = useState(draftProject?.category || '');

  return (
    <>
      <div style={{ maxWidth: '1100px', margin: '0 auto 60px auto', textAlign: 'left' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Commençons par les bases</h1>
        <p style={{ color: '#a1a1aa' }}>Facilitez la découverte de votre projet par notre communauté.</p>
      </div>

      {/* 1. Project Title & Subtitle */}
      <div className="pe-split-row">
        <div className="pe-split-left">
          <h2>Titre du projet</h2>
          <p style={{ marginBottom: '15px' }}>Rédigez un titre clair et concis ainsi qu'un sous-titre pour aider les internautes à comprendre rapidement votre projet. Les deux apparaîtront sur les pages de votre projet.</p>
          <p>Les contributeurs potentiels les verront aussi si votre projet figure sur la page de votre catégorie, dans les résultats de recherche ou dans nos emails.</p>
        </div>
        <div className="pe-split-right">
          <div style={{ marginBottom: '25px' }}>
            <label className="pe-label">Titre</label>
            <input
              type="text"
              className="pe-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <div style={{ textAlign: 'right', fontSize: '12px', color: '#a1a1aa', marginTop: '5px' }}>
              {title.length}/60
            </div>
          </div>
          <div>
            <label className="pe-label">Sous-titre</label>
            <textarea
              className="pe-textarea pe-input"
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
            />
            <div style={{ textAlign: 'right', fontSize: '12px', color: '#a1a1aa', marginTop: '5px' }}>
              {subtitle.length}/135
            </div>
          </div>
          <div className="pe-note">
            ⚡ Donnez aux contributeurs la meilleure première impression avec des titres accrocheurs.
          </div>
        </div>
      </div>

      {/* 2. Project Category */}
      <div className="pe-split-row">
        <div className="pe-split-left">
          <h2>Catégorie du projet</h2>
          <p style={{ marginBottom: '15px' }}>Choisissez une catégorie principale pour aider les contributeurs à trouver votre projet.</p>
        </div>
        <div className="pe-split-right">
          <div className="pe-form-row">
            <div className="pe-form-col">
              <label className="pe-label">Catégorie principale</label>
              <select className="pe-select" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="" disabled>Sélectionnez une catégorie</option>
                <option value="Arts & BD">Arts & BD</option>
                <option value="Artisanat">Artisanat</option>
                <option value="Tech & App">Tech & App</option>
                <option value="Publishing">Publishing</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Project Image */}
      <div className="pe-split-row">
        <div className="pe-split-left">
          <h2>Image du projet</h2>
          <p style={{ marginBottom: '15px' }}>Ajoutez une image qui représente clairement votre projet. Choisissez-en une qui rend bien à différentes tailles.</p>
          <p>Votre image doit faire au moins 1024x576 pixels. Évitez les images contenant des bannières, des badges ou du texte.</p>
        </div>
        <div className="pe-split-right">
          <div className="pe-upload-box">
            <button className="pe-upload-btn">Importer une image</button>
            <div className="pe-upload-text">
              Glissez-déposez une image ici, ou sélectionnez un fichier.<br />
              Formats acceptés : JPG, PNG, GIF, ou WEBP, ne dépassant pas 50 Mo.
              <br /><br />
              {draftProject?.photoName && <span style={{ color: '#0ce688' }}>Fichier actuel : {draftProject.photoName}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Project Video */}
      <div className="pe-split-row">
        <div className="pe-split-left">
          <h2>Vidéo du projet (optionnel)</h2>
          <p style={{ marginBottom: '15px' }}>Ajoutez une vidéo qui décrit votre projet.</p>
          <p>Expliquez aux internautes pourquoi vous levez des fonds, comment vous comptez réaliser ce projet, qui vous êtes, et pourquoi cela vous tient à cœur.</p>
        </div>
        <div className="pe-split-right">
          <div className="pe-upload-box">
            <button className="pe-upload-btn">Importer une vidéo</button>
            <div className="pe-upload-text">
              Glissez-déposez une vidéo ici, ou sélectionnez un fichier.<br />
              Formats acceptés : MOV, MPEG, AVI, MP4, 3GP, WMV ou FLV, ne dépassant pas 5120 Mo.
            </div>
          </div>
          <div className="pe-note">
            ⚡ 80 % des projets réussis comportent une vidéo. Créez-en une excellente, quel que soit votre budget.
          </div>
        </div>
      </div>

      {/* 5. Funding Goal */}
      <div className="pe-split-row">
        <div className="pe-split-left">
          <h2>Objectif de financement</h2>
          <p style={{ marginBottom: '15px' }}>Fixez un objectif réalisable qui couvre tout ce dont vous avez besoin pour mener à bien votre projet.</p>
          <p>Le financement suit le principe du tout ou rien. Si vous n'atteignez pas votre objectif, vous ne recevrez pas les fonds.</p>
        </div>
        <div className="pe-split-right">
          <label className="pe-label">Montant visé (TND)</label>
          <input type="number" className="pe-input" placeholder="0" />
          <div className="pe-note">
          </div>
        </div>
      </div>

      {/* 6. Target Launch Date */}
      <div className="pe-split-row">
        <div className="pe-split-left">
          <h2>Date de lancement cible (optionnel)</h2>
          <p style={{ marginBottom: '15px' }}>Nous vous fournirons des recommandations sur le moment idéal pour effectuer les démarches administratives qui peuvent prendre quelques jours.</p>
        </div>
        <div className="pe-split-right">
          <div className="pe-form-row">
            <div className="pe-form-col">
              <label className="pe-label">Jour</label>
              <input type="text" className="pe-input" placeholder="JJ" />
            </div>
            <div className="pe-form-col">
              <label className="pe-label">Mois</label>
              <input type="text" className="pe-input" placeholder="MM" />
            </div>
            <div className="pe-form-col">
              <label className="pe-label">Année</label>
              <input type="text" className="pe-input" placeholder="AAAA" />
            </div>
          </div>
          <p style={{ fontSize: '14px', marginBottom: '10px', marginTop: '15px' }}>Nous vous recommanderons quand vous devrez :</p>
          <ul style={{ fontSize: '14px', color: '#a1a1aa', paddingLeft: '20px', marginBottom: '20px' }}>
            <li>Confirmer votre identité et fournir vos coordonnées bancaires</li>
            <li>Soumettre votre projet pour vérification</li>
          </ul>
          <div className="pe-note" style={{ color: '#a1a1aa' }}>
            🎯 Fixer une date cible ne lancera pas automatiquement votre projet.
          </div>
        </div>
      </div>

      {/* 7. Campaign Duration */}
      <div className="pe-split-row">
        <div className="pe-split-left">
          <h2>Durée de la campagne</h2>
          <p>Fixez une limite de temps pour votre campagne. Vous ne pourrez plus la modifier une fois lancée.</p>
        </div>
        <div className="pe-split-right">
          <div className="pe-radio-group">
            <label className="pe-radio-item">
              <input type="radio" name="duration" value="15 jours" className="pe-radio-input" defaultChecked />
              <span style={{ fontSize: '15px' }}>15 jours</span>
            </label>
            <label className="pe-radio-item">
              <input type="radio" name="duration" value="1 mois" className="pe-radio-input" />
              <span style={{ fontSize: '15px' }}>1 mois</span>
            </label>
            <label className="pe-radio-item">
              <input type="radio" name="duration" value="2 mois" className="pe-radio-input" />
              <span style={{ fontSize: '15px' }}>2 mois</span>
            </label>
            <label className="pe-radio-item">
              <input type="radio" name="duration" value="6 mois" className="pe-radio-input" />
              <span style={{ fontSize: '15px' }}>6 mois</span>
            </label>
          </div>
          <div className="pe-note">
            ⚡ Les campagnes de 30 jours ou moins ont plus de chances d'aboutir.
          </div>
        </div>
      </div>

      {/* 8. Danger Zone - Delete Project */}
      <div style={{ marginTop: '80px', padding: '40px', background: 'rgba(255, 77, 79, 0.05)', border: '1px solid rgba(255, 77, 79, 0.2)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: '#ff4d4f', fontSize: '20px', margin: '0 0 8px 0' }}>Supprimer le projet</h2>
          <p style={{ margin: 0, color: '#a1a1aa', fontSize: '14px' }}>Cette action est irréversible. Toutes les données de ce brouillon seront définitivement perdues.</p>
        </div>
        <button
          className="pe-save-btn"
          style={{ background: 'transparent', color: '#ff4d4f', borderColor: 'rgba(255, 77, 79, 0.5)' }}
          onMouseEnter={e => { e.target.style.background = 'rgba(255, 77, 79, 0.1)'; e.target.style.borderColor = '#ff4d4f'; }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(255, 77, 79, 0.5)'; }}
          onClick={() => {
            if (window.confirm('🚨 Êtes-vous sûr de vouloir supprimer définitivement ce projet ?\n\nCette action est irréversible !')) {
              if (onNavigate) onNavigate('home');
            }
          }}
        >
          Supprimer ce brouillon
        </button>
      </div>

    </>
  );
};

export default BasicsTab;