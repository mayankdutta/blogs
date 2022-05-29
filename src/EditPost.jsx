import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";

const EditPost = ({handleEdit, posts, editTitle, setEditTitle, editBody, setEditBody}) => {
    const {id} = useParams();
    const post = posts.find(post => post.id.toString() === id.toString());

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])

    return (
        <form onSubmit={e => e.preventDefault()}>
            <label htmlFor={"Post Title"}>Title</label>
            <input
                type="text"
                required
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
            />
            <br/>
            <label htmlFor={"Post Body"}>Post</label>
            <textarea
                required
                value={editBody}
                onChange={e => setEditBody(e.target.value)}
            />
            <br/>
            <button type="submit" onClick={() => handleEdit(post.id)}> Submit</button>
            <br/>
        </form>
    );
};

export default EditPost;