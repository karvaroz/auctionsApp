import { useEffect } from "react"

import { AuctionGlobalState } from "../context/AuctionContext"

import Card from "../components/Card"

const ListPage = () => {
  const { ads, getAds } = AuctionGlobalState()

  useEffect(() => {
    getAds()
  }, [])

  if (!ads)
    return (
      <p className="flex items-start justify-center text-2xl text-bold">
        Loading auctions...
      </p>
    )

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Auctions
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {ads?.map((ad) => (
            <Card key={ad?._id} ad={ad} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ListPage
