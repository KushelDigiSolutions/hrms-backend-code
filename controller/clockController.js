import Clock from "../models/Clock/clock.js"

export const createClock = async(req ,res)=>{
    try{

     const {  clockInDetail , clockOutDetail , date ,breakTime} = req.body;

     console.log('cll ',clockInDetail , breakTime);


      const {userId} = req.params;


      const clockDetails = await Clock.create({Date:date , clockIn:clockInDetail , clockOut:clockOutDetail ,user: userId , breakTime:breakTime});

    //   console.log(clockDetails);
    console.log(clockDetails)


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
        const { userId } = req.params;

        
        const searchDateUTC = new Date(date);
        searchDateUTC.setHours(0, 0, 0, 0); // Reset time to midnight
        const searchDateEndUTC = new Date(searchDateUTC.getTime() + 24 * 60 * 60 * 1000); // Next day's midnight
        
        const clockEntries = await Clock.findOne({
            user: userId,
            Date: { $gte: searchDateUTC, $lt: searchDateEndUTC }
        }).select('clockIn clockOut breakTime');
        
        



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

