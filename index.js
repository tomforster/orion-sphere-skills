var Skill = /** @class */ (function () {
    function Skill(name, description, baseCost, stacks, prerequisite, stacksAreFree, prerequisiteRank, maxCount) {
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
        this.maxCount = maxCount;
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
var IsTerran = new Skill("Terran", "", 0);
var IsTulaki = new Skill("Tulaki", "", 0);
var IsElysian = new Skill("Elysian", "", 0);
var IsKelki = new Skill("Kelki", "", 0);
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
var PsionicPotential = new Skill("Psionic Potential", "Grants 2 extra Psi Points per day.", 1, true);
// Elysian Paths
var Coercion = new Skill("Coercion", "Forcing your will upon other minds.", 1, true, IsElysian, true, undefined, 6);
var Endopathoi = new Skill("Endopathoi", "Projecting the emotions of Disgust, Sadness, Surprise & Fear. Requires Coercion Rank 1.", 1, true, Coercion, true, undefined, 6);
var Exopathoi = new Skill("Exopathoi", "Projecting the emotions of Anger, Anticipation, Joy & Trust. Requires Coercion Rank 1.", 1, true, Coercion, true, undefined, 6);
var Mnemomorphosis = new Skill("Mnemomorphosis", "Delicately reprogramming the minds of others. Requires Coercion Rank 4.", 1, true, Coercion, true, 4, 6);
var PsionicResonance = new Skill("Psionic Resonance", "Utilizing resonance to commune with other minds and use psi crystals.", 1, true, IsElysian, true, undefined, 6);
var ResonantVitality = new Skill("Resonant Vitality", "Communion with natural forces to perform powerful psionic rites. Requires Psionic Resonance Rank 1.", 1, true, PsionicResonance, true, 1, 6);
var ResonantBlade = new Skill("Resonant Blade", "Focusing the mind through a crystal-enhanced weapon to deal powerful melee attacks. Requires Psionic Resonance Rank 2.", 1, true, PsionicResonance, true, 2, 6);
var Psychosomatics = new Skill("Psychosomatics", "Using psionic power to promote bodily healing.", 1, true, IsElysian, true, undefined, 6);
var Empathosomatics = new Skill("Empathosomatics", "Empathic transference used to promote calm and analyse psionic effects. Requires Psychosomatics Rank 2.", 1, true, Psychosomatics, true, 2, 6);
var Psychirosi = new Skill("Psychirosi", "Using psychosomatic pathways to gain total control over the psion's own body. Requires Psychosomatics Rank 3.", 1, true, Psychosomatics, true, 3, 6);
// Kelki Paths
var Telekinesis = new Skill("Telekinesis", "Moving physical matter with the power of the mind.", 1, true, IsKelki, true, undefined, 6);
var TelekineticFinesse = new Skill("Telekinetic Finesse", "Using focused Telekinetic force to target specific objects or damage them. Requires Telekinesis Rank 2.", 1, true, Telekinesis, true, 2, 6);
var TelekineticFortification = new Skill("Telekinetic Fortification", "Using Telekinetic force to protect the body from attacks. Requires Telekinesis Rank 3.", 1, true, Telekinesis, true, 3, 6);
var PsionicSkills = [PsionicPotential, IsElysian, Coercion, Endopathoi, Exopathoi, Mnemomorphosis,
    PsionicResonance, ResonantVitality, ResonantBlade, Psychosomatics, Empathosomatics, Psychirosi, IsKelki, Telekinesis, TelekineticFinesse, TelekineticFortification];
// Species
var Discipline = new Skill("Discipline", "Grants 2 Will Points, and the ability to spend them to resist EFFECT calls", 2, false, IsTerran);
var ExtraWillPoint = new Skill("Extra Will Point", "Grants +1 Will Point per rank", 1, true, IsTerran);
var Relentless = new Skill("Relentless", "Allows will points to be spent to act for brief periods while badly wounded", 1, false, IsTerran);
var Resolve = new Skill("Resolve", "Allows Will Points to be spent to recover quicker from injury", 1, false, IsTerran);
var IronMind = new Skill("Iron Mind", "Allows Will Points to be spent to resist psionic powers or KNOCKOUT calls", 1, false, IsTerran);
var Stalwart = new Skill("Stalwart", "Allows Will Points to be spent to act normally while Walking Wounded", 1, false, IsTerran);
var HeroicDevotion = new Skill("Heroic Devotion", "Allows a character to gain the favour and powers of their chosen Immortal Spirit", 2, true, IsTulaki);
var PriestlyDevotion = new Skill("Priestly Devotion", "Grants the use of 1 Ceremony per rank", 2, true, IsTulaki);
var SpeciesSkills = [IsTerran, Discipline, ExtraWillPoint, Relentless, Resolve, IronMind, Stalwart, IsTulaki, HeroicDevotion, PriestlyDevotion];
var MainController = /** @class */ (function () {
    function MainController() {
        this.totalPoints = 10;
        this.points = 10;
        this.combatSkills = CombatSkills;
        this.professionSkills = ProfessionSkills;
        this.psiSkills = PsionicSkills;
        this.speciesSkills = SpeciesSkills;
        this.selectedSkills = [];
        this.activePage = "combat";
        this.skills = this.combatSkills;
    }
    MainController.prototype.handleAddSkillButtonClick = function (skill) {
        if ((skill.stacks || skill.count === 0) && (skill.cost() <= this.points) && (!skill.maxCount || skill.count < skill.maxCount)) {
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
        this.updateDeps(this.speciesSkills);
        this.selectedSkills = this.combatSkills.filter(function (skill) { return skill.count > 0 && skill.baseCost > 0; })
            .concat(this.professionSkills.filter(function (skill) { return skill.count > 0 && skill.baseCost > 0; }))
            .concat(this.psiSkills.filter(function (skill) { return skill.count > 0 && skill.baseCost > 0; }))
            .concat(this.speciesSkills.filter(function (skill) { return skill.count > 0 && skill.baseCost > 0; }));
        this.points = this.totalPoints - this.selectedSkills.reduce(function (total, next) { return total + next.pointsSpent(); }, 0);
        if (this.points < 0)
            throw "ERROR";
    };
    MainController.prototype.isDisabled = function (skill) {
        if (skill.baseCost === 0)
            return false;
        if (skill.cost() > this.points)
            return true;
        if (skill.count > 0 && !skill.stacks)
            return true;
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
            case "species":
                this.skills = this.speciesSkills;
        }
    };
    MainController.prototype.handleSpeciesChanged = function () {
        IsTulaki.count = 0;
        IsTerran.count = 0;
        IsKelki.count = 0;
        IsElysian.count = 0;
        this.updateSelected();
        switch (this.selectedSpecies) {
            case "terran":
                IsTerran.count = 1;
                return;
            case "tulaki":
                IsTulaki.count = 1;
                return;
            case "kelki":
                IsKelki.count = 1;
                return;
            case "elysian":
                IsElysian.count = 1;
                return;
        }
    };
    return MainController;
}());
var angular;
var module = angular.module("calc", []);
module.controller("MainController", MainController);
//# sourceMappingURL=index.js.map