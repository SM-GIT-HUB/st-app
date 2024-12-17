import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import StartupForm from '@/components/StartupForm'
import React from 'react'

async function Create() {
  const session = await auth();

  if (!session) {
    redirect('/');
  }
    
  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <h1 className='heading'>Submit your Startup</h1>
      </section>

      <StartupForm/>
    </>
  )
}

export default Create