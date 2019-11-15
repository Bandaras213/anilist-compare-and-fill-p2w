module.exports = `
mutation ($mediaId: Int) {
  SaveMediaListEntry (mediaId: $mediaId, status: PLANNING) {
    mediaId
    status
    media {
      title {
        romaji
      }
    }
  }
}`;
