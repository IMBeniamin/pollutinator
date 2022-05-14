import React, {useEffect, useState} from 'react'
import {Typography} from "@mui/material";
import "./InfoBottom.css"

const InfoBottom = ({data, image, label}) => {

    const labelInfo = label.split(',')
    let {info, info_capita} = data[0]

    const measure = labelInfo[0] === 'Energy' ? 'Kw/h' : 'Mt'

    const [genericData, setGenericData] = useState(undefined)
    const [genericDataCapita, setGenericDataCapita] = useState(undefined)
    const [linkImage, setLinkImage] = useState(undefined)

    const handleDataChange = () => {

        info = info ? `${info} ${measure}` : 'No data'
        info_capita = info_capita ? `${info_capita} ${measure}` : 'No data'

        setGenericData(info)
        setGenericDataCapita(info_capita)
        setLinkImage(image)
    }

    useEffect(() => {
        handleDataChange()
    }, [info, info_capita])

    return (
        <div className="container-info-bottom">
            {linkImage}
            <div className="visual-data">
                <Typography className='data-item'>
                    <span className='data-text'>{labelInfo[0]} : {genericData}</span>
                </Typography>
                <Typography className='data-item'>
                    <span className='data-text'>{labelInfo[1]} : {genericDataCapita}</span>
                </Typography>
            </div>
        </div>
    )
}

export default InfoBottom

