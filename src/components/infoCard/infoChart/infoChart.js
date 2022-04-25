import React, {useEffect, useState} from "react";
import {PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Legend,Tooltip} from "recharts"
import "./infoChart.css"

const InfoChart = (props) => {
    let data = props.dataState
    let CO2 = [{"name": props.textBar, "value": props.dataBar}]

    console.log(CO2[0].value)

    // const RADIAN = Math.PI / 180;
    // const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    //     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    //     const x = cx + radius * Math.cos(-midAngle * RADIAN);
    //     const y = cy + radius * Math.sin(-midAngle * RADIAN);
    //
    //     return (
    //         <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
    //             {`${(percent * 100).toFixed(0)}%`}
    //         </text>
    //     );
    // };


    return(
        <div className={"graph-container"}>
            <ResponsiveContainer
                // minHeight={155}
                // minWidth={155}
                // minHeight={15}
                // width="100%"
                // height="100%"
                aspect={1}
            >
                <PieChart>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={data}
                        // cx={0}
                        // cy={0}
                        innerRadius="40%"
                        outerRadius="85%"
                        fill="#82ca9d"
                    >
                        <Legend height={40}/>
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={props.colors[index % props.colors.length]}/>
                            ))
                        }
                    </Pie>
                    {/*<Legend layout={"horizontal"}/>*/}
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
                <span>{CO2[0].name} {CO2[0].value}</span>
                {/*<BarChart*/}
                {/*    data={CO2}*/}
                {/*    layout="vertical"*/}
                {/*    width={100}*/}
                {/*    height={100}*/}
                {/*>*/}
                {/*    <Bar barSize={10} width={100} height={100} data={CO2} dataKey="value" fill="#009688" isAnimationActive={true}/>*/}
                {/*</BarChart>*/}
                <ResponsiveContainer minHeight={5} width="100%" height="25%">
                    <BarChart data={CO2} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" hide reversed type="category" />
                        <Bar barSize={10} dataKey="value" fill="#009688"/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}


export default InfoChart