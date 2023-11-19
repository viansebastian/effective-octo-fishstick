import axios from 'axios';
import fs from 'fs';


export const tes = (req, res) => {
    return res.status(200).send("hello, world!");
};

export const imageProcessUpload = async (req, res) => {
    try {
        const image_link  = req.body.image; 
        // const { imageLink } = req.body; 

        const processedImage = await axios.post('http://127.0.0.1:8080/process-image-upload', { image_link : image_link });

        const count = processedImage.data.count;

        const traffic = prioritizer(count)
        const trafficCountdown = traffic.countdown;
        const trafficPriority = traffic.priority;

        // console.log(priority); 
        // console.log(countdown);    
        console.log(trafficCountdown);
        console.log(trafficPriority); 

        return res.json( { 
            count : count,
            countdown: trafficCountdown,
            priority : trafficPriority
        })
    } catch (err) {
        return res.json( { message : err + "awenaf" } );
    }
};

export const imageProcessURL = async (req, res) => {
    try {
        // console.log(req.body);

        const imageLink = req.body.imageLink; 

        // console.log(imageLink);

        const processedImage = await axios.post('http://127.0.0.1:8080/process-image-url', { image_link : imageLink });

        const count = processedImage.data.count;
        console.log(count);

        const traffic = prioritizer(count)
        const trafficCountdown = traffic.countdown;
        const trafficPriority = traffic.priority;

        // console.log(priority);
        // console.log(countdown);    
        console.log(trafficCountdown);
        console.log(trafficPriority); 

        return res.json( { 
            count : count,
            countdown: trafficCountdown,
            priority : trafficPriority
        })
    } catch (err) {
        return res.json( { message : err + "awenaf" } );
    }
};

const greenLightCount = (priority) => {
    let countdown = 0;

    if (priority == "high"){
        countdown = 120;
    }
    else if (priority == "medium"){
        countdown = 60;
    }
    else { countdown = 30; }

    return countdown;
};

const prioritizer = (count) => {
        let priority; 

        // console.log(count);
        if (count < 25) { 
            priority = "low"; ;
        }
        else if (count >= 25 && count <= 60) {
            priority = "medium"; 
        } 
        else {
            priority = "high"; 
        }
        // console.log(priority);

        const countdown = greenLightCount(priority);

        // console.log(countdown);

        return { countdown, priority };
};




