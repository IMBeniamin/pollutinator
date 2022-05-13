import React, {useEffect, useState} from 'react';
import './LayoutController.css';
import StaticController from "../staticController/StaticController";
import DynamicController from "../dynamicLayoutController/DynamicController";



const LayoutController = ({layout, setLayout}) => {
    const editLayout = (id, newState) => {
        const newLayout = layout;
        newLayout[id] = newState;
        setLayout(newLayout);
    }
    const toggleLayout = (id) => {
        const newLayout = layout;
        newLayout[id] = layout[id] === "collapse" ? "" : "collapse";
        setLayout(newLayout);
        console.log("adding class to id: ", id, " new layout is : ", newLayout)
    }
    return (
        <div className="layoutController">
            <StaticController
                refID="info-card"
                type="arrows-left-right"
                toggleLayout={toggleLayout}
            />
            {/*<div id="dynamicController">*/}
            {/*    {*/}
            {/*        isExpandCompress ?*/}
            {/*            <DynamicController componentLinked="reactive"*/}
            {/*                               type="expand"*/}
            {/*                               visibleCard={isVisibleCard}*/}
            {/*                               visibleBottom={isVisibleBottom}*/}
            {/*                               setVisibilityAll={setVisibilityAllPanels}*/}
            {/*                               changeExpandCompress={changeExpandCompressDynamic}*/}
            {/*                               changeVisibility={changeVisibilityDynamic}*/}
            {/*                               delHover={delHoverControllers}*/}
            {/*            />*/}
            {/*            :*/}
            {/*            <DynamicController componentLinked="reactive"*/}
            {/*                               type="compress"*/}
            {/*                               visibleCard={isVisibleCard}*/}
            {/*                               visibleBottom={isVisibleBottom}*/}
            {/*                               setVisibilityAll={setVisibilityAllPanels}*/}
            {/*                               changeExpandCompress={changeExpandCompressDynamic}*/}
            {/*                               changeVisibility={changeVisibilityDynamic}*/}
            {/*                               delHover={delHoverControllers}*/}
            {/*            />*/}
            {/*    }*/}
            {/*</div>*/}
            <StaticController
                refID="bottom-card"
                type="arrows-up-down"
                toggleLayout={toggleLayout}
            />
        </div>
    )
}

export default LayoutController;