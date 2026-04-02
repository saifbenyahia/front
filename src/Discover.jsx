import React, { useState } from 'react';
import './Home.css';
import './Discover.css';
import Navbar from './Navbar';

const Discover = ({ onNavigate, isAuthenticated, onLogout }) => {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [filterCategory, setFilterCategory] = useState("Projets Solidaires");
  const [filterSort, setFilterSort] = useState("Nouveautés");

  // Mock data mimicking the requested layout exactly
  const exploreProjects = [
    {
      id: 101,
      title: "Pinlore: Celestial Spotted Eagle Rays Ceramic Pins",
      creatorName: "Pinlore",
      creatorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80",
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&q=80",
      daysLeft: 23,
      fundedPercent: 238,
      statusMessage: "23 days left • 238% funded"
    },
    {
      id: 102,
      title: "Reconnué : Un héritage artisanal de la Medina",
      creatorName: "Sélim T.",
      creatorAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80",
      image: "https://images.unsplash.com/photo-1544964687-320b92dbbce1?w=600&q=80",
      daysLeft: 10,
      fundedPercent: 0,
      statusMessage: "10 jours restants • 0% financé"
    },
    {
      id: 103,
      title: "New pottery wheel workshop in Safi",
      creatorName: "Elena Garcia",
      creatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      image: "https://images.unsplash.com/photo-1520699697851-3dc68aa3a474?w=600&q=80",
      daysLeft: 2,
      fundedPercent: 122,
      statusMessage: "2 jours restants • 122% financé"
    },
    {
      id: 104,
      title: "Community Pottery Studio in Tunis",
      creatorName: "Darion Fuller",
      creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      image: "https://images.unsplash.com/photo-1516997521873-195f2a969b4e?w=600&q=80",
      daysLeft: 15,
      fundedPercent: 0,
      statusMessage: "15 jours restants • 0% financé"
    },
    {
      id: 105,
      title: "Journey to Harper Homestead Pottery",
      creatorName: "sarahThePotter",
      creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
      image: "https://images.unsplash.com/photo-1578308361569-b50a4ad68953?w=600&q=80",
      daysLeft: 4,
      fundedPercent: 90,
      statusMessage: "4 jours restants • 90% financé"
    },
    {
      id: 106,
      title: "Mapusa Mogi : A 100m long Ceramic Mural",
      creatorName: "People Tree Studio",
      creatorAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80",
      image: "https://images.unsplash.com/photo-1542458428-f6ed5e38d721?w=600&q=80",
      daysLeft: 0,
      fundedPercent: 170,
      statusMessage: "Late Pledges active • 170% financé"
    },
    {
      id: 107,
      title: "Tile by tevaplanter® : Innovation végétale",
      creatorName: "tevaplanter",
      creatorAvatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&q=80",
      image: "https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?w=600&q=80",
      daysLeft: 0,
      fundedPercent: 1065,
      statusMessage: "Late Pledges active • 1065% financé"
    },
    {
      id: 108,
      title: "Make 100: Ceramic Cat Sculptures",
      creatorName: "Teresa",
      creatorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80",
      daysLeft: 0,
      fundedPercent: 102,
      statusMessage: "Late Pledges active • 102% financé"
    },
    {
      id: 109,
      title: "Escarlata Studio, refugio de expresión artística",
      creatorName: "Alicia Cayeria",
      creatorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80",
      image: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=600&q=80",
      daysLeft: 0,
      fundedPercent: 100,
      statusMessage: "Late Pledges active • 100% financé"
    }
  ];

  return (
    <div className="discover-page-wrapper">
      
      {/* Navbar Principale (Hive Standard) */}
      <Navbar 
        onNavigate={onNavigate} 
        isAuthenticated={isAuthenticated} 
        onLogout={onLogout} 
        activeTab="discover" 
      />

      <div className="discover-main">
        
        {/* Dynamic Filter Engine */}
        <div className="discover-filter-section">
          <div className="discover-filter-text">
            <span>Afficher </span>
            
            <div className="custom-dropdown-container">
              <button className="inline-dropdown-btn" onClick={() => setShowCategoryMenu(!showCategoryMenu)}>
                {filterCategory} <span style={{marginLeft: '8px', fontSize: '14px', color: '#0ce688'}}>{showCategoryMenu ? '▲' : '▼'}</span>
              </button>
              {showCategoryMenu && (
                <div className="custom-dropdown-menu">
                  <div className="custom-dropdown-item" onClick={() => { setFilterCategory('Toutes les catégories'); setShowCategoryMenu(false); }}>Toutes les catégories</div>
                  <div className="custom-dropdown-item" onClick={() => { setFilterCategory('Arts & BD'); setShowCategoryMenu(false); }}>Arts & BD</div>
                  <div className="custom-dropdown-item" onClick={() => { setFilterCategory('Artisanat'); setShowCategoryMenu(false); }}>Artisanat</div>
                  <div className="custom-dropdown-item" onClick={() => { setFilterCategory('Cinéma & Vidéo'); setShowCategoryMenu(false); }}>Cinéma & Vidéo</div>
                  <div className="custom-dropdown-item" onClick={() => { setFilterCategory('Projets Solidaires'); setShowCategoryMenu(false); }}>Projets Solidaires</div>
                  <div className="custom-dropdown-item" onClick={() => { setFilterCategory('Tech & App'); setShowCategoryMenu(false); }}>Tech & App</div>
                </div>
              )}
            </div>

            <span>triés par</span>
            <select 
              className="discover-dropdown" 
              value={filterSort} 
              onChange={(e) => setFilterSort(e.target.value)}
            >
              <option>Magique</option>
              <option>Nouveautés</option>
              <option>Popularité</option>
              <option>Fin de campagne</option>
            </select>
          </div>
        </div>

        {/* Results Body */}
        <div className="explore-results-container">
          <div className="explore-results-title">
            Explorer <span>728 projets</span>
          </div>

          <div className="ks-grid">
            {exploreProjects.map(project => (
              <div key={project.id} className="ks-card" onClick={() => onNavigate('projectDetails')}>
                
                {/* Image Box */}
                <div className="ks-card-image-box">
                  <img src={project.image} alt={project.title} className="ks-card-image" loading="lazy" />
                  <div 
                    className="ks-progress-line" 
                    style={{ width: `${Math.min(project.fundedPercent, 100)}%` }}
                  ></div>
                </div>

                {/* Content Area */}
                <div className="ks-card-content">
                  
                  {/* Row 1: Avatar, Title, Bookmark */}
                  <div className="ks-card-top-row">
                    <img src={project.creatorAvatar} alt={project.creatorName} className="ks-creator-avatar" loading="lazy" />
                    <div className="ks-card-title-col">
                      <h3 className="ks-card-title">{project.title}</h3>
                      <button className="ks-bookmark-btn" onClick={(e) => {
                        e.stopPropagation(); // prevent navigation
                        alert('Sauvegardé !');
                      }}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"></path></svg>
                      </button>
                    </div>
                  </div>

                  {/* Row 2: Creator Name */}
                  <div className="ks-creator-name">
                    Par {project.creatorName}
                  </div>

                  {/* Row 3: Stats */}
                  <div className="ks-card-stats">
                    <svg className="ks-clock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{project.statusMessage}</span>
                  </div>

                </div>
              </div>
            ))}
          </div>

          <div className="load-more-container">
            <button className="load-more-btn">
              Charger plus
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Discover;
