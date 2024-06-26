import React, { useRef, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

const EditProfile = () => {
    const navigation = [
        {
            href: "/myOrders",
            name: "My Orders",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                    />
                </svg>
            ),
        },
        {
            href: "/myImages",
            name: "My Images",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                    />
                </svg>
            ),
        },
    ];

    const profileRef = useRef();

    const [isProfileActive, setIsProfileActive] = useState(false);

    const [profileData, setProfileData] = useState([]);

    useEffect(() => {
        const handleProfile = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target))
                setIsProfileActive(false);
        };

        document.addEventListener("click", handleProfile);

        axios
            .get("/getProfileData")
            .then((response) => {
                setProfileData(response.data[0]);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
            });
    }, []);

    const updateProfileData = async () => {
        try {
            axios.put("/updateProfileData", profileData).then((response) => {
                console.log(response.data);
            });
            console.log("Profile data updated successfully");
            window.location.href = "/profile";
            console.log(response);
        } catch (error) {
            console.error("Error updating user profile data:", error);
        }
    };

    return (
        <>
            <nav className="fixed top-30 left-0 w-full h-full border-r border-b bg-blue-zodiac-900 space-y-0 sm:w-80 ">
                <div className="flex flex-col h-full px-12">
                    <div className="h-20 flex items-center pl-2">
                        <div className="w-full flex items-center gap-x-5">
                            <img
                                src="/img/fotoPerfil.jpeg"
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <span className="block text-white text-sm font-semibold">
                                    {profileData.name} {profileData.surname}
                                </span>
                                <span className="block mt-px text-white text-xs text-decoration-line: underline">
                                    <a href="../profile">View Profile</a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-autopt-2 mt-2 border-t">
                        <ul className="text-sm font-medium flex-1">
                            {navigation.map((item, idx) => (
                                <li key={idx}>
                                    <a
                                        href={item.href}
                                        className="flex items-center gap-x-2 text-white p-2 rounded-lg  hover:bg-gray-600 active:bg-gray-100 duration-150"
                                    >
                                        <div className="text-gray-500">
                                            {item.icon}
                                        </div>
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                </div>
            </nav>
            <div className="ml-80 h-50 bg-white">
                <div className="flex flex-col items-center justify-center h-full">
                    <img
                        src="/img/fotoPerfil.jpeg"
                        className="w-32 h-32 rounded-full"
                    />
                    <h2 className="text-xl font-semibold">
                        {profileData.name} {profileData.surname}
                    </h2>

                    <p className="text-gray-500">{profileData.mail}</p>
                </div>
                <div className="bg-gray-300 overflow-hidden shadow rounded-lg border flex justify-center items-center mx-20 my-5">
                    <div className="justify-center border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-center text-sm font-medium text-gray-500 pt-2.5">
                                    Email address:
                                </dt>
                                <dd className="text-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <input
                                        type="text"
                                        value={profileData.mail}
                                        onChange={(e) =>
                                            setProfileData((prevState) => ({
                                                ...prevState,
                                                mail: e.target.value,
                                            }))
                                        }
                                        placeholder="Email address"
                                        className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 "
                                    />
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-center text-sm font-medium text-gray-500 pt-2.5">
                                    Full name:
                                </dt>
                                <div className="text-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <input
                                        type="text"
                                        value={profileData.name}
                                        onChange={(e) =>
                                            setProfileData((prevState) => ({
                                                ...prevState,
                                                name: e.target.value,
                                            }))
                                        }
                                        placeholder="First name"
                                        className="mr-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pb-1"
                                    />
                                    <input
                                        type="text"
                                        value={profileData.surname}
                                        onChange={(e) =>
                                            setProfileData((prevState) => ({
                                                ...prevState,
                                                surname: e.target.value,
                                            }))
                                        }
                                        placeholder="Last name"
                                        className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pb-1"
                                    />
                                </div>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-center text-sm font-medium text-gray-500 pt-2.5">
                                    Phone number:
                                </dt>
                                <input
                                    type="text"
                                    value={profileData.phone}
                                    onChange={(e) =>
                                        setProfileData((prevState) => ({
                                            ...prevState,
                                            phone: e.target.value,
                                        }))
                                    }
                                    placeholder="Phone number"
                                    className="text-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pb-2"
                                />
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-center text-sm font-medium text-gray-500">
                                    Address
                                </dt>
                                <dd className=" text-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <input
                                        type="text"
                                        value={profileData.address}
                                        onChange={(e) =>
                                            setProfileData((prevState) => ({
                                                ...prevState,
                                                address: e.target.value,
                                            }))
                                        }
                                        placeholder="Address"
                                        className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pb-2"
                                    />
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className="mt-4 flex justify-end mr-20">
                    <a
                        href="/profile"
                        className="px-4 py-2 mr-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Cancel
                    </a>
                    <button
                        onClick={updateProfileData}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        href=""
                    >
                        Confirm
                    </button>
                </div>
            </div>
            <br></br>
        </>
    );
};

export default EditProfile;

if (document.getElementById("editProfile")) {
    const root = createRoot(document.getElementById("editProfile")).render(
        <EditProfile />,
    );
}
