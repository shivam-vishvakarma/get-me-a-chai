"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import BlueBtn from "@/components/BlueBtn";
import { updateUser } from "@/actions/useractions";
import { toast, Bounce } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();
  const navigation = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profile: "",
    cover: "",
    razorpayid: "",
    razorpaysecret: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleUpdateUser = async () => {
    const user = await updateUser(session.user.email, form);
    if (user) {
      toast.success("Profile Updated", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigation.push(`${user.username}`);
    } else {
      toast.error("Profile Updation Failed", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    if (session) {
      setForm({
        name: session.user.name,
        email: session.user.email,
        username: session.user.username,
        profile: session.user.profile,
        cover: session.user.cover,
        razorpayid: session.user.razorpayid,
        razorpaysecret: session.user.razorpaysecret,
      });
    }
  }, [session]);
  return (
    <main className="p-4">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
      </div>
      <form
        className="w-1/3 mx-auto flex flex-col gap-2"
        action={handleUpdateUser}
      >
        {/* input for name */}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
        </div>
        {/* input for email */}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={form.email}
            disabled
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
        </div>
        {/* input for username */}
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
        </div>
        {/* input for profile picture */}
        <div>
          <label
            htmlFor="profile"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Profile Picture URL
          </label>
          <input
            type="text"
            id="profile"
            placeholder="Profile Picture"
            value={form.profile}
            onChange={handleChange}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
        </div>
        {/* input for cover picture */}
        <div>
          <label
            htmlFor="cover"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Cover Picture URL
          </label>
          <input
            type="text"
            id="cover"
            placeholder="Cover Picture"
            value={form.cover}
            onChange={handleChange}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
        </div>
        {/* input for razorpay id */}
        <div>
          <label
            htmlFor="razorpayid"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Razorpay ID
          </label>
          <input
            type="text"
            id="razorpayid"
            placeholder="Razorpay ID"
            value={form.razorpayid}
            onChange={handleChange}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
        </div>
        {/* input for razorpay secret */}
        <div>
          <label
            htmlFor="razorpaysecret"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Razorpay Secret
          </label>
          <input
            type="text"
            id="razorpaysecret"
            placeholder="Razorpay Secret"
            value={form.razorpaysecret}
            onChange={handleChange}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
        </div>
        {/* submit button */}
        <BlueBtn>Update</BlueBtn>
      </form>
    </main>
  );
}
