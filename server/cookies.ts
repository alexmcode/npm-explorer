import * as cookie from "cookie"

const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string

export const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days

/**
 * @param cookieStr - The string value of the 'Cookie' header
 * @returns An auth cookie string value or undefined
 */
export function getAuthCookieValue(
  cookieStr: string | undefined,
): string | undefined {
  if (cookieStr === undefined || cookieStr.length === 0) {
    return undefined
  }

  const cookies = cookie.parse(cookieStr)
  const value = cookies[AUTH_COOKIE_NAME]
  if (value === undefined || value.length === 0) {
    return undefined
  }

  return value
}

/**
 * @param value - Value of the cookie to set e.g. auth token
 * @param maxAge - Set max age for the cookie
 * @param expiresAt - When the cookie is supposed to expire
 * @returns A String to be used as 'Set-Cookie' header
 */
export function genAuthCookieHeaderString(
  value: string,
  {
    expiresAt,
    maxAge,
  }: {
    expiresAt: Date
    maxAge: number
  },
): string {
  return cookie.serialize(AUTH_COOKIE_NAME, value, {
    maxAge: maxAge,
    expires: expiresAt,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  })
}

export function genAuthExpiredCookie(): string {
  return cookie.serialize(AUTH_COOKIE_NAME, "", {
    maxAge: -1,
    path: "/",
  })
}
