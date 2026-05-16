import { Field, Row2 } from "../ui";

export default function BasicsTab({ resume, update }) {
  return (
    <div>
      <Field label="Full Name">
        <input value={resume.name} onChange={e => update("name", e.target.value)} placeholder="e.g. Arjun Sharma" />
      </Field>
      <Field label="Job Title / Desired Role">
        <input value={resume.title} onChange={e => update("title", e.target.value)} placeholder="e.g. Software Engineer, Data Analyst" />
      </Field>
      <Row2>
        <Field label="Email">
          <input value={resume.email} onChange={e => update("email", e.target.value)} placeholder="arjun@email.com" />
        </Field>
        <Field label="Phone">
          <input value={resume.phone} onChange={e => update("phone", e.target.value)} placeholder="+91 98765 43210" />
        </Field>
      </Row2>
      <Row2>
        <Field label="City">
          <input value={resume.city} onChange={e => update("city", e.target.value)} placeholder="Bengaluru, Delhi, Pune..." />
        </Field>
        <Field label="LinkedIn">
          <input value={resume.linkedin} onChange={e => update("linkedin", e.target.value)} placeholder="linkedin.com/in/arjun" />
        </Field>
      </Row2>
      <Field label="Professional Summary" hint="2–3 sentences about your experience and what you bring to the role.">
        <textarea value={resume.summary} onChange={e => update("summary", e.target.value)} rows={4}
          placeholder="Results-driven software engineer with 3+ years building scalable web applications. Passionate about clean code and delivering impactful user experiences..." />
      </Field>
    </div>
  );
}
