import React from 'react';
import './anime.css';

const Test = () => {
    const handleMouseMove = (e: React.MouseEvent) => {
        const el = document.getElementById("wrapper");
        if (!el) return;
        const d = el.getBoundingClientRect();
        let x = e.clientX - (d.left + Math.floor(d.width / 2));
        let y = e.clientY - (d.top + Math.floor(d.height / 2));
        if(x > 0 && y > 0){
        x = x - x * 2;
        y = y - y * 2;}
        document.documentElement.style.setProperty("--scale", "1.6");
        document.documentElement.style.setProperty("--x", `${x / 2}px`);
        document.documentElement.style.setProperty("--y", `${y / 2}px`);
    };

    const handleMouseLeave = () => {
        document.documentElement.style.setProperty("--scale", "1");
        document.documentElement.style.setProperty("--x", "0");
        document.documentElement.style.setProperty("--y", "0");
    };

    return (
        <div 
            id="wrapper"
            onMouseMove={handleMouseMove}
            onClick={handleMouseLeave}
        >
            <div id="image" />
        </div>
    );
};

export default Test;