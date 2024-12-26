import PropTypes from "prop-types";
import {IoClose} from "react-icons/io5";
import {useTranslation} from "react-i18next";

const Modal = ({ isOpen, onClose, children,title,className }) => {
    const {t} = useTranslation()
    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 bg-gray-900  bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 ${className ? className : "lg:w-1/3 md:w-8/12 sm:w-7/12 w-11/12"}`}
                onClick={(e) => e.stopPropagation()} // منع إغلاق عند النقر داخل المودال
            >
                <div className="flex justify-between items-center mb-4 border-b-2 dark:border-gray-700 pb-3">
                    <h2 className="dark:text-gray-200 text-base">{t(title)}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 "
                    >
                        <IoClose size={18} />
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};
Modal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node,
    title: PropTypes.string,
    className: PropTypes.string,
}
export default Modal;
