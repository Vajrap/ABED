import { rollTwenty } from "../../../Utils/Dice";

export const getRandomWeatherDeviant = () => {
    const weatherDeviant = rollTwenty().total;
    switch (weatherDeviant) {
        case 1:
        case 2:
            return -5;
        case 3:
        case 4:
            return -4;
        case 5:
        case 6:
            return -3;
        case 7:
        case 8:
            return -2;
        case 9:
        case 10:
            return -1;
        case 11:
        case 12:
            return 1;
        case 13:
        case 14:
            return 2;
        case 15:
        case 16:
            return 3;
        case 17:
        case 18:
            return 4;
        case 19:
        case 20:
            return 5;
        default:
            return 0;
    }
};