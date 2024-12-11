import { auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'

async function Navbar() {
    const session = await auth();
    session? console.log(session) : console.log("no");

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center py-1'>
            <div>
                <Link href={'/'}>
                    <Image src={'/logo.png'} alt='logo' width={144} height={30} />
                </Link>
            </div>

            <div className='flex flex-row items-center gap-5'>
                {
                    session && session?.user ? (
                        <>
                            <Link href='/startup/create'>
                                <span>Create</span>
                            </Link>

                            <form action={async() => {
                                'use server'
                                
                                await signOut({ redirectTo: '/' });
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
                                
                                await signIn("github");
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