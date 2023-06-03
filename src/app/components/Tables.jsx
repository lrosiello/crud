import React from "react";
import { Table, Pagination } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

const Tables = ({ data, columns }) => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const filteredData = data.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  return (
    <div className="table-container" marginTop={2}>
      <Table height={"420"} data={filteredData} className="responsive-table">
        {columns.map((column) => (
          <Column
            key={column.dataKey}
            width={column.width + 30}
            align={column.align}
            fixed={column.fixed}
          >
            <HeaderCell>{column.header}</HeaderCell>
            <Cell dataKey={column.dataKey} />
          </Column>
        ))}
      </Table>
      <div style={{ padding: 20, backgroundColor:"#bae2df48", color:"#c1e3e1dd"}} >
            <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="xxl"
            layout={["total", "-", "|", "pager", "skip"]}
            total={data.length}
            limitOptions={[10, 30, 50]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
            renderLengthMenu={() => null}
          />
      </div>
    </div>
  );
};

export default Tables;
