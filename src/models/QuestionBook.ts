import { Question } from "./Question";
export interface QuestionBook {
    id: number;
    title: string;
    slug: string;
    finished: boolean;
    timeTotal: number;
    questions: Question[];
}
