const video = document.getElementById("webcam");
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded)
const label = document.getElementById("label");
let classifier


//query selectors
const labelOneBtn = document.querySelector("#labelOne");
const labelTwoBtn = document.querySelector("#labelTwo");
const labelThreeBtn = document.querySelector("#labelThree");
const trainbtn = document.querySelector("#train");

const nomaskbtn = document.querySelector("#nomask")
const maskbtn = document.querySelector("#mask")


//eventlistners
labelOneBtn.addEventListener("click", () => addLabel1(), console.log("button 1"));
labelTwoBtn.addEventListener("click", () => addLabel2(), console.log("button 2"));
labelThreeBtn.addEventListener("click", () => addLabel3(), console.log("button 3"));

// nomaskbtn.addEventListener("click", () => addNoMask())
// maskbtn.addEventListener("click", () => addMask())
trainbtn.addEventListener("click", () => train())
trainbtn.addEventListener("click", () => console.log("train"));

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
}

function modelLoaded(){
    console.log("The mobileNet model is loaded!")
    classifier = featureExtractor.classification(video, videoReady)
}

function videoReady(){
    console.log(classifier)
}

function addLabel1(){
    classifier.addImage(video, "Label 1", addedImage)
}

function addLabel2() {
    classifier.addImage(video, "Label 2", addedImage)
}

function addLabel3() {
    classifier.addImage(video, "Label 3", addedImage)
}

function train(){
    console.log("start training...")
    classifier.train((lossValue) => {
        console.log(lossValue)
        if(lossValue == null){
            startClassifying()
        }
    })
}

function startClassifying(){
    setInterval(()=>{
        classifier.classify(video, (err, result)=>{
            if(err) console.log(err)
            console.log(result)
            label.innerHTML = result[0].label
        })
    }, 1000)
}

function addedImage(){
    console.log("added image to network")
}

label.innerText = "Ready when you are!";