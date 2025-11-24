import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NoteTag } from "../../types/note";

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface NoteFormProps {
  onSubmit: (values: NoteFormValues) => void; // ← исправлено
  onCancel: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Required"),

  content: Yup.string()
    .min(5, "Minimum 5 characters")
    .max(500, "Maximum 500 characters")
    .required("Required"),

  tag: Yup.mixed<NoteTag>()
    .oneOf(["home", "work", "personal"], "Invalid tag")
    .required("Required"),
});

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, onCancel }) => {
  const initialValues: NoteFormValues = {
    title: "",
    content: "",
    tag: "home",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values); // ← ничего лишнего не передаём
      }}
    >
      <Form className="note-form">
        <div>
          <label>Title:</label>
          <Field name="title" />
          <ErrorMessage name="title" component="div" className="error" />
        </div>

        <div>
          <label>Content:</label>
          <Field as="textarea" name="content" />
          <ErrorMessage name="content" component="div" className="error" />
        </div>

        <div>
          <label>Tag:</label>
          <Field as="select" name="tag">
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
          </Field>
          <ErrorMessage name="tag" component="div" className="error" />
        </div>

        <div className="actions">
          <button type="submit">Create</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
