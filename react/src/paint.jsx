import React, { useState, useRef, useEffect } from 'react';
import './paint.css';

const Paint = () => {
    const [color, setColor] = useState('#000000');
    const [size, setSize] = useState(3);
    const [isPainting, setIsPainting] = useState(false);
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.lineCap = 'round';
    }, []);

    const handleColorChange = (e) => {
        setColor(e.target.value);
    };

    const handleSizeChange = (e) => {
        setSize(parseInt(e.target.value));
    };

    const startPaint = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        setIsPainting(true);
        context.beginPath();
        context.moveTo(offsetX, offsetY);
    };

    const paint = ({ nativeEvent }) => {
        if (!isPainting) return;

        const { offsetX, offsetY } = nativeEvent;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.strokeStyle = color;
        context.lineWidth = size;
        context.lineTo(offsetX, offsetY);
        context.stroke();
    };

    const stopPaint = () => {
        setIsPainting(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div id="paint">
            <canvas
                ref={canvasRef}
                id="canvas"
                width="800"
                height="400"
                onMouseDown={startPaint}
                onMouseMove={paint}
                onMouseUp={stopPaint}
                onMouseLeave={stopPaint}
            ></canvas>
            <div id="tools">
                <button onClick={clearCanvas}>Clear</button>
                <label htmlFor="color">Color:</label>
                <input
                    type="color"
                    id="color"
                    value={color}
                    onChange={handleColorChange}
                />
                <label htmlFor="size">Size:</label>
                <input
                    type="range"
                    id="size"
                    min="1"
                    max="10"
                    value={size}
                    onChange={handleSizeChange}
                />
            </div>
        </div>
    );
};

export default Paint;
