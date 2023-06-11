
import { createContext, useContext, useState } from "react";
import { createAdRequest, getAdByIdRequest, getAllAdsRequest } from "../api/auction";
import { Toast } from "../utils/Toast";

export const AuctionGlobal = createContext();

export const AuctionProvider = ({ children }) => {
    const [ads, setAds] = useState([])

    const createAd = async (data) => {
        try {
            const res = await createAdRequest(data)
            if (res.status == 201) {
                Toast("Created successfully", "success")
                console.log(res);
            }
        } catch (error) {
            console.log(error);
            Toast("Ups something went wrong", "error")
        }
    }

    const getAds = async () => {
        const res = await getAllAdsRequest()
        setAds(res.data.data);
    }


    return (
        <AuctionGlobal.Provider
            value={{
                ads,
                createAd,
                getAds
            }}>
            {children}
        </AuctionGlobal.Provider>
    );
};

export const AuctionGlobalState = () => useContext(AuctionGlobal);
