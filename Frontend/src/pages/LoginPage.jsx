import { useEffect } from "react";
import { RiAuctionLine } from "react-icons/ri"
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"

import { useGlobalState } from "../context/AuthContext";
import Error from "../components/Error";

const LoginPage = () => {
    const navigate = useNavigate()
    const { isAuthenticated, logInUser } = useGlobalState();
    const { register, handleSubmit, formState: { errors } } = useForm()


    useEffect(() => {
        if (isAuthenticated)
            navigate("/home")
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        await logInUser(values)
    })

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <RiAuctionLine className="mx-auto h-10 w-auto" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Auction App</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div className="mt-2">
                            <input
                                {...register("email", { required: true })}
                                id="email"
                                name="email"
                                type="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4" />
                        </div>
                        {
                            errors.email && <Error>Email is required</Error>
                        }
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input
                                {...register("password", { required: true, minLength: 3 })}
                                id="password"
                                name="password"
                                type="password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4" />
                        </div>
                        {
                            errors.password && <Error>Password is required</Error>
                        }
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    <Link to="register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage