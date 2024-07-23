"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
import User from "@/models/User"

export const initPayment = async (ammount, to_user, paymentForm)=>{
    await connectDb()
    const user = await User.findOne({username: to_user})
    if(!user){
        return {error: "User not found"}
    }
    const instance = new Razorpay({
      key_id: user.razorpayid,
      key_secret: user.razorpaysecret,
    });

    let x = await instance.orders.create({
        amount: ammount * 100,
        currency: "INR",
    })

    await Payment.create({
        name: paymentForm.name,
        to_user,
        amount: ammount,
        message: paymentForm.message,
        order_id: x.id,
    })

    return x;
}

// export const fetchUser = async (username)=>{
//     await connectDb()
//     let user = await User.findOne({username})
//     user = user.toObject({flattenObjectIds: true})
//     return user
// }

export const fetchTotalPaymentDetails = async (username)=>{
    // fetch total ammount received
    await connectDb()
    let payments = await Payment.find({to_user: username,done:true})
    let totalNumberOfPayments = payments.length
    let totalAmount = payments.reduce((acc, payment)=>acc+payment.amount, 0)
    return {totalAmount, totalNumberOfPayments}
}

export const fetchPayment = async (username, limit=0)=>{
    await connectDb()
    let payments = await Payment.find({to_user: username,done:true}).sort({createdAt: -1}).limit(limit)
    return JSON.parse(JSON.stringify(payments))
}

export const updateUser = async (email,update)=>{
    await connectDb()
    let oldUser = await User.findOne({email})
    let user = await User.findOneAndUpdate({email},update,{new: true})
    if(user){
        // update payments
        await Payment.updateMany({to_user: oldUser.username}, {to_user: user.username})
    }
    return JSON.parse(JSON.stringify(user))
}

export const fetchUser = async (username)=>{
    await connectDb()
    let user = await User.findOne({username})
    // user = user.toObject({flattenObjectIds: true})
    return JSON.parse(JSON.stringify(user))
}