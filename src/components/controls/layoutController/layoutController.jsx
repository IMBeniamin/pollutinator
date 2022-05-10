import React, {useState} from 'react';
import './layoutController.css';
import StaticController from "../staticController/staticController";
import DynamicController from "../dynamicLayoutController/DynamicController";

const [isExpandCompress, setIsExpandCompress] = useState(true)
const [isVisibleCard, setIsVisibleCard] = useState(false)
const [isVisibleBottom, setIsVisibleBottom] = useState(false)

const delHoverControllers = (isVisibleBottom) => {
    if (isVisibleBottom === false) {
        //TODO When the bottom layer is invisible, Controllers are shown
    }
}
const setVisibilityAllPanels = () => {
    setIsExpandCompress(!isExpandCompress)
    setIsVisibleCard(!isVisibleCard)
    setIsVisibleBottom(!isVisibleBottom)
}
const changeExpandCompressDynamic = (isVisibleCard, isVisibleBottom) => {
    if (isVisibleCard === true && isVisibleBottom === true) setIsExpandCompress(false)
    else if (isVisibleCard === false && isVisibleBottom === false) setIsExpandCompress(true)
}
const changeVisibilityCard = () => {
    setIsVisibleCard(!isVisibleCard)
}
const changeVisibilityBottom = () => {
    setIsVisibleBottom(!isVisibleBottom)
}
const changeVisibilityDynamic = (isVisibleCard, isVisibleBottom) => {

    let dynamicHide = (isVisibleCard === true && isVisibleBottom === false) || (isVisibleCard === false && isVisibleBottom === true)
    const dynamicController = document.getElementById("dynamicController")
    dynamicHide ? dynamicController.classList.add("collapse") : dynamicController.classList.remove("collapse")

}
const showAll = () => {
    const divs = document.getElementsByClassName('reactive');
    for (let a of divs) {
        a.classList.remove("collapse");
    }
    setIsVisibleCard(true)
    setIsVisibleBottom(true)
};

const layoutController = (props) => {
    return (
        <div className="layoutController">
            <StaticController
                componentID='info-card'
                type="arrows-left-right"
                callback={changeVisibilityCard}
            />
            <div id="dynamicController">
                {
                    isExpandCompress ?
                        <DynamicController componentLinked="reactive"
                                           type="expand"
                                           visibleCard={isVisibleCard}
                                           visibleBottom={isVisibleBottom}
                                           setVisibilityAll={setVisibilityAllPanels}
                                           changeExpandCompress={changeExpandCompressDynamic}
                                           changeVisibility={changeVisibilityDynamic}
                                           delHover={delHoverControllers}
                        />
                        :
                        <DynamicController componentLinked="reactive"
                                           type="compress"
                                           visibleCard={isVisibleCard}
                                           visibleBottom={isVisibleBottom}
                                           setVisibilityAll={setVisibilityAllPanels}
                                           changeExpandCompress={changeExpandCompressDynamic}
                                           changeVisibility={changeVisibilityDynamic}
                                           delHover={delHoverControllers}
                        />
                }
            </div>
            <StaticController
                componentLinked="bottom-card"
                type="arrows-up-down"
                callback={changeVisibilityBottom}
            />
        </div>
    )
}

export default layoutController;