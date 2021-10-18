import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function MyDropzone() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isBase64, setIsBase64] = useState<string | any | null | undefined>();

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

                setIsBase64({ file: file, result: reader.result });

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
            <div className="info">
                <h1>Base64 Encoding Timer</h1>
                <p>Select a file and it will encode file to Base64 format and calculate time taken to encode.</p>
                <p>(All done on client side, offline.)</p>
            </div>

            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />

                {isLoading ? <h3>Encoding the file...</h3> : <h3>Drag and drop or select files here</h3>}
            </div>

            {isLoaded && (
                <div>
                    <h3 className="dropzone">It took {isTimer} ms. to encode file/s to Base64 format.</h3>
                </div>
            )}

            {isLoaded && console.log(isBase64)}
            {isLoaded && (
                <div className="info">
                    <p>Name: {isBase64.file.name}</p>
                    <p>Type: {isBase64.file.type}</p>
                    <p>Size: {isBase64.file.size}</p>
                </div>
            )}
        </div>
    );
}
