import { X } from "feather-icons-react";
import { type HTMLAttributes } from "react";
import { createPortal } from "react-dom";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  isOpen?: boolean;
}
export function Modal({
  isOpen = false,
  onClose,
  className,
  children,
  ...props
}: ModalProps) {
  return isOpen && createPortal(
    <div className="modal-wrapper" onClick={onClose}>
      <div className={`${className ?? ""} modal-content`} {...props}>
        <button className="modal-close-action" onClick={onClose}><X size={20}/></button>
        {children}
      </div>
    </div>
  , document.body);
} 