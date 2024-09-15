/**
 *
 * exemplo para componentes que se repente muito podendo ser reutilizados
 */
function Input(props) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
      value={props.value}
      onChange={props.onChange}
      // ou utilizar a desestruturação, todo atributo que passar, será importado aqui
      // { ...props }
    />
  );
}

export default Input;
