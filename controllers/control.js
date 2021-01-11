const Data = require("../model/data");

module.exports = {
    getData: async (req, res, next) => {

        try {
            const data = await Data.find();
            res.json({ success: true, result: data });
        }
        catch (error) {
            res.status(400).json({ success: false, result: error.message })
        }
    },
    getLastData: async (req, res, next) => {
        try {
            const data = await Data.find().sort({ _id: -1 }).limit(1);
            res.json({ success: true, result: data });
        }
        catch (error) {
            res.status(400).json({ success: false, result: error.message })
        }
    },
    getLastTenData: async (req, res, next) => {
        try {
            const data = await Data.find().sort({ _id: -1 }).limit(10);
            res.json({ success: true, result: data });
        }
        catch (error) {
            res.status(400).json({ success: false, result: error.message })
        }
    },
    postPerformOperation: async (req, res, next) => {
        const { temp, light, sound } = req.body;
        try {
            const newData = await new Data({ temp, light, sound })
            await newData.save();
            // the + prefix is to make sure they are numbers and not string
            const averageResult = (+temp + +light + +sound) / 3;
            res.json({ success: true, result: newData, average: averageResult.toFixed(2) });
        }
        catch (error) {
            res.status(400).json({ success: false, result: error.message })
        }
    },
    updateData: async (req, res, next) => {
        const { light, sound, temp, _id } = req.body;
        try {
            const data = await Data.findById(_id);
            //check if data exist
            if (!data) {
                return res.status(422).json({ success: false, result: "no data exist" })
            }

            //change old value if value was change or keep old value
            data.temp = temp || data.temp;
            data.light = light || data.light;
            data.sound = sound || data.sound;
            await data.save();

            res.json({ sucess: true, result: data });
        }
        catch (error) {
            res.status(400).json({ success: false, result: "error id" })
        }
    },
    deleteData: async (req, res, next) => {
        try {
            const data = await Data.findById(req.body._id);

            //check if data exist
            if (!data) {
                return res.status(422).json({ success: false, result: "no data exist" })
            }

            //delete if exist
            await Data.deleteOne({ _id: req.body._id });
            res.json({ success: true, result: "data deleted" })
        }
        catch (error) {
            res.status(400).json({ success: false, result: "error id" })
        }
    }
}