//crud api endpoints
const host='http://localhost:5005'
export const addAdminUser = `${host}/api/v1/admin`; //?post
export const validateAdmin = `${host}/api/v1/admin/login`; //?post
export const deleteAminUser = `${host}/api/v1/admin`; //?delete
export const updateAdminUser = `${host}/api/v1/admin`; //?put
export const getAdminUser=`${host}/api/v1/admin`