import {IController, ILocationService} from "angular";

class Skill
{
    id: number;
    name: string;
    baseCost: number;
    stacks: boolean;
    stacksAreFree:boolean;
    description: string;
    count: number = 0;
    prerequisite: Skill;
    prerequisiteRank: number;
    maxCount:number;

    constructor(id:number, name: string, description: string, baseCost: number, stacks: boolean = false, prerequisite?:Skill, stacksAreFree:boolean = false, prerequisiteRank:number = 1, maxCount?:number)
    {
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

    cost(): number {
        return this.getCostAtCount(this.count);
    }

    pointsSpent(): number {
        if (!this.stacks) return this.baseCost;
        if(this.stacksAreFree) return this.baseCost*this.count;

        let points = 0;

        for (let i = 0; i < this.count; i++) {
            points += this.getCostAtCount(i);
        }

        return points;
    }

    getCostAtCount(count: number): number {
        return (this.stacks && !this.stacksAreFree) ? this.baseCost + count : this.baseCost;
    }
}

class Species extends Skill
{
    constructor(id:number, name:string)
    {
        super(id, name, "", 0);
    }
}

const IsTerran = new Species(1, "Terran");
const IsTulaki = new Species(2, "Tulaki");
const IsElysian = new Species(3, "Elysian");
const IsKelki = new Species(4, "Kelki");
const IsOther = new Species(60, "Other");

const SpeciesTypes = [IsTerran, IsTulaki, IsElysian, IsKelki, IsOther];

/*** COMBAT SKILLS ***/
const Toughness = new Skill(5, "Toughness", "Grants +1 locational body hit per rank.", 2, true);
const Resilience = new Skill(6, "Resilience", "Your death count is extended by 100 seconds per rank.", 1, true);
const DualWeapons = new Skill(7, "Dual Weapons Training", "You can fight with two weapons simultaneously.", 2);
const Shield = new Skill(8, "Shield Training", "You can use shields to block attacks.", 2);
const LargeMelee = new Skill(9, "Large Melee Weapon Training", "You can use large melee weapons such as halberds and great weapons.", 2);
const Projectile = new Skill(10, "Projectile Weapon Training", "You can use a projectile weapon like a crossbow or bow.", 4);
const MediumEnergy = new Skill(11, "Medium Energy Weapon Training", "You can use a medium energy weapon (NERF Dart gun).", 2);
const HeavyEnergy = new Skill(12, "Heavy Energy Weapon Training", "You can use a heavy energy weapon (NERF Dart gun).", 2, undefined, MediumEnergy);
const MediumArmour = new Skill(13, "Medium Armour Training", "You can wear medium armour effectively (2 locational hits).", 2);
const HeavyArmour = new Skill(14, "Heavy Armour Training", "You can wear heavy armour effectively (3 locational hits).", 2, undefined, MediumArmour);
const SteelNerves = new Skill(15, "Steel Nerves", "Reduce the duration of FREEZE calls that affect you by 5 seconds.", 2, true);
const SteelHead = new Skill(16, "Steel Head", " Reduce the duration of KNOCKOUT calls that affect you by 5 seconds.", 2, true);
const SteelViscera = new Skill(17, "Steel Viscera", "Double the progression time of toxins & diseases that affect you.", 2, true);

const CombatSkills = [Toughness, Resilience, DualWeapons, Shield, LargeMelee, Projectile, MediumEnergy, HeavyEnergy, MediumArmour, HeavyArmour, SteelNerves, SteelHead, SteelViscera];

/*** PROFESSIONAL SKILLS ***/
// Profession Skills
const FirstAid = new Skill(18, "First Aid", "First Aiders can stop someone from dying. Further ranks reduce time required.", 1, true);
const Physician = new Skill(19, "Physician", "Physicians can restore hits and perform surgery. Further ranks reduce the time and risks of surgery.", 2, true);
const Engineer = new Skill(20, "Engineer", "Engineers maintain, modify and repair tech.", 2, true);
const ExtraMods = new Skill(21, "Extra Mods", "Grants knowledge of an additional two Mods. Requires Engineer.", 1, true, Engineer, true);
const Scientist = new Skill(22, "Scientist", "Scientists can make use of special equipment to investigate phenomena, and perform Research.", 2);
const EthericScience = new Skill(23, "Etheric Science", "Specialism in exotic particles and strange energies. Requires Scientist.", 1, true, Scientist);
const CorporealScience = new Skill(24, "Corporeal Science", "Specialism in exotic substances. Requires Scientist.", 1, true, Scientist);
const LifeScience = new Skill(25, "Life Science"	, "Specialism in strange creatures and plants. Requires Scientist.", 1, true, Scientist);
const ExtraDevice = new Skill(26, "Extra Device Mastery", "Grants ability to use more Science Devices. Requires Scientist.", 1, true, Scientist, true);
// Spaceflight Skills
const HelmConsole = new Skill(27, "Helm Console", "Operate Helm Console on Spacer starships.", 1);
const WeaponsConsole = new Skill(28, "Weapons Console", "Operate Weapons Console on Spacer starships.", 1);
const CommsConsole = new Skill(29, "Comms Console", "Operate Comms Console on Spacer starships.", 1);
const EngineeringConsole = new Skill(30, "Engineering Console", "Operate Engineering Console on Spacer starships.", 1);
const ScienceConsole = new Skill(31, "Science Console", "Operate Science Console on Spacer starships.", 1);
// Reputation Skills
const SpacerRep = new Skill(32, "Spacer Reputation", "Spacer Collective charges you less for ship hire and forfeiture.", 2, true, undefined, true);
const ClearanceCertified = new Skill(33, "Clearance Certified", "Clearance Organisation takes less of a cut from missions that you sign up for.", 2, true, undefined, true);
const AscendancyStatus = new Skill(34, "Ascendancy Status", "Improved reputation with the Ascendancy.", 2, true, undefined, true);
const CommonalityStatus = new Skill(35, "Commonality Status", "Improved reputation with the Commonality.", 2, true, undefined, true);
const DominionStatus = new Skill(36, "Dominion Status", "Improved reputation with the Dominion.", 2, true, undefined, true);
const FreeUnionStatus = new Skill(37, "Free Union Status", "Improved reputation with the Free Union.", 2, true, undefined, true);

const ProfessionSkills = [FirstAid, Physician, Engineer, ExtraMods, Scientist, EthericScience, CorporealScience, LifeScience, ExtraDevice,
    HelmConsole, WeaponsConsole, CommsConsole, EngineeringConsole, ScienceConsole,
    SpacerRep, ClearanceCertified, AscendancyStatus, CommonalityStatus, DominionStatus, FreeUnionStatus
];

const PsionicPotential = new Skill(38, "Psionic Potential", "Grants 2 extra Psi Points per day.", 1, true);

// Elysian Paths
const Coercion = new Skill(39, "Coercion", "Forcing your will upon other minds.", 1, true, IsElysian, true, undefined, 6);
const Endopathoi = new Skill(40, "Endopathoi", "Projecting the emotions of Disgust, Sadness, Surprise & Fear. Requires Coercion Rank 1.", 1, true, Coercion, true, undefined, 6);
const Exopathoi = new Skill(41, "Exopathoi", "Projecting the emotions of Anger, Anticipation, Joy & Trust. Requires Coercion Rank 1.", 1, true, Coercion, true, undefined, 6);
const Mnemomorphosis = new Skill(42, "Mnemomorphosis", "Delicately reprogramming the minds of others. Requires Coercion Rank 4.", 1, true, Coercion, true, 4, 6);
const PsionicResonance = new Skill(43, "Psionic Resonance", "Utilizing resonance to commune with other minds and use psi crystals.", 1, true, IsElysian, true, undefined, 6);
const ResonantVitality = new Skill(44, "Resonant Vitality", "Communion with natural forces to perform powerful psionic rites. Requires Psionic Resonance Rank 1.", 1, true, PsionicResonance, true, 1, 6);
const ResonantBlade = new Skill(45, "Resonant Blade",	"Focusing the mind through a crystal-enhanced weapon to deal powerful melee attacks. Requires Psionic Resonance Rank 2.", 1, true, PsionicResonance, true, 2, 6);
const Psychosomatics = new Skill(46, "Psychosomatics", 	"Using psionic power to promote bodily healing.", 1, true, IsElysian, true, undefined, 6);
const Empathosomatics = new Skill(47, "Empathosomatics", "Empathic transference used to promote calm and analyse psionic effects. Requires Psychosomatics Rank 2.", 1, true, Psychosomatics, true, 2, 6);
const Psychirosi = new Skill(48, "Psychirosi", "Using psychosomatic pathways to gain total control over the psion's own body. Requires Psychosomatics Rank 3.", 1, true, Psychosomatics, true, 3, 6);

// Kelki Paths
const Telekinesis = new Skill(49, "Telekinesis", "Moving physical matter with the power of the mind.", 1, true, IsKelki, true, undefined, 6);
const TelekineticFinesse = new Skill(50, "Telekinetic Finesse", "Using focused Telekinetic force to target specific objects or damage them. Requires Telekinesis Rank 2.", 1, true, Telekinesis, true, 2, 6);
const TelekineticFortification = new Skill(51, "Telekinetic Fortification", "Using Telekinetic force to protect the body from attacks. Requires Telekinesis Rank 3.", 1, true, Telekinesis, true, 3, 6);

const PsionicSkills = [PsionicPotential, IsElysian, Coercion, Endopathoi, Exopathoi, Mnemomorphosis,
    PsionicResonance, ResonantVitality, ResonantBlade, Psychosomatics, Empathosomatics, Psychirosi, IsKelki, Telekinesis, TelekineticFinesse, TelekineticFortification];

// Species
const Discipline = new Skill(52, "Discipline", "Grants 2 Will Points, and the ability to spend them to resist EFFECT calls",2, false, IsTerran);
const ExtraWillPoint = new Skill(53, "Extra Will Point", "Grants +1 Will Point per rank", 1, true, IsTerran);
const Relentless = new Skill(54, "Relentless"	, "Allows will points to be spent to act for brief periods while badly wounded", 1, false, IsTerran);
const Resolve = new Skill(55, "Resolve", "Allows Will Points to be spent to recover quicker from injury", 1, false, IsTerran);
const IronMind = new Skill(56, "Iron Mind", "Allows Will Points to be spent to resist psionic powers or KNOCKOUT calls", 1, false, IsTerran);
const Stalwart = new Skill(57, "Stalwart", "Allows Will Points to be spent to act normally while Walking Wounded", 1, false, IsTerran);
const HeroicDevotion = new Skill(58, "Heroic Devotion", "Allows a character to gain the favour and powers of their chosen Immortal Spirit", 2, true, IsTulaki);
const PriestlyDevotion = new Skill(59, "Priestly Devotion", "Grants the use of 1 Ceremony per rank", 2, true, IsTulaki);

const SpeciesSkills = [IsTerran, Discipline, ExtraWillPoint, Relentless, Resolve, IronMind, Stalwart, IsTulaki, HeroicDevotion, PriestlyDevotion];

const allSkills = SpeciesTypes.concat(...CombatSkills, ...ProfessionSkills, ...PsionicSkills, ...SpeciesSkills);

class MainController implements IController
{
    totalPoints = 10;
    points = 10;

