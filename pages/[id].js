import { useRouter } from "next/router";

export default function Post({ post }) {
  const router = useRouter()

  async function handleDelete() {
    const res = await fetch(`/api/posts/${router.query.id}`, {
      method: "DELETE"
    })

    if (!res.ok) {
      throw new Error(`fetch not ok`);
    }

    const { post } = await res.json()

    console.log("Deleted post", post)
    router.push(`/`)
  }


  return (
    <div className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased min-h-screen">
      <div className="relative  h-full flex-col rounded-md border border-gray-200 bg-white p-2.5 hover:border-gray-400 sm:rounded-lg sm:p-5 dark:bg-gray-700 dark:border-gray-600 flex justify-between px-4 mx-auto max-w-screen-xl mt-16">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <address className="flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <img className="mr-4 w-16 h-16 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Jese Leos" />
                <div>
                  <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">"Your name"</a>
                  <p className="text-base text-gray-500 dark:text-gray-400">Graphic Designer, educator & CEO Flowbite</p>
                  <p className="text-base text-gray-500 dark:text-gray-400">"Date of published"</p>
                </div>
              </div>
            </address>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {post.title}
            </h1>
          </header>
          <p className="lead">
            {post.content}
          </p>
        </article>
      </div>
      <div className="grid grid-cols-2 max-h-10">
        <a className=" rounded-md border border-gray-200 bg-white p-2.5 hover:border-gray-400 sm:rounded-lg sm:p-5 dark:bg-gray-700 dark:border-gray-600 flex justify-between px-4 mx-auto max-w-screen-xl mt-16 text-xl font-bold text-gray-900 dark:text-white" href={`/posts/update/${post._id}`}>Update</a>
        <button className=" rounded-md border border-gray-200 bg-white p-2.5 hover:border-gray-400 sm:rounded-lg sm:p-5 dark:bg-gray-700 dark:border-gray-600 flex justify-between px-4 mx-auto max-w-screen-xl mt-16 text-xl font-bold text-gray-900 dark:text-white" onClick={handleDelete}>Delete</button>
      </div>

    </div>
  )
}

export async function getStaticPaths() {

  const response = await fetch('http://localhost:3000/api/posts/')
  const { posts } = await response.json()

  const paths = posts.map((post) => ({
    params: { id: post._id },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {

  const db = await client.db("next-posts")
  const post = await db.collection("posts").findOne({ _id: new ObjectId(params.id) })

  // const response = await fetch(`http://localhost:3000/api/posts/${params.id}`)
  // const { post } = await response.json()

  return { props: { post } }
}