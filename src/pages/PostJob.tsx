import { useState } from 'react';

export default function PostJob() {
  const [form, setForm] = useState({ title: 'Junior Developer', description: '', company_name: 'JOBOARD Inc', location: 'WFH/Remote', email: 'jobboard@mail.com', link: 'https://resources.workable.com/junior-developer-job-description' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/jobs/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    let data = await res.json();
    console.log("Response status:", res.status);
    console.log("Response data:", data);
    if (res.ok) {
      if (res.status === 200) {
        setSubmitted(true);
        alert(data?.message);
        setTimeout(()=>{
          window.location.reload();
        }, 3000);
      } else if (res.status === 201) {
        alert(data?.message);
      }
    } else {
      console.error("Server returned an error:", res.status);
    } 

  };

  return submitted ? (
    <div className="text-green-600 text-lg text-center">Job posted successfully!</div>
  ) : (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input name="title" placeholder="Job Title" value={form.title} onChange={handleChange} className="w-full p-2 border" required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full p-2 border" required />
      <input name="email" placeholder="Contact Email" value={form.email} onChange={handleChange} className="w-full p-2 border" required />
      <textarea name="description" placeholder="Job Description" value={form.description} onChange={handleChange} className="w-full p-2 border" required />
      <input name="company_name" placeholder="Company Name (optional)" value={form.company_name} onChange={handleChange} className="w-full p-2 border" />
      <input name="link" placeholder="Link (optional)" value={form.link} onChange={handleChange} className="w-full p-2 border" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Post Job</button>
    </form>
  );
}
