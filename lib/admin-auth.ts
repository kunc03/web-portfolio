import crypto from 'crypto';
import { cookies } from 'next/headers';

const ADMIN_SESSION_COOKIE = 'admin_session';

type SessionPayload = {
  email: string;
  exp: number;
  iat: number;
};

function getAdminEmail() {
  return process.env.ADMIN_EMAIL ?? 'baguskuncoro003@gmail.com';
}

function getAdminPasswordOrNull() {
  return process.env.ADMIN_PASSWORD ?? null;
}

function getSessionSecretOrNull() {
  return process.env.ADMIN_SESSION_SECRET ?? null;
}

function sign(value: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

function timingSafeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(new Uint8Array(aBuf), new Uint8Array(bBuf));
}

export function isValidAdminCredentials(email: string, password: string) {
  const adminPassword = getAdminPasswordOrNull();
  if (!adminPassword) return false;
  if (email !== getAdminEmail()) return false;
  return timingSafeEqual(password, adminPassword);
}

export function createAdminSessionToken(email: string, maxAgeSeconds = 60 * 60 * 24 * 7) {
  const secret = getSessionSecretOrNull();
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is not configured');
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    email,
    iat: nowSeconds,
    exp: nowSeconds + maxAgeSeconds,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = sign(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined | null) {
  const secret = getSessionSecretOrNull();
  if (!secret) return null;
  if (!token) return null;
  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return null;

  const expectedSignature = sign(encodedPayload, secret);
  if (!timingSafeEqual(signature, expectedSignature)) return null;

  let payload: SessionPayload;
  try {
    payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as SessionPayload;
  } catch {
    return null;
  }

  if (payload.email !== getAdminEmail()) return null;
  if (typeof payload.exp !== 'number' || payload.exp <= Math.floor(Date.now() / 1000)) return null;

  return payload;
}

export async function setAdminSessionCookie(email: string) {
  const token = createAdminSessionToken(email);
  (await cookies() as any).set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSessionCookie() {
  (await cookies() as any).set({
    name: ADMIN_SESSION_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
}

export async function getAdminSession() {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSessionToken(token);
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}
