import React, {useEffect} from "react";
import "./DynamicController.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCompress, faExpand} from '@fortawesome/free-solid-svg-icons'

const DynamicController = ({changeVisibility, changeExpandCompress, visibleCard, visibleBottom, componentLinked, type, setVisibilityAll, delHover}) => {

    useEffect(() => {
        changeVisibility(visibleCard,visibleBottom) //change visibility icon
        changeExpandCompress(visibleCard,visibleBottom) //change the icon if compressed or expand
        delHover(visibleBottom)
    },[visibleCard, visibleBottom])

    const showOrHide = () => {
        const component = document.getElementsByClassName(componentLinked)
        for (let element of component)
            element.classList.toggle("collapse")
    }

    const controlTypes = {
        "expand": <FontAwesomeIcon onClick={() => {setVisibilityAll(); showOrHide()}} className="dynamicController" icon={faExpand}/>,
        "compress": <FontAwesomeIcon onClick={() => {setVisibilityAll(); showOrHide()}} className="dynamicController" icon={faCompress} />,
    }

    return controlTypes[type]
}

export default DynamicController