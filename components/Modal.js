import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({ show, children, title }) {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <>
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {title && <h3 className="font-bold text-lg">{title}</h3>}
          {children}
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
