import Image from 'next/image'

const page = () => {
  return (
    <section className='mt-10 flex mx-auto items-center justify-center'>
    <Image src="/certificate.webp" width={700} height={100} alt='mou' className='mt-10'/>
    </section>
  )
}

export default page