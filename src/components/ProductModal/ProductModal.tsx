import { Button, Dropdown, Form, Modal } from "react-bootstrap";
//Dependencias para validar los formularios


import { useFormik } from "formik";
import * as Yup from "yup";
//Notificaciones al usuario
import { toast } from 'react-toastify';
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";
import { ArticuloManufacturadoService } from "../../services/ArticuloManufacturadoService";
import { ModalType } from "../../types/ModalType";
import { RubroArticuloService } from "../../services/RubroArticulo";
import { useEffect, useState } from "react";
import { RubroArticulo } from "../../types/RubroArticulo";
import './ProductModal.css'




//Recibe parametros como props para que se renderice, su titulo y según qué operación queremos realizar.
type ProductModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    artl: ArticuloManufacturado;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
    
};





const ProductModal = ({show, onHide, title, artl, modalType, refreshData}:ProductModalProps) => {

    //CREATE-UPDATE función handleSaveUpdate 
    const handleSaveUpdate = async (art: ArticuloManufacturado) => {
    try {
        const isNew = art.id === 0;
        if (isNew) {
            await ArticuloManufacturadoService.createArticle(art);
        } else {
            await ArticuloManufacturadoService.updateArticle(art.id, art);
        }
        toast.success(isNew ? "Articulo Creado" : "Articulo Actualizado", {
            position: "top-center",
        });
        onHide();
        refreshData(prevState => !prevState);
    } catch (error) {
        console.error(error);
        toast.error('Ha ocurrido un error');
    }
    
};


//Función handleDelete (DELETE)
const handleDelete = async (art: ArticuloManufacturado) => {
    try {
        await ArticuloManufacturadoService.deleteArticle(art.id,art);
        toast.success("Articulo dado de baja", {
            position: "top-center",
        });
        onHide();
        refreshData(prevState => !prevState);
    } catch (error) {
        console.error(error);
        toast.error("Ha ocurrido un error");
        
    }
    
}
const [rubros, setRubros] = useState<RubroArticulo[]>([]);
useEffect(() => {
    const fetchRubros = async () => {
    try {
        const data = await RubroArticuloService.getRubros();
        setRubros(data);
    } catch (error) {
        console.error(error);
        // Manejo de error, muestra un mensaje al usuario, etc.
    }
    };
    fetchRubros();
}, []);
        //YUP - Esquema de validación
    const validationSchema = () => {
        return Yup.object().shape({
        id: Yup.number().integer().min(0),
        precioVenta: Yup.number().min(0).required('El precio es requerido'),
        denominacion: Yup.string().required('La descripcion es requerida'),
        urlImagen: Yup.string().required('La URL de la imagen es requerida'),
        });
    };
    

//Formik -  Utiliza el esquema de validación de YUP y obtiene un formulario dinámico que
// bloquea el formulario en caso de haber errores.
    const formik = useFormik({
        initialValues: artl,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: ArticuloManufacturado) => handleSaveUpdate(obj),
     });



        return(
            <>

            {modalType === ModalType.DELETE ? (
                

                <Modal show={show} onHide={onHide} centered backdrop="static">

                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p> ¿Está seguro que desea eliminar el articulo
                        <br /> <strong> {artl.denominacion} </strong> ?
                    </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancelar
                    </Button>

                    <Button variant="danger" onClick={()=>handleDelete(artl)}>
                        Borrar
                    </Button>
                </Modal.Footer>

                </Modal>
                
            ) : (

                <>
                <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                    
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                    {"Formulario"}
                    <Form onSubmit={formik.handleSubmit}>
                        
                    {"Denominacion"}
                        <Form.Group controlId="formDenomination">
                            {/*}<Form.Label>titulo</Form.Label>{*/}
                            <Form.Control
                                name="denominacion"
                                type="text"
                                value={formik.values.denominacion || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.denominacion &&
                                formik.touched.denominacion)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.denominacion}
                             </Form.Control.Feedback>
                        </Form.Group>


                    {"PrecioDeVenta"}                    
                        <Form.Group controlId="formPrice">
                           {/*} <Form.Label>Precio</Form.Label>{*/}
                            <Form.Control
                                name="precioVenta"
                                type="number"
                                value={formik.values.precioVenta || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.precioVenta &&
                                formik.touched.precioVenta)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.precioVenta}
                             </Form.Control.Feedback>
                        </Form.Group>

                        
                    {"Imagen"}                
                        <Form.Group controlId="formImage">
                          {/*}  <Form.Label>Imagen</Form.Label>{*/}
                            <Form.Control
                                name="urlImagen"
                                type="text"
                                value={formik.values.urlImagen || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.urlImagen &&
                                formik.touched.urlImagen)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.urlImagen}
                             </Form.Control.Feedback>
                        </Form.Group>
                        {"Rubro"}
                        <Form.Group controlId="formRubroArticulo">
                                    <Form.Label></Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" id="dropdown-rubro-articulo">
                                            {
                                                formik.values.rubroArticulo.denominacion || 'Rubro'
                                            }
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                        {rubros.map((rubro) => (
                                            <Dropdown.Item key={rubro.id}  onClick={() => formik.setValues({ ...formik.values, rubroArticulo: rubro })}>
                                            {rubro.denominacion}
                                            </Dropdown.Item>
                                        ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>

                            <Modal.Footer className="mt-4">
                                
                                <Button variant="secondary" onClick={onHide}>
                                    Cancelar
                                </Button>
                                <Button variant="primary" type="submit" disabled={!formik.isValid}>
                                    Guardar
                                </Button>

                            </Modal.Footer>
                            </Form>
                               

                    </Modal.Body>

                </Modal>

            </>
        )}
        </>
    )

}

export default ProductModal;