import React, { useState } from 'react';
import './AdminDashboard.css';

// ============================================
// Données Fictives - Contexte Tunisien
// ============================================

const KPI_DATA = {
  totalFunds: 840500, // en TND
  activeCampaigns: 42,
  closedCampaigns: 18,
  successRate: 76,
  totalUsers: 3450,
  commissionRate: 0.05,
  avgFunding: 18500,
  monthlyGrowth: 14.2,
  categorySplit: [
    { name: 'Technologie', value: 42 },
    { name: 'Agriculture', value: 25 },
    { name: 'Culture', value: 20 },
    { name: 'Solidarité', value: 13 }
  ],
  recentTransactions: [
    { id: 'tx1', project: 'Dar El Harka', amount: '+ 500 DT', type: 'Donation', date: 'Il y a 5 min' },
    { id: 'tx2', project: 'Oasis Solidaire', amount: '+ 120 DT', type: 'Donation', date: 'Il y a 22 min' },
    { id: 'tx3', project: 'Tbibi v2', amount: '+ 1 500 DT', type: 'Donation', date: 'Il y a 1 heure' },
    { id: 'tx4', project: 'TechForKids', amount: '- 4 000 DT', type: 'Remboursement', date: 'Hier' }
  ]
};

const PENDING_CAMPAIGNS = [
  { id: 'p1', title: 'StartUp : E-Mobility Tunis', creator: 'Ahmed K.', target: 120000, category: 'Tech', date: '2023-11-20' },
  { id: 'p2', title: 'Festival Cinéma Plein Air', creator: 'Asso. Kairouan', target: 15000, category: 'Culture', date: '2023-11-22' },
  { id: 'p3', title: 'Ferme Hydroponique Mornag', creator: 'Sonia B.', target: 45000, category: 'Agriculture', date: '2023-11-23' }
];

const USER_LIST = [
  { id: 'u1', name: 'Ayoub B.', role: 'Créateur', email: 'ayoub@hive.tn', status: 'actif', joined: '2023-01-10' },
  { id: 'u2', name: 'Karim F.', role: 'Donateur', email: 'karim.f@gmail.com', status: 'actif', joined: '2023-05-14' },
  { id: 'u3', name: 'Salma D.', role: 'Créateur', email: 'salmad@startup.tn', status: 'suspendu', joined: '2023-08-02' }
];

const MILESTONES_QUEUE = [
  { id: 'm1', project: 'Oasis Solidaire', step: 'Jalon 2 : Équipements', amount: '10 000 DT', evidenceType: 'Facture & Photos', date: 'Aujourd\'hui' },
  { id: 'm2', project: 'Dar El Harka', step: 'Jalon 1 : Loyer', amount: '5 000 DT', evidenceType: 'Contrat de bail', date: 'Hier' }
];

const CATEGORIES = [
  { id: 1, name: 'Environnement & Agriculture', count: 14 },
  { id: 2, name: 'Technologie & Startups', count: 28 },
  { id: 3, name: 'Culture & Arts', count: 9 },
  { id: 4, name: 'Solidarité & Social', count: 21 },
];

/**
 * Composant AdminDashboard - BRESS Style (Traduit en Français)
 */
