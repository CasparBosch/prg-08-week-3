
// const video = document.getElementById("webcam");
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded)
const label = document.getElementById("label");
let classifier
let synth = window.speechSynthesis

//query selectors
// const labelOneBtn = document.querySelector("#labelOne");
// const labelTwoBtn = document.querySelector("#labelTwo");
// const labelThreeBtn = document.querySelector("#labelThree");
// const trainbtn = document.querySelector("#train");
// const savebtn = document.querySelector("#save");
// const btn = document.querySelector("#speak");
const image = document.getElementById('output')
const fileButton = document.querySelector("#file")

//eventlistners
// labelOneBtn.addEventListener("click", () => addMotor(), console.log("button 1"));
// labelTwoBtn.addEventListener("click", () => addAuto(), console.log("button 2"));
// trainbtn.addEventListener("click", () => train(), console.log("train"));
// savebtn.addEventListener("click", () => save());
// btn.addEventListener("click", () => {
//     speak('')
//   })
fileButton.addEventListener("change", (event)=>{
    image.src = URL.createObjectURL(event.target.files[0])
})
image.addEventListener('load', () => userImageUploaded())

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }
}

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ image: true })
        .then((stream) => {
            image.srcObject = stream;
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
}

label.innerText = "Ready when you are!";

function modelLoaded(){
    console.log("The mobileNet model is loaded!")
    classifier = featureExtractor.classification(image, videoReady)
    classifier.load('model.json', customModelReady());
}

function customModelReady(){
    console.log('Custom Model is ready!');
    label.innerText = 'Model is Ready!'
}

function videoReady(){
    console.log(classifier)
}



// function addMotor(){
//     classifier.addImage(video, "Motor", ()=>{
//         console.log("added image to model!")
//     })
// }

// function addAuto(){
//     classifier.addImage(video, "Auto", ()=>{
//         console.log("added image to model!")
//     })
// }

function train(){
    console.log("start training...")
    classifier.train((lossValue) => {
        console.log(lossValue)
        if(lossValue == null){
            startClassifying()
        }
    })
}

function save(){
    classifier.save();

}

// function startClassifying(){
//     setInterval(()=>{
//         classifier.classify(image, (err, result)=>{
//             if(err) console.log(err)
//             console.log(result)
//             label.innerText = result[0].label
//             speak(result[0].label)
//         })
//     }, 1000)
// }

function userImageUploaded(){
    console.log("The image is now visible in the DOM")
    intervalId = setInterval(()=>{
        classifier.classify(image, (err, result) => {
            if (err) console.log(err)
            console.log(result)
            label.innerText = result[0].label
            speak(result[0].label)
        })
    }, 20)
    setTimeout(() => {
        clearInterval(intervalId);
      }, 21)
}   

// function addedImage(){
//     console.log("added image to network")
// }

// function userImageUploaded(){
//     console.log("The image is now visible in the DOM")
// }