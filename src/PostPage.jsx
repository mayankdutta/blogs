import {useParams} from "react-router-dom";
import {useEffect} from "react";

const PostPage = ({posts, handleDelete}) => {
    const {id} = useParams();
    const post = posts.find(post => post.id.toString() === id);

    return (
        <main>
            <article>
                {
                    post && <>

                        <h2>{post.title}</h2>
                        <p>{post.datetime}</p>
                        <p>{post.body}</p>
                        <button onClick={() => handleDelete(post.id)}>X</button>
                    </>
                }

            </article>

        </main>
    )
}

export default PostPage;
