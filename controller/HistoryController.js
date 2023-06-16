const HistorySchema = require('../model/HistorySchema');

const saveHistory = (req,resp)=>{
    const historyData = new HistorySchema({
        englishWord:req.body.eng,
        sinhalaWord:req.body.sin,
        date:req.body.date,
        time:req.body.date
    });

    historyData.save().then(result=>{
        resp.status(201).json({message:"successfully saved!"});
    }).catch(error=>{
        resp.status(500).json({message:"Something went wrong"});/*status code 500 for internal server error and 201 for success request and successfully a resource has created.*/
    })
};

const getHistory = (req,resp)=>{
    const paginateOption = {
        page: parseInt(req.query.page) || 0,
        size: parseInt(req.query.size) || 10
    };
    HistorySchema.find()
        .skip(paginateOption.page * paginateOption.size)
        .limit(paginateOption.size)
        .exec().then(result=>{
            resp.status(200).json(result);
        }).catch(error=>{
            resp.status(500).json(error);
    })

}

module.exports = {saveHistory,getHistory}
