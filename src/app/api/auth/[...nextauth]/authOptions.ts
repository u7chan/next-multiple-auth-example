import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: AuthOptions = {
  pages: {
    error: '/',
    verifyRequest: '/',
    newUser: '/',
  },
  providers: [
    CredentialsProvider({
      name: 'email-password-01',
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
      },
      authorize() {
        console.log('#authorize-01')
        return {
          id: '1',
          name: 'dummy-01',
          email: 'dummy@dummy',
        }
      },
    }),
    CredentialsProvider({
      name: 'email-password-02',
      credentials: {
        id: { type: 'text' },
        password: { type: 'password' },
      },
      authorize() {
        console.log('#authorize-02')
        return {
          id: '2',
          name: 'dummy-02',
          email: 'dummy@dummy',
        }
      },
    }),
  ],
}

export default authOptions
