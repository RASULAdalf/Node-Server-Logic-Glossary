// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs');
const formidable = require('formidable')


// Creates a client
const client = new speech.SpeechClient();

const processVoiceInput = async (req,resp)=> {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        const audio = {
            content: fs.readFileSync(form.openedFiles[0].filepath).toString('base64'),
        };

        const config = {
            encoding: 'MP3',
            sampleRateHertz: 48000,
            languageCode: 'en-US',
        };
        const request = {
            audio: audio,
            config: config,
        };

        // Detects speech in the audio file
        const [response] = await client.recognize(request);
        const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');
        console.log(`Transcription: ${transcription}`);
        resp.status(200).json({data:transcription});
    });
}

module.exports = {processVoiceInput};