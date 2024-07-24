import React, { useState } from "react";
import "../../styles/tiny.css";
import { Editor } from "@tinymce/tinymce-react";

const Tiny: React.FC = () => {
  const [_, setText] = useState<string>("");
  const [value, setValue] = useState<string>("");
  console.log("VALUE =>", value);
  console.log("TEXT =>", value);

  return (
    <>
      <Editor
        apiKey="jy9r72cwdxztqu455s7iqbdqwobpeuunkn9usspjm9xrq9c7"
        onEditorChange={(newValue, editor) => {
          setValue(newValue);
          setText(editor.getContent({ format: "text" }));
        }}
        onInit={(_, editor) => {
          setText(editor.getContent({ format: "text" }));
        }}
        initialValue=""
        value={value}
        init={{
          plugins:
            "a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template tinydrive tinymcespellchecker typography visualblocks visualchars wordcount",
        }}
      />
    </>
  );
};

export default Tiny;
