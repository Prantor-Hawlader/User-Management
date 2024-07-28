import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import dataFetch from "../api/axios";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBadge,
  MDBBtn,
  MDBCheckbox,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { formatDate } from "../utils/date";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const { currentUser, logout } = useAuth();
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

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
      setUsers(
        users.map((user) =>
          selectedUsers.includes(user.id)
            ? { ...user, status: "blocked" }
            : user
        )
      );
    } catch (error) {
      console.log("Failed to block users:", error);
    }
  };

  const handleUnblock = async () => {
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
      setUsers(
        users.map((user) =>
          selectedUsers.includes(user.id) ? { ...user, status: "active" } : user
        )
      );
    } catch (error) {
      console.log("Failed to unblock users:", error);
    }
  };

  const handleDelete = async () => {
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
    }
  };

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(
      users.map((li) => {
        li.id.toString();
      })
    );
    setUsers(
      users.map((user) => ({
        ...user,
        selected: !isCheckAll,
      }))
    );
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    console.log("id:", id, checked);
    setIsCheck([...isCheck, id]);
    setUsers(
      users.map((user) =>
        user.id.toString() === id ? { ...user, selected: checked } : user
      )
    );
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  return (
    <div className="mx-5 mt-2">
      <MDBCard background="dark" className="text-white w-25 ms-auto">
        <MDBCardHeader align="center" className="text-info fw-bold">
          User Info
        </MDBCardHeader>
        <MDBCardBody>
          <MDBCardTitle>Name : {currentUser.name}</MDBCardTitle>
          <MDBCardTitle>Email : {currentUser.email}</MDBCardTitle>
        </MDBCardBody>
      </MDBCard>

      <div className="d-flex">
        <MDBBtn color="warning" onClick={handleBlock}>
          Block
        </MDBBtn>
        <MDBBtn color="success" onClick={handleUnblock} className="mx-2">
          Unblock
        </MDBBtn>
        <MDBBtn color="danger" onClick={handleDelete}>
          Delete
        </MDBBtn>
      </div>
      <MDBTable align="middle" className="mt-2 bg-white">
        <MDBTableHead color="" className="bg-info">
          <tr>
            <th>
              <MDBCheckbox
                id="selectAll"
                onChange={handleSelectAll}
                checked={isCheckAll}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Last login</th>
            <th>Registration time</th>
            <th>Status</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody className="table-dark">
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <MDBCheckbox
                  id={user.id.toString()}
                  checked={user.selected || false}
                  onChange={(e) => {
                    handleClick(e);
                  }}
                />
              </td>
              <td>{user.id}</td>
              <td>
                <p className="fw-bold mb-1">{user.name}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{user.email}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{formatDate(user.lastLogin)}</p>
              </td>
              <td>{formatDate(user.registrationTime)}</td>
              <td>
                <MDBBadge
                  color={user.status === "blocked" ? "warning" : "success"}
                  pill
                >
                  {user.status}
                </MDBBadge>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <MDBBtn
        color="muted"
        onClick={logout}
        className="mt-1 fw-bold border border-info text-white"
      >
        Logout
      </MDBBtn>
    </div>
  );
}
