import { useState } from 'react';
import ElementCardRow from './ElementCardRow';

export default function ElementCard({ element }) {
   const [activeDescription, setActiveDescription] = useState("");
   const [hasFocus, setHasFocus] = useState("");
   const skillCount = Object.keys(element.knownSkills).length;

   const handleMouseEnter = (description, skillID) => {
        setActiveDescription(description);
        setHasFocus(skillID);   
   }

   const handleMouseLeave = () => {
       setActiveDescription("");
       setHasFocus("");
   }

    return (
        <div className="col-sm-12 col-lg-5 col-xxl-3 p-0 element-card flex-col">
            <div className="element-card-header">
                <div className="element-card-title">
                    <h3 className="element-card-title-value">{element.name}</h3>
                </div>
                <div className="triangle"></div>
                <div className="element-card-abilities">
                    <span className="element-card-abilities-label">Abilities</span>
                    <span className="element-card-abilities-value">{skillCount}</span>
                </div>
            </div>

            <div className="element-card-desc">
                <div className="element-card-desc-label">
                    <span>Description</span>
                </div>
                <div className="element-card-desc-value">
                    <span>{activeDescription}</span>
                </div>
            </div>

            <div className="element-card-body flex-col">
                {Object.values(element.knownSkills).map(skill => <ElementCardRow key={skill._id} skill={skill} isFocused={hasFocus === skill._id} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />)}
            </div>

            <div className="element-card-empty-space">
                {skillCount === 0 && <p>Empty</p>}
            </div>

            
        </div>
    );
}