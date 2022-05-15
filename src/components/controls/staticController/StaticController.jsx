import React from "react";
import "./StaticController.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

/**
 * Controller used to handle the appearance and the disappearance of InfoCard and bottom charts.
 * @param type (the icon you want to show)
 * @param toggleLayout
 * @param callback
 * @returns {JSX.Element}
 */
const StaticController = ({type, toggleLayout, callback}) => {
    return (
        <FontAwesomeIcon
            className="layoutControllers"
            icon={["fa", type]} // correct way to assign icons
            onClick={() => {
                toggleLayout();
                if (callback !== undefined) callback()
            }}
        />
    )
}

export default StaticController