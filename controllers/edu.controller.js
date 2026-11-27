const { Edu } = require("../model/eduSchema");
const { User } = require("../model/userSchema");


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

const getEduById = async (req, res) => {
    try {
       const eduId = req.params.id

       const edu = await Edu.findById(eduId)
        if(!edu) {
            return res.status(400).json({ message: "Edu not found" })
        }
        res.json({ message: "Edu found", edu })
    }catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}
 
const deleteEdu = async (req, res) => {
    try {
        const eduId = req.params.id

        const deletedEdu = await Edu.findByIdAndDelete(eduId)
        if(!deletedEdu) {
            return res.status(404).json({ message: "Edu not found" })
        }
    res.json({ message: "Edu deleted Successfully", deleteEdu })
    }catch (error) {
        console.error(error) 
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const updateEdu = async (req, res) => {
    try {
        const { id } = req.params
        const { city, street, center_name, branch, rating } = req.body

        const updatedEdu = await Edu.findByIdAndUpdate(
            id, 
            { city, street, center_name, branch, rating },
            { new: true }
        )

        if (!updatedEdu) {
            return res.status(404).json({
                success: false,
                message: "O'quv markaz topilmadi",
            })
        }

        return res.status(200).json({
            success: true,
            message: "O'quv markaz muvaffaqiyatli yangilandi",
            data: updatedEdu,
        })
    }catch (error) {
        console.error("Xato", error)
        return res.status(500).json({
            success: false,
            message: "Server xatosi: O'quv markaz yuklashda xatolik yuz berdi"
        })
    }
}

const searchEdu = async (req, res) => {
    try {
        const { query } = req.query
        if(!query || typeof query !== "string") {
            return res.status(400).json({ message: "Invalid search query" })
        }
        const result = await Edu.find({
            $or: [
                { city: { $regex: query, $options: "i" } },
                { center_name: { $regex: query, $options: "i" } },
                { street: { $regex: query, $options: "i" } },
            ]
        })

        if(result.length === 0) {
            return res.json({ message: "Bunday edu topilmadi" })
        }
        res.json(result)
    }catch (error) {
        console.error("Error fetching edus:", error)
    }
}


module.exports = {
    postRegister,
    getEdus,
    deleteEdu,
    getEduById,
    updateEdu,
    searchEdu,
}