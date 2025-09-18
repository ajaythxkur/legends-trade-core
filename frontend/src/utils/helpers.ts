import { useApp } from "@/contexts/AppProvider";
import dayjs from "dayjs";


export const formatDateTime = (ts?: number) =>
    ts ? {
        date: dayjs.unix(ts).format("YYYY-MM-DD"),
        time: dayjs.unix(ts).format("hh:mm A")
    } : null;


const aptPrice = 5; //in used
export const formatPrice = (value: number) => (value / 1e8) * aptPrice;

// const aptPrice = 5; //in used
// export const formatPrice = (value: number, price:number) => (value / 1e8) * price;

// export const formatPrice = (value: number) => {
//     const { tokenPrices } = useApp()
//     const aptPrice = tokenPrices?.APT ?? 0;
//     return (value / 1e8) * aptPrice
// }
