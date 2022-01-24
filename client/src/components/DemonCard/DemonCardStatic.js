export default function DemonCardStatic({ demon, demonID, handleEdit, isDisabled }) {
    return (
        <div className="demon-card flex-col" demonid={demonID} onClick={handleEdit}>
            <div className="demon-card-title">
                {demon.name ? demon.name : 'Empty'}
            </div>
            <div className="demon-card-body">
                <div className="demon-card-body-left">
                    <button className="demon-card-edit-btn btn-orange btn-generic" disabled={isDisabled}>EDIT</button>
                </div>
                <div className="demon-card-body-right">
                    <ul className="demon-card-skills">
                        {Object
                            .entries(demon['skills'])
                            .map(([k, v]) => 
                                <li className="demon-card-skill flex-col" key={k} value={v ? v.name : ''} id={k}>
                                    <div className="demon-card-skill-top">
                                        <div className="demon-card-skill-label">
                                            {v && <img className="demon-card-skill-icon" src={`/icons/${v.element}.png`} alt="Elemental icon" />}
                                            <span>{v ? v.name : 'Empty'}</span>
                                        </div>
                                    </div>
                                    <div className="demon-card-skill-bottom">
                                        <div className="demon-card-skill-bottom-left"></div>
                                        <div className="demon-card-skill-bottom-right"></div>
                                    </div>  
                                </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}