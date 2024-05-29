import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { styled } from "styled-components";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchPosts() {
    const response = await fetch("http://localhost:3000/posts");
    const data = await response.json();
    setPosts(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
      {!loading ? (
        <Main>
          <Header>
            <h1>Header</h1>
          </Header>
          <Navigation>
            <div>
              <ul>
                {posts.map((post) => {
                  return (
                    <li key={post._id}>
                      <Link to={`/${post._id}`}>{post.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Navigation>
          <Content>
            <h1>Content</h1>
            <Outlet />
          </Content>
        </Main>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
}
const Main = styled.section`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 1fr 9fr;
`;
const Header = styled.section`
  grid-area: 1/1/1/3;
`;
const Navigation = styled.section``;
const Content = styled.section`
  background: #feece2;
`;
export default App;
