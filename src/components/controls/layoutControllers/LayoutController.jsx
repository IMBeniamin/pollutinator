import React from "react";
import "./layoutController.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsLeftRight, faArrowsUpDown} from '@fortawesome/free-solid-svg-icons'

const LayoutController = (props) => {

    const showOrHide = () => {
        const component = document.getElementById(props.componentLinked)
        component.classList.toggle("collapse")
    }

    const controlTypes = {
        "arrowsLeftRight": <FontAwesomeIcon onClick={() => {props.visibilityCard(); showOrHide();}} className="layoutControllers" icon={faArrowsLeftRight}/>,
        "arrowsUpDown": <FontAwesomeIcon onClick={ () => {props.visibilityBottom(); showOrHide();}} className="layoutControllers" icon={faArrowsUpDown}/>,
    }

    return controlTypes[props.type]

}

export default LayoutController