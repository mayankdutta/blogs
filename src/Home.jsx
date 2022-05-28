import Feed from "./Feed";
const Home = ({ posts }) => {
  return (
    <div>
      {posts.length > 0 ? <Feed posts={posts} /> : <h4>No post to display</h4>}
    
    </div>
  );
};

export default Home;
