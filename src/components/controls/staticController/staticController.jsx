import React from "react";
import "./staticController.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const StaticController = ({componentID, type, callback}) => {
    console.log("fontawesome type is: ", type)
    const showOrHide = () => {
        const component = document.getElementById(componentID)
        component.classList.toggle("collapse")
    }
    return (
        <FontAwesomeIcon
            className="layoutControllers"
            icon={["fa", type]} // correct way to assign icons
            onClick={() => {
                callback(); showOrHide();
            }}
        />
    )
}

export default StaticController