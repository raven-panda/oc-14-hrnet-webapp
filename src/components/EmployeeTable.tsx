import { useMemo, useState } from "react";
import '../assets/css/table.css';

export interface FilterableTableColumn {
  name: string;
}
export interface FilterableTableData {
  values: string[];
}

interface FilterableTableProps {
  id?: string;
  columns: FilterableTableColumn[];
  dataList?: FilterableTableData[];
}
export default function FilterableTable({
  id = "filterable-table",
  columns,
  dataList = [],
}: FilterableTableProps) {
  const [entriesShownNumber, setEntriesShownNumber] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  const filteredDataList = useMemo(() => 
    dataList.slice((pageNumber - 1) * entriesShownNumber, entriesShownNumber),
  [dataList, pageNumber, entriesShownNumber]);

  const goToPreviousPage = () => {
    if (pageNumber !== 1)
      setPageNumber(pageNumber - 1);
  };

  const goToNextPage = () => {
    if (dataList.length > entriesShownNumber * pageNumber)
      setPageNumber(pageNumber + 1);
  };

  return (
    <>
      <div className="filterable-table-filters">
        <div>
          Show{' '}
          <select value={entriesShownNumber} onChange={e => setEntriesShownNumber(parseInt(e.target.value))}>
            <option value='10'>10</option>
            <option value='25'>25</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </select>{' '}
          entries
        </div>
        <div>
          Search: <input id="filterable-table-search" name="filterable-table-search" />
        </div>
      </div>
      <table id={id} className="filterable-table" cellSpacing={0}>
        <thead>
          <tr>
            {columns.map(col => (
              <th className="no-sorting" tabIndex={0} aria-controls={id} rowSpan={1} colSpan={1} scope="col">{col.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataList.length > 0 ? dataList.map((data, i) => (
            <tr role="row" className={i % 2 === 0 ? "even" : "odd"}>
              {data.values.map(value => <td>{value}</td>)}
            </tr>
          )) : (
            <tr className="odd">
              <td colSpan={columns.length}>No data available in table</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="filterable-table-filters">
        <div>Showing {filteredDataList.length > 0 ? 1 + (pageNumber - 1) * entriesShownNumber : 0} to {filteredDataList.length} of {dataList.length} entries</div>
        <div>
          <button onClick={goToPreviousPage}>Previous</button>
          {' '}{pageNumber}{' '}
          <button onClick={goToNextPage}>Next</button>
        </div>
      </div>
    </>
  );
}