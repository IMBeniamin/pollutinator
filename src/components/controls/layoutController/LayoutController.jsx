import React from 'react';
import './LayoutController.css';
import StaticController from "../staticController/StaticController";

/**
 * Layout containing InfoCard, bottom charts and toggle controllers
 * @param infoCardLayout (contain the collapse css class)
 * @param bottomCardLayout (contain the collapse css class)
 * @param setInfoCardLayout
 * @param setBottomCardLayout
 * @param setInfoCardHeightController (setter for the force-full-height css class)
 * @returns {JSX.Element}
 */
const LayoutController = ({
                              infoCardLayout,
                              bottomCardLayout,
                              setInfoCardLayout,
                              setBottomCardLayout,
                              setInfoCardHeightController
                          }) => {
    return (
        <div className={"layout-controls " + (bottomCardLayout ? "shown-layout-controls" : null)}>
            <StaticController
                type="arrows-left-right"
                toggleLayout={() => setInfoCardLayout(!infoCardLayout ? 'collapse' : null)}
            />
            {infoCardLayout === bottomCardLayout ?
                <StaticController
                    type={infoCardLayout ? "fa-expand" : "fa-compress"} // infoCardLayout is equal to bottomCardLayout
                    toggleLayout={() => {
                        const opposite = !infoCardLayout ? 'collapse' : null;
                        setInfoCardLayout(opposite);
                        setBottomCardLayout(opposite);
                    }}
                /> : null}
            <StaticController
                type="arrows-up-down"
                toggleLayout={() => {
                    setBottomCardLayout(!bottomCardLayout ? 'collapse' : null)
                    !bottomCardLayout ? setInfoCardHeightController('force-full-height') : setInfoCardHeightController('');
                }}
            />
        </div>
    )
}

export default LayoutController;