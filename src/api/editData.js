import request from '@/utils/request'

/**
 * 获取用户信息
 * @param {*} token
 * @returns
 */
export const getUser = (token) => {
  return request({
    url: '/v1_0/user/profile',
    headers: {
      Authorization: token
    }
  })
}
/**
 * 更新头像
 */
export const updateUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data,
    timeout: 50000
  })
}

export const updateUserName = (token, name) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    headers: {
      Authorization: token
    },
    data: {
      name
    }
  })
}

export const updateUserGender = (token, gender) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    headers: {
      Authorization: token
    },
    data: {
      gender
    }
  })
}

export const updateUserBirthday = (token, birthday) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    headers: {
      Authorization: token
    },
    data: {
      birthday
    }
  })
}
