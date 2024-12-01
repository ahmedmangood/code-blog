import SearchForm from '@/components/SearchForm'
import StartupCard from '@/components/StartupCard'
import { StartupTypeCard } from '@/types'

const Home = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
  const query = (await searchParams).query
  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: 'Ahmed' },
      _id: 1,
      description: 'This is a description for the current post',
      image: 'https://3dprintinguk.com/wp-content/uploads/2021/01/Bed-levelling.jpg',
      title: '3D Printing',
      category: 'Graphics',
    },
  ]
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Display Your Startup, <br /> Connect with Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Displays, and Get Noticed in Virtual Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">{query ? `Search for "${query}"` : 'All Startups'}</p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => <StartupCard key={post?._id} post={post} />)
          ) : (
            <p>No startups found</p>
          )}
        </ul>
      </section>
    </>
  )
}
export default Home
