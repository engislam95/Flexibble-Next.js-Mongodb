import {
  NextAuthOptions,
  User as UserInterface,
  getServerSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { AdapterUser } from "next-auth/adapters";
import { SessionInterface } from "@/common.types";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  theme: {
    colorScheme: "light",
    logo: "/logo.png",
  },

  callbacks: {
    async session({ session }: any) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({ user }: { user: AdapterUser | UserInterface }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: user?.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: user?.email,
            name: user?.name?.replace(" ", "").toLowerCase(),
            avatarUrl: user?.image,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error);
        return false;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  return session;
}
