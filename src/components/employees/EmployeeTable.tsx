import { useCallback, useMemo, useState } from "react";
import '../../assets/css/modules/table.css';

export interface FilterableTableColumn<TDataKey = string> {
  name: string;
  dataKey: TDataKey;
}
export interface FilterableTableData {
  values: {
    [key in string]: string | undefined;
  };
}

interface FilterableTableProps {
  id?: string;
  className?: string;
  columns: FilterableTableColumn[];
  dataList?: FilterableTableData[];
  isLoading?: boolean;
}
/**
 * @todo Make the table style more customizable
 */
export default function FilterableTable({
  id = "filterable-table",
  className = "",
  columns,
  dataList = [],
  isLoading = false,
}: FilterableTableProps) {
  const [entriesShownNumber, setEntriesShownNumber] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchString, setSearchString] = useState<string>("");

  // Filter data using the search string and search a match in one of the column
  const filteredDataList = useMemo(() => {
    return dataList
      .filter(data => !searchString || Object.keys(data.values).some(dataKey => data.values[dataKey]?.toLowerCase().includes(searchString.toLowerCase())));
  }, [searchString, dataList]);

  const getLastShownElementIndex = useCallback(() => {
    const lastElementIndex = ((pageNumber - 1) * entriesShownNumber) + entriesShownNumber;
    if (lastElementIndex > filteredDataList.length)
      return filteredDataList.length;
    else
      return lastElementIndex;
  }, [filteredDataList, entriesShownNumber, pageNumber])

  // Slice for page filtering
  const pagedDataList = useMemo(() => {
    return filteredDataList
      .slice((pageNumber - 1) * entriesShownNumber, getLastShownElementIndex());
  }, [filteredDataList, pageNumber, entriesShownNumber, getLastShownElementIndex]);

  const goToPreviousPage = () => {
    if (pageNumber !== 1)
      setPageNumber(pageNumber - 1);
  };

  const goToNextPage = () => {
    if (filteredDataList.length > entriesShownNumber * pageNumber)
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
          Search: <input id="filterable-table-search" name="filterable-table-search" onChange={e => setSearchString(e.target.value)} />
        </div>
      </div>
      <table id={id} className={`filterable-table ${className}`} cellSpacing={0}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={"tableCol_" + col.dataKey} className="no-sorting" tabIndex={0} aria-controls={id} rowSpan={1} colSpan={1} scope="col">{col.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr className="row-odd">
              <td colSpan={columns.length}>Loading data...</td>
            </tr>
          ) : pagedDataList.length > 0 ? pagedDataList.map((data, i) => (
            <tr key={"tableRow_" + i} role="row" className={i % 2 === 0 ? "row-even" : "row-odd"}>
              {columns.map(col => {
                const value = data?.values[col.dataKey];
                return (
                  <td key={'colData_' + col.dataKey + i} >{value ?? '-'}</td>
                );
              })}
            </tr>
          )) : (
            <tr className="row-odd">
              <td colSpan={columns.length}>No data available in table</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="filterable-table-filters">
        <div>Showing {pagedDataList.length > 0 ? 1 + (pageNumber - 1) * entriesShownNumber : 0} to {getLastShownElementIndex()} of {filteredDataList.length} entries</div>
        <div>
          <button onClick={goToPreviousPage}>Previous</button>
          {' '}{pageNumber}{' '}
          <button onClick={goToNextPage}>Next</button>
        </div>
      </div>
    </>
  );
}
