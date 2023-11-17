import axios from 'axios';

export const imageProcess = async (req, res) => {
    try {
        // const { imageData } = req.body.image; 
        const { imageLink } = req.body; 

        const processedImage = await axios.post('http://127.0.0.1:8080/process-image', { image_link : imageLink });

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




