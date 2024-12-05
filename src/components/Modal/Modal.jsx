"use client";
import { useContext } from "react";
import { SiteContext } from "@/context/SiteContext";
import Modal from "react-modal";
import "./Modal.css";


const ModalR = ({ children }) => {
    const { isModalOpen, closeModal } = useContext(SiteContext);


    return (
        <Modal
            isOpen={isModalOpen}
            overlayClassName={"backdrop"}
            className={"modalContent"}
            closeTimeoutMS={700}
            onRequestClose={closeModal}
            ariaHideApp={false}
        >
            {children}
        </Modal>
    );
};


export default ModalR;