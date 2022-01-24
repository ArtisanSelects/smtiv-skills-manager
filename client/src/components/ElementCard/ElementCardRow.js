import { useRef } from 'react';

export default function ElementCardRow({ skill, handleMouseEnter, handleMouseLeave, isFocused }) {
    const skillRowRef = useRef(null);

    const handleEnter = () => {
        return handleMouseEnter(skill.description, skill._id);
    }

    return (
        <div ref={skillRowRef} key={skill._id} className={`element-card-body-row ${isFocused ? 'element-card-body-row-active' : ''}`} tabIndex="0" onMouseEnter={handleEnter} onFocus={handleEnter} onBlur={handleMouseLeave} onMouseLeave={handleMouseLeave} >
            <div className="element-card-body-bg">
                <div className="element-card-body-skill">
                    <img src={`/icons/${skill.element}.png`} alt="" />
                    <span>{skill.name}</span>
                </div>
                <div className="element-card-body-demons flex-col">
                    {Object.values(skill.knows).map(demon => <span key={demon}>{demon}</span>)}
                </div>
            </div>
            
        </div>
    );
}