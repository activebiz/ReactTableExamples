import React from "react";
import { render } from "react-dom";
import { makeData, Logo, Tips } from "./Utils";
import _ from "lodash";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

// pull in the HOC
import treeTableHOC from "./treeTableHOC";

import testData from "./test_data";

// wrap ReacTable in it
// the HOC provides the configuration for the TreeTableHoc
const TreeTable = treeTableHOC(ReactTable);

function getTdProps(state, ri, ci) {
  console.log({ state, ri, ci });
  return {};
}

// getTdProps={getTdProps}
// Expander={Expander}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // data: makeData()
      data: testData
    };
  }
  render() {
    const { data } = this.state;
    // now use the new TreeTable component
    return (
      <div>
        <TreeTable
          filterable
          defaultFilterMethod={(filter, row, column) => {
            const id = filter.pivotId || filter.id;
            return row[id] !== undefined
              ? String(row[id])
                  .toLowerCase()
                  .includes(filter.value.toLowerCase())
              : true;
          }}
          data={data}
          pivotBy={["state", "post", "city"]}
          columns={[
            // we only require the accessor so TreeTable
            // can handle the pivot automatically
            {
              accessor: "state"
            },
            {
              accessor: "post"
            },
            {
              accessor: "city"
            },

            // any other columns we want to display
            {
              Header: "First Name",
              accessor: "first_name"
            },
            {
              Header: "Last Name",
              accessor: "last_name"
            },
            {
              Header: "Company Name",
              accessor: "company_name"
            },
            {
              Header: "Address",
              accessor: "address"
            },
            {
              Header: "Phone 1",
              accessor: "phone1"
            },
            {
              Header: "Email",
              accessor: "email"
            }
          ]}
          defaultPageSize={10}
          SubComponent={row => {
            // a SubComponent just for the final detail
            const columns = [
              {
                Header: "Property",
                accessor: "property",
                width: 200,
                Cell: ci => {
                  return `${ci.value}:`;
                },
                style: {
                  backgroundColor: "#DDD",
                  textAlign: "right",
                  fontWeight: "bold"
                }
              },
              { Header: "Value", accessor: "value" }
            ];
            const rowData = Object.keys(row.original).map(key => {
              return {
                property: key,
                value: row.original[key].toString()
              };
            });
            return (
              <div style={{ padding: "10px" }}>
                <ReactTable
                  data={rowData}
                  columns={columns}
                  pageSize={rowData.length}
                  showPagination={false}
                />
              </div>
            );
          }}
        />
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
