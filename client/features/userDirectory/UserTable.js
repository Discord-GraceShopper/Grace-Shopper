import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, selectUsers } from "../../reducers/usersSlice";
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from "@table-library/react-table-library/table";
import { usePagination } from "@table-library/react-table-library/pagination";

const UserTable = () => {
  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 2,
    },
  });

  const dispatch = useDispatch();

  const users = useSelector(selectUsers);
  const { userList } = users;
  const data = { nodes: userList };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  return (
    <div className="user-table">
      <Table data={data}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>ID</HeaderCell>
                <HeaderCell>First Name</HeaderCell>
                <HeaderCell>Last Name</HeaderCell>
                <HeaderCell>Email</HeaderCell>
                <HeaderCell>Account Type</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((user) => (
                <Row key={user.id} user={user}>
                  <Cell>{user.id}</Cell>
                  <Cell>{user.first_name}</Cell>
                  <Cell>{user.last_name}</Cell>
                  <Cell>{user.email}</Cell>
                  <Cell>{user.account_type}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
      {/* <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Account Type</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.account_type}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default UserTable;
