import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

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
      name: 'email-password-A',
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
      },
      authorize(credentials) {
        console.log('#authorize-A')
        const user: UserSession = {
          id: '#id_1',
          name: `dummy-A-${Date.now()}`,
          email: 'a@dummy',
          role: credentials?.email === 'admin' ? 'admin' : 'user',
        }
        return user
      },
    }),
    // ↓ CredentialsProvider の2つ目を定義しても、2つ目の authorize() は呼ばれない
    // https://stackoverflow.com/questions/76233453/how-to-add-multiple-login-page-with-nextauth-and-calling-specific-api-routes
    CredentialsProvider({
      name: 'email-password-B',
      credentials: {
        id: { type: 'text' },
        password: { type: 'password' },
      },
      authorize() {
        console.log('#authorize-B')
        const user: UserSession = {
          id: '#id_2',
          name: `dummy-B-${Date.now()}`,
          email: 'b@dummy',
          role: 'reporter',
        }
        return user
      },
    }),
  ],
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
