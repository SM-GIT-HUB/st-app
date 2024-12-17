import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard, { StartupTypeCard } from './StartupCard';

async function UserStartups({ id }: { id: string }) {
    const startups = await client.withConfig({ useCdn: false }).fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
  return (
    <>
        {
          (startups.length > 0)?
          startups.map((s: any) => (
            <StartupCard key={s._id} post={s}/>
          )) :
          <p className='no-result'>No posts yet</p>
        }
    </>
  )
}

export default UserStartups