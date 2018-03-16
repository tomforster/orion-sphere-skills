var Skill = /** @class */ (function () {
    function Skill(name, description, baseCost, stacks, prerequisites) {
        if (stacks === void 0) { stacks = false; }
        if (prerequisites === void 0) { prerequisites = []; }
        this.count = 0;
        this.name = name;
        this.description = description;
        this.baseCost = baseCost;
        this.hasPrerequisites = prerequisites.length > 0;
        this.prerequisites = prerequisites;
        this.stacks = stacks;
    }
    Skill.prototype.cost = function () {
        return this.stacks ? this.baseCost + this.count : this.baseCost;
    };
    Skill.prototype.pointsSpent = function () {
        if (!this.stacks)
            return this.baseCost;
        var points = 0;
        for (var i = 0; i < this.count; i++) {
            points += this.getCostAtCount(i);
        }
        return points;
    };
    Skill.prototype.getCostAtCount = function (count) {
        return this.stacks ? this.baseCost + count : this.baseCost;
    };
    return Skill;
}());
var combatSkills = [
    new Skill("Toughness", "Grants +1 locational body hit per rank.", 2, true),
    new Skill("Resilience", "Your death count is extended by 100 seconds per rank.", 1, true),
    new Skill("Dual Weapons Training", "You can fight with two weapons simultaneously.", 2),
    new Skill("Shield Training", "You can use shields to block attacks.", 2),
    new Skill("Large Melee Weapon Training", "You can use large melee weapons such as halberds and great weapons.", 2),
    new Skill("Projectile Weapon Training", "You can use a projectile weapon like a crossbow or bow.", 4),
    new Skill("Medium Energy Weapon Training", "You can use a medium energy weapon (NERF Dart gun).", 2)
];
combatSkills.push(new Skill("Heavy Energy Weapon Training", "You can use a heavy energy weapon (NERF Dart gun).", 2, undefined, [combatSkills[combatSkills.length - 1]]), new Skill("Medium Armour Training", "You can wear medium armour effectively (2 locational hits).", 2));
combatSkills.push(new Skill("Heavy Armour Training", "You can wear heavy armour effectively (3 locational hits).", 2, undefined, [combatSkills[combatSkills.length - 1]]), new Skill("Steel Nerves", "Reduce the duration of FREEZE calls that affect you by 5 seconds.", 2, true), new Skill("Steel Head", " Reduce the duration of KNOCKOUT calls that affect you by 5 seconds.", 2, true), new Skill("Steel Viscera", "Double the progression time of toxins & diseases that affect you.", 2, true));
var MainController = /** @class */ (function () {
    function MainController() {
        this.totalPoints = 10;
        this.points = 10;
        this.combatSkills = combatSkills;
        this.selectedSkills = [];
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
    MainController.prototype.updateSelected = function () {
        var selectedSkills = this.combatSkills.filter(function (skill) { return skill.count > 0; });
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
        if (!skill.hasPrerequisites)
            return false;
        else {
            return !!skill.prerequisites.find(function (s) { return s.count < 1; });
        }
    };
    return MainController;
}());
var angular;
var module = angular.module("calc", []);
module.controller("MainController", MainController);
//# sourceMappingURL=index.js.map