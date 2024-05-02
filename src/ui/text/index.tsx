import css from './index.module.css';
export function Text(props: any) {
  return props.eti == 'h1' ? (
    <h2 className={css.h2}>{props.children}</h2>
  ) : (
    <p
      style={
        props.long
          ? {
              textAlign: 'center',
              width: '50%',
              margin: '0',
              fontWeight: '600',
              fontSize: '1.2rem',
            }
          : {}
      }>
      {props.children}
    </p>
  );
}
