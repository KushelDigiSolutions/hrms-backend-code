import Clock from "../models/Clock/clock.js"

export const createClock = async(req ,res)=>{
    try{

     const {  clockInDetail , clockOutDetail , date} = req.body;


      const {userId} = req.params;


      const clockDetails = await Clock.create({Date:date , clockIn:clockInDetail , clockOut:clockOutDetail ,user: userId});

       return res.status(200).json({
        status:true ,
        message:"Succesful created ",
        data: clockDetails
       })

    } catch(error){
        return res.status(500).json({
            status:500 , 
            message:"Internal server error "
        })
    }
}


export const getClockByUserDate = async (req, res) => {
    try {
        const { date } = req.body;
        console.log('date ',date);
        const { userId } = req.params;

        console.log('suer ',userId);

        const searchDate = new Date(date);

        console.log('serch ',searchDate);

        const clockEntries = await Clock.findOne({
            user: userId,
            Date: { $gte: searchDate, $lt: new Date(searchDate.getTime() + 24 * 60 * 60 * 1000) } 
        }).select('clockIn clockOut');


        return res.status(200).json({
            status: true,
            message: "Clock details fetched successfully",
            data: clockEntries
        });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
};