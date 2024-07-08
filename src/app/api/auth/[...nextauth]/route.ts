import NextAuth, { type AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import LineProvider from 'next-auth/providers/line'

type UserSession = {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'reporter'
}

export const authOptions: AuthOptions = {
  pages: {
    error: '/',
    verifyRequest: '/',
    newUser: '/',
  },
  callbacks: {
    jwt({ token, user }) {
      console.log('#callbacks - jwt', { token, user })
      if (user) {
        /*
          NextAuthで用意されている標準のユーザー型は以下となる
          export interface DefaultUser {
            id: string
            name?: string | null
            email?: string | null
            image?: string | null
          }
          拡張する場合は、token に直接をフィールドを追加することで、session コールバック引数の token から受け取れる
        */
        const userSession = user as UserSession
        token.id = userSession.id
        token.role = userSession.role
      }
      return token
    },
    // await getServerSession() の引数、 authOption 未指定でセッションを取得すると下記は呼ばれない
    session({ session, token }) {
      console.log('#callbacks - session', { session, token })
      if (session.user) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
        } as UserSession
      }
      return session
    },
  },
  providers: [
    CredentialsProvider({
      name: 'email and password',
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
      },
      authorize(credentials) {
        const user: UserSession = {
          id: '#id_1',
          name: `dummy-A-${Date.now()}`,
          email: 'a@dummy',
          role: credentials?.email === 'admin' ? 'admin' : 'user',
        }
        return user
      },
    }),
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID || '',
      clientSecret: process.env.LINE_CLIENT_SECRET || '',
      authorization: {
        params: { scope: 'openid profile email' },
      },
    }),
  ],
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
