
const LeftBox = ({name, message, date}) => {
    return (
        <div className='box'>
            <div className='left'>
                <p className='author'>{name}</p>
                
                <div className='content'>
                    <p className='text'>{message}</p>
                    <p className='date'>{date}</p>
                </div>
            </div>
            <div className='space'></div>
        </div>
    )
}

export default LeftBox