import { useState } from "react";
import { SiGoogletranslate } from "react-icons/si";
import { Button, Modal } from "react-bootstrap";

const ButtonTranslate = ({ text }: any) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="translate" onClick={handleShow}>
        <SiGoogletranslate size={30} color={"white"} />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ButtonTranslate;
