import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { Reorder, useDragControls } from 'motion/react';

const breadcrumbs = [
    {
        title: 'Configuration Panel',
        href: '/config',
    },
];

const modes = ['Manual', 'AutoPlay', 'Random'];
export default function Dashboard() {
    const controls = useDragControls();
    const [images, setImages] = useState([]);
    const [mode, setMode] = useState('Autoplay');

    const handleFileName = (name) => {
        let caption = name
            .replaceAll(/-/g, ' ')
            .replaceAll(/_/g, ' ')
            .split(' ')
            .map((w) => w[0].toUpperCase() + w.slice(1))
            .join(' ');
        caption = caption.replace(/\.[^/\.]*/g, '');
        return caption;
    };

    const handleImage = (files) => {
        const temp = [...images];
        let done = 0;
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onloadend = () => {
                temp.push({
                    id: i + 1,
                    name: handleFileName(files[i].name),
                    content: reader.result,
                });
                done += 1;
                if (done == files.length) {
                    setImages(temp);
                }
            };
            reader.readAsDataURL(files[i]);
        }
    };

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

    const changeMode = (m) => {
        setMode(m);
        localStorage.setItem('mode', m);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Configuration Panel" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    {modes.map((m) => (
                        <button
                            value={m}
                            onClick={() => changeMode(m)}
                            className={`border border-gray-400 px-3 ${m == mode ? 'bg-pink-300 text-black' : ''}`}
                        >
                            {m}
                        </button>
                    ))}
                </div>
                <div className="">
                    <h1>Upload Images here</h1>
                    <FileUploader required multiple name="Upload images here" handleChange={handleImage} types={['png', 'jpg', 'jpeg']} />
                </div>

                <Reorder.Group values={images} onReorder={setImages} axis="xy" as="ul">
                    {images.map((i, id) => (
                        <Reorder.Item key={id} value={i} dragListener={true}>
                            {/* <div className="m-2 flex flex-col items-center justify-center" onPointerDown={(e) => controls.start(e)}> */}
                            <img src={i.content} width={300} className="border border-gray-300" onPointerDown={(e) => controls.start(e)} />
                            {/* </div>   */}
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>
        </AppLayout>
    );
}