    speciesTypes = SpeciesTypes;
    
    selectedSkills:Skill[] = [];
    selectedSpecies:Species;
    activePage = "combat";
    skills:Skill[] = CombatSkills;
    
    static $inject =["$location"];
    constructor(protected $location:ILocationService){}
    
    $onInit()
    {
        const encodedSkills = this.$location.search().skills;

        if(encodedSkills)
        {
            try
            {
                const skills = atob(encodedSkills);
                skills.split(",").forEach((skillString:string) =>
                {
            
                    const tokens = skillString.split(".");
                    if (tokens.length > 0)
                    {
                        const skillId = tokens[0];
                        const skillCount = tokens.length > 1 && tokens[1] && !isNaN(Number(tokens[1])) ? Number(tokens[1]) : 1;
                
                        const skill = allSkills.find(skill => skillId === skill.id.toString());
                        if (skill) skill.count = skillCount;
                    }
                });
                
                if(SpeciesTypes.filter(s => s.count > 0).length > 1)
                {
                    throw new Error("Multiple species detected");
                }
                
                this.selectedSpecies = SpeciesTypes.find(s => s.count > 0);
                this.updateSelected();
            }
            catch (e)
            {
                this.selectedSkills = [];
                this.updateSelected();
            }
        }
    }
    
