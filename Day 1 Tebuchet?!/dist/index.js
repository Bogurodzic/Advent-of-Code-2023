"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const filePath = path.join(__dirname, '../src/calibration.txt');
const text = fs.readFileSync(filePath, 'utf-8');
const textSplittedToNewLines = text.split('\n');
console.log(textSplittedToNewLines.length);
const callibrationResultFirst = textSplittedToNewLines.reduce((accumulator, textLine, index) => {
    const firstAndLastDigitCombined = getFirstAndLastDigitCombinedFromString(textLine);
    console.log(index, textLine, firstAndLastDigitCombined, accumulator);
    return accumulator + firstAndLastDigitCombined;
}, 0);
let sum = 0;
for (const textLine of textSplittedToNewLines) {
    const firstAndLastDigitCombined = getFirstAndLastDigitCombinedFromString(textLine);
    sum += firstAndLastDigitCombined;
}
console.log(sum);
console.log(callibrationResultFirst);
function getFirstAndLastDigitCombinedFromString(textLine) {
    const firstDigitInString = getFirstDigitFromString(textLine);
    const lastDigitInString = getLastDigitFromString(textLine);
    if (firstDigitInString && lastDigitInString) {
        return Number(String(firstDigitInString) + String(lastDigitInString));
    }
    return 0;
}
function getFirstDigitFromString(textLine) {
    const regexForDigitInString = /(?:zero|one|two|three|four|five|six|seven|eight|nine|[0-9])/i;
    const matchResult = textLine.match(regexForDigitInString);
    const firstDigitInString = matchResult ? matchResult[0] : '';
    return firstDigitInString ? parseStringToNumber(firstDigitInString) : null;
}
function getLastDigitFromString(textLine) {
    const regexForDigitInString = /(?:zero|one|two|three|four|five|six|seven|eight|nine|\d)(?=[^\d]*$)/gi;
    let lastDigitInString;
    for (const match of textLine.matchAll(regexForDigitInString)) {
        lastDigitInString = match[0];
    }
    return lastDigitInString ? parseStringToNumber(lastDigitInString) : null;
}
function parseStringToNumber(str) {
    const numberWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    if (/\d/.test(str)) {
        return parseInt(str);
    }
    else {
        return numberWords.indexOf(str.toLowerCase());
    }
}
