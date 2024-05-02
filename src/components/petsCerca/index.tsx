import {Button} from '../../ui/button';
import css from './index.module.css';
export function PetsCerca(props: any) {
  const handleReport = (data: any) => {
    props.report(data);
  };
  return (
    <div className={css.pet} id={props.userId}>
      <img src={props.img} height='250' className={css.img} />
      <div className={css.description}>
        <h2 className={css.title}>{props.title}</h2>
        <p>{props.lugar}</p>
      </div>
      <Button
        report={handleReport}
        btn='is-danger is-fullwidth'
        ids={props.userId}>
        Reportar
      </Button>
    </div>
  );
}
