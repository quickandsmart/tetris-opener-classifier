
from flask import Flask, request, jsonify
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = Flask(__name__)


MODEL = tf.keras.models.load_model("../models/1")

CLASS_NAMES = ["Albatross", "Hachispin", "PCO","SDPC_Stickspin","TKI"]


def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image


@app.route("/predict", methods=['GET', 'POST'])
def predict():
    file = request.files['file']
    image = read_file_as_image(file.read())
    img_resized = tf.image.resize(image, (256, 256))
    img_resized = img_resized[...,:3]
    img_batch = np.expand_dims(img_resized, 0)

    predictions = MODEL.predict(img_batch)

    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    response = jsonify({
        'class': predicted_class,
        'class_probability' : np.char.mod('%.5f',predictions*100).tolist()[0],
        'class_dictionary': CLASS_NAMES
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run()