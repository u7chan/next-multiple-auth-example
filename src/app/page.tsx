import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

export default async function Page() {
  const session = await getServerSession()
  return (
    <main>
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
