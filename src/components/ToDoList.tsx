import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";


const Title = styled.h1`
font-size:48px;
`;
const Notice = styled.h2`
font-size:24px;
`;
interface ICategory {
    customCategory: string;
}

function ToDoList() {
    const { handleSubmit, register, setValue } = useForm<ICategory>();
    const handleCategoryAdd = ({ customCategory }: ICategory) => {
        const categorySelector = document.querySelector("select");
        const customCategoryOption = document.createElement("option");
        customCategoryOption.value = customCategory;
        customCategoryOption.innerHTML = customCategory;
        categorySelector?.appendChild(customCategoryOption);
        setValue("customCategory", "");
    };
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };
    return (
        <div>
            <Title >To Do List</Title>
            <hr />
            <Notice>Choose your category</Notice>
            <select value={category} onInput={onInput}>
                <option value={"TO_DO"}>To Do</option>
                <option value={"DOING"}>Doing</option>
                <option value={"DONE"}>Done</option>
            </select>
            <form onSubmit={handleSubmit(handleCategoryAdd)}>
                <input {...register("customCategory")} placeholder="add your category" />
                <button>Add</button>
            </form>
            <hr />
            <Notice>Enter your ToDo</Notice>
            <CreateToDo />
            <hr />
            <Notice>This is your work</Notice>
            {toDos.map((toDo) => <ToDo key={toDo.id}{...toDo} />)}
        </div>);
}

export default ToDoList;