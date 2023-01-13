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
      size: 10,
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
      <Table
        data={data}
        pagination={pagination}
        columns={[{ Header: "ID", width: 50 }]}
      >
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell className="id-col">ID</HeaderCell>
                <HeaderCell>First Name</HeaderCell>
                <HeaderCell>Last Name</HeaderCell>
                <HeaderCell>Email</HeaderCell>
                <HeaderCell>Account Type</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((user) => (
                <Row key={user.id} user={user}>
                  <Cell className="id-col">{user.id}</Cell>
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
      <div className="pagination-container">
        <span>Total Pages: {pagination.state.getTotalPages(data.nodes)}</span>

        <span>
          Page:{" "}
          {pagination.state.getPages(data.nodes).map((_, index) => (
            <button
              key={index}
              type="button"
              className="pagination-btn"
              style={{
                fontWeight: pagination.state.page === index ? "bold" : "normal",
              }}
              onClick={() => pagination.fns.onSetPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </span>
      </div>
    </div>
  );
};

export default UserTable;
