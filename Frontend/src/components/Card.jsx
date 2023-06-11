import React from "react"
import { Link } from "react-router-dom"

const Card = ({ ad }) => {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={ad?.image}
          alt={ad?.productName}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={`/detail/${ad?._id}`}>
              <span aria-hidden="true" className="absolute inset-0"></span>
              {ad?.productName}
            </Link>
          </h3>
          <p className="mt-1 inline-flex items-center rounded-md bg-indigo-50  px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            {ad?.status}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900">$ {ad?.basePrice}</p>
      </div>
    </div>
  )
}

export default Card
