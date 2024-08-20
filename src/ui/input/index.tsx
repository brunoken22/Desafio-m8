export function Input(props: any) {
  return (
    <input
      className='input'
      type={props.type}
      name={props.input}
      id={props.input}
      required
    />
  );
}
