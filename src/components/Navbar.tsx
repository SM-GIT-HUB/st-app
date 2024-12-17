import { auth, signIn, signOut } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

async function Navbar() {
    const session = await auth();

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans sticky top-0 z-20'>
        <nav className='flex justify-between items-center py-1'>
            <div>
                <Link href={'/'}>
                    <Image src={'/logo.png'} alt='logo' width={144} height={30} />
                </Link>
            </div>

            <div className='flex flex-row items-center gap-5'>
                {
                    session && session?.user ? (
                        <div className='flex items-center gap-5'>
                            <Link href='/startup/create'>
                                <span className='max-sm:hidden'>Create</span>
                                <BadgePlus className='size-6 sm:hidden'/>
                            </Link>

                            <form action={async() => {
                                'use server'
                                
                                await signOut({ redirectTo: '/' });
                            }}>
                                <button type='submit' className='flex items-center justify-center'>
                                    <span className='max-sm:hidden'>Logout</span>
                                    <LogOut className='size-6 sm:hidden text-red-500'/>
                                </button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <Avatar>
                                    {
                                        session?.user?.image && session?.user?.name &&
                                        <AvatarImage src={session?.user?.image} alt={session?.user?.name} />
                                    }
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
                            </Link>
                        </div>
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