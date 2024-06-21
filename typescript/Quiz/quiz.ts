import axios from 'axios';
import * as readline from 'readline';

// Interface for representing a quiz question
interface QuizQuestion {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

// Function to fetch quiz questions from the API


// Function to fetch quiz questions from the API
async function fetchQuizQuestions(amount: number, category: number, difficulty: string): Promise<QuizQuestion[]> {
    try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        throw error;
    }
}

// Rest of your code...


// Function to display quiz question and options, and get user's answer
async function displayQuizQuestion(question: QuizQuestion): Promise<string> {
    console.log('Category:', question.category);
    console.log('Question:', question.question);
    
    // Combine correct and incorrect answers into one array
    const options = [question.correct_answer, ...question.incorrect_answers];
    
    // Shuffle the options
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    
    // Display options
    options.forEach((option, index) => {
        console.log(`${index + 1}. ${option}`);
    });
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    return new Promise(resolve => {
        rl.question('Enter your answer (1-4): ', answer => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

// Function to check if the user's answer is correct
function checkAnswer(userAnswer: string, correctAnswer: string): boolean {
    return userAnswer === correctAnswer;
}

// Function to start the quiz
async function startQuiz() {
    try {
        // Fetch 5 quiz questions from the API (Category: General Knowledge, Difficulty: medium)
        const questions = await fetchQuizQuestions(5, 9, 'medium');
        
        let score = 0;
        
        // Iterate through each question
        for (const question of questions) {
            console.log('\n------------------------------------------------------\n');
            const userAnswer = await displayQuizQuestion(question);
            
            if (checkAnswer(userAnswer, question.correct_answer)) {
                console.log('\nCorrect!');
                score++;
            } else {
                console.log('\nIncorrect!');
                console.log('Correct answer:', question.correct_answer);
            }
        }
        
        console.log('\n------------------------------------------------------\n');
        console.log(`Quiz completed! Your score: ${score}/${questions.length}`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Start the quiz
startQuiz();
