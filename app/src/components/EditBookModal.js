import React, {useEffect, useRef, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import bookService from "../services/book.service";
import Button from "react-bootstrap/Button";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const EditBookModal = props => {
    const form = useRef();
    const checkBtn = useRef();
    const [name, setName] = useState(props.name);
    const [author, setAuthor] = useState(props.author);
    const [description, setDescription] = useState(props.description);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState('');

    const handleEdit = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            bookService.editBook(props.id, name, author, description).then(
                response => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit book
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleEdit} ref={form}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Author</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="author"
                                    value={author}
                                    onChange={e => setAuthor(e.target.value)}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                            </div>
                            <button className="btn btn-primary btn-block">Edit book</button>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div
                                className={successful ? "alert alert-success" : "alert alert-danger"}
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{display: "none"}} ref={checkBtn}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditBookModal;