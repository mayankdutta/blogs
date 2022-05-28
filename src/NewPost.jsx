const NewPost = ({
                     handleSubmit, postTitle, setPostTitle, postBody, setPostBody
                 }) => {
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={"Post Title"}>Title</label>
            <input
                type="text"
                required
                value={postTitle}
                onChange={e => setPostTitle(e.target.value)}
            />
            <br />
            <label htmlFor={"Post Body"}>Post</label>
            <textarea
                required
                value={postBody}
                onChange={e => setPostBody(e.target.value)}
            />
            <br />
            <button type="submit"> Submit</button>
            <br />
        </form>
    )
}

export default NewPost
