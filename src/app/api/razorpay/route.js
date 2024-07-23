import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import { fetchUser } from "@/actions/useractions";

export const POST = async (req) => {
  await connectDb();
  let body = Object.fromEntries(await req.formData());
  
  let payment = await Payment.findOne({ order_id: body.razorpay_order_id });
  if (!payment) {
    return NextResponse.json({ message: "Payment not found" }, 404);
  }
  let user = await fetchUser(payment.to_user);
    if (!user) {
        return NextResponse.json({ message: "User not found" }, 404);
    }
  let verified = validatePaymentVerification(
    {
      order_id: body.razorpay_order_id,
      payment_id: body.razorpay_payment_id,
    },
    body.razorpay_signature,
    user.razorpaysecret
  );
  if (verified) {
    payment.done = true;
    await payment.save();
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${payment.to_user}?payment=success`);
  }
  return NextResponse.json({ message: "Payment failed" }, 400);
};
