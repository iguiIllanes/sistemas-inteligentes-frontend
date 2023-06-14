import { useState } from "react";
import "./App.css";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [optionSelected, setOptionSelected] = useState("Clasificador Simple");
  const [isClassifier, setIsClassifier] = useState(true);

  const [serverResponse, setServerResponse] = useState("");

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setIsUploaded(true);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleCheckboxChange = () => {
    if (isClassifier) {
      setOptionSelected("Clasificador con Segmentacion");
      setIsClassifier(false);
    } else {
      setOptionSelected("Clasificador Simple");
      setIsClassifier(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      let requestUrl = "";

      if (isClassifier) {
        requestUrl = "http://localhost:8000/classifier";
      } else {
        requestUrl = "http://localhost:8000/classifier-segmentation";
      }

      axios
        .post(requestUrl, formData)
        .then((res) => {
          console.log(res.data.prediction);
          setServerResponse(res.data.prediction);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <form className="register-file-form" onSubmit={handleSubmit}>
        <h1>Subir Imagen</h1>
        <center>
          <p className="response"> Selccionar modo:</p>
          <p className="response">{optionSelected}</p>
          <label className="switch">
            <input type="checkbox" onChange={handleCheckboxChange} />
            <span className="slider round"></span>
          </label>
        </center>
        <div
          className={`dropzone ${isDragActive ? "active" : ""}`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isUploaded ? (
            <p>Archivo seleccionado: {file.name}</p>
          ) : (
            <p>
              {isDragActive
                ? "Suelta el archivo aquí"
                : "Arrastra y suelta un archivo aquí, o haz clic para seleccionar un archivo"}
            </p>
          )}
        </div>
        <div className="response">
          <p>{serverResponse}</p>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
