import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { styled } from "styled-components";
import deleteIcon from "./assets/delete.svg";

export default function Read() {
  const [posts] = useOutletContext();
  const [loading, setLoading] = useState(true);
  const postId = useParams();
  const [selected, setSelected] = useState();
  const [comments, setComments] = useState([]);
  async function fetchComments() {
    const response = await fetch(
      `https://blogapi-production-2510.up.railway.app/posts/${postId.id}/comments`
    );
    const data = await response.json();
    setComments(data);
  }
  async function deleteComment(e, comment) {
    const user = JSON.parse(localStorage.getItem("accessToken"));
    const response = await fetch(
      `https://blogapi-production-2510.up.railway.app/posts/${postId.id}/comments/${comment._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);

    setComments(comments.filter((c) => c != comment));
  }
  useEffect(() => {
    fetchComments();
    const selectedPost = posts.filter((post) => post._id === postId.id);
    setSelected(...selectedPost);
    setLoading(false);
  }, [postId]);
  return (
    <>
      {!loading && (
        <Wrapper>
          <StyledPost>
            <StyledTitle>{selected.title}</StyledTitle>
            <StyledText>{selected.text}</StyledText>
            <StyledComments>
              <b>Comments:</b>
              {comments.map((comment) => {
                return (
                  <StyledComment key={comment._id}>
                    <p>
                      {comment.author.username}: {comment.text}
                    </p>

                    <img
                      onClick={(e) => {
                        deleteComment(e, comment);
                      }}
                      src={deleteIcon}
                      width="30px"
                      height="30px"
                      alt=""
                    />
                  </StyledComment>
                );
              })}
            </StyledComments>
          </StyledPost>
        </Wrapper>
      )}
    </>
  );
}
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 40px;
  text-align: center;
`;

const StyledPost = styled.section`
  width: 600px;
  height: 600px;
  border-radius: 4px;
  background: #ead8c0;
  border: 1px solid #a79277;
`;
const StyledTitle = styled.section`
  width: 600px;
  border-radius: 4px;
  background: #d1bb9e;
  border: 1px solid #a79277;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledText = styled.section`
  width: 600px;
  height: 400px;

  font-size: 20px;
`;
const StyledComments = styled.section`
  height: 150px;
  overflow: auto;
  border-top: 1px solid #a79277;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
`;
const StyledComment = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ErrorMsg = styled.p`
  color: red;
  font-weight: bold;
`;
