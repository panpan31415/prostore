import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/db/prisma";
import CredentialsProviders from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";

export const config: NextAuthConfig = {
  // `pages` defines where NextAuth should redirect for auth-related screens.
  // Without it, users land on the library’s default UI instead of your custom one.
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  // `session` config controls how identity is stored and exposed to your app.
  // Frontend hooks such as `useSession`/`getServerSession` read it to determine who is logged in.
  // Backend handlers get the same data by decoding the JWT (or DB session id) on each request.
  // Extra fields can be injected through `callbacks.session`.
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // The adapter teaches NextAuth how to persist users/accounts/sessions.
  // Here we plug in the Prisma adapter so all identity data flows through our Prisma Client.
  adapter: PrismaAdapter(prisma),
  // `providers` enumerate the login mechanisms; each one knows how to authenticate a user and return their profile.
  providers: [
    CredentialsProviders({
      credentials: {
        email: { type: "email" },
        password: {
          type: "password",
        },
      },
      async authorize(credentials) {
        if (credentials === null) {
          return null;
        }
        //find user in db
        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        });

        // check if user exists and if password matches
        if (!user) {
          return null;
        }
        if (!user.password) {
          return null;
        }
        const isMatch = compareSync(
          credentials.password as string,
          user.password
        );
        if (!isMatch) {
          return null;
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token, trigger, user }: any) => {
      // copy the token’s subject onto the session so client code can reference user.id
      session.user.id = token.sub;

      // when `session.update()` runs, refresh the name from the latest user record
      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },
  },
};

/**
 * handlers: 包含 NextAuth 生成的 GET/POST 路由处理函数；只要在 app/api/auth/[...nextauth]/route.ts
 * 里 export { handlers as GET, handlers as POST }，就能暴露 /api/auth/* 端点给浏览器（OAuth 跳转、session 查询等都走这）。
 * auth: 一个 helper，可以在中间件、Server Component、Route Handler、API Route 等服务端环境里调用，
 * 自动解析当前请求的 session。例如 const session = await auth() 或在 middleware 里 export { auth as middleware }。
 * signIn/signOut: 服务器端版本的登录/登出方法，可在 actions 或 Route Handlers 里触发重定向式登录、
 * 退出流程（在客户端你会用 next-auth/react 的同名函数；这里导出的能在 server context 使用）。
 * 所以这四个是 NextAuth 初始化后给你的“工具箱”，分别面向 API 路由、服务端 session 获取、以及服务端触发 login/logout。
 */
export const { handlers, auth, signIn, signOut } = NextAuth(config);
