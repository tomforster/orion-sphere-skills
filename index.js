var Skill = /** @class */ (function () {
    function Skill(name, description, baseCost, stacks, prerequisite, stacksAreFree, prerequisiteRank) {
        if (stacks === void 0) { stacks = false; }
        if (stacksAreFree === void 0) { stacksAreFree = false; }
        if (prerequisiteRank === void 0) { prerequisiteRank = 1; }
        this.count = 0;
        this.name = name;
        this.description = description;
        this.baseCost = baseCost;
        this.prerequisite = prerequisite;
        this.stacks = stacks;
        this.stacksAreFree = stacksAreFree;
        this.prerequisiteRank = prerequisiteRank;
    }
    Skill.prototype.cost = function () {
        return this.getCostAtCount(this.count);
    };
    Skill.prototype.pointsSpent = function () {
        if (!this.stacks)
            return this.baseCost;
        if (this.stacksAreFree)
            return this.baseCost * this.count;
        var points = 0;
        for (var i = 0; i < this.count; i++) {
            points += this.getCostAtCount(i);
        }
        return points;
    };
    Skill.prototype.getCostAtCount = function (count) {
        return (this.stacks && !this.stacksAreFree) ? this.baseCost + count : this.baseCost;
    };
    return Skill;
}());
/*** COMBAT SKILLS ***/
var Toughness = new Skill("Toughness", "Grants +1 locational body hit per rank.", 2, true);
var Resilience = new Skill("Resilience", "Your death count is extended by 100 seconds per rank.", 1, true);
var DualWeapons = new Skill("Dual Weapons Training", "You can fight with two weapons simultaneously.", 2);
var Shield = new Skill("Shield Training", "You can use shields to block attacks.", 2);
var LargeMelee = new Skill("Large Melee Weapon Training", "You can use large melee weapons such as halberds and great weapons.", 2);
var Projectile = new Skill("Projectile Weapon Training", "You can use a projectile weapon like a crossbow or bow.", 4);
var MediumEnergy = new Skill("Medium Energy Weapon Training", "You can use a medium energy weapon (NERF Dart gun).", 2);
var HeavyEnergy = new Skill("Heavy Energy Weapon Training", "You can use a heavy energy weapon (NERF Dart gun).", 2, undefined, MediumEnergy);
var MediumArmour = new Skill("Medium Armour Training", "You can wear medium armour effectively (2 locational hits).", 2);
var HeavyArmour = new Skill("Heavy Armour Training", "You can wear heavy armour effectively (3 locational hits).", 2, undefined, MediumArmour);
var SteelNerves = new Skill("Steel Nerves", "Reduce the duration of FREEZE calls that affect you by 5 seconds.", 2, true);
var SteelHead = new Skill("Steel Head", " Reduce the duration of KNOCKOUT calls that affect you by 5 seconds.", 2, true);
var SteelViscera = new Skill("Steel Viscera", "Double the progression time of toxins & diseases that affect you.", 2, true);
var CombatSkills = [Toughness, Resilience, DualWeapons, Shield, LargeMelee, Projectile, MediumEnergy, HeavyEnergy, MediumArmour, HeavyArmour, SteelNerves, SteelHead, SteelViscera];
/*** PROFESSIONAL SKILLS ***/
// Profession Skills
var FirstAid = new Skill("First Aid", "First Aiders can stop someone from dying. Further ranks reduce time required.", 1, true);
var Physician = new Skill("Physician", "Physicians can restore hits and perform surgery. Further ranks reduce the time and risks of surgery.", 2, true);
var Engineer = new Skill("Engineer", "Engineers maintain, modify and repair tech.", 2, true);
var ExtraMods = new Skill("Extra Mods", "Grants knowledge of an additional two Mods. Requires Engineer.", 1, true, Engineer, true);
var Scientist = new Skill("Scientist", "Scientists can make use of special equipment to investigate phenomena, and perform Research.", 2);
var EthericScience = new Skill("Etheric Science", "Specialism in exotic particles and strange energies. Requires Scientist.", 1, true, Scientist);
var CorporealScience = new Skill("Corporeal Science", "Specialism in exotic substances. Requires Scientist.", 1, true, Scientist);
var LifeScience = new Skill("Life Science", "Specialism in strange creatures and plants. Requires Scientist.", 1, true, Scientist);
var ExtraDevice = new Skill("Extra Device Mastery", "Grants ability to use more Science Devices. Requires Scientist.", 1, true, Scientist, true);
// Spaceflight Skills
var HelmConsole = new Skill("Helm Console", "Operate Helm Console on Spacer starships.", 1);
var WeaponsConsole = new Skill("Weapons Console", "Operate Weapons Console on Spacer starships.", 1);
var CommsConsole = new Skill("Comms Console", "Operate Comms Console on Spacer starships.", 1);
var EngineeringConsole = new Skill("Engineering Console", "Operate Engineering Console on Spacer starships.", 1);
var ScienceConsole = new Skill("Science Console", "Operate Science Console on Spacer starships.", 1);
// Reputation Skills
var SpacerRep = new Skill("Spacer Reputation", "Spacer Collective charges you less for ship hire and forfeiture.", 2, true, undefined, true);
var ClearanceCertified = new Skill("Clearance Certified", "Clearance Organisation takes less of a cut from missions that you sign up for.", 2, true, undefined, true);
var AscendancyStatus = new Skill("Ascendancy Status", "Improved reputation with the Ascendancy.", 2, true, undefined, true);
var CommonalityStatus = new Skill("Commonality Status", "Improved reputation with the Commonality.", 2, true, undefined, true);
var DominionStatus = new Skill("Dominion Status", "Improved reputation with the Dominion.", 2, true, undefined, true);
var FreeUnionStatus = new Skill("Free Union Status", "Improved reputation with the Free Union.", 2, true, undefined, true);
var ProfessionSkills = [FirstAid, Physician, Engineer, ExtraMods, Scientist, EthericScience, CorporealScience, LifeScience, ExtraDevice,
    HelmConsole, WeaponsConsole, CommsConsole, EngineeringConsole, ScienceConsole,
    SpacerRep, ClearanceCertified, AscendancyStatus, CommonalityStatus, DominionStatus, FreeUnionStatus
];
var PsionicPotential = new Skill("Psionic Potential", "", 1, true);
// Elysian Paths
var Coercion = new Skill("Coercion", "Forcing your will upon other minds", 1, true, undefined, true);
var Endopathoi = new Skill("Endopathoi", "Projecting the emotions of Disgust, Sadness, Surprise & Fear", 1, true, Coercion, true);
var Exopathoi = new Skill("Exopathoi", "Projecting the emotions of Anger, Anticipation, Joy & Trust", 1, true, Coercion, true);
var Mnemomorphosis = new Skill("Mnemomorphosis", "Delicately reprogramming the minds of others", 1, true, Coercion, true, 4);
var PsionicResonance = new Skill("Psionic Resonance", "Utilizing resonance to commune with other minds and use psi crystals", 1, true, undefined, true);
var ResonantVitality = new Skill("Resonant Vitality", "Communion with natural forces to perform powerful psionic rites", 1, true, PsionicResonance, true, 1);
var ResonantBlade = new Skill("Resonant Blade", "Focusing the mind through a crystal-enhanced weapon to deal powerful melee attacks", 1, true, PsionicResonance, true, 2);
var Psychosomatics = new Skill("Psychosomatics", "Using psionic power to promote bodily healing", 1, true, undefined, true);
var Empathosomatics = new Skill("Empathosomatics", "Empathic transference used to promote calm and analyse psionic effects", 1, true, Psychosomatics, true, 2);
var Psychirosi = new Skill("Psychirosi", "Using psychosomatic pathways to gain total control over the psion's own body", 1, true, Psychosomatics, true, 3);
// Kelki Paths
var Telekinesis = new Skill("Telekinesis", "Moving physical matter with the power of the mind", 1, true, undefined, true);
var TelekineticFinesse = new Skill("Telekinetic Finesse", "Using focused Telekinetic force to target specific objects or damage them", 1, true, Telekinesis, true, 2);
var TelekineticFortification = new Skill("Telekinetic Fortification", "Using Telekinetic force to protect the body from attacks", 1, true, Telekinesis, true, 3);
var PsionicSkills = [PsionicPotential, Coercion, Endopathoi, Exopathoi, Mnemomorphosis,
    PsionicResonance, ResonantVitality, ResonantBlade, Psychosomatics, Empathosomatics, Psychirosi, Telekinesis, TelekineticFinesse, TelekineticFortification];
