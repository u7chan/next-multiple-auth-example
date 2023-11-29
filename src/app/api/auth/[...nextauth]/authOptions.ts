import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: AuthOptions = {
  pages: {
    error: '/',
    verifyRequest: '/',
    newUser: '/',
  },
  callbacks: {
    jwt({ token }) {
      console.log('#callbacks - jwt', { token })
      return token
    },
    session({ session, token }) {
      console.log('#callbacks - session', { session, token })
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
      authorize() {
        console.log('#authorize-A')
        return {
          id: '#id_1',
          name: `dummy-A-${Date.now()}`,
          email: 'a@dummy',
        }
      },
    }),
    // https://stackoverflow.com/questions/76233453/how-to-add-multiple-login-page-with-nextauth-and-calling-specific-api-routes
    CredentialsProvider({
      name: 'email-password-B',
      credentials: {
        id: { type: 'text' },
        password: { type: 'password' },
      },
      authorize() {
        console.log('#authorize-B')
        return {
          id: '#id_2',
          name: `dummy-B-${Date.now()}`,
          email: 'b@dummy',
        }
      },
    }),
  ],
}

export default authOptions
