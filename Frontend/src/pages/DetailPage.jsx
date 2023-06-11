import { useParams } from "react-router-dom";

import { AuctionGlobalState } from "../context/AuctionContext";
import { useEffect, useState } from "react";

const DetailPage = () => {
    let { adId } = useParams();
    const { ads } = AuctionGlobalState();
    const [adDetail, setAdsDetail] = useState({});

    const found = ads.find((ad) => ad._id == adId);

    useEffect(() => {
        setAdsDetail(found);
    }, [adId]);

    return (
        <div className="grid min-h-full place-items-center bg-white py-5">
            <img
                src={adDetail?.image}
                className="rounded-lg  object-cover w-96"
            />
            <div className="gap-3 flex items-center justify-center py-3">
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    status: {adDetail?.status}
                </span>
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    category: {adDetail?.category}
                </span>
                <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                    bids: {adDetail?.bids?.length}
                </span>
                <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                    timer: {adDetail?.timer}
                </span>
            </div>

            <div className="mt-2 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Product
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {adDetail?.productName}
                        </dd>
                    </div>
                    <div className="px-2 py-2  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Base Price
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {adDetail?.basePrice}
                        </dd>
                    </div>
                    <div className="px-2 py-2  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Current Price
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {adDetail?.currentPrice}
                        </dd>
                    </div>
                    <div className="px-2 py-2  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Current Bidder
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            currentBidder
                        </dd>
                    </div>
                </dl>
                <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                        type="text"
                        name="price"
                        id="price"
                        className="rounded-md border-0 py-1.5 pl-7  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
                        placeholder="0.00"
                    />
                </div>
                <button className="w-full bg-blue-400 text-blue-50 rounded-lg py-2 px-4 mt-5">
                    Offer Bid
                </button>
            </div>
        </div>
    );
};

export default DetailPage;
