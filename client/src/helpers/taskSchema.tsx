import * as yup from "yup";

export const taskSchema = yup.object({
  title: yup.string().required("Title required"),
  description: yup.string().required("Description required"),
  date: yup.string().required("Date required"),
});
