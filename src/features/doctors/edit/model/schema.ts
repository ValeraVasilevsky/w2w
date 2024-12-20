import { object, string } from "yup";

const DEPARTMENTS: string[] = ["surgery", "cardiology"];

export const doctorSchema = object({
  name: string()
    .default("")
    .min(1, "Введите данные")
    .max(20, "Максимальное количество символов - 20")
    .required("Введите данные"),
  department: string()
    .default("")
    .min(1, "Выберите данные")
    .oneOf(DEPARTMENTS, "Неверное значение")
    .required("Выберите данные"),
});