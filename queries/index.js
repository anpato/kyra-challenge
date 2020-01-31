module.exports = (model, params, data) => {
  return {
    find: model.find,
    updateWithOutUpsert: model.findOneAndUpdate(
      { youtube_id: params.youtube_id },
      { ...data }
    ),
    createMany: model.insertMany(data)
  }
}
