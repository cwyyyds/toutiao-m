import request from '@/utils/request'

export const getSearchSuggestion = (value, token) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q: value
    }
  })
}

/**
 * 搜索结果
 * @param {String} 搜索关键字
 * @returns 文章数据
 */

export const getSearchResult = (page, per_page, value) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q: value
    }
  })
}
