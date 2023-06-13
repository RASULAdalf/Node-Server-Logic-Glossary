const WordSchema = require('../model/WordSchema');
const HistorySchema = require('../model/HistorySchema');

const saveWord = (req,resp)=>{
    const wordData = new WordSchema({
        englishWord:req.body.eng,
        sinhalaWord:req.body.sin
    });
    wordData.save().then(result=>{
        resp.status(201).json({message:"successfully saved!"});
    }).catch(error=>{
        resp.status(500).json({message:"Something went wrong"});/*status code 500 for internal server error and 201 for success request and successfully a resource has created.*/
    })
};
const searchWord = async (req, resp) => {
    if (req.query.fromLang === 'English') {
        const foundData = await WordSchema.findOne({englishWord: req.query.word}).collation({ locale: "en", strength: 2 }).exec();
        if (foundData!== null){
            await new HistorySchema({
                englishWord: foundData.englishWord,
                sinhalaWord: foundData.sinhalaWord,
                date: new Date(),
                time: new Date()
            }).save().then(res=>{
            resp.status(200).json({data: foundData.sinhalaWord})
            });
        }else {
            resp.json({data:"Word Not Found!"})
        }


    }else if (req.query.fromLang === 'Sinhala') {
        const foundData = await WordSchema.findOne({sinhalaWord: req.query.word}).collation({ locale: "si", strength: 2 }).exec();;
        if (foundData!== null){
            await new HistorySchema({
                englishWord: foundData.englishWord,
                sinhalaWord: foundData.sinhalaWord,
                date: new Date(),
                time: new Date()
            }).save().then(res=>{
            resp.status(200).json({data: foundData.englishWord})
            });
        }else {
            resp.json({data:"Word Not Found!"})
        }
    }else {
        resp.json({data:"Wrong Input"})
    }

}

module.exports = {saveWord,searchWord}