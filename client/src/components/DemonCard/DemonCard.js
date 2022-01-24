import React, { useState } from "react";
import DemonCardStatic from "./DemonCardStatic";
import DemonCardEditing from "./DemonCardEditing";

export default function DemonCard({ demon, demonID, updateTeam, skills, editing, handleClick, isUniqueName, handleError, handleConfirmDialogue }) {
    const [disabled, setDisabled] = useState(false);

    const handleUpdate = async (demonData) => {
        const newTeam = JSON.parse(window.localStorage.getItem('team'));
        newTeam[demonID] = demonData;
        handleSave(newTeam);
    }

    const handleRemove = async () => {
        const confirmed = await handleConfirmDialogue('Are you sure you want to remove this demon from your team?');
        if (confirmed) {
            const newTeam = JSON.parse(window.localStorage.getItem('team'));
            newTeam[demonID]['name'] = '';
            for (let skill in newTeam[demonID]['skills']) {
                newTeam[demonID]['skills'][skill] = '';
            }
            handleSave(newTeam);
        }
    }

    const handleSave = async (demonData) => {
        setDisabled(true);
        try {
            await updateTeam(demonData);
            handleCancel();
            setDisabled(false);
        } catch (err) {
            handleError(true);
        }
    }

    const handleEdit = () => {
        handleClick(demonID);
    }

    const handleCancel = () => {
        handleClick("");
    }

    return (
        <div className={`d-flex col-sm-12 ${editing ? "col-lg-6" : "col-md-6 col-lg-4 col-xxl-3"}`}>
            {editing ? (
                <DemonCardEditing isDisabled={disabled} isUniqueName={isUniqueName} handleUpdate={handleUpdate} handleEdit={handleEdit} handleCancel={handleCancel} handleRemove={handleRemove} key={demonID} demonID={demonID} demon={demon} skills={skills} />
            ) : (
                <DemonCardStatic isDisabled={disabled} handleEdit={handleEdit} key={demonID} demonID={demonID} demon={demon} />
            )}
        </div>
    );
}