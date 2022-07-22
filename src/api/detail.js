import request from '@/utils/request'

export const getDetails = (id) => {
  return request({
    url: '/v1_0/articles/' + id
  })
}
