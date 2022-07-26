import request from '@/utils/request'

/**
 * 发布评论
 * @param {String} token
 * @param {String} target
 * @param {String} content
 * @returns
 */
export const sendContent = (token, target, content) => {
  return request({
    url: '/v1_0/comments',

    method: 'POST',

    headers: {
      Authorization: token
    },
    data: {
      art_id: null,
      target,
      content
    }
  })
}

/**
 * 点击收藏
 * @param {*} token
 * @param {*} target
 * @returns
 */
export const getCollection = (token, target) => {
  return request({
    url: '/v1_0/article/collections',

    method: 'POST',

    headers: {
      Authorization: token
    },
    data: {
      target
    }
  })
}

/**
 * 取消收藏
 * @param {*} token
 * @param {*} target
 * @returns
 */
export const cancelCollection = (token, target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,

    method: 'DELETE',

    headers: {
      Authorization: token
    }
  })
}

/**
 * 收藏列表
 * @param {*} token
 * @returns
 */
export const getCollectionList = (token) => {
  return request({
    url: '/v1_0/article/collections',

    headers: {
      Authorization: token
    }
  })
}

/**
 * 点赞
 * @param {*} token
 * @param {*} target
 * @returns
 */
export const getLike = (token, target) => {
  return request({
    url: '/v1_0/article/likings',

    method: 'POST',

    headers: {
      Authorization: token
    },
    data: {
      target
    }
  })
}

/**
 * 取消点赞
 * @param {*} token
 * @param {*} target
 * @returns
 */
export const cancelLike = (token, target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,

    method: 'DELETE',

    headers: {
      Authorization: token
    },
    data: {
      target
    }
  })
}
