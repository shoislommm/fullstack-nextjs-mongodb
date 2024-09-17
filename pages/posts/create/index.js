import { useState } from "react"
import { useRouter } from "next/router"

export default function createPost() {
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })

    if (!response.ok) {
      throw new Error(`fetch not ok`);
    }

    const { post } = await response.json()
    router.push(`/${post._id}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen md:px-20 pt-6">
        <div className=" bg-white dark:bg-gray-800 dark:border-gray-700 rounded-md px-6 py-10 max-w-2xl mx-auto mt-32">
          <h1 className="text-center text-2xl font-bold text-white mb-10 md:text-2xl dark:text-white font-serif">ADD POST</h1>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="text-gray-900 dark:text-white md:text-2xl font-serif">Title:</label>
              <input type="text" placeholder="Title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  outline-none" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label htmlFor="content" className="text-gray-900 dark:text-white block mb-2 text-lg font-serif">Content:</label>
              <textarea id="content" cols="30" rows="10" placeholder="Write here.." className="bg-gray-50 border border-gray-300 focus:ring-primary-600 focus:border-primary-600 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full font-serif p-4 text-gray-600 outline-none rounded-md" onChange={(e) => setContent(e.target.value)} />
            </div>
            <button className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 px-6 py-2 mx-auto block rounded-md text-lg font-semibold">ADD POST</button>
          </div>
        </div>
      </div>
    </form >
  )
}