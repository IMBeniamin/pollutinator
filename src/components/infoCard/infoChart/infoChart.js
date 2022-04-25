import React from "react";
import {PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, YAxis, XAxis} from "recharts"
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import "./infoChart.css"

const InfoChart = (props) => {

    let data = props.dataState
    let CO2 = [{
        "name": props.textBar,
        "value": props.dataBar
    }]
    return(
        <div className={"graph-container"}>
            <ResponsiveContainer
                // minHeight={155}
                // minWidth={155}
                minHeight={5}
                width="100%"
                height="100%"
            >
                <PieChart>
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={data}
                        // cx={0}
                        // cy={0}
                        innerRadius="40%"
                        outerRadius="85%"
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
                {/*<span>{CO2[0].name} {CO2[0].value}</span>*/}
                {/*<BarChart*/}
                {/*    data={CO2}*/}
                {/*    layout="vertical"*/}
                {/*    width={100}*/}
                {/*    height={100}*/}
                {/*>*/}
                {/*    <Bar barSize={10} width={100} height={100} data={CO2} dataKey="value" fill="#009688" isAnimationActive={true}/>*/}
                {/*</BarChart>*/}
                <ResponsiveContainer minHeight={5} width="100%" height="100%">
                    <BarChart data={CO2} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" hide reversed type="category" />
                        <Bar barSize={5} dataKey="value" fill="#ff6f31" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}


export default InfoChart