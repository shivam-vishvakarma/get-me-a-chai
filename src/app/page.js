import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col h-96 items-center justify-center gap-5">
        <h1 className="text-3xl font-bold">Get Me A Chai</h1>
        <p className="text-xl font-light">
          GetMeaChai is a platform that allows your fans to buy you a chai. It's
          a way to show their appreciation for your work.
        </p>
        <div>
          <Link href={"/login"} className="blue-btn">
            Start Here
          </Link>
          <Link href={"#about"} className="blue-btn">
            Learn More
          </Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="container mx-auto my-14">
        <h1 className="text-2xl font-bold text-center my-4">
          Your Fans Can Buy You A Chai
        </h1>
        <div className="flex gap-5 justify-around my-8">
          <div className="item space-y-3 flex items-center flex-col">
            <img
              src="/workingperson.svg"
              className="bg-slate-400 rounded-full p-2"
              width={100}
              alt=""
            />
            <h2 className="text-xl font-bold">Fund Yourself</h2>
          </div>
          <div className="item space-y-3 flex items-center flex-col">
            <img
              src="/workingperson.svg"
              className="bg-slate-400 rounded-full p-2"
              width={100}
              alt=""
            />
            <h2 className="text-xl font-bold">Fund Yourself</h2>
          </div>
          <div className="item space-y-3 flex items-center flex-col">
            <img
              src="/workingperson.svg"
              className="bg-slate-400 rounded-full p-2"
              width={100}
              alt=""
            />
            <h2 className="text-xl font-bold">Fund Yourself</h2>
          </div>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="container flex flex-col items-center gap-5 pb-5" id="about">
        <h1 className="text-2xl font-bold text-center my-4">Learn About Us</h1>
        <p className="w-4/5 text-justify ">
          Welcome to Get Me a Chai, a platform designed to help creators receive
          financial support from their fans. Whether you're an artist, writer,
          or musician, Get Me a Chai enables you to connect with your supporters
          and receive contributions that fuel your creative journey. By offering
          a simple and secure way for fans to show their appreciation, our
          platform empowers you to continue producing the content they love,
          turning passion into a sustainable career. Join us today and let your
          supporters help you brew success, one chai at a time.
        </p>
        <p><Link href={"/aishapatel0910"} className="text-blue-400 hover:underline">Sample Profile Page with test ids of razorpay</Link></p>
      </div>
    </main>
  );
}
