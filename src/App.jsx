import React, { useState } from 'react';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import Settings from './Settings';
import Profile from './Profile';
import SavedProjects from './SavedProjects';
import ProjectDetails from './ProjectDetails';
import Discover from './Discover';
import StartProject from './StartProject';
import CreateProjectStep1 from './CreateProjectStep1';
import CreateProjectStep2 from './CreateProjectStep2';
import CreateProjectStep3 from './CreateProjectStep3';
// Import ProjectEditor we will create later
import ProjectEditor from './ProjectEditor';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // State for project draft
  const [draftProject, setDraftProject] = useState({
    category: '',
    title: '',
    subtitle: '',
    photoName: ''
  });

  return (
    <>
      {currentView === 'home' && (
        <Home 
           isAuthenticated={isAuthenticated} 
           onNavigate={(view) => setCurrentView(view)} 
           onLogout={() => setIsAuthenticated(false)}
        />
      )}
      {currentView === 'projectDetails' && (
        <ProjectDetails 
           onNavigate={(view) => setCurrentView(view)} 
           onLogout={() => setIsAuthenticated(false)}
        />
      )}
      {currentView === 'discover' && (
        <Discover 
           onNavigate={(view) => setCurrentView(view)} 
           onLogout={() => {
             setIsAuthenticated(false);
             setCurrentView('home');
           }}
        />
      )}
      {currentView === 'startProject' && (
        <StartProject 
           onNavigate={(view) => setCurrentView(view)} 
           onLogout={() => {
             setIsAuthenticated(false);
             setCurrentView('home');
           }}
        />
      )}
      {currentView === 'createProjectStep1' && (
        <CreateProjectStep1 
           onNavigate={(view) => setCurrentView(view)} 
           onSaveDraft={(data) => setDraftProject(prev => ({...prev, ...data}))}
           draftProject={draftProject}
        />
      )}
      {currentView === 'createProjectStep2' && (
        <CreateProjectStep2 
           onNavigate={(view) => setCurrentView(view)} 
        />
      )}
      {currentView === 'createProjectStep3' && (
        <CreateProjectStep3 
           onNavigate={(view) => setCurrentView(view)} 
           onSaveDraft={(data) => setDraftProject(prev => ({...prev, ...data}))}
           draftProject={draftProject}
        />
      )}
      {currentView === 'projectEditor' && (
        <ProjectEditor 
           onNavigate={(view) => setCurrentView(view)} 
           draftProject={draftProject}
           onSaveDraft={(data) => setDraftProject(prev => ({...prev, ...data}))}
        />
      )}
      {currentView === 'settings' && (
        <Settings 
           onNavigate={(view) => setCurrentView(view)} 
           onLogout={() => {
             setIsAuthenticated(false);
             setCurrentView('home');
           }}
        />
      )}
      {currentView === 'profile' && (
        <Profile 
           onNavigate={(view) => setCurrentView(view)} 
           onLogout={() => {
             setIsAuthenticated(false);
             setCurrentView('home');
           }}
        />
      )}
      {currentView === 'saved' && (
        <SavedProjects 
           onNavigate={(view) => setCurrentView(view)} 
           onLogout={() => {
             setIsAuthenticated(false);
             setCurrentView('home');
           }}
        />
      )}
      {currentView === 'signIn' && (
        <SignIn 
           onSwitch={() => setCurrentView('signUp')} 
           onForgotPassword={() => setCurrentView('forgotPassword')}
           onHome={() => {
             setIsAuthenticated(true);
             setCurrentView('home');
           }}
        />
      )}
      {currentView === 'signUp' && (
        <SignUp 
           onSwitch={() => setCurrentView('signIn')} 
           onHome={() => {
             setIsAuthenticated(true);
             setCurrentView('home');
           }}
        />
      )}
      {currentView === 'forgotPassword' && (
        <ForgotPassword 
           onSwitch={() => setCurrentView('signIn')} 
           onHome={() => setCurrentView('home')}
        />
      )}
    </>
  );
}

export default App;
