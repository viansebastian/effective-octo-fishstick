
export const prioritizer = async (req, res) => {
try {
    const { count } = req.body; 
    let priority; 

    console.log(count);
    if (count < 25) { 
        priority = "low"; 
        console.log(priority);
        return res.status(200).send(priority);
    }
    else if (count > 25 && count < 60) {
        priority = "medium"; 
        console.log(priority);
        return res.status(200).send(priority);
    } 
    else {
        priority = "high"; 
        console.log(priority);
        return res.status(404).send(priority);
    }

} catch (err) { return res.json( { message: err} ) };
};