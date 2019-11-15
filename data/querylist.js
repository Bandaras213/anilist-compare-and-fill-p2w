module.exports = `
query ($userId: Int, $type: MediaType, $userName: String, $MediaListStatus: MediaListStatus) {
  MediaListCollection (userId: $userId, type: $type, userName: $userName, status: $MediaListStatus) {
    lists {
      status
      entries {
        mediaId
      }
    }
  }
}`