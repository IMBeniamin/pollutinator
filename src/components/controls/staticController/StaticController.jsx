import React from "react";
import "./StaticController.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const StaticController = ({componentId, type, callback}) => {
    const showOrHide = () => {
        const component = document.getElementById(componentId)
        component.classList.toggle("collapse")
    }
    return (
        <FontAwesomeIcon
            className="layoutControllers"
            icon={["fa", type]} // correct way to assign icons
            onClick={() => {
                showOrHide();
                if (callback !== undefined) callback()
            }}
        />
    )
}

export default StaticController