import instance from "../configs/axios";
export const apiGetProducts = async (params) => await instance({
    url:'/product/all',
    method:'get',
    params
})