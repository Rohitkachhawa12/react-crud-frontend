import React, { useEffect, useState } from "react";
import "./css/user_list.css"; // ✅ External CSS import

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const apiUrl = "http://localhost/laravel-crud-api/public/api/users";

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="user-container">
      <h1 className="user-title">User List</h1>

      {loading ? (
        <p className="loading">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="loading">No users found.</p>
      ) : (
        <>
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Gender</th>
                <th>State</th>
                <th>City</th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user.user_data_id || index}>
                  <td>{user.user_data_id ?? "N/A"}</td>
                  <td>{user.full_name ?? "No Name"}</td>
                  <td>{user.email ?? "No Email"}</td>
                  <td>{user.number ?? "Not Provided"}</td>
                  <td>{user.gender ?? "N/A"}</td>
                  <td>{user.state ?? "N/A"}</td>
                  <td>{user.city ?? "N/A"}</td>
                  <td>{user.created_by ?? "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UserList;
