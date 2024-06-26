const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  categories: [{
    categoryType: {
      type: String, 
      required: true,
      enum:["Image" , "Video" , "Audio" , "Document" , "Other"]
    }
  }],
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    id: Schema.Types.ObjectId,
    creationDate: {
      type: Date,
      default: Date.now
    },
    content: {
      type: String,
      required: true,
    },
    commenter: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  isArchived: {
    type: Boolean,
    default: false,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  }
});

module.exports = Resource = mongoose.model('resource', ResourceSchema);