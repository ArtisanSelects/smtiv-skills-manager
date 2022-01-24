import { useState } from 'react';
import DemonCard from "./DemonCard/DemonCard";

export default function EditTeam({ team, updateTeam, skills, handleError, handleConfirmDialogue }) {
    const demonArray = Array.from(Array(24).keys());
    const [editing, setEditing] = useState("");

    const handleClick = async (value) => {
        if (value !== "" && document.querySelectorAll('.demon-card-unsaved').length > 0) {
            const confirmed = await handleConfirmDialogue(`You still have unsaved data.\nDiscard changes?`);
            if (confirmed) {
                setEditing(value);
            }
        } else {
            setEditing(value);
        }
    }

    const isUniqueName = (demonID, name) => {
        for (let demon in team) {
            if (team[demon]['name'] === name && demonID !== demon) {
                return false;
            }
        }
        return true;
    }

    const handleRemoveAll = async () => {
        const confirmed = await handleConfirmDialogue('Are you sure you want to remove every demon from your team?');
        if (confirmed) {
            window.scrollTo(0, 0);
            updateTeam("");
        }
    }

    return (
        <div className="row d-flex align-items-stretch justify-content-center">
            {demonArray.map(i => {
                const demonID = `d${i}`;
                return (
                    <DemonCard editing={editing === demonID} handleConfirmDialogue={handleConfirmDialogue} handleError={handleError} isUniqueName={isUniqueName} handleClick={handleClick} updateTeam={updateTeam} key={demonID} demonID={demonID} demon={team[demonID]} skills={skills}  />
                );
            })}
            <div className="row justify-content-center">
                <button onClick={handleRemoveAll} className="btn-remove-all btn-generic col-sm-11 col-md-8 col-lg-6">Remove All</button>
            </div>
        </div>
    );
}