    handleAddSkillButtonClick(skill:Skill)
    {
        if((skill.stacks || skill.count === 0) && (skill.cost() <= this.points) && (!skill.maxCount || skill.count < skill.maxCount))
        {
            skill.count++;
            this.updateSelected();
        }
    }
    
    handleRemoveSkillButtonClick(skill:Skill)
    {
        skill.count--;
        this.updateSelected();
    }

    private updateDeps()
    {
        const skill = allSkills.find(skill => skill.count > 0 && skill.prerequisite && skill.prerequisite.count < skill.prerequisiteRank);
        if(skill)
        {
            skill.count--;
            this.updateDeps();
        }
        else
        {
            return;
        }
    }
    
    updateSelected()
    {
        //check prereqs are still met
        this.updateDeps();

        this.selectedSkills = allSkills.filter(skill => skill.count > 0 && skill.baseCost > 0);

        this.points = this.totalPoints - this.selectedSkills.reduce((total, next) => total + next.pointsSpent(), 0);
        //check for errors
        if(this.points < 0)
        {
            this.selectedSkills = [];
            this.points = this.totalPoints;
        }
    
        const stringRep = btoa((this.selectedSpecies ? this.selectedSpecies.id + "," : "") + this.selectedSkills.filter(skill => skill.count > 0).map(skill => skill.id + (skill.count > 1 ? "." + skill.count : "")).join(","));
        this.$location.replace();
        this.$location.search("skills", stringRep);
    }
    
    isDisabled(skill:Skill)
    {
        if(skill.baseCost === 0) return false;
        if(skill.cost() > this.points) return true;
        if(skill.count > 0 && !skill.stacks) return true;
        if(!skill.prerequisite) return false;
        else {
             return skill.prerequisite.count < skill.prerequisiteRank;
        }
    }

    setPage(page:string)
    {
        this.activePage = page;
        switch(page)
        {
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
    }

    handleSpeciesChanged()
    {
        SpeciesTypes.forEach(s => s.count = 0);
        this.updateSelected();

        if(this.selectedSpecies) this.selectedSpecies.count++;
        this.updateSelected();
    }
}

let angular:any;
const module = angular.module("calc", []);
module.controller("MainController", MainController);