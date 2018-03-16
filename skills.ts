export class Skill {
    name: string;
    baseCost: number;
    hasPrerequisites: boolean;
    stacks: boolean;
    description: string;
    count: number = 0;
    prerequisites: Skill[];

    constructor(name: string, description: string, baseCost: number, stacks: boolean = false, prerequisites: Skill[] = []) {
        this.name = name;
        this.description = description;
        this.baseCost = baseCost;
        this.hasPrerequisites = prerequisites.length > 0;
        this.prerequisites = prerequisites;
        this.stacks = stacks;
    }

    cost(): number {
        return this.stacks ? this.baseCost + this.count : this.baseCost;
    }

    pointsSpent(): number {
        if (!this.stacks) return this.baseCost;

        let points = 0;

        for (let i = 0; i < this.count; i++) {
            points += this.getCostAtCount(i);
        }

        return points;
    }

    getCostAtCount(count: number): number {
        return this.stacks ? this.baseCost + count : this.baseCost;
    }
}

export interface SelectedSkill {
    cost: number;
    skill: Skill;
    rank?: number;
    hasRank: boolean;
}

const Toughness = new Skill("Toughness", "Grants +1 locational body hit per rank.", 2, true);
const Resilience = new Skill("Resilience", "Your death count is extended by 100 seconds per rank.", 1, true);
const DualWeapons = new Skill("Dual Weapons Training", "You can fight with two weapons simultaneously.", 2);
const Shield = new Skill("Shield Training", "You can use shields to block attacks.", 2);
const LargeMelee = new Skill("Large Melee Weapon Training", "You can use large melee weapons such as halberds and great weapons.", 2);
const Projectile = new Skill("Projectile Weapon Training", "You can use a projectile weapon like a crossbow or bow.", 4);
const MediumEnergy = new Skill("Medium Energy Weapon Training", "You can use a medium energy weapon (NERF Dart gun).", 2);
const HeavyEnergy = new Skill("Heavy Energy Weapon Training", "You can use a heavy energy weapon (NERF Dart gun).", 2, undefined, [MediumEnergy]);
const MediumArmour = new Skill("Medium Armour Training", "You can wear medium armour effectively (2 locational hits).", 2);
const HeavyArmour = new Skill("Heavy Armour Training", "You can wear heavy armour effectively (3 locational hits).", 2, undefined, [MediumArmour]);
const SteelNerves = new Skill("Steel Nerves", "Reduce the duration of FREEZE calls that affect you by 5 seconds.", 2, true);
const SteelHead = new Skill("Steel Head", " Reduce the duration of KNOCKOUT calls that affect you by 5 seconds.", 2, true);
const SteelViscera = new Skill("Steel Viscera", "Double the progression time of toxins & diseases that affect you.", 2, true);

export const CombatSkills = [Toughness, Resilience, DualWeapons, Shield, LargeMelee, Projectile, MediumEnergy, HeavyEnergy, MediumArmour, HeavyArmour, SteelNerves, SteelHead, SteelViscera];