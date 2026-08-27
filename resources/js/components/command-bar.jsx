import { DialogTitle } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList } from './ui/combobox';
import { Dialog, DialogContent } from './ui/dialog';
import { router } from '@inertiajs/react';

const themeCmd = ["A","B","C","D","E","F","G","H"].map((t) => `Switch to theme ${t}`)
const modeCmd = ['Manual', 'AutoPlay', 'Random'].map((m) => `Change to ${m}`)
const commands = [...themeCmd, ...modeCmd];
export default function CmdBar() {
    const [open, setOpen] = useState(false);

    const handleOpen = (e) => {
        if ((e.ctrlKey && e.key === 'k') || e.key === '/') {
            e.preventDefault();
            setOpen(true);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleOpen);
        return () => {
            window.removeEventListener('keydown', handleOpen);
        };
    }, []);

    const selectCommand = (cmd) => {
        if (cmd.startsWith("Switch to theme ")){
            const theme = cmd.replace("Switch to theme ", "").toLowerCase()
            router.visit(`/theme-${theme}`)
            return
        }
        if (cmd.startsWith("Change to ")){
            const mode = cmd.replace("Change to ", "")
            console.log(mode)
            localStorage.setItem("mode", mode)
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogTitle>Select Commands Here</DialogTitle>
                <Combobox items={commands} onValueChange={(value) => selectCommand(value)}>
                    <ComboboxInput placeholder='Select a command'/>
                    <ComboboxContent>
                        <ComboboxList>
                            {(item) => (
                                <ComboboxItem key={item} value={item}>
                                    {item}
                                </ComboboxItem>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
            </DialogContent>
        </Dialog>
    );
}
