import { createSlice } from "@reduxjs/toolkit";
import { questionsData } from "../../demo-data/data";


const initialState = {
    questionsData:[...questionsData],
    currentQuestion: 0,
    selectedAnswer: {},
    score: 0,
    timer: 240,
    isTimeUp: false,
    quizStarted: false,
};



const cartSlice = createSlice({
    name: "quizSlice",
    initialState,
    reducers: {
        startQuiz: (state) => {
            state.quizStarted = true;
          },
          answerSelected: (state, action) => {
            state.selectedAnswer = action.payload;
          },
          nextQuestion: (state) => {
            if (state.selectedAnswer === state.questionsData[state.currentQuestion].correctAnswer) {
              state.score += 5;
            }
            state.selectedAnswer = null;
            state.currentQuestion += 1;
          },
          prevQuestion: (state) => {
            if (state.currentQuestion > 0) {
              state.currentQuestion -= 1;
              state.selectedAnswer = null;
            }
          },
          skipQuestion: (state) => {
            state.currentQuestion += 1;
            state.selectedAnswer = null;
          },
          finishQuiz: (state) => {
            state.isTimeUp = true;
          },
          updateTime: (state) => {
            state.timer -= 1;
          },

    }
});

export const { startQuiz,
    answerSelected,
    nextQuestion,
    prevQuestion,
    skipQuestion,
    finishQuiz,
    updateTime} = cartSlice.actions;
export default cartSlice.reducer;