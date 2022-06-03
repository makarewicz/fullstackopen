const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }
    const baseStyle = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
    };
    const errorStyle = {
        ...baseStyle,
        color: 'red',
        background: '#e99',
        borderColor: 'red',
    };
    const successStyle = {
        ...baseStyle,
        color: 'green',
        background: '#9e9',
        borderColor: 'green',
    };
    return (
        <div className={message.type} style={message.type === "error" ? errorStyle : successStyle}>
            {message.text}
        </div >
    );
}

export default Notification;