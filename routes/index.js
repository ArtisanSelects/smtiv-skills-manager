import express from "express";
import Element from '../models/elements.js';
import Skill from '../models/skills.js';

const router = express.Router();

router.post('/info', async (req, res) => {
    function sortKnownSkills(a, b) {
        const rank = a.rank - b.rank;
        return (rank === 0 ? a.name.localeCompare(b.name) : rank);
    }

    const skillsModels = await Skill.find().lean();
    const elementsModels = await Element.find().lean();
    const skills = {};
    const elements = {};
    for (let skill of skillsModels) {
        skills[skill._id] = skill;
    }
    for (let element of elementsModels) {
        elements[element._id] = {...element, knownSkills: {}};
    }
    let savedTeam = req.body;
    for (let [demonID, demon] of Object.entries(savedTeam)) {
        for (let [slotKey, slotValue] of Object.entries(demon['skills'])) {
            if (slotValue) {
                const skill = skills[slotValue];
                if (skill._id in elements[skill.element]['knownSkills']) {
                    elements[skill.element]['knownSkills'][skill._id]['knows'].push(demon.name);
                } else {
                    elements[skill.element]['knownSkills'][skill._id] = {...skill, knows: [demon.name]};
                }
                savedTeam[demonID]['skills'][slotKey] = skill;
            }
        }
    }
    for (let element of Object.values(elements)) {
        element.knownSkills = Object.values(element.knownSkills).sort(sortKnownSkills);
    }
    const sortedSkills = Object.values(skills).sort((a, b) => a.name.localeCompare(b.name));
    res.json({
        skills: sortedSkills,
        elements,
        savedTeam
    });
});

router.get('/emptyteam', async (req, res) => {
    function generateEmptyTeam() {
        const res = {};
        for (let i = 0; i < 24; i++) {
            const demonID = `d${i}`;
            res[demonID] = {skills: {}};
            for (let slot = 0; slot < 8; slot++) {
                res[demonID]['skills'][`${demonID}s${slot}`] = '';
            }
            res[demonID].name = '';
        }
        return res;
    }
    res.json(generateEmptyTeam());
});

export default router;