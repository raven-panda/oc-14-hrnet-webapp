import { X } from "feather-icons-react";
import { type HTMLAttributes } from "react";
import { createPortal } from "react-dom";
import styles from '../../assets/css/modules/modal.module.css';

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
    <div className={styles.modalWrapper} onClick={onClose}>
      <div className={`${className ?? ""} ${styles.modalContent}`} {...props}>
        <button className={styles.modalCloseAction} onClick={onClose}><X size={20}/></button>
        {children}
      </div>
    </div>
  , document.body);
} 