export default function Close({ onClick, className }) {
    return (
        <svg
            className={`svg-component ${className}`}
            xmlns='http://www.w3.org/2000/svg'
            height='18px'
            viewBox='0 0 24 24'
            width='18px'
            fill='currentColor'
            onClick={onClick}
        >
            <polygon xmlns="http://www.w3.org/2000/svg" points="24.061 2.061 21.939 -0.061 12 9.879 2.061 -0.061 -0.061 2.061 9.879 12 -0.061 21.939 2.061 24.061 12 14.121 21.939 24.061 24.061 21.939 14.121 12 24.061 2.061" />
        </svg >
    )
}
