import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';

export default function ThemeA() {
    const [images, setImages] = useState([]);
    const [mode, setMode] = useState('Autoplay');
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        localStorage.setItem('theme', 'A');
    }, []);
    useEffect(() => {
        if (!images.length) {
            if (localStorage.getItem('images')) {
                setImages(JSON.parse(localStorage.getItem('images')));
            }
        } else {
            localStorage.setItem('images', JSON.stringify(images));
        }
    }, [images]);

    useEffect(() => {
        if (localStorage.getItem('mode')) {
            setMode(localStorage.getItem('mode'));
        } else {
            localStorage.setItem('mode', mode);
        }
    }, [mode]);

    useEffect(() => {
        if (images.length < 2) return;

        const id = setInterval(() => {
            setCurrent((prev) => {
                if (mode === 'Random') {
                    return Math.floor(Math.random() * images.length);
                }
                return (prev + 1) % images.length;
            });
        }, 2000);

        return () => clearInterval(id);
    }, [images.length, mode]);

    console.log(images);
    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative h-180 w-full">
                    {images.map((img, i) => (
                        <div className={`absolute inset-0 ${i == current ? 'z-100' : 'z-0 opacity-0'}`} key={i}>
                            <img src={img.content} className="h-full w-full object-cover" />
                            <p className="absolute bottom-0 left-0 bg-white text-black">{img.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
