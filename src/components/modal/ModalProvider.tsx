import { type ReactNode, useState } from "react";
import { Modal } from "./Modal";
import { ModalContext } from "./useModal";

export interface ModalsProviderMember {
  id: string;
  content: ReactNode;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modals, setModals] = useState<ModalsProviderMember[]>([]);

  const openModal = (modal: ModalsProviderMember) => {
    setModals([...modals, modal]);
    setIsOpen(true);
  };

  const closeModal = (id: string) => {
    setIsOpen(false);
    setModals(modals.filter(modal => modal.id !== id));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modals.map(modal => (
        <Modal key={"modal-" + modal.id} id={modal.id} isOpen={isOpen} onClose={() => closeModal(modal.id)}>
          {modal.content}
        </Modal>
      ))}
      
    </ModalContext.Provider>
  );
}
