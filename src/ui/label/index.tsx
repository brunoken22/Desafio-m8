export function Label(props: any) {
  return (
    <label htmlFor={props.name} className=' form-control'>
      {props.children}{' '}
    </label>
  );
}
