import React from "react"
import {NumberFormat} from "../layout/NumberFormat"

const StockInfo = (props) => {
    const {stocks, projects, profile} = props;
    const identifyRole = profile.shopName;
    const roleProjects = identifyRole === "root" ? projects : projects && projects.filter(project => {
        return project.shopName === identifyRole
    })
    const saledProduct = {};
    let saledBall = 0;
    let saledDoll = 0;
    let saledYoyo = 0;
    let saledLego = 0;
    let totalProfit = 0;
    roleProjects && roleProjects.map(item => {
        saledBall += Number(item.ball);
        saledDoll += Number(item.doll);
        saledYoyo += Number(item.yoyo);
        saledLego += Number(item.lego);
        return(
            saledBall,
            saledDoll,
            saledYoyo,
            saledLego
        )
    })
    totalProfit = saledBall * 5 + saledDoll * 7 + saledLego * 20 + saledYoyo * 15;
    saledProduct.saledBall = saledBall;
    saledProduct.saledDoll = saledDoll;
    saledProduct.saledYoyo = saledYoyo;
    saledProduct.saledLego = saledLego;
    saledProduct.totalProfit = totalProfit;
    if(identifyRole === "root"){
        return (
            <div className="section">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">Stock infomation</span>
                        <ul>
                            {stocks && stocks.map(item => {
                                return(
                                    <li key={item.id}>
                                        <p>Balls: {item.ball}</p>
                                        <p>Dolls: {item.doll}</p>
                                        <p>Yoyos: {item.yoyo}</p>
                                        <p>Legos: {item.lego}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="card-content">
                        <span className="card-title">Saled product</span>
                        <ul>
                            <p>Saled balls: {saledProduct.saledBall}</p>
                            <p>Saled dolls: {saledProduct.saledDoll}</p>
                            <p>Saled yoyos: {saledProduct.saledYoyo}</p>
                            <p>Saled legos: {saledProduct.saledLego}</p>
                            <hr/>
                            <p>Total profit: {NumberFormat(saledProduct.totalProfit)}</p>
                        </ul>
                    </div>
                </div>
            </div>
        )
    } else {

        return (
            <div className="section">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">Saled product</span>
                        <ul>
                            <p>Saled balls: {saledProduct.saledBall}</p>
                            <p>Saled dolls: {saledProduct.saledDoll}</p>
                            <p>Saled yoyos: {saledProduct.saledYoyo}</p>
                            <p>Saled legos: {saledProduct.saledLego}</p>
                            <hr/>
                            <p>Total profit: {NumberFormat(saledProduct.totalProfit)}</p>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default StockInfo;