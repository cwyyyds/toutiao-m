import request from '@/utils/request'

import storage from '@/utils/storage'

export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}

/**
 * 删除用户频道
 * @param {String | Number}  target 删除用户频道的ID
 * @returns  promise
 */

export const delMyChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

/**
 * 我的频道
 * @param {number} id 频道的id
 * @param {number} seq 添加频道的索引下标
 * @returns
 */

export const addMyChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

const HEIMA_TOUTIAO_CHANNELS = 'channels'

export const getMyChannelsByLocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS)

export const setMyChannelsToLocal = (channel) =>
  storage.set(HEIMA_TOUTIAO_CHANNELS, channel)
