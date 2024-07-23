import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from "@/models/User";
import Payment from "@/models/Payment";

export const authOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "github" || account.provider === "google") {
        const client = await mongoose.connect(process.env.MONGODB_URI);
        const currentUser = await User.findOne({ email: profile.email });
        if (!currentUser) {
          const newUser = new User({
            email: profile.email,
            username: profile.email.split("@")[0],
            name: profile.name,
            profile: profile.picture,
          });
          await newUser.save();
        }
      }
      return true;
    },
    async session({ session, token }) {
        const dbUser = await User.findOne({ email: session.user.email });
        session.user = dbUser;
      return session;
    }
  },
});

export { authOptions as GET, authOptions as POST };
