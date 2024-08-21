import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';  // Import the custom CSS file

const App: React.FC = () => {
    const [url, setUrl] = useState<string>('');
    const [status, setStatus] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);
        setError(null);

        try {
            const response = await fetch(url, { method: 'HEAD' });
            if (response.ok) {
                setStatus(`Status: ${response.status} - ${response.statusText}`);
            } else {
                setStatus(`Status: ${response.status} - ${response.statusText}`);
            }
        } catch (err) {
            setError('Error: Unable to fetch the URL. It might be blocked by CORS or an invalid URL.');
        }
    };

    const getStatusClass = (status: string) => {
        if (status.includes('200')) return 'bg-success-subtle bg-opacity-50 text-success'; // Bootstrap class for green
        if (status.includes('403')) return 'bg-warning-subtle bg-opacity-50 text-warning-emphasis'; // Bootstrap class for orange
        if (status.includes('404')) return 'bg-danger-subtle bg-opacity-50 text-danger-emphasis';  // Bootstrap class for red
        return '';
    };

    return (
        <div className="centered-container">
            <div className="text-center" style={{ maxWidth: '500px', width: '100%' }}>
                <h1 className="mb-4 poppins-heading">URL Status Checker</h1>
                <form onSubmit={handleSubmit} className="mb-3">
                    <div className="input-group">
                        <input
                            type="url"
                            className="form-control"
                            placeholder="Enter URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-primary">
                            Check URL
                        </button>
                    </div>
                </form>
                {status && <div className={`alert ${getStatusClass(status)}`}>{status}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
}

export default App;