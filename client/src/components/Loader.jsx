const Loader = ({ size = 60, color = '#1E3A8A' }) => {
    const loaderStyle = {
        width: `${size}px`,
        aspectRatio: '4',
        background: `
      radial-gradient(circle closest-side, ${color} 90%, transparent) 0% 50% / calc(100% / 3) 100% no-repeat,
      radial-gradient(circle closest-side, ${color} 90%, transparent) 50% 50% / calc(100% / 3) 100% no-repeat,
      radial-gradient(circle closest-side, ${color} 90%, transparent) 100% 50% / calc(100% / 3) 100% no-repeat
    `,
        animation: 'dotLoader 1s infinite linear',
    };

    return (
        <div className="flex items-center justify-center">
            <div style={loaderStyle}></div>
            <style jsx>{`
        @keyframes dotLoader {
          33% {
            background-size: calc(100% / 3) 0%, calc(100% / 3) 100%, calc(100% / 3) 100%;
          }
          50% {
            background-size: calc(100% / 3) 100%, calc(100% / 3) 0%, calc(100% / 3) 100%;
          }
          66% {
            background-size: calc(100% / 3) 100%, calc(100% / 3) 100%, calc(100% / 3) 0%;
          }
        }
      `}</style>
        </div>
    );
};

export default Loader