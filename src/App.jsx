import { useState } from 'react'
import './App.css'
import { useDropzone } from 'react-dropzone'

function App() {
  const [file, setFile] = useState(null)
  const [isUploaded, setIsUploaded] = useState(false)

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0])
    setIsUploaded(true)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleSubmit = (event) => {
    event.preventDefault()

    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      fetch('URL_DEL_ENDPOINT', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          // Manejar la respuesta del servidor
        })
        .catch(error => {
          // Manejar el error de la solicitud
        })
    }
  }

  return (
    <div className="container">
      <form className="register-file-form" onSubmit={handleSubmit}>
        <h1>Subir archivo</h1>
        <div className={`dropzone ${isDragActive ? 'active' : ''}`} {...getRootProps()}>
          <input {...getInputProps()} />
          {isUploaded ? (
            <p>Archivo seleccionado: {file.name}</p>
          ) : (
            <p>
              {isDragActive ? (
                'Suelta el archivo aquí'
              ) : (
                'Arrastra y suelta un archivo aquí, o haz clic para seleccionar un archivo'
              )}
            </p>
          )}
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default App
