import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import ActionsBtns from "../ActionsBtns.jsx";

function Table({ className, headers, rows, isActions, handelEdit, handelDelete }) {
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [selectedRows, setSelectedRows] = useState(rows.map(() => false));
    const [currentPage, setCurrentPage] = useState(1); // الصفحة الحالية
    const [rowsPerPage, setRowsPerPage] = useState(5); // عدد الصفوف لكل صفحة
    const [dropdownOpen, setDropdownOpen] = useState(null);

    const totalPages = Math.ceil(rows.length / rowsPerPage); // إجمالي عدد الصفحات

    const handleHeaderCheckboxChange = () => {
        setIsAllSelected((prev) => !prev);
        setSelectedRows((prev) =>
            prev.map((_, index) =>
                index >= (currentPage - 1) * rowsPerPage &&
                index < currentPage * rowsPerPage
                    ? !isAllSelected
                    : prev[index]
            )
        );
    };

    const handleDropdownToggle = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };

    const handleRowCheckboxChange = (rowIndex) => {
        const newSelectedRows = [...selectedRows];
        newSelectedRows[rowIndex] = !newSelectedRows[rowIndex];
        setSelectedRows(newSelectedRows);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1); // إعادة الصفحة الحالية إلى الأولى عند تغيير عدد الصفوف
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest(".dropdown-container")) {
            setDropdownOpen(null);
        }
    };

    useEffect(() => {
        if (dropdownOpen !== null) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        // تنظيف المستمع عند إزالة المكون
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [dropdownOpen]);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentRows = rows.slice(startIndex, startIndex + rowsPerPage); // صفوف الصفحة الحالية

    return (
        <div className={"flex flex-col gap-5 justify-center dark:bg-gray-800 w-full dark:text-gray-400"}>
            <table
                className={"table-auto w-full" + className}
                style={{ borderSpacing: "0 1px" }}
            >
                <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="px-1 pt-1 w-5 rounded-tl-lg rounded-bl-lg dark:bg-gray-900">
                        <input
                            className={"checkbox-custom"}
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={handleHeaderCheckboxChange}
                        />
                    </th>
                    {headers.map((header, index) => (
                        <th
                            key={index}
                            className="p-2 font-normal text-left dark:bg-gray-900"
                            style={{
                                width: header.width || "auto",
                                borderTopRightRadius: index === headers.length - 1 ? "8px" : "0px",
                                borderBottomRightRadius: index === headers.length - 1 ? "8px" : "0px",
                            }}
                        >
                            {header.label}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {currentRows.map((row, rowIndex) => (
                    <tr
                        key={rowIndex + startIndex}
                        className="hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
                    >
                        <td className="px-1 py-6 w-2" style={{ borderBottomLeftRadius: "8px" }}>
                            <input
                                className={"checkbox-custom"}
                                type="checkbox"
                                checked={selectedRows[rowIndex + startIndex]}
                                onChange={() => handleRowCheckboxChange(rowIndex + startIndex)}
                            />
                        </td>
                        {row.map((cell, cellIndex) => (
                            <td
                                key={cellIndex}
                                className="px-2 py-6 text-start max-w-10 sm:max-w-24 text-nowrap truncate overflow-hidden"
                                style={{
                                    borderBottomRightRadius: cellIndex === row.length - 1 ? "8px" : "",
                                }}
                            >
                                {cell}
                            </td>
                        ))}
                        {isActions && (
                            <td className={"relative dropdown-container"}>
                                <PiDotsThreeVerticalBold
                                    className="cursor-pointer"
                                    onClick={() => handleDropdownToggle(rowIndex)}
                                />
                                {dropdownOpen === rowIndex && (
                                    <ActionsBtns handleEdit={handelEdit} handleDelete={handelDelete} />
                                )}
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
            <div className={"pagination flex items-center justify-between"}>
                <p className={"dark:text-gray-400"}>Page {currentPage} of {totalPages}</p>
                <div className={"flex gap-5 items-center"}>
                    <MdOutlineKeyboardDoubleArrowLeft
                        onClick={() => handlePageChange(1)}
                        className="cursor-pointer dark:text-gray-400"
                    />
                    <MdOutlineKeyboardArrowLeft
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="cursor-pointer dark:text-gray-400"
                    />
                    <div className={"flex pages-numbers gap-1"}>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-3 py-1 border rounded-lg dark:border-gray-700 dark:text-gray-400 ${
                                    currentPage === index + 1 ? "bg-primary-100 dark:text-gray-800" : ""
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <MdOutlineKeyboardArrowRight
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="cursor-pointer dark:text-gray-400"
                    />
                    <MdOutlineKeyboardDoubleArrowRight
                        onClick={() => handlePageChange(totalPages)}
                        className="cursor-pointer dark:text-gray-400"
                    />
                </div>
                <div className={"flex rounded-lg border border-gray-300 dark:border-gray-700 dark:text-gray-400 px-2 py-1 items-center"}>
                    <select
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        className="bg-transparent outline-none cursor-pointer"
                    >
                        {[5, 10, 15, 20].map((value) => (
                            <option className={"dark:bg-gray-800 dark:text-gray-400"} key={value} value={value}>
                                {value}/page
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

Table.propTypes = {
    className: PropTypes.string,
    isActions: PropTypes.bool,
    handelEdit: PropTypes.func,
    handelDelete: PropTypes.func,
    headers: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.node.isRequired,
            width: PropTypes.string,
        })
    ).isRequired,
    rows: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Table;
