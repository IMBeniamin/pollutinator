import React from "react";
import "./StaticController.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const StaticController = (props) => {
    const showOrHide = () => {
        console.log("printing component id: ", props.refID)
        props.toggleLayout(props.refID)
    }
    return (
        <FontAwesomeIcon
            className="layoutControllers"
            icon={["fa", props.type]} // correct way to assign icons
            onClick={() => {
                showOrHide();
                if (props.callback !== undefined) props.callback()
            }}
        />
    )
}

export default StaticController