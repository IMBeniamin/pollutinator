import React from "react";
import {PieChart, Pie, Cell, ResponsiveContainer, Tooltip} from "recharts"
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import "./infoChart.css"

const InfoChart = (props) => {

    let data = props.dataState
    return(
        <div className={"graph-container"}>
            <ResponsiveContainer minHeight={155} minWidth={155}>
                <PieChart width="50%" height={"50%"}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={data}
                        cx={70}
                        cy={70}
                        innerRadius={40}
                        outerRadius={75}
                        fill="#82ca9d"
                    >
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={props.colors[index % props.colors.length]}/>
                            ))
                        }
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "rgba(5, 5, 5, 0.6)",
                            blur: "15px",
                            borderRadius: "2.5em",
                            backdropFilter: "blur(5px)",
                            border: "1px solid #000",
                        }}
                        itemStyle={{color: "#ECF0F1"}}
                    />
                </PieChart>
            </ResponsiveContainer>
            <div className={"bar-container"}>
                <span>{props.textBar} {props.dataBar}</span>
                <Box sx={{width: "100%"}}>
                    <LinearProgress variant="determinate" value={props.dataBar}/>
                </Box>
            </div>
        </div>
    )
}


export default InfoChart