import { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom';

export default function JobModeration({ mode }: { mode: 'approve' | 'spam' }) {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [job, setJob] = useState<any>(null);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const process = async () => {
      if (!token) return;

      const res = await fetch(`/api/jobs/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus(data.message);
        setJob(data.job);
      } else {
        setStatus('Failed to process');
      }
    };
    process();
  }, [token, mode]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className='text-green-600 text-lg text-center p-4 font-semibold'>{status}</h1>
      {job ? (
        <div className="p-4 bg-white rounded shadow listing-item">
          <h2 className="text-xl font-semibold li-title">{job.title}</h2>
          <h4 className="text-md font-semibold">Location: {job.location}</h4>
          <div className="mt-2 text-gray-700 li-description">
            <h4 className="text-md font-semibold">Job Description:</h4>
            <div className="lid-content mb-4">
              <div
                  className="mt-1"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
            </div>
          </div>
        </div>
      ) : null }
    </div>
  );
};
