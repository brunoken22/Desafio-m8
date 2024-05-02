import css from './index.module.css';
import {Text} from '../../ui/text';
import {FormSingUp} from '../../components/formSingup';
export function SingUp() {
  return (
    <div className={css.contenedor}>
      <Text eti='h1'>Registrate</Text>
      <FormSingUp />
    </div>
  );
}
