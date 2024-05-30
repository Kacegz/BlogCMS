import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { styled } from "styled-components";

function Edit() {
  const [posts] = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState();
  const [error, setError] = useState();
  const postId = useParams();
  const navigate = useNavigate();

  async function updatePost(e) {
    try {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem("accessToken"));
      const response = await fetch(`http://localhost:3000/posts/${postId.id}`, {
        method: "PUT",
        body: JSON.stringify(selected),
        headers: {
          authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.msg);
      }
      setLoading(false);
      navigate(0);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    const selectedPost = posts.filter((post) => post._id === postId.id);
    setSelected(...selectedPost);
    setLoading(false);
  }, [postId]);
  return (
    <>
      {!loading && (
        <FormSection
          method="PUT"
          onSubmit={(e) => {
            updatePost(e);
          }}
        >
          <label htmlFor="title">
            <p>Title</p>
          </label>
          <TopSection>
            <TitleInput
              type="text"
              name="title"
              value={selected.title}
              onChange={(e) => {
                setSelected({ ...selected, title: e.target.value });
              }}
            />

            <label htmlFor="published">
              <p>Publish:</p>
            </label>
            <CheckboxInput
              type="checkbox"
              name="published"
              checked={selected.published}
              onChange={(e) =>
                setSelected({ ...selected, published: e.target.checked })
              }
            />
            <StyledButton type="submit" value="Update" />
          </TopSection>
          <label htmlFor="text">
            <p>Text:</p>
          </label>
          <TextInput
            type="text"
            name="text"
            value={selected.text}
            onChange={(e) => setSelected({ ...selected, text: e.target.value })}
          />
        </FormSection>
      )}
      {error ? <ErrorMsg>{error.message}</ErrorMsg> : ""}
    </>
  );
}

export default Edit;
const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 40px;
`;
const TopSection = styled.section`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const TitleInput = styled.input`
  background: white;
  border: 1px solid #cbced3;
  border-radius: 10px;
  width: 400px;
  height: 30px;
  font-size: 24px;
  font-weight: bold;
`;
const CheckboxInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 62px;
  height: 32px;
  display: inline-block;
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: #707070;
  transition: background-color ease 0.3s;

  &:before {
    content: "";
    display: block;
    position: absolute;
    z-index: 2;
    width: 28px;
    height: 28px;
    background: #fff;
    left: 2px;
    top: 2px;
    border-radius: 50%;
    color: #fff;
    text-shadow: -1px -1px rgba(0, 0, 0, 0.15);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    transition: all cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s;
  }

  &:checked {
    background-color: #a79277;
  }

  &:checked:before {
    left: 32px;
  }
`;
const TextInput = styled.textarea`
  background: white;
  border: 1px solid #cbced3;
  border-radius: 10px;
  width: 700px;
  height: 300px;
  font-size: 20px;
  resize: none;
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
