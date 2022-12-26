//crud
let port=5005
const host=`http://localhost:${port}`
export const getAllUsers=`${host}/api/v1/user`//?get
export const addUser=`${host}/api/v1/user` //?post
export const validateUser=`${host}/api/v1/user/login`  //?post
export const updateUser=`${host}/api/v1/user` //?put  //:id
export const getUser=`${host}/api/v1/user`  //?get //:id
export const deleteUser=`${host}/api/v1/user` //?delete //:id
export const webserver=`ws://localhost:${port}`