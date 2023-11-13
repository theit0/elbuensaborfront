import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { ArticuloInsumo } from "../../types/ArticuloInsumo";
import { ModalType } from "../../types/ModalType";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { ArticuloInsumoService } from "../../services/ArticuloInsumoService";
import {toast} from 'react-toastify';
import { UnidadMedidaService } from "../../services/UnidadMedidaService";
import { useEffect, useState } from "react";
import { UnidadMedida } from "../../types/UnidadMedida";
import { RubroArticulo } from "../../types/RubroArticulo";
import { RubroArticuloService } from "../../services/RubroArticulo";
import './ArticuloInsumoModal.css'



type ArticuloInsumoModalProps = {
    show:boolean;
    onHide:()=>void;
    title:string;
    modalType:ModalType;
    art:ArticuloInsumo;
    refreshData:React.Dispatch<React.SetStateAction<boolean>>
}

const ArticuloInsumoModal = ({show,onHide,title,modalType,art,refreshData}:ArticuloInsumoModalProps) => {
    

    const handleSaveUpdate = async (art:ArticuloInsumo) => {
        
        try {
            
            const isNew = art.id === 0;
            if (isNew) {
                await ArticuloInsumoService.createArticuloInsumo(art);
            } else {
                await ArticuloInsumoService.updateArticuloInsumo(art.id, art);
            }
            toast.success(isNew?"Ariculo insumo creado":"Articulo insumo actualizado",{
                position:"top-center"
            });
            onHide();
            refreshData(prevState => !prevState)
        } catch (error) {
            console.error(error);
            toast.error("Ha ocurrido un error");
        }
    }

    const handleDelete = async ()=>{
        try {
            await ArticuloInsumoService.deleteArticuloInsumo(art.id);
            toast.success("Articulo insumo eliminado con éxito",{
                position:"top-center"
            });
            onHide();
            refreshData(prevState => !prevState)
        } catch (error) {
            console.error(error);
        }
    }

    const [rubros, setRubros] = useState<RubroArticulo[]>([]);
    const [unidadesMedida, setUnidadesMedida] = useState<UnidadMedida[]>([]);

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

        const fetchUnidades = async () => {
        try {
            const data = await UnidadMedidaService.getUnidades();
            setUnidadesMedida(data);
        } catch (error) {
            console.error(error);
            // Manejo de error, muestra un mensaje al usuario, etc.
        }
        };

        fetchRubros();
        fetchUnidades();
    }, []);


  const validationSchema =()=>{
    return Yup.object().shape({
        id: Yup.number().integer().min(0),
        denominacion: Yup.string().required("El nombre es requerido"),
        precioCompra: Yup.number().min(0).required("El precio de compra es requerido"),
        stockActual: Yup.number().min(0).required("El stock actual es requerido"),
        stockMinimo: Yup.number().min(0).required("El stock minimo es requerido"),
        urlImagen: Yup.string().required("La imagen es requerida")
    });
  };
  
  const formik = useFormik({
    initialValues: art,
    validationSchema:validationSchema(),
    validateOnChange:true,
    validateOnBlur:true,
    onSubmit:(obj:ArticuloInsumo) => handleSaveUpdate(obj),
  })




    return (
    <>
        {modalType === ModalType.DELETE ? (
            <>
                <Modal show={show} onHide={onHide} centered backdrop="static">
                    <Modal.Header>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <p>¿Está seguro que desea eliminar el producto?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                        <Button variant="danger" onClick={handleDelete}>Borrar</Button>
                    </Modal.Footer>
                </Modal>
            </>
            ) : (
                <>
                    <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {title}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modal-inputs">
                            <Form onSubmit={formik.handleSubmit} >
                              <Form.Group controlId="formDenominacion">
                                    <Form.Label>Denominación</Form.Label>
                                    <Form.Control
                                        name="denominacion"
                                        type="text"
                                        value={formik.values.denominacion || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.denominacion && formik.touched.denominacion)}/>
                                    <Form.Control.Feedback type="invalid" >
                                        {formik.errors.denominacion}
                                    </Form.Control.Feedback>  
                               </Form.Group>

                               <Form.Group controlId="formImagen">
                                    <Form.Label>URL Imagen</Form.Label>
                                    <Form.Control
                                        name="urlImagen"
                                        type="text"
                                        value={formik.values.urlImagen || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.urlImagen && formik.touched.urlImagen)}
                                    />
                                        <Form.Control.Feedback type="invalid" >
                                            {formik.errors.urlImagen}
                                        </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group controlId="formPrecioCompra">
                                    <Form.Label>Precio compra</Form.Label>
                                    <Form.Control
                                        name="precioCompra"
                                        type="number"
                                        value={formik.values.precioCompra || 0}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.precioCompra && formik.touched.precioCompra)}
                                    />
                                        <Form.Control.Feedback type="invalid" >
                                            {formik.errors.precioCompra}
                                        </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group controlId="formStockActual">
                                    <Form.Label>Stock actual</Form.Label>
                                    <Form.Control
                                        name="stockActual"
                                        type="number"
                                        value={formik.values.stockActual || 0}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.stockActual && formik.touched.stockActual)}
                                    />
                                        <Form.Control.Feedback type="invalid" >
                                            {formik.errors.stockActual}
                                        </Form.Control.Feedback>

                              </Form.Group>


                              <Form.Group controlId="formStockMinimo">
                                    <Form.Label>Stock minimo</Form.Label>
                                    <Form.Control
                                        name="stockMinimo"
                                        type="number"
                                        value={formik.values.stockMinimo || 0}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.stockMinimo && formik.touched.stockMinimo)}
                                    />
                                        <Form.Control.Feedback type="invalid" >
                                            {formik.errors.stockMinimo}
                                        </Form.Control.Feedback>
                              </Form.Group>

                                <Form.Group controlId="formUnidadMedida">
                                    <Form.Label>Unidad de Medida</Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" id="dropdown-unidad-medida">
                                            {
                                                formik.values.unidadMedida.denominacion || 'Unidad medida'
                                            }
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                        {unidadesMedida.map((unidad) => (
                                            <Dropdown.Item key={unidad.id}onClick={() => formik.setValues({ ...formik.values, unidadMedida: unidad })}>
                                            {unidad.denominacion}
                                            </Dropdown.Item>
                                        ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>

                                <Form.Group controlId="formRubroArticulo">
                                    <Form.Label>Rubro de Artículo</Form.Label>
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
                                    <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                                    <Button variant="primary" type="submit" disabled={!formik.isValid}>Guardar</Button>
                                </Modal.Footer>
                                
                            </Form>
                        </Modal.Body>

                        


                    </Modal>
                </>
            )
        }
    </>
  )
}

export default ArticuloInsumoModal