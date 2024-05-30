import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { styled } from "styled-components";
import editIcon from "./assets/edit.svg";
import deleteIcon from "./assets/delete.svg";

function App() {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchPosts() {
    const response = await fetch("http://localhost:3000/posts");
    const data = await response.json();
    setPosts(data);
    setLoading(false);
  }
  useEffect(() => {
    setLoading(true);
    const checkUser = JSON.parse(localStorage.getItem("accessToken"));
    if (checkUser) {
      setUser(checkUser);
    }
    fetchPosts();
  }, []);

  return (
    <>
      {!loading ? (
        <Main>
          <Logo>CMS</Logo>
          <Header>{user ? "" : <h1>You are not logged in</h1>}</Header>
          <Navigation>
            <ul>
              {posts.map((post) => {
                return (
                  <PostLink key={post.title}>
                    <Link to={`/dashboard/${post._id}/`}>{post.title}</Link>

                    <Divider>
                      <Link to={`/dashboard/${post._id}/edit`}>
                        <img src={editIcon} width="30px" height="30px" alt="" />
                      </Link>
                      <Link to={`/dashboard/${post._id}/delete`}>
                        <img
                          src={deleteIcon}
                          width="30px"
                          height="30px"
                          alt=""
                        />
                      </Link>
                    </Divider>
                  </PostLink>
                );
              })}
            </ul>
            <CreateLink>
              <Link to={`/dashboard/`}>Create a new post</Link>
            </CreateLink>
          </Navigation>
          <Content>
            <Outlet context={[posts]} />
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
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr 9fr;
`;
const Logo = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d1bb9e;
  font-size: 32px;
  font-weight: bold;
`;
const Header = styled.section`
  grid-column: 2 / -1;
  text-align: center;
  background: #d1bb9e;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
`;
const Navigation = styled.section`
  background: #a79277;
  padding-top: 10px;

  ul,
  & {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
const Content = styled.section`
  background: #ededed;
`;
const PostLink = styled.li`
  list-style-type: none;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  background: #d1bb9e;
  display: flex;
  justify-content: space-between;
`;
const CreateLink = styled(PostLink)`
  margin: 0;
  border-radius: 0;
  margin-bottom: 20px;
  margin-top: auto;
`;
const Divider = styled.section`
  display: flex;
  gap: 10px;
`;
export default App;
