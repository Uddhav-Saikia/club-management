
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Posts from "../ui/Posts";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "../ui/Searchbar";
import Spinner from "../ui/Spinner";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

const GlassyContent = styled.div`
  background: rgba(35, 41, 70, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 2.5rem 2.5rem 1.5rem 2.5rem;
  margin: 2rem 0;
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

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [like, setLike] = useState(false);
  const [save, setSaved] = useState(false);
  const [likedPostsSet, setLikedPostsSet] = useState(new Set());
  const [savedPostsSet, setSavedPostsSet] = useState(new Set());
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 5;

  const auth = JSON.parse(localStorage.getItem("user"));
  const userID = auth._id;

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(function () {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `/api/user/getUserDetails/like/save?userID=${userID}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();

        // Assuming userData contains likedPostIds and savedPostIds
        setLikedPostsSet(new Set(userData.likedPostIds));
        setSavedPostsSet(new Set(userData.savedPostIds));
        localStorage.setItem("userData", JSON.stringify(userData));
        console.log(JSON.stringify(userData));
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchUserDetails();
  }, [like, save]);

  function handleLike() {
    setLike((like) => !like);
  }

  function handleSave() {
    setSaved((save) => !save);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user/clubPosts", {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        if (result && result.length > 0) {
          setData(result);
        } else {
          // Dummy posts for demo
          setData([
            { _id: '1', title: 'Photography Workshop', description: 'Learn the basics of DSLR photography. Bring your own camera and join us for a fun session!', coordinators: ['Alice Smith'], clubName: 'Photography Club' },
            { _id: '2', title: 'Robotics Bootcamp', description: 'Build and program your first robot. No prior experience needed!', coordinators: ['Bob Lee'], clubName: 'Robotics Club' },
            { _id: '3', title: 'Music Jam', description: 'Open mic and jam session for all music lovers. Bring your instrument or just your voice!', coordinators: ['Carol King'], clubName: 'Music Club' },
            { _id: '4', title: 'Drama Night', description: 'A night of one-act plays and improv. All are welcome to participate or watch.', coordinators: ['David Kim'], clubName: 'Drama Club' },
            { _id: '5', title: 'Hackathon', description: '24-hour coding challenge with prizes for the best projects. Form a team or join solo!', coordinators: ['Eva Brown'], clubName: 'Coding Club' },
          ]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pageCount = Math.ceil(data.length / postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
      </Row>
      <GlassyContent>
        <Row>
          {/* <SearchBar onSearch={handleSearch} /> */}
        </Row>
        <Row>
          {data
            .slice(pageNumber * postsPerPage, (pageNumber + 1) * postsPerPage)
            .map((post) => (
              <Posts
                key={post._id}
                id={post._id}
                title={post.title}
                description={post.description}
                coordinators={post.coordinators}
                clubName={post.clubName}
                setHandleLike={handleLike}
                setHandleSave={handleSave}
                likeByUser={likedPostsSet.has(post._id)}
                saveByUser={savedPostsSet.has(post._id)}
              />
            ))}
        </Row>
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
      </GlassyContent>
    </>
  );
}

export default Dashboard;
