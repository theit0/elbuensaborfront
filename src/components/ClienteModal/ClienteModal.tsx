import React, { useState } from 'react'
import { Cliente } from '../../types/Cliente';
import { ModalType } from '../../types/ModalType';
import { Button, Modal } from 'react-bootstrap';
import * as Yup from "yup";
import {useFormik} from "formik";
import { Form } from 'react-bootstrap';
import { Bucket } from 'react-bootstrap-icons';
import { ClienteService } from '../../services/ClienteService';
import { toast } from 'react-toastify';



type ClienteModalProps = {
    show : boolean;
    onHide: () => void;
    title : string;
    modalType : ModalType;
    cliente : Cliente;
    refreshData : React.Dispatch<React.SetStateAction<boolean>>;

}





const ClienteModal = ({show,onHide,title,modalType,cliente,refreshData} : ClienteModalProps) => {

  // create - update
const handleSaveUpdate = async (cliente:Cliente) => {
    try{
        const isNew = cliente.id == 0;
        if(isNew){
            await ClienteService.createCliente(cliente);
        }else{
            await ClienteService.updateCliente(cliente.id,cliente);
        }
        toast.success(isNew ? "Cliente creado" : "Cliente actualizado", {
            position : "top-center",
        });
        onHide();
        refreshData((prevState) => !prevState);
    }catch (error){
        console.error(error);
        toast.error('Ha ocurrido un error');
    }
};

const handleDelete = async () => {
    try{
        await ClienteService.deleteCliente(cliente.id,cliente);
        toast.success("Cliente eliminado con éxito",{
            position : "top-center",
        });
        onHide();
        refreshData((prevState) => !prevState);
    }
    catch(error){
        console.error(error);
        toast.error("Ha ocurrido un error");
    }
}
 

//yup
const validationSchema = () => {
    return Yup.object().shape({
        id : Yup.number().integer().min(0),
        nombre : Yup.string().required('El nombre es requerido'),
        apellido  : Yup.string().required('El apellido es requerido'),
        telefono : Yup.string().required('El telefono es requerido'),
        email : Yup.string().required('El e-mail es requerido'),
    })
};

const formik = useFormik({
    initialValues : cliente,
    validationSchema : validationSchema(),
    validationOnChange : true,
    validationOnBlur : true,
    onSubmit : (obj :Cliente) => handleSaveUpdate(obj),

});

{/*Lo hice por que sino no podia pasarle CLIENTE al handleDelete como argumento
const formik2 = useFormik({
    initialValues : cliente,
    validationOnChange : true,
    validationOnBlur : true,
    onSubmit : (obj :Cliente) => handleDelete(obj),

});

*/}
    return (
    <> 
        {modalType == ModalType.DELETE ? (
        <>
        <Modal show = {show} onHide = {onHide} centered backdrop = "static">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>¿Esta seguro que desea eliminar el cliente?</p>
                <strong>{cliente.nombre}  {cliente.apellido}</strong>
            </Modal.Body> 

            <Modal.Footer>
                <Button variant = "secondary" onClick = {onHide}> Cancelar</Button>
                {/* <Button variant = "danger" onClick = {handleDelete(cliente)}>Eliminar</Button> */}  
                <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
            </Modal.Footer>

        </Modal>
        </>
        ) : (
        <>
        <Modal show = {show} onHide = {onHide} centered backdrop = "static" className ="modal-xl" >
           
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>     
           <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId = "formNombre">
                    <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            name = "nombre"
                            type = "text"
                            value = {formik.values.nombre || ''}
                            onChange = {formik.handleChange}
                            onBlur = {formik.handleBlur}
                            isValid = {Boolean(formik.errors.nombre && formik.touched.nombre)}
                            />

                            <Form.Control.Feedback type = "invalid">
                                {formik.errors.nombre}
                            </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId = "formApellido">
                    <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            name = "apellido"
                            type = "text"
                            value = {formik.values.apellido || ''}
                            onChange = {formik.handleChange}
                            onBlur = {formik.handleBlur}
                            isValid = {Boolean(formik.errors.apellido && formik.touched.apellido)}
                            />

                            <Form.Control.Feedback type = "invalid">
                                {formik.errors.apellido}
                            </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId = "formEmail">
                    <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            name = "email"
                            type = "text"
                            value = {formik.values.email || ''}
                            onChange = {formik.handleChange}
                            onBlur = {formik.handleBlur}
                            isValid = {Boolean(formik.errors.email && formik.touched.email)}
                            />

                            <Form.Control.Feedback type = "invalid">
                                {formik.errors.email}
                            </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId = "formTelefono">
                    <Form.Label>Telefono</Form.Label>
                        <Form.Control
                            name = "telefono"
                            type = "text"
                            value = {formik.values.telefono || ''}
                            onChange = {formik.handleChange}
                            onBlur = {formik.handleBlur}
                            isValid = {Boolean(formik.errors.telefono && formik.touched.telefono)}
                            />

                            <Form.Control.Feedback type = "invalid">
                                {formik.errors.telefono}
                            </Form.Control.Feedback>
                    </Form.Group>

                    <Modal.Footer className ="mt-4">
                        <Button variant ="secondary" onClick ={onHide}> Cancelar</Button>

                        <Button variant = "primary" type = "submit" disabled = {!formik.isValid}>Guardar</Button>

                    </Modal.Footer>

                </Form>
           </Modal.Body>
        </Modal> 
      
            </>
    )}
    </>
  )
} 
export default ClienteModal;


