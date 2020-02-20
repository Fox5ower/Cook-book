import React from "react"
import { Link } from "react-router-dom";
import { useTable, usePagination } from 'react-table'
import { FaArrowLeft, FaArrowRight, FaEdit, FaTrash, FaChevronDown } from "react-icons/fa";

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
                <div className="add-btn-container">
                    <Link to="/admin/add" className="add__link">
                        Add Dish
                    </Link>

                    <Link to="/admin/category" className="add__link">
                        Add Category
                    </Link>

                    <Link to="/admin/remove_category" className="add__link">
                        Remove Category
                    </Link>

                </div>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup, i) => (
                            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column, i) => (
                                    <th key={i} {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr key={i} {...row.getRowProps()}>
                                    {row.cells.map((cell, i) => {
                                        return <td key={i} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                    <td>
                                        {row.cells.map((cell, i) => {
                                            if (i % 2 === 0) {
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
                                            } else return <div key={i}></div>
                                        })}

                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
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
                <div className="select-container">
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
                    <FaChevronDown style={{ position: "absolute", top: "38%", left: "85%", pointerEvents: "none", opacity: "0.7", fontSize: "0.7em" }} ></FaChevronDown>
                </div>
            </div>
        </>
    )
}

export default Table