import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import styles from "@/styles/Modal.module.scss";

export default function Modal({ show, onClose, children, title }) {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <>
      {/* <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <a href="#" onClick={handleClose}>
              <FaTimes />
            </a>
          </div>
          {title && <div>{title}</div>}
          <div className={styles.body}>{children}</div>
        </div>
      </div> */}
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {title && <h3 className="font-bold text-lg">{title}</h3>}
          {children}
          {/* <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn">
              Yay!
            </label>
          </div> */}
        </div>
      </div>
    </>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}
