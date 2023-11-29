import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <h1>Root</h1>
      <div>
        <Image src='/next.svg' alt='Next.js Logo' width={180} height={37} />
      </div>
    </main>
  )
}
