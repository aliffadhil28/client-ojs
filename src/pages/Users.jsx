import React, { useState, useEffect, useRef, useContext } from "react";
import ReactPaginate from "react-paginate";
import { Link, useLoaderData } from "react-router-dom";
import { Button, Table, Modal, TextInput, Label, Select } from "flowbite-react";
import { buttonThemes } from "../assets/themes/buttonThemes";
import { levelHelper } from "../helpers/helper";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import axios from "axios";
import AuthContext from "../assets/context/AuthContext";

const Users = () => {
  document.title = "Users List";
  const { token } = useContext(AuthContext);
  const loader = useLoaderData();
  const data = loader.data;
  const emailAdd = useRef();
  const usernameAdd = useRef();
  const passAdd = useRef();
  const noIndukAdd = useRef();
  const roleAdd = useRef();
  const [userIdEdit, setUserIdEdit] = useState("");
  const [usernameEdit, setUserNameEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [noIndukEdit, setNoIndukEdit] = useState("");
  const [passEdit, setPassEdit] = useState("");
  const [roleEdit, setRoleEdit] = useState("");
  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const n = 10;

  const submit = () => {
    const addPayload = {
      username: usernameAdd.current.value,
      email: emailAdd.current.value,
      password: passAdd.current.value,
      noInduk: noIndukAdd.current.value,
      role: roleAdd.current.value,
    };

    axios
      .post("https://ojs-gateway.localgemy.my.id/users", addPayload, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("User saved successfully");
        setOpenAddModal(false);
      });
  };

  const update = async (id) => {
    const editPayload = {
      username: usernameEdit,
      email: emailEdit,
      noInduk: noIndukEdit,
      role: roleEdit,
    };

    if (passEdit !== "") {
      editPayload.password = passEdit;
    }

    await axios
      .put(`https://ojs-gateway.localgemy.my.id/users/${id}`, editPayload, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("User updated successfully");
        setOpenEditModal(false);
      })
      .catch((error) => {
        console.error(error);
        alert("User update failed");
      });
  };

  function deleteUser(id) {
    axios
      .delete(`https://ojs-gateway.localgemy.my.id/users/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("User deleted Successfully");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        alert("Failed to delete user");
      });
  }

  const btnEditModal = (id) => {
    axios
      .get(`https://ojs-gateway.localgemy.my.id/users/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const userData = response.data.data;
        setUserIdEdit(userData.id);
        setUserNameEdit(userData.username);
        setEmailEdit(userData.email);
        setNoIndukEdit(userData.noInduk);
        setRoleEdit(userData.role);
        setOpenEditModal(true);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error.message);
        alert("Failed to fetch user data");
      });
  };

  useEffect(() => {
    setFilterData(
      data.filter((item, index) => index >= page * n && index < (page + 1) * n)
    );
  }, [page, data]);

  return (
    <div className="flex flex-col prose lg:prose-xl">
      <div className="header flex justify-between my-4">
        <h1 className="my-3 font-bold">User List</h1>
        <Button
          size="sm"
          className="me-4 w-24 h-10"
          theme={buttonThemes}
          gradientMonochrome="success"
          onClick={() => setOpenAddModal(true)}
        >
          Add
        </Button>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>No Induk</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filterData.map((val, i) => {
            return (
              <Table.Row
                key={i}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {val.username}
                </Table.Cell>
                <Table.Cell>{val.email}</Table.Cell>
                <Table.Cell>{val.noInduk}</Table.Cell>
                <Table.Cell>{val.role}</Table.Cell>
                <Table.Cell>
                  <a
                    href={`#`}
                    onClick={() => btnEditModal(val.id)}
                    className="font-medium hover:no-underline text-cyan-600 dark:text-cyan-500 me-2"
                  >
                    Detail
                  </a>
                  <a
                    href={`#`}
                    className="font-medium hover:no-underline text-green-600 dark:text-green-500"
                    onClick={() => deleteUser(val.id)}
                  >
                    Delete
                  </a>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <ReactPaginate
        containerClassName={"pagination flex items-center my-4 mx-auto"}
        pageClassName={
          "page-item p-2 font-semibold bg-gray-200 rounded-md mx-2 text-black"
        }
        activeClassName={"active"}
        onPageChange={(event) => setPage(event.selected)}
        pageCount={Math.ceil(data.length / n)}
        breakLabel="..."
        previousLabel={
          <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
            <AiFillLeftCircle />
          </IconContext.Provider>
        }
        nextLabel={
          <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
            <AiFillRightCircle />
          </IconContext.Provider>
        }
      />
      <Modal show={openAddModal} onClose={() => setOpenAddModal(false)}>
        <Modal.Header>Add User</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username-add" value="Username" />
              </div>
              <TextInput
                ref={usernameAdd}
                id="username-add"
                type="text"
                placeholder="Enter Username"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email-add" value="Email" />
              </div>
              <TextInput
                ref={emailAdd}
                id="email-add"
                type="email"
                placeholder="name@gmail.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="noInduk-add" value="No Induk" />
              </div>
              <TextInput
                ref={noIndukAdd}
                id="noInduk-add"
                type="text"
                placeholder="Enter ID"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password-add" value="Password" />
              </div>
              <TextInput
                ref={passAdd}
                id="password-add"
                type="password"
                placeholder="Enter Password"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="role-add" value="Select User Role" />
              </div>
              <Select id="role-add" ref={roleAdd} required>
                <option value="user">Admin</option>
                <option value="student">Student</option>
              </Select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submit}>Submit</Button>
          <Button color="gray" onClick={() => setOpenAddModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Modal.Header>Edit User</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username-edit" value="Username" />
              </div>
              <TextInput
                id="username-edit"
                type="text"
                placeholder="Enter Username"
                value={usernameEdit}
                onChange={(e) => setUserNameEdit(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email-edit" value="Email" />
              </div>
              <TextInput
                id="email-edit"
                type="email"
                placeholder="name@gmail.com"
                value={emailEdit}
                onChange={(e) => setEmailEdit(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="noInduk-edit" value="No Induk" />
              </div>
              <TextInput
                id="noInduk-edit"
                type="text"
                placeholder="Enter ID"
                value={noIndukEdit}
                onChange={(e) => setNoIndukEdit(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password-edit" value="Password" />
              </div>
              <TextInput
                id="password-edit"
                type="password"
                placeholder="Change Password"
                value={passEdit}
                onChange={(e) => setPassEdit(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="role-edit" value="Select User Role" />
              </div>
              <Select
                id="role-edit"
                required
                value={roleEdit}
                onChange={(e) => setRoleEdit(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="student">Student</option>
              </Select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => update(userIdEdit)}>Update</Button>
          <Button color="gray" onClick={() => setOpenAddModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