const AdminDashboard = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [rejectModal, setRejectModal] = useState({ isOpen: false, campaignId: null, reason: '' });

  const handleApprove = (id) => {
    alert(`Campagne ${id} approuvée ! Elle est maintenant en ligne.`);
  };

  const handleRejectClick = (id) => {
    setRejectModal({ isOpen: true, campaignId: id, reason: '' });
  };

  const confirmRejection = () => {
    if (!rejectModal.reason.trim()) {
      alert("Le motif de refus est obligatoire.");
      return;
    }
    alert(`Campagne ${rejectModal.campaignId} refusée. Motif : ${rejectModal.reason}`);
    setRejectModal({ isOpen: false, campaignId: null, reason: '' });
  };

  return (
    <div className="admin-wrapper">
      
      {/* ──────── Sidebar ──────── */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-top">
          <span className="admin-logo" onClick={() => onNavigate('home')}>Hive.tn</span>
        </div>

        <div className="admin-nav">
          <div className={`admin-nav-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
            <div className="nav-label"><span className="nav-icon">◱</span> Tableau de Bord</div>
          </div>

          <div className={`admin-nav-item ${activeTab === 'moderation' ? 'active' : ''}`} onClick={() => setActiveTab('moderation')}>
            <div className="nav-label"><span className="nav-icon">⊟</span> Modération</div>
            {PENDING_CAMPAIGNS.length > 0 && <span className="nav-count">{PENDING_CAMPAIGNS.length}</span>}
          </div>

          <div className={`admin-nav-item ${activeTab === 'validation' ? 'active' : ''}`} onClick={() => setActiveTab('validation')}>
            <div className="nav-label"><span className="nav-icon">◧</span> Validation Fonds</div>
            {MILESTONES_QUEUE.length > 0 && <span className="nav-count">{MILESTONES_QUEUE.length}</span>}
          </div>

          <div className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            <div className="nav-label"><span className="nav-icon">☺</span> Utilisateurs & Rôles</div>
          </div>

          <div className={`admin-nav-item ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => setActiveTab('categories')}>
            <div className="nav-label"><span className="nav-icon">▤</span> Catégories</div>
          </div>
        </div>

        {/* Profil descendu à la manière de BRESS */}
        <div className="admin-sidebar-footer">
          <div className="sidebar-profile-avatar">SA</div>
          <div className="sidebar-profile-name">Super Admin</div>
          <div className="sidebar-profile-role">admin@hive.tn</div>
        </div>
      </aside>

      {/* ──────── Main Content ──────── */}
      <main className="admin-main">

        {/* Header Style BRESS (Pill shape) */}
        <header className="admin-header">
          <div className="admin-header-left">
            <div className="search-placeholder">
              <span>🔍</span> Rechercher...
            </div>
            <div className="admin-date">Lundi, 6 Mars ⋁</div>
          </div>
          <div className="admin-header-actions">
            <button className="btn-primary" onClick={() => onNavigate('home')}>Quitter l'Admin</button>
          </div>
        </header>

        <section className="admin-content">

          {/* ── TAB: Analytics ── */}
          {activeTab === 'analytics' && (
            <div className="fade-in">
              <div className="admin-widgets">
                <div className="admin-card">
                  <p className="widget-title">Fonds Totaux</p>
                  <p className="widget-value">{KPI_DATA.totalFunds.toLocaleString()} <span>DT</span></p>
                  <div className="widget-trend">▲ +{KPI_DATA.monthlyGrowth}%</div>
                </div>
                <div className="admin-card">
                  <p className="widget-title">Revenus Plateforme (5%)</p>
                  <p className="widget-value">{(KPI_DATA.totalFunds * KPI_DATA.commissionRate).toLocaleString()} <span>DT</span></p>
                  <div className="widget-trend">Commission Nette</div>
                </div>
                <div className="admin-card">
                  <p className="widget-title">Campagnes Actives</p>
                  <p className="widget-value">{KPI_DATA.activeCampaigns}</p>
                  <div className="widget-trend">Mois en cours</div>
                </div>
                <div className="admin-card">
                  <p className="widget-title">Taux de Succès</p>
                  <p className="widget-value">{KPI_DATA.successRate} <span>%</span></p>
                  <div className="widget-trend">{KPI_DATA.totalUsers.toLocaleString()} Utilisateurs</div>
                </div>
              </div>

              <div className="analytics-grid">
                <div className="admin-table-wrapper" style={{ padding: '0', background: 'transparent', boxShadow: 'none' }}>
                  <div className="analytics-card">
                    <p className="analytics-card-title">Répartition par Secteur</p>
                    {KPI_DATA.categorySplit.map(cat => (
                      <div className="category-bar-item" key={cat.name}>
                        <div className="category-bar-header">
                          <span className="category-bar-label">{cat.name}</span>
                          <span className="category-bar-pct">{cat.value}%</span>
                        </div>
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: `${cat.value}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="admin-table-wrapper">
                  <div className="table-header-bar">
                    <h4>Transactions en Direct</h4>
                  </div>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Projet</th>
                        <th>Type</th>
                        <th>Montant</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {KPI_DATA.recentTransactions.map(tx => (
                        <tr key={tx.id}>
                          <td className="cell-primary">{tx.project}</td>
                          <td><span className={`status-badge ${tx.type === 'Donation' ? 'actif' : 'suspendu'}`}>{tx.type}</span></td>
                          <td className={tx.type === 'Donation' ? 'cell-positive' : 'cell-negative'}>{tx.amount}</td>
                          <td className="cell-secondary">{tx.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB: Modération ── */}
          {activeTab === 'moderation' && (
            <div className="fade-in admin-table-wrapper">
              <div className="table-header-bar">
                <h4>En attente de Modération</h4>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Titre de la Campagne</th>
                    <th>Créateur</th>
                    <th>Objectif</th>
                    <th>Catégorie</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {PENDING_CAMPAIGNS.map(camp => (
                    <tr key={camp.id}>
                      <td className="cell-primary">{camp.title}</td>
                      <td className="cell-secondary">{camp.creator}</td>
                      <td className="cell-primary">{camp.target.toLocaleString()} DT</td>
                      <td><span className="status-badge attente">{camp.category}</span></td>
                      <td>
                        <button className="action-btn" onClick={() => handleApprove(camp.id)}>Approuver</button>
                        <button className="action-btn" onClick={() => handleRejectClick(camp.id)} style={{ color: '#ef4444' }}>Refuser</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── TAB: Validation Funds ── */}
          {activeTab === 'validation' && (
            <div className="fade-in admin-table-wrapper">
              <div className="table-header-bar">
                <h4>Vérification des Preuves (Jalons)</h4>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Projet</th>
                    <th>Jalon</th>
                    <th>Montant à Débloquer</th>
                    <th>Type de Preuve</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MILESTONES_QUEUE.map(ml => (
                    <tr key={ml.id}>
                      <td className="cell-primary">{ml.project}</td>
                      <td className="cell-secondary">{ml.step}</td>
                      <td className="cell-primary">{ml.amount}</td>
                      <td><span className="status-badge attente">{ml.evidenceType}</span></td>
                      <td>
                        <button className="action-btn">Inspecter</button>
                        <button className="action-btn" style={{ color: '#10b981' }}>Valider les Fonds</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── TAB: Users ── */}
          {activeTab === 'users' && (
            <div className="fade-in admin-table-wrapper">
              <div className="table-header-bar">
                <h4>Utilisateurs de la Plateforme</h4>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Rôle</th>
                    <th>Email</th>
                    <th>Statut</th>
                    <th>Gérer</th>
                  </tr>
                </thead>
                <tbody>
                  {USER_LIST.map(u => (
                    <tr key={u.id}>
                      <td className="cell-primary">{u.name}</td>
                      <td className="cell-secondary">{u.role}</td>
                      <td className="cell-secondary">{u.email}</td>
                      <td>
                        <span className={`status-badge ${u.status === 'actif' ? 'actif' : 'suspendu'}`}>
                          {u.status === 'actif' ? 'Actif' : 'Suspendu'}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn">Modifier</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── TAB: Categories ── */}
          {activeTab === 'categories' && (
            <div className="fade-in admin-table-wrapper">
              <div className="table-header-bar">
                <h4>Catégories de Projets</h4>
                <button className="btn-primary">Ajouter une Catégorie</button>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nom de la Catégorie</th>
                    <th>Nombre de Projets Actifs</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {CATEGORIES.map(cat => (
                    <tr key={cat.id}>
                      <td className="cell-primary">{cat.name}</td>
                      <td className="cell-secondary">{cat.count} au total</td>
                      <td>
                        <button className="action-btn">Modifier</button>
                        <button className="action-btn" style={{ color: '#ef4444' }}>Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </section>
      </main>

      {/* ──────── Modal de Refus ──────── */}
      {rejectModal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Refuser la Campagne</h3>
            <p className="modal-desc">
              Fournissez une raison détaillée. Celle-ci sera automatiquement envoyée par email au créateur de la campagne.
            </p>
            <textarea
              className="modal-textarea"
              placeholder="Ex : Le plan d'affaires est incomplet..."
              value={rejectModal.reason}
              onChange={(e) => setRejectModal({ ...rejectModal, reason: e.target.value })}
            />
            <div className="modal-actions">
              <button className="action-btn" onClick={() => setRejectModal({ isOpen: false, campaignId: null, reason: '' })}>Annuler</button>
              <button className="btn-reject-confirm" onClick={confirmRejection}>Envoyer le Refus</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
