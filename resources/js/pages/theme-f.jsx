import AppLayout from '@/layouts/app-layout'
import React from 'react'

export default function ThemeB() {
  const [images, setImages] = useState([]);
      const [mode, setMode] = useState('Autoplay');
  
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
        <div>ThemeB</div>
    </AppLayout>
  )
}
