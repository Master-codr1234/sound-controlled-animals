var classifier, result_label, animals_detected;
var stop = false;
var cat = 0;
var dog = 0;
var lion = 0;
var cow = 0;

function start_classification() {
    stop = false;
    navigator.mediaDevices.getUserMedia({ audio: true });
    classifier = ml5.soundClassifier("https://teachablemachine.withgoogle.com/models/Zktn2wVFX/model.json", modelReady);
}

function stop_classification() {
    stop = true;
}

function modelReady() {
    classifier.classify(gotReasults);
}

function gotReasults(error, results) {
    if (stop == false) {
        if (error) {
            console.error(error);
            alert("An error occured");
        }
        else {
            console.log(results);
            var red = Math.floor(Math.random() * 255) + 1;
            var green = Math.floor(Math.random() * 255) + 1;
            var blue = Math.floor(Math.random() * 255) + 1;
            var txt_color = "rgb(" + red + ", " + green + ", " + blue + ")";

            result_label = results[0].label;
            document.getElementById("sound_detected").innerHTML = "Detected voice is of " + result_label;
            if (result_label == "Barking") {
                dog++;
                animals_detected = "Detected Barking - " + dog + "   Detected Mooing - " + cow + "   Detected Roaring - " + lion + "   Detected Meowing - " + cat;
                document.getElementById("animalls_detected").innerHTML = animals_detected;
                document.getElementById("detected_animal_img").src = "bark.gif";
            }
            else if (result_label == "Mooing") {
                cow++;
                animals_detected = "Detected Barking - " + dog + "   Detected Mooing - " + cow + "   Detected Roaring - " + lion + "   Detected Meowing - " + cat;
                document.getElementById("animalls_detected").innerHTML = animals_detected;
                document.getElementById("detected_animal_img").src = "moo.gif";
            }
            else if (result_label == "Roaring") {
                lion++;
                animals_detected = "Detected Barking - " + dog + "   Detected Mooing - " + cow + "   Detected Roaring - " + lion + "   Detected Meowing - " + cat;
                document.getElementById("animalls_detected").innerHTML = animals_detected;
                document.getElementById("detected_animal_img").src = "roar.gif";
            }
            else if (result_label == "Meowing") {
                cat++;
                animals_detected = "Detected Barking - " + dog + "   Detected Mooing - " + cow + "   Detected Roaring - " + lion + "   Detected Meowing - " + cat;
                document.getElementById("animalls_detected").innerHTML = animals_detected;
                document.getElementById("detected_animal_img").src = "meow.gif";
            }
            else {
                document.getElementById("detected_animal_img").src = "listen.gif";
            }

            document.getElementById("animalls_detected").style.color = txt_color;
            document.getElementById("sound_detected").style.color = txt_color;
        }
    }
    else {
        document.getElementById("animalls_detected").innerHTML = "";
        document.getElementById("sound_detected").innerHTML = "";
        document.getElementById("detected_animal_img").src = "listen.gif";
    }
}