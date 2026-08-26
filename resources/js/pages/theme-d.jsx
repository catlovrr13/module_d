import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';

export default function ThemeD() {
    const [images, setImages] = useState([]);
    const [mode, setMode] = useState('Autoplay');

    useEffect(() => {
        localStorage.setItem('theme', 'D');
    }, []);
    useEffect(() => {
        if (!images.length) {
            if (localStorage.getItem('images')) {
                setImages(JSON.parse(localStorage.getItem('images')));
            }
        } else {
            localStorage.setItem('images', JSON.stringify(images));

            images.forEach((_, i) => {
                
                console.log(i);
                const rotate = ` rotateZ(${Math.random() * ((i % 2) ? 5 : -5)}deg)`
                document.getElementById(`img-${i}`).style.transform += rotate;

                setTimeout(() => {
                    document.getElementById(`img-${i}`).style.transitionDuration = '300ms';
                    document.getElementById(`img-${i}`).style.transform = `translateX(0%) ${rotate}`;
                }, 100);
            });
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
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative h-200 w-full overflow-clip">
                    {images.map((img, i) => (
                        <div
                            id={`img-${i}`}
                            className={`absolute inset-0 p-20`}
                            key={i}
                            style={{
                                transform: 'translateX(-100%)',
                                transitionDuration: '400ms',
                                transitionDelay: `${i * 500}ms`,
                            }}
                        >
                            <img src={img.content} className="h-full w-full object-cover border-[3px] border-white rounded-[5px]" />
                            <p className="border border-white bg-white text-black">{img.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
