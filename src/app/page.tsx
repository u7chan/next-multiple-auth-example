import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import authOptions from './api/auth/[...nextauth]/authOptions'

export default async function Page() {
  const session = await getServerSession(authOptions)
  return (
    <main>
      <h1>Root</h1>
      <div>
        <Image src='/next.svg' alt='Next.js Logo' width={180} height={37} />
        <pre>
          <p>session:</p>
          <code>{JSON.stringify(session, null, 2)}</code>
        </pre>
      </div>
      <div>
        <Link href='/api/auth/signin'>sign-in</Link>
      </div>
      <div>
        <Link href='/api/auth/signout'>sign-out</Link>
      </div>
    </main>
  )
}
