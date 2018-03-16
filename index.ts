import {IController} from "angular";
import {CombatSkills, SelectedSkill, Skill} from "./skills";

class MainController implements IController
{
    totalPoints = 10;
    points = 10;
    combatSkills:Skill[] = CombatSkills;
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