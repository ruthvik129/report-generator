import React from "react";
import "./table.css";

const table = ({ rowData, columnData, style }) => {
  const formatColumns = () => {
    let columns = [];
    columnData.map((column, index) => {
      columns.push(<th key={index}>{column.headerName}</th>);
    });
    return columns;
  };
  return rowData.length > 0 && columnData.length > 0 ? (
    <div style={style}>
      <table>
        <thead>
          <tr>{formatColumns()}</tr>
        </thead>
        <tbody>
          {rowData.map((row, index) => (
            <tr key={index}>
              {columnData.map((column, index) => (
                <td key={index}>{row[column.headerName]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p style={{ margin: "auto" }}>Select any column to populate the table</p>
  );
};

export default table;
