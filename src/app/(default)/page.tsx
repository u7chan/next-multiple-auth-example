import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'

export default async function Page() {
  // getServerSession の authOptions を設定すると、authOptions 内の session コールバックが呼ばれるようになる
  const session = await getServerSession(authOptions)
  return (
    <main>
      <div>
        <Image src='/next.svg' alt='Next.js Logo' width={180} height={37} />
        <pre>session:</pre>
        <pre style={{ backgroundColor: '#EAEAEA' }}>
          <code>{JSON.stringify(session, null, 2)}</code>
        </pre>
      </div>
      <hr />
      <div>
        <Link href='/api/auth/signin'>sign-in (NextAuth)</Link>
      </div>
      <div>
        <Link href='/api/auth/signout'>sign-out (NextAuth)</Link>
      </div>
      <hr />
      <div>
        <Link href='/api/signout'>sign-out (API Routes)</Link>
      </div>
    </main>
  )
}
