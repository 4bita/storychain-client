const MyButton = ({ children, ...props }) => {
    return (
        <button
            type="button"
            className="py-2 px-3 bg-blue-500 text-white font-bold uppercase rounded-sm hover:bg-blue-600 active:bg-blue-700"
            style={{ letterSpacing: '0.05em', fontSize: '12px' }}
            {...props}
        >
            {children}
        </button>
    );
};

export default MyButton;
