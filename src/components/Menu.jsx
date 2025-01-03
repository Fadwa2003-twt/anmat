import {MdManageAccounts, MdOutlineArrowBackIosNew, MdWindow} from "react-icons/md";
import {AiOutlineMessage, AiOutlineProject} from "react-icons/ai";
import {GrTask} from "react-icons/gr";
import {TbBrandGoogleAnalytics} from "react-icons/tb";
import {IoSettingsOutline, IoShareSocial} from "react-icons/io5";;
import PropTypes from 'prop-types';
import SearchInput from "./Form/SearchInput.jsx";
import MenuItem from "./Menu/MenuItem.jsx";
import {useTranslation} from "react-i18next";
import BriefTimeLine from "./TimeLine/BriefTimeLine.jsx";

function Menu({isSlidebarOpen,taggleSlidebarOpen}) {
    const {t,i18n} = useTranslation()
    return (
        <div
            className={`md:relative md:translate-x-0 bg-white dark:bg-gray-800 w-[272px] max-w-[272px] 
        h-screen fixed flex flex-col gap-5 top-0 z-40 transition-transform 
        ${i18n.language === "ar" ? "right-0" : "left-0"} 
        ${isSlidebarOpen ? "translate-x-0" : (i18n.language === "ar" ? "translate-x-full" : "-translate-x-full")}`}
        >
            <div className={" h-32 flex p-5 gap-2 border-b-2 dark:border-gray-600 items-center"}>
                <div className={"profile-image"}>
                    <img src={"https://placehold.co/600x600/F3B653/FFFFFF/png"} alt={"img"}
                         className={" w-10 h-10 rounded-full m-0 p-0"}/>
                </div>
                <div className={"flex flex-col  gap-2 justify-center  "}>
                    <p className={"text-sm dark:text-white text-start truncate w-28 md:w-full"}>{t("Employees Management")}</p>
                    <p className={"text-xs dark:text-white text-gray-500 truncate w-28 md:w-full"}>{t("Employees & HR Management")}</p>
                </div>
                {
                    isSlidebarOpen && (
                        <button className="inline-flex h-8 w-8 items-center p-2 text-sm text-gray-500
                rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                onClick={taggleSlidebarOpen}>
                            <MdOutlineArrowBackIosNew/>
                        </button>
                    )
                }

            </div>
            <div className={"overflow-y-auto flex flex-col  tab-content justify-between"}>
                <div className="md:hidden px-5 pt-5">
                    <SearchInput/>
                </div>
                <div className={"flex  flex-col gap-2"}>
                    <div className={"py-5 menu-list sm:py-0 flex flex-col gap-2 text-gray-500"}>
                        <MenuItem path={"/"} icon={<MdWindow/>} title={"Dashboard"}/>
                        <MenuItem path={"/projects"} icon={<AiOutlineProject/>} title={"Projects"}/>
                        <MenuItem path={"/tasks"} icon={<GrTask/>} title={"Tasks"}/>
                        <MenuItem path={"/analytics"} icon={<TbBrandGoogleAnalytics/>} title={"Analytics"}/>
                        <MenuItem path={"/hr-management"} icon={<MdManageAccounts/>} title={"HR Management"}/>
                        <MenuItem path={"/conversations"} icon={<AiOutlineMessage/>} title={"Conversations"}/>
                        <MenuItem path={"/social-media"} icon={<IoShareSocial/>} title={"Social Media"}/>
                        <MenuItem path={"/settings"} icon={<IoSettingsOutline/>} title={"Settings"}/>
                    </div>
                </div>
                <BriefTimeLine/>
            </div>
        </div>
    );
}

Menu.propTypes = {
    isSlidebarOpen: PropTypes.bool,
    taggleSlidebarOpen: PropTypes.func,
};

export default Menu;