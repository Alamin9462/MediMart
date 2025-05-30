import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';
import { JwtPayload } from 'jsonwebtoken';

const createUser = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await UserService.createUserIntoDB(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User Registered Successfully',
    data: result,
  });
});

const getUser = catchAsync(async (req, res) => {
  const result = await UserService.getUserFromDB(
    req.user as JwtPayload & { role: string },
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsersFromDb(
    req.user as JwtPayload & { role: string },
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const updateUserActiveStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.updateUserActiveStatusIntoDb(id);
  sendResponse(res, {
    data: result,
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Deactivated Successfully',
  });
});

export const UserControllers = {
  getUser,
  createUser,
  getAllUsers,
  updateUserActiveStatus,
};
