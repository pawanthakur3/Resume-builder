import { Field, Row2, EntryCard, AddButton, TipBox } from "../ui";
import { expTemplate } from "../../data/defaultState";

export default function ExperienceTab({ resume, updateNested, addEntry, removeEntry }) {
  return (
    <div>
      <TipBox emoji="🎯">Start each bullet with an action verb: <strong>Built, Led, Improved, Reduced</strong>. Add numbers where possible — "Improved page speed by 40%".</TipBox>
      {resume.experience.map((exp, i) => (
        <EntryCard key={i} title={"Experience " + (i + 1)} onRemove={() => removeEntry("experience", i)}>
          <Field label="Company"><input value={exp.company} onChange={e => updateNested("experience", i, "company", e.target.value)} placeholder="Infosys, TCS, Swiggy, Startup..." /></Field>
          <Field label="Role / Position"><input value={exp.role} onChange={e => updateNested("experience", i, "role", e.target.value)} placeholder="Software Engineer, Product Analyst..." /></Field>
          <Row2>
            <Field label="Start Date"><input value={exp.startDate} onChange={e => updateNested("experience", i, "startDate", e.target.value)} placeholder="Jun 2022" /></Field>
            <Field label="End Date"><input value={exp.endDate} onChange={e => updateNested("experience", i, "endDate", e.target.value)} placeholder="Present" /></Field>
          </Row2>
          <Field label="Key Achievements" hint="One bullet per line. Start with action verbs.">
            <textarea value={exp.description} onChange={e => updateNested("experience", i, "description", e.target.value)} rows={4}
              placeholder={"• Built REST APIs serving 50k users daily\n• Reduced page load time by 35%\n• Led cross-functional team of 4 engineers"} />
          </Field>
        </EntryCard>
      ))}
      <AddButton onClick={() => addEntry("experience", expTemplate)}>+ Add Work Experience</AddButton>
    </div>
  );
}
