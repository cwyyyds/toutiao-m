import request from '@/utils/request'

export const getDetails = (id) => {
  return request({
    url: '/v1_0/articles/' + id
  })
}
/**
 * 获取评论
 * @param {*} id
 * @returns
 */
export const getDetailsComment = (id) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: 'a',
      source: id
    }
  })
}

/**
 * 获取评论的回复
 * @param {*} id
 * @returns
 */
export const getDetailsReply = (id) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: 'c',
      source: id
    }
  })
}

/**
 * 评论回复
 * @param {*} 用户token
 * @param {*} target
 * @param {*} 内容content
 * @param {*} 文章art_id
 * @returns
 */
export const sendDetailsReply = (token, target, content, art_id) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    headers: {
      Authorization: token
    },
    data: {
      target,
      content,
      art_id
    }
  })
}

/**
 * 关注
 * @param {String} 用户token
 * @param {String} 博主aut_id
 * @returns 能拿到博主target
 */
export const getDetailsAttention = (token, id) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    headers: {
      Authorization: token
    },
    data: {
      target: '' + id
    }
  })
}

/**
 *关注列表
 * @param {String} 用户token
 * @returns 关注列表
 */
export const getUserInfoAttentionList = (token) => {
  return request({
    url: '/v1_0/user/followings',
    headers: {
      Authorization: token
    },
    params: {
      page: '1',
      per_page: '10'
    }
  })
}

/**
 * 删除关注
 * @param {String} 用户token
 * @param {*}
 * @returns
 */
export const getUserInfoAttentionDelete = (token, target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,

    method: 'DELETE',

    headers: {
      Authorization: token
    }
  })
}
