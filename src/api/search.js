import request from '@/utils/request'

export const getSearchSuggestion = (value, token) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q: value
    }
  })
}
