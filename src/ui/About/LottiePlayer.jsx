import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

function LottiePlayer() {
  const [animationData, setAnimationData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/lf20_t24tpvcu.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch animation');
        return res.json();
      })
      .then((data) => setAnimationData(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="text-red-500">Error loading animation: {error}</div>;
  }

  return (
    <div style={{maxWidth: 370, height: 370, margin: '0 auto' }}>
      {animationData ? (
        <Lottie animationData={animationData} loop={true} />
      ) : (
        <p className="text-center text-gray-500">Loading animation...</p>
      )}
    </div>
  );
}

export default LottiePlayer;

