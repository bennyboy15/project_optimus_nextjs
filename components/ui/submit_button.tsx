'use client'
 
import { useFormStatus } from 'react-dom'
import { Bouncy } from 'ldrs/react'
import 'ldrs/react/Bouncy.css'

type Props = {
    title: string
}

export function SubmitButton({title}:Props) {
  const { pending } = useFormStatus()
  return (
    <button disabled={pending} className='flex items-center justify-center gap-2 font-semibold px-2 py-1 bg-green-500 text-white rounded disabled:bg-gray-300 disabled:text-gray-500' type="submit">
      {pending ? "Loading" : title}
      {
      pending &&
        (<Bouncy
            size="20"
            speed="1.75" 
            color="gray" 
            >
            </Bouncy>
       )}

    </button>
  )
}
