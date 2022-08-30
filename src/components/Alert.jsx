

const Alert = ({msg, error}) => {
    return (
        <div className={`alert ${error ? 'alert__error' : 'alert__success'}`}>
            {msg}
        </div>
    )
}

export default Alert