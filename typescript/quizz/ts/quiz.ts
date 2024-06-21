type custUser = {
    userName:string,
    difficultyHistory:number[],
    answerHistory:number[],
    totalQuiz:number,
    correctAnswer:number,
    preferenceHistory:string[]
}

let user:custUser = {
    userName: "user",
    difficultyHistory:[0,2,1,4,3,4,4,4,4],
    answerHistory:[0,1,0,1,0,1,0,1,1],
    totalQuiz:9,
    correctAnswer:5,
    preferenceHistory: ["python","ts","math"]
}

function getDifficulty( userIn:custUser) {
    let sumCorrect:number = 0;
    let sumWrong:number = 0;
    for (let i:number = 0; i < userIn.difficultyHistory.length ; i++) {
        if (userIn.answerHistory[i] == 1)
            sumCorrect +=  userIn.difficultyHistory[i];
    }
    for (let i:number = 0; i < userIn.difficultyHistory.length ; i++) {
        if (userIn.answerHistory[i] == 0)
            sumWrong +=  userIn.difficultyHistory[i];
    }
    let avgDiff1:number = Math.round(sumCorrect/userIn.correctAnswer);
    let avgDiff2:number = Math.floor(sumWrong/(userIn.totalQuiz-userIn.correctAnswer));
    if (Math.min(avgDiff1,avgDiff2) <= 0)
        console.log(0);
    else if (Math.min(avgDiff1,avgDiff2) >= 4)
        console.log(4);
    else
        console.log(Math.floor((avgDiff1 + avgDiff2)/2));
}

getDifficulty(user);