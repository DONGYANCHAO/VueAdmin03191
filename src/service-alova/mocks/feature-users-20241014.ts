import { defineMock } from '@sa/alova/mock';

const mockUsers = [
  {
    id: '1',
    userName: 'admin',
    nickName: '管理员',
    userGender: '1',
    status: '1',
    userPhone: '13800138000',
    userEmail: 'admin@test.com'
  },
  {
    id: '2',
    userName: 'test1',
    nickName: '测试用户1',
    userGender: '1',
    status: '1',
    userPhone: '13800138001',
    userEmail: 'test1@test.com'
  },
  {
    id: '3',
    userName: 'test2',
    nickName: '测试用户2',
    userGender: '2',
    status: '1',
    userPhone: '13800138002',
    userEmail: 'test2@test.com'
  },
  {
    id: '4',
    userName: 'test3',
    nickName: '测试用户3',
    userGender: '2',
    status: '1',
    userPhone: '13800138003',
    userEmail: 'test3@test.com'
  },
  {
    id: '5',
    userName: 'test4',
    nickName: '测试用户4',
    userGender: '1',
    status: '2',
    userPhone: '13800138004',
    userEmail: 'test4@test.com'
  },
  {
    id: '6',
    userName: 'test5',
    nickName: '测试用户5',
    userGender: '2',
    status: '2',
    userPhone: '13800138005',
    userEmail: 'test5@test.com'
  },
  {
    id: '7',
    userName: 'test6',
    nickName: '测试用户6',
    userGender: '1',
    status: '1',
    userPhone: '13800138006',
    userEmail: 'test6@test.com'
  },
  {
    id: '8',
    userName: 'test7',
    nickName: '测试用户7',
    userGender: '1',
    status: '1',
    userPhone: '13800138007',
    userEmail: 'test7@test.com'
  }
];

export default defineMock({
  '[GET]/systemManage/getUserList': () => {
    return {
      code: '0000',
      msg: 'success',
      data: {
        records: mockUsers,
        current: 1,
        size: 30,
        total: mockUsers.length
      }
    };
  },
  '[POST]/systemManage/addUser': () => {
    return {
      code: '0000',
      msg: 'success',
      data: null
    };
  },
  '[POST]/systemManage/updateUser': () => {
    return {
      code: '0000',
      msg: 'success',
      data: null
    };
  },
  '[DELETE]/systemManage/deleteUser': () => {
    return {
      code: '0000',
      msg: 'success',
      data: null
    };
  },
  '[DELETE]/systemManage/batchDeleteUser': () => {
    return {
      code: '0000',
      msg: 'success',
      data: null
    };
  },
  '[POST]/auth/sendCaptcha': () => {
    return {
      code: '0000',
      msg: 'success',
      data: null
    };
  },
  '[POST]/auth/verifyCaptcha': () => {
    return {
      code: '0000',
      msg: 'success',
      data: null
    };
  },
  '/mock/getLastTime': () => {
    return {
      code: '0000',
      msg: 'success',
      data: Date.now()
    };
  }
});
