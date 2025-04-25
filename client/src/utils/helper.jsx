import { icons } from './icons'
const { AiFillStar, AiOutlineStar } = icons
export const createSlug = (value) => {
    return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-')
}
export const formatMoney = (input) => {
    if (input) {
        return Number(input.toFixed(1)).toLocaleString()
    }
}
export const renderStarFormat = (number) => {
    if (!Number(number)) return;
    const stars = []
    for (let i = 0; i < +number; i++) {
        stars.push(<AiFillStar />)
    }
    for (let i = 5; i >= +number; i--) {
        stars.push(<AiOutlineStar />)
    }
    return stars
}