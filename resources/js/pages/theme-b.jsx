import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';
// import "../../css/theme-b.css"

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

    // useEffect(() => {
    //     if (images.length < 2) return;

    //     const id = setInterval(() => {
    //         setCurrent((prev) => {
    //             if (mode === 'Random') {
    //                 return Math.floor(Math.random() * images.length);
    //             }
    //             return (prev + 1) % images.length;
    //         });
    //     }, 2000);

    //     return () => clearInterval(id);
    // }, [images.length, mode]);

    console.log(images)
    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className={`h-210 overflow-hidden flex strip transition-transform`}>
                    {images.map((img, i) => (
                        <div className={`w-fit shrink-0 slide flex grow-0 basis-[100%]`} key={i}>
                            <img src={img.content} className="w-full h-full object-cover" />
                            <p className="bg-white text-black bottom-0 left-0">{img.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}