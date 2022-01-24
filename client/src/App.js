import { useState, useEffect } from 'react';
import http from './http-common.js';
import Navbar from './components/Navbar.js';
import Dashboard from './components/Dashboard.js';
import EditTeam from './components/EditTeam';
import AboutModal from './components/AboutModal.js';
import './App.css';

export default function App() {
  const [savedTeam, setSavedTeam] = useState({});
  const [skills, setSkills] = useState([]);
  const [elements, setElements] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [dashboardView, setDashboardView] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        await setData();
        setIsLoaded(true);
      } catch (err) {
        setHasErrors(true);
      }
    }
    window.addEventListener("beforeunload", handleUnsavedData);
    initialize();
    return () => {
      window.removeEventListener("beforeunload", handleUnsavedData);
    }
  }, []);

  const setData = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await fetchData();
        setSavedTeam(data.savedTeam);
        setSkills(data.skills);
        setElements(data.elements);
        resolve(true);
      } catch (err) {
        reject(false);
      }
    });
  }

  const fetchData = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let team = window.localStorage.getItem('team');
        if (!team) {
          setIsFirstVisit(true);
          const emptyTeam = await http.get('emptyteam');
          team = JSON.stringify(emptyTeam.data);
          window.localStorage.setItem('team', team);
        }
        const { data } = await http.post('info', team);
        resolve(data);
      } catch (err) {
        reject();
      }
    });
  }

  const handleUnsavedData = async (e) => {
    if (document.querySelectorAll('.demon-card-editing').length > 0) {
      e.preventDefault();
      const confirmed = await handleConfirmDialogue("Are you sure you want to exit?\nYou still have unsaved data.");
      return e.returnValue = confirmed;
    }
  }

  const updateTeam = async (demonData) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (demonData === "") {
          window.localStorage.removeItem('team');
        } else {
          window.localStorage.setItem('team', JSON.stringify(demonData));
        }
        const success = await setData();
        if (success) {
          setIsFirstVisit(false);
          resolve();
        } else {
          throw new Error('Unable to set data.');
        }
      } catch (err) {
        setHasErrors(true);
        reject();
      }
    })
  }

  const handleTab = (isDashboardView) => {
    setDashboardView(isDashboardView);
  }

  const handleError = (error) => {
    setHasErrors(error);
  }

  const handleConfirmDialogue = async (msg) => {
    return new Promise((resolve, reject) => {
      try {
        let confirmed = false;
        const startTime = new Date();
        if (window.confirm(msg)) {
          confirmed = true;
        }
        if (confirmed || new Date()-startTime < 50) {
          return resolve(true);
        }
        return resolve(false);
      } catch (err) {
        setHasErrors(true);
        reject();
      }
    });    
  }

  const errorAlert = () => {
    return (
      <div className="row vh-100 text-light d-flex justify-content-center align-items-center">
          <div className="row">
            <div className="dashboard-error flex-col col text-center py-5">
              <span className="dashboard-error-title display-3">ERROR</span>
              <span>Something went wrong while trying to process your request.<br/>Please try again later.</span>
            </div>
          </div>
      </div>
    );
  }

  const firstVisitAlert = () => {
    return (
      <div className="first-visit-alert flex-col" role="alert">
        <span>Welcome to the Shin Megami Tensei IV Skills Manager.</span>
        <span>Visit the About section to learn about this tool.</span>
        <span>Otherwise, click Edit Team to begin adding your demons.</span>
      </div>
    );
  }

  const loadingMessage = () => {
    return (
      <div className="row vh-100 text-light d-flex justify-content-center align-items-center">
        <div className="loading-container d-flex flex-column align-items-center">
          <h1 className="display-1 mb-5">Loading</h1>
          <div className="spinner-border loadingSpinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar handleTab={handleTab} handleUnsavedData={handleUnsavedData} />
      <div className="container">
        {hasErrors ?
        (
          errorAlert() 
        ) :
        (
          <div>
            {isLoaded ? 
            (
              <div className="row">

                {isFirstVisit && dashboardView && firstVisitAlert()}

                {dashboardView ?
                (
                  <Dashboard elements={elements} isFirstVisit={isFirstVisit} isLoaded={isLoaded} />
                ) :
                (
                  <EditTeam team={savedTeam} skills={skills} updateTeam={updateTeam} handleError={handleError} handleConfirmDialogue={handleConfirmDialogue} />
                )}
              </div>
            ) :
            (
              loadingMessage()
            )}
          </div>
        )}
      </div>

      <AboutModal />
    </div>
  );
}
