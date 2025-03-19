import { getUsersFromDb, getUserByIdFromDb,createUserInDb,updateUserInDb,deleteUserFromDb,validateUserByEmailAndPasswordFromDb} from '../repositories/users.js';
import { handleHashPassword,checkPassword } from '../uilities/hashservice.js';
import { generateToken , verifyTokenExpiry} from '../uilities/tokenService.js';
export const getAllUsers = async () => {
  return await getUsersFromDb();
};

export const getUserById = async (id) => {
    return await getUserByIdFromDb(id);
  };

  export const createUserService = async (FirstName, LastName, Email, Password) => {
    const hashedPassword = await handleHashPassword(Password)
    return await createUserInDb(FirstName, LastName, Email, hashedPassword);
  };

  export const updateUserService = async (id, FirstName, LastName, Email, Password) => {
    const hashedPassword = await handleHashPassword(Password)
    return await updateUserInDb(id, FirstName, LastName, Email, hashedPassword);
  };
  export const deleteUserService = async (id) => {
    return await deleteUserFromDb(id);
  };

  export const loginUserService = async (Email, Password) => {
    const result = await validateUserByEmailAndPasswordFromDb(Email);
    if (!result) {
      return null;
    }
    const isPasswordValid = await checkPassword(Password, result.Password);
    if (!isPasswordValid) {
      return null; 
    }
    const token = await generateToken(result.ID)
    return { user: result, token };
  };

  // export const verifytokenService = async(token)=>{
  //   return await verifyTokenExpiry(token)
  // }