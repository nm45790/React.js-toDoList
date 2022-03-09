import { atom, selector, StoreID } from "recoil";

type categories = "TO_DO" | "DOING" | "DONE"

export interface ICustomeCategory {
    text: string;
    id: number;
}

export interface IToDo {
    text: string;
    id: number;
    category: string;
}

export const customCategoryState = atom<ICustomeCategory[]>({
    key: "categorys",
    default: [],
})

// export enum Categories {
//     "TO_DO" = "TO_DO",
//     "DOING" = "DOING",
//     "DONE" = "DONE",
//     "CUSTOM" = "CUSTOM",
// }

export const categoryState = atom<string>({
    key: "category",
    default: "TO_DO",
});

const userGetTodo = localStorage.getItem("ToDo");
const parseTodo = JSON.parse(userGetTodo as string);

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: userGetTodo !== null ? parseTodo : [],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    },
});