import React from "react"
import { Link, Route } from "react-router-dom";
import { useTable, usePagination } from 'react-table'
import { IconContext } from "react-icons";
import { FaArrowLeft, FaArrowRight, FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";

interface MyProps {
    columns: any,
    data: any,
    onDeleteClick: any
}

const Table: React.FC<MyProps> = ({ columns, data, onDeleteClick }) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }
        },
        usePagination
    )

    return (
        <>
            <div className="table-container">
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                    <td>
                                        {row.cells.map((cell, i) => {
                                            if (i % 2 == 0) {
                                                return (
                                                    <div className="action-container" key={cell.value}>
                                                        <Link className="edit" to={`/admin/edit/${cell.value}`}>
                                                            <FaEdit />
                                                        </Link>
                                                        <div className="delete" onClick={() => onDeleteClick(cell.value)}>
                                                            <FaTrash />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}

                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="add-dish">
                <Link to="/admin/add" className="add-dish__icon">
                    <IconContext.Provider value={{ size: "1.8em" }}>
                        <FaPlusCircle />
                    </IconContext.Provider>
                </Link>

            </div>
            <div className="pagination">
                <div>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {<FaArrowLeft />}
                    </button>{' '}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        {<FaArrowRight />}
                    </button>{' '}
                </div>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[5, 10, 20, 30, 40].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default Table