import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../ui/Spinner";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: transparent;
`;

const Th = styled.th`
  padding: 10px;
  background: rgba(52, 152, 219, 0.18);
  color: #eaf6ff;
  text-align: left;
  font-weight: 700;
  letter-spacing: 0.03em;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #444;
  color: #f4f4f4;
  font-size: 1.08rem;
  letter-spacing: 0.01em;
`;

const ActionTd = styled(Td)`
  text-align: center;

  a {
    color: #3498db;
    text-decoration: none;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.a`
  cursor: pointer;
  margin: 0 5px;
  padding: 8px 16px;
  background-color: #3498db;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    background-color: #2980b9;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageBg = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #181a20 0%, #232946 100%);
`;

const GlassyContent = styled.div`
  background: rgba(35, 41, 70, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 2.5rem 2.5rem 1.5rem 2.5rem;
  margin: 2rem 0;
`;

const Likes = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const auth = localStorage.getItem("user");
  const userID = JSON.parse(auth)._id;
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = likedPosts
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((post, index) => {
      return (
        <tr key={post.postID}>
          <Td>{index + 1}</Td>
          <Td>{post.clubName}</Td>
          <Td>{post.title}</Td>
          <ActionTd>
            <Link to={`/posts/view/${post.postID}`}>View</Link>
          </ActionTd>
        </tr>
      );
    });

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const response = await fetch(
          `/api/user/posts/like/${userID}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setLikedPosts(data);
          setIsLoading(true);
        } else {
          console.error("Failed to fetch liked posts");
          setIsLoading(true);
        }
      } catch (error) {
        console.error("Error fetching liked posts:", error);
        setIsLoading(true);
      }
    };

    fetchLikedPosts();
  }, []);

  const pageCount = Math.ceil(likedPosts.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <GlassyContent>
      <div>
        <h2 style={{ color: '#eaf6ff', textAlign: 'center', marginBottom: '2rem', letterSpacing: '0.04em' }}>Liked Posts</h2>
        <Table>
          <thead>
            <tr>
              <Th>Sr No</Th>
              <Th>Club Name</Th>
              <Th>Title</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>{displayUsers}</tbody>
        </Table>
        {isLoading ? (
          <PaginationWrapper>
            <PaginationContainer>
              <ReactPaginate
                nextLabel="next >"
                onPageChange={changePage}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </PaginationContainer>
          </PaginationWrapper>
        ) : (
          <Spinner />
        )}
      </div>
    </GlassyContent>
  );
};

export default Likes;
