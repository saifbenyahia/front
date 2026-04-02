import React, { useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

// Lazy loading components
const Home = React.lazy(() => import('./Home'));
const SignIn = React.lazy(() => import('./SignIn'));
const SignUp = React.lazy(() => import('./SignUp'));
const ForgotPassword = React.lazy(() => import('./ForgotPassword'));
const Settings = React.lazy(() => import('./Settings'));
const Profile = React.lazy(() => import('./Profile'));
const SavedProjects = React.lazy(() => import('./SavedProjects'));
const ProjectDetails = React.lazy(() => import('./ProjectDetails'));
const Discover = React.lazy(() => import('./Discover'));
const StartProject = React.lazy(() => import('./StartProject'));
const CreateProjectStep1 = React.lazy(() => import('./CreateProjectStep1'));
const CreateProjectStep2 = React.lazy(() => import('./CreateProjectStep2'));
const CreateProjectStep3 = React.lazy(() => import('./CreateProjectStep3'));
const ProjectEditor = React.lazy(() => import('./ProjectEditor'));

function AppContent() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signInMessage, setSignInMessage] = useState('');
  
  // State for project draft
  const [draftProject, setDraftProject] = useState({
    category: '',
    title: '',
    subtitle: '',
    photoName: ''
  });

  // Polyfill function replacing the old onNavigate to redirect to React Router navigate
  // while keeping the same interface used in all components
  const handleNavigate = (view, msg = '') => {
    if (view === 'signIn' && msg) setSignInMessage(msg);
    
    // Mapping views to paths
    const routeMap = {
      'home': '/',
      'signIn': '/login',
      'signUp': '/register',
      'forgotPassword': '/forgot-password',
      'settings': '/settings',
      'profile': '/profile',
      'saved': '/saved',
      'projectDetails': '/project', // Later this will be /project/:id
      'discover': '/discover',
      'startProject': '/start',
      'createProjectStep1': '/create/step1',
      'createProjectStep2': '/create/step2',
      'createProjectStep3': '/create/step3',
      'projectEditor': '/editor'
    };

    if (routeMap[view]) {
      navigate(routeMap[view]);
    } else {
      console.warn(`No route mapped for view: ${view}`);
      navigate('/');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <Suspense fallback={<div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', color: '#0ce688', backgroundColor: '#0b0f19' }}>Chargement...</div>}>
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} onNavigate={handleNavigate} onLogout={handleLogout} />} />
        
        <Route path="/login" element={<SignIn message={signInMessage} onSwitch={() => { setSignInMessage(''); navigate('/register'); }} onForgotPassword={() => navigate('/forgot-password')} onHome={() => { setIsAuthenticated(true); navigate('/'); }} />} />
        <Route path="/register" element={<SignUp onSwitch={() => navigate('/login')} onHome={() => { setIsAuthenticated(true); navigate('/'); }} />} />
        <Route path="/forgot-password" element={<ForgotPassword onSwitch={() => navigate('/login')} onHome={() => navigate('/')} />} />
        
        <Route path="/discover" element={<Discover isAuthenticated={isAuthenticated} onNavigate={handleNavigate} onLogout={handleLogout} />} />
        <Route path="/project" element={<ProjectDetails isAuthenticated={isAuthenticated} onNavigate={handleNavigate} onLogout={handleLogout} />} />
        
        <Route path="/start" element={<StartProject isAuthenticated={isAuthenticated} onNavigate={handleNavigate} onLogout={handleLogout} />} />
        <Route path="/create/step1" element={<CreateProjectStep1 onNavigate={handleNavigate} onSaveDraft={(data) => setDraftProject(prev => ({...prev, ...data}))} draftProject={draftProject} />} />
        <Route path="/create/step2" element={<CreateProjectStep2 onNavigate={handleNavigate} />} />
        <Route path="/create/step3" element={<CreateProjectStep3 onNavigate={handleNavigate} onSaveDraft={(data) => setDraftProject(prev => ({...prev, ...data}))} draftProject={draftProject} />} />
        <Route path="/editor" element={<ProjectEditor onNavigate={handleNavigate} draftProject={draftProject} onSaveDraft={(data) => setDraftProject(prev => ({...prev, ...data}))} />} />
        
        <Route path="/settings" element={<Settings isAuthenticated={isAuthenticated} onNavigate={handleNavigate} onLogout={handleLogout} />} />
        <Route path="/profile" element={<Profile isAuthenticated={isAuthenticated} onNavigate={handleNavigate} onLogout={handleLogout} />} />
        <Route path="/saved" element={<SavedProjects isAuthenticated={isAuthenticated} onNavigate={handleNavigate} onLogout={handleLogout} />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
