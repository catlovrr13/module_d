import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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
        const newEntries = []
        let done = 0;
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onloadend = () => {
                newEntries.push({
                    id: Date.now() + 1,
                    name: handleFileName(files[i].name),
                    content: reader.result,
                });
                done += 1;
                if (done == files.length) {
                    setImages((prev) => [...prev, ...newEntries]);
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

    const exportData = () => {
        const data = {
            images: JSON.parse(localStorage.getItem('images')) ?? [],
            theme: localStorage.getItem('theme') ?? 'A',
        };

        const json = JSON.stringify(data);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const now = new Date();
        const timeStamp = now.toISOString().replaceAll(':', '').replaceAll('.', '');
        const filename = `slideshow-${timeStamp}`;

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    const importData = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const data = JSON.parse(reader.result);
            setImages(data.images);
            localStorage.setItem('images', JSON.stringify(data.images));
            localStorage.setItem('theme', data.theme);
        };

        reader.readAsText(file);
        e.target.value = '';
    };

    const resetData = () => {
        setImages([]), localStorage.clear();
    };

    useEffect(() => {
        const dropzone = document.getElementById('dropzone');
        const fileInput = document.getElementById('fileInput');

        dropzone.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', () => {
            handleImage(fileInput.files);
            fileInput.value = '';
        });

        const dragEvents = ['dragenter', 'dragleave', 'drop', 'dragover'];
        dragEvents.forEach((evt) => {
            dropzone.addEventListener(evt, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
            document.addEventListener(evt, (e) => e.preventDefault());
        });

        dropzone.addEventListener('drop', (e) => {
            if (e.dataTransfer?.files?.length) handleImage(e.dataTransfer.files);
        });
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Configuration Panel" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="fileUpload">
                    <button type="button" className="dropzone border border-gray-300 px-3 py-2" id="dropzone">
                        Upload Images Here !
                        <input type="file" id="fileInput" multiple className="absolute h-[1px] w-[1px] overflow-hidden opacity-0" />
                    </button>
                </div>

                <div className="flex gap-2">
                    <button className="border border-gray-300 px-2 py-1" onClick={exportData}>
                        Export Data
                    </button>
                    <label className="border border-gray-300 px-2 py-1">
                        Import Data
                        <input
                            type="file"
                            accept="
                        application/json"
                            onChange={importData}
                            className="hidden"
                        />
                    </label>
                    <button className="border border-gray-300 px-2 py-1" onClick={resetData}>
                        Reset Data
                    </button>
                </div>

                <div>
                    <p>Play Mode</p>
                    {modes.map((m) => (
                        <button
                            value={m}
                            key={m}
                            onClick={() => changeMode(m)}
                            className={`border border-gray-400 px-3 py-1 ${m == mode ? 'bg-pink-300 text-black' : ''}`}
                        >
                            {m}
                        </button>
                    ))}
                </div>
                {/* <div className="">
                    <h1>Upload Images here</h1>
                    <FileUploader required multiple name="Upload images here" handleChange={handleImage} types={['png', 'jpg', 'jpeg']} />
                </div> */}

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
