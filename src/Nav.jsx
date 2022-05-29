import {Link} from "react-router-dom";

const Nav = ({search, setSearch}) => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/post">Add Post</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Posts</label>
                <input
                    type="text"
                    placeholder="Search Posts "
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        </nav>
    );
};

export default Nav;
