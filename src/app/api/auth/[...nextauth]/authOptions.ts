import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'email-password-01',
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
      },
      authorize() {
        return {
          id: 'dummy-01',
        }
      },
    }),
  ],
}

export default authOptions
