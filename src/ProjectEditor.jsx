import React, { useState, useRef } from 'react';
import './ProjectEditor.css';

const TABS = ['Bases', 'Récompenses', 'Histoire', 'Personnes', 'Paiement', 'Promotion'];

const ProjectEditor = ({ onNavigate, draftProject, onSaveDraft }) => {
  const [activeTab, setActiveTab] = useState('Bases');

  return (
    <div className="pe-wrapper">

      {/* Header & Tabs */}
      <header className="pe-header">
        <div className="pe-header-top">
          <span className="pe-logo" onClick={() => onNavigate('home')}>Hive.tn</span>
          <div className="pe-header-actions">
            <span style={{ color: '#a1a1aa', fontSize: '13px' }}>Brouillon sauvegardé</span>
            <button className="pe-save-btn">Aperçu</button>
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"
              alt="Avatar"
              className="pe-user-avatar"
            />
          </div>
        </div>

        <nav className="pe-tabs">
          {TABS.map(tab => (
            <span
              key={tab}
              className={`pe-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </span>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="pe-main">
        {activeTab === 'Bases' && <BasicsTab draftProject={draftProject} onSaveDraft={onSaveDraft} />}
        {activeTab === 'Récompenses' && <RewardsTab />}
        {activeTab === 'Histoire' && <StoryTab />}
        {activeTab === 'Personnes' && <PeopleTab />}
        {activeTab !== 'Bases' && activeTab !== 'Récompenses' && activeTab !== 'Histoire' && activeTab !== 'Personnes' && (
          <div style={{ textAlign: 'center', padding: '100px', color: '#a1a1aa' }}>
            <h2>{activeTab}</h2>
            <p>Cet onglet est en cours de structuration.</p>
          </div>
        )}
      </main>

    </div>
  );
};

// ==========================================
// BASICS TAB COMPONENT (BASES)
// ==========================================
const BasicsTab = ({ draftProject }) => {
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

    </>
  );
};

// ==========================================
// REWARDS TAB COMPONENT (RÉCOMPENSES)
// ==========================================
const RewardsTab = () => {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [items, setItems] = useState([]);

  const [itemTitle, setItemTitle] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemDesc, setItemDesc] = useState('');

  const handleDeleteItem = (indexToDelete) => {
    setItems(items.filter((_, idx) => idx !== indexToDelete));
  };

  const handleSaveItem = () => {
    if (itemTitle.trim() !== '') {
      setItems([...items, { title: itemTitle, price: itemPrice, desc: itemDesc }]);
      setItemTitle('');
      setItemPrice('');
      setItemDesc('');
      setIsAddingItem(false);
    }
  };

  return (
    <>
      <div style={{ maxWidth: '1100px', margin: '0 auto 60px auto', textAlign: 'left' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Récompenses</h1>
        <p style={{ color: '#a1a1aa' }}>Définissez ce que vous offrez à vos contributeurs en échange de leur soutien.</p>
      </div>

      {!isAddingItem && (
        <div className="pe-rewards-intro" style={{ maxWidth: '1100px', margin: '0 auto 40px auto', textAlign: 'center', background: 'rgba(255,255,255,0.02)', padding: '50px 30px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ marginBottom: '35px', color: '#d1d1d6', lineHeight: '1.7', fontSize: '16px', maxWidth: '800px', margin: '0 auto 35px auto' }}>
            L'inclusion de récompenses permet aux contributeurs de comprendre et de comparer facilement vos offres. Une récompense peut être n'importe quoi que vous prévoyez d'offrir à vos contributeurs. Quelques exemples incluent des cartes à jouer, une copie numérique d'un livre, un billet pour une pièce de théâtre, ou même un remerciement dans votre documentaire.
          </p>
          <button className="pe-new-item-btn" onClick={() => setIsAddingItem(true)}>
            <span style={{ fontSize: '22px', marginRight: '8px', fontWeight: 'bold' }}>+</span> Ajouter une récompense
          </button>
          <div style={{ marginTop: '25px' }}>
            <span className="pe-upload-text" style={{ color: '#05ce78', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px' }}>
              En savoir plus sur la création de récompenses
            </span>
          </div>
        </div>
      )}

      {/* Liste des récompenses existantes */}
      {items.length > 0 && !isAddingItem && (
        <div style={{ maxWidth: '1100px', margin: '0 auto 40px auto', textAlign: 'left' }}>
          <h3 style={{ marginBottom: '20px', color: '#fff' }}>Vos récompenses sauvegardées ({items.length})</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {items.map((item, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', borderRadius: '12px', position: 'relative' }}>
                <button
                  onClick={() => handleDeleteItem(idx)}
                  style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: '#ff4d4f', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', transition: 'color 0.2s' }}
                  title="Supprimer cette récompense"
                  onMouseOver={(e) => e.target.style.color = '#ff7875'}
                  onMouseOut={(e) => e.target.style.color = '#ff4d4f'}
                >
                  ✕
                </button>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingRight: '25px' }}>
                  <strong style={{ fontSize: '18px', color: '#fff' }}>{item.title}</strong>
                  <span style={{ color: '#0ce688', fontWeight: '600' }}>{item.price ? `${item.price} TND` : 'Inclus'}</span>
                </div>
                {item.desc && <p style={{ color: '#a1a1aa', fontSize: '14px', lineHeight: '1.5' }}>{item.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Formulaire d'ajout de récompense */}
      {isAddingItem && (
        <div className="pe-split-right" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
          <h2 style={{ marginBottom: '30px' }}>Créer une nouvelle récompense</h2>

          <div className="pe-form-row">
            <div className="pe-form-col">
              <label className="pe-label">Titre de la récompense</label>
              <input
                type="text"
                className="pe-input"
                placeholder="Ex: T-shirt exclusif Hive.tn"
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
              />
            </div>
            <div className="pe-form-col">
              <label className="pe-label">Valeur estimée (TND)</label>
              <input
                type="number"
                className="pe-input"
                placeholder="Ex: 50"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label className="pe-label">Description (Optionnelle)</label>
            <textarea
              className="pe-textarea pe-input"
              placeholder="Décrivez cette récompense en quelques mots..."
              value={itemDesc}
              onChange={(e) => setItemDesc(e.target.value)}
            ></textarea>
          </div>

          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button
              className="cp-btn-next"
              style={{ width: 'auto', margin: 0 }}
              onClick={handleSaveItem}
              disabled={!itemTitle.trim()}
            >
              Sauvegarder la récompense
            </button>
            <button
              className="pe-save-btn"
              onClick={() => setIsAddingItem(false)}
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// ==========================================
// STORY TAB COMPONENT (HISTOIRE)
// ==========================================
const BLOCK_TYPES = [
  { value: 'paragraph', label: 'Paragraphe' },
  { value: 'heading', label: 'Titre' },
  { value: 'subheading', label: 'Sous-titre' },
];

const createBlock = (type = 'paragraph', content = '') => ({
  id: Date.now() + Math.random(),
  type,
  content,
});

const StoryTab = () => {
  // Story Blocks
  const [blocks, setBlocks] = useState([createBlock()]);
  const [activeBlockId, setActiveBlockId] = useState(null);
  const [showTypeMenu, setShowTypeMenu] = useState(null);
  const fileInputRef = useRef(null);
  const imageBlockTarget = useRef(null);

  // New Sections
  const [risks, setRisks] = useState('');
  const [faqs, setFaqs] = useState([]);

  const updateBlock = (id, updates) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteBlock = (id) => {
    setBlocks(prev => {
      const filtered = prev.filter(b => b.id !== id);
      return filtered.length === 0 ? [createBlock()] : filtered;
    });
  };

  const addBlockAfter = (id, type = 'paragraph') => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id);
      const newBlock = createBlock(type);
      const updated = [...prev];
      updated.splice(idx + 1, 0, newBlock);
      setActiveBlockId(newBlock.id);
      return updated;
    });
  };

  const addBlockAtEnd = (type = 'paragraph') => {
    const newBlock = createBlock(type);
    setBlocks(prev => [...prev, newBlock]);
    setActiveBlockId(newBlock.id);
  };

  const handleImageUpload = (blockId) => {
    imageBlockTarget.current = blockId;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && imageBlockTarget.current) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const targetId = imageBlockTarget.current;
        // Insert image block after target
        setBlocks(prev => {
          const idx = prev.findIndex(b => b.id === targetId);
          const imgBlock = {
            id: Date.now() + Math.random(),
            type: 'image',
            content: ev.target.result,
            fileName: file.name,
          };
          const updated = [...prev];
          updated.splice(idx + 1, 0, imgBlock);
          return updated;
        });
        imageBlockTarget.current = null;
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const addVideoEmbed = (blockId) => {
    const url = prompt('Collez l\'URL de la vidéo (YouTube, Vimeo, etc.) :');
    if (url && url.trim()) {
      setBlocks(prev => {
        const idx = prev.findIndex(b => b.id === blockId);
        const videoBlock = {
          id: Date.now() + Math.random(),
          type: 'video',
          content: url.trim(),
        };
        const updated = [...prev];
        updated.splice(idx + 1, 0, videoBlock);
        return updated;
      });
    }
  };

  const toggleList = (blockId) => {
    const block = blocks.find(b => b.id === blockId);
    if (block) {
      if (block.type === 'list') {
        updateBlock(blockId, { type: 'paragraph' });
      } else {
        updateBlock(blockId, { type: 'list' });
      }
    }
  };

  const getVideoEmbedUrl = (url) => {
    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    return url;
  };

  const handleKeyDown = (e, block) => {
    if (e.key === 'Enter' && !e.shiftKey && block.type !== 'list') {
      e.preventDefault();
      addBlockAfter(block.id);
    }
    if (e.key === 'Backspace' && block.content === '' && blocks.length > 1) {
      e.preventDefault();
      deleteBlock(block.id);
    }
  };

  return (
    <>
      {/* Header */}
      <div style={{ maxWidth: '800px', margin: '0 auto 30px auto', textAlign: 'left' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Histoire du projet</h1>
        <p style={{ color: '#a1a1aa', lineHeight: '1.6' }}>
          Décrivez pourquoi vous levez des fonds, ce qui vous tient à cœur, comment vous comptez réaliser votre projet et qui vous êtes.
        </p>
      </div>

      {/* Info Banner */}
      <div className="story-info-banner">
        <div className="story-info-icon">📝</div>
        <div style={{ flex: 1 }}>
          <strong>Bienvenue dans l'éditeur d'histoire</strong>
          <span style={{ color: '#a1a1aa', marginLeft: '8px' }}>Utilisez la barre d'outils pour formater votre contenu.</span>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Editor Area */}
      <div className="story-editor">
        {blocks.map((block) => (
          <div
            key={block.id}
            className={`story-block ${activeBlockId === block.id ? 'active' : ''}`}
            onClick={() => setActiveBlockId(block.id)}
          >
            {/* Block Toolbar - visible on active */}
            {activeBlockId === block.id && block.type !== 'image' && block.type !== 'video' && (
              <div className="story-toolbar">
                <div className="story-toolbar-group">
                  <div className="story-type-selector">
                    <button
                      className="story-toolbar-btn story-type-btn"
                      onClick={(e) => { e.stopPropagation(); setShowTypeMenu(showTypeMenu === block.id ? null : block.id); }}
                    >
                      {BLOCK_TYPES.find(t => t.value === block.type)?.label || 'Paragraphe'}
                      <span className="story-chevron">▾</span>
                    </button>
                    {showTypeMenu === block.id && (
                      <div className="story-type-menu">
                        {BLOCK_TYPES.map(t => (
                          <button
                            key={t.value}
                            className={`story-type-option ${block.type === t.value ? 'active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateBlock(block.id, { type: t.value });
                              setShowTypeMenu(null);
                            }}
                          >
                            <span className={`story-type-preview ${t.value}`}>{t.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="story-toolbar-divider" />

                <div className="story-toolbar-group">
                  <button
                    className="story-toolbar-btn"
                    title="Ajouter une image"
                    onClick={(e) => { e.stopPropagation(); handleImageUpload(block.id); }}
                  >
                    🖼️
                  </button>
                  <button
                    className="story-toolbar-btn"
                    title="Intégrer une vidéo"
                    onClick={(e) => { e.stopPropagation(); addVideoEmbed(block.id); }}
                  >
                    🎬
                  </button>
                  <button
                    className={`story-toolbar-btn ${block.type === 'list' ? 'active' : ''}`}
                    title="Liste à puces"
                    onClick={(e) => { e.stopPropagation(); toggleList(block.id); }}
                  >
                    ☰
                  </button>
                </div>

                <div className="story-toolbar-divider" />

                <button
                  className="story-toolbar-btn story-delete-btn"
                  title="Supprimer ce bloc"
                  onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }}
                >
                  🗑️
                </button>
              </div>
            )}

            {/* Block Content */}
            {block.type === 'image' ? (
              <div className="story-image-block">
                <img src={block.content} alt={block.fileName || 'Image'} className="story-image" />
                <button
                  className="story-image-delete"
                  onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }}
                  title="Supprimer l'image"
                >
                  ✕
                </button>
              </div>
            ) : block.type === 'video' ? (
              <div className="story-video-block">
                <iframe
                  src={getVideoEmbedUrl(block.content)}
                  title="Vidéo intégrée"
                  className="story-video-iframe"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  className="story-image-delete"
                  onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }}
                  title="Supprimer la vidéo"
                >
                  ✕
                </button>
              </div>
            ) : (
              <textarea
                className={`story-textarea story-${block.type}`}
                value={block.content}
                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, block)}
                onFocus={() => setActiveBlockId(block.id)}
                placeholder={
                  block.type === 'heading' ? 'Titre…' :
                    block.type === 'subheading' ? 'Sous-titre…' :
                      block.type === 'list' ? '• Élément de liste…' :
                        'Commencez à écrire votre histoire ici…'
                }
                rows={1}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
            )}
          </div>
        ))}

        {/* Add Block Button */}
        <div className="story-add-block">
          <button
            className="story-add-btn"
            onClick={() => addBlockAtEnd()}
            title="Ajouter un bloc"
          >
            +
          </button>
        </div>
      </div>

      <div style={{ height: '40px' }}></div>
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', marginBottom: '50px' }} />

      {/* Risks and Challenges */}
      <div className="pe-split-row">
        <div className="pe-split-left">
          <h2>Risques et défis</h2>
          <p style={{ marginBottom: '15px' }}>Soyez honnête sur les risques et les défis potentiels de ce projet et sur la manière dont vous prévoyez de les surmonter pour le mener à bien.</p>
        </div>
        <div className="pe-split-right">
          <textarea
            className="pe-textarea pe-input"
            placeholder="Les risques et défis courants que vous pourriez vouloir aborder incluent le budget, les délais pour les récompenses et le projet lui-même, la taille de votre audience..."
            value={risks}
            onChange={(e) => setRisks(e.target.value)}
          ></textarea>
          <div className="pe-note" style={{ marginTop: '10px' }}>
            💡 Communiquez les risques et les défis à l'avance pour définir les bonnes attentes. <span style={{ textDecoration: 'underline', color: '#0ce688', cursor: 'pointer', marginLeft: '5px' }}>En savoir plus...</span>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="pe-split-row">
        <div className="pe-split-left">
          <h2>Foire aux questions</h2>
          <p style={{ marginBottom: '15px' }}>Publiez des réponses aux questions fréquemment posées.</p>
        </div>
        <div className="pe-split-right" style={{ background: 'transparent', border: 'none', padding: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ marginBottom: '15px' }}>
                  <label className="pe-label">Question</label>
                  <input
                    type="text"
                    className="pe-input"
                    value={faq.question}
                    onChange={(e) => {
                      const newFaqs = [...faqs];
                      newFaqs[index].question = e.target.value;
                      setFaqs(newFaqs);
                    }}
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label className="pe-label">Réponse</label>
                  <textarea
                    className="pe-textarea pe-input"
                    style={{ minHeight: '100px', lineHeight: '1.5', padding: '12px 16px' }}
                    value={faq.answer}
                    onChange={(e) => {
                      const newFaqs = [...faqs];
                      newFaqs[index].answer = e.target.value;
                      setFaqs(newFaqs);
                    }}
                  ></textarea>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button
                    className="pe-save-btn"
                    style={{ color: '#ff4d4f', borderColor: 'rgba(255, 77, 79, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}
                    onClick={() => {
                      setFaqs(faqs.filter((_, i) => i !== index));
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>🗑️</span> Supprimer
                  </button>
                </div>
              </div>
            ))}

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px dashed rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '30px', textAlign: 'center' }}>
              <button
                className="pe-new-item-btn"
                style={{ background: '#111', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: 'none' }}
                onClick={() => setFaqs([...faqs, { question: '', answer: '' }])}
              >
                Ajouter une autre FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ==========================================
// PEOPLE TAB COMPONENT (PERSONNES)
// ==========================================
const PeopleTab = () => {
  const [generatedUrl, setGeneratedUrl] = useState('');

  const handleGenerateUrl = () => {
    // Generate a secure random alphanumeric slug
    const randomSlug = Math.random().toString(36).substring(2, 8);
    setGeneratedUrl(`https://hive.tn/profile/benyahia-saif-${randomSlug}`);
  };

  return (
    <>
      <div style={{ maxWidth: '1100px', margin: '0 auto 60px auto', textAlign: 'left' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Présentez-vous</h1>
        <p style={{ color: '#a1a1aa' }}>Donnez à vos contributeurs une idée de qui vous êtes, et ajoutez vos collaborateurs si vous travaillez en équipe.</p>
      </div>

      <div className="pe-split-row">
        <div className="pe-split-left">
          <h2>Votre profil</h2>
          <p style={{ marginBottom: '15px' }}>Cela apparaîtra sur la page de votre projet et doit inclure votre nom, photo, biographie et emplacement géographique.</p>
        </div>
        <div className="pe-split-right" style={{ padding: '0', background: 'transparent', border: 'none' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '30px', position: 'relative', marginTop: '40px' }}>
            <div style={{ position: 'absolute', top: '-40px', left: '30px', width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #0ce688, #00bfff)', border: '4px solid #151a2a', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}></div>
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ fontSize: '20px', margin: '0 0 5px 0', color: '#fff' }}>Benyahia Saif</h3>
              <p style={{ color: '#a1a1aa', margin: 0, fontSize: '14px' }}>Créateur du projet</p>
            </div>
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <button className="cp-btn-next" style={{ width: 'auto', margin: 0, padding: '10px 20px', fontSize: '15px' }}>
                Compléter votre profil
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '50px 0' }} />

      <div className="pe-split-row">
        <div className="pe-split-left">
          <h2>URL personnalisée</h2>
          <p style={{ marginBottom: '15px' }}>Créez une URL personnalisée pour votre page de profil avec au moins trois caractères. Cette formulation servira également de base pour l'URL de votre projet.</p>
        </div>
        <div className="pe-split-right">
          {!generatedUrl ? (
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '30px', textAlign: 'center' }}>
              <p style={{ color: '#a1a1aa', marginBottom: '20px', fontSize: '15px' }}>
                Cliquez sur le bouton ci-dessous pour générer automatiquement une URL unique pour votre page de profil.
              </p>
              <button
                className="cp-btn-next"
                style={{ width: 'auto', margin: 0, padding: '12px 24px', fontSize: '15px' }}
                onClick={handleGenerateUrl}
              >
                Générer mon URL automatiquement
              </button>
            </div>
          ) : (
            <div style={{ background: 'rgba(12, 230, 136, 0.05)', border: '1px solid rgba(12, 230, 136, 0.2)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <h3 style={{ color: '#0ce688', marginBottom: '15px', fontSize: '18px' }}>URL générée avec succès ! ✅</h3>
              <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.3)', padding: '12px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '16px', wordBreak: 'break-all' }}>
                <a href={generatedUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
                  {generatedUrl}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectEditor;
