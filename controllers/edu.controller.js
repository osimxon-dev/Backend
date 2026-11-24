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



module.exports = {
    postRegister,
}