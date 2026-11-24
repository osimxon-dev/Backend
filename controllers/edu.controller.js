const { Edu } = require("../model/eduSchema")


const postRegister = async (req, res) => {
    try {
        const {
            city,
            street, 
            center_name,
            branch, 
            rating
        } = req.body

        const existingEdu = await Edu.findOne({ center_name })
        console.log(existingEdu);
     if(existingEdu) {
        return res.status(400).json({
            success: false,
            message: "Bu nom bilan ro'yxatga o'tgan edu mavjud",
        })
     }else {
        const newEdu = new Edu({
            city, 
            street, 
            center_name,
            branch,
            rating,
        })
        await newEdu.save()
        return res.status(201).json({
            success: true,
            message: "Edu qoshish muvaffaqiyatil yakunlandi"
        })
     } 
    }catch (error) {
        console.log("Xato", error)
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Ro'yxatga otish jarayonida xatolik yuz berdi",
        })
    }
}

const getEdus = async (req, res) => {
    try {
        const edus = await Edu.find({}) 
        res.json({
            success: true,
            message: "Barcha Educationlar ro'yxati olingan",
            innerData: edus,
        })
    }catch (error) {
        console.error("Error fetching Educations:", error)
        res.status(500).json({
            success: false,
            message: "Server xatosi, Educationlar olishda xatolik yuz berdi",
        })
    }
}

module.exports = {
    postRegister,
    getEdus,
}