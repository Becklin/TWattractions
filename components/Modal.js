import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
// To avoid naming conflcit with daisyUi, create a separate css
import styles from "@/styles/Modal.module.scss";

export default function Modal({ show, children, title }) {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          {title && <div>{title}</div>}
          <div className={styles.body}>{children}</div>
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
