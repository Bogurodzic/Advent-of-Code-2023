import * as fs from 'fs';
import * as path from 'path';

const filePath: string = path.join(__dirname, '../src/calibration.txt');
const text: string = fs.readFileSync(filePath, 'utf-8');
const textSplittedToNewLines: string[] = text.split('\n');

console.log(textSplittedToNewLines.length);


const callibrationResultFirst = textSplittedToNewLines.reduce((accumulator: number, textLine: string, index: number) => {
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

function getFirstAndLastDigitCombinedFromString(textLine: string): number {
    const firstDigitInString = getFirstDigitFromString(textLine);
    const lastDigitInString = getLastDigitFromString(textLine);

    if (firstDigitInString && lastDigitInString) {
        return Number(String(firstDigitInString) + String(lastDigitInString));
    }

    return 0;

}

function getFirstDigitFromString(textLine: string): number | null {
    const regexForDigitInString: RegExp = /(?:zero|one|two|three|four|five|six|seven|eight|nine|[0-9])/i;
    const matchResult = textLine.match(regexForDigitInString);
    const firstDigitInString = matchResult ? matchResult[0] : '';
    return firstDigitInString ? parseStringToNumber(firstDigitInString) : null;
}

function getLastDigitFromString(textLine: string): number | null {
    const regexForDigitInString: RegExp = /(?:zero|one|two|three|four|five|six|seven|eight|nine|\d)(?=[^\d]*$)/gi;
    let lastDigitInString: string | undefined;
    for (const match of textLine.matchAll(regexForDigitInString)) {
        lastDigitInString = match[0];
    }
    return lastDigitInString ? parseStringToNumber(lastDigitInString) : null;
}

function parseStringToNumber(str: string): number {
    const numberWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    if (/\d/.test(str)) {
        return parseInt(str);
    } else {
        return numberWords.indexOf(str.toLowerCase());
    }
}



