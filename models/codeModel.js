const mongoose = require('mongoose');
const Joi = require('joi');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const icdCodesSchema = new mongoose.Schema({
    categoryCode: { type: String, required: true },
    diagnosisCode: { type: Number },
    fullCode: { type: String, required: true },
    abbrDesc: { type: String, required: true },
    fullDesc: { type: String, required: true },
    categoryTitle: { type: String, required: true },
    appVersion: { type: Number, required: true },
});

icdCodesSchema.plugin(AutoIncrement, { inc_field: 'idcid' });

function validateCode(Code) {
    const schema = Joi.object({
        categoryCode: Joi.string().required(),
        diagnosisCode: Joi.number().required(),
        fullCode: Joi.string().required(),
        abbrDesc: Joi.string().required(),
        fullDesc: Joi.string().required(),
        categoryTitle: Joi.string().required(),
    });

    return schema.validate(Code, schema);
}

const IcdCode = mongoose.model('isdcodes', icdCodesSchema);

exports.IcdCode = IcdCode;
exports.validateCode = validateCode;
