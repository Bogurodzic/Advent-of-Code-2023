import * as fs from 'fs';
import * as path from 'path';

const filePath: string = path.join(__dirname, '../src/calibration.txt');
const text: string = fs.readFileSync(filePath, 'utf-8');
const textSplittedToNewLines: string[] = text.split('\n');

console.log(textSplittedToNewLines.length);


const callibrationResultFirst = textSplittedToNewLines.reduce((accumulator: number, textLine: string) => {
    const firstAndLastDigitCombined = getFirstAndLastDigitCombinedFromString(textLine);
    return accumulator + firstAndLastDigitCombined;
}, 0);

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
    const regexForDigitInString: RegExp = /\d/g;
    let firstDigitInString: string | undefined;
    for (const match of textLine.matchAll(regexForDigitInString)) {
        if (!firstDigitInString) {
            firstDigitInString = match[0];
        }
    }
    return firstDigitInString ? parseInt(firstDigitInString) : null;
}





function getLastDigitFromString(textLine: string): number | null {
    const regexForDigitInString: RegExp = /\d/g;
    let lastDigitInString: string | undefined;
    for (const match of textLine.matchAll(regexForDigitInString)) {
        lastDigitInString = match[0];
    }
    return lastDigitInString ? parseInt(lastDigitInString) : null;
}


