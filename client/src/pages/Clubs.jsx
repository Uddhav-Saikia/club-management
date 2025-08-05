import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
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

const JoinButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
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

const Clubs = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userClub = JSON.parse(localStorage.getItem("userClub"));
  const [clubUser, setClubUser] = useState(new Set());
  const [pageNumber, setPageNumber] = useState(0);
  const clubsPerPage = 5;

  useEffect(() => {
    const userID = user._id;
    const fetchAdmins = async () => {
      try {
        const response = await fetch(
          `/api/user/getClubName/${userID}`,
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
        const data = await response.json();
        if (data.formattedAdmins && data.formattedAdmins.length > 0) {
          setAdmins(data.formattedAdmins);
          setClubUser(new Set(data.userDetails));
        } else {
          // Dummy data for demo
          const dummyClubs = [
            { srno: 1, clubName: "Photography Club", admin: "Alice Smith", email: "alice@club.com", id: "1" },
            { srno: 2, clubName: "Robotics Club", admin: "Bob Lee", email: "bob@club.com", id: "2" },
            { srno: 3, clubName: "Music Club", admin: "Carol King", email: "carol@club.com", id: "3" },
            { srno: 4, clubName: "Drama Club", admin: "David Kim", email: "david@club.com", id: "4" },
            { srno: 5, clubName: "Coding Club", admin: "Eva Brown", email: "eva@club.com", id: "5" },
          ];
          setAdmins(dummyClubs);
          setClubUser(new Set());
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  const showToastAndReload = () => {
    toast.success("Joined to the Club", {
      position: toast.POSITION.TOP_RIGHT,
      onClose: () => {
        // Reload the page after the toast is closed
        window.location.reload();
      },
    });
  };

  async function handleJoinClick(clubID, clubName) {
    const userID = user._id;
    try {
      const response = await fetch("/api/user/join/club", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(
            localStorage.getItem("token")
          )}`,
        },
        body: JSON.stringify({
          userID,
          clubID,
          clubName,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data.message);
      toast.success("Joined to the Club", {
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => {
          // Reload the page after the toast is closed
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        },
      });
    } catch (error) {
      console.error("Error adding club:", error.message);
    }
  }

  const pageCount = Math.ceil(admins.length / clubsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <GlassyContent>
    <div>
      <h2 style={{ color: '#eaf6ff', textAlign: 'center', marginBottom: '2rem', letterSpacing: '0.04em' }}>Clubs Page</h2>
      <Table>
        <thead>
          <tr>
            <Th>Sr. No.</Th>
            <Th>Club Name</Th>
            <Th>Admin</Th>
            <Th>Email</Th>
            <Th>Join</Th>
          </tr>
        </thead>
        <tbody>
          {admins
            .slice(pageNumber * clubsPerPage, (pageNumber + 1) * clubsPerPage)
            .map((club, index) => (
              <tr key={club.srno}>
                <Td>{index + 1}</Td>
                <Td>{club.clubName}</Td>
                <Td>{club.admin}</Td>
                <Td>{club.email}</Td>
                <Td>
                  {clubUser.has(club.id) ? (
                    <JoinButton
                      onClick={() => {
                        toast.warning("Already a Member", {
                          position: toast.POSITION.TOP_RIGHT,
                          autoClose: 1000,
                        });
                      }}
                    >
                      Joined
                    </JoinButton>
                  ) : (
                    <JoinButton
                      onClick={() => handleJoinClick(club.id, club.clubName)}
                    >
                      Join
                    </JoinButton>
                  )}
                </Td>
              </tr>
            ))}
        </tbody>
      </Table>
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
    </div>
    </GlassyContent>
  );
};

export default Clubs;
