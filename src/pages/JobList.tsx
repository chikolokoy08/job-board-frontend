import { useEffect, useState } from 'react'

type Job = {
  title: string;
  location: string;
  description: [{sectionTitle:string,content:string}];
  link: string;
  email: string;
};

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/jobs/list')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch jobs:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 listing-header">Job Listings</h1>
      {loading ? (
        <p className="text-gray-600 text-lg p-4">Loading data...</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job, i) => (
            <li key={i} className="p-4 bg-white rounded shadow listing-item">
              <h2 className="text-xl font-semibold li-title">{job.title}</h2>
              <h4 className="text-md font-semibold">Location: {job.location}</h4>
              <div className="mt-2 text-gray-700 li-description">
              <h4 className="text-md font-semibold">Job Description:</h4>
              {
                typeof job.description == 'object' ? (
                  job.description.map((descSection, index) => (
                    <div key={index} className="lid-content mb-4">
                      <strong className="lid-name text-lg font-semibold">{descSection.sectionTitle}</strong>
                      <div
                        className="mt-1"
                        dangerouslySetInnerHTML={{ __html: descSection.content }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="lid-content mb-4">
                    <div
                        className="mt-1"
                        dangerouslySetInnerHTML={{ __html: job.description }}
                      />
                  </div>
                )
              }
              </div>
              {
                job.link != '' ? (
                  <a href={job.link} target="_blank" className="text-blue-500 underline mt-2 block li-link">View Job</a>
                ) : ''
              }
              {
                job.email != '' ? (
                  <a href={`mailto:${job.email}`} target="_blank" className="text-blue-500 underline mt-2 block li-link">Send Email</a>
                ) : ''
              }
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
