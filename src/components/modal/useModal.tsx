import { createContext, useContext } from "react";
import type { ModalsProviderMember } from "./ModalProvider";


export interface ModalContextType {
  openModal: (modal: ModalsProviderMember) => void;
  closeModal: (id: string) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}