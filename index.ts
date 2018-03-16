import {IController} from "angular";

class Skill
{
    name:string;
    baseCost:number;
    hasPrerequisites:boolean;
    stacks:boolean;
    description:string;
    count:number = 0;
    prerequisites:Skill[];
    
    constructor(name:string, description:string, baseCost:number, stacks:boolean = false, prerequisites:Skill[] = [])
    {
        this.name = name;
        this.description = description;
        this.baseCost = baseCost;
        this.hasPrerequisites = prerequisites.length > 0;
        this.prerequisites = prerequisites;
        this.stacks = stacks;
    }
    
    cost():number
    {
        return this.stacks ? this.baseCost + this.count : this.baseCost;
    }
    
    pointsSpent():number
    {
        if(!this.stacks) return this.baseCost;
        
        let points = 0;
        
        for(let i = 0; i < this.count; i++)
        {
            points += this.getCostAtCount(i);
        }
        
        return points;
    }
    
    getCostAtCount(count:number):number
    {
        return this.stacks ? this.baseCost + count : this.baseCost;
    }
}

interface SelectedSkill
{
    cost:number;
    skill:Skill;
    rank?:number;
    hasRank:boolean;
}

const combatSkills:Skill[] = [
    new Skill(
        "Toughness",
         "Grants +1 locational body hit per rank.",
         2,
        true
    ),
    new Skill(
        "Resilience",
         "Your death count is extended by 100 seconds per rank.",
         1,
         true
    ),
    new Skill(
        "Dual Weapons Training",
         "You can fight with two weapons simultaneously.",
         2
    ),
    new Skill(
        "Shield Training",
         "You can use shields to block attacks.",
         2
    ),
    new Skill(
        "Large Melee Weapon Training",
         "You can use large melee weapons such as halberds and great weapons.",
         2
    ),
    new Skill(
        "Projectile Weapon Training",
         "You can use a projectile weapon like a crossbow or bow.",
         4
    ),
    new Skill(
        "Medium Energy Weapon Training",
         "You can use a medium energy weapon (NERF Dart gun).",
         2
    )
];
combatSkills.push(
    new Skill(
        "Heavy Energy Weapon Training",
         "You can use a heavy energy weapon (NERF Dart gun).",
         2,
        undefined,
        [combatSkills[combatSkills.length - 1]]
    ),

    new Skill(
        "Medium Armour Training",
         "You can wear medium armour effectively (2 locational hits).",
         2
    ));
combatSkills.push(
    new Skill(
        "Heavy Armour Training",
         "You can wear heavy armour effectively (3 locational hits).",
         2,
        undefined,
        [combatSkills[combatSkills.length - 1]]
    ),
    new Skill(
        "Steel Nerves",
         "Reduce the duration of FREEZE calls that affect you by 5 seconds.",
         2,
         true
    ),
    new Skill(
        "Steel Head",
         " Reduce the duration of KNOCKOUT calls that affect you by 5 seconds.",
         2,
         true
    ),
    new Skill(
        "Steel Viscera",
         "Double the progression time of toxins & diseases that affect you.",
         2,
         true
    ));

class MainController implements IController
{
    totalPoints = 10;
    points = 10;
    combatSkills:Skill[] = combatSkills;
    selectedSkills:SelectedSkill[] = [];
    
    handleAddSkillButtonClick(skill:Skill)
    {
        if((skill.stacks || skill.count === 0) && skill.cost() <= this.points)
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
    
    updateSelected()
    {
        const selectedSkills = this.combatSkills.filter(skill => skill.count > 0);
        
        this.selectedSkills = [];
        
        for(let skill of selectedSkills)
        {
            if(skill.stacks)
            {
                for (let i = 0; i < skill.count; i++)
                {
                    this.selectedSkills.push({skill, rank: i + 1, cost: skill.getCostAtCount(i), hasRank: true})
                }
            }
            else{
                this.selectedSkills.push({skill, cost:skill.baseCost, hasRank: false});
            }
        
        }
        
        this.points = this.totalPoints - this.selectedSkills.reduce((total, next) => total + next.cost, 0);
        if(this.points < 0) throw "ERROR";
    }
    
    isDisabled(skill:Skill)
    {
        if(!skill.hasPrerequisites) return false;
        else {
             return !!skill.prerequisites.find(s => s.count < 1);
        }
    }
}

let angular:any;
const module = angular.module("calc", []);
module.controller("MainController", MainController);