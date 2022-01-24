import { useState, useRef } from 'react';

export default function SkillDropdown({ skills, skillID, activeSkillID, activeSkillName, handleFocus, isEditing, handleUnsaved }) {

    const [options, setOptions] = useState([...skills]);
    const [selectedSkillID, setSelectedSkillID] = useState(activeSkillID || "");
    const [selectedSkillName, setSelectedSkillName] = useState(activeSkillName || "Empty");
    const [inputField, setInputField] = useState(activeSkillName || "Empty");
    const inputRef = useRef(null);

    const handleChange = (e) => {
        const value = e.target.value.toLowerCase();
        setInputField(value);
        setOptions(skills.filter(skill => skill.name.toLowerCase().includes(value)));
    }

    const handleClick = (e) => {
        if (e.target.classList.contains('btn-close')) {
            handleRemove();
        } else {
            if (inputField === "Empty") {
                setInputField("");
            }
            inputRef.current.select();
            handleFocus(skillID);
        }
    }

    const handleFocusOff = (e) => {
        setOptions([...skills]);
        if (!e.relatedTarget || !e.relatedTarget.classList.contains('input-select-option')) {
            setInputField(selectedSkillName);
            handleFocus("");
        } else {
            handleUnsaved(skillID, e.relatedTarget.attributes.value.value !== activeSkillID ? true : false);
            setInputField(e.relatedTarget.textContent);
            setSelectedSkillName(e.relatedTarget.textContent);
            setSelectedSkillID(e.relatedTarget.attributes.value.value);
            handleFocus("");
        }
    }

    const handleRemove = () => {
        setOptions([...skills]);
        handleUnsaved(skillID, activeSkillID !== undefined ? true : false);
        setInputField("Empty");
        setSelectedSkillName("Empty");
        setSelectedSkillID("");
        handleFocus("");
    }

    return (
        <div className={`input-skill-container ${isEditing && 'input-skill-container-active'}`} id={skillID} selectedskill={selectedSkillID} selectedskillname={selectedSkillName} onFocus={handleClick} onBlur={handleFocusOff} >
            <input type="text" className="input-skill" ref={inputRef} value={inputField} onChange={handleChange} />            
            <button type="button" className="btn-close" onMouseDown={handleClick} ></button>
            <div className="divider"></div>
            <button type="button" className={`input-dropdown ${isEditing && 'input-dropdown-active'}`}>
                <img src="/icons/dropdown.svg" alt="Dropdown icon" />
            </button>
            {isEditing && (
                <ul className="input-select">
                    {options.map(skill => <li tabIndex="0" className="input-select-option" key={skill._id} value={skill._id}>{skill.name}</li>)}
                </ul>
            )}
        </div>
    )
}