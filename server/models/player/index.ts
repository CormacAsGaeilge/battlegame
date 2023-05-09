export interface Player {
    uuid: string; // random uuid
    name: string; // max length 20
    gold: number; // max 1000000000
    startBA: number; // between 65 and 75
    startHP: number; // between 95 and 105
    level: number; // between 1 and 40
    experience: number; // 0
    nextLvl: number; // 0
    currentBA: number; // 0
    currentHP: number; // 0
    luck: number; // between 0.004 and 0.009
    totalStolenGold: number; // 0
}
  
export const START_BASE_ATTACK = 70;
export const START_HIT_POINTS = 100;
export const MIN_LEVEL = 1;
export const MAX_LEVEL = 40;
export const START_EXP = 0;
export const NEXT_LVL = 800;
export const MIN_LUCK = 0.004;
export const MAX_LUCK = 0.009;
export const BA_LVL_MULTIPLIER = 1.1934;
export const HP_LVL_MULTIPLIER = 1.2735;
export const LUCK_LVL_MULTIPLIER = 1.05025;
export const EXP_LVL_MULTIPLIER = 1.1415;
export const START_GOLD = 5000;

