import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { Toast } from "../utils/Toast"
import {
  getAdByIdRequest,
  offerBidRequest,
  startAuctionRequest,
} from "../api/auction"
import { useGlobalState } from "../context/AuthContext"
import { getUserByIdRequest } from "../api/auth"

const DetailPage = () => {
  const { adId } = useParams()
  const { user } = useGlobalState()
  const [adDetail, setAdDetail] = useState(null)
  const [currentBidderName, setCurrentBidderName] = useState("")
  const [seconds, setSeconds] = useState(120)
  const [startCountdown, setStartCountdown] = useState(false)
  const [offerValue, setOfferValue] = useState(0)

  const fetchAdDetail = async () => {
    try {
      const res = await getAdByIdRequest(adId)
      setAdDetail(res.data.data)
    } catch (error) {
      console.error(error)
      Toast("Something went wrong", "error")
    }
  }

  useEffect(() => {
    fetchAdDetail()
  }, [adId])

  const getUserName = async (userId) => {
    try {
      const res = await getUserByIdRequest(userId)
      console.log(res)
      setCurrentBidderName(res?.data?.data[0]?.username)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (adDetail && adDetail?.currentBidder !== undefined)
      getUserName(adDetail?.currentBidder)
  }, [adDetail])

  useEffect(() => {
    if (startCountdown) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1)
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [startCountdown])

  const startAuction = async () => {
    try {
      const res = await startAuctionRequest(adId)
      console.log(res)
      if (res) fetchAdDetail()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (adDetail?.status == "Open") setStartCountdown(true)
    if (adDetail?.status == "Closed") setStartCountdown(false)
  }, [adDetail])

  const handleInputChange = (event) => {
    setOfferValue(event.target.value)
  }

  const handleOffer = async (event) => {
    event.preventDefault()
    if (offerValue) {
      try {
        const res = await offerBidRequest(adId, offerValue)
        console.log(res)
        if (res) fetchAdDetail()
        Toast("Bid Offer Sent", "success")
      } catch (error) {
        console.error(error)
        Toast("Error", "error")
      }
    }
    setOfferValue("")
  }

  if (!adDetail && currentBidderName !== "")
    return (
      <p className="flex items-start justify-center text-2xl text-bold">
        Loading auction details...
      </p>
    )

  return (
    <div className="grid min-h-full place-items-center bg-white py-5">
      <img src={adDetail?.image} className="rounded-lg  object-cover w-96" />
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
          Duration: {seconds}
          {/* {adDetail?.duration} */}
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
              {!currentBidderName ? "None" : currentBidderName}
            </dd>
          </div>
        </dl>
        {adDetail?.status === "Open" && user?.role === "User" ? (
          <form onSubmit={handleOffer}>
            <input
              value={offerValue}
              onChange={handleInputChange}
              type="number"
              placeholder="place a bid"
              className="rounded-md border-0 py-1.5 pl-7 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
            />
            <button className="bg-blue-400 text-blue-50 rounded-lg py-2 px-4 mt-5">
              Offer
            </button>
          </form>
        ) : null}
      </div>

      {adDetail?.status === "Upcoming" && user?.role === "Admin" ? (
        <button
          onClick={() => startAuction()}
          className="bg-blue-400 text-blue-50 rounded-lg py-2 px-4 mt-5"
        >
          Start Auction
        </button>
      ) : null}
    </div>
  )
}

export default DetailPage
