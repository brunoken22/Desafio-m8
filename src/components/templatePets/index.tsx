import css from './index.module.css';
import {Button} from '../../ui/button';

export default function TemplatePets({
  id,
  name,
  img,
  lugar,
  report,
  handleReport,
  handleEditar,
  handleBorrar,
}: {
  id: string;
  name: string;
  img: string;
  lugar: string;
  handleReport?: () => any;
  handleEditar?: () => any;
  handleBorrar?: () => any;
  report: boolean;
}) {
  return (
    <div className={`${css.cardInfo}`}>
      <figure className={css.figure}>
        <img src={img} alt='pets' className={css.img} />
      </figure>
      <div className={css.card}>
        <div>
          <h5 className='title is-4 nombre' style={{color: '#fff'}}>
            {name}
          </h5>
          <p className=' is-6' style={{color: '#fff'}}>
            {lugar}
          </p>
        </div>
        {report ? (
          <Button report={handleReport} btn='is-danger is-fullwidth' ids={id}>
            Reportar
          </Button>
        ) : (
          <div className={css.botones}>
            <button onClick={handleEditar} className='editar button is-info'>
              Editar
            </button>
            <button onClick={handleBorrar} className='borrar button is-danger'>
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
