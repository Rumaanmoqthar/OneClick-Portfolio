import { useLocation, useParams } from 'react-router-dom';
// --- THIS IS THE FIX ---
// These paths are now corrected to find the template components.
import ModernPortfolio from './ModernPortfolio.jsx';
import ClassicPortfolio from './ClassicPortfolio.jsx';
import { useEffect, useState } from 'react';

const LoaderIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>;

const PortfolioPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const template = queryParams.get('template') || 'modern';

    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = 'http://localhost:3000';

    useEffect(() => {
        let isMounted = true;
        let pollingTimeout;
        const fetchResumeData = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/resume/${id}`);
                if (!response.ok) throw new Error('Portfolio not found or still processing.');
                const data = await response.json();
                if (isMounted) {
                    if (data.name?.full === 'Processing...') {
                        pollingTimeout = setTimeout(fetchResumeData, 3000);
                    } else {
                        setResume(data);
                        setLoading(false);
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        };
        fetchResumeData();
        return () => { isMounted = false; clearTimeout(pollingTimeout); };
    }, [id]);
    
    const handleDownloadCode = () => {
        window.location.href = `${apiUrl}/api/portfolio/${id}/download?template=${template}`;
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white"><LoaderIcon /> <span className="ml-4 text-xl">Crafting your portfolio...</span></div>;
    if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-950 text-red-500">Error: {error}</div>;

    if (template === 'classic') {
        return <ClassicPortfolio resume={resume} onDownloadCode={handleDownloadCode} />;
    }
    
    return <ModernPortfolio resume={resume} onDownloadCode={handleDownloadCode} />;
};

export default PortfolioPage;

