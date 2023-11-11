import { Modal } from "react-bootstrap";
import { ArticuloInsumo } from "../../types/ArticuloInsumo";
import { ModalType } from "../../types/ModalType";

type ArticuloInsumoModalProps = {
    show:boolean;
    onHide:()=>void;
    title:string;
    modalType:ModalType;
    art:ArticuloInsumo
}

const ArticuloInsumoModal = ({show,onHide,title,modalType,art}:ArticuloInsumoModalProps) => {
  return (
    <>
        {modalType === ModalType.DELETE} (
            <>Por el momento lo dejamos vacio</>
        ) : (
            <>
                <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">

                </Modal>
            </>
        )

    </>
  )
}

export default ArticuloInsumoModal