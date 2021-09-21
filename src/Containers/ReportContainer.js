import React, { useState } from "react";
import XLSX from "xlsx";
import Table from "../Components/table";
import BarChartComponent from "../Components/barChart";
import LineChartComponent from "../Components/lineChart";
import SideBar from "../Components/SideBar";
import styled from "styled-components";
import { pick } from "lodash";

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const ReportArea = styled.div`
  display: grid;
  width: 100%;
`;

const ChartArea = styled.div`
  display: flex;
`;

const ReportContainer = () => {
  const [rowData, setRowData] = useState(null);
  const [columnData, setcolumnData] = useState(null);
  const [columnKeys, setcolumnKeys] = useState([]);
  const [selectedColumn, setselectedColumn] = useState([]);
  const [BarChartData, setBarchartData] = useState([]);

  const fileChangeHandler = (e) => {
    let file = e.target.files[0];

    let promise = new Promise(function (resolve, reject) {
      var reader = new FileReader();
      var rABS = !!reader.readAsBinaryString;
      reader.onload = function (e) {
        /* Parse data */
        var bstr = e.target.result;
        var wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });

        /* Get first worksheet */
        var wsname = wb.SheetNames[0];
        var ws = wb.Sheets[wsname];

        /* Convert array of arrays */
        var json = XLSX.utils.sheet_to_json(ws, {
          header: 0,
          raw: false,
          dateNF: "yyyy-mm-dd",
        });

        var data = { rows: json };

        console.log(data);

        resolve(data);
      };
      if (file && rABS) reader.readAsBinaryString(file);
      else reader.readAsArrayBuffer(file);
      reader.onerror = function (e) {
        reject(reader.error);
      };
    });
    promise
      .then((fromRes) => {
        let columnDefs = [];
        let formattedColumnData = Object.keys(fromRes?.rows[0]);
        formattedColumnData.map((columnItem) => {
          columnDefs.push({
            headerName: columnItem,
          });
        });
        setRowData(fromRes?.rows);
        setcolumnData(columnDefs);
      })
      .catch((fromRej) => console.log(fromRej));
  };

  const formingColumnData = (column) => {
    let columnKeyArray = [];
    columnKeyArray.push(column);
    let filtercolumn = columnData.find((o) => o.headerName == column);
    let selectedColumnMap = [],
      appendBarData;
    rowData.map((value, index) => {
      selectedColumnMap.push({
        ...pick(value, [column]),
        name: index,
      });
    });
    if (BarChartData.length > 0) {
      appendBarData = BarChartData.map((value, index) => ({
        ...value,
        ...selectedColumnMap[index],
      }));
    }

    let addToExistingColumn = [...selectedColumn, ...[filtercolumn]];
    let addToExistingColumnKey = [...columnKeys, ...columnKeyArray];
    setselectedColumn(addToExistingColumn);
    setBarchartData(
      BarChartData.length > 0 ? appendBarData : selectedColumnMap
    );
    setcolumnKeys(addToExistingColumnKey);
  };

  return rowData && columnData ? (
    <Container>
      <SideBar
        onItemClick={(selectedcolumn) => {
          formingColumnData(selectedcolumn);
        }}
        columnData={columnData}
      />
      <ReportArea>
        <Table rowData={rowData} columnData={selectedColumn} />
        <ChartArea>
          <BarChartComponent chartData={BarChartData} columns={columnKeys} />
          <LineChartComponent chartData={BarChartData} columns={columnKeys} />
        </ChartArea>
      </ReportArea>
    </Container>
  ) : (
    <div className="center-container">
      <label className="custom-file-upload">
        <input
          style={{ display: "none" }}
          type="file"
          id="avatar"
          name="avatar"
          onChange={(e) => fileChangeHandler(e)}
          accept=".xlsx , .xls"
        />
        Browse Files
      </label>
    </div>
  );
};

export default ReportContainer;
