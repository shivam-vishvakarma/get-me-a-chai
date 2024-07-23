"use client";
import { fetchPayment, fetchTotalPaymentDetails } from "@/actions/useractions";
import PaymentButton from "@/components/PaymentButton";
import { useEffect, useState } from "react";
import { fetchUser } from "@/actions/useractions";
import { toast, Bounce } from "react-toastify";
import { useRouter, useSearchParams, notFound } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Profile({ params }) {
  const [disabled, setDisabled] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [totalPaymentDetails, setTotalPaymentDetails] = useState(0);
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const navigation = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [user, setUser] = useState({});

  const [payments, setPayments] = useState([]);

  const handleChange = (e) => {
    if (!formData.name || !formData.message) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const getData = async () => {
    let limit = session && session?.user.usename === user.username ? 0 : 5;
    let payments = await fetchPayment(params.username, limit);
    setPayments(payments);
  };

  useEffect(() => {
    getData();
    fetchUser(params.username).then((data) => {
      setUser(data);
    });
    if (searchParams.get("payment") === "success") {
      toast.success("Payment Success", {
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
      navigation.push(`/${params.username}`);
    }
    (async () => {
      let totalPaymentDetails = await fetchTotalPaymentDetails(params.username);
      setTotalPaymentDetails(totalPaymentDetails);
    })();
  }, []);
  if (!user) return notFound();
  return (
    <main>
      <div className="w-full h-80 bg-white">
        <img
          className="h-full w-full object-cover object-center"
          src={user.cover || "https://source.unsplash.com/1600x900/"}
          alt=""
        />
      </div>
      <div className="relative w-full flex justify-center">
        <img
          className="h-32 w-32 rounded-full absolute -top-16 border-2 border-white"
          src={user.profile || "/profile.png"}
          alt=""
        />
      </div>
      <div className="flex flex-col items-center mt-20">
        <p>@{params.username}</p>
        <p className="text-gray-500">Let's help {user.name} to get a chai</p>
        <p className="text-gray-500">
          {totalPaymentDetails.totalNumberOfPayments} Payments . ₹
          {totalPaymentDetails.totalAmount} raised
        </p>
      </div>
      <div className="flex w-full max-w-screen-xl mx-auto gap-4 my-4 *:w-1/2 *:bg-gray-900 *:rounded-lg *:p-4">
        <div>
          <h3 className="font-bold text-xl my-4">Supporters</h3>
          <ul className="mx-4 *:my-2 *:font-light">
            {payments.length === 0 && <p>No supporters yet</p>}
            {payments.map((payment) => (
              <li key={payment._id} className="flex gap-4 items-center">
                <img
                  src="/profile.png"
                  alt=""
                  className="h-10 w-10 rounded-full"
                />
                <p>
                  <span className="font-semibold">{payment.name}</span> donated{" "}
                  <span className="font-bold">₹{payment.amount}</span> with a
                  message "{payment.message}"
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-xl my-4">Become a Supporter</h3>
          <form
            className="mx-4 *:my-2 transition-all duration-200"
            onClick={() => setShowInfo(true)}
          >
            <div>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className={`block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              ></input>
              {!formData.name && showInfo && (
                <p className="text-red-500 text-xs mx-4 mt-1">
                  Name is required
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>
              {!formData.message && showInfo && (
                <p className="text-red-500 text-xs mx-4 mt-1">
                  Message is required
                </p>
              )}
            </div>
            <input
              type="text"
              id="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></input>
            <PaymentButton
              formData={formData}
              disabled={disabled || amount.value < 1}
              to_username={params.username}
              className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Donate
            </PaymentButton>
          </form>
          <div className="mx-4">
            <PaymentButton
              amount={10}
              disabled={disabled}
              to_username={params.username}
              formData={formData}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pay ₹10
            </PaymentButton>
            <PaymentButton
              amount={50}
              disabled={disabled}
              formData={formData}
              to_username={params.username}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pay ₹50
            </PaymentButton>
            <PaymentButton
              amount={100}
              formData={formData}
              disabled={disabled}
              to_username={params.username}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pay ₹100
            </PaymentButton>
          </div>
        </div>
      </div>
      <div className="h-1"></div>
    </main>
  );
}
