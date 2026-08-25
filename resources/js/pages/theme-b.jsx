import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';
import "../../css/theme-b.css"

export default function ThemeB() {
    const [images, setImages] = useState([]);
    const [mode, setMode] = useState('Autoplay');
    const [current, setCurrent] = useState(0);
    const [slide, setSlide] = useState([])

    useEffect(() => {
        localStorage.setItem('theme', 'B');
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
        localStorage.setItem('mode', mode);
    }, [mode]);

    // useEffect(() => {
    //   const id = setInterval(() => {
    //     const cur = images[current]
    //     console.log(current)
    //     const next = current + 1 >= images.length ? images[0] : images[current + 1] 
    //     setSlide([cur, next])
    //     setTimeout(() => {
    //       setCurrent(current + 1 >= images.length ? 0 : current + 1)
    //       document.getElementById("slide-0").style.right = 0;
    //     }, 2000)

    //   }, 2000)

    //   return () => {
    //     clearInterval(id)
    //   }

    // }, [images, current])

    useEffect(() => {
        if (images.length < 2 || mode === "Manual") return;

        const id = setInterval(() => {
            setCurrent((prev) => {
                if (mode === 'Random') {
                    return Math.floor(Math.random() * images.length);
                }
                return (prev + 1) % images.length;
            });
        }, 4000);

        return () => clearInterval(id);
    }, [images.length, mode]);

    const n = images.length;
    const offset = n ? n - 1 - current : 0;

    console.log(images)
    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='h-210 overflow-hidden relative'
                >
                    <div className='flex h-full' style={{
                        transform: `translateX(-${offset * 100}%)`,
                        transition: 'transform 500ms ease',
                    }}>
                        {images.map((img, i) => (
                            <div className='shrink-0 grow-0 basis-full h-full' key={i}>
                                <img src={img.content} className="w-full h-full object-cover block" />
                            </div>
                        ))}
                    </div>

                    {images[current] && (
                        <p key={current} className="bg-white caption text-black bottom-0 left-0 absolute" style={{animationDelay: '300ms'}}>{images[current].name}</p>

                    )}
                </div>
            </div>
        </AppLayout>
    );
}