var MainController = /** @class */ (function () {
    function MainController() {
        this.totalPoints = 10;
        this.points = 10;
        this.combatSkills = CombatSkills;
        this.professionSkills = ProfessionSkills;
        this.psiSkills = PsionicSkills;
        this.selectedSkills = [];
        this.activePage = "combat";
        this.skills = this.combatSkills;
    }
    MainController.prototype.handleAddSkillButtonClick = function (skill) {
        if ((skill.stacks || skill.count === 0) && skill.cost() <= this.points) {
            skill.count++;
            this.updateSelected();
        }
    };
    MainController.prototype.handleRemoveSkillButtonClick = function (skill) {
        skill.count--;
        this.updateSelected();
    };
    MainController.prototype.updateDeps = function (skills) {
        var skill = skills.find(function (skill) { return skill.count > 0 && skill.prerequisite && skill.prerequisite.count < skill.prerequisiteRank; });
        if (skill) {
            skill.count--;
            this.updateDeps(skills);
        }
        else {
            return;
        }
    };
    MainController.prototype.updateSelected = function () {
        //check prereqs are still met
        this.updateDeps(this.combatSkills);
        this.updateDeps(this.professionSkills);
        this.updateDeps(this.psiSkills);
        var selectedSkills = this.combatSkills.filter(function (skill) { return skill.count > 0; })
            .concat(this.professionSkills.filter(function (skill) { return skill.count > 0; }))
            .concat(this.psiSkills.filter(function (skill) { return skill.count > 0; }));
        this.selectedSkills = [];
        for (var _i = 0, selectedSkills_1 = selectedSkills; _i < selectedSkills_1.length; _i++) {
            var skill = selectedSkills_1[_i];
            if (skill.stacks) {
                for (var i = 0; i < skill.count; i++) {
                    this.selectedSkills.push({ skill: skill, rank: i + 1, cost: skill.getCostAtCount(i), hasRank: true });
                }
            }
            else {
                this.selectedSkills.push({ skill: skill, cost: skill.baseCost, hasRank: false });
            }
        }
        this.points = this.totalPoints - this.selectedSkills.reduce(function (total, next) { return total + next.cost; }, 0);
        if (this.points < 0)
            throw "ERROR";
    };
    MainController.prototype.isDisabled = function (skill) {
        if (!skill.prerequisite)
            return false;
        else {
            return skill.prerequisite.count < skill.prerequisiteRank;
        }
    };
    MainController.prototype.setPage = function (page) {
        this.activePage = page;
        switch (page) {
            case "combat":
                this.skills = this.combatSkills;
                return;
            case "profs":
                this.skills = this.professionSkills;
                return;
            case "psi":
                this.skills = this.psiSkills;
                return;
        }
    };
    return MainController;
}());
var angular;
var module = angular.module("calc", []);
module.controller("MainController", MainController);
//# sourceMappingURL=index.js.map