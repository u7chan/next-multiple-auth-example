import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const GET = () => {
  const cookie = cookies().getAll()
  for (const it of cookie) {
    cookies().delete(it.name)
  }
  return NextResponse.redirect(process.env.NEXTAUTH_URL || '')
}
