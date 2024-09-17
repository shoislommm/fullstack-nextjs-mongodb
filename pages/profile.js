import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Profile() {
  const [session, setSession] = useState({}); /// убрать объект
  const router = useRouter()

  useEffect(() => {
    async function fetchSession() {
      const res = await fetch('/api/auth/session');
      const { session } = await res.json();
      setSession(session);
    };

    fetchSession();
  }, []);

  const isSessionExist = Object.values(session).length !== 0

  async function handleLogin() {
    await fetch("/api/auth/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: "shoislom", password: "123456" }),
    })

    router.reload()
  }

  async function handleLogout() {
    await fetch("/api/auth/logout")

    router.reload()

  }

  return (
    <div className=''>
      <div className='grid grid-cols-1 gap-4 p-10 border border-slate-500 rounded-md max-w-xl mt-32 mx-auto'>
        {isSessionExist ? (
          <>
            <button onClick={() => handleLogout()} className="hover:bg-slate-200 dark:hover:bg-slate-200 text-slate-900 dark:text-black border border-slate-900 dark:border-black py-2 px-4 rounded focus:outline-2 cursor-pointer">Logout</button>
            <p>Welcome, {session.username}</p>
          </>
        ) : (
          <>

            <button onClick={() => handleLogin()} className="hover:bg-slate-200 dark:hover:bg-slate-200 text-slate-900 dark:text-black border border-slate-900 dark:border-black py-2 px-4 rounded focus:outline-2 cursor-pointer">Login</button>
            <p>Login as 'shoislom'</p>
          </>
        )}
      </div>
    </div>
  );
}
