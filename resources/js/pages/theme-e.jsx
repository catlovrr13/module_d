import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';

export default function ThemeA() {
    const [images, setImages] = useState([]);
    const [mode, setMode] = useState('Autoplay');

    useEffect(() => {
        localStorage.setItem('theme', 'E');
    }, []);
    useEffect(() => {
        if (!images.length) {
            if (localStorage.getItem('images')) {
                setImages(JSON.parse(localStorage.getItem('images')));
            }
        } else {
            localStorage.setItem('images', JSON.stringify(images));
        }

        setTimeout(() => {
            images.forEach((_, i) => {
                document.getElementById(`left-${i}`).style.transitionDuration = '1s';
                document.getElementById(`left-${i}`).style.transitionDelay = `${i}s`;
                document.getElementById(`left-${i}`).style.transform = 'rotateY(-90deg)';

                setTimeout(() => {
                    document.getElementById(`left-${i}`).style.opacity = '0';
                    document.getElementById(`right-${i}`).style.opacity = '0';
                }, 1000)

                document.getElementById(`right-${i}`).style.transitionDuration = '1s';
                document.getElementById(`right-${i}`).style.transitionDelay = `${i}s`;
                document.getElementById(`right-${i}`).style.transform = 'rotateY(90deg)';
            });
        }, 1000);
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
            <div className="flex h-full flex-1 flex-col items-center overflow-y-clip justify-center gap-4 rounded-xl p-4">
                <div className="relative h-[75vh] w-[1000px]">
                    {images.map((img, i) => (
                        <div
                            className={`absolute inset-0 flex overflow-x-clip perspective-[700px] transform-3d`}
                            style={{
                                backfaceVisibility: 'hidden',
                                zIndex: images.length - i,
                            }}
                            key={i}
                        >
                            <div
                                className="absolute top-0 left-0 h-[100%] w-[50%] flex-1"
                                id={`left-${i}`}
                                style={{
                                    background: `url(${img.content})`,
                                    backgroundPositionX: 'left',
                                    backgroundSize: '1000px auto',
                                    backgroundRepeat: "no-repeat",
                                    transformOrigin: 'left center',
                                    opacity: 1
                                }}
                            ></div>

                            <div
                                className="absolute top-0 right-0 h-[100%] w-[50%] flex-1"
                                id={`right-${i}`}
                                style={{
                                    background: `url(${img.content})`,
                                    backgroundPositionX: 'right',
                                    backgroundSize: '1000px auto',
                                    backgroundRepeat: "no-repeat",
                                    transformOrigin: 'right center',
                                }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
