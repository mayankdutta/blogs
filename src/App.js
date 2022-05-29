import About from "./About";
import Footer from "./Footer";
import Home from "./Home";
import Missing from "./Missing";
import Header from "./Header";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Nav from "./Nav";
import {Routes, Route, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {format} from "date-fns"
import api from "./api/posts"
import EditPost from "./EditPost";
import useAxiosFetch from "./Hooks/useAxiosFetch";

const App = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');

    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');

    const navigate = useNavigate();
    const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');

    useEffect(() => {
        setPosts(data);
    }, [data])

    useEffect(() => {
        try {
            const filteredResult = posts.filter(
                post => ((post.body?.toLowerCase().includes(search?.toLowerCase())) ||
                    (post.title?.toLowerCase().includes(search?.toLowerCase()))
                )
            )
            setSearchResult(filteredResult.reverse());
        } catch (err) {
            console.warn(err);
        }
    }, [posts, search])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), "MMMM dd, yyyy pp");
        const newPost = {
            id: id, title: postTitle, datetime: datetime, body: postBody
        }
        try {
            const response = await api.post('/posts', newPost);

            // response.data should be equal to newPost
            const allPosts = [...posts, response.data];

            setPosts(allPosts);

            setPostTitle('')
            setPostBody('');
            navigate('/');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

    const handleEdit = async (id) => {
        const datetime = format(new Date(), "MMMM dd, yyyy pp");
        const updatedPost = {id, title: editTitle, datetime, body: editBody};

        try {
            const response = await api.put(`/posts/${id}`, updatedPost)
            setPosts(posts.map(post => post.id === id ? {...response.data} : post));

            setEditBody("")
            setEditTitle("")

            navigate('/');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

    const handleDelete = async (id) => {
        const response = await api.delete(`/posts/${id}`);
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
        navigate("/");
    }

    return (
        <>
            <Nav search={search} setSearch={setSearch}/>
            <Header title={"React JS blog"}/>
            <Routes>
                <Route path="/" element={<Home posts={searchResult}/>}/>
                <Route exact path="/post" element={<NewPost
                    handleSubmit={handleSubmit}
                    postTitle={postTitle}
                    setPostTitle={setPostTitle}
                    postBody={postBody}
                    setPostBody={setPostBody}
                />}/>

                <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
                <Route path={"/edit/:id"} element={<EditPost
                    handleEdit={handleEdit}
                    posts={posts}
                    editTitle={editTitle}
                    setEditTitle={setEditTitle}
                    editBody={editBody}
                    setEditBody={setEditBody}
                />}/>
                <Route path="/about" element={<About/>}/>
                <Route path="*" element={<Missing/>}/>
            </Routes>
            <Footer/>
        </>
    );
};

export default App;
