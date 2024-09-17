export default function Posts({ posts }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 dark:border-gray-700 p-4 sm:p-8 md:p-16">
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-3 gap-4">
          {posts.map((post) => (
            <a href={`/${post._id}`} key={post._id}
              className="relative flex h-full flex-col rounded-md border border-gray-200 bg-white p-2.5 hover:border-gray-400 sm:rounded-lg sm:p-5 dark:bg-gray-700 dark:border-gray-600">
              <span className="text-md mb-0 font-semibold sm:mb-1.5 sm:text-xl text-gray-900 dark:text-white" >
                {post.title}
              </span>
              <span className="text-sm leading-normal sm:block text-gray-600 dark:text-gray-400">
                {post.content}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div >
  )
}

export async function getServerSideProps() {

  const res = await fetch('http://localhost:3000/api/posts/')
  const { posts } = await res.json()

  const serializedPosts = posts.map(post => ({
    ...post,
    _id: post._id.toString(),
    authorId: post.authorId.toString(),
  }));

  return {
    props: { posts: serializedPosts }
  }
}
