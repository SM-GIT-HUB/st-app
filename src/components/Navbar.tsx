import { auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'

async function Navbar() {
    const session = await auth();
    console.log(session);

  return (
    <header className='px-5 py-e bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center'>
            <Link href={'/'}>
                <Image src={'/logo.png'} alt='logo' width={144} height={30} />
            </Link>

            <div className='flex items-center gap-5'>
                {
                    session && session?.user ? (
                        <>
                            <Link href='/startup/create'>
                                <span>Create</span>
                            </Link>

                            <form action={async() => {
                                'use server'
                                let options = { redirectTo: '/' };
                                await signOut(options);
                            }}>
                                <button type='submit'>
                                    <span>Logout</span>
                                </button>
                            </form>

                            <Link href={`/user/${session?.user?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <form action={async() => {
                                'use server'
                                let provider = "github";
                                await signIn(provider);
                            }}>
                                <button type='submit'>
                                    <span>Login</span>
                                </button>
                            </form>
                        </>
                    )
                }
            </div>
        </nav>
    </header>
  )
}

export default Navbar