import React from "react";
import "./layoutController.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const LayoutController = (props) => {
    const {componentID, type, callback} = props
    console.log("fontawesome type is: ", type)
    const showOrHide = () => {
        const component = document.getElementById(componentID)
        component.classList.toggle("collapse")
    }
    return <FontAwesomeIcon
        className="layoutControllers"
        icon={`{type}`}
        onClick={() => {
            callback(); showOrHide();
        }}
    />
}

export default LayoutController