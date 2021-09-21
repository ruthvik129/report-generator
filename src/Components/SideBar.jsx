import React from "react";
import styled from "styled-components";

const SideBarContainer = styled.div`
  height: 100%;
  background: #fefbf3;
  width: 20em;
`;

const CardHeader = styled.h3`
  margin: 0;
  display: grid;
  place-content: center;
  padding: 1em;
  background: #cdf0ea;
`;

const ListWrapper = styled.ul`
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
`;

const Lisitem = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  border-radius: 10px;
  gap: 1rem;
  cursor: pointer;
  color: #000;
`;

const SideBar = ({ columnData, onItemClick }) => {
  return (
    <SideBarContainer>
      <CardHeader>Columns</CardHeader>
      <ListWrapper>
        {columnData.map((column, index) => (
          <Lisitem onClick={() => onItemClick(column?.headerName)} key={index}>
            {column?.headerName}
          </Lisitem>
        ))}
      </ListWrapper>
    </SideBarContainer>
  );
};

export default SideBar;
