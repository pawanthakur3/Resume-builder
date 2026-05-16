import { Field, Row2, EntryCard, AddButton } from "../ui";
import { eduTemplate } from "../../data/defaultState";

export default function EducationTab({ resume, updateNested, addEntry, removeEntry }) {
  return (
    <div>
      {resume.education.map((edu, i) => (
        <EntryCard key={i} title={"Education " + (i + 1)} onRemove={() => removeEntry("education", i)}>
          <Field label="Institution"><input value={edu.institution} onChange={e => updateNested("education", i, "institution", e.target.value)} placeholder="IIT Delhi, Anna University, BITS Pilani..." /></Field>
          <Row2>
            <Field label="Degree"><input value={edu.degree} onChange={e => updateNested("education", i, "degree", e.target.value)} placeholder="B.Tech, MBA, BCA..." /></Field>
            <Field label="Field of Study"><input value={edu.field} onChange={e => updateNested("education", i, "field", e.target.value)} placeholder="Computer Science" /></Field>
          </Row2>
          <Row2>
            <Field label="Start Year"><input value={edu.startYear} onChange={e => updateNested("education", i, "startYear", e.target.value)} placeholder="2019" /></Field>
            <Field label="End Year"><input value={edu.endYear} onChange={e => updateNested("education", i, "endYear", e.target.value)} placeholder="2023" /></Field>
          </Row2>
          <Field label="CGPA / Percentage"><input value={edu.grade} onChange={e => updateNested("education", i, "grade", e.target.value)} placeholder="8.4 CGPA / 78%" /></Field>
        </EntryCard>
      ))}
      <AddButton onClick={() => addEntry("education", eduTemplate)}>+ Add Education</AddButton>
    </div>
  );
}
