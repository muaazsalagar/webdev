/**
 * Created by muaazsalagar on 4/2/16.
 */

"use strict";

module.exports = function (mongoose) {

    var fieldSchema = mongoose.Schema({

        label: String,
        type: {
            type: String,
            enum: ['TEXT', 'TEXTAREA', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES'],
            default: 'TEXT'
        },

        placeholder: String,
        options: [{
            label: String,
            value : {type: String, uppercase: true}
        }]
    }, {collection: "assignment.field"});

    return fieldSchema;

}

