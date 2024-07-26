import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import dataFetch from "../api/axios";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { currentUser, logout } = useAuth();
  console.log("currentUser", currentUser);
  useEffect(() => {
    const fetchUsersData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await dataFetch.get("/users", {
          headers: { Authorization: token },
        });
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsersData();
  }, [currentUser]);

  const handleBlock = async () => {
    setLoading(true);
    const selectedUsers = users
      .filter((user) => user.selected)
      .map((user) => user.id);
    try {
      await dataFetch.put(
        "/users/block",
        { ids: selectedUsers },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log("Failed to block users:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleUnblock = async () => {
    setLoading(true);
    const selectedUsers = users
      .filter((user) => user.selected)
      .map((user) => user.id);
    try {
      await dataFetch.put(
        "/users/unblock",
        { ids: selectedUsers },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log("Failed to unblock users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    const selectedUsers = users
      .filter((user) => user.selected)
      .map((user) => user.id);
    try {
      await dataFetch.delete("/users", {
        data: { ids: selectedUsers },
        headers: { Authorization: localStorage.getItem("token") },
      });

      setUsers(users.filter((user) => !user.selected));
    } catch (error) {
      console.log("Failed to delete users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">User Management</h2>
      <p>Email : {currentUser.email}</p>

      <button
        className="btn btn-danger"
        onClick={handleBlock}
        disabled={loading}
      >
        {loading ? "Blocking" : "Block"}
      </button>
      <button
        className="btn btn-secondary"
        onClick={handleUnblock}
        disabled={loading}
      >
        {loading ? "Unblocking" : "Unblock"}
      </button>
      <button
        className="btn btn-danger"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? "Deleting" : "Delete"}
      </button>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login</th>
            <th>Registration Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => {
                    user.selected = !user.selected;
                    setUsers([...users]);
                  }}
                />
              </td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.lastLogin}</td>
              <td>{user.registrationTime}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={logout} className="btn btn-secondary mt-3">
        Logout
      </button>
    </div>
  );
}
