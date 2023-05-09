export interface Player {
    uuid: string; // random uuid
    name: string; // max length 20
    gold: number; // max 1000000000
    startBA: number; // between 65 and 75
    startHP: number; // between 95 and 105
    level: number; // between 1 and 40
    experience: number; // 0
    currentBA: number; // 0
    currentHP: number; // 0
    luck: number; // between 0.004 and 0.009
    totalStolenGold: number; // 0
}
  