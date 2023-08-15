import { Context } from '@/overmind'

export const setHasDownloaded = (context: Context, status: boolean) => {
  context.state.exports.hasDownloaded = status
}

export const setDownloadStatus = async (context: Context, hasDownloaded: boolean) => {
  context.state.exports.hasDownloaded = hasDownloaded
}
