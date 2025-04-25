import instance from "../configs/axios";
export const apiGetCategories = async () => await instance.get('/category/all')