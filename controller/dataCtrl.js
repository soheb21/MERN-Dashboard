const { Query } = require("mongoose");
const DataModel = require("../model/dataModel");

const getAllDataController = async (req, res) => {
    try {
        const allData = await DataModel.find({});
        res.status(201).send({
            success: true,
            data: allData,
            message: "All data fetched successfully",
        })
    } catch (error) {
        res.status(401).send({
            message: false,
            error
        })
    }
}
const getAllDataByFilterController = async (req, res) => {
    try {
        const { search } = req.params;
        // ----------- important -----------
        // using '$or' operator to which includes multiple conditions
        // using '$regex' to match the particular field with given input
        // using $options: 'i' to make the search case-insensitive
        const allData = await DataModel.find({
            $or: [{ sector: { $regex: search, $options: 'i' } }, { topic: { $regex: search, $options: 'i' } },
            { insight: { $regex: search, $options: 'i' } }, { title: { $regex: search, $options: 'i' } },
            { pestle: { $regex: search, $options: 'i' } }, { source: { $regex: search, $options: 'i' } },
            { url: { $regex: search, $options: 'i' } }]
        });
        if (!allData || allData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No Data Found",
            })
        }
        return res.status(200).json({
            success: true,
            message: `Filtered by search ${search}`,
            data: allData
        })
    } catch (error) {
        res.status(401).send({
            message: false,
            error: error
        })
    }
}
const filteredByYear = async (req, res) => {
    try {
        const { year } = req.params;
        console.log(year)
        if (year.length !== 4) {
            return res.status(400).json({
                success: false,
                message: "Invalid year",
            })
        }
        // ----------- important -----------
        // using '$regex' to match the particular field with given input
        // using $options: 'i' to make the search case-insensitive
        const allData = await DataModel.find({end_year:year})
        console.log(allData)
        if (!allData || allData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No Data Found",
            })
        }
        return res.status(200).json({
            success: true,
            message: `Filtered by year ${year}`,
            data: allData
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

module.exports = { getAllDataController, getAllDataByFilterController,filteredByYear};