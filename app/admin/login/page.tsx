export const dynamic = 'force-dynamic';

export default function AdminLoginPage({ searchParams }: { searchParams?: { error?: string } }) {
  const error = searchParams?.error ?? null;

  return (
    <main className="flex items-center justify-center h-screen w-full">
      <div className="w-full max-w-md bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Admin Login</h1>
        <p className="text-sm text-gray-600 dark:text-white/70 mt-1">Masuk untuk mengelola menu.</p>
        {error === '1' && <p className="text-sm text-red-600 mt-4">Email atau password salah.</p>}
        {error === 'config' && <p className="text-sm text-red-600 mt-4">Konfigurasi admin belum lengkap.</p>}

        <form action="/api/admin/login" method="post" className="mt-6 flex flex-col gap-3">
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="h-12 px-4 rounded-lg border border-black/10 dark:border-white/10 dark:bg-white/10"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="h-12 px-4 rounded-lg border border-black/10 dark:border-white/10 dark:bg-white/10"
          />
          <button
            type="submit"
            className="h-12 rounded-lg bg-gray-900 text-white hover:bg-gray-950 transition"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
