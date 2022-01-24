import { useRef, useEffect } from "react";

export default function Navbar({ handleTab, handleUnsavedData }) {
    const dashboardTab = useRef(null);
    const editTab = useRef(null);
    const aboutTab = useRef(null);
    const navbarBrand = useRef(null);

    const handleClick = (e) => {
        const dashboardView = (e) => {
            const unsavedPrompt = handleUnsavedData(e);
            if (unsavedPrompt || unsavedPrompt === undefined) {
                editTab.current.classList.remove('active');
                dashboardTab.current.classList.add('active');
                handleTab(true);
            }
        }

        switch (e.target) {
            case editTab.current:
                dashboardTab.current.classList.remove('active');
                editTab.current.classList.add('active');
                handleTab(false);
                break;

            case navbarBrand.current:
                dashboardView(e);
                break;

            case dashboardTab.current:
                dashboardView(e);
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        function blurAboutTab() {
            aboutTab.current.blur();
        }
        window.addEventListener('hidden.bs.modal', blurAboutTab);
        return () => {
            window.removeEventListener('hidden.bs.modal', blurAboutTab);
        }
      }, []);

    return (
        <nav className="navbar pb-0">
            <div className="container">
                <div ref={navbarBrand} onClick={handleClick} className="navbar-brand">SMT IV Skills Manager</div>
                <ul className="nav flex-grow-1 border-0">
                    <li className="navbar-item">
                        <button className="navbar-link active" tabIndex="0" ref={dashboardTab} onClick={handleClick}>
                            Dashboard
                        </button>
                    </li>
                    <li className="navbar-item">
                        <button className="navbar-link" tabIndex="0" ref={editTab} onClick={handleClick}>
                            Edit Team
                        </button>
                    </li>
                    <li className="navbar-item">
                        <button className="navbar-link" tabIndex="0" ref={aboutTab} onClick={handleClick} data-bs-toggle="modal" data-bs-target="#aboutModal">
                            About
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}