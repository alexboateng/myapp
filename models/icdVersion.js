const mongoose = require('mongoose');
const Joi = require('joi');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const icdVersionSchema = new mongoose.Schema({
    version: { type: String, required: true },
});

icdVersionSchema.plugin(AutoIncrement, { inc_field: 'idver' });

const IcdVersion = mongoose.model('icdversion', icdVersionSchema);

exports.IcdVersion = IcdVersion;
