import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/model/User";

interface Credentials {
  identifier: string;
  password: string;
}
export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {label: "Email", type: "text"},
        password: {label: "Password", type: "password"},
        identifier: {label: "Identifier", type: "text"},
      },

      async authorize(credentials: Credentials): Promise<typeof User | null> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              {email: credentials.identifier},
              {username: credentials.identifier},
            ],
          });
          if (!user) {
            throw new Error("No user found with this email");
          }
          if (!user.isVerified) {
            throw new Error("Please verify your account before logging in");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (err: unknown) {
          throw new Error(err as string);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
    async session({session, token}) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
});
