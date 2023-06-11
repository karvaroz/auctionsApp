import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { RiAuctionLine } from "react-icons/ri"

import { AuctionGlobalState } from "../context/AuctionContext"

import Error from "../components/Error"

const CreatePage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { createAd } = AuctionGlobalState();
    const navigate = useNavigate()

    const onSubmit = handleSubmit(async (data) => {
        await createAd(data)
        navigate("/home")
    })


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <RiAuctionLine className="mx-auto h-10 w-auto" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">add a product to auction</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6"
                    onSubmit={onSubmit}
                >
                    <div>
                        <label htmlFor="productName" className="block text-sm font-medium leading-6 text-gray-900">Product</label>
                        <div className="mt-2">
                            <input
                                {...register("productName", { required: true, minLength: 2 })}
                                id="productName"
                                name="productName"
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4" />
                        </div>
                        {
                            errors.productName && <Error> productName is required</Error>

                        }
                    </div>
                    <div>
                        <label htmlFor="basePrice" className="block text-sm font-medium leading-6 text-gray-900">Base Price</label>
                        <div className="mt-2">
                            <input
                                {...register("basePrice", { required: true, type: "number" })}
                                id="basePrice"
                                name="basePrice"
                                type="number"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4" />
                        </div>
                        {
                            errors.basePrice && <Error> basePrice is required</Error>
                        }
                    </div>


                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default CreatePage