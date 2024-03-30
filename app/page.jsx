import Feed from "@components/Feed"
const Home = () => {
  return (
    <section className="w-full flex justify-center items-center flex-col">
        <h1 className="text-center mt-5 text-5xl font-extrabold leading-[1.15] sm:text-6xl">
            <span className="orange_gradient">
                Share
            </span> & Care
            <br/>
            <span className="orange_gradient text-center">AI prompts</span>
        </h1>
        <p className="mt-5 sm:text-xl text-lg text-gray-600 text-center">
          An open-source AI prompting tool for everyone to create and share.  
        </p>

        <Feed />
    </section>
  )
}

export default Home
