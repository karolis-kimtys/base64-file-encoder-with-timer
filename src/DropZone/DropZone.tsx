import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function MyDropzone() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [, setIsBase64] = useState<string | any | null | undefined>();

    const [isTimer, setIsTimer] = useState('0');

    const onDrop = useCallback((acceptedFiles) => {
        setIsLoading(false);
        setIsLoaded(false);
        const t0 = performance.now();
        acceptedFiles.forEach((file: any) => {
            setIsLoading(true);
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onerror = function (error) {
                console.log('Error: ', error);
            };

            reader.onload = function () {
                console.log('Base64 Encoded', reader.result);
                const res = reader.result;
                setIsBase64(res);

                const t1 = performance.now();
                const time = t1 - t0;
                setIsTimer(time.toFixed());
                setIsLoading(false);

                setIsLoaded(true);
            };
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />

                {isLoading ? <p>Encoding the file...</p> : <p>Drag and drop or select files here</p>}
            </div>
            <br />
            {isLoaded && (
                <div>
                    <p className="dropzone">Time it took to convert to Base64</p>
                    <p className="dropzone">{isTimer} ms</p>
                </div>
            )}

            {/* {isLoaded && <textarea className="dropzone textarea" readOnly value={isBase64} />} */}
        </div>
    );
}
