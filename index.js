var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Skill = /** @class */ (function () {
    function Skill(id, name, description, baseCost, stacks, prerequisite, stacksAreFree, prerequisiteRank, maxCount) {
        if (stacks === void 0) { stacks = false; }
        if (stacksAreFree === void 0) { stacksAreFree = false; }
        if (prerequisiteRank === void 0) { prerequisiteRank = 1; }
        this.count = 0;
        this.id = id;
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
var Species = /** @class */ (function (_super) {
    __extends(Species, _super);
    function Species(id, name) {
        return _super.call(this, id, name, "", 0) || this;
    }
    return Species;
}(Skill));
var IsTerran = new Species(1, "Terran");
var IsTulaki = new Species(2, "Tulaki");
var IsElysian = new Species(3, "Elysian");
var IsKelki = new Species(4, "Kelki");
var IsOther = new Species(60, "Other");
var SpeciesTypes = [IsTerran, IsTulaki, IsElysian, IsKelki, IsOther];
/*** COMBAT SKILLS ***/
var Toughness = new Skill(5, "Toughness", "Grants +1 locational body hit per rank.", 2, true);
var Resilience = new Skill(6, "Resilience", "Your death count is extended by 100 seconds per rank.", 1, true);
var DualWeapons = new Skill(7, "Dual Weapons Training", "You can fight with two weapons simultaneously.", 2);
var Shield = new Skill(8, "Shield Training", "You can use shields to block attacks.", 2);
var LargeMelee = new Skill(9, "Large Melee Weapon Training", "You can use large melee weapons such as halberds and great weapons.", 2);
var Projectile = new Skill(10, "Projectile Weapon Training", "You can use a projectile weapon like a crossbow or bow.", 4);
var MediumEnergy = new Skill(11, "Medium Energy Weapon Training", "You can use a medium energy weapon (NERF Dart gun).", 2);
var HeavyEnergy = new Skill(12, "Heavy Energy Weapon Training", "You can use a heavy energy weapon (NERF Dart gun).", 2, undefined, MediumEnergy);
var MediumArmour = new Skill(13, "Medium Armour Training", "You can wear medium armour effectively (2 locational hits).", 2);
var HeavyArmour = new Skill(14, "Heavy Armour Training", "You can wear heavy armour effectively (3 locational hits).", 2, undefined, MediumArmour);
var SteelNerves = new Skill(15, "Steel Nerves", "Reduce the duration of FREEZE calls that affect you by 5 seconds.", 2, true);
var SteelHead = new Skill(16, "Steel Head", " Reduce the duration of KNOCKOUT calls that affect you by 5 seconds.", 2, true);
var SteelViscera = new Skill(17, "Steel Viscera", "Double the progression time of toxins & diseases that affect you.", 2, true);
var CombatSkills = [Toughness, Resilience, DualWeapons, Shield, LargeMelee, Projectile, MediumEnergy, HeavyEnergy, MediumArmour, HeavyArmour, SteelNerves, SteelHead, SteelViscera];
/*** PROFESSIONAL SKILLS ***/
// Profession Skills
var FirstAid = new Skill(18, "First Aid", "First Aiders can stop someone from dying. Further ranks reduce time required.", 1, true);
var Physician = new Skill(19, "Physician", "Physicians can restore hits and perform surgery. Further ranks reduce the time and risks of surgery.", 2, true);
var Engineer = new Skill(20, "Engineer", "Engineers maintain, modify and repair tech.", 2, true);
var ExtraMods = new Skill(21, "Extra Mods", "Grants knowledge of an additional two Mods. Requires Engineer.", 1, true, Engineer, true);
var Scientist = new Skill(22, "Scientist", "Scientists can make use of special equipment to investigate phenomena, and perform Research.", 2);
var EthericScience = new Skill(23, "Etheric Science", "Specialism in exotic particles and strange energies. Requires Scientist.", 1, true, Scientist);
var CorporealScience = new Skill(24, "Corporeal Science", "Specialism in exotic substances. Requires Scientist.", 1, true, Scientist);
var LifeScience = new Skill(25, "Life Science", "Specialism in strange creatures and plants. Requires Scientist.", 1, true, Scientist);
var ExtraDevice = new Skill(26, "Extra Device Mastery", "Grants ability to use more Science Devices. Requires Scientist.", 1, true, Scientist, true);
// Spaceflight Skills
var HelmConsole = new Skill(27, "Helm Console", "Operate Helm Console on Spacer starships.", 1);
var WeaponsConsole = new Skill(28, "Weapons Console", "Operate Weapons Console on Spacer starships.", 1);
var CommsConsole = new Skill(29, "Comms Console", "Operate Comms Console on Spacer starships.", 1);
var EngineeringConsole = new Skill(30, "Engineering Console", "Operate Engineering Console on Spacer starships.", 1);
var ScienceConsole = new Skill(31, "Science Console", "Operate Science Console on Spacer starships.", 1);
// Reputation Skills
var SpacerRep = new Skill(32, "Spacer Reputation", "Spacer Collective charges you less for ship hire and forfeiture.", 2, true, undefined, true);
var ClearanceCertified = new Skill(33, "Clearance Certified", "Clearance Organisation takes less of a cut from missions that you sign up for.", 2, true, undefined, true);
var AscendancyStatus = new Skill(34, "Ascendancy Status", "Improved reputation with the Ascendancy.", 2, true, undefined, true);
var CommonalityStatus = new Skill(35, "Commonality Status", "Improved reputation with the Commonality.", 2, true, undefined, true);
var DominionStatus = new Skill(36, "Dominion Status", "Improved reputation with the Dominion.", 2, true, undefined, true);
var FreeUnionStatus = new Skill(37, "Free Union Status", "Improved reputation with the Free Union.", 2, true, undefined, true);
var ProfessionSkills = [FirstAid, Physician, Engineer, ExtraMods, Scientist, EthericScience, CorporealScience, LifeScience, ExtraDevice,
    HelmConsole, WeaponsConsole, CommsConsole, EngineeringConsole, ScienceConsole,
    SpacerRep, ClearanceCertified, AscendancyStatus, CommonalityStatus, DominionStatus, FreeUnionStatus
];
var PsionicPotential = new Skill(38, "Psionic Potential", "Grants 2 extra Psi Points per day.", 1, true);
// Elysian Paths
var Coercion = new Skill(39, "Coercion", "Forcing your will upon other minds.", 1, true, IsElysian, true, undefined, 6);
var Endopathoi = new Skill(40, "Endopathoi", "Projecting the emotions of Disgust, Sadness, Surprise & Fear. Requires Coercion Rank 1.", 1, true, Coercion, true, undefined, 6);
var Exopathoi = new Skill(41, "Exopathoi", "Projecting the emotions of Anger, Anticipation, Joy & Trust. Requires Coercion Rank 1.", 1, true, Coercion, true, undefined, 6);
var Mnemomorphosis = new Skill(42, "Mnemomorphosis", "Delicately reprogramming the minds of others. Requires Coercion Rank 4.", 1, true, Coercion, true, 4, 6);
var PsionicResonance = new Skill(43, "Psionic Resonance", "Utilizing resonance to commune with other minds and use psi crystals.", 1, true, IsElysian, true, undefined, 6);
var ResonantVitality = new Skill(44, "Resonant Vitality", "Communion with natural forces to perform powerful psionic rites. Requires Psionic Resonance Rank 1.", 1, true, PsionicResonance, true, 1, 6);
var ResonantBlade = new Skill(45, "Resonant Blade", "Focusing the mind through a crystal-enhanced weapon to deal powerful melee attacks. Requires Psionic Resonance Rank 2.", 1, true, PsionicResonance, true, 2, 6);
var Psychosomatics = new Skill(46, "Psychosomatics", "Using psionic power to promote bodily healing.", 1, true, IsElysian, true, undefined, 6);
var Empathosomatics = new Skill(47, "Empathosomatics", "Empathic transference used to promote calm and analyse psionic effects. Requires Psychosomatics Rank 2.", 1, true, Psychosomatics, true, 2, 6);
var Psychirosi = new Skill(48, "Psychirosi", "Using psychosomatic pathways to gain total control over the psion's own body. Requires Psychosomatics Rank 3.", 1, true, Psychosomatics, true, 3, 6);
// Kelki Paths
var Telekinesis = new Skill(49, "Telekinesis", "Moving physical matter with the power of the mind.", 1, true, IsKelki, true, undefined, 6);
var TelekineticFinesse = new Skill(50, "Telekinetic Finesse", "Using focused Telekinetic force to target specific objects or damage them. Requires Telekinesis Rank 2.", 1, true, Telekinesis, true, 2, 6);
var TelekineticFortification = new Skill(51, "Telekinetic Fortification", "Using Telekinetic force to protect the body from attacks. Requires Telekinesis Rank 3.", 1, true, Telekinesis, true, 3, 6);
var PsionicSkills = [PsionicPotential, IsElysian, Coercion, Endopathoi, Exopathoi, Mnemomorphosis,
    PsionicResonance, ResonantVitality, ResonantBlade, Psychosomatics, Empathosomatics, Psychirosi, IsKelki, Telekinesis, TelekineticFinesse, TelekineticFortification];
// Species
var Discipline = new Skill(52, "Discipline", "Grants 2 Will Points, and the ability to spend them to resist EFFECT calls", 2, false, IsTerran);
var ExtraWillPoint = new Skill(53, "Extra Will Point", "Grants +1 Will Point per rank", 1, true, IsTerran);
var Relentless = new Skill(54, "Relentless", "Allows will points to be spent to act for brief periods while badly wounded", 1, false, IsTerran);
var Resolve = new Skill(55, "Resolve", "Allows Will Points to be spent to recover quicker from injury", 1, false, IsTerran);
var IronMind = new Skill(56, "Iron Mind", "Allows Will Points to be spent to resist psionic powers or KNOCKOUT calls", 1, false, IsTerran);
var Stalwart = new Skill(57, "Stalwart", "Allows Will Points to be spent to act normally while Walking Wounded", 1, false, IsTerran);
var HeroicDevotion = new Skill(58, "Heroic Devotion", "Allows a character to gain the favour and powers of their chosen Immortal Spirit", 2, true, IsTulaki, true);
var PriestlyDevotion = new Skill(59, "Priestly Devotion", "Grants the use of 1 Ceremony per rank", 2, true, IsTulaki, true);
var SpeciesSkills = [IsTerran, Discipline, ExtraWillPoint, Relentless, Resolve, IronMind, Stalwart, IsTulaki, HeroicDevotion, PriestlyDevotion];
var allSkills = SpeciesTypes.concat.apply(SpeciesTypes, CombatSkills.concat(ProfessionSkills, PsionicSkills, SpeciesSkills));
var MainController = /** @class */ (function () {
    function MainController($location) {
        this.$location = $location;
        this.totalPoints = 10;
        this.points = 10;
        this.speciesTypes = SpeciesTypes;
        this.selectedSkills = [];
        this.activePage = "combat";
        this.skills = CombatSkills;
    }
    MainController.prototype.$onInit = function () {
        var encodedSkills = this.$location.search().skills;
        if (encodedSkills) {
            try {
                var skills = atob(encodedSkills);
                skills.split(",").forEach(function (skillString) {
                    var tokens = skillString.split(".");
                    if (tokens.length > 0) {
                        var skillId_1 = tokens[0];
                        var skillCount = tokens.length > 1 && tokens[1] && !isNaN(Number(tokens[1])) ? Number(tokens[1]) : 1;
                        var skill = allSkills.find(function (skill) { return skillId_1 === skill.id.toString(); });
                        if (skill)
                            skill.count = skillCount;
                    }
                });
                if (SpeciesTypes.filter(function (s) { return s.count > 0; }).length > 1) {
                    throw new Error("Multiple species detected");
                }
                this.selectedSpecies = SpeciesTypes.find(function (s) { return s.count > 0; });
                this.updateSelected();
            }
            catch (e) {
                this.selectedSkills = [];
                this.updateSelected();
            }
        }
    };
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
    MainController.prototype.updateDeps = function () {
        var skill = allSkills.find(function (skill) { return skill.count > 0 && skill.prerequisite && skill.prerequisite.count < skill.prerequisiteRank; });
        if (skill) {
            skill.count--;
            this.updateDeps();
        }
        else {
            return;
        }
    };
    MainController.prototype.updateSelected = function () {
        //check prereqs are still met
        this.updateDeps();
        this.selectedSkills = allSkills.filter(function (skill) { return skill.count > 0 && skill.baseCost > 0; });
        this.points = this.totalPoints - this.selectedSkills.reduce(function (total, next) { return total + next.pointsSpent(); }, 0);
        //check for errors
        if (this.points < 0) {
            this.selectedSkills = [];
            this.points = this.totalPoints;
        }
        var stringRep = btoa((this.selectedSpecies ? this.selectedSpecies.id + "," : "") + this.selectedSkills.filter(function (skill) { return skill.count > 0; }).map(function (skill) { return skill.id + (skill.count > 1 ? "." + skill.count : ""); }).join(","));
        this.$location.replace();
        this.$location.search("skills", stringRep);
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
                this.skills = CombatSkills;
                return;
            case "profs":
                this.skills = ProfessionSkills;
                return;
            case "psi":
                this.skills = PsionicSkills;
                return;
            case "species":
                this.skills = SpeciesSkills;
        }
    };
    MainController.prototype.handleSpeciesChanged = function () {
        SpeciesTypes.forEach(function (s) { return s.count = 0; });
        this.updateSelected();
        if (this.selectedSpecies)
            this.selectedSpecies.count++;
        this.updateSelected();
    };
    MainController.$inject = ["$location"];
    return MainController;
}());
var angular;
var module = angular.module("calc", []);
module.controller("MainController", MainController);
//# sourceMappingURL=index.js.map