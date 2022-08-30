
const RightBox = ({message, date}) => {
    return (
        <div className='box'>
            <div className='space'></div>
            <div className='right'>
                <div className='content'>
                    <p className='text'>{message}</p>
                    <p className='date'>{date}</p>
                </div>
            </div>
        </div>
    )
}

export default RightBox