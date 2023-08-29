const NumberButtons = ({classname, id, onClick, value}) => {
    return (  
        <button className={classname} id={id} onClick={onClick}>{value}</button>
    );
}
export default NumberButtons;