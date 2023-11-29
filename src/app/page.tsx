import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

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
      <div>
        <Link href='/api/auth/signin'>sign-in</Link>
      </div>
      <div>
        <Link href='/api/auth/signout'>sign-out</Link>
      </div>
    </main>
  )
}
