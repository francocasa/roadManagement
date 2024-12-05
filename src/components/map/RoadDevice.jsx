import { useState } from "react";

const RoadDevice = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);

  const road_device_types = [
    {
      id: 1,
      name: "Semaforo",
      icon: "Semaforo",
    },
    {
      id: 2,
      name: "Rompemuelle",
      icon: "Rompemuelle",
    },
    {
      id: 3,
      name: "tacha",
      icon: "tacha",
    },
  ];

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  // Función para manejar el cambio de comentario
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // Función para manejar la carga de imagen
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Almacenar la URL de la imagen cargada
      };
      reader.readAsDataURL(file); // Leer la imagen como URL de datos
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("selectedOption");
    console.log(selectedOption);
    console.log("comment");
    console.log(comment);
    console.log("image");
    console.log(image);
  };

  return (
    <div>
      <h1>Agregar información</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo de dispositivo vial</label>
          <select id="comboBox" value={selectedOption} onChange={handleChange}>
            <option value="">Seleccione</option>
            {road_device_types.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Comentarios</label>
          <textarea
            placeholder="Escribe tus comentarios aquí..."
            value={comment}
            onChange={handleCommentChange}
            rows="4"
            cols="50"
          />
        </div>

        <div>
          <h3>Adjuntar una imagen:</h3>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {/* Botón para enviar el formulario */}
        <div>
          <button type="submit">Agregar Producto</button>
        </div>
      </form>
    </div>
  );
};

export default RoadDevice;
