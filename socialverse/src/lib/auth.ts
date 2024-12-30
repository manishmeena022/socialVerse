import { connectDb } from "./mongoConnect";
import User from "@/models/userModel";
import NextAuth, { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import CredentialsProviders from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProviders({
            name: "Credentials",
            id: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password;

                if (!password || !email) {
                    throw new Error("Username/Email and Password is required");
                }

                await connectDb();

                const user = await User.findOne({
                    email,
                }).select("+password");

                if (!user) {
                    throw new Error("Invalid email or password");
                }

                const passwordMatch = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!passwordMatch) {
                    throw new Error("Invalid email or password");
                }

                return {
                    id: user?._id.toString(),
                    username: user.username,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session?.user?.id = token.id;
                session?.user?.role = token.role;
            }
            return session;
        },
    },
};
