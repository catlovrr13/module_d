import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';
import '../../css/theme-g.css';

export default function ThemeB() {
    const [images, setImages] = useState([]);
    const [mode, setMode] = useState('Autoplay');
    const [sides, setSides] = useState(["", "", "", ""])

    useEffect(() => {
        localStorage.setItem('theme', 'F');
    }, []);
    useEffect(() => {
        if (!images.length) {
            if (localStorage.getItem('images')) {
                setImages(JSON.parse(localStorage.getItem('images')));
            }
        } else {
            localStorage.setItem('images', JSON.stringify(images));
        }

        let currentIndex = 0;

        if(images.length){
            const tempSides = [...sides]
            for(let i = 0 ; i < 4; i++){
                tempSides[i] = images[i % images.length].content
            }
            setSides(tempSides)

        }


        let rotation = -90
        for (let i = 0; i < images.length - 1; i++) {
            setTimeout(() => {
                document.getElementsByClassName('side')[(i + 2) % 4].style.backgroundImage = `url("${images[(i + 2) % images.length].content}")`
                document.getElementById(`cube`).style.transform = `scale(1) rotateY(${rotation + 90}deg)`;
                document.getElementById(`cube`).style.transitionDuration = '600ms';
                setTimeout(() => {
                    document.getElementById(`cube`).style.transform = `scale(1) rotateY(${rotation}deg)`;
                    setTimeout(() => {
                        document.getElementById(`cube`).style.transform = `scale(1.3) rotateY(${rotation}deg)`;
                        rotation -= 90
                    }, 500);
                }, 400);
            }, 1000 + (i * 2000));
        }
    }, [images]);

    useEffect(() => {
        if (localStorage.getItem('mode')) {
            setMode(localStorage.getItem('mode'));
        } else {
            localStorage.setItem('mode', mode);
        }
    }, [mode]);

    return (
        <AppLayout>
            <div className="stage">
                <div className="image" id='cube'>
                    {sides.map((img, i) => (
                        <div
                            className={`side-${i + 1} side absolute inset-0`}
                            id={`img-${i}`}
                            key={i}
                            style={{
                                backgroundImage: `url(${img})`,
                                zIndex: images.length - i,
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
