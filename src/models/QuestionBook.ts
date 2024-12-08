import { Question } from "./Question";

export interface QuestionBook {
    title: string;
    answered: boolean;
    questions: Question[];
}
