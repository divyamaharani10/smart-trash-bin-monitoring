import { useState } from "react";
import binIcon from "../assets/binempty.png"
import { Badge } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./binLevel.css";

const BinLevel = () => {

  return (
    <div>
        <title>test</title>
        <div className="bin-level"> 
            <h1>Level Sampah</h1>
            <div className="flex-container-column">
                <img src={binIcon} style={{ height: 280, width: 220 }} alt="bin logo"/>
                <h1><span class="badge rounded-pill  bg-success">Kosong</span></h1>
            </div>
            <div className="flex-container-column-description">
                <div className="flex-container-row">
                    <b>Lokasi</b>
                    <text>Jl. Ganesa No. 10</text>
                </div>
                <div className="flex-container-row">
                    <b>Terakhir Diangkat</b>
                    <text>06:30:00</text>
                </div>
                <div className="flex-container-row">
                    <b>Tingkat Kepenuhan</b>
                    <text>0%</text>
                </div>
            </div>
            <div className="flex-container-column-button">
                <button-konfirmasi>Konfirmasi Pengangkatan Sampah</button-konfirmasi>
                <button-kunci>Kunci Tempat Sampah</button-kunci>
            </div>
        </div>
    </div>
  );
};
export default BinLevel;