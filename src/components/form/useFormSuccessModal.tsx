import { useModal } from "../modal/useModal";

export default function useFormSuccessModal() {
  const { openModal } = useModal();

  const modalId = "FormSuccessModal";

  const openSuccessModal = (message: string) => {
    openModal({ id: modalId, content: message });
  }

  return { openSuccessModal };
}