import { useState, useRef } from "react";
import SkillDropdown from "./SkillDropdown";

export default function DemonCardEditing({ demon, demonID, handleUpdate, handleCancel, handleRemove, skills, isDisabled, isUniqueName }) {
    const [editing, setEditing] = useState("");
    const [hasError, setHasError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [unsaved, setUnsaved] = useState([]);
    const skillsRef = useRef(null);
    const nameRef = useRef(null);

    const handleFocus = (skillID) => {
        setEditing(skillID);
    }

    const handleBlur = (e) => {
        setEditing("");
    }

    const handleChange = () => {
        handleUnsaved('name', demon.name ? nameRef.current.value !== demon.name : nameRef.current.value !== "");
    }

    const handleUnsaved = (slot, value) => {
        const slotIndex = unsaved.indexOf(slot);
        if (slotIndex === -1 && value) {
            setUnsaved([...unsaved, slot]);
        } else if (slotIndex > -1 && !value) {
            setUnsaved(unsaved.filter(v => v !== slot));
        }
    }

    const handleClick = () => {
        setHasError(false);
        if (nameRef.current.value === "") {
            return handleError('You must give your demon a name.');
        }
        if (!isUniqueName(demonID, nameRef.current.value)) {
            return handleError('A demon with that name already exists on your team.');
        }
        const newDemon = {name: nameRef.current.value, skills: {}};
        const skillsSet = new Set();
        for (let node of skillsRef.current.childNodes) {
            const newSkill = node.attributes.selectedskill.value;
            if (newSkill && skillsSet.has(newSkill)) {
                return handleError(`A demon can't have multiple of the same skill.\nPlease have only one ${node.attributes.selectedskillname.value}.`);
            }
            skillsSet.add(newSkill);
            newDemon['skills'][node.attributes.id.value] = node.attributes.selectedskill.value;
        }
        const success = handleUpdate(newDemon);
        if (success) {
            setEditing("");
        } else {
            return handleError(`The server was unable to process your request.\nPlease try again later.`);
        }
    }

    const handleError = (msg) => {
        setHasError(true);
        setErrorMsg(msg);
    }

    return (
        <div className={`demon-card flex-col demon-card-editing ${unsaved.length > 0 ? 'demon-card-unsaved' : ''}`} demonid={demonID}>
            <div className="demon-card-title">
                <input autoComplete="off" type="text" ref={nameRef} onChange={handleChange} name="name" id={`${demonID}-name`} className="input-name" placeholder="Name" defaultValue={demon.name ? demon.name : ''} />
            </div>

            <ul className="input-skills" ref={skillsRef}>
                {Object.entries(demon['skills']).map(([k, v]) => { 
                        return <SkillDropdown handleBlur={handleBlur} handleUnsaved={handleUnsaved} key={k} skillID={k} activeSkillID={v._id} activeSkillName={v.name} skills={skills} isEditing={editing === k} handleFocus={handleFocus} />
                    })
                }
            </ul>

            {hasError && (
                <div className="error-container">
                    <h5>ERROR</h5>
                    {errorMsg.split("\n").map(msg => <span key={msg[0]}>{msg}<br/></span>)}
                </div>
            )}
            
            <div className="demon-card-editing-footer">
                <div className="input-btn-container">
                    <button onClick={handleCancel} disabled={isDisabled} className="input-btn input-btn-cancel btn-generic">
                        <img className="demon-card-editing-icon" src="/icons/cancel.svg" alt="Cancel icon"></img>
                        <span>Cancel</span>
                    </button>
                    <button onClick={handleRemove} disabled={isDisabled} className="input-btn input-btn-remove btn-generic">
                        <img className="demon-card-editing-icon" src="/icons/remove.svg" alt="Remove icon"></img>
                        <span>Remove</span></button>
                    <button onClick={handleClick} disabled={isDisabled} className="input-btn input-btn-save btn-generic">
                        <img className="demon-card-editing-icon" src="/icons/save.svg" alt="Save icon"></img>
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
}