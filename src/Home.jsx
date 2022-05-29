import Feed from "./Feed";

const Home = ({posts, fetchError, isLoading}) => {
    return (
        <div>
            {isLoading && <p>Loading post ... </p>}
            {!isLoading && fetchError && <p style={{color: "red"}}>{fetchError}</p>}
            {!isLoading && !fetchError && posts ? <Feed posts={posts}/> : <h4>No post to display</h4>}

        </div>
    );
};

export default Home;
