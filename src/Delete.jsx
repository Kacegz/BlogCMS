import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { styled } from "styled-components";

function Delete() {
  const [posts] = useOutletContext();
  const [loading, setLoading] = useState(true);
  const postId = useParams();
  const [selected, setSelected] = useState();
  const navigate = useNavigate();

  async function deletePost(e) {
    setLoading(true);
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("accessToken"));
    const response = await fetch(
      `https://blogapi-production-2510.up.railway.app/posts/${postId.id}`,
      {
        method: "DELETE",
        body: JSON.stringify(selected),
        headers: {
          authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    navigate("/dashboard");
  }

  useEffect(() => {
    const selectedPost = posts.filter((post) => post._id === postId.id);
    setSelected(...selectedPost);
    setLoading(false);
  }, [postId]);
  return (
    <>
      {!loading && (
        <FormSection onSubmit={(e) => deletePost(e)}>
          <p>Are you sure you want to delete</p>
          <h1>{selected.title}</h1>
          <StyledButton type="submit" value="Delete" />
        </FormSection>
      )}
    </>
  );
}
export default Delete;
const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 40px;
  text-align: center;
`;

const StyledButton = styled.input`
  width: 100px;
  height: 34px;
  border-radius: 4px;
  background: #ead8c0;
  border: 1px solid #a79277;
  &:hover {
    background: #d1bb9e;
    outline: none;
  }
`;
const ErrorMsg = styled.p`
  color: red;
  font-weight: bold;
`;
