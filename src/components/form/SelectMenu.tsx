import { ChevronDown } from 'feather-icons-react';
import styles from '../../assets/css/modules/form.module.css';

export interface SelectMenuOption {
  text: string;
  value: string;
}

export default function SelectMenu({ options, ...props }: { options: SelectMenuOption[]; } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={styles.inputSelectWrapper}>
      <select { ...props }>
        <option key={"noOptionSelected"} value={""} hidden>---Select a value---</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.text}</option>
        ))}
      </select>
      <ChevronDown className={styles.inputSelectIcon} size={16} />
    </div>
  );
}
