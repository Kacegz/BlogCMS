import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { styled } from "styled-components";

function Create() {
  const [newPost, setNewPost] = useState({ published: false });
  const navigate = useNavigate();
  async function createPost(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("accessToken"));
    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      console.log(error);
    }
    navigate(0);
  }
  return (
    <>
      <FormSection method="post" onSubmit={(e) => createPost(e)}>
        <label htmlFor="title">
          <p>Title</p>
        </label>
        <TopSection>
          <TitleInput
            type="text"
            name="title"
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <label htmlFor="published">
            <p>Publish:</p>
          </label>
          <CheckboxInput
            type="checkbox"
            name="published"
            defaultValue={false}
            onChange={(e) =>
              setNewPost({ ...newPost, published: e.target.checked })
            }
          />

          <PostButton type="submit" value="Add post" />
        </TopSection>

        <label htmlFor="title">
          <p>Title</p>
          <TextInput
            type="text"
            name="title"
            onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
          />
        </label>
      </FormSection>
    </>
  );
}
const FormSection = styled.form`
  display: flex;
  flex-direction: column;
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
  font-size: 26px;
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
  width: 600px;
  height: 300px;
  font-size: 20px;
  resize: none;
`;
const PostButton = styled.input`
  width: 100px;
  height: 34px;
  border-radius: 4px;
  background: #ead8c0;
  border: 1px solid #a79277;
  &:hover {
    background: #a79277;
    outline: none;
  }
`;
export default Create;
