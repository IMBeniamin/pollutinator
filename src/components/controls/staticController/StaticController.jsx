import React from "react";
import "./StaticController.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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