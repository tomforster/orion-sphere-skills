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
var wikiUrl = "http://wikki.orionspherelrp.co.uk/doku.php";
var Skill = /** @class */ (function () {
    function Skill(id, name, description, wikiLink, baseCost, stacks, prerequisite, stacksAreFree, prerequisiteRank, maxCount) {
        if (stacks === void 0) { stacks = false; }
        if (stacksAreFree === void 0) { stacksAreFree = false; }
        if (prerequisiteRank === void 0) { prerequisiteRank = 1; }
        this.count = 0;
        this.id = id;
        this.name = name;
        this.description = description;
        this.wikiLink = wikiLink;
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
    Skill.prototype.getWikiLink = function () {
        if (!this.wikiLink)
            return "";
        return wikiUrl + "?" + this.wikiLink;
    };
    return Skill;
}());
var Species = /** @class */ (function (_super) {
    __extends(Species, _super);
    function Species(id, name, psiCapable) {
        if (psiCapable === void 0) { psiCapable = false; }
        var _this = _super.call(this, id, name, "", null, 0) || this;
        _this.psiCapable = psiCapable;
        return _this;
    }
    return Species;
}(Skill));
var IsTerran = new Species(1, "Terran");
var IsTulaki = new Species(2, "Tulaki");
var IsElysian = new Species(3, "Elysian", true);
var IsKelki = new Species(4, "Kelki", true);
var IsOther = new Species(60, "Other");
var IsPsiCapable = new Skill(61, "", "", null, 0);
var SpeciesTypes = [IsTerran, IsTulaki, IsElysian, IsKelki, IsOther];
/*** COMBAT SKILLS ***/
var Toughness = new Skill(5, "Toughness", "Grants +1 locational body hit per rank.", "id=combat_skills#toughness", 2, true);
var Resilience = new Skill(6, "Resilience", "Your death count is extended by 100 seconds per rank.", "id=combat_skills#resilience", 1, true);
var DualWeapons = new Skill(7, "Dual Weapons Training", "You can fight with two weapons simultaneously.", "id=combat_skills#dual_weapons_training", 2);
var Shield = new Skill(8, "Shield Training", "You can use shields to block attacks.", "id=combat_skills#shield_training", 2);
var LargeMelee = new Skill(9, "Large Melee Weapon Training", "You can use large melee weapons such as halberds and great weapons.", "id=combat_skills#large_melee_weapon_training", 2);
var Projectile = new Skill(10, "Projectile Weapon Training", "You can use a projectile weapon like a crossbow or bow.", "id=combat_skills#projectile_weapon_training", 4);
var MediumEnergy = new Skill(11, "Medium Energy Weapon Training", "You can use a medium energy weapon (NERF Dart gun).", "id=combat_skills#medium_energy_weapon_training", 2);
var HeavyEnergy = new Skill(12, "Heavy Energy Weapon Training", "You can use a heavy energy weapon (NERF Dart gun).", "id=combat_skills#heavy_energy_weapon_training", 2, undefined, MediumEnergy);
var MediumArmour = new Skill(13, "Medium Armour Training", "You can wear medium armour effectively (2 locational hits).", "id=combat_skills#medium_armour_training", 2);
var HeavyArmour = new Skill(14, "Heavy Armour Training", "You can wear heavy armour effectively (3 locational hits).", "id=combat_skills#heavy_armour_training", 2, undefined, MediumArmour);
var SteelNerves = new Skill(15, "Steel Nerves", "Reduce the duration of FREEZE calls that affect you by 5 seconds.", "id=combat_skills#steel_nerves", 2, true);
var SteelHead = new Skill(16, "Steel Head", " Reduce the duration of KNOCKOUT calls that affect you by 5 seconds.", "id=combat_skills#steel_head", 2, true);
var SteelViscera = new Skill(17, "Steel Viscera", "Double the progression time of toxins & diseases that affect you.", "id=combat_skills#steel_viscera", 2, true);
var CombatSkills = [Toughness, Resilience, DualWeapons, Shield, LargeMelee, Projectile, MediumEnergy, HeavyEnergy, MediumArmour, HeavyArmour, SteelNerves, SteelHead, SteelViscera];
/*** PROFESSIONAL SKILLS ***/
// Profession Skills
var FirstAid = new Skill(18, "First Aid", "First Aiders can stop someone from dying. Further ranks reduce time required.", "id=professional_skills#first_aid", 1, true);
var Physician = new Skill(19, "Physician", "Physicians can restore hits and perform surgery. Further ranks reduce the time and risks of surgery.", "id=professional_skills#physician", 2, true);
var Engineer = new Skill(20, "Engineer", "Engineers maintain, modify and repair tech.", "id=professional_skills#engineer", 2, true);
var ExtraMods = new Skill(21, "Extra Mods", "Grants knowledge of an additional two Mods. Requires Engineer.", "id=professional_skills#extra_mods", 1, true, Engineer, true);
var Scientist = new Skill(22, "Scientist", "Scientists can make use of special equipment to investigate phenomena, and perform Research.", "id=professional_skills#scientist", 2);
var EthericScience = new Skill(23, "Etheric Science", "Specialism in exotic particles and strange energies. Requires Scientist.", "id=professional_skills#etheric_corporeal_life_science", 1, true, Scientist);
var CorporealScience = new Skill(24, "Corporeal Science", "Specialism in exotic substances. Requires Scientist.", "id=professional_skills#etheric_corporeal_life_science", 1, true, Scientist);
var LifeScience = new Skill(25, "Life Science", "Specialism in strange creatures and plants. Requires Scientist.", "id=professional_skills#etheric_corporeal_life_science", 1, true, Scientist);
// const ExtraDevice = new Skill(26, "Extra Device Mastery", "Grants ability to use more Science Devices. Requires Scientist.", "id=professional_skills#etheric_corporeal_life_science", 1, true, Scientist, true);
// Spaceflight Skills
var HelmConsole = new Skill(27, "Helm Console", "Operate Helm Console on Spacer starships.", "id=professional_skills#helm_console", 1);
var WeaponsConsole = new Skill(28, "Weapons Console", "Operate Weapons Console on Spacer starships.", "id=professional_skills#weapons_console", 1);
var CommsConsole = new Skill(29, "Relay Console", "Operate Relay Console on Spacer starships.", "id=professional_skills#relay_console", 1);
var EngineeringConsole = new Skill(30, "Engineering Console", "Operate Engineering Console on Spacer starships.", "id=professional_skills#engineering_console", 1);
var ScienceConsole = new Skill(31, "Science Console", "Operate Science Console on Spacer starships.", "id=professional_skills#science_console", 1);
// Reputation Skills
var SpacerRep = new Skill(32, "Spacer Reputation", "Spacer Collective charges you less for ship hire and forfeiture.", "id=professional_skills#spacer_reputation", 2, true, undefined, true);
var ClearanceCertified = new Skill(33, "Clearance Certified", "Clearance Organisation takes less of a cut from missions that you sign up for.", "id=professional_skills#clearance_certified", 2, true, undefined, true);
var AscendancyStatus = new Skill(34, "Ascendancy Status", "Improved reputation with the Ascendancy.", "id=professional_skills#ascendancy_status", 2, true, undefined, true);
var CommonalityStatus = new Skill(35, "Commonality Status", "Improved reputation with the Commonality.", "id=professional_skills#commonality_status", 2, true, undefined, true);
var DominionStatus = new Skill(36, "Dominion Status", "Improved reputation with the Dominion.", "id=professional_skills#dominion_status", 2, true, undefined, true);
var FreeUnionStatus = new Skill(37, "Free Union Status", "Improved reputation with the Free Union.", "id=professional_skills#free_union_status", 2, true, undefined, true);
var ProfessionSkills = [FirstAid, Physician, Engineer, ExtraMods, Scientist, EthericScience, CorporealScience, LifeScience,
    HelmConsole, WeaponsConsole, CommsConsole, EngineeringConsole, ScienceConsole,
    SpacerRep, ClearanceCertified, AscendancyStatus, CommonalityStatus, DominionStatus, FreeUnionStatus
];
var PsionicPotential = new Skill(38, "Psionic Potential", "Grants 2 extra Psi Points per day.", "id=psionics_skills#psionic_potential", 1, true, IsPsiCapable);
// Elysian Paths
var Coercion = new Skill(39, "Coercion", "Forcing your will upon other minds.", "id=elysian_psionic_paths#coercion", 1, true, IsElysian, true, undefined, 6);
var Endopathoi = new Skill(40, "Endopathoi", "Projecting the emotions of Disgust, Sadness, Surprise & Fear. Requires Coercion Rank 1.", "id=elysian_psionic_paths#endopathoi", 1, true, Coercion, true, undefined, 6);
var Exopathoi = new Skill(41, "Exopathoi", "Projecting the emotions of Anger, Anticipation, Joy & Trust. Requires Coercion Rank 1.", "id=elysian_psionic_paths#exopathoi", 1, true, Coercion, true, undefined, 6);
var Mnemomorphosis = new Skill(42, "Mnemomorphosis", "Delicately reprogramming the minds of others. Requires Coercion Rank 4.", "id=elysian_psionic_paths#mnemomorphosis", 1, true, Coercion, true, 4, 6);
var PsionicResonance = new Skill(43, "Psionic Resonance", "Utilizing resonance to commune with other minds and use psi crystals.", "id=elysian_psionic_paths#psionic_resonance", 1, true, IsElysian, true, undefined, 6);
var ResonantVitality = new Skill(44, "Resonant Vitality", "Communion with natural forces to perform powerful psionic rites. Requires Psionic Resonance Rank 1.", "id=elysian_psionic_paths#resonant_vitality", 1, true, PsionicResonance, true, 1, 6);
var ResonantBlade = new Skill(45, "Resonant Blade", "Focusing the mind through a crystal-enhanced weapon to deal powerful melee attacks. Requires Psionic Resonance Rank 2.", "id=elysian_psionic_paths#resonant_blade", 1, true, PsionicResonance, true, 2, 6);
var Psychosomatics = new Skill(46, "Psychosomatics", "Using psionic power to promote bodily healing.", "id=elysian_psionic_paths#psychosomatics", 1, true, IsElysian, true, undefined, 6);
var Empathosomatics = new Skill(47, "Empathosomatics", "Empathic transference used to promote calm and analyse psionic effects. Requires Psychosomatics Rank 2.", "id=elysian_psionic_paths#empathosomatics", 1, true, Psychosomatics, true, 2, 6);
var Psychirosi = new Skill(48, "Psychirosi", "Using psychosomatic pathways to gain total control over the psion's own body. Requires Psychosomatics Rank 3.", "id=elysian_psionic_paths#psychirosi", 1, true, Psychosomatics, true, 3, 6);
// Kelki Paths
var Telekinesis = new Skill(49, "Telekinesis", "Moving physical matter with the power of the mind.", "id=kelki_psionic_paths#telekinesis", 1, true, IsKelki, true, undefined, 6);
var TelekineticFinesse = new Skill(50, "Telekinetic Finesse", "Using focused Telekinetic force to target specific objects or damage them. Requires Telekinesis Rank 2.", "id=kelki_psionic_paths#telekinetic_finesse", 1, true, Telekinesis, true, 2, 6);
var TelekineticFortification = new Skill(51, "Telekinetic Fortification", "Using Telekinetic force to protect the body from attacks. Requires Telekinesis Rank 3.", "id=kelki_psionic_paths#telekinetic_fortification", 1, true, Telekinesis, true, 3, 6);
var PsionicSkills = [PsionicPotential, IsElysian, Coercion, Endopathoi, Exopathoi, Mnemomorphosis,
    PsionicResonance, ResonantVitality, ResonantBlade, Psychosomatics, Empathosomatics, Psychirosi, IsKelki, Telekinesis, TelekineticFinesse, TelekineticFortification];
// Species
var Discipline = new Skill(52, "Discipline", "Grants 2 Will Points, and the ability to spend them to resist EFFECT calls", "id=discipline_skills#discipline", 2, false, IsTerran);
var ExtraWillPoint = new Skill(53, "Extra Will Point", "Grants +1 Will Point per rank", "id=discipline_skills#extra_will_point", 1, true, IsTerran);
var Relentless = new Skill(54, "Relentless", "Allows will points to be spent to act for brief periods while badly wounded", "id=discipline_skills#relentless", 1, false, IsTerran);
var Resolve = new Skill(55, "Resolve", "Allows Will Points to be spent to recover quicker from injury", "id=discipline_skills#resolve", 1, false, IsTerran);
var IronMind = new Skill(56, "Iron Mind", "Allows Will Points to be spent to resist psionic powers or KNOCKOUT calls", "id=discipline_skills#iron_mind", 1, false, IsTerran);
var Stalwart = new Skill(57, "Stalwart", "Allows Will Points to be spent to act normally while Walking Wounded", "id=discipline_skills#stalwart", 1, false, IsTerran);
var HeroicDevotion = new Skill(58, "Heroic Devotion", "Allows a character to gain the favour and powers of their chosen Immortal Spirit", "id=devotion_skills#heroic_devotion", 2, true, IsTulaki, true);
var PriestlyDevotion = new Skill(59, "Priestly Devotion", "Grants the use of 1 Ceremony per rank", "id=devotion_skills#priestly_devotion", 2, true, IsTulaki, true);
var SpeciesSkills = [IsTerran, Discipline, ExtraWillPoint, Relentless, Resolve, IronMind, Stalwart, IsTulaki, HeroicDevotion, PriestlyDevotion];
var allSkills = [].concat.apply([], SpeciesTypes.concat(CombatSkills, ProfessionSkills, PsionicSkills, SpeciesSkills, [IsPsiCapable]));
var MainController = /** @class */ (function () {
    function MainController($location) {
        this.$location = $location;
        this.speciesTypes = SpeciesTypes;
        this.selectedSkills = [];
        this.activePage = "combat";
        this.skills = CombatSkills;
    }
    MainController.prototype.$onInit = function () {
        var encodedSkills = this.$location.search().skills;
        var points = Number(this.$location.search().points) || 10;
        this.points = this.totalPoints = Math.max(points, 10);
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
    MainController.prototype.handleAddPointsButtonClick = function () {
        this.totalPoints++;
        this.points++;
        this.updateSelected();
    };
    MainController.prototype.handleRemovePointsButtonClick = function () {
        if (this.points > 0 && this.totalPoints > 10) {
            this.totalPoints--;
            this.points--;
            this.updateSelected();
        }
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
            allSkills.forEach(function (skill) { return skill.count = 0; });
            this.updateSelected();
            return;
        }
        var stringRep = btoa((this.selectedSpecies ? this.selectedSpecies.id + "," : "") + this.selectedSkills.filter(function (skill) { return skill.count > 0; }).map(function (skill) { return skill.id + (skill.count > 1 ? "." + skill.count : ""); }).join(","));
        this.$location.replace();
        this.$location.search("skills", stringRep ? stringRep : null);
        this.$location.search("points", this.totalPoints == 10 ? null : this.totalPoints);
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
        IsPsiCapable.count = 0;
        this.updateSelected();
        if (this.selectedSpecies) {
            this.selectedSpecies.count++;
            if (this.selectedSpecies.psiCapable) {
                IsPsiCapable.count++;
            }
        }
        this.updateSelected();
    };
    MainController.$inject = ["$location"];
    return MainController;
}());
var angular;
var module = angular.module("calc", []);
module.controller("MainController", MainController);
//# sourceMappingURL=index.js.map