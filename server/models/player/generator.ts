import { v4 as uuidv4 } from "uuid";
import { Player } from ".";

const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  const getRandomNumber = (min: number, max: number, decimalPlaces: number): number => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round((Math.random() * (max - min) + min) * factor) / factor;
  };
  
  const generatePlayer = (): Player => {
    return {
      uuid: uuidv4(),
      name: `Player ${getRandomInt(1, 20)}`, // You can replace this with a more meaningful name generation logic
      gold: getRandomInt(0, 1000000000),
      startBA: getRandomInt(65, 75),
      StartHP: getRandomInt(95, 105),
      level: getRandomInt(1, 40),
      experience: 0,
      currentBA: 0,
      currentHP: 0,
      luck: getRandomNumber(0.004, 0.009, 3),
      totalStolenGold: 0,
    };
  };
  
  const players: Player[] = Array.from({ length: 10 }, () => generatePlayer());
  
  console.log(players);