export const getTimeDiff = (timeStamp:number) =>{
    const currentDateTimeStamp = new Date().getTime()
    const previousTimeStamp = timeStamp*1000

    const milliSecondPerMinute = 60 * 1000;
    const milliSecondPerHour = milliSecondPerMinute * 60;
    const milliSecondPerDay = milliSecondPerHour * 24;
    const milliSecondPerMonth = milliSecondPerDay * 30;
    const milliSecondPerYear = milliSecondPerDay * 365;
    const elapsed = currentDateTimeStamp - previousTimeStamp;

    if (elapsed < milliSecondPerMinute) {
        return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < milliSecondPerHour) {
        return Math.round(elapsed/milliSecondPerMinute) + ' minutes ago';   
    }

    else if (elapsed < milliSecondPerDay ) {
        return Math.round(elapsed/milliSecondPerHour ) + ' hours ago';   
    }

    else if (elapsed < milliSecondPerMonth) {
        return Math.round(elapsed/milliSecondPerDay) + ' days ago';   
    }

    else if (elapsed < milliSecondPerYear) {
        return Math.round(elapsed/milliSecondPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/milliSecondPerYear ) + ' years ago';   
    }
    
}