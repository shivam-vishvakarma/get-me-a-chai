"use client";
import Script from "next/script";
import { fetchUser, initPayment } from "@/actions/useractions";

export default function PaymentButton({
  to_username,
  formData,
  amount = formData.amount,
  children,
  ...props
}) {
  const pay = async (amount, to_username, formData) => {
    const user = await fetchUser(to_username);
    if (!user) {
      return;
    }
    const order = await initPayment(amount, to_username, formData);
    var options = {
      key: user.razorpayid, // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Get Me A Chai", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the id obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay/`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    let rzp = new Razorpay(options);
    rzp.open();
  };
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          pay(amount, to_username, formData);
        }}
        {...props}
      >
        {children}
      </button>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
    </>
  );
}
