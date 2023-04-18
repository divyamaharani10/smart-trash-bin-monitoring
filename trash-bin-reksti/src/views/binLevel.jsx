import React, { useState } from "react";
import binIcon from "../assets/binempty.png";
// import { Badge } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./binLevel.css";
// import db from "./firebase"
// import "firebase/database"
// import "./firebase"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";


const BinLevel = () => {

    const navigate = useNavigate()
    // Untuk button pengangakatan sampah
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    
    // Untuk button kunci tempat sampah
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    return (
        <div>
            <title>test</title>
            <div className="bin-level"> 
                <div className="flex-container-row-header">
                    <ArrowBackIosIcon onClick={() => navigate('/map')}/>
                    <h1>Level Sampah</h1>
                </div>
                <div className="flex-container-column">
                    <img src={binIcon} style={{ height: 280, width: 220 }} alt="bin logo"/>
                    <h1><span class="badge rounded-pill  bg-empty" data-tor="bg(rgba(0,55,210,.8))">Kosong</span></h1>
                </div>
                <div className="flex-container-column-description">
                    <div className="flex-container-row">
                        <b>Lokasi</b>
                        <text>GCA 2 Cimbuleuit</text>
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
                    <button-konfirmasi onClick={handleShow1}>Konfirmasi Pengangkatan Sampah</button-konfirmasi>
                        <Modal show={show1} onHide={handleClose1}>
                            <Modal.Header closeButton>
                            <Modal.Title>Konfirmasi Pengangkatan Sampah</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Apakah Anda yakin untuk melakukan pengangkatan sampah?</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose1}>
                                Batalkan
                            </Button>
                            <Button variant="primary" onClick={handleClose1}>
                                Konfirmasi
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    <button-kunci onClick={handleShow2}>Kunci Tempat Sampah</button-kunci>
                        <Modal show={show2} onHide={handleClose2}>
                            <Modal.Header closeButton>
                            <Modal.Title>Konfirmasi Penguncian Tempat Sampah</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Apakah Anda yakin untuk melakukan penguncian tempat sampah?</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose2}>
                                Batalkan
                            </Button>
                            <Button variant="primary" onClick={handleClose2}>
                                Konfirmasi
                            </Button>
                            </Modal.Footer>
                        </Modal>
                </div>
                
            </div>
        </div>
    );
}
export default BinLevel