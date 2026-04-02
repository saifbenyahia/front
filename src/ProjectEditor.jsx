import React, { useState, useRef, useEffect, useCallback } from 'react';
import './ProjectEditor.css';
import './CreateProject.css';
import PreviewModal from './components/ProjectEditor/PreviewModal';
import BasicsTab from './components/ProjectEditor/BasicsTab';
import PeopleTab from './components/ProjectEditor/PeopleTab';
import RewardsTab from './components/ProjectEditor/RewardsTab';
import StoryTab from './components/ProjectEditor/StoryTab';

const TABS = ['Bases', 'Récompenses', 'Histoire', 'Personnes', 'Paiement', 'Promotion'];

const ProjectEditor = ({ onNavigate, draftProject, onSaveDraft }) => {
  const [activeTab, setActiveTab] = useState('Bases');
  const [showPreview, setShowPreview] = useState(false);



  return (
    <div className="pe-wrapper">

      {/* Header & Tabs */}
      <header className="pe-header">
        <div className="pe-header-top">
          <span className="pe-logo" onClick={() => onNavigate('home')}>Hive.tn</span>
          <div className="pe-header-actions">
            <span style={{ color: '#a1a1aa', fontSize: '13px' }}>Brouillon sauvegardé</span>
            <button className="pe-save-btn" onClick={() => setShowPreview(true)}>Aperçu</button>
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"
              alt="Avatar"
              className="pe-user-avatar"
            />
          </div>
        </div>

        <nav className="pe-tabs" role="tablist" aria-label="Édition du projet">
          {TABS.map(tab => (
            <span
              key={tab}
              className={`pe-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveTab(tab)}
            >
              {tab}
            </span>
          ))}
        </nav>
      </header>

      {/* Preview Modal */}
      <PreviewModal show={showPreview} project={draftProject || {}} onClose={() => setShowPreview(false)} />

      {/* Main Content Area */}
      <main className="pe-main">
        {activeTab === 'Bases' && <BasicsTab draftProject={draftProject} onSaveDraft={onSaveDraft} onNavigate={onNavigate} />}
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





export default ProjectEditor